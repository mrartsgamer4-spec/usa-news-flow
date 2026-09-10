import { siteConfig } from '@/lib/siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl } from '@/lib/urls';

export function generateNewsArticleSchema(article: Article) {
    const catName = typeof article.category === 'string'
        ? article.category
        : article.category?.name || 'News';

    const authorName = typeof article.author === 'string'
        ? article.author
        : article.author?.name || 'Editorial Team';

    const canonicalUrl = article.canonical_url || `${siteConfig.url}${getArticleUrl(catName, article.slug)}`;
    const imageUrl = article.featured_image || article.coverImage || siteConfig.defaultOgImage;
    const publishDate = article.published_at || article.publishedAt || new Date().toISOString();
    const updateDate = article.updated_at || article.updatedAt || publishDate;

    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
        headline: article.title,
        description: article.excerpt || article.meta_description || article.title,
        image: [imageUrl],
        datePublished: publishDate,
        dateModified: updateDate,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.png`,
            },
        },
        articleSection: catName,
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
        })),
    };
}