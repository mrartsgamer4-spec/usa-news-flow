export interface Author {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    avatar?: string;
    avatar_url?: string;
    role?: string;
    socialLinks?: {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    featured_image?: string;

    // Image Meta
    image_alt?: string;
    image_caption?: string;

    // Category & Author
    category: Category | string;
    author: Author | string;
    author_slug?: string;

    // Date fields
    publishedAt?: string;
    published_at?: string;
    updatedAt?: string;
    updated_at?: string;

    // SEO & Meta fields
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    source_name?: string;
    source_url?: string;

    // Flags & Stats
    isBreaking?: boolean;
    isTopStory?: boolean;
    isPopular?: boolean;
    views?: number;
    readTime?: string;
    tags?: string[];
}