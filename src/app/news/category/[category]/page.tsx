export const runtime = 'edge';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedArticles } from '@/lib/newsService';
import { siteConfig } from '@/lib/siteConfig';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

// Helper function to convert text into slug format
function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

// Helper function to format time ago
function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        return `${mins || 1} hour${mins > 1 ? 's' : ''} ago`;
    }
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
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
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const articles = await getPublishedArticles();

    // Flexible category matching logic
    const categoryArticles = articles.filter((a) => {
        if (!a.category) return false;
        return slugify(a.category) === slugify(resolvedParams.category);
    });

    const categoryName = resolvedParams.category.replace(/-/g, ' ').toUpperCase();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="text-xs text-gray-500 flex items-center gap-2 uppercase tracking-wide">
                <Link href="/" className="hover:text-red-600 transition">Home</Link>
                <span>/</span>
                <span className="font-bold text-gray-800">{categoryName}</span>
            </nav>

            {/* Header */}
            <div className="border-b-2 border-red-600 pb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 uppercase flex items-center gap-2">
                    <span className="w-2 h-7 bg-red-600 inline-block" />
                    {categoryName} NEWS
                </h1>
            </div>

            {categoryArticles.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                    <h2 className="text-lg font-bold text-gray-700">No articles found under {categoryName} category.</h2>
                    <p className="text-xs text-gray-500">Publish or assign news to this category from the admin panel to view them here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/news/${slugify(article.category)}/${article.slug}`}
                            className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition block"
                        >
                            <div className="relative w-full h-48 bg-gray-100">
                                <Image
                                    src={article.featured_image || siteConfig.ogImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                />
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-4 space-y-2">
                                <h2 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                                    <span>⏱ {timeAgo(article.published_at)}</span>
                                    <span className="text-red-600 font-semibold group-hover:underline">Read More →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}