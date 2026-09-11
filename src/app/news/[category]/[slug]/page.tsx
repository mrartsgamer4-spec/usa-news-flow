export const runtime = 'edge';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { Clock, User, ArrowLeft, Tag } from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

async function fetchArticle(slug: string) {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }

        if (!db) {
            db = (process.env as any).DB;
        }

        if (!db) return null;

        // এনকোডেড ও ডিকোডেড উভয় ফরম্যাটেই স্লগ প্রস্তুত করা
        const rawSlug = slug.trim();
        const decodedSlug = decodeURIComponent(slug).trim();

        const article = await db
            .prepare('SELECT * FROM articles WHERE slug = ? OR slug = ? OR LOWER(slug) = LOWER(?) LIMIT 1')
            .bind(rawSlug, decodedSlug, decodedSlug)
            .first();

        return article;
    } catch (error) {
        console.error('Error loading article from D1:', error);
        return null;
    }
}

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const { category, slug } = resolvedParams;

    if (!slug) notFound();

    const article = await fetchArticle(slug);

    if (!article) notFound();

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#cc0000] hover:underline mb-8"
            >
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <header className="space-y-4">
                <span className="bg-[#cc0000] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded w-fit inline-block">
                    {article.category || decodeURIComponent(category)}
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                    {article.title}
                </h1>

                {article.excerpt && (
                    <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed">
                        {article.excerpt}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200 text-sm text-gray-600 font-semibold">
                    <span className="flex items-center gap-1.5">
                        <User size={16} className="text-[#cc0000]" /> {article.author_name || 'Editorial Staff'}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-[#cc0000]" /> {new Date(article.created_at || Date.now()).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </header>

            {article.featured_image && (
                <figure className="my-8 rounded-xl overflow-hidden shadow-md">
                    <img
                        src={article.featured_image}
                        alt={article.image_alt || article.title}
                        className="w-full h-auto max-h-[520px] object-cover"
                    />
                    {article.image_alt && (
                        <figcaption className="text-xs text-gray-400 mt-2 text-center">
                            {article.image_alt}
                        </figcaption>
                    )}
                </figure>
            )}

            <div
                className="text-gray-800 text-lg leading-relaxed space-y-6 pt-2 font-normal"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.tags && (
                <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    {article.tags.split(',').map((t: string) => (
                        <span key={t} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded font-semibold">
                            #{t.trim()}
                        </span>
                    ))}
                </footer>
            )}
        </main>
    );
}