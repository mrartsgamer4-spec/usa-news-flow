import { siteConfig } from './siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl, getAuthorUrl, getCategoryUrl } from './urls';

export interface BreadcrumbItem {
    name: string;
    url: string;
}

/**
 * জেনারেট করে NewsArticle Schema (গুগল নিউজের জন্য অত্যন্ত গুরুত্বপূর্ণ)
 */
export function generateNewsArticleSchema(article: Article) {
    const articleUrl = getArticleUrl(article.category, article.slug);
    const authorUrl = getAuthorUrl(article.author_slug || 'editorial-team');
    const imageUrl = article.featured_image || siteConfig.defaultOgImage;

    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        headline: article.meta_title || article.title,
        description: article.meta_description || article.excerpt || article.title,
        image: [imageUrl],
        datePublished: article.published_at,
        dateModified: article.updated_at || article.published_at,
        author: {
            '@type': 'Person',
            name: article.author || 'Editorial Team',
            url: authorUrl,
        },
        publisher: {
            '@type': 'NewsMediaOrganization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}${siteConfig.logo}`,
            },
        },
        ...(article.source_name && {
            isBasedOn: {
                '@type': 'CreativeWork',
                name: article.source_name,
                ...(article.source_url && { url: article.source_url }),
            },
        }),
    };
}

/**
 * জেনারেট করে BreadcrumbList Schema (সার্চ রেজাল্টে সুন্দর নেভিগেশন লিংক দেখানোর জন্য)
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * জেনারেট করে Organization / NewsMediaOrganization Schema (ওয়েবসাইট ব্র্যান্ড ট্রাস্ট বাড়ানোর জন্য)
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        sameAs: siteConfig.sameAs.filter(Boolean),
        publishingPrinciples: `${siteConfig.url}/editorial-policy`,
        correctionsPolicy: `${siteConfig.url}/corrections-policy`,
    };
}

/**
 * জেনারেট করে WebSite Schema (গুগল সাইট সার্চ বক্স সাপোর্ট নিশ্চিত করার জন্য)
 */
export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteConfig.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}