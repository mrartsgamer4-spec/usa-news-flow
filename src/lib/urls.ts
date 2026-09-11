export function getArticleUrl(category: any, slug: string): string {
    let catSlug = 'general';

    if (typeof category === 'string') {
        catSlug = category;
    } else if (category && typeof category === 'object' && 'name' in category) {
        catSlug = category.name || 'general';
    }

    const cleanCategory = catSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const cleanSlug = (slug || '')
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `/news/${cleanCategory || 'general'}/${cleanSlug}`;
}

export function getCategoryUrl(category: any): string {
    let catSlug = 'general';

    if (typeof category === 'string') {
        catSlug = category;
    } else if (category && typeof category === 'object' && 'name' in category) {
        catSlug = category.name || 'general';
    }

    const cleanCategory = catSlug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `/news/category/${cleanCategory || 'general'}`;
}

export function getAuthorUrl(slug: string): string {
    const cleanSlug = (slug || '')
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `/author/${cleanSlug || 'editorial-staff'}`;
}