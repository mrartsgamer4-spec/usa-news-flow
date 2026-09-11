export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { siteConfig } from '@/lib/siteConfig';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';
import { Clock } from 'lucide-react';

interface CategoryPageProps {
    params: {
        category: string;
    };
    searchParams?: {
        sub?: string;
    };
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

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 2592000)}mo ago`;
}

async function getCategoryArticles(categorySlug: string, subCategory?: string) {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }

        if (!db) {
            db = (process.env as any).DB;
        }

        if (!db) return [];

        const formattedCat = formatCategoryTitle(categorySlug);
        let query = 'SELECT * FROM articles WHERE (LOWER(category) = LOWER(?) OR LOWER(category) = LOWER(?))';
        const params: any[] = [categorySlug, formattedCat];

        if (subCategory) {
            query += ' AND (LOWER(tags) LIKE LOWER(?) OR LOWER(title) LIKE LOWER(?))';
            params.push(`%${subCategory}%`, `%${subCategory}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT 50';

        const stmt = db.prepare(query);
        const { results } = await stmt.bind(...params).all();
        return results || [];
    } catch (e) {
        console.error('Error fetching category articles from D1:', e);
        return [];
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const categorySlug = params?.category || '';
    const title = formatCategoryTitle(categorySlug);

    return {
        title: `${title} News | ${siteConfig.name}`,
        description: `Latest updates and breaking news in ${title}.`,
        alternates: {
            canonical: `${siteConfig.url}${getCategoryUrl(categorySlug)}`,
        },
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const categorySlug = params?.category || '';
    const subCategory = searchParams?.sub;
    const articles = await getCategoryArticles(categorySlug, subCategory);
    const categoryTitle = formatCategoryTitle(categorySlug);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b-2 border-[#cc0000] pb-3 flex items-baseline justify-between">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                    {categoryTitle}
                    {subCategory && <span className="text-gray-400 font-normal text-xl ml-3 capitalize">/ {subCategory.replace(/-/g, ' ')}</span>}
                </h1>
                <span className="text-xs font-bold text-gray-500 uppercase">{articles.length} Articles</span>
            </div>

            {articles.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center my-6">
                    <p className="text-gray-500 font-medium">No articles found in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article: any) => (
                        <Link
                            key={article.id}
                            href={getArticleUrl(article.category, article.slug)}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                            {article.featured_image && (
                                <div className="h-48 w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={article.featured_image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-4 flex flex-col flex-1">
                                <span className="text-[11px] font-black text-[#cc0000] uppercase tracking-wider block mb-1">
                                    {article.category}
                                </span>
                                <h2 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#cc0000] line-clamp-2 leading-snug mb-2">
                                    {article.title}
                                </h2>
                                {article.excerpt && (
                                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                                        {article.excerpt}
                                    </p>
                                )}
                                <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{timeAgo(article.published_at || article.created_at)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}