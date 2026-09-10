import { Article } from '@/types/article';

export async function getPublishedArticles(): Promise<Article[]> {
    try {
        if (typeof process !== 'undefined' && process.env) {
            const { getRequestContext } = await import('@cloudflare/next-on-pages');
            const { env } = getRequestContext();

            if (env?.DB) {
                const result = await env.DB.prepare(
                    `SELECT * FROM articles 
           WHERE status = 'published' OR status IS NULL 
           ORDER BY published_at DESC`
                ).all<Article>();

                return result.results || [];
            }
        }
    } catch (error) {
        console.error('Error fetching published articles:', error);
    }

    return [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        if (typeof process !== 'undefined' && process.env) {
            const { getRequestContext } = await import('@cloudflare/next-on-pages');
            const { env } = getRequestContext();

            if (env?.DB) {
                const article = await env.DB.prepare(
                    `SELECT * FROM articles WHERE slug = ? AND (status = 'published' OR status IS NULL) LIMIT 1`
                )
                    .bind(slug)
                    .first<Article>();

                return article || null;
            }
        }
    } catch (error) {
        console.error('Error fetching article by slug:', error);
    }

    return null;
}