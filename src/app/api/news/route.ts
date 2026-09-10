import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// GET: All Articles
export async function GET() {
    try {
        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const { env } = getRequestContext();

        const result = await env.DB.prepare(
            `SELECT * FROM articles ORDER BY published_at DESC`
        ).all();

        return NextResponse.json(result.results || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create Article
export async function POST(req: NextRequest) {
    try {
        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const { env } = getRequestContext();
        const body = await req.json();

        const { title, slug, excerpt, content, category, featured_image, status } = body;
        const id = crypto.randomUUID();
        const published_at = new Date().toISOString();

        await env.DB.prepare(
            `INSERT INTO articles (id, slug, title, excerpt, content, category, featured_image, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
            .bind(
                id,
                slug,
                title,
                excerpt || '',
                content,
                category,
                featured_image || '',
                status || 'published',
                published_at
            )
            .run();

        return NextResponse.json({ success: true, id }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update Article
export async function PUT(req: NextRequest) {
    try {
        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const { env } = getRequestContext();
        const body = await req.json();

        const { id, title, slug, excerpt, content, category, featured_image, status } = body;

        if (!id) {
            return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
        }

        await env.DB.prepare(
            `UPDATE articles 
       SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, featured_image = ?, status = ?, updated_at = ?
       WHERE id = ?`
        )
            .bind(
                title,
                slug,
                excerpt || '',
                content,
                category,
                featured_image || '',
                status || 'published',
                new Date().toISOString(),
                id
            )
            .run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete Article
export async function DELETE(req: NextRequest) {
    try {
        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const { env } = getRequestContext();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Article ID required' }, { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM articles WHERE id = ?`).bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}