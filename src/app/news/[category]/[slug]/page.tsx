'use client';

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, Share2, ChevronRight, ArrowLeft } from "lucide-react";
import { MockNewsData } from "@/lib/mockData";

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export default function ArticleDetailsPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const rawCategory = resolvedParams?.category || "";
    const rawSlug = resolvedParams?.slug || "";

    const [article, setArticle] = useState<any>(null);
    const [latestNews, setLatestNews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const normalizeSlug = (str: string) => {
        return (str || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    useEffect(() => {
        const targetSlug = normalizeSlug(decodeURIComponent(rawSlug));

        // ১. LocalStorage থেকে সব ডাটা সংগ্রহ
        const saved = localStorage.getItem("news_articles");
        let localArticles: any[] = [];
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) localArticles = parsed;
            } catch (err) {
                console.error("Error reading localStorage", err);
            }
        }

        // ২. Mock Data সংকলন
        const allMock = [
            MockNewsData?.heroArticle,
            ...(MockNewsData?.middleArticles || []),
            ...(MockNewsData?.topStories || []),
            ...(MockNewsData?.popularArticles || [])
        ].filter(Boolean);

        const allArticles = [...localArticles, ...allMock];

        // ৩. নির্দিষ্ট পোস্টটি খুঁজে বের করা
        const found = allArticles.find((item: any) => {
            if (!item) return false;
            const itemSlug = normalizeSlug(item.slug || item.title);
            return itemSlug === targetSlug;
        });

        if (found) {
            setArticle(found);
        } else {
            // পোস্ট না পাওয়া গেলে ডিফল্ট হিসেবে যেকোনো পোস্ট বা ফার্স্ট পোস্ট দেখাবে
            setArticle(allArticles[0] || null);
        }

        // ৪. সাইডবারের জন্য Latest News সেট করা (বর্তমান পোস্টটি বাদ দিয়ে)
        const sideList = allArticles
            .filter((item) => normalizeSlug(item.slug || item.title) !== targetSlug)
            .slice(0, 6);

        setLatestNews(sideList);
        setLoading(false);
    }, [rawSlug, rawCategory]);

    const getArticleUrl = (item: any) => {
        const catSlug = normalizeSlug(item.category || "news");
        const articleSlug = normalizeSlug(item.slug || item.title || "article");
        return `/news/${catSlug}/${articleSlug}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-sans">
                <p className="text-sm animate-pulse">Loading article...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 text-center font-sans">
                <h2 className="text-xl font-serif font-bold text-gray-800">Article Not Found</h2>
                <p className="text-xs text-gray-500 mt-2">The requested news article does not exist or has been removed.</p>
                <Link href="/" className="mt-4 inline-block bg-news-red text-white text-xs font-bold px-4 py-2 rounded">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-6 text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wider font-semibold">
                    <Link href="/" className="hover:text-news-red">Home</Link>
                    <ChevronRight size={12} />
                    <Link href={`/category/${normalizeSlug(article.category || rawCategory)}`} className="hover:text-news-red">
                        {article.category || rawCategory}
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 line-clamp-1">{article.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* বামপাশের প্রধান আর্টিকেল অংশ */}
                    <main className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-4 sm:p-6 shadow-sm space-y-6">

                        {/* ক্যাটাগরি ব্যাজ */}
                        <div>
                            <span className="bg-news-red text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded inline-block">
                                {article.category || rawCategory}
                            </span>
                        </div>

                        {/* হেডলাইন */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                            {article.title}
                        </h1>

                        {/* রিপোর্টার, ডেট ও শেয়ার বার */}
                        <div className="flex flex-wrap items-center justify-between border-y border-gray-100 py-3 text-xs text-gray-500 gap-4">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 font-semibold text-gray-700">
                                    <User size={14} className="text-news-red" /> {article.reporterName || "Staff Reporter"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} /> {article.publishedAt || "Recently Published"}
                                </span>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="flex items-center gap-1 text-gray-600 hover:text-news-red font-semibold transition"
                            >
                                <Share2 size={14} /> Share
                            </button>
                        </div>

                        {/* ফিচার্ড ইমেজ ও ক্যাপশন */}
                        <div className="space-y-2">
                            <div className="relative aspect-[16/9] w-full bg-gray-100 rounded overflow-hidden">
                                <Image
                                    src={article.featuredImage || article.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"}
                                    alt={article.title || "News Image"}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            {article.imageCaption && (
                                <p className="text-[11px] text-gray-500 italic border-l-2 border-news-red pl-2">
                                    {article.imageCaption}
                                </p>
                            )}
                        </div>

                        {/* প্রধান নিউজ বডি/কন্টেন্ট */}
                        <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-4 pt-2 border-t border-gray-100 whitespace-pre-line font-sans">
                            {article.content || article.description || article.excerpt}
                        </div>

                        {/* ব্যাক বাটন */}
                        <div className="pt-6 border-t border-gray-100">
                            <Link
                                href={`/category/${normalizeSlug(article.category || rawCategory)}`}
                                className="inline-flex items-center gap-2 text-xs font-bold text-news-red hover:underline"
                            >
                                <ArrowLeft size={14} /> Back to {article.category || rawCategory}
                            </Link>
                        </div>
                    </main>

                    {/* ডানপাশের সাইডবার (Latest News) */}
                    <aside className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <h2 className="font-serif font-bold text-sm text-news-red border-b-2 border-news-red pb-2 mb-4 uppercase tracking-wider">
                                Latest News
                            </h2>

                            <div className="divide-y divide-gray-100">
                                {latestNews.map((item, idx) => (
                                    <Link
                                        key={item.id || idx}
                                        href={getArticleUrl(item)}
                                        className="py-3 block group"
                                    >
                                        <h3 className="font-serif text-xs font-bold text-gray-800 group-hover:text-news-red transition line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock size={10} /> {item.publishedAt || "Just now"}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}