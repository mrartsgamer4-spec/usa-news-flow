export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(request: Request) {
    try {
        const db = getRequestContext().env.DB;
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = "SELECT * FROM articles ORDER BY created_at DESC";
        let results;

        if (category) {
            const stmt = await db.prepare("SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC").bind(category);
            const res = await stmt.all();
            results = res.results;
        } else {
            const res = await db.prepare(query).all();
            results = res.results;
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const db = getRequestContext().env.DB;
        const body = await request.json();
        const { title, slug, content, excerpt, category, author_id, image_url, status } = body;

        const published_at = status === 'published' ? new Date().toISOString() : null;

        const { success } = await db.prepare(
            `INSERT INTO articles (title, slug, content, excerpt, category, author_id, image_url, status, published_at, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        ).bind(title, slug, content, excerpt, category, author_id || 1, image_url, status, published_at).run();

        if (success) {
            return NextResponse.json({ message: 'Article created successfully' }, { status: 201 });
        } else {
            return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const db = getRequestContext().env.DB;
        const body = await request.json();
        const { id, title, slug, content, excerpt, category, image_url, status } = body;

        const published_at = status === 'published' ? new Date().toISOString() : null;

        const { success } = await db.prepare(
            `UPDATE articles SET title = ?, slug = ?, content = ?, excerpt = ?, category = ?, image_url = ?, status = ?, published_at = COALESCE(published_at, ?), updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(title, slug, content, excerpt, category, image_url, status, published_at, id).run();

        if (success) {
            return NextResponse.json({ message: 'Article updated successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const db = getRequestContext().env.DB;
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const { success } = await db.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();

        if (success) {
            return NextResponse.json({ message: 'Article deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}