"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, CloudSun, ArrowRight } from "lucide-react";
import { MockNewsData } from "@/lib/mockData";

export default function HomePage() {
    const [hero, setHero] = useState<any>(null);
    const [middle, setMiddle] = useState<any[]>([]);
    const [topStories, setTopStories] = useState<any[]>([]);
    const [popular, setPopular] = useState<any[]>([]);
    const [breaking, setBreaking] = useState<any[]>([]);

    // স্ট্র্রিং থেকে ইউআরএল ফ্রেন্ডলি স্লগ বানানোর হেলপার
    const cleanSlug = (str: string) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    useEffect(() => {
        const saved = localStorage.getItem("news_articles");
        let localArticles: any[] = [];

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

        // মক ডাটার পোস্ট একত্রীকরণ
        const mockList = [
            MockNewsData?.heroArticle,
            ...(MockNewsData?.topStories || []),
            ...(MockNewsData?.middleArticles || []),
            ...(MockNewsData?.popularArticles || [])
        ].filter(Boolean);

        // লোকাল এবং মক ডাটা মার্জ করা (ইউজারের নতুন পোস্ট প্রথমে থাকবে)
        const allArticles = [...localArticles, ...mockList];

        if (allArticles.length > 0) {
            setHero(allArticles[0]);
            setMiddle(allArticles.slice(1, 5));
            setTopStories(allArticles.slice(0, 8));
            setPopular(allArticles.slice(0, 5));

            const breakingItems = allArticles.slice(0, 4).map((item: any) => ({
                title: item.title,
                publishedAt: item.publishedAt || "Just now",
                category: item.category || "us-news",
                slug: item.slug || cleanSlug(item.title)
            }));
            setBreaking(breakingItems);
        }
    }, []);

    // ডায়নামিক ক্যাটাগরি ও সাব-ক্যাটাগরি ইউআরএল জেনারেটর
    const getArticleUrl = (item: any) => {
        if (!item) return "/news";

        const categorySlug = cleanSlug(item.category || "us-news");
        const subCategorySlug = item.subCategory ? cleanSlug(item.subCategory) : null;
        const articleSlug = cleanSlug(item.slug || item.title || "article");

        if (subCategorySlug) {
            return `/news/${categorySlug}/${subCategorySlug}/${articleSlug}`;
        }
        return `/news/${categorySlug}/${articleSlug}`;
    };

    // Google News Organization Schema JSON-LD
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        "name": "USA News Flow",
        "url": "https://usanewsflow.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://usanewsflow.com/logo.png"
        },
        "sameAs": [
            "https://facebook.com",
            "https://twitter.com"
        ]
    };

    return (
        <div className="space-y-10 py-4">
            {/* Google Schema Markup Injection for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {hero && (
                    <div className="lg:col-span-6 relative group overflow-hidden rounded-md bg-black">
                        <Link href={getArticleUrl(hero)} className="block relative aspect-[4/3] w-full">
                            <Image
                                src={hero.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80"}
                                alt={hero.title || "Hero News"}
                                fill
                                priority
                                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                                <span className="bg-news-red text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 w-max rounded-sm mb-2">
                                    {hero.category || "General"}
                                </span>
                                <h1 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-red-400 transition leading-snug mb-2">
                                    {hero.title}
                                </h1>
                                <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                                    {hero.content || hero.excerpt}
                                </p>
                                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                    <Clock size={13} />
                                    <span>{hero.publishedAt || "Recently"}</span>
                                    {hero.reporterName && <span>• By {hero.reporterName}</span>}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="lg:col-span-3 space-y-4">
                    {middle?.map((item, idx) => (
                        <Link key={item.id || idx} href={getArticleUrl(item)} className="group flex gap-3 items-center">
                            <div className="relative w-24 h-16 shrink-0 rounded overflow-hidden bg-gray-100 border border-news-border">
                                <Image
                                    src={item.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&q=80"}
                                    alt={item.title || "News"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-news-red uppercase tracking-wider">
                                    {item.category || "General"}
                                </span>
                                <h3 className="font-serif font-bold text-xs leading-tight text-news-black group-hover:text-news-red line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-1 text-[11px] text-news-gray">
                                    <Clock size={11} />
                                    <span>{item.publishedAt || "Recently"}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="border border-news-border rounded p-4 bg-white shadow-sm">
                        <div className="bg-news-red text-white text-xs font-bold uppercase px-2.5 py-1 w-max rounded-sm mb-3">
                            BREAKING NEWS
                        </div>
                        <div className="space-y-3 divide-y divide-gray-100">
                            {breaking?.map((item, i) => (
                                <Link
                                    key={i}
                                    href={getArticleUrl(item)}
                                    className={`block ${i !== 0 ? "pt-2.5" : ""} space-y-0.5 group`}
                                >
                                    <span className="text-news-red text-[11px] font-bold">{item.publishedAt || "Live"}</span>
                                    <p className="text-xs font-serif font-semibold text-news-black group-hover:text-news-red line-clamp-2">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <Link href="/news/us-news" className="text-xs font-bold text-news-red hover:underline flex items-center gap-1 mt-4">
                            View All Breaking News <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="border border-news-border rounded p-4 bg-gray-50/60">
                        <h4 className="text-xs font-bold uppercase text-news-gray tracking-wider mb-2">
                            WEATHER – NEW YORK
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CloudSun size={36} className="text-gray-600" />
                                <div>
                                    <div className="text-2xl font-bold text-news-black leading-none">18°C</div>
                                    <div className="text-xs text-news-gray mt-1">Cloudy</div>
                                </div>
                            </div>
                            <div className="text-right text-[11px] text-news-gray space-y-0.5">
                                <div>Humidity: 72%</div>
                                <div>Wind: 12 km/h</div>
                                <div>Feels like: 17°C</div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-news-border pt-6">

                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-news-red pl-2">
                        <h2 className="font-serif font-bold text-lg text-news-black uppercase tracking-wider">
                            TOP STORIES
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {topStories?.map((story, idx) => (
                            <Link key={story.id || idx} href={getArticleUrl(story)} className="group space-y-2">
                                <div className="relative aspect-[4/3] w-full rounded overflow-hidden bg-gray-100 border border-news-border">
                                    <Image
                                        src={story.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80"}
                                        alt={story.title || "Story"}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <span className="absolute top-1.5 left-1.5 bg-news-red text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                                        {story.category || "General"}
                                    </span>
                                </div>
                                <h3 className="font-serif font-bold text-xs text-news-black group-hover:text-news-red line-clamp-3 leading-snug">
                                    {story.title}
                                </h3>
                                <div className="flex items-center gap-1 text-[10px] text-news-gray">
                                    <Clock size={10} />
                                    <span>{story.publishedAt || "Recently"}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-news-red pl-2">
                        <h2 className="font-serif font-bold text-lg text-news-black uppercase tracking-wider">
                            POPULAR ARTICLES
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {popular?.map((item, index) => (
                            <Link key={item.id || index} href={getArticleUrl(item)} className="group flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-news-red text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    {index + 1}
                                </span>
                                <div className="flex-grow">
                                    <h3 className="font-serif font-bold text-xs text-news-black group-hover:text-news-red line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[10px] text-news-gray mt-1">
                                        <Clock size={10} />
                                        <span>{item.publishedAt || "Recently"}</span>
                                    </div>
                                </div>
                                <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-gray-100 border border-news-border">
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