import React from 'react';
import Link from 'next/link';

interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary?: string;
    content?: string;
    image_url?: string;
    created_at?: string;
    published_at?: string;
}

interface NewsCategorySelectionProps {
    articles: NewsArticle[];
}

const CATEGORIES = [
    { name: 'POLITICS', slug: 'politics' },
    { name: 'U.S. NEWS', slug: 'us-news' },
    { name: 'BUSINESS', slug: 'business' },
    { name: 'TECHNOLOGY', slug: 'technology' },
    { name: 'SPORTS', slug: 'sports' },
    { name: 'WORLD', slug: 'world' },
];

export default function NewsCategorySelection({ articles }: NewsCategorySelectionProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <section className="w-full bg-white py-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CATEGORIES.map((cat) => {
                        // ফিল্টার করে ক্যাটাগরি অনুযায়ী ৩টি নিউজ নির্বাচন (কেস সেন্সিটিভ ইস্যু এড়াতে)
                        const catArticles = articles
                            .filter((item) => {
                                const itemCat = item.category?.toLowerCase().replace(/\s+/g, '-');
                                return itemCat === cat.slug || item.category?.toLowerCase() === cat.name.toLowerCase();
                            })
                            .slice(0, 3);

                        if (catArticles.length === 0) return null;

                        return (
                            <div key={cat.slug} className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                {/* ক্যাটাগরি হেডার */}
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                                    <h2 className="text-base font-bold text-gray-900 border-l-4 border-red-600 pl-2 uppercase tracking-wide">
                                        {cat.name}
                                    </h2>
                                    <Link
                                        href={`/news/category/${cat.slug}`}
                                        className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                                    >
                                        View All &rarr;
                                    </Link>
                                </div>

                                {/* সংবাদের গ্রিড */}
                                <div className="space-y-4">
                                    {catArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/news/${article.category?.toLowerCase() || 'general'}/${article.slug}`}
                                            className="flex gap-3 group items-center"
                                        >
                                            <div className="relative w-20 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={article.image_url || '/placeholder.jpg'}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-snug">
                                                    {article.title}
                                                </h3>
                                                <span className="text-[10px] text-gray-400 mt-1 block">
                                                    🕒 {article.created_at || article.published_at ? new Date(article.created_at || article.published_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}