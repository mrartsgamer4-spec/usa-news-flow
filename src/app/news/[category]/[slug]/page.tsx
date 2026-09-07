import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'link';
import { mockArticles } from '@/lib/mockData';

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const article = mockArticles.find((a) => a.slug === resolvedParams.slug);

    if (!article) return {};

    const siteUrl = 'https://usanewsflow.com';
    const articleUrl = `${siteUrl}/news/${resolvedParams.category}/${resolvedParams.slug}`;

    return {
        title: article.title,
        description: article.summary,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            title: article.title,
            description: article.summary,
            url: articleUrl,
            siteName: 'USA News Flow',
            images: [
                {
                    url: article.imageUrl || `${siteUrl}/globe.svg`,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: article.publishedAt,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.summary,
            images: [article.imageUrl || `${siteUrl}/globe.svg`],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const article = mockArticles.find((a) => a.slug === resolvedParams.slug);

    if (!article) {
        notFound();
    }

    const siteUrl = 'https://usanewsflow.com';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.summary,
        image: [article.imageUrl || `${siteUrl}/globe.svg`],
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: [
            {
                '@type': 'Organization',
                name: 'USA News Flow',
                url: siteUrl,
            },
        ],
        publisher: {
            '@type': 'Organization',
            name: 'USA News Flow',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/globe.svg`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/news/${resolvedParams.category}/${resolvedParams.slug}`,
        },
    };

    const relatedArticles = mockArticles
        .filter((a) => a.slug !== article.slug && a.category === article.category)
        .slice(0, 3);

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mb-6">
                <Link
                    href={`/news/category/${article.category.toLowerCase()}`}
                    className="text-blue-600 hover:underline font-semibold uppercase text-sm tracking-wider"
                >
                    {article.category}
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4 leading-tight">
                    {article.title}
                </h1>
                <div className="flex items-center text-gray-500 text-sm space-x-4 border-b pb-4">
                    <span>Published on {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>By USA News Flow Team</span>
                </div>
            </div>

            {article.imageUrl && (
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose max-w-none text-lg text-gray-800 leading-relaxed space-y-6">
                <p className="font-medium text-xl text-gray-700 italic border-l-4 border-blue-600 pl-4">
                    {article.summary}
                </p>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {relatedArticles.length > 0 && (
                <section className="mt-12 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Related News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.category.toLowerCase()}/${item.slug}`}
                                className="group border rounded-lg overflow-hidden hover:shadow-md transition"
                            >
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                        {item.summary}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}