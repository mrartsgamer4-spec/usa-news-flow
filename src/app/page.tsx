export const runtime = 'edge';

import Link from 'next/link';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl, getCategoryUrl } from '@/lib/urls';

function timeAgo(dateString?: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
    return `${Math.floor(seconds / 31536000)}y ago`;
}

function getCatName(category: any): string {
    if (typeof category === 'string') return category;
    if (category && typeof category === 'object' && 'name' in category) {
        return category.name || 'News';
    }
    return 'News';
}

export default async function Home() {
    const articles = (await getPublishedArticles()) || [];

    if (articles.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="py-16 bg-white border border-gray-200 rounded-xl">
                    <h2 className="text-xl font-bold text-gray-700">No news published yet.</h2>
                    <p className="text-sm text-gray-500 mt-2">Publish an article from the admin dashboard.</p>
                </div>
            </main>
        );
    }

    // সেকশন অনুযায়ী আর্টিকেল সাজানো
    const heroFeatured = articles[0];
    const heroMiddle = articles.slice(1, 5);
    const breakingNews = articles.slice(0, 4);
    const topStories = articles.slice(5, 9);
    const popularArticles = articles.slice(2, 6);

    // ক্যাটাগরি গ্রিডের জন্য ফিল্টার
    const categoriesList = ['Politics', 'U.S. News', 'Business', 'Technology', 'Sports', 'World'];

    const getArticlesByCategory = (catName: string) => {
        const filtered = articles.filter(a =>
            getCatName(a.category).toLowerCase().includes(catName.toLowerCase())
        );
        return filtered.length >= 3 ? filtered.slice(0, 3) : articles.slice(0, 3);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

            {/* ১. হিরো সেকশন */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* বামের বড় ফিচার্ড কার্ড */}
                {heroFeatured && (
                    <div className="lg:col-span-5">
                        <Link
                            href={getArticleUrl(getCatName(heroFeatured.category), heroFeatured.slug)}
                            className="group block relative h-[450px] rounded-lg overflow-hidden bg-gray-900 shadow-sm"
                        >
                            <img
                                src={heroFeatured.featured_image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80'}
                                alt={heroFeatured.image_alt || heroFeatured.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit mb-2">
                                    {getCatName(heroFeatured.category)}
                                </span>
                                <h2 className="text-2xl font-extrabold text-white leading-tight group-hover:text-red-400 transition-colors">
                                    {heroFeatured.title}
                                </h2>
                                {heroFeatured.excerpt && (
                                    <p className="text-gray-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                                        {heroFeatured.excerpt}
                                    </p>
                                )}
                                <span className="text-[11px] text-gray-400 mt-3 flex items-center gap-1">
                                    🕒 {timeAgo(heroFeatured.published_at || heroFeatured.publishedAt)}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

                {/* মাঝের ৪টি কার্ড */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {heroMiddle.map((item) => (
                        <Link
                            key={item.id}
                            href={getArticleUrl(getCatName(item.category), item.slug)}
                            className="group flex gap-3 items-center bg-white p-2 rounded-lg border border-gray-100 hover:shadow transition"
                        >
                            <div className="w-24 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                <img
                                    src={item.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80'}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                                    {getCatName(item.category)}
                                </span>
                                <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                    {item.title}
                                </h3>
                                <span className="text-[10px] text-gray-400 mt-1 block">
                                    🕒 {timeAgo(item.published_at || item.publishedAt)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ডানের ব্রেকিং নিউজ ও ওয়েদার কার্ড */}
                <div className="lg:col-span-3 space-y-4">
                    {/* ব্রেকিং নিউজ */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between border-b pb-2 mb-3">
                            <span className="bg-red-600 text-white text-[11px] font-bold uppercase px-2 py-0.5 rounded">
                                Breaking News
                            </span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {breakingNews.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={getArticleUrl(getCatName(item.category), item.slug)}
                                    className="block py-2.5 group"
                                >
                                    <span className="text-[10px] font-bold text-red-600 block">
                                        {timeAgo(item.published_at || item.publishedAt)}
                                    </span>
                                    <p className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ওয়েদার উইজেট */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                                Weather – New York
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">☁️</span>
                                <div>
                                    <span className="text-2xl font-extrabold text-gray-900">18°C</span>
                                    <span className="text-[11px] text-gray-500 block">Cloudy</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-500 space-y-0.5 text-right">
                                <p>Humidity: 72%</p>
                                <p>Wind: 12 km/h</p>
                                <p>Feels like: 17°C</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* ২. টপ স্টোরিজ ও পপুলার আর্টিকেলস */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">

                {/* টপ স্টোরিজ (৪টি কার্ড) */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-2 mb-4 border-l-4 border-red-600 pl-2">
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Top Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {topStories.map((item) => (
                            <Link
                                key={item.id}
                                href={getArticleUrl(getCatName(item.category), item.slug)}
                                className="group flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow"
                            >
                                <div className="h-28 bg-gray-200 overflow-hidden">
                                    <img
                                        src={item.featured_image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <div className="p-3 flex flex-col flex-grow">
                                    <span className="text-[9px] font-bold text-red-600 uppercase mb-1">
                                        {getCatName(item.category)}
                                    </span>
                                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <span className="text-[10px] text-gray-400 mt-auto pt-2">
                                        🕒 {timeAgo(item.published_at || item.publishedAt)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* পপুলার আর্টিকেলস (১, ২, ৩ ক্রমিক নম্বরসহ) */}
                <div className="lg:col-span-4">
                    <div className="flex items-center gap-2 mb-4 border-l-4 border-red-600 pl-2">
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Popular Articles</h2>
                    </div>
                    <div className="space-y-4">
                        {popularArticles.map((item, idx) => (
                            <Link
                                key={item.id}
                                href={getArticleUrl(getCatName(item.category), item.slug)}
                                className="group flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-gray-100 hover:shadow transition"
                            >
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-gray-400 mt-1 block">
                                            🕒 {timeAgo(item.published_at || item.publishedAt)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-16 h-12 rounded overflow-hidden shrink-0 bg-gray-100">
                                    <img
                                        src={item.featured_image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </section>

            {/* ৩. ক্যাটাগরি গ্রিড (ফুটারের ঠিক উপরে) */}
            <section className="space-y-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categoriesList.map((catTitle) => {
                        const catArticles = getArticlesByCategory(catTitle);
                        return (
                            <div key={catTitle} className="space-y-3">
                                <div className="flex items-center justify-between border-b-2 border-red-600 pb-1">
                                    <h3 className="text-base font-bold text-gray-900 uppercase">
                                        {catTitle}
                                    </h3>
                                    <Link
                                        href={getCategoryUrl(catTitle.toLowerCase().replace(/\s+/g, '-'))}
                                        className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                                    >
                                        View All &rarr;
                                    </Link>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {catArticles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={getArticleUrl(getCatName(article.category), article.slug)}
                                            className="group block space-y-1.5"
                                        >
                                            <div className="h-20 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={article.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80'}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                />
                                            </div>
                                            <h4 className="text-[11px] font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-tight">
                                                {article.title}
                                            </h4>
                                            <span className="text-[9px] text-gray-400 block">
                                                🕒 {timeAgo(article.published_at || article.publishedAt)}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

        </main>
    );
}