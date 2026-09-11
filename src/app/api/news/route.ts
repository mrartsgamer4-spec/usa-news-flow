export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(req: NextRequest) {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }
        if (!db) db = (process.env as any).DB;

        if (!db) {
            return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });
        }

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const sub = searchParams.get('sub');
        const slug = searchParams.get('slug');

        if (slug) {
            const article = await db
                .prepare('SELECT * FROM articles WHERE slug = ? LIMIT 1')
                .bind(slug)
                .first();
            return NextResponse.json({ success: true, article });
        }

        let query = 'SELECT * FROM articles WHERE 1=1';
        const bindings: any[] = [];

        if (category && category !== 'all') {
            const cleanCat = category.replace(/-/g, ' ');
            query += ' AND (LOWER(category) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?))';
            bindings.push(`%${category}%`, `%${cleanCat}%`);
        }

        if (sub && sub !== 'all') {
            const cleanSub = sub.replace(/-/g, ' ');
            query += ' AND (LOWER(sub_category) LIKE LOWER(?) OR LOWER(tags) LIKE LOWER(?) OR LOWER(sub_category) LIKE LOWER(?))';
            bindings.push(`%${sub}%`, `%${sub}%`, `%${cleanSub}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT 100';

        const stmt = db.prepare(query);
        const { results } = await stmt.bind(...bindings).all();

        return NextResponse.json({ success: true, articles: results || [] });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }
        if (!db) db = (process.env as any).DB;

        if (!db) {
            return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });
        }

        const body = await req.json();
        const {
            title,
            slug,
            excerpt,
            content,
            category,
            sub_category,
            reporter_name,
            author_name,
            featured_image,
            image_alt,
            tags,
            status
        } = body;

        if (!title || !content) {
            return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
        }

        const finalAuthor = reporter_name || author_name || 'Editorial Staff';
        const finalSlug = (slug || title)
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') || `news-${Date.now()}`;

        const articleId = crypto.randomUUID();
        const now = new Date().toISOString();

        await db
            .prepare(`
                INSERT INTO articles (
                    id, title, slug, excerpt, content, category, sub_category,
                    author_name, featured_image, image_alt, tags, status,
                    views, created_at, updated_at, published_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
            `)
            .bind(
                articleId,
                title,
                finalSlug,
                excerpt || '',
                content,
                category || 'U.S. News',
                sub_category || '',
                finalAuthor,
                featured_image || '',
                image_alt || title,
                tags || '',
                status || 'published',
                now,
                now,
                now
            )
            .run();

        return NextResponse.json({ success: true, id: articleId, slug: finalSlug });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}