import { NextResponse, NextRequest } from 'next/server';
import { MockNewsData } from '@/lib/mockData';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const slug = searchParams.get('slug');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');

        // ১. অবজেক্টের ভেতরের সব অ্যারে একত্র করে একটি একক অ্যারে তৈরি করা
        let result = [
            MockNewsData.heroArticle,
            ...(MockNewsData.topStories || []),
            ...(MockNewsData.middleArticles || []),
            ...(MockNewsData.popularArticles || []),
        ].filter(Boolean); // null বা undefined উপাদানগুলো দূর করার জন্য

        // ২. নির্দিষ্ট কোনো নিউজের বিস্তারিত পেতে (slug অনুযায়ী)
        if (slug) {
            const singleNews = result.find((item) => item.slug === slug);
            if (!singleNews) {
                return NextResponse.json(
                    { error: 'সংবাদটি পাওয়া যায়নি' },
                    { status: 404 }
                );
            }
            return NextResponse.json(singleNews);
        }

        // ৩. ক্যাটাগরি অনুযায়ী ফিল্টার
        if (category) {
            result = result.filter(
                (item) => item.category?.toLowerCase() === category.toLowerCase()
            );
        }

        // ৪. সার্চ কিওয়ার্ড অনুযায়ী ফিল্টার
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title?.toLowerCase().includes(query) ||
                    item.summary?.toLowerCase().includes(query)
            );
        }

        // ৫. লিমিট অনুযায়ী ডাটা পাঠানো
        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (!isNaN(parsedLimit) && parsedLimit > 0) {
                result = result.slice(0, parsedLimit);
            }
        }

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}