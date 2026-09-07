export const runtime = 'edge';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockArticles } from '@/lib/mockData';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { category } = await params;

    return {
        title: `${category.toUpperCase()} News - USA News Flow`,
        description: `Latest news and updates in ${category}`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;

    const categoryArticles = mockArticles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryArticles.length === 0) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">
                    {category} News
                </h1>
                <p className="text-gray-600">
                    Stay updated with the latest articles in {category}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                    <article
                        key={article.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="relative h-48 w-full bg-gray-100">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-5">
                            <div className="text-xs text-gray-500 mb-2">
                                {article.publishedAt} • By {article.author}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                <Link
                                    href={`/news/${article.category.toLowerCase()}/${article.slug}`}
                                    className="hover:text-blue-600"
                                >
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                {article.summary}
                            </p>
                            <Link
                                href={`/news/${article.category.toLowerCase()}/${article.slug}`}
                                className="text-blue-600 font-semibold text-sm hover:underline"
                            >
                                Read full article →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}