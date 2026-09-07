export interface Article {
    id: string | number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    image_alt?: string;
    category: string;
    sub_category?: string;
    author: string;
    author_id?: string;
    status: 'draft' | 'published' | 'archived';
    featured?: boolean | number;
    breaking?: boolean | number;
    views?: number;
    published_at: string;
    updated_at?: string;
    created_at?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    source_name?: string;
    source_url?: string;
    location?: string;
}