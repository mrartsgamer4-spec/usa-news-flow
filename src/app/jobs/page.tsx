export const runtime = 'edge';


import { Metadata } from 'next';

import Link from 'next/link';

import { siteConfig } from '@/lib/siteConfig';

import { getManualJobs, getApiJobs, jobExcerpt, timeAgo, Job } from '@/lib/jobs';

import { Clock, MapPin, Briefcase, Building2, Search, Star } from 'lucide-react';


export async function generateMetadata(): Promise<Metadata> {

    return {

        title: 'Remote Jobs in USA',

        description: 'Find the latest remote jobs in the USA — hand-picked listings plus fresh remote jobs updated daily.',

        alternates: {

            canonical: `${siteConfig.url}/jobs`,

        },

    };

}


function jobTypeLabel(jobType: string): string {

    const map: Record<string, string> = {

        full_time: 'Full-time',

        part_time: 'Part-time',

        contract: 'Contract',

        internship: 'Internship',

        freelance: 'Freelance',

    };

    return map[(jobType || '').toLowerCase()] || jobType || 'Full-time';

}


function JobCard({ job, featured }: { job: Job; featured?: boolean }) {

    const isManual = job.source === 'manual';

    const href = isManual ? `/jobs/${job.slug}` : job.applyUrl;

    return (

        <Link

            href={href}

            prefetch={false}

            {...(!isManual ? { target: '_blank', rel: 'noopener' } : {})}

            className="group block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"

        >

            <div className="flex items-start justify-between gap-3">

                <div className="flex items-start gap-3 min-w-0">

                    <div className="w-11 h-11 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">

                        <Building2 size={20} className="text-[#cc0000]" />

                    </div>

                    <div className="min-w-0">

                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#cc0000] leading-snug">

                            {job.title}

                        </h3>

                        <p className="text-sm text-gray-600 font-semibold mt-0.5">{job.company}</p>

                    </div>

                </div>

                {featured && (

                    <span className="shrink-0 inline-flex items-center gap-1 bg-[#cc0000] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded">

                        <Star size={11} /> Featured

                    </span>

                )}

            </div>

            <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">

                {jobExcerpt(job.description, 180)}

            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium">

                <span className="flex items-center gap-1">

                    <MapPin size={12} className="text-[#cc0000]" /> {job.location}

                </span>

                <span className="flex items-center gap-1">

                    <Briefcase size={12} className="text-[#cc0000]" /> {jobTypeLabel(job.jobType)}

                </span>

                {job.salary && (

                    <span className="font-bold text-gray-800">{job.salary}</span>

                )}

                <span className="flex items-center gap-1 ml-auto">

                    <Clock size={12} /> {timeAgo(job.postedAt)}

                </span>

            </div>

            <div className="mt-3">

                <span className="text-xs font-black text-[#cc0000] uppercase tracking-wide group-hover:underline">

                    {isManual ? 'View Job & Apply →' : 'Apply on Remotive →'}

                </span>

            </div>

        </Link>

    );

}


interface JobsPageProps {

    searchParams?: Promise<{

        q?: string;

        page?: string;

    }>;

}


export default async function JobsPage({ searchParams }: JobsPageProps) {

    const resolved = searchParams ? await searchParams : undefined;

    const q = (resolved?.q || '').trim();

    const page = Math.max(1, parseInt(resolved?.page || '1', 10) || 1);

    const perPage = 10;

    const offset = (page - 1) * perPage;

    const [manualJobs, apiJobs] = await Promise.all([

        getManualJobs(perPage, offset, q),

        getApiJobs(),

    ]);

    const qLower = q.toLowerCase();

    const filteredApi = q

        ? apiJobs.filter((job) =>

            job.title.toLowerCase().includes(qLower) ||

            job.company.toLowerCase().includes(qLower) ||

            job.location.toLowerCase().includes(qLower) ||

            (job.category || '').toLowerCase().includes(qLower)

        )

        : apiJobs;

    const apiPage = filteredApi.slice(offset, offset + perPage);

    const hasMore = manualJobs.length === perPage || apiPage.length === perPage;

    const loadMoreHref = `/jobs?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ''}`;

    return (

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            <div className="border-b-2 border-gray-900 pb-4">

                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">

                    <span className="w-2.5 h-7 bg-[#cc0000] inline-block rounded-sm"></span>

                    Remote Jobs in USA

                </h1>

                <p className="text-sm text-gray-600 mt-2 font-medium">

                    Hand-picked US jobs plus fresh remote listings updated daily. Click a job to see details and apply.

                </p>

                <form method="get" action="/jobs" className="flex gap-2 mt-4 max-w-xl">

                    <div className="relative flex-1">

                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input

                            type="text"

                            name="q"

                            defaultValue={q}

                            placeholder="Search by title, company or location..."

                            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]"

                        />

                    </div>

                    <button type="submit" className="bg-[#cc0000] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#990000] transition">

                        Search

                    </button>

                </form>

            </div>

            {manualJobs.length > 0 && (

                <section className="space-y-4">

                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">

                        <span className="w-2.5 h-6 bg-[#cc0000] inline-block rounded-sm"></span>

                        Featured Jobs

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {manualJobs.map((job) => (

                            <JobCard key={job.id} job={job} featured />

                        ))}

                    </div>

                </section>

            )}

            <section className="space-y-4">

                <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">

                    <span className="w-2.5 h-6 bg-[#cc0000] inline-block rounded-sm"></span>

                    Latest Remote Jobs

                </h2>

                {apiPage.length === 0 && manualJobs.length === 0 ? (

                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

                        <p className="text-gray-500 font-medium">No jobs found{q ? ` for "${q}"` : ''} yet. Try another search.</p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {apiPage.map((job) => (

                            <JobCard key={job.id} job={job} />

                        ))}

                    </div>

                )}

                <p className="text-xs text-gray-400 font-medium text-center pt-1">

                    Remote listings via Remotive — click a job to apply on Remotive.

                </p>

            </section>

            {hasMore && (

                <div className="flex justify-center pt-2">

                    <Link

                        href={loadMoreHref}

                        prefetch={false}

                        className="bg-[#cc0000] text-white px-8 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-[#990000] transition shadow-sm"

                    >

                        Load More Jobs

                    </Link>

                </div>

            )}

        </main>

    );

}
