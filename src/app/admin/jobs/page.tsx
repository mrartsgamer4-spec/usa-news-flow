'use client';


import React, { useState, useEffect } from 'react';

import Link from 'next/link';


type AdminJob = {

    id: string;

    slug: string;

    title: string;

    company: string;

    location: string;

    job_type: string;

    salary: string;

    created_at: string;

};


const EMPTY_FORM = {

    title: '',

    company: '',

    location: 'Remote',

    job_type: 'full_time',

    category: '',

    salary: '',

    apply_url: '',

    description: '',

};


export default function AdminJobsPage() {

    const [authed, setAuthed] = useState<boolean | null>(null);

    const [jobs, setJobs] = useState<AdminJob[]>([]);

    const [form, setForm] = useState(EMPTY_FORM);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState('');

    const [newJob, setNewJob] = useState<{ slug: string; title: string; company: string; location: string; salary: string } | null>(null);

    const [copied, setCopied] = useState(false);

    const loadJobs = async () => {

        const res = await fetch('/api/admin/jobs');

        if (res.status === 401) {

            setAuthed(false);

            return;

        }

        const data = await res.json();

        if (data.success) {

            setAuthed(true);

            setJobs(data.jobs || []);

        }

    };

    useEffect(() => {

        loadJobs();

    }, []);

    const setField = (key: keyof typeof EMPTY_FORM, value: string) => {

        setForm((prev) => ({ ...prev, [key]: value }));

    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setSaving(true);

        setMessage('');

        setNewJob(null);

        const res = await fetch('/api/admin/jobs', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(form),

        });

        const data = await res.json();

        setSaving(false);

        if (!res.ok || !data.success) {

            setMessage(data.message || data.error || 'Failed to add job');

            return;

        }

        setMessage('Job added successfully!');

        setNewJob({ slug: data.slug, title: form.title, company: form.company, location: form.location, salary: form.salary });

        setForm(EMPTY_FORM);

        loadJobs();

    };

    const handleDelete = async (id: string, title: string) => {

        if (!confirm(`Delete "${title}"?`)) return;

        const res = await fetch('/api/admin/jobs', {

            method: 'DELETE',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ id }),

        });

        const data = await res.json();

        if (data.success) {

            loadJobs();

        } else {

            alert(data.message || data.error || 'Failed to delete job');

        }

    };

    const linkedInText = newJob

        ? `Hiring: ${newJob.title} at ${newJob.company}\nLocation: ${newJob.location}${newJob.salary ? `\nSalary: ${newJob.salary}` : ''}\n\nApply here: https://usanewsflow.com/jobs/${newJob.slug}\n\n#jobs #hiring #remotejobs #USJobs`

        : '';

    const copyLinkedIn = async () => {

        try {

            await navigator.clipboard.writeText(linkedInText);

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);

        } catch (e) { }

    };

    if (authed === null) {

        return (

            <main className="max-w-4xl mx-auto px-4 py-10">

                <p className="text-gray-500 font-medium">Loading...</p>

            </main>

        );

    }

    if (authed === false) {

        return (

            <main className="max-w-4xl mx-auto px-4 py-10 space-y-4">

                <h1 className="text-2xl font-black text-gray-900">Manage Jobs</h1>

                <p className="text-gray-600 font-medium">Please login as admin first, then come back here.</p>

                <Link href="/admin/login" className="inline-block bg-[#cc0000] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#990000] transition">

                    Go to Admin Login

                </Link>

            </main>

        );

    }

    return (

        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-black text-gray-900">Manage Jobs</h1>

                <Link href="/admin/dashboard" className="text-sm font-bold text-[#cc0000] hover:underline">

                    ← Back to Dashboard

                </Link>

            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">

                <h2 className="text-lg font-black text-gray-900">Add a New Job</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Job Title *</label>

                        <input required value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="e.g. Frontend Developer" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                    </div>

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Company *</label>

                        <input required value={form.company} onChange={(e) => setField('company', e.target.value)} placeholder="e.g. Acme Inc" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                    </div>

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>

                        <input value={form.location} onChange={(e) => setField('location', e.target.value)} placeholder="Remote / New York, USA" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                    </div>

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Job Type</label>

                        <select value={form.job_type} onChange={(e) => setField('job_type', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]">

                            <option value="full_time">Full-time</option>

                            <option value="part_time">Part-time</option>

                            <option value="contract">Contract</option>

                            <option value="internship">Internship</option>

                            <option value="freelance">Freelance</option>

                        </select>

                    </div>

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>

                        <input value={form.category} onChange={(e) => setField('category', e.target.value)} placeholder="e.g. Software Development" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                    </div>

                    <div>

                        <label className="block text-xs font-bold text-gray-700 mb-1">Salary (optional)</label>

                        <input value={form.salary} onChange={(e) => setField('salary', e.target.value)} placeholder="e.g. $80k - $100k" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                    </div>

                </div>

                <div>

                    <label className="block text-xs font-bold text-gray-700 mb-1">Apply URL *</label>

                    <input required type="url" value={form.apply_url} onChange={(e) => setField('apply_url', e.target.value)} placeholder="https://company.com/careers/job" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                </div>

                <div>

                    <label className="block text-xs font-bold text-gray-700 mb-1">Job Description *</label>

                    <textarea required rows={6} value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="About the role, responsibilities, requirements..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000]" />

                </div>

                <button type="submit" disabled={saving} className="bg-[#cc0000] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#990000] transition disabled:opacity-50">

                    {saving ? 'Adding...' : 'Add Job'}

                </button>

                {message && (

                    <p className="text-sm font-bold text-gray-700">{message}</p>

                )}

            </form>

            {newJob && (

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-3">

                    <h2 className="text-lg font-black text-gray-900">Job is live!</h2>

                    <p className="text-sm font-medium text-gray-700">

                        Link: <a href={`/jobs/${newJob.slug}`} target="_blank" rel="noopener" className="text-[#cc0000] font-bold hover:underline">usanewsflow.com/jobs/{newJob.slug}</a>

                    </p>

                    <label className="block text-xs font-bold text-gray-700">LinkedIn post — copy and paste it:</label>

                    <textarea readOnly rows={7} value={linkedInText} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white" />

                    <button onClick={copyLinkedIn} className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-black transition">

                        {copied ? 'Copied!' : 'Copy LinkedIn Post'}

                    </button>

                </div>

            )}

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">

                <h2 className="text-lg font-black text-gray-900">Your Jobs ({jobs.length})</h2>

                {jobs.length === 0 ? (

                    <p className="text-sm text-gray-500 font-medium">No manual jobs yet. Add your first job above.</p>

                ) : (

                    <div className="divide-y divide-gray-100">

                        {jobs.map((job) => (

                            <div key={job.id} className="py-3 flex items-center justify-between gap-3">

                                <div className="min-w-0">

                                    <p className="text-sm font-bold text-gray-900 truncate">{job.title}</p>

                                    <p className="text-xs text-gray-500 font-medium">{job.company} • {job.location} • {new Date(job.created_at).toLocaleDateString('en-US')}</p>

                                </div>

                                <div className="flex items-center gap-3 shrink-0">

                                    <a href={`/jobs/${job.slug}`} target="_blank" rel="noopener" className="text-xs font-bold text-[#cc0000] hover:underline">View</a>

                                    <button onClick={() => handleDelete(job.id, job.title)} className="text-xs font-bold text-gray-500 hover:text-red-600">Delete</button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>

    );

}
