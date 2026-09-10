export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { Article } from '@/types/article';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

function formatCategoryTitle(slug: string): string {
    if (!slug) return 'Category';
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

function timeAgo(dateString?: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}m ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;
    return `${Math.floor(seconds)}s ago`;
}

async function getCategoryArticles(categorySlug: string): Promise<Article[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
        const res = await fetch(`${baseUrl}/api/news?category=${encodeURIComponent(categorySlug)}`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data : (data.articles || []);
        }
    } catch (e) {
        console.error('Error fetching category articles:', e);
    }
    return [];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const categorySlug = resolvedParams?.category || '';
    const title = formatCategoryTitle(categorySlug);

    return {
        title: `${title} News | ${siteConfig.name}`,
        description: `Latest updates and breaking news in ${title}.`,
        alternates: {
            canonical: `${siteConfig.url}${getCategoryUrl(categorySlug)}`,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const categorySlug = resolvedParams?.category || '';
    const articles = await getCategoryArticles(categorySlug);
    const categoryTitle = formatCategoryTitle(categorySlug);

    if (!articles) {
        notFound();
    }

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2 inline-block">
                {categoryTitle}
            </h1>

            {articles.length === 0 ? (
                <p className="text-gray-500 py-8">No articles found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => {
                        const rawCat = article.category as unknown;
                        let catName = categoryTitle;

                        if (typeof rawCat === 'string') {
                            catName = rawCat;
                        } else if (rawCat && typeof rawCat === 'object' && 'name' in rawCat) {
                            catName = String((rawCat as { name: string }).name || categoryTitle);
                        }

                        const articleSlug = article.slug || '';
                        const pubDate = article.published_at || article.publishedAt;

                        return (
                            <Link
                                key={article.id}
                                href={getArticleUrl(catName, articleSlug)}
                                className="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                                        {catName}
                                    </span>
                                    <h2 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2">
                                        {article.title}
                                    </h2>
                                    <p className="text-xs text-gray-600 mt-2 line-clamp-3">{article.excerpt}</p>
                                </div>
                                <div className="mt-4 text-[11px] text-gray-400">
                                    <span>{timeAgo(pubDate)}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}