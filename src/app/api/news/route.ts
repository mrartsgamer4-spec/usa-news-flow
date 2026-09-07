import { NextRequest, NextResponse } from 'next/server';
import { mockNewsData } from '@/lib/mockData';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const slug = searchParams.get('slug');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');

        let result = [...mockNewsData];

        // ১. নির্দিষ্ট কোনো নিউজের বিস্তারিত পেতে (Slug অনুযায়ী)
        if (slug) {
            const singleNews = result.find((item) => item.slug === slug);
            if (!singleNews) {
                return NextResponse.json(
                    { success: false, message: 'সংবাদটি পাওয়া যায়নি' },
                    { status: 404 }
                );
            }
            return NextResponse.json({ success: true, data: singleNews }, { status: 200 });
        }

        // ২. নির্দিষ্ট ক্যাটাগরির সংবাদ ফিল্টার করতে
        if (category) {
            result = result.filter(
                (item) => item.category.toLowerCase() === category.toLowerCase()
            );
        }

        // ৩. কিওয়ার্ড দিয়ে অনুসন্ধান করতে
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.content?.toLowerCase().includes(query)
            );
        }

        // ৪. খবরের সীমাবদ্ধতা নির্ধারণ করতে (Limit)
        if (limit) {
            const limitNum = parseInt(limit, 10);
            if (!isNaN(limitNum)) {
                result = result.slice(0, limitNum);
            }
        }

        return NextResponse.json(
            {
                success: true,
                total: result.length,
                data: result,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'ডাটা সার্ভার থেকে লোড হতে সমস্যা হয়েছে',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}