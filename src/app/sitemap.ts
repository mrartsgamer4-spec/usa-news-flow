import { MetadataRoute } from 'next';
import { mockArticles, Article } from '@/lib/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://usanewsflow.com';

    const newsEntries = mockArticles.map((article: Article) => ({
        url: `${baseUrl}/news/${article.category.toLowerCase()}/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    const staticPages = [
        '',
        '/about-us',
        '/privacy-policy',
        '/terms-of-use',
        '/editorial-policy',
        '/advertising-policy',
        '/corrections-policy',
        '/calculators',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...staticPages, ...newsEntries];
}