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
 * Fetch all published articles from Cloudflare D1
 */
export async function getPublishedArticles(): Promise<Article[]> {
    try {
        const { env } = getRequestContext();
        if (!env.DB) {
            console.warn('Cloudflare D1 binding (DB) is missing.');
            return [];
        }

        const query = `
            SELECT 
                a.id,
                a.title,
                a.slug,
                a.category,
                a.sub_category,
                a.excerpt,
                a.content,
                a.featured_image,
                a.image_alt,
                a.image_caption,
                COALESCE(auth.name, 'Editorial Team') AS author,
                a.author_id,
                a.status,
                a.meta_title,
                a.meta_description,
                a.canonical_url,
                a.source_name,
                a.source_url,
                a.published_at,
                a.updated_at
            FROM articles a
            LEFT JOIN authors auth ON a.author_id = auth.id
            WHERE a.status = 'published'
            ORDER BY a.published_at DESC
        `;

        const { results } = await env.DB.prepare(query).all<Article>();
        return results || [];
    } catch (error) {
        console.error('Error fetching published articles from D1:', error);
        return [];
    }
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const { env } = getRequestContext();
        if (!env.DB) return null;

        const query = `
            SELECT 
                a.id,
                a.title,
                a.slug,
                a.category,
                a.sub_category,
                a.excerpt,
                a.content,
                a.featured_image,
                a.image_alt,
                a.image_caption,
                COALESCE(auth.name, 'Editorial Team') AS author,
                a.author_id,
                a.status,
                a.meta_title,
                a.meta_description,
                a.canonical_url,
                a.source_name,
                a.source_url,
                a.published_at,
                a.updated_at
            FROM articles a
            LEFT JOIN authors auth ON a.author_id = auth.id
            WHERE a.slug = ? AND a.status = 'published'
            LIMIT 1
        `;

        const article = await env.DB.prepare(query).bind(slug).first<Article>();
        return article || null;
    } catch (error) {
        console.error(`Error fetching article by slug (${slug}):`, error);
        return null;
    }
}

/**
 * Fetch articles by category
 */
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
    const allArticles = await getPublishedArticles();
    return allArticles.filter(
        (article) =>
            article.category
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-') === categorySlug.toLowerCase()
    );
}