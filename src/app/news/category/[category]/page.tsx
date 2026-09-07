import Link from 'next/link';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const categoryName =
        resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);

    return {
        title: `${categoryName} News - USA News`,
        description: `Latest news and updates in ${categoryName}`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const { category } = resolvedParams;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // নতুন API এর মাধ্যমে ক্যাটাগরি অনুযায়ী খবর ফেচ করা
    const res = await fetch(`${baseUrl}/api/news?category=${category}`, {
        cache: 'no-store',
    });
    const result = await res.json();

    const newsList = result.success ? result.data : [];
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* হেডার */}
            <div className="border-b pb-4 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide">
                    Category: <span className="text-blue-600">{categoryTitle}</span>
                </h1>
                <p className="text-gray-600 mt-1">
                    Total Articles: {newsList.length}
                </p>
            </div>

            {/* খবরের গ্রিড */}
            {newsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsList.map((item: any) => (
                        <article
                            key={item.id || item.slug}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                        >
                            {item.imageUrl && (
                                <Link href={`/news/${category.toLowerCase()}/${item.slug}`}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                                    />
                                </Link>
                            )}
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                                    <Link href={`/news/${category.toLowerCase()}/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                    {item.summary || item.content}
                                </p>
                                <div className="text-xs text-gray-400 mt-auto pt-2 border-t">
                                    {item.publishedAt || 'Recent'}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">
                        No news articles found in this category.
                    </p>
                    <Link
                        href="/"
                        className="inline-block mt-4 text-blue-600 hover:underline font-medium"
                    >
                        Go back to homepage
                    </Link>
                </div>
            )}
        </div>
    );
}