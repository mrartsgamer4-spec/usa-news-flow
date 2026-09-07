import { Article } from '@/types/article';

export async function getPublishedArticles(): Promise<Article[]> {
    try {
        if (typeof process !== 'undefined' && process.env) {
            const { getRequestContext } = await import('@cloudflare/next-on-pages');
            const { env } = getRequestContext();

            if (env?.DB) {
                // Try fetching with author JOIN first
                try {
                    const result = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         ORDER BY a.published_at DESC`
                    ).all<Article>();

                    if (result.results && result.results.length > 0) {
                        return result.results;
                    }
                } catch (joinError) {
                    console.warn('Fallback to simple articles fetch:', joinError);
                }

                // Fallback direct query if JOIN fails
                const simpleResult = await env.DB.prepare(
                    `SELECT * FROM articles ORDER BY published_at DESC`
                ).all<Article>();

                return simpleResult.results || [];
            }
        }
    } catch (error) {
        console.error('Error fetching published articles from D1:', error);
    }

    return [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        if (typeof process !== 'undefined' && process.env) {
            const { getRequestContext } = await import('@cloudflare/next-on-pages');
            const { env } = getRequestContext();

            if (env?.DB) {
                try {
                    const article = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         WHERE a.slug = ? LIMIT 1`
                    ).bind(slug).first<Article>();

                    if (article) return article;
                } catch (e) {
                    console.warn('Fallback to simple slug fetch:', e);
                }

                const simpleArticle = await env.DB.prepare(
                    `SELECT * FROM articles WHERE slug = ? LIMIT 1`
                ).bind(slug).first<Article>();

                return simpleArticle || null;
            }
        }
    } catch (error) {
        console.error('Error fetching article by slug:', error);
    }

    return null;
}