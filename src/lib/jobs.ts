import { getRequestContext } from '@cloudflare/next-on-pages';


export type Job = {

    id: string;

    slug: string;

    title: string;

    company: string;

    location: string;

    jobType: string;

    category: string;

    description: string;

    applyUrl: string;

    salary: string;

    source: 'manual' | 'remotive';

    postedAt: string;

    remote: boolean;

};


function getDb(): any {

    try {

        const ctx = getRequestContext();

        if (ctx?.env?.DB) return ctx.env.DB;

    } catch (e) { }

    return (process.env as any).DB || null;

}


export function timeAgo(dateString?: string): string {

    if (!dateString) return 'Recently';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Recently';

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';

    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;

    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

    return `${Math.floor(seconds / 86400)}d ago`;

}


export function stripMarkdown(text: string): string {

    return (text || '')

        .replace(/<[^>]*>/g, ' ')

        .replace(/[#*_`>\[\]()!]/g, '')

        .replace(/\s+/g, ' ')

        .trim();

}


export function jobExcerpt(description: string, length: number = 200): string {

    const clean = stripMarkdown(description);

    if (clean.length <= length) return clean;

    return clean.slice(0, length).trim() + '...';

}


export async function getManualJobs(limit: number = 10, offset: number = 0, search: string = ''): Promise<Job[]> {

    try {

        const db = getDb();

        if (!db) return [];

        const safeLimit = Math.max(1, Math.min(50, Math.floor(limit) || 10));

        const safeOffset = Math.max(0, Math.floor(offset) || 0);

        let query = `SELECT * FROM jobs WHERE status = 'published'`;

        const params: any[] = [];

        if (search && search.trim() !== '') {

            const like = `%${search.trim()}%`;

            query += ` AND (LOWER(title) LIKE LOWER(?) OR LOWER(company) LIKE LOWER(?) OR LOWER(location) LIKE LOWER(?))`;

            params.push(like, like, like);

        }

        query += ` ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;

        const stmt = db.prepare(query);

        const { results } = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

        return (results || []).map((row: any) => ({

            id: row.id,

            slug: row.slug,

            title: row.title,

            company: row.company,

            location: row.location || 'Remote',

            jobType: row.job_type || 'full_time',

            category: row.category || '',

            description: row.description || '',

            applyUrl: row.apply_url || '',

            salary: row.salary || '',

            source: 'manual' as const,

            postedAt: row.posted_at || row.created_at,

            remote: (row.location || '').toLowerCase().includes('remote'),

        }));

    } catch (e) {

        console.error('Error fetching manual jobs from D1:', e);

        return [];

    }

}


export async function getManualJobBySlug(slug: string): Promise<Job | null> {

    try {

        const db = getDb();

        if (!db) return null;

        const job = await db.prepare(`

            SELECT * FROM jobs

            WHERE slug = ?

            AND status = 'published'

            LIMIT 1

        `).bind(slug).first();

        if (!job) return null;

        return {

            id: job.id,

            slug: job.slug,

            title: job.title,

            company: job.company,

            location: job.location || 'Remote',

            jobType: job.job_type || 'full_time',

            category: job.category || '',

            description: job.description || '',

            applyUrl: job.apply_url || '',

            salary: job.salary || '',

            source: 'manual' as const,

            postedAt: job.posted_at || job.created_at,

            remote: (job.location || '').toLowerCase().includes('remote'),

        };

    } catch (e) {

        console.error('Error fetching manual job from D1:', e);

        return null;

    }

}


const REMOTIVE_API = 'https://remotive.com/api/remote-jobs?limit=50';


export async function getApiJobs(): Promise<Job[]> {

    try {

        const res = await fetch(REMOTIVE_API, { next: { revalidate: 21600 } });

        if (!res.ok) return [];

        const data = await res.json();

        const list = data?.jobs || [];

        return list.map((item: any) => ({

            id: `remotive-${item.id}`,

            slug: `remotive-${item.id}`,

            title: item.title || 'Remote Job',

            company: item.company_name || 'Remote Company',

            location: item.candidate_required_location || 'Remote',

            jobType: item.job_type || 'full_time',

            category: item.category || '',

            description: item.description || '',

            applyUrl: item.url || 'https://remotive.com/',

            salary: item.salary || '',

            source: 'remotive' as const,

            postedAt: item.publication_date || new Date().toISOString(),

            remote: true,

        }));

    } catch (e) {

        console.error('Error fetching Remotive jobs:', e);

        return [];

    }

}
