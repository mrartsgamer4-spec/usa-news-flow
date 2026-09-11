import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url.replace(/\/+$/, '');
    const articles = (await getPublishedArticles()) || [];

    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/about-us',
        '/contact',
        '/privacy-policy',
        '/terms-of-use',
        '/editorial-policy',
        '/corrections-policy',
        '/advertising-policy',
        '/calculators',
        '/calculators/mortgage',
        '/calculators/loan',
        '/calculators/salary',
        '/calculators/tax',
        '/calculators/percentage',
        '/tools/image-to-pdf',
        '/tools/pdf-to-image',
        '/tools/qr-code',
        '/tools/word-to-pdf',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'always' : 'weekly',
        priority: route === '' ? 1.0 : 0.6,
    }));

    const categories = ['politics', 'us-news', 'world', 'business', 'technology', 'health', 'sports', 'entertainment', 'opinion'];
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}${getCategoryUrl(cat)}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
    }));

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article: any) => {
        const relativeUrl = getArticleUrl(article.category, article.slug);
        return {
            url: `${baseUrl}${relativeUrl}`,
            lastModified: new Date(article.updated_at || article.published_at || Date.now()),
            changeFrequency: 'daily',
            priority: 0.7,
        };
    });

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}