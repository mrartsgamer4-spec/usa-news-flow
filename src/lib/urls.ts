import { siteConfig } from './siteConfig';

function slugify(text: string): string {
    if (!text) return 'general';
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

/**
 * জেনারেট করে যেকোনো আর্টিকেলের ক্যানোনিকাল ও রিলেটিভ URL
 */
export function getArticleUrl(category: string, slug: string): string {
    const cleanCategory = slugify(category);
    return `${siteConfig.url}/news/${cleanCategory}/${slug}`;
}

/**
 * জেনারেট করে ক্যাটাগরি পেজের URL
 */
export function getCategoryUrl(category: string): string {
    const cleanCategory = slugify(category);
    return `${siteConfig.url}/news/category/${cleanCategory}`;
}

/**
 * জেনারেট করে লেখক পেজের URL
 */
export function getAuthorUrl(slug: string): string {
    const cleanSlug = slugify(slug || 'editorial-team');
    return `${siteConfig.url}/author/${cleanSlug}`;
}

/**
 * জেনারেট করে স্ট্যাটিক পেজের URL
 */
export function getStaticUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${siteConfig.url}/${cleanPath}`;
}