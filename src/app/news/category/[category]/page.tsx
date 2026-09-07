import { MockNewsData } from '@/lib/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const categoryName = resolvedParams.category;

    // ১. MockNewsData অবজেক্ট থেকে সব আর্টিকেল ফ্ল্যাট অ্যারে-তে রূপান্তর
    const allArticles = [
        MockNewsData.heroArticle,
        ...(MockNewsData.topStories || []),
        ...(MockNewsData.middleArticles || []),
        ...(MockNewsData.popularArticles || []),
    ].filter(Boolean);

    // ২. ক্যাটাগরি অনুযায়ী ফিল্টার করা
    const filteredNews = allArticles.filter(
        (article) => article.category?.toLowerCase() === categoryName.toLowerCase()
    );

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold uppercase mb-6 border-b-2 border-news-red pb-2">
                Category: <span className="text-news-red">{categoryName}</span>
            </h1>

            {filteredNews.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                    <p className="text-xl font-semibold">No news articles found in this category.</p>
                    <Link href="/" className="mt-4 inline-block text-news-red hover:underline">
                        &larr; Back to Home
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((news) => (
                        <article key={news.id} className="border border-news-border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            {news.imageUrl && (
                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            <span className="text-xs font-bold text-news-red uppercase">
                                {news.category}
                            </span>
                            <h2 className="text-xl font-bold mt-1 mb-2 hover:text-news-red transition">
                                <Link href={`/news/${news.category}/${news.slug}`}>
                                    {news.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-news-gray line-clamp-3">
                                {news.summary}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}