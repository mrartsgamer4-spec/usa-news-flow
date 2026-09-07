export const runtime = 'edge';

import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

export async function GET() {
    const articles = await getPublishedArticles();

    // Google News Sitemap-এ শুধু গত ৪৮ ঘণ্টার আর্টিকেল রাখা রিকমেন্ডেড
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const recentArticles = articles.filter(a => new Date(a.published_at) >= twoDaysAgo);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${recentArticles
            .map((article) => {
                const articleUrl = `${siteConfig.url}/news/${article.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}/${article.slug}`;
                return `
    <url>
      <loc>${articleUrl}</loc>
      <news:news>
        <news:publication>
          <news:name>${siteConfig.name}</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
        <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      </news:news>
    </url>`;
            })
            .join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}