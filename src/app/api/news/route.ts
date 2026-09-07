export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { mockArticles } from '@/lib/mockData';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let articles = [...mockArticles];

    if (category) {
        articles = articles.filter(
            (article) => article.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (limit) {
        articles = articles.slice(0, parseInt(limit, 10));
    }

    return NextResponse.json({ articles });
}