export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { siteConfig } from '@/lib/siteConfig';
import { getArticleUrl } from '@/lib/urls';

export async function GET() {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }
        if (!db) db = (process.env as any).DB;

        const baseUrl = siteConfig.url.replace(/\/+$/, '');
        let articles: any[] = [];

        if (db) {
            // গুগলের নিয়ম অনুযায়ী ঠিক গত ৪৮ ঘণ্টার (২ দিন) আর্টিকেল ফিল্টার করা
            const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
            const { results } = await db
                .prepare('SELECT * FROM articles WHERE created_at >= ? ORDER BY created_at DESC LIMIT 1000')
                .bind(twoDaysAgo)
                .all();
            articles = results || [];
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles
                .map((item) => {
                    const url = `${baseUrl}${getArticleUrl(item.category, item.slug)}`;
                    const pubDate = new Date(item.published_at || item.created_at || Date.now()).toISOString();
                    const safeTitle = (item.title || '').replace(/[<>&'"]/g, (c: string) => {
                        switch (c) {
                            case '<': return '&lt;';
                            case '>': return '&gt;';
                            case '&': return '&amp;';
                            case '\'': return '&apos;';
                            case '"': return '&quot;';
                            default: return c;
                        }
                    });

                    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${siteConfig.name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${safeTitle}</news:title>
    </news:news>
  </url>`;
                })
                .join('\n')}
</urlset>`;

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=600, s-maxage=600',
            },
        });
    } catch (e: any) {
        return new NextResponse(`<error>${e.message}</error>`, { status: 500 });
    }
}