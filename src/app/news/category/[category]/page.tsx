export const runtime = 'edge';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const categoryName = resolvedParams.category.replace(/-/g, ' ').toUpperCase();
    const canonicalUrl = `${siteConfig.url}/news/category/${resolvedParams.category}`;

    return {
        title: `${categoryName} News | ${siteConfig.name}`,
        description: `Get the latest news, updates, and analysis on ${categoryName} from ${siteConfig.name}.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${categoryName} News | ${siteConfig.name}`,
            description: `Latest news and updates on ${categoryName}.`,
            url: canonicalUrl,
            siteName: siteConfig.name,
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const articles = await getPublishedArticles();
    const categoryArticles = articles.filter(
        (a) => a.category.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') === resolvedParams.category.toLowerCase()
    );

    if (categoryArticles.length === 0) {
        notFound();
    }

    const categoryName = resolvedParams.category.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <h1 className="text-3xl font-extrabold text-gray-900 border-l-4 border-red-600 pl-3 uppercase">
                {categoryName} NEWS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/news/${resolvedParams.category}/${article.slug}`}
                        className="group bg-white border border-gray-100 rounded overflow-hidden shadow-xs block"
                    >
                        <div className="relative w-full h-48 bg-gray-100">
                            <Image
                                src={article.featured_image || siteConfig.ogImage}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                            />
                        </div>
                        <div className="p-4 space-y-2">
                            <h2 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2">
                                {article.title}
                            </h2>
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {article.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}