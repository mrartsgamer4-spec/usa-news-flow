export interface Author {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    avatar_url?: string;
    role?: string;
}

export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    category: string;
    subcategory?: string;
    featured_image?: string;
    image_alt?: string;
    image_caption?: string;
    author_id?: string;
    author?: string;
    author_slug?: string;
    status?: 'published' | 'draft' | 'archived';
    published_at: string;
    updated_at?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    source_name?: string;
    source_url?: string;
}