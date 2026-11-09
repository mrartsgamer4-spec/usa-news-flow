import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Article ID is required' }, { status: 400 });
    }

    // Cloudflare D1 Database binding environment check
    // @ts-ignore
    const db = process.env.DB;

    if (!db) {
      return NextResponse.json({ success: false, message: 'Database connection not found' }, { status: 500 });
    }

    // Increment view count for the specific article
    await db.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').bind(id).run();

    return NextResponse.json({ success: true, message: 'View count updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
