export function getArticleUrl(category: any, slug: string): string {
    let catSlug = 'general';

    if (typeof category === 'string') {
        catSlug = category;
    } else if (category && typeof category === 'object' && 'name' in category) {
        catSlug = category.name || 'general';
    }

    const cleanCategory = encodeURIComponent(
        catSlug.toString().toLowerCase().trim().replace(/\s+/g, '-')
    );

    const cleanSlug = encodeURIComponent(
        (slug || '').toString().trim()
    );

    return `/news/${cleanCategory}/${cleanSlug}`;
}

export function getCategoryUrl(category: any): string {
    let catSlug = 'general';

    if (typeof category === 'string') {
        catSlug = category;
    } else if (category && typeof category === 'object' && 'name' in category) {
        catSlug = category.name || 'general';
    }

    const cleanCategory = encodeURIComponent(
        catSlug.toString().toLowerCase().trim().replace(/\s+/g, '-')
    );

    return `/news/category/${cleanCategory}`;
}

export function getAuthorUrl(slug: string): string {
    return `/author/${encodeURIComponent((slug || 'editorial-staff').toString().trim())}`;
}