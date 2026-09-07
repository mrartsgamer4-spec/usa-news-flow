import { MetadataRoute } from 'next';
import * as mockDataModule from '@/lib/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://usanewsflow.com';

    // Extract articles array safely regardless of export structure
    const rawArticles =
        (mockDataModule as Record<string, unknown>).MockNewsData ||
        (mockDataModule as Record<string, unknown>).mockArticles ||
        (mockDataModule as Record<string, unknown>).default ||
        [];

    const articles = Array.isArray(rawArticles) ? rawArticles : [];

    const articleEntries = articles.map((article: Record<string, unknown>) => ({
        url: `${baseUrl}/news/${article.slug || ''}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt as string) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        ...articleEntries,
    ];
}