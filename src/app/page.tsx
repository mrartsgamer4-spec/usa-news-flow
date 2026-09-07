import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import NewsCategorySelection from '@/components/news/NewsCategorySelection';
import NewsTicker from '@/components/news/NewsTicker';
import { siteConfig } from '@/lib/siteConfig';

export const revalidate = 60; // 60 seconds incremental static regeneration for high-performance Edge caching

export default async function HomePage() {
    const articles = await getPublishedArticles();

    const heroArticle = articles[0];
    const topStories = articles.slice(1, 5);
    const breakingNews = articles.filter(a => a.breaking).slice(0, 5);

    const getArticleUrl = (item: { category?: string; slug?: string }) => {
        const cat = item.category?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || 'us-news';
        const slug = item.slug || 'news-update';
        return `/news/${cat}/${slug}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Stable Homepage H1 for Search Engine Information Architecture */}
            <h1 className="sr-only">
                {siteConfig.name} | Latest U.S. News, Breaking News & Top Stories
            </h1>

            {/* Breaking News Ticker */}
            {breakingNews.length > 0 && (
                <NewsTicker headlines={breakingNews.map(b => ({ title: b.title, url: getArticleUrl(b) }))} />
            )}

            {/* Hero Main Layout */}
            {heroArticle && (
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Featured News */}
                    <div className="lg:col-span-8 space-y-4">
                        <Link href={getArticleUrl(heroArticle)} className="group block space-y-3">
                            <div className="relative w-full h-[350px] md:h-[450px] rounded-lg overflow-hidden bg-gray-200">
                                <Image
                                    src={heroArticle.featured_image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80"}
                                    alt={heroArticle.image_alt || heroArticle.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase rounded-xs">
                                    {heroArticle.category}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 group-hover:text-red-600 leading-tight">
                                {heroArticle.title}
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                                {heroArticle.excerpt}
                            </p>
                            <div className="text-xs text-gray-400 font-medium">
                                By {heroArticle.author} • {new Date(heroArticle.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                        </Link>
                    </div>

                    {/* Top Stories Sidebar */}
                    <div className="lg:col-span-4 space-y-4 border-l border-gray-100 lg:pl-6">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-red-600 pb-2 uppercase tracking-wide">
                            Top Stories
                        </h3>
                        <div className="space-y-4 divide-y divide-gray-100">
                            {topStories.map((story) => (
                                <Link
                                    key={story.id}
                                    href={getArticleUrl(story)}
                                    className="group block pt-3 first:pt-0 space-y-1"
                                >
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                                        {story.category}
                                    </span>
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                        {story.title}
                                    </h4>
                                    <span className="text-[11px] text-gray-400 block">
                                        {new Date(story.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Category Grid Section */}
            <NewsCategorySelection
                articles={articles}
                getArticleUrl={(item) => getArticleUrl({ category: item.category, slug: item.slug })}
            />
        </div>
    );
}