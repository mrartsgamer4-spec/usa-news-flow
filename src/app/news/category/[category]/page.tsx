'use client';

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { MockNewsData } from "@/lib/mockData";

interface PageProps {
    params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const searchParams = useSearchParams();

    const rawCategory = resolvedParams?.category || "";
    const subCategoryQuery = searchParams.get("sub") || "";

    const [articles, setArticles] = useState<any[]>([]);
    const [displayTitle, setDisplayTitle] = useState<string>("");

    const normalize = (str: string) => {
        return (str || "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, ""); // সব স্পেস ও স্পেশাল ক্যারেক্টার বাদ দিয়ে শুধু আলফানিউমেরিক ম্যাচিং
    };

    useEffect(() => {
        const targetCat = normalize(decodeURIComponent(rawCategory));
        const targetSub = normalize(decodeURIComponent(subCategoryQuery));

        // হেডার টাইটেল সেট
        const formattedCat = rawCategory.replace(/-/g, " ").toUpperCase();
        const formattedSub = subCategoryQuery ? ` > ${subCategoryQuery.replace(/-/g, " ").toUpperCase()}` : "";
        setDisplayTitle(`${formattedCat}${formattedSub}`);

        // ১. LocalStorage থেকে পোস্ট আনা
        const saved = localStorage.getItem("news_articles");
        let localArticles: any[] = [];
        if (saved) {
            try {
                localArticles = JSON.parse(saved);
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

        // ৩. ক্যাটাগরি ও সাব-ক্যাটাগরি ফিল্টারিং
        const filtered = allArticles.filter((item: any) => {
            if (!item || !item.category) return false;

            const itemCat = normalize(item.category);
            const matchesCat = itemCat === targetCat;

            if (targetSub) {
                const itemSub = normalize(item.subCategory || "");
                return matchesCat && itemSub === targetSub;
            }

            return matchesCat;
        });

        setArticles(filtered);
    }, [rawCategory, subCategoryQuery]);

    const getArticleUrl = (item: any) => {
        const catSlug = (item.category || rawCategory).toLowerCase().replace(/[\s\W-]+/g, "-");
        const articleSlug = (item.slug || item.title || "article").toLowerCase().replace(/[\s\W-]+/g, "-");
        return `/news/${catSlug}/${articleSlug}`;
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-news-red inline-block"></span>
                        <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                            Category: {displayTitle}
                        </h1>
                    </div>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded border">
                        Total News: {articles.length}
                    </span>
                </div>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div>
                                    <Link href={getArticleUrl(item)} className="block relative aspect-[16/9] w-full bg-gray-100 overflow-hidden group">
                                        <Image
                                            src={item.featuredImage || item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"}
                                            alt={item.title || "News Image"}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </Link>

                                    <div className="p-4 space-y-2">
                                        <Link href={getArticleUrl(item)}>
                                            <h2 className="font-serif font-bold text-base text-gray-900 hover:text-news-red line-clamp-2 leading-snug">
                                                {item.title}
                                            </h2>
                                        </Link>
                                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                            {item.content || item.description || item.excerpt}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-2">
                                    <span className="flex items-center gap-1 text-[11px]">
                                        <Clock size={12} /> {item.publishedAt || "Recently"}
                                    </span>
                                    <Link
                                        href={getArticleUrl(item)}
                                        className="text-news-red font-bold text-xs hover:underline"
                                    >
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-md p-12 text-center space-y-3">
                        <p className="text-lg font-serif font-bold text-gray-700">No news published in {displayTitle} yet.</p>
                        <p className="text-xs text-gray-500">Publish news from admin dashboard selecting this category.</p>
                        <Link href="/" className="inline-block bg-news-red text-white text-xs font-bold px-4 py-2 rounded hover:bg-red-700 transition">
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}