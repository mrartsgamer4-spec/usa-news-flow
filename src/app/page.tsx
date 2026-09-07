export const runtime = 'edge';

import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles, Article } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

// Helper to format category slug
function formatCategorySlug(category: string): string {
    return category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

// Helper to format time ago
function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins || 1} hour${mins > 1 ? 's' : ''} ago`;
    }
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default async function HomePage() {
    const articles: Article[] = await getPublishedArticles(50); // Fetch up to 50 articles

    if (!articles || articles.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center py-20 bg-gray-50 border rounded-lg">
                    <h2 className="text-xl font-bold text-gray-700">No News Published Yet</h2>
                    <p className="text-sm text-gray-500 mt-2">Publish news from the admin panel to see them live here.</p>
                </div>
            </main>
        );
    }

    const heroArticle = articles[0];
    const middleArticles = articles.slice(1, 5);
    const breakingHeadlines = articles.slice(5, 8);
    const topStories = articles.slice(8, 12);
    const popularArticles = articles.slice(0, 3); // Top 3 popular

    // Grouping articles by Category for the bottom grid
    const categories = ['Politics', 'U.S. News', 'Business', 'Technology', 'Sports', 'World'];
    const categoryMap: { [key: string]: Article[] } = {};

    categories.forEach((cat) => {
        categoryMap[cat] = articles.filter(
            (a) => a.category.toLowerCase() === cat.toLowerCase()
        ).slice(0, 3);
    });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
            <h1 className="sr-only">{siteConfig.name} | Latest U.S. News, Breaking News & Top Stories</h1>

            {/* SECTION 1: HERO TOP LAYOUT */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left: Main Big Featured Article */}
                {heroArticle && (
                    <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-6">
                        <Link
                            href={`/news/${formatCategorySlug(heroArticle.category)}/${heroArticle.slug}`}
                            className="group block space-y-3"
                        >
                            <div className="relative w-full h-[320px] sm:h-[400px] bg-gray-100 rounded-md overflow-hidden">
                                <Image
                                    src={heroArticle.featured_image || siteConfig.ogImage}
                                    alt={heroArticle.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 p-5 text-white space-y-2">
                                    <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                                        {heroArticle.category}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white group-hover:text-red-400 transition">
                                        {heroArticle.title}
                                    </h2>
                                    <p className="text-gray-200 text-xs sm:text-sm line-clamp-2">
                                        {heroArticle.excerpt}
                                    </p>
                                    <div className="text-xs text-gray-300 font-medium pt-1">
                                        ⏱ {timeAgo(heroArticle.published_at)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Middle: 4 Vertical Short News */}
                <div className="lg:col-span-3 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-6">
                    {middleArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/news/${formatCategorySlug(article.category)}/${article.slug}`}
                            className="group flex gap-3 items-start border-b border-gray-100 pb-3 last:border-b-0"
                        >
                            <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
                                <Image
                                    src={article.featured_image || siteConfig.ogImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-200"
                                />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-red-600 uppercase">
                                    {article.category}
                                </span>
                                <h3 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                    {article.title}
                                </h3>
                                <div className="text-[10px] text-gray-400">
                                    ⏱ {timeAgo(article.published_at)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Right: Breaking News & Weather Widget */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Breaking News Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-red-600 pb-2">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                                BREAKING NEWS
                            </span>
                        </div>
                        <div className="space-y-3">
                            {breakingHeadlines.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${formatCategorySlug(item.category)}/${item.slug}`}
                                    className="block border-b border-gray-200 pb-2 last:border-0 group"
                                >
                                    <span className="text-[10px] text-red-600 font-bold block">
                                        {new Date(item.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <h4 className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                                        {item.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Simple Weather Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-2">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">WEATHER – NEW YORK</h4>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-extrabold text-gray-900">18°C</div>
                            <div className="text-right text-xs text-gray-500">
                                <p className="font-semibold text-gray-800">Cloudy</p>
                                <p>Humidity: 72%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: TOP STORIES & POPULAR ARTICLES */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 pt-8">
                {/* Top Stories Grid */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="border-b-2 border-red-600 pb-1">
                        <h3 className="text-lg font-black text-gray-900 uppercase">Top Stories</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {topStories.map((story) => (
                            <Link
                                key={story.id}
                                href={`/news/${formatCategorySlug(story.category)}/${story.slug}`}
                                className="group block border border-gray-100 rounded-md overflow-hidden bg-white hover:shadow-md transition"
                            >
                                <div className="relative w-full h-40 bg-gray-100">
                                    <Image
                                        src={story.featured_image || siteConfig.ogImage}
                                        alt={story.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-200"
                                    />
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                        {story.category}
                                    </span>
                                </div>
                                <div className="p-3 space-y-2">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {story.title}
                                    </h4>
                                    <div className="text-[10px] text-gray-400">
                                        ⏱ {timeAgo(story.published_at)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Articles List */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="border-b-2 border-red-600 pb-1">
                        <h3 className="text-lg font-black text-gray-900 uppercase">Popular Articles</h3>
                    </div>
                    <div className="space-y-3">
                        {popularArticles.map((article, idx) => (
                            <Link
                                key={article.id}
                                href={`/news/${formatCategorySlug(article.category)}/${article.slug}`}
                                className="group flex items-center gap-3 border-b border-gray-100 pb-3"
                            >
                                <span className="w-7 h-7 bg-red-600 text-white font-extrabold text-sm flex items-center justify-center rounded-full shrink-0">
                                    {idx + 1}
                                </span>
                                <div className="grow space-y-1">
                                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <div className="text-[10px] text-gray-400">
                                        ⏱ {timeAgo(article.published_at)}
                                    </div>
                                </div>
                                <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                                    <Image
                                        src={article.featured_image || siteConfig.ogImage}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: CATEGORY GRID BLOCKS (ফুটারের ঠিক উপরে) */}
            <section className="border-t border-gray-200 pt-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10">
                    {categories.map((catName) => {
                        const catArticles = categoryMap[catName] || [];
                        if (catArticles.length === 0) return null;

                        return (
                            <div key={catName} className="space-y-4">
                                <div className="flex items-center justify-between border-b-2 border-red-600 pb-1">
                                    <h3 className="text-base font-extrabold text-gray-900 uppercase flex items-center gap-1.5">
                                        <span className="w-1.5 h-4 bg-red-600 inline-block" />
                                        {catName}
                                    </h3>
                                    <Link
                                        href={`/news/category/${formatCategorySlug(catName)}`}
                                        className="text-xs font-bold text-red-600 hover:underline"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    {catArticles.map((art) => (
                                        <Link
                                            key={art.id}
                                            href={`/news/${formatCategorySlug(art.category)}/${art.slug}`}
                                            className="group flex gap-3 items-center"
                                        >
                                            <div className="relative w-20 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
                                                <Image
                                                    src={art.featured_image || siteConfig.ogImage}
                                                    alt={art.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition duration-200"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                                    {art.title}
                                                </h4>
                                                <div className="text-[10px] text-gray-400">
                                                    ⏱ {timeAgo(art.published_at)}
                                                </div>
                                            </div>
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