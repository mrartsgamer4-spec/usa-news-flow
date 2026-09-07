export const runtime = 'edge';

import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';
import { getArticleUrl } from '@/lib/urls';

export default async function HomePage() {
    const articles = await getPublishedArticles();

    const mainHero = articles[0];
    const topGrid = articles.slice(1, 5);
    const recentNews = articles.slice(5);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* SEO Permanent Primary H1 Tag (Visually hidden for clean newsroom aesthetic) */}
            <h1 className="sr-only">{siteConfig.name} - Latest Breaking U.S. News & World Updates</h1>

            {articles.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300 my-8">
                    <h2 className="text-xl font-bold text-gray-700">No News Published Yet</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Publish news from the admin panel (`/admin/dashboard`) to see them live here.
                    </p>
                </div>
            ) : (
                <>
                    {/* Top Headline Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Featured News */}
                        {mainHero && (
                            <div className="lg:col-span-2 group relative bg-black rounded-lg overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">
                                <Image
                                    src={mainHero.featured_image || siteConfig.defaultOgImage}
                                    alt={mainHero.image_alt || mainHero.title}
                                    fill
                                    priority
                                    className="object-cover opacity-80 group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="relative p-6 space-y-2 z-10">
                                    <span className="bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                                        {mainHero.category}
                                    </span>
                                    <Link href={getArticleUrl(mainHero.category, mainHero.slug)}>
                                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-red-400 transition leading-tight mt-2">
                                            {mainHero.title}
                                        </h2>
                                    </Link>
                                    <p className="text-gray-300 text-sm line-clamp-2 hidden sm:block">
                                        {mainHero.excerpt}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Secondary News List */}
                        <div className="space-y-4 flex flex-col justify-between">
                            <h2 className="text-sm font-extrabold uppercase tracking-wider text-red-600 border-b-2 border-red-600 pb-1">
                                Top Stories
                            </h2>
                            <div className="divide-y divide-gray-200 space-y-3">
                                {topGrid.map((art) => (
                                    <div key={art.id} className="pt-3 first:pt-0 flex gap-3 group">
                                        <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
                                            <Image
                                                src={art.featured_image || siteConfig.defaultOgImage}
                                                alt={art.image_alt || art.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-red-600 uppercase">
                                                {art.category}
                                            </span>
                                            <Link href={getArticleUrl(art.category, art.slug)}>
                                                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                                    {art.title}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* All Recent News Grid */}
                    {recentNews.length > 0 && (
                        <section className="space-y-4 pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-extrabold text-gray-900 border-l-4 border-red-600 pl-3 uppercase">
                                Latest Updates
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recentNews.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={getArticleUrl(article.category, article.slug)}
                                        className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition block"
                                    >
                                        <div className="relative w-full h-48 bg-gray-100">
                                            <Image
                                                src={article.featured_image || siteConfig.defaultOgImage}
                                                alt={article.image_alt || article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-300"
                                            />
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                                {article.category}
                                            </span>
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h3 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                                {article.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </main>
    );
}