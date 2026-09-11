export function getArticleUrl(category: any, slug: string): string {
    const cleanSlug = encodeURIComponent((slug || '').toString().trim());
    return `/news/article/${cleanSlug}`;
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
    return `/author/${encodeURIComponent((slug || 'editorial-staff').toString().trim())}`;
}