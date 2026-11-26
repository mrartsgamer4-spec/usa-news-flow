export const runtime = 'edge';


import { NextRequest, NextResponse } from 'next/server';

import { getRequestContext } from '@cloudflare/next-on-pages';


function getDb(): any {

    try {

        const ctx = getRequestContext();

        if (ctx?.env?.DB) return ctx.env.DB;

    } catch (e) { }

    return (process.env as any).DB || null;

}


function isAdmin(request: NextRequest): boolean {

    return request.cookies.get('admin_token')?.value === 'authenticated';

}


function slugify(text: string): string {

    const clean = (text || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

    return clean || 'job';

}


export async function GET(request: NextRequest) {

    if (!isAdmin(request)) {

        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    }

    try {

        const db = getDb();

        if (!db) {

            return NextResponse.json({ success: false, message: 'Database connection not found' }, { status: 500 });

        }

        const { results } = await db.prepare(`

            SELECT * FROM jobs

            ORDER BY created_at DESC

            LIMIT 100

        `).all();

        return NextResponse.json({ success: true, jobs: results || [] });

    } catch (error: any) {

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }

}


export async function POST(request: NextRequest) {

    if (!isAdmin(request)) {

        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    }

    try {

        const body = await request.json();

        const { title, company, location, job_type, category, description, apply_url, salary } = body;

        if (!title || !company || !description || !apply_url) {

            return NextResponse.json(

                { success: false, message: 'Title, company, description and apply URL are required' },

                { status: 400 }

            );

        }

        const db = getDb();

        if (!db) {

            return NextResponse.json({ success: false, message: 'Database connection not found' }, { status: 500 });

        }

        const now = new Date().toISOString();

        const id = crypto.randomUUID();

        const slug = `${slugify(title)}-${slugify(company)}-${Date.now().toString(36)}`;

        await db.prepare(`

            INSERT INTO jobs (id, slug, title, company, location, job_type, category, description, apply_url, salary, source, status, created_at, updated_at, posted_at)

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'manual', 'published', ?, ?, ?)

        `).bind(

            id,

            slug,

            title.trim(),

            company.trim(),

            (location || 'Remote').trim(),

            (job_type || 'full_time').trim(),

            (category || '').trim(),

            description.trim(),

            apply_url.trim(),

            (salary || '').trim(),

            now,

            now,

            now

        ).run();

        return NextResponse.json({ success: true, message: 'Job added successfully', id, slug });

    } catch (error: any) {

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }

}


export async function DELETE(request: NextRequest) {

    if (!isAdmin(request)) {

        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    }

    try {

        const body = await request.json();

        const { id } = body;

        if (!id) {

            return NextResponse.json({ success: false, message: 'Job ID is required' }, { status: 400 });

        }

        const db = getDb();

        if (!db) {

            return NextResponse.json({ success: false, message: 'Database connection not found' }, { status: 500 });

        }

        await db.prepare(`DELETE FROM jobs WHERE id = ?`).bind(id).run();

        return NextResponse.json({ success: true, message: 'Job deleted successfully' });

    } catch (error: any) {

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }

}
