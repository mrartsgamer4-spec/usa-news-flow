export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';
import { generateBreadcrumbSchema } from '@/lib/seoSchemas';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
    searchParams?: Promise<{
        page?: string;
    }>;
}

function formatCategoryTitle(text: string): string {
    return text
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins || 1} minute${mins > 1 ? 's' : ''} ago`;
    }
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const categoryName = formatCategoryTitle(resolvedParams.category);
    const pageNum = Number(resolvedSearchParams.page) || 1;

    const canonicalUrl = pageNum > 1
        ? `${getCategoryUrl(resolvedParams.category)}?page=${pageNum}`
        : getCategoryUrl(resolvedParams.category);

    return {
        title: `${categoryName} News ${pageNum > 1 ? `- Page ${pageNum}` : ''} | ${siteConfig.name}`,
        description: `Get the latest news, updates, and in-depth analysis on ${categoryName} from ${siteConfig.name}.`,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const pageNum = Math.max(1, Number(resolvedSearchParams.page) || 1);
    const itemsPerPage = 12;

    const allArticles = await getPublishedArticles();

    // Filter articles matching the requested category
    const categoryArticles = allArticles.filter((a) => {
        if (!a.category) return false;
        return a.category.toLowerCase().trim() === resolvedParams.category.toLowerCase().replace(/-/g, ' ').trim();
    });

    const categoryName = formatCategoryTitle(resolvedParams.category);
    const categoryUrl = getCategoryUrl(resolvedParams.category);

    // Pagination calculations
    const totalArticles = categoryArticles.length;
    const totalPages = Math.ceil(totalArticles / itemsPerPage);
    const paginatedArticles = categoryArticles.slice((pageNum - 1) * itemsPerPage, pageNum * itemsPerPage);

    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: `${categoryName} News`, url: categoryUrl },
    ];

    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

    return (
        <>
            <JsonLd data={breadcrumbSchema} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Visual Breadcrumb UI */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Section Header */}
                <div className="border-b-2 border-red-600 pb-2 flex justify-between items-end">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase flex items-center gap-2">
                        <span className="w-2 h-7 bg-red-600 inline-block" />
                        {categoryName} NEWS
                    </h1>
                    {totalPages > 1 && (
                        <span className="text-xs text-gray-500 font-medium">
                            Page {pageNum} of {totalPages}
                        </span>
                    )}
                </div>

                {paginatedArticles.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                        <h2 className="text-lg font-bold text-gray-700">No articles found under {categoryName} category.</h2>
                        <p className="text-xs text-gray-500">Publish or assign news to this category from the admin panel to view them here.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={getArticleUrl(article.category, article.slug)}
                                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition block"
                                >
                                    <div className="relative w-full h-48 bg-gray-100">
                                        <Image
                                            src={article.featured_image || siteConfig.defaultOgImage}
                                            alt={article.image_alt || article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-300"
                                        />
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <h2 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                            {article.title}
                                        </h2>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                        <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                                            <span>⏱ {timeAgo(article.published_at)}</span>
                                            <span className="text-red-600 font-semibold group-hover:underline">Read More →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 pt-8 border-t border-gray-200">
                                {pageNum > 1 && (
                                    <Link
                                        href={`${categoryUrl}?page=${pageNum - 1}`}
                                        className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50 text-gray-700"
                                    >
                                        ← Previous
                                    </Link>
                                )}
                                <span className="text-sm font-medium text-gray-600">
                                    Page {pageNum} of {totalPages}
                                </span>
                                {pageNum < totalPages && (
                                    <Link
                                        href={`${categoryUrl}?page=${pageNum + 1}`}
                                        className="px-4 py-2 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700"
                                    >
                                        Next →
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
}