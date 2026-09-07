import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface NewsCategorySelectionProps {
    articles: NewsItem[];
    getArticleUrl: (item: NewsItem) => string;
}

const CATEGORIES = [
    { name: 'POLITICS', slug: 'politics' },
    { name: 'U.S. NEWS', slug: 'us-news' },
    { name: 'BUSINESS', slug: 'business' },
    { name: 'TECHNOLOGY', slug: 'technology' },
    { name: 'SPORTS', slug: 'sports' },
    { name: 'WORLD', slug: 'world' },
];

export default function NewsCategorySelection({ articles, getArticleUrl }: NewsCategorySelectionProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <section className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CATEGORIES.map((cat) => {
                    const catArticles = articles
                        .filter((item) => {
                            if (!item.category) return false;
                            const itemCat = item.category.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
                            return itemCat === cat.slug || item.category.toLowerCase() === cat.name.toLowerCase();
                        })
                        .slice(0, 3);

                    if (catArticles.length === 0) return null;

                    return (
                        <div key={cat.slug} className="bg-white border border-gray-100 rounded p-4 shadow-xs">
                            {/* Header */}
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
                                <h2 className="text-sm font-extrabold text-gray-900 border-l-4 border-red-600 pl-2 uppercase tracking-wider">
                                    {cat.name}
                                </h2>
                                <Link
                                    href={`/news/${cat.slug}`}
                                    className="text-xs font-bold text-red-600 hover:underline flex items-center gap-0.5"
                                >
                                    View All &rarr;
                                </Link>
                            </div>

                            {/* News List */}
                            <div className="space-y-3">
                                {catArticles.map((item, idx) => (
                                    <Link
                                        key={item.id || idx}
                                        href={getArticleUrl(item)}
                                        className="flex gap-3 items-center group"
                                    >
                                        <div className="relative w-20 h-16 shrink-0 rounded overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&q=80"}
                                                alt={item.title || "News"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>
                                            <span className="text-[10px] text-gray-400 mt-1 block">
                                                🕒 {item.publishedAt || "1 hour ago"}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}