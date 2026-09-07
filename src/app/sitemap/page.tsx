export const runtime = 'edge';

import { mockArticles } from '@/lib/mockData';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://usanewsflow.pages.dev';

    const staticPages = [
        '',
        '/calculators/loan',
        '/calculators/mortgage',
        '/calculators/percentage',
        '/calculators/salary',
        '/calculators/tax',
        '/privacy-policy',
        '/terms-of-service',
        '/contact',
        '/about',
    ];

    const categories = Array.from(
        new Set(mockArticles.map((article) => article.category.toLowerCase()))
    );

    const articleUrls = mockArticles.map(
        (article) => `/news/${article.category.toLowerCase()}/${article.slug}`
    );

    const categoryUrls = categories.map((cat) => `/news/category/${cat}`);

    const allUrls = [...staticPages, ...categoryUrls, ...articleUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
            .map((url) => {
                return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `;
            })
            .join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}