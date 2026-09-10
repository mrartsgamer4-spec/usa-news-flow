export const runtime = 'edge';

import Link from 'next/link';
import { getPublishedArticles } from '@/lib/newsService';
import { getArticleUrl } from '@/lib/urls';

function timeAgo(dateString?: string): string {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Recently';
    }

    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) {
        return 'Just now';
    }

    if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m ago`;
    }

    if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h ago`;
    }

    if (seconds < 2592000) {
        return `${Math.floor(seconds / 86400)}d ago`;
    }

    if (seconds < 31536000) {
        return `${Math.floor(seconds / 2592000)}mo ago`;
    }

    return `${Math.floor(seconds / 31536000)}y ago`;
}

export default async function Home() {
    const articles = await getPublishedArticles();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="flex justify-between items-center mb-8 border-b-2 border-red-600 pb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Latest News
                </h1>

                <span className="text-sm text-gray-500">
                    USA News Flow
                </span>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
                    <h2 className="text-xl font-bold text-gray-700">
                        No news published yet.
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Publish an article from the admin dashboard.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {articles.map((article) => {

                        const categoryName =
                            typeof article.category === 'string'
                                ? article.category
                                : article.category?.name || 'News';

                        const articleUrl =
                            getArticleUrl(
                                categoryName,
                                article.slug
                            );

                        const image =
                            article.featured_image;

                        return (
                            <Link
                                key={article.id}
                                href={articleUrl}
                                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col bg-white"
                            >

                                {image && (
                                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                                        <img
                                            src={image}
                                            alt={
                                                article.image_alt ||
                                                article.title
                                            }
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                )}

                                <div className="p-5 flex flex-col flex-grow">

                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-2">
                                        {categoryName}
                                    </span>

                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 mb-3">
                                        {article.title}
                                    </h2>

                                    {article.excerpt && (
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                            {article.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-auto text-xs text-gray-400">
                                        {timeAgo(
                                            article.published_at ||
                                            article.publishedAt
                                        )}
                                    </div>

                                </div>
                            </Link>
                        );
                    })}

                </div>
            )}

        </main>
    );
}