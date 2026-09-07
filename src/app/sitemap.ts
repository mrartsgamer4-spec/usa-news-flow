import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { getPublishedArticles } from '@/lib/newsService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url;

    // Static Routes
    const staticRoutes = [
        '',
        '/about-us',
        '/contact',
        '/privacy-policy',
        '/terms-of-use',
        '/news/category/us-news',
        '/news/category/politics',
        '/news/category/business',
        '/news/category/technology',
        '/news/category/sports',
        '/news/category/world',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'always' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic Published Article Routes
    const articles = await getPublishedArticles();
    const articleUrls = articles.map((article) => ({
        url: `${baseUrl}/news/${article.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}/${article.slug}`,
        lastModified: new Date(article.updated_at || article.published_at).toISOString(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...articleUrls];
}