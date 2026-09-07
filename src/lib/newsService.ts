import { Article } from '@/types/article';

export async function getPublishedArticles(): Promise<Article[]> {
    try {
        // ১. Cloudflare Edge Context চেক করা
        if (typeof process !== 'undefined' && process.env) {
            try {
                const { getRequestContext } = await import('@cloudflare/next-on-pages');
                const { env } = getRequestContext();
                if (env?.DB) {
                    const query = `
                        SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author 
                        FROM articles a 
                        LEFT JOIN authors auth ON a.author_id = auth.id 
                        ORDER BY a.published_at DESC
                    `;
                    const { results } = await env.DB.prepare(query).all<Article>();
                    if (results && results.length > 0) return results;
                }
            } catch (e) {
                console.warn('D1 Direct Binding fetch failed, falling back to API route', e);
            }
        }

        // ২. API Route Fallback (Next.js এর অভ্যন্তরীণ API রুট থেকে কল করা)
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usa-news-flow.pages.dev';
        const res = await fetch(`${baseUrl}/api/news`, {
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data : (data.articles || []);
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }

    return [];
}