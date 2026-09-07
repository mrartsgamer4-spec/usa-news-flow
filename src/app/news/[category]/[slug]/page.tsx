import { notFound } from 'next/navigation';
import Link from 'next/link';

interface SingleNewsPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: SingleNewsPageProps) {
    const resolvedParams = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/news?slug=${resolvedParams.slug}`, {
        cache: 'no-store',
    });
    const data = await res.json();

    if (!data.success || !data.data) {
        return { title: 'News Not Found' };
    }

    return {
        title: data.data.title,
        description: data.data.summary || data.data.content?.substring(0, 160),
    };
}

export default async function SingleNewsPage({ params }: SingleNewsPageProps) {
    const resolvedParams = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // নতুন API এর মাধ্যমে খবর ফেচ করা
    const res = await fetch(`${baseUrl}/api/news?slug=${resolvedParams.slug}`, {
        cache: 'no-store',
    });
    const result = await res.json();

    if (!result.success || !result.data) {
        notFound();
    }

    const newsItem = result.data;

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            {/* ক্যাটাগরি ও ব্রেডক্রাম্ব */}
            <div className="mb-4">
                <Link
                    href={`/news/category/${newsItem.category.toLowerCase()}`}
                    className="text-sm font-semibold uppercase tracking-wider text-blue-600 hover:underline"
                >
                    {newsItem.category}
                </Link>
            </div>

            {/* শিরোনাম */}
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                {newsItem.title}
            </h1>

            {/* তারিখ ও তথ্য */}
            <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
                <span>{newsItem.publishedAt || 'Recently Published'}</span>
                {newsItem.author && (
                    <>
                        <span className="mx-2">•</span>
                        <span>By {newsItem.author}</span>
                    </>
                )}
            </div>

            {/* ছবি (যদি থাকে) */}
            {newsItem.imageUrl && (
                <div className="mb-8">
                    <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                    />
                </div>
            )}

            {/* সারসংক্ষেপ */}
            {newsItem.summary && (
                <p className="text-xl font-medium text-gray-700 mb-6 italic leading-relaxed border-l-4 border-blue-600 pl-4">
                    {newsItem.summary}
                </p>
            )}

            {/* মূল কনটেন্ট */}
            <div className="prose max-w-none text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                {newsItem.content}
            </div>
        </article>
    );
}