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

// পরিচিত সাব-ক্যাটাগরি তালিকা (ট্যাগ থেকে স্বয়ংক্রিয়ভাবে শনাক্ত করার জন্য)
const KNOWN_SUBS = [
    'Congress', 'Elections', 'Policy & Law',
    'Donald Trump', 'White House News', 'Breaking News',
    'Global Affairs', 'Europe', 'Asia-Pacific', 'Middle East',
    'Economy', 'Markets', 'Finance', 'Real Estate',
    'AI News', 'Latest AI News', 'AI Technology',
    'Medicine', 'Wellness', 'Research',
    'NFL & Football', 'NBA & Basketball', 'Cricket'
];

function extractSubCategory(tags?: string): string {
    if (!tags) return '';
    const tagList = tags.split(',').map(t => t.trim().toLowerCase());
    for (const sub of KNOWN_SUBS) {
        const subLower = sub.toLowerCase();
        const subSlug = subLower.replace(/[\s_]+/g, '-');
        if (tagList.includes(subLower) || tagList.includes(subSlug)) {
            return sub;
        }
    }
    return '';
}

export async function GET(req: NextRequest) {
    try {
        const db = getDb();
        if (!db) return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 500 });

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const article: any = await db
                .prepare('SELECT * FROM articles WHERE slug = ? LIMIT 1')
                .bind(slug)
                .first();

            if (article) {
                article.sub_category = extractSubCategory(article.tags);
                article.subcategory = article.sub_category;
            }
            return NextResponse.json({ success: true, article });
        }

        const { results } = await db
            .prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT 100')
            .all();

        const formattedResults = (results || []).map((art: any) => {
            const detectedSub = extractSubCategory(art.tags);
            return {
                ...art,
                sub_category: detectedSub,
                subcategory: detectedSub
            };
        });

        return NextResponse.json({ success: true, articles: formattedResults });
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

        // পরিষ্কার ট্যাগ ফরম্যাটিং
        let tagArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
        if (sub_category && sub_category.trim()) {
            const cleanSub = sub_category.trim();
            const subSlug = cleanSub.toLowerCase().replace(/[\s_]+/g, '-');
            // ডুপ্লিকেট এড়াতে ফিল্টার করে শুরুতে যুক্ত করা
            tagArray = tagArray.filter((t: string) => t.toLowerCase() !== cleanSub.toLowerCase() && t.toLowerCase() !== subSlug);
            tagArray.unshift(cleanSub, subSlug);
        }
        const finalTags = tagArray.join(', ');

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
            author_name,
            featured_image,
            image_alt,
            tags
        } = body;

        if (!id || !title) {
            return NextResponse.json({ success: false, error: 'Article ID and Title are required' }, { status: 400 });
        }

        // এডিটের সময় ট্যাগগুলো থেকে পুরনো সাব-ক্যাটাগরি পরিষ্কার করে নতুনটি সেট করা
        let tagArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

        // সব সম্ভাব্য সাব-ক্যাটাগরি ট্যাগ আগে রিমুভ করা
        tagArray = tagArray.filter((t: string) => {
            const lower = t.toLowerCase();
            return !KNOWN_SUBS.some(sub => sub.toLowerCase() === lower || sub.toLowerCase().replace(/[\s_]+/g, '-') === lower);
        });

        if (sub_category && sub_category.trim()) {
            const cleanSub = sub_category.trim();
            const subSlug = cleanSub.toLowerCase().replace(/[\s_]+/g, '-');
            tagArray.unshift(cleanSub, subSlug);
        }
        const finalTags = tagArray.join(', ');

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
                reporter_name || author_name || 'Editorial Staff',
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