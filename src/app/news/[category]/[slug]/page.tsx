export const runtime = 'edge';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockArticles } from '@/lib/mockData';

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const article = mockArticles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${article.title} - USA News Flow`,
        description: article.summary,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { category, slug } = await params;
    const article = mockArticles.find(
        (a) => a.slug === slug && a.category.toLowerCase() === category.toLowerCase()
    );

    if (!article) {
        notFound();
    }

    const relatedArticles = mockArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="text-sm font-medium text-gray-500 mb-4">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <span className="mx-2">/</span>
                <Link href={`/news/category/${article.category.toLowerCase()}`} className="hover:text-blue-600 capitalize">
                    {article.category}
                </Link>
            </nav>

            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded capitalize">
                            {article.category}
                        </span>
                        <span>•</span>
                        <time>{article.publishedAt}</time>
                        <span>•</span>
                        <span>By {article.author}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="relative h-80 sm:h-96 w-full mb-8 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="prose max-w-none text-gray-800 text-lg leading-relaxed space-y-4">
                        <p className="font-semibold text-gray-900">{article.summary}</p>
                        <p>{article.content}</p>
                    </div>
                </div>
            </article>

            {relatedArticles.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((rel) => (
                            <Link
                                key={rel.id}
                                href={`/news/${rel.category.toLowerCase()}/${rel.slug}`}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="relative h-36 w-full mb-3 rounded overflow-hidden bg-gray-100">
                                    <Image
                                        src={rel.imageUrl}
                                        alt={rel.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 line-clamp-2">{rel.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}