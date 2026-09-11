export const runtime = 'edge';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';
import {
    Clock, User, ArrowLeft, Tag,
    Mail, Link2
} from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

function timeAgo(dateString?: string): string {
    if (!dateString) return '5 MIN READ';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'JUST NOW';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}M AGO`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}H AGO`;
    return `${Math.floor(seconds / 86400)}D AGO`;
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

        const rawSlug = slug.trim();
        const decodedSlug = decodeURIComponent(slug).trim();

        const article = await db
            .prepare('SELECT * FROM articles WHERE slug = ? OR slug = ? OR LOWER(slug) = LOWER(?) LIMIT 1')
            .bind(rawSlug, decodedSlug, decodedSlug)
            .first();

        return article;
    } catch (error) {
        console.error('Error fetching article from D1:', error);
        return null;
    }
}

async function fetchCnnFeed(currentId: string) {
    try {
        const db = getDb();
        if (!db) return { upNext: [], mostPopular: [] };

        const { results } = await db
            .prepare('SELECT * FROM articles WHERE id != ? ORDER BY created_at DESC LIMIT 13')
            .bind(currentId)
            .all();

        const all = results || [];
        return {
            upNext: all.slice(0, 6),
            mostPopular: all.slice(6, 13)
        };
    } catch (e) {
        console.error('Error fetching feed:', e);
        return { upNext: [], mostPopular: [] };
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    const article = await fetchArticle(slug);
    if (!article) notFound();

    const { upNext, mostPopular } = await fetchCnnFeed(article.id);
    const author = article.author_name || article.reporter_name || 'Editorial Staff';
    const currentUrl = `https://usa-news-flow.pages.dev/news/article/${article.slug}`;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            {/* ব্যাক লিঙ্ক ও ক্যাটাগরি */}
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider">
                <Link
                    href="/"
                    prefetch={false}
                    className="text-gray-500 hover:text-[#cc0000] inline-flex items-center gap-1"
                >
                    <ArrowLeft size={13} /> Home
                </Link>
                <span className="text-gray-300">/</span>
                <Link
                    href={getCategoryUrl(article.category)}
                    prefetch={false}
                    className="text-[#cc0000] hover:underline"
                >
                    {article.category || 'News'}
                </Link>
            </div>

            {/* সিএনএন স্টাইল আর্টিকেল কন্টেইনার */}
            <div className="max-w-[820px] mx-auto space-y-6">

                {/* হেডলাইন */}
                <h1 className="text-2xl sm:text-[38px] font-extrabold text-[#0c0c0c] leading-[1.22] tracking-tight">
                    {article.title}
                </h1>

                {/* অথর ও পাবলিশ টাইম */}
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                        <User size={15} className="text-[#cc0000]" /> By {author}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 text-gray-500">
                        <Clock size={14} />
                        {new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>

                {/* সিএনএন সাইজ ইমেজ কন্টেইনার (১৬:৯ ও মার্জিত হাইট) */}
                {article.featured_image && (
                    <figure className="space-y-2">
                        <div className="w-full h-64 sm:h-[400px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                            <img
                                src={article.featured_image}
                                alt={article.image_alt || article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {article.image_alt && (
                            <figcaption className="text-[12px] text-gray-500 italic leading-snug">
                                {article.image_alt}
                            </figcaption>
                        )}
                    </figure>
                )}

                {/* রিডএবল বডি কনটেন্ট */}
                <div
                    className="text-[#222222] text-[17px] sm:text-[18px] leading-[1.75] space-y-5 font-normal tracking-normal pt-1"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* ট্যাগস */}
                {article.tags && (
                    <div className="pt-4 flex flex-wrap items-center gap-2">
                        <Tag size={13} className="text-gray-400" />
                        {article.tags.split(',').map((tag: string) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                {/* সিএনএন স্টাইল শেয়ার বাটন বার */}
                <div className="pt-8 pb-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Share this story</span>
                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(currentUrl)}`}
                            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition shadow-sm"
                            title="Share via Email"
                        >
                            <Mail size={16} />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition font-black text-sm shadow-sm"
                            title="Share on X"
                        >
                            𝕏
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-[#1877f2] hover:bg-gray-50 transition font-bold text-sm shadow-sm"
                            title="Share on Facebook"
                        >
                            f
                        </a>
                        <a
                            href={`https://www.threads.net/intent/post?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-black hover:bg-gray-50 transition text-sm font-bold shadow-sm"
                            title="Share on Threads"
                        >
                            @
                        </a>
                    </div>
                </div>

            </div>

            {/* সিএনএন স্টাইল "Up Next" এবং "Most Popular" গ্রিড */}
            <section className="mt-16 pt-10 border-t-2 border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* বামের অংশ: Up Next (৬টি গ্রিড কার্ড) */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#0c0c0c] tracking-tight uppercase border-b-2 border-black pb-2">
                            Up next
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {upNext.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={getArticleUrl(item.category, item.slug)}
                                    prefetch={false}
                                    className="group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-32 w-full rounded-md overflow-hidden bg-gray-100 mb-2.5">
                                            <img
                                                src={item.featured_image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80'}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-400 mt-2 block tracking-wider uppercase">
                                        {timeAgo(item.created_at)}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ডানের অংশ: Most Popular (১ থেকে ৭ ক্রমিক নম্বরসহ) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-xl sm:text-2xl font-black text-[#0c0c0c] tracking-tight uppercase border-b-2 border-black pb-2">
                            Most popular
                        </h2>

                        <div className="space-y-4">
                            {mostPopular.map((item: any, idx: number) => (
                                <Link
                                    key={item.id}
                                    href={getArticleUrl(item.category, item.slug)}
                                    prefetch={false}
                                    className="group flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0"
                                >
                                    <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none shrink-0 w-6">
                                        {idx + 1}
                                    </span>
                                    <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}