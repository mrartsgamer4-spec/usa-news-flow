import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const offset = (page - 1) * limit;

    try {
        if (typeof process !== 'undefined' && process.env) {
            const { getRequestContext } = await import('@cloudflare/next-on-pages');
            const { env } = getRequestContext();

            if (env?.DB) {
                if (slug) {
                    const article = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         WHERE a.slug = ? LIMIT 1`
                    ).bind(slug).first();

                    if (!article) {
                        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
                    }
                    return NextResponse.json({ article });
                }

                if (category) {
                    const articles = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         WHERE LOWER(a.category) = LOWER(?)
                         ORDER BY a.published_at DESC LIMIT ? OFFSET ?`
                    ).bind(category, limit, offset).all();

                    const totalCountResult = await env.DB.prepare(
                        `SELECT COUNT(*) as count FROM articles WHERE LOWER(category) = LOWER(?)`
                    ).bind(category).first<{ count: number }>();

                    return NextResponse.json({
                        articles: articles.results || [],
                        total: totalCountResult?.count || 0,
                        page,
                        totalPages: Math.ceil((totalCountResult?.count || 0) / limit),
                    });
                }

                // Default: Fetch latest articles with limit
                const articles = await env.DB.prepare(
                    `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                     FROM articles a 
                     LEFT JOIN authors auth ON a.author_id = auth.id 
                     ORDER BY a.published_at DESC LIMIT ? OFFSET ?`
                ).bind(limit, offset).all();

                return NextResponse.json({ articles: articles.results || [] });
            }
        }

        return NextResponse.json({ articles: [] });
    } catch (error) {
        console.error('API News Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}