export const runtime = 'edge';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl, getCategoryUrl, getAuthorUrl } from '@/lib/urls';
import { generateNewsArticleSchema, generateBreadcrumbSchema } from '@/lib/seoSchemas';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

interface ArticlePageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

async function getArticle(category: string, slug: string): Promise<Article | null> {
    try {
        if (typeof process !== 'undefined' && process.env) {
            try {
                const { getRequestContext } = await import('@cloudflare/next-on-pages');
                const { env } = getRequestContext();
                if (env?.DB) {
                    const article = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         WHERE a.slug = ? LIMIT 1`
                    ).bind(slug).first<Article>();

                    if (article) return article;
                }
            } catch (e) {
                console.warn('D1 fetch failed in single article page, falling back to API', e);
            }
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
        const res = await fetch(`${baseUrl}/api/news?slug=${slug}`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data[0] : (data.article || data);
        }
    } catch (err) {
        console.error('Error loading article:', err);
    }

    return null;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.category, resolvedParams.slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    const canonicalUrl = article.canonical_url || getArticleUrl(article.category, article.slug);
    const imageUrl = article.featured_image || siteConfig.defaultOgImage;
    const metaTitle = article.meta_title || `${article.title} | ${siteConfig.name}`;
    const metaDescription = article.meta_description || article.excerpt || article.title;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: canonicalUrl,
            siteName: siteConfig.name,
            images: [{ url: imageUrl }],
            type: 'article',
            publishedTime: article.published_at,
            modifiedTime: article.updated_at || article.published_at,
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: [imageUrl],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.category, resolvedParams.slug);

    if (!article) {
        notFound();
    }

    const canonicalUrl = article.canonical_url || getArticleUrl(article.category, article.slug);
    const categoryUrl = getCategoryUrl(article.category);
    const authorSlug = article.author_slug || 'editorial-team';

    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: article.category, url: categoryUrl },
        { name: article.title, url: canonicalUrl },
    ];

    const newsArticleSchema = generateNewsArticleSchema(article);
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

    return (
        <>
            <JsonLd data={[newsArticleSchema, breadcrumbSchema]} />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Visual Breadcrumb UI */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Article Category Badge */}
                <Link href={categoryUrl} className="inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider mb-3 hover:bg-red-700 transition">
                    {article.category}
                </Link>

                {/* Article Title */}
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                    {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center text-sm text-gray-600 border-y border-gray-200 py-3 mb-6 space-x-4">
                    <div>
                        By{' '}
                        <Link href={getAuthorUrl(authorSlug)} className="font-semibold text-gray-900 hover:text-red-600 transition">
                            {article.author || 'Editorial Team'}
                        </Link>
                    </div>
                    <span>•</span>
                    <time dateTime={article.published_at}>
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </div>

                {/* Featured Image & Caption */}
                {article.featured_image && (
                    <figure className="mb-8">
                        <div className="relative w-full h-[300px] sm:h-[480px] bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={article.featured_image}
                                alt={article.image_alt || article.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        {article.image_caption && (
                            <figcaption className="text-xs text-gray-500 mt-2 text-center italic">
                                {article.image_caption}
                            </figcaption>
                        )}
                    </figure>
                )}

                {/* Article Body Content */}
                <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* News Source Attribution Block */}
                {article.source_name && (
                    <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 italic">
                        Source:{' '}
                        {article.source_url ? (
                            <a
                                href={article.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 hover:underline font-medium"
                            >
                                {article.source_name}
                            </a>
                        ) : (
                            <span className="font-medium text-gray-700">{article.source_name}</span>
                        )}
                    </div>
                )}
            </article>
        </>
    );
}