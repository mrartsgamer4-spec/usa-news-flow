import { getRequestContext } from '@cloudflare/next-on-pages';

import { Article } from '@/types/article';


export async function getPublishedArticles(limit: number = 20): Promise<Article[]> {

    try {

        const { env } = getRequestContext();

        const db = env.DB;

        if (!db) {

            console.error('D1 binding DB not found');

            return [];

        }

        const safeLimit = Math.max(1, Math.min(1000, Math.floor(limit) || 20));

        const { results } = await db
            .prepare(`

                SELECT *

                FROM articles

                WHERE status = 'published'

                ORDER BY published_at DESC

                LIMIT ${safeLimit}

            `)
            .all();

        return results as unknown as Article[];

    } catch (error) {

        console.error(

            'Error fetching published articles:',

            error

        );

        return [];

    }

}


export async function getArticleBySlug(
    slug: string
): Promise<Article | null> {

    try {

        const { env } = getRequestContext();

        const db = env.DB;

        if (!db) {

            console.error('D1 binding DB not found');

            return null;

        }

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

        return article as unknown as Article | null;

    } catch (error) {

        console.error(

            'Error fetching article:',

            error

        );

        return null;

    }

}
