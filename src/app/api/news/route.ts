export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

function getDb() {
    let db: any = null;
    try {
        const ctx = getRequestContext();
        db = ctx?.env?.DB;
    } catch (e) { }
    if (!db) db = (process.env as any).DB;
    return db;
}

export async function GET(req: NextRequest) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const article = await db
                .prepare('SELECT * FROM articles WHERE slug = ? LIMIT 1')
                .bind(slug)
                .first();
            return NextResponse.json({ success: true, article });
        }

        const { results } = await db
            .prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT 100')
            .all();

        return NextResponse.json({ success: true, articles: results || [] });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });

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

        let finalSlug = (slug || title)
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        if (!finalSlug) finalSlug = `news-${Date.now()}`;

        // সাব-ক্যাটাগরি থাকলে সেটির নাম ও স্লাগ উভয়ই tags-এ সেভ করা যাতে ফিল্টারিং কাজ করে
        let finalTags = tags ? tags.trim() : '';
        if (sub_category && sub_category.trim()) {
            const subSlug = sub_category.toLowerCase().replace(/[\s_]+/g, '-');
            finalTags = `${sub_category}, ${subSlug}${finalTags ? `, ${finalTags}` : ''}`;
        }

        const articleId = crypto.randomUUID();
        const now = new Date().toISOString();

        await db
            .prepare(`
                INSERT INTO articles (
                    id, title, slug, excerpt, content, category,
                    author_name, featured_image, image_alt, tags, status,
                    views, created_at, updated_at, published_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
            `)
            .bind(
                articleId,
                title,
                finalSlug,
                excerpt || '',
                content,
                category || 'U.S. News',
                finalAuthor,
                featured_image || '',
                image_alt || title,
                finalTags,
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

export async function PUT(req: NextRequest) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });

        const body = await req.json();
        const {
            id,
            title,
            slug,
            excerpt,
            content,
            category,
            sub_category,
            reporter_name,
            featured_image,
            image_alt,
            tags
        } = body;

        if (!id || !title) {
            return NextResponse.json({ success: false, error: 'Article ID and Title are required' }, { status: 400 });
        }

        let finalTags = tags ? tags.trim() : '';
        if (sub_category && sub_category.trim()) {
            const subSlug = sub_category.toLowerCase().replace(/[\s_]+/g, '-');
            finalTags = `${sub_category}, ${subSlug}${finalTags ? `, ${finalTags}` : ''}`;
        }

        const now = new Date().toISOString();

        await db
            .prepare(`
                UPDATE articles SET 
                    title = ?, slug = ?, excerpt = ?, content = ?, 
                    category = ?, author_name = ?, featured_image = ?, 
                    image_alt = ?, tags = ?, updated_at = ?
                WHERE id = ?
            `)
            .bind(
                title,
                slug,
                excerpt || '',
                content,
                category,
                reporter_name || 'Editorial Staff',
                featured_image || '',
                image_alt || title,
                finalTags,
                now,
                id
            )
            .run();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Article ID required' }, { status: 400 });
        }

        await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}