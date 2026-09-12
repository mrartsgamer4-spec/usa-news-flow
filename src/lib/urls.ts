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

export function getAuthorUrl(authorName: string): string {
    const cleanAuthor = (authorName || 'staff')
        .toLowerCase()
        .trim()
        .replace(/[\s_.]+/g, '-');
    return `/author/${cleanAuthor}`;
}