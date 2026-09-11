export const runtime = 'edge';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';
import { Clock, User, ArrowLeft, Tag, ArrowRight } from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

function timeAgo(dateString?: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function getDb() {
    let db: any = null;
    try {
        const ctx = getRequestContext();
        db = ctx?.env?.DB;
    } catch (e) { }
    if (!db) db = (process.env as any).DB;
    return db;
}

async function fetchArticle(slug: string) {
    try {
        const db = getDb();
        if (!db) return null;

        const decodedSlug = decodeURIComponent(slug).trim();

        const article = await db
            .prepare('SELECT * FROM articles WHERE slug = ? OR LOWER(slug) = LOWER(?) LIMIT 1')
            .bind(decodedSlug, decodedSlug)
            .first();

        return article;
    } catch (error) {
        console.error('Error fetching article from D1:', error);
        return null;
    }
}

async function fetchMoreArticles(currentCategory: string, currentId: string) {
    try {
        const db = getDb();
        if (!db) return [];

        let { results } = await db
            .prepare('SELECT * FROM articles WHERE id != ? AND LOWER(category) = LOWER(?) ORDER BY created_at DESC LIMIT 4')
            .bind(currentId, currentCategory)
            .all();

        if (!results || results.length < 4) {
            const fallback = await db
                .prepare('SELECT * FROM articles WHERE id != ? ORDER BY created_at DESC LIMIT 4')
                .bind(currentId)
                .all();
            results = fallback.results || [];
        }

        return results || [];
    } catch (e) {
        console.error('Error fetching more articles:', e);
        return [];
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    const article = await fetchArticle(slug);

    if (!article) notFound();

    const moreArticles = await fetchMoreArticles(article.category || '', article.id);
    const author = article.author_name || article.reporter_name || 'Editorial Staff';

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#cc0000] hover:underline mb-6 uppercase"
            >
                <ArrowLeft size={14} /> Back to Home
            </Link>

            <article className="space-y-6">
                <div className="space-y-3">
                    <span className="bg-[#cc0000] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded inline-block">
                        {article.category || 'News'}
                    </span>

                    <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}

                    {/* প্রতিনিধির নাম ও প্রকাশের সময় */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 text-sm text-gray-700 font-semibold">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-gray-900 font-bold">
                                <User size={16} className="text-[#cc0000]" />
                                <span>{author}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Clock size={15} className="text-[#cc0000]" />
                                {new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {article.featured_image && (
                    <figure className="rounded-xl overflow-hidden shadow-sm bg-gray-100">
                        <img
                            src={article.featured_image}
                            alt={article.image_alt || article.title}
                            className="w-full h-auto max-h-[520px] object-cover"
                        />
                        {article.image_alt && (
                            <figcaption className="text-xs text-gray-500 text-center py-2 bg-gray-50 border-t border-gray-100">
                                {article.image_alt}
                            </figcaption>
                        )}
                    </figure>
                )}

                {/* মূল নিউজ কনটেন্ট */}
                <div
                    className="text-gray-800 text-base sm:text-lg leading-relaxed space-y-4 pt-2 font-normal"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags && (
                    <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                        <Tag size={15} className="text-gray-400" />
                        {article.tags.split(',').map((tag: string) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </article>

            {/* কিশোরগঞ্জ জার্নাল স্টাইল "Read More News" সেকশন */}
            {moreArticles.length > 0 && (
                <section className="mt-14 pt-8 border-t-2 border-gray-200 space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                            <span className="w-2.5 h-6 bg-[#cc0000] inline-block rounded-sm"></span>
                            Read More News
                        </h2>
                        <Link
                            href={getCategoryUrl(article.category)}
                            className="text-xs sm:text-sm font-bold text-[#cc0000] hover:underline flex items-center gap-1"
                        >
                            More News <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {moreArticles.map((item: any) => (
                            <Link
                                key={item.id}
                                href={getArticleUrl(item.category, item.slug)}
                                className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div>
                                    {item.featured_image && (
                                        <div className="h-36 w-full rounded-lg overflow-hidden bg-gray-100 mb-2.5">
                                            <img
                                                src={item.featured_image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                    )}
                                    <span className="text-[10px] font-black text-[#cc0000] uppercase tracking-wider block mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-400 flex items-center gap-1">
                                    <Clock size={11} />
                                    <span>{timeAgo(item.created_at)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}