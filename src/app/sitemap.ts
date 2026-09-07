import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url;

    // Static pages
    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/about',
        '/contact',
        '/editorial-policy',
        '/corrections-policy',
        '/advertising-policy',
        '/privacy-policy',
        '/terms-of-use',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'always' : 'monthly',
        priority: route === '' ? 1.0 : 0.5,
    }));

    // Dynamic Articles & Categories
    const articles = await getPublishedArticles();

    const categorySet = new Set<string>();
    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
        if (article.category) {
            categorySet.add(article.category);
        }
        return {
            url: getArticleUrl(article.category, article.slug),
            lastModified: new Date(article.updated_at || article.published_at),
            changeFrequency: 'weekly',
            priority: 0.8,
        };
    });

    const categoryRoutes: MetadataRoute.Sitemap = Array.from(categorySet).map((cat) => ({
        url: getCategoryUrl(cat),
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}