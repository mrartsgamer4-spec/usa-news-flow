export const runtime = 'edge';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { siteConfig } from '@/lib/siteConfig';
import { Clock, User, Calendar, Tag } from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{
        category?: string;
        slug: string;
    }>;
}

async function getArticle(slug: string) {
    try {
        let db: any = null;
        try {
            const ctx = getRequestContext();
            db = ctx?.env?.DB;
        } catch (e) { }
        if (!db) db = (process.env as any).DB;
        if (!db) return null;

        const rawSlug = (slug || '').trim();
        const decodedSlug = decodeURIComponent(rawSlug).trim();

        // ডিকোড করা স্লাগ এবং কেস-ইনসেনসিটিভ চেক
        const stmt = db.prepare(`
            SELECT * FROM articles 
            WHERE slug = ? OR slug = ? OR LOWER(slug) = LOWER(?) 
            LIMIT 1
        `);
        const article = await stmt.bind(rawSlug, decodedSlug, decodedSlug).first();
        return article || null;
    } catch (e) {
        console.error('Error fetching single article from D1:', e);
        return null;
    }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const article: any = await getArticle(resolvedParams.slug);

    if (!article) {
        return {
            title: `Article Not Found | ${siteConfig.name}`,
        };
    }

    return {
        title: `${article.title} | ${siteConfig.name}`,
        description: article.excerpt || article.title,
        openGraph: {
            title: article.title,
            description: article.excerpt || article.title,
            images: article.featured_image ? [article.featured_image] : [],
        },
    };
}

export default async function SingleArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const article: any = await getArticle(resolvedParams.slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-red-100 text-[#cc0000] text-xs font-black uppercase rounded-full tracking-wider">
                    {article.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 pt-2 border-b border-gray-200 pb-4">
                    <span className="flex items-center gap-1.5 text-gray-800 font-bold">
                        <User size={14} className="text-[#cc0000]" />
                        {article.author_name || article.reporter_name || 'Staff Reporter'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {article.featured_image && (
                <div className="w-full rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-200">
                    <img
                        src={article.featured_image}
                        alt={article.image_alt || article.title}
                        className="w-full max-h-[480px] object-cover"
                    />
                    {article.image_alt && (
                        <p className="p-2.5 text-xs text-gray-500 italic bg-gray-50 border-t border-gray-100 text-center">
                            {article.image_alt}
                        </p>
                    )}
                </div>
            )}

            {article.excerpt && (
                <p className="text-base sm:text-lg font-semibold text-gray-700 leading-relaxed italic border-l-4 border-[#cc0000] pl-4">
                    {article.excerpt}
                </p>
            )}

            <div
                className="text-gray-800 leading-relaxed text-base sm:text-lg space-y-4 pt-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.tags && (
                <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                    <Tag size={14} className="text-gray-400" />
                    {article.tags.split(',').map((tag: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-semibold">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            )}
        </main>
    );
}