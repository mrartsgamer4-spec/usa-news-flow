export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

type NewsBody = {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    subcategory?: string;
    featured_image?: string;
    image_alt?: string;
    image_caption?: string;
    author_id?: string | null;
    author?: string;
    author_slug?: string;
    status?: string;
    published_at?: string | null;
    updated_at?: string | null;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    source_name?: string;
    source_url?: string;
};

function errorResponse(message: string, status = 400) {
    return NextResponse.json(
        { error: message },
        { status }
    );
}

/* =========================================================
   GET NEWS
   ========================================================= */

export async function GET(request: Request) {
    try {
        const db = getRequestContext().env.DB;

        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const slug = searchParams.get('slug');
        const status = searchParams.get('status');
        const limitParam = searchParams.get('limit');

        const requestedLimit = Number(limitParam || 50);

        const limit =
            Number.isFinite(requestedLimit) && requestedLimit > 0
                ? Math.min(Math.floor(requestedLimit), 100)
                : 50;

        /* Get one article by slug */
        if (slug) {
            const article = await db
                .prepare(`
                    SELECT *
                    FROM articles
                    WHERE slug = ?
                    AND status = 'published'
                    LIMIT 1
                `)
                .bind(slug)
                .first();

            if (!article) {
                return errorResponse(
                    'Article not found',
                    404
                );
            }

            return NextResponse.json(article);
        }

        let result;

        /* Admin can request all articles */
        if (status === 'all') {
            result = await db
                .prepare(`
                    SELECT *
                    FROM articles
                    ORDER BY published_at DESC
                    LIMIT ?
                `)
                .bind(limit)
                .all();
        }

        /* Category */
        else if (category) {
            result = await db
                .prepare(`
                    SELECT *
                    FROM articles
                    WHERE category = ?
                    AND status = 'published'
                    ORDER BY published_at DESC
                    LIMIT ?
                `)
                .bind(category, limit)
                .all();
        }

        /* Public latest news */
        else {
            result = await db
                .prepare(`
                    SELECT *
                    FROM articles
                    WHERE status = 'published'
                    ORDER BY published_at DESC
                    LIMIT ?
                `)
                .bind(limit)
                .all();
        }

        return NextResponse.json(
            result.results || []
        );

    } catch (error) {

        console.error(
            'GET /api/news error:',
            error
        );

        return errorResponse(
            'Failed to fetch news',
            500
        );
    }
}


/* =========================================================
   CREATE NEWS
   ========================================================= */

