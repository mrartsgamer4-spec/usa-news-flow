import { mockArticles } from '@/lib/mockData';
import { Article } from '@/types/article';

export async function getPublishedArticles(): Promise<Article[]> {
    try {
        const mappedArticles: Article[] = (mockArticles || []).map((art: any, idx: number) => ({
            id: art.id || `art-${idx}`,
            title: art.title || '',
            slug: art.slug || (art.title ? art.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `news-${idx}`),
            excerpt: art.excerpt || '',
            content: art.content || '',
            featured_image: art.featuredImage || art.image || art.featured_image,
            image_alt: art.title || 'News image',
            category: art.category || 'us-news',
            author: art.reporterName || art.author || 'USA News Flow Staff',
            status: 'published',
            featured: idx === 0 ? 1 : 0,
            breaking: idx < 2 ? 1 : 0,
            published_at: art.publishedAt || art.published_at || new Date().toISOString(),
            updated_at: art.publishedAt || art.published_at || new Date().toISOString(),
        }));

        return mappedArticles;
    } catch (error) {
        console.error("Error fetching news articles:", error);
        return [];
    }
}