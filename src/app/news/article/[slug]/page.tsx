export const runtime = 'edge';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{
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
        if (!db) db = (process.env as any).DB;
        if (!db) return null;

        const decodedSlug = decodeURIComponent(slug).trim();

        const article = await db
            .prepare('SELECT * FROM articles WHERE slug = ? OR LOWER(slug) = LOWER(?) LIMIT 1')
            .bind(decodedSlug, decodedSlug)
            .first();

        return article;
    } catch (error) {
        console.error('Error fetching article from D1:', error);
        return null;
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) notFound();

    const article = await fetchArticle(slug);

    if (!article) notFound();

    const author = article.author_name || article.reporter_name || 'Editorial Staff';

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#cc0000] hover:underline mb-6 uppercase"
            >
                <ArrowLeft size={14} /> Back to Home
            </Link>

            <article className="space-y-6">
                <div className="space-y-3">
                    <span className="bg-[#cc0000] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded inline-block">
                        {article.category || 'News'}
                    </span>

                    <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}

                    {/* প্রতিনিধির নাম ও প্রকাশের সময় */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 text-sm text-gray-700 font-semibold">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-gray-900">
                                <User size={16} className="text-[#cc0000]" />
                                <span>{author}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Clock size={15} className="text-[#cc0000]" />
                                {new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {article.featured_image && (
                    <figure className="rounded-xl overflow-hidden shadow-sm bg-gray-100">
                        <img
                            src={article.featured_image}
                            alt={article.image_alt || article.title}
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                    </figure>
                )}

                {/* মূল নিউজ কনটেন্ট */}
                <div
                    className="text-gray-800 text-base sm:text-lg leading-relaxed space-y-4 pt-2 font-normal"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags && (
                    <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                        <Tag size={15} className="text-gray-400" />
                        {article.tags.split(',').map((tag: string) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </article>
        </main>
    );
}