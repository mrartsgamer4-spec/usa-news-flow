import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const slug = searchParams.get('slug');

        // Cloudflare D1 DB Binding
        const db = (process.env as any).DB;
        if (!db) {
            return NextResponse.json({ error: 'Database binding failed' }, { status: 500 });
        }

        if (slug) {
            const article = await db.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first();
            return NextResponse.json(article);
        }

        let query = 'SELECT * FROM articles ORDER BY published_at DESC';
        let params: any[] = [];

        if (category) {
            query = 'SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC';
            params = [category];
        }

        const { results } = await db.prepare(query).bind(...params).all();
        return NextResponse.json(results || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const db = (process.env as any).DB;
        if (!db) {
            return NextResponse.json({ error: 'Database binding failed' }, { status: 500 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            content,
            category,
            sub_category,
            featured_image,
            image_caption,
            writer_name,
            excerpt,
            status,
        } = body;

        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const articleStatus = status || 'published';
        const authorName = writer_name || 'Editorial Team';

        await db
            .prepare(
                `INSERT INTO articles (
                    id, slug, title, excerpt, content, category, subcategory, 
                    featured_image, image_caption, author, status, published_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                id,
                slug,
                title,
                excerpt || title,
                content,
                category,
                sub_category || '',
                featured_image || '',
                image_caption || '',
                authorName,
                articleStatus,
                now,
                now
            )
            .run();

        return NextResponse.json({ success: true, id }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const db = (process.env as any).DB;
        if (!db) {
            return NextResponse.json({ error: 'Database binding failed' }, { status: 500 });
        }

        const body = await request.json();
        const {
            id,
            title,
            slug,
            content,
            category,
            sub_category,
            featured_image,
            image_caption,
            writer_name,
            excerpt,
            status,
        } = body;

        if (!id) {
            return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
        }

        const now = new Date().toISOString();
        const articleStatus = status || 'published';
        const authorName = writer_name || 'Editorial Team';

        await db
            .prepare(
                `UPDATE articles SET 
                    title = ?, slug = ?, excerpt = ?, content = ?, category = ?, 
                    subcategory = ?, featured_image = ?, image_caption = ?, 
                    author = ?, status = ?, updated_at = ?
                WHERE id = ?`
            )
            .bind(
                title,
                slug,
                excerpt || title,
                content,
                category,
                sub_category || '',
                featured_image || '',
                image_caption || '',
                authorName,
                articleStatus,
                now,
                id
            )
            .run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        const db = (process.env as any).DB;
        await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}