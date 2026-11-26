export const runtime = 'edge';


import { Metadata } from 'next';

import Link from 'next/link';

import { notFound } from 'next/navigation';

import { siteConfig } from '@/lib/siteConfig';

import { getManualJobBySlug, jobExcerpt, stripMarkdown, timeAgo } from '@/lib/jobs';

import { Clock, MapPin, Briefcase, Building2, ArrowLeft, ExternalLink } from 'lucide-react';


interface JobPageProps {

    params: Promise<{

        slug: string;

    }>;

}


function employmentType(jobType: string): string {

    const map: Record<string, string> = {

        full_time: 'FULL_TIME',

        part_time: 'PART_TIME',

        contract: 'CONTRACTOR',

        internship: 'INTERN',

        freelance: 'OTHER',

    };

    return map[(jobType || '').toLowerCase()] || 'OTHER';

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


export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {

    const resolved = await params;

    const job = await getManualJobBySlug(resolved.slug);

    if (!job) {

        return {

            title: 'Job Not Found',

        };

    }

    return {

        title: `${job.title} at ${job.company}`,

        description: jobExcerpt(job.description, 160),

        alternates: {

            canonical: `${siteConfig.url}/jobs/${job.slug}`,

        },

        openGraph: {

            title: `${job.title} at ${job.company}`,

            description: jobExcerpt(job.description, 160),

            url: `${siteConfig.url}/jobs/${job.slug}`,

            type: 'website',

        },

    };

}


export default async function JobDetailPage({ params }: JobPageProps) {

    const resolved = await params;

    const job = await getManualJobBySlug(resolved.slug);

    if (!job) {

        notFound();

    }

    const postedDate = new Date(job.postedAt);

    const validThrough = new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const isRemote = job.location.toLowerCase().includes('remote');

    const jobPostingSchema = {

        '@context': 'https://schema.org',

        '@type': 'JobPosting',

        title: job.title,

        description: stripMarkdown(job.description),

        datePosted: postedDate.toISOString(),

        validThrough,

        employmentType: employmentType(job.jobType),

        hiringOrganization: {

            '@type': 'Organization',

            name: job.company,

        },

        jobLocation: isRemote

            ? {

                '@type': 'Place',

                address: {

                    '@type': 'PostalAddress',

                    addressCountry: 'US',

                },

            }

            : {

                '@type': 'Place',

                address: {

                    '@type': 'PostalAddress',

                    addressLocality: job.location,

                    addressCountry: 'US',

                },

            },

        jobLocationType: isRemote ? 'TELECOMMUTE' : undefined,

    };

    return (

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

            <script

                type="application/ld+json"

                dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}

            />

            <Link href="/jobs" prefetch={false} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#cc0000] hover:underline">

                <ArrowLeft size={15} /> Back to All Jobs

            </Link>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">

                <div className="flex items-start gap-4">

                    <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">

                        <Building2 size={26} className="text-[#cc0000]" />

                    </div>

                    <div className="min-w-0">

                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">

                            {job.title}

                        </h1>

                        <p className="text-base text-gray-700 font-bold mt-1">{job.company}</p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-gray-500 font-medium">

                            <span className="flex items-center gap-1">

                                <MapPin size={14} className="text-[#cc0000]" /> {job.location}

                            </span>

                            <span className="flex items-center gap-1">

                                <Briefcase size={14} className="text-[#cc0000]" /> {jobTypeLabel(job.jobType)}

                            </span>

                            {job.salary && (

                                <span className="font-bold text-gray-900">{job.salary}</span>

                            )}

                            <span className="flex items-center gap-1">

                                <Clock size={14} /> Posted {timeAgo(job.postedAt)}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="border-t border-gray-100 pt-6">

                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-wide mb-3">Job Description</h2>

                    <div className="text-gray-800 leading-relaxed text-base whitespace-pre-line">

                        {job.description}

                    </div>

                </div>

                <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center gap-3">

                    <a

                        href={job.applyUrl}

                        target="_blank"

                        rel="noopener"

                        className="w-full sm:w-auto bg-[#cc0000] text-white px-8 py-3 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-[#990000] transition shadow-sm text-center inline-flex items-center justify-center gap-2"

                    >

                        Apply Now <ExternalLink size={15} />

                    </a>

                    <p className="text-xs text-gray-400 font-medium text-center sm:text-left">

                        You will be redirected to the employer&apos;s website to apply.

                    </p>

                </div>

            </div>

            <div className="text-center">

                <Link href="/jobs" prefetch={false} className="text-sm font-bold text-[#cc0000] hover:underline">

                    Browse more jobs →

                </Link>

            </div>

        </main>

    );

}
