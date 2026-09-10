export const runtime = 'edge';

import { siteConfig } from '@/lib/siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl } from '@/lib/urls';

async function fetchLatestNews(): Promise<Article[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
        const res = await fetch(`${baseUrl}/api/news?limit=50`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data : (data.articles || []);
        }
    } catch (e) {
        console.error('Failed to fetch news for sitemap', e);
    }
    return [];
}

export async function GET() {
    const articles = await fetchLatestNews();

    const xmlItems = articles.map((article) => {
        const catName = typeof article.category === 'string' ? article.category : article.category?.name || 'news';
        const loc = article.canonical_url || `${siteConfig.url}${getArticleUrl(catName, article.slug)}`;
        const pubDate = article.published_at || article.publishedAt || new Date().toISOString();

        return `
      <url>
        <loc>${loc}</loc>
        <news:news>
          <news:publication>
            <news:name>${siteConfig.name}</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${new Date(pubDate).toISOString()}</news:publication_date>
          <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
        </news:news>
      </url>
    `;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${xmlItems}
    </urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
        },
    });
}