"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, CloudSun, ArrowRight } from "lucide-react";
import { MockNewsData } from "@/lib/mockData";

interface NewsItem {
    id?: string | number;
    title: string;
    publishedAt?: string;
    category?: string;
    subCategory?: string;
    slug?: string;
    featuredImage?: string;
    content?: string;
    excerpt?: string;
    reporterName?: string;
}

export default function HomePage() {
    const [hero, setHero] = useState<NewsItem | null>(null);
    const [middle, setMiddle] = useState<NewsItem[]>([]);
    const [topStories, setTopStories] = useState<NewsItem[]>([]);
    const [popular, setPopular] = useState<NewsItem[]>([]);
    const [breaking, setBreaking] = useState<NewsItem[]>([]);

    const cleanSlug = (str: string) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const stripHtml = (html?: string) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    useEffect(() => {
        const saved = localStorage.getItem("news_articles");
        let localArticles: NewsItem[] = [];

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    localArticles = parsed;
                }
            } catch (err) {
                console.error("Failed to parse articles from localStorage", err);
            }
        }

        const mockList: NewsItem[] = [
            MockNewsData?.heroArticle,
            ...(MockNewsData?.topStories || []),
            ...(MockNewsData?.middleArticles || []),
            ...(MockNewsData?.popularArticles || [])
        ].filter(Boolean) as NewsItem[];

        const allArticles = [...localArticles, ...mockList];

        if (allArticles.length > 0) {
            setHero(allArticles[0]);
            setMiddle(allArticles.slice(1, 5));
            setTopStories(allArticles.slice(0, 4));
            setPopular(allArticles.slice(0, 3));

            const breakingItems = allArticles.slice(0, 4).map((item) => ({
                title: item.title,
                publishedAt: item.publishedAt || "10:15 AM",
                category: item.category || "us-news",
                slug: item.slug || cleanSlug(item.title)
            }));
            setBreaking(breakingItems);
        }
    }, []);

    const getArticleUrl = (item: NewsItem) => {
        if (!item) return "/news";

        const categorySlug = cleanSlug(item.category || "us-news");
        const subCategorySlug = item.subCategory ? cleanSlug(item.subCategory) : null;
        const articleSlug = cleanSlug(item.slug || item.title || "article");

        if (subCategorySlug) {
            return `/news/${categorySlug}/${subCategorySlug}/${articleSlug}`;
        }
        return `/news/${categorySlug}/${articleSlug}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
            {/* Top Grid: Hero + Middle + Breaking */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

                {/* Hero Banner (Left Column - 6 Cols) */}
                {hero && (
                    <div className="lg:col-span-6 relative rounded-md overflow-hidden bg-black min-h-[380px] lg:min-h-[420px] flex flex-col justify-end group">
                        <Image
                            src={hero.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80"}
                            alt={hero.title || "Hero News"}
                            fill
                            priority
                            className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        <div className="relative p-6 z-10 text-white space-y-2">
                            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block">
                                {hero.category || "POLITICS"}
                            </span>
                            <h1 className="text-xl md:text-3xl font-extrabold leading-snug hover:text-gray-200 transition">
                                <Link href={getArticleUrl(hero)}>
                                    {hero.title}
                                </Link>
                            </h1>
                            <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
                                {stripHtml(hero.content || hero.excerpt)}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1">
                                <Clock size={12} />
                                <span>{hero.publishedAt || "2 hours ago"}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Middle Stories (Middle Column - 3 Cols) */}
                <div className="lg:col-span-3 flex flex-col justify-between space-y-3">
                    {middle?.map((item, idx) => (
                        <Link key={item.id || idx} href={getArticleUrl(item)} className="group flex gap-3 items-center bg-white p-2 border border-gray-100 rounded hover:shadow-sm transition">
                            <div className="relative w-24 h-20 shrink-0 rounded overflow-hidden bg-gray-100">
                                <Image
                                    src={item.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&q=80"}
                                    alt={item.title || "News"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                                    {item.category || "BUSINESS"}
                                </span>
                                <h3 className="font-bold text-xs leading-snug text-gray-900 group-hover:text-red-600 line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                    <Clock size={11} />
                                    <span>{item.publishedAt || "1 hour ago"}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right Sidebar (Breaking + Weather - 3 Cols) */}
                <div className="lg:col-span-3 flex flex-col justify-between space-y-4">

                    {/* Breaking News Box */}
                    <div className="border border-gray-200 rounded p-4 bg-white shadow-xs">
                        <div className="bg-red-600 text-white text-[11px] font-bold uppercase px-2.5 py-0.5 w-max rounded-sm mb-3">
                            BREAKING NEWS
                        </div>
                        <div className="space-y-3 divide-y divide-gray-100">
                            {breaking?.map((item, i) => (
                                <Link
                                    key={i}
                                    href={getArticleUrl(item)}
                                    className={`block ${i !== 0 ? "pt-2" : ""} space-y-0.5 group`}
                                >
                                    <span className="text-red-600 text-[10px] font-bold block">{item.publishedAt}</span>
                                    <p className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-tight">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <Link href="/news/us-news" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 mt-3">
                            View All Breaking News <ArrowRight size={12} />
                        </Link>
                    </div>

                    {/* Weather Box */}
                    <div className="border border-gray-200 rounded p-4 bg-white shadow-xs">
                        <h4 className="text-[11px] font-bold uppercase text-gray-500 tracking-wider mb-2">
                            WEATHER – NEW YORK
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CloudSun size={32} className="text-gray-400" />
                                <div>
                                    <div className="text-xl font-black text-gray-900 leading-none">18°C</div>
                                    <div className="text-[11px] text-gray-500 mt-0.5">Cloudy</div>
                                </div>
                            </div>
                            <div className="text-right text-[10px] text-gray-500 leading-tight">
                                <div>Humidity: 72%</div>
                                <div>Wind: 12 km/h</div>
                                <div>Feels like: 17°C</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Bottom Grid: Top Stories + Popular Articles */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-200 pt-6">

                {/* Top Stories */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="border-l-4 border-red-600 pl-2">
                        <h2 className="font-bold text-base text-gray-900 uppercase tracking-wider">
                            TOP STORIES
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {topStories?.map((story, idx) => (
                            <Link key={story.id || idx} href={getArticleUrl(story)} className="group space-y-2 bg-white border border-gray-100 p-2 rounded">
                                <div className="relative aspect-[4/3] w-full rounded overflow-hidden bg-gray-100">
                                    <Image
                                        src={story.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80"}
                                        alt={story.title || "Story"}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                                        {story.category || "US NEWS"}
                                    </span>
                                </div>
                                <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                    {story.title}
                                </h3>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <Clock size={10} />
                                    <span>{story.publishedAt || "5 hours ago"}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Articles */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="border-l-4 border-red-600 pl-2">
                        <h2 className="font-bold text-base text-gray-900 uppercase tracking-wider">
                            POPULAR ARTICLES
                        </h2>
                    </div>

                    <div className="space-y-3 bg-white p-3 border border-gray-100 rounded">
                        {popular?.map((item, index) => (
                            <Link key={item.id || index} href={getArticleUrl(item)} className="group flex items-center gap-3 border-b border-gray-100 pb-2.5 last:border-b-0 last:pb-0">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    {index + 1}
                                </span>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                                        <Clock size={10} />
                                        <span>{item.publishedAt || "12 hours ago"}</span>
                                    </div>
                                </div>
                                <div className="relative w-14 h-11 shrink-0 rounded overflow-hidden bg-gray-100">
                                    <Image
                                        src={item.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&q=80"}
                                        alt={item.title || "Popular"}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}