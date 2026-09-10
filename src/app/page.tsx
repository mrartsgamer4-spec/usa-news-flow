export const runtime = 'edge';

import Link from 'next/link';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl } from '@/lib/urls';
import { Clock, TrendingUp, CloudSun } from 'lucide-react';

function timeAgo(dateString?: string): string {
    if (!dateString) return '1 hour ago';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 2592000)} months ago`;
}

function getCatName(cat: any): string {
    if (typeof cat === 'string') return cat;
    if (cat && typeof cat === 'object' && 'name' in cat) return cat.name || 'News';
    return 'News';
}

export default async function Home() {
    const rawArticles = (await getPublishedArticles()) || [];

    // ডাটাবেজে কোনো পোস্ট না থাকলে প্রিভিউ দেখানোর জন্য ডামি ডাটা
    const dummyArticles = [
        {
            id: '1',
            title: 'U.S. House Passes Major Infrastructure Bill in Bipartisan Vote',
            slug: 'us-house-passes-major-infrastructure-bill',
            category: 'POLITICS',
            excerpt: 'The $1.2 trillion bill aims to modernize roads, bridges, public transportation across the country.',
            featured_image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&q=80',
            published_at: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Stock Markets Rally After Positive Inflation Report',
            slug: 'stock-markets-rally-positive-inflation',
            category: 'BUSINESS',
            featured_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80',
            published_at: new Date().toISOString()
        },
        {
            id: '3',
            title: 'Lakers Win Thriller Game 7, Advance to Conference Finals',
            slug: 'lakers-win-thriller-game-7',
            category: 'SPORTS',
            featured_image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80',
            published_at: new Date().toISOString()
        },
        {
            id: '4',
            title: 'Apple Unveils New iPhone 16 Series with Advanced AI Features',
            slug: 'apple-unveils-iphone-16-ai-features',
            category: 'TECH',
            featured_image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
            published_at: new Date().toISOString()
        },
        {
            id: '5',
            title: 'CDC Reports Significant Decline in Seasonal Flu Cases Across the U.S.',
            slug: 'cdc-reports-decline-flu-cases',
            category: 'HEALTH',
            featured_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&q=80',
            published_at: new Date().toISOString()
        }
    ];

    const articles = rawArticles.length > 0 ? rawArticles : dummyArticles;

    const mainFeature = articles[0];
    const middleFeatures = articles.slice(1, 5);
    const breakingNews = articles.slice(0, 3);
    const topStories = articles.slice(0, 4);
    const popularArticles = articles.slice(0, 3);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

            {/* ১. হিরো সেকশন (রেফারেন্স স্ক্রিনশটের আদলে) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* বামের মূল ফিচার্ড নিউজ */}
                {mainFeature && (
                    <div className="lg:col-span-5 h-full">
                        <Link
                            href={getArticleUrl(getCatName(mainFeature.category), mainFeature.slug)}
                            className="group block relative h-[480px] rounded-xl overflow-hidden shadow-lg border border-gray-100"
                        >
                            <img
                                src={mainFeature.featured_image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&q=80'}
                                alt={mainFeature.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                                <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded w-fit mb-3">
                                    {getCatName(mainFeature.category)}
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-red-400 transition-colors">
                                    {mainFeature.title}
                                </h1>
                                {mainFeature.excerpt && (
                                    <p className="text-gray-200 text-sm sm:text-base mt-3 line-clamp-2 leading-relaxed">
                                        {mainFeature.excerpt}
                                    </p>
                                )}
                                <span className="text-xs text-gray-300 mt-4 flex items-center gap-1.5 font-medium">
                                    <Clock size={14} className="text-red-500" /> {timeAgo(mainFeature.published_at)}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

                {/* মাঝের ৪টি লম্বা কার্ড */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {middleFeatures.map((item) => (
                        <Link
                            key={item.id}
                            href={getArticleUrl(getCatName(item.category), item.slug)}
                            className="group flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-200 hover:shadow-md transition duration-200"
                        >
                            <div className="w-28 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80'}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-[11px] font-black text-red-600 uppercase tracking-wider block mb-1">
                                    {getCatName(item.category)}
                                </span>
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                    {item.title}
                                </h3>
                                <span className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <Clock size={12} /> {timeAgo(item.published_at)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ডানের ব্রেকিং নিউজ ও ওয়েদার কার্ড */}
                <div className="lg:col-span-3 space-y-5">

                    {/* ব্রেকিং নিউজ বক্স */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                            <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded">
                                Breaking News
                            </span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {breakingNews.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={getArticleUrl(getCatName(item.category), item.slug)}
                                    className="block py-3 group"
                                >
                                    <span className="text-xs font-bold text-red-600 flex items-center gap-1 mb-1">
                                        <Clock size={12} /> {timeAgo(item.published_at)}
                                    </span>
                                    <p className="text-sm font-bold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                            <Link href="/news/category/breaking-news" className="text-xs font-black text-red-600 hover:underline flex items-center gap-1">
                                View All Breaking News &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* ওয়েদার বক্স */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                <CloudSun size={16} className="text-red-600" /> Weather – New York
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">☁️</span>
                                <div>
                                    <span className="text-3xl font-black text-gray-900">18°C</span>
                                    <span className="text-xs font-semibold text-gray-500 block">Cloudy</span>
                                </div>
                            </div>
                            <div className="text-xs font-medium text-gray-600 space-y-1 text-right">
                                <p>Humidity: <span className="font-bold text-gray-900">72%</span></p>
                                <p>Wind: <span className="font-bold text-gray-900">12 km/h</span></p>
                                <p>Feels like: <span className="font-bold text-gray-900">17°C</span></p>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                            <span className="text-xs font-bold text-red-600 hover:underline cursor-pointer">
                                View Full Forecast &rarr;
                            </span>
                        </div>
                    </div>

                </div>

            </section>

            {/* ২. টপ স্টোরিজ ও পপুলার আর্টিকেলস সেকশন */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-200">

                {/* টপ স্টোরিজ */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-2 mb-6 border-l-4 border-red-600 pl-3">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Top Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {topStories.map((item) => (
                            <Link
                                key={item.id}
                                href={getArticleUrl(getCatName(item.category), item.slug)}
                                className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
                            >
                                <div className="h-32 bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.featured_image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="p-3.5 flex flex-col flex-grow">
                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-wider mb-1">
                                        {getCatName(item.category)}
                                    </span>
                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <span className="text-[11px] text-gray-400 mt-auto pt-3 flex items-center gap-1">
                                        <Clock size={11} /> {timeAgo(item.published_at)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* পপুলার আর্টিকেলস (১, ২, ৩ ক্রমিক নম্বরসহ) */}
                <div className="lg:col-span-4">
                    <div className="flex items-center gap-2 mb-6 border-l-4 border-red-600 pl-3">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
                            <TrendingUp size={20} className="text-red-600" /> Popular Articles
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {popularArticles.map((item, idx) => (
                            <Link
                                key={item.id}
                                href={getArticleUrl(getCatName(item.category), item.slug)}
                                className="group flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-200 hover:shadow transition"
                            >
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                            {item.title}
                                        </h4>
                                        <span className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                            <Clock size={11} /> {timeAgo(item.published_at)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                    <img
                                        src={item.featured_image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </section>

        </main>
    );
}