export const runtime = 'edge';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { Author, Article } from '@/types/article';
import { getArticleUrl, getAuthorUrl } from '@/lib/urls';
import { generateBreadcrumbSchema } from '@/lib/seoSchemas';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';

interface AuthorPageProps {
    params: Promise<{
        slug: string;
    }>;
}

function formatAuthorName(slug: string): string {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}

async function getAuthorData(slug: string): Promise<{ author: Author | null; articles: Article[] }> {
    let author: Author | null = null;
    let articles: Article[] = [];

    try {
        if (typeof process !== 'undefined' && process.env) {
            try {
                const { getRequestContext } = await import('@cloudflare/next-on-pages');
                const { env } = getRequestContext();
                if (env?.DB) {
                    // Fetch Author
                    author = await env.DB.prepare(
                        `SELECT * FROM authors WHERE slug = ? LIMIT 1`
                    ).bind(slug).first<Author>();

                    // Fetch Articles by Author Slug or Name
                    const articlesResult = await env.DB.prepare(
                        `SELECT a.*, COALESCE(auth.name, 'Editorial Team') as author, auth.slug as author_slug 
                         FROM articles a 
                         LEFT JOIN authors auth ON a.author_id = auth.id 
                         WHERE auth.slug = ? OR a.author_id = ? OR LOWER(a.author) = ? 
                         ORDER BY a.published_at DESC LIMIT 20`
                    ).bind(slug, author?.id || '', formatAuthorName(slug).toLowerCase()).all<Article>();

                    articles = articlesResult.results || [];
                }
            } catch (e) {
                console.warn('D1 fetch failed in author page', e);
            }
        }
    } catch (err) {
        console.error('Error loading author page data:', err);
    }

    return { author, articles };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const authorName = formatAuthorName(resolvedParams.slug);
    const canonicalUrl = getAuthorUrl(resolvedParams.slug);

    return {
        title: `${authorName} - Journalist & Author | ${siteConfig.name}`,
        description: `Read all news articles, reports, and political analysis authored by ${authorName} on ${siteConfig.name}.`,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const resolvedParams = await params;
    const { author, articles } = await getAuthorData(resolvedParams.slug);
    const authorName = author?.name || formatAuthorName(resolvedParams.slug);
    const authorUrl = getAuthorUrl(resolvedParams.slug);

    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        { name: 'Authors', url: '/about' },
        { name: authorName, url: authorUrl },
    ];

    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

    return (
        <>
            <JsonLd data={breadcrumbSchema} />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Visual Breadcrumb UI */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Author Profile Header */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {author?.avatar_url ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-red-600">
                            <Image
                                src={author.avatar_url}
                                alt={authorName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center font-black text-4xl shrink-0 uppercase shadow-md">
                            {authorName[0]}
                        </div>
                    )}

                    <div className="space-y-2 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{authorName}</h1>
                        <p className="text-red-600 font-semibold text-sm">
                            {author?.role || `Staff Writer & Journalist at ${siteConfig.name}`}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                            {author?.bio || `${authorName} contributes in-depth news coverage, factual reports, and timely analysis across national and global events for ${siteConfig.name}.`}
                        </p>
                    </div>
                </div>

                {/* Author's Articles List Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3 uppercase">
                        Articles by {authorName}
                    </h2>

                    {articles.length === 0 ? (
                        <div className="py-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-sm text-gray-500">No published articles found under this author yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={getArticleUrl(article.category, article.slug)}
                                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div className="p-5 space-y-2">
                                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 flex justify-between items-center">
                                        <time dateTime={article.published_at}>
                                            {new Date(article.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </time>
                                        <span className="text-red-600 font-semibold group-hover:underline">Read Article →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}