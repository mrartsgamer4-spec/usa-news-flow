import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl } from '@/lib/urls';

async function fetchAllArticles(): Promise<Article[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
        const res = await fetch(`${baseUrl}/api/news?limit=100`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data : (data.articles || []);
        }
    } catch (e) {
        console.error('Failed to fetch articles for main sitemap', e);
    }
    return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await fetchAllArticles();

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => {
        const catName = typeof article.category === 'string' ? article.category : article.category?.name || 'news';
        const url = article.canonical_url || `${siteConfig.url}${getArticleUrl(catName, article.slug)}`;
        const lastModified = article.updated_at || article.updatedAt || article.published_at || article.publishedAt || new Date();

        return {
            url,
            lastModified: new Date(lastModified),
            changeFrequency: 'daily',
            priority: 0.8,
        };
    });

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1.0,
        },
        ...articleEntries,
    ];
}