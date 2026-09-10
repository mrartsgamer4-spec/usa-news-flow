export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

function getDB(): any {
    try {
        const ctx = getRequestContext();
        if (ctx?.env?.DB) return ctx.env.DB;
    } catch (e) {
        // Fallback if not inside Cloudflare context
    }
    return (process.env as any).DB;
}

export async function GET(request: Request) {
    try {
        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: 'Database binding DB is missing' }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const category = searchParams.get('category');
        const status = searchParams.get('status');

        let query = 'SELECT * FROM articles';
        const params: any[] = [];
        const conditions: string[] = [];

        if (status) {
            conditions.push('status = ?');
            params.push(status);
        }
        if (category) {
            conditions.push('category = ?');
            params.push(category);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC LIMIT ?';
        params.push(limit);

        const stmt = db.prepare(query);
        const { results } = await stmt.bind(...params).all();

        return NextResponse.json(results || []);
    } catch (error: any) {
        console.error('GET /api/news error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles', details: error?.message || String(error) },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: 'Database binding DB not found' }, { status: 500 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            excerpt = '',
            content = '',
            category = 'General',
            tags = '',
            featured_image = '',
            image_alt = '',
            author_name = 'Editorial Staff',
            author_slug = 'editorial-staff',
            author_avatar = '',
            status = 'published',
        } = body;

        if (!title || !slug) {
            return NextResponse.json(
                { error: 'Title and Slug are required fields' },
                { status: 400 }
            );
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const published_at = status === 'published' ? now : null;

        const query = `
            INSERT INTO articles (
                id, title, slug, excerpt, content, category, tags,
                featured_image, image_alt, author_name, author_slug,
                author_avatar, status, views, created_at, updated_at, published_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
        `;

        await db
            .prepare(query)
            .bind(
                id,
                title,
                slug,
                excerpt,
                content,
                category,
                tags,
                featured_image,
                image_alt,
                author_name,
                author_slug,
                author_avatar,
                status,
                now,
                now,
                published_at
            )
            .run();

        return NextResponse.json({
            success: true,
            message: 'Article published successfully!',
            article: { id, title, slug }
        });
    } catch (error: any) {
        console.error('POST /api/news error:', error);
        return NextResponse.json(
            {
                error: 'Server error while creating article',
                details: error?.message || String(error)
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: 'Database binding DB not found' }, { status: 500 });
        }

        const body = await request.json();
        const { id, title, slug, excerpt, content, category, tags, featured_image, image_alt, status } = body;

        if (!id) {
            return NextResponse.json({ error: 'Article ID is required for update' }, { status: 400 });
        }

        const now = new Date().toISOString();

        const query = `
            UPDATE articles SET
                title = COALESCE(?, title),
                slug = COALESCE(?, slug),
                excerpt = COALESCE(?, excerpt),
                content = COALESCE(?, content),
                category = COALESCE(?, category),
                tags = COALESCE(?, tags),
                featured_image = COALESCE(?, featured_image),
                image_alt = COALESCE(?, image_alt),
                status = COALESCE(?, status),
                updated_at = ?
            WHERE id = ?
        `;

        await db
            .prepare(query)
            .bind(title, slug, excerpt, content, category, tags, featured_image, image_alt, status, now, id)
            .run();

        return NextResponse.json({ success: true, message: 'Article updated successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Server error while updating article', details: error?.message || String(error) },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: 'Database binding DB not found' }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Article ID required' }, { status: 400 });
        }

        await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();

        return NextResponse.json({ success: true, message: 'Article deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Server error while deleting article', details: error?.message || String(error) },
            { status: 500 }
        );
    }
}