export async function POST(request: Request) {
    try {
        const db = getRequestContext().env.DB;

        const body =
            (await request.json()) as NewsBody;

        const title =
            body.title?.trim();

        const slug =
            body.slug?.trim();

        const content =
            body.content?.trim();

        const category =
            body.category?.trim();

        /* Required fields */

        if (!title) {
            return errorResponse(
                'Title is required'
            );
        }

        if (!slug) {
            return errorResponse(
                'Slug is required'
            );
        }

        if (!content) {
            return errorResponse(
                'Content is required'
            );
        }

        if (!category) {
            return errorResponse(
                'Category is required'
            );
        }

        /* Generate ID */

        const id =
            body.id?.trim() ||
            crypto.randomUUID();

        /* Status */

        const articleStatus =
            body.status === 'draft'
                ? 'draft'
                : 'published';

        /* Published date */

        const publishedAt =
            articleStatus === 'published'
                ? (
                    body.published_at ||
                    new Date().toISOString()
                )
                : null;

        const updatedAt =
            new Date().toISOString();

        /* INSERT */

        const result = await db
            .prepare(`
                INSERT INTO articles (
                    id,
                    slug,
                    title,
                    excerpt,
                    content,
                    category,
                    subcategory,
                    featured_image,
                    image_alt,
                    image_caption,
                    author_id,
                    author,
                    author_slug,
                    status,
                    published_at,
                    updated_at,
                    meta_title,
                    meta_description,
                    canonical_url,
                    source_name,
                    source_url
                )
                VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )
            `)
            .bind(
                id,
                slug,
                title,
                body.excerpt?.trim() || null,
                content,
                category,
                body.subcategory?.trim() || null,
                body.featured_image?.trim() || null,
                body.image_alt?.trim() || null,
                body.image_caption?.trim() || null,
                body.author_id || null,
                body.author?.trim() ||
                'Editorial Team',
                body.author_slug?.trim() ||
                null,
                articleStatus,
                publishedAt,
                updatedAt,
                body.meta_title?.trim() ||
                null,
                body.meta_description?.trim() ||
                null,
                body.canonical_url?.trim() ||
                null,
                body.source_name?.trim() ||
                null,
                body.source_url?.trim() ||
                null
            )
            .run();

        if (!result.success) {
            return errorResponse(
                'Failed to create article',
                500
            );
        }

        /* Return created article */

        const article = await db
            .prepare(`
                SELECT *
                FROM articles
                WHERE id = ?
                LIMIT 1
            `)
            .bind(id)
            .first();

        return NextResponse.json(
            {
                message:
                    'Article created successfully',
                article,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        console.error(
            'POST /api/news error:',
            error
        );

        const message =
            error instanceof Error
                ? error.message
                : '';

        if (
            message
                .toLowerCase()
                .includes('unique')
        ) {
            return errorResponse(
                'Slug already exists. Please use a different slug.',
                409
            );
        }

        return errorResponse(
            'Server error while creating article',
            500
        );
    }
}


/* =========================================================
   UPDATE NEWS
   ========================================================= */

export async function PUT(request: Request) {
    try {
        const db = getRequestContext().env.DB;

        const body =
            (await request.json()) as NewsBody;

        const id =
            body.id?.trim();

        if (!id) {
            return errorResponse(
                'Article ID is required'
            );
        }

        const title =
            body.title?.trim();

        const slug =
            body.slug?.trim();

        const content =
            body.content?.trim();

        const category =
            body.category?.trim();

        if (!title) {
            return errorResponse(
                'Title is required'
            );
        }

        if (!slug) {
            return errorResponse(
                'Slug is required'
            );
        }

        if (!content) {
            return errorResponse(
                'Content is required'
            );
        }

        if (!category) {
            return errorResponse(
                'Category is required'
            );
        }

        /* Check existing article */

        const existing =
            await db
                .prepare(`
                    SELECT
                        id,
                        published_at
                    FROM articles
                    WHERE id = ?
                    LIMIT 1
                `)
                .bind(id)
                .first<{
                    id: string;
                    published_at:
                    string | null;
                }>();

        if (!existing) {
            return errorResponse(
                'Article not found',
                404
            );
        }

        const articleStatus =
            body.status === 'draft'
                ? 'draft'
                : 'published';

        let publishedAt =
            existing.published_at;

        /* Draft -> Published */

        if (
            articleStatus === 'published' &&
            !publishedAt
        ) {
            publishedAt =
                body.published_at ||
                new Date().toISOString();
        }

        /* Explicit published date */

        if (
            body.published_at
        ) {
            publishedAt =
                body.published_at;
        }

        const updatedAt =
            new Date().toISOString();

        const result =
            await db
                .prepare(`
                    UPDATE articles
                    SET
                        slug = ?,
                        title = ?,
                        excerpt = ?,
                        content = ?,
                        category = ?,
                        subcategory = ?,
                        featured_image = ?,
                        image_alt = ?,
                        image_caption = ?,
                        author_id = ?,
                        author = ?,
                        author_slug = ?,
                        status = ?,
                        published_at = ?,
                        updated_at = ?,
                        meta_title = ?,
                        meta_description = ?,
                        canonical_url = ?,
                        source_name = ?,
                        source_url = ?
                    WHERE id = ?
                `)
                .bind(
                    slug,
                    title,
                    body.excerpt?.trim() ||
                    null,
                    content,
                    category,
                    body.subcategory?.trim() ||
                    null,
                    body.featured_image?.trim() ||
                    null,
                    body.image_alt?.trim() ||
                    null,
                    body.image_caption?.trim() ||
                    null,
                    body.author_id ||
                    null,
                    body.author?.trim() ||
                    'Editorial Team',
                    body.author_slug?.trim() ||
                    null,
                    articleStatus,
                    publishedAt,
                    updatedAt,
                    body.meta_title?.trim() ||
                    null,
                    body.meta_description?.trim() ||
                    null,
                    body.canonical_url?.trim() ||
                    null,
                    body.source_name?.trim() ||
                    null,
                    body.source_url?.trim() ||
                    null,
                    id
                )
                .run();

        if (!result.success) {
            return errorResponse(
                'Failed to update article',
                500
            );
        }

        const article =
            await db
                .prepare(`
                    SELECT *
                    FROM articles
                    WHERE id = ?
                    LIMIT 1
                `)
                .bind(id)
                .first();

        return NextResponse.json({
            message:
                'Article updated successfully',
            article,
        });

    } catch (error) {

        console.error(
            'PUT /api/news error:',
            error
        );

        const message =
            error instanceof Error
                ? error.message
                : '';

        if (
            message
                .toLowerCase()
                .includes('unique')
        ) {
            return errorResponse(
                'Slug already exists. Please use a different slug.',
                409
            );
        }

        return errorResponse(
            'Server error while updating article',
            500
        );
    }
}


/* =========================================================
   DELETE NEWS
   ========================================================= */

export async function DELETE(request: Request) {
    try {
        const db = getRequestContext().env.DB;

        const { searchParams } =
            new URL(request.url);

        const id =
            searchParams.get('id');

        if (!id) {
            return errorResponse(
                'Article ID is required'
            );
        }

        const existing =
            await db
                .prepare(`
                    SELECT id
                    FROM articles
                    WHERE id = ?
                    LIMIT 1
                `)
                .bind(id)
                .first();

        if (!existing) {
            return errorResponse(
                'Article not found',
                404
            );
        }

        const result =
            await db
                .prepare(`
                    DELETE FROM articles
                    WHERE id = ?
                `)
                .bind(id)
                .run();

        if (!result.success) {
            return errorResponse(
                'Failed to delete article',
                500
            );
        }

        return NextResponse.json({
            message:
                'Article deleted successfully',
        });

    } catch (error) {

        console.error(
            'DELETE /api/news error:',
            error
        );

        return errorResponse(
            'Server error while deleting article',
            500
        );
    }
}