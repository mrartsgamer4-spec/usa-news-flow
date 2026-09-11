'use client';

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PlusCircle, ExternalLink,
    RefreshCw, CheckCircle, AlertCircle, Eye
} from 'lucide-react';

export default function AdminDashboard() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('U.S. News');
    const [subCategory, setSubCategory] = useState('');
    const [reporterName, setReporterName] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const CATEGORY_LIST = [
        { name: 'Politics', subs: ['Congress', 'Elections', 'Policy & Law'] },
        { name: 'U.S. News', subs: ['Donald Trump', 'White House News', 'Breaking News'] },
        { name: 'World', subs: ['Global Affairs', 'Europe', 'Asia-Pacific', 'Middle East'] },
        { name: 'Business', subs: ['Economy', 'Markets', 'Finance', 'Real Estate'] },
        { name: 'Tech', subs: ['AI News', 'Latest AI News', 'AI Technology'] },
        { name: 'Health', subs: ['Medicine', 'Wellness', 'Research'] },
        { name: 'Sports', subs: ['NFL & Football', 'NBA & Basketball', 'Cricket'] },
        { name: 'Entertainment', subs: [] },
        { name: 'Opinion', subs: [] }
    ];

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            if (data.success) {
                setArticles(data.articles || []);
            }
        } catch (e) {
            console.error('Failed to load articles', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setMessage({ type: 'error', text: 'Title and content are required!' });
            return;
        }

        setSubmitting(true);
        setMessage(null);

        try {
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    category,
                    sub_category: subCategory,
                    reporter_name: reporterName,
                    featured_image: featuredImage,
                    image_alt: imageAlt || title,
                    excerpt,
                    content,
                    tags,
                    status: 'published'
                })
            });

            const data = await res.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Article published successfully!' });
                setTitle('');
                setSlug('');
                setReporterName('');
                setFeaturedImage('');
                setImageAlt('');
                setExcerpt('');
                setContent('');
                setTags('');
                fetchArticles();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to publish article.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: 'Server error occurred.' });
        } finally {
            setSubmitting(false);
        }
    };

    const currentSubs = CATEGORY_LIST.find(c => c.name === category)?.subs || [];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <span className="w-3 h-7 bg-[#cc0000] inline-block rounded-sm"></span>
                            USA News Flow Editorial Dashboard
                        </h1>
                        <p className="text-xs text-gray-500 font-semibold mt-1">Publish news, assign reporters, and manage article categories.</p>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition"
                    >
                        View Live Site <ExternalLink size={14} />
                    </Link>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-black text-gray-900 mb-6 uppercase flex items-center gap-2 border-b pb-3">
                        <PlusCircle size={20} className="text-[#cc0000]" /> Publish New Article
                    </h2>

                    {message && (
                        <div className={`p-4 mb-6 rounded-xl flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Article Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter news title..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Custom Slug (Optional)</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="e.g. us-house-passes-bill"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Reporter / Author Name</label>
                                <input
                                    type="text"
                                    value={reporterName}
                                    onChange={(e) => setReporterName(e.target.value)}
                                    placeholder="e.g. John Doe, Staff Reporter"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Main Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSubCategory('');
                                    }}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-[#cc0000] outline-none"
                                >
                                    {CATEGORY_LIST.map((c) => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Sub Category</label>
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    disabled={currentSubs.length === 0}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold bg-white focus:ring-2 focus:ring-[#cc0000] outline-none disabled:bg-gray-100"
                                >
                                    <option value="">None / Main Only</option>
                                    {currentSubs.map((sub) => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={featuredImage}
                                    onChange={(e) => setFeaturedImage(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Short Excerpt</label>
                                <textarea
                                    rows={2}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Brief 1-2 sentence overview..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Article Content (HTML / Text) *</label>
                                <textarea
                                    rows={8}
                                    required
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Type or paste the full news article here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Tags (Comma-separated)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g. trump, whitehouse, breaking"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 bg-[#cc0000] text-white font-extrabold uppercase rounded-xl hover:bg-[#b30000] transition shadow-md disabled:bg-gray-400"
                        >
                            {submitting ? 'Publishing News...' : 'Publish News'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6 border-b pb-3">
                        <h2 className="text-lg font-black text-gray-900 uppercase">
                            Published Articles ({articles.length})
                        </h2>
                        <button
                            onClick={fetchArticles}
                            className="p-2 text-gray-500 hover:text-gray-900 transition"
                            title="Refresh List"
                        >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-400 font-semibold text-sm">Loading articles...</div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 font-semibold text-sm">No articles published yet.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {articles.map((item) => (
                                <div key={item.id} className="py-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex-1 min-w-[280px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-[#cc0000] uppercase bg-red-50 px-2 py-0.5 rounded">
                                                {item.category}
                                            </span>
                                            {item.sub_category && (
                                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    {item.sub_category}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs text-gray-400 mt-1 flex gap-4">
                                            <span>Author: <strong className="text-gray-700">{item.author_name || item.reporter_name || 'N/A'}</strong></span>
                                            <span>Date: {new Date(item.created_at || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/news/article/${item.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-600 hover:text-[#cc0000] border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                            title="View Post"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}