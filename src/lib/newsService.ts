import { getRequestContext } from '@cloudflare/next-on-pages';

export interface Author {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    photo_url?: string;
    twitter_handle?: string;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    sub_category?: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    image_alt?: string;
    image_caption?: string;
    author: string;
    author_id?: string;
    author_slug?: string;
    status: 'draft' | 'published' | 'archived';
    breaking?: boolean;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    source_name?: string;
    source_url?: string;
    published_at: string;
    updated_at: string;
}

/**
 * Fetch all published articles with Author details
 */
export async function getPublishedArticles(limit: number = 50, offset: number = 0): Promise<Article[]> {
    try {
        const { env } = getRequestContext();
        if (!env?.DB) {
            console.warn('D1 Database binding (DB) is missing.');
            return [];
        }

        const query = `
            SELECT 
                a.id, a.title, a.slug, a.category, a.sub_category,
                a.excerpt, a.content, a.featured_image, a.image_alt, a.image_caption,
                COALESCE(auth.name, 'Editorial Team') AS author,
                COALESCE(auth.slug, 'editorial-team') AS author_slug,
                a.author_id, a.status, a.meta_title, a.meta_description,
                a.canonical_url, a.source_name, a.source_url, a.published_at, a.updated_at
            FROM articles a
            LEFT JOIN authors auth ON a.author_id = auth.id
            WHERE LOWER(a.status) = 'published'
            ORDER BY a.published_at DESC
            LIMIT ? OFFSET ?
        `;

        const { results } = await env.DB.prepare(query).bind(limit, offset).all<Article>();
        return results || [];
    } catch (error) {
        console.error('Error fetching published articles from D1:', error);
        return [];
    }
}

/**
 * Fetch articles directly by Category from Database
 */
export async function getArticlesByCategory(category: string, limit: number = 20, offset: number = 0): Promise<Article[]> {
    try {
        const { env } = getRequestContext();
        if (!env?.DB) return [];

        const query = `
            SELECT 
                a.id, a.title, a.slug, a.category, a.sub_category,
                a.excerpt, a.content, a.featured_image, a.image_alt, a.image_caption,
                COALESCE(auth.name, 'Editorial Team') AS author,
                COALESCE(auth.slug, 'editorial-team') AS author_slug,
                a.author_id, a.status, a.meta_title, a.meta_description,
                a.canonical_url, a.source_name, a.source_url, a.published_at, a.updated_at
            FROM articles a
            LEFT JOIN authors auth ON a.author_id = auth.id
            WHERE LOWER(a.status) = 'published' AND LOWER(REPLACE(a.category, ' ', '-')) = LOWER(?)
            ORDER BY a.published_at DESC
            LIMIT ? OFFSET ?
        `;

        const { results } = await env.DB.prepare(query).bind(category, limit, offset).all<Article>();
        return results || [];
    } catch (error) {
        console.error(`Error fetching category (${category}) from D1:`, error);
        return [];
    }
}