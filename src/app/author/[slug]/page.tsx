export const runtime = 'edge';

import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

interface AuthorPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const authorName = resolvedParams.slug.replace(/-/g, ' ').toUpperCase();

    return {
        title: `${authorName} - Journalist & Author | ${siteConfig.name}`,
        description: `Read all articles and reports published by ${authorName} on ${siteConfig.name}.`,
        alternates: {
            canonical: `${siteConfig.url}/author/${resolvedParams.slug}`,
        },
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const resolvedParams = await params;
    const authorName = resolvedParams.slug.replace(/-/g, ' ').toUpperCase();

    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
            <div className="flex items-center space-x-4 border-b pb-6">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                    {authorName[0]}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{authorName}</h1>
                    <p className="text-gray-500 text-sm">Editorial Staff & Reporter at {siteConfig.name}</p>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
                {authorName} contributes in-depth news coverage, factual analysis, and breaking story updates across national and global events.
            </p>
        </main>
    );
}