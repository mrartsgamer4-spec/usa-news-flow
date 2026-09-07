export const runtime = 'edge';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

interface ArticlePageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// Helper to fetch single article
async function getArticle(category: string, slug: string) {
    const articles = await getPublishedArticles();
    return articles.find(
        (a) =>
            a.slug === slug &&
            a.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') === category.toLowerCase()
    );
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.category, resolvedParams.slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    const canonicalUrl = `${siteConfig.url}/news/${resolvedParams.category}/${resolvedParams.slug}`;
    const imageUrl = article.featured_image || siteConfig.ogImage;

    return {
        title: article.meta_title || article.title,
        description: article.meta_description || article.excerpt,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            type: 'article',
            title: article.title,
            description: article.excerpt,
            url: canonicalUrl,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            publishedTime: article.published_at,
            modifiedTime: article.updated_at || article.published_at,
            authors: [article.author],
            section: article.category,
            images: [
                {
                    url: imageUrl,
                    alt: article.image_alt || article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [imageUrl],
            creator: siteConfig.twitterHandle,
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.category, resolvedParams.slug);

    if (!article) {
        notFound();
    }

    const canonicalUrl = `${siteConfig.url}/news/${resolvedParams.category}/${resolvedParams.slug}`;
    const imageUrl = article.featured_image || siteConfig.ogImage;
    const authorSlug = article.author_slug || 'editorial-team';
    const authorUrl = `${siteConfig.url}/author/${authorSlug}`;

    // NewsArticle JSON-LD Schema
    const newsArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: [imageUrl],
        datePublished: article.published_at,
        dateModified: article.updated_at || article.published_at,
        author: {
            '@type': 'Person',
            name: article.author,
            url: authorUrl,
        },
        publisher: {
            '@type': 'NewsMediaOrganization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
        articleSection: article.category,
    };

    // BreadcrumbList JSON-LD Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteConfig.url,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: article.category.toUpperCase(),
                item: `${siteConfig.url}/news/category/${resolvedParams.category}`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: canonicalUrl,
            },
        ],
    };

    return (
        <article className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <nav className="text-xs text-gray-500 flex items-center gap-2 uppercase tracking-wide">
                <Link href="/" className="hover:text-red-600">Home</Link>
                <span>/</span>
                <Link href={`/news/category/${resolvedParams.category}`} className="hover:text-red-600">
                    {article.category}
                </Link>
            </nav>

            <header className="space-y-4">
                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 uppercase rounded-xs">
                    {article.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {article.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 border-y border-gray-200 py-3">
                    <div>
                        By <Link href={`/author/${authorSlug}`} className="font-bold text-gray-900 hover:text-red-600 transition">{article.author}</Link>
                    </div>
                    <div>
                        Published: {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                </div>
            </header>

            <div className="relative w-full h-[300px] sm:h-[480px] rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={article.image_alt || article.title}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </article>
    );
}