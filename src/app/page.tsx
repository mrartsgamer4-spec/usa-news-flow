export const runtime = 'edge';

import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

export default async function HomePage() {
    const articles = await getPublishedArticles();
    const featuredArticle = articles[0];
    const secondaryArticles = articles.slice(1, 5);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            <h1 className="sr-only">{siteConfig.name} | Latest U.S. News, Breaking News & Top Stories</h1>

            {articles.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 border rounded-lg">
                    <h2 className="text-xl font-bold text-gray-700">No News Published Yet</h2>
                    <p className="text-sm text-gray-500 mt-2">Publish news from the admin panel to see them live here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Featured News */}
                    {featuredArticle && (
                        <div className="lg:col-span-2 space-y-4">
                            <Link
                                href={`/news/${featuredArticle.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}/${featuredArticle.slug}`}
                                className="group block space-y-3"
                            >
                                <div className="relative w-full h-80 sm:h-96 bg-gray-100 rounded overflow-hidden">
                                    <Image
                                        src={featuredArticle.featured_image || siteConfig.ogImage}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-300"
                                        priority
                                    />
                                </div>
                                <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                                    {featuredArticle.category}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-red-600 transition">
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">
                                    {featuredArticle.excerpt}
                                </p>
                            </Link>
                        </div>
                    )}

                    {/* Secondary News Sidebar */}
                    <div className="space-y-6 border-t lg:border-t-0 lg:border-l lg:pl-6 border-gray-200 pt-6 lg:pt-0">
                        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-600 pb-2 uppercase">
                            Latest Headlines
                        </h3>
                        <div className="space-y-4">
                            {secondaryArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/news/${article.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}/${article.slug}`}
                                    className="group block border-b border-gray-100 pb-3 space-y-1"
                                >
                                    <span className="text-xs text-red-600 font-bold uppercase">
                                        {article.category}
                                    </span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 text-sm">
                                        {article.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}