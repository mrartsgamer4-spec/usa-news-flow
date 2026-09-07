import { siteConfig } from '@/lib/siteConfig';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl } from '@/lib/urls';

export const runtime = 'edge';

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const articles = await getPublishedArticles();

    // Strictly strictly articles published within the last 48 hours
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const recentArticles = articles.filter((article) => {
        const pubDate = new Date(article.published_at);
        return pubDate >= fortyEightHoursAgo;
    });

    const xmlItems = recentArticles
        .map((art) => {
            const articleUrl = art.canonical_url || getArticleUrl(art.category, art.slug);
            const pubDate = new Date(art.published_at).toISOString();

            return `
  <url>
    <loc>${articleUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteConfig.name)}</news:name>
        <news:language>${siteConfig.language || 'en'}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(art.title)}</news:title>
    </news:news>
  </url>`;
        })
        .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 's-maxage=1800, stale-while-revalidate',
        },
    });
}