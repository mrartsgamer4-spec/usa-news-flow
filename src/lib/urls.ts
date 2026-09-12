export function getArticleUrl(category: string, slug: string): string {
    const cleanSlug = encodeURIComponent(slug || '').trim();
    return `/news/article/${cleanSlug}`;
}

export function getCategoryUrl(category: string): string {
    const cleanCat = (category || 'news')
        .toLowerCase()
        .trim()
        .replace(/[\s_.]+/g, '-');
    return `/news/category/${cleanCat}`;
}