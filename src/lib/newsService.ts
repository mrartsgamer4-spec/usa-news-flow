import { getRequestContext } from '@cloudflare/next-on-pages';
import { Article } from '@/types/article';

export async function getPublishedArticles(): Promise<Article[]> {
    try {
        const db = getRequestContext().env.DB;
        if (!db) return [];

        const { results } = await db.prepare(
            "SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC LIMIT 20"
        ).all();

        return (results as unknown) as Article[];
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const db = getRequestContext().env.DB;
        if (!db) return null;

        const article = await db.prepare(
            "SELECT * FROM articles WHERE slug = ? AND status = 'published'"
        ).bind(slug).first();

        return (article as unknown) as Article | null;
    } catch (error) {
        console.error("Error fetching article by slug:", error);
        return null;
    }
}