export const runtime = 'edge';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/newsService';

function timeAgo(dateString?: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}m ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;
    return `${Math.floor(seconds)}s ago`;
}

export default async function Home() {
    const articles = await getPublishedArticles();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8 border-b-2 border-red-600 pb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Latest News
                </h1>
            </div>

            {(!articles || articles.length === 0) ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No news published yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article: any) => {
                        const categoryName = article.category || 'general';
                        const slug = article.slug;
                        const href = `/news/${categoryName.toLowerCase()}/${slug}`;

                        return (
                            <Link href={href} key={article.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col bg-white">
                                {article.image_url && (
                                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-5 flex flex-col flex-grow">
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-2">
                                        {categoryName}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 mb-3">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-auto text-xs text-gray-400 font-medium">
                                        {timeAgo(article.published_at || article.created_at)}
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