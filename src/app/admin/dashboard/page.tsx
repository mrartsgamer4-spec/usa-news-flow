'use client';

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PlusCircle, ExternalLink,
    RefreshCw, CheckCircle, AlertCircle, Eye,
    Edit, Trash2, XCircle
} from 'lucide-react';

export default function AdminDashboard() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // এডিট আইডি স্টেট
    const [editingId, setEditingId] = useState<string | null>(null);

    // ফর্ম স্টেট
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

    // টাইটেল লেখার সাথে সাথে অটো স্লাগ তৈরি
    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!editingId) {
            const autoSlug = val
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setSlug(autoSlug);
        }
    };

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

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setSlug('');
        setReporterName('');
        setFeaturedImage('');
        setImageAlt('');
        setExcerpt('');
        setContent('');
        setTags('');
        setSubCategory('');
        setCategory('U.S. News');
    };

    const handleEdit = (article: any) => {
        setEditingId(article.id);
        setTitle(article.title || '');
        setSlug(article.slug || '');
        setCategory(article.category || 'U.S. News');
        // সাব-ক্যাটাগরি রিস্টোর করা (উভয় ফিল্ড নেম সাপোর্ট করা হয়েছে)
        setSubCategory(article.sub_category || article.subcategory || '');
        setReporterName(article.author_name || article.reporter_name || '');
        setFeaturedImage(article.featured_image || '');
        setImageAlt(article.image_alt || '');
        setExcerpt(article.excerpt || '');
        setContent(article.content || '');
        setTags(article.tags || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this news article?')) return;

        try {
            const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Article deleted successfully!' });
                fetchArticles();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to delete.' });
            }
        } catch (e) {
            setMessage({ type: 'error', text: 'Server error while deleting.' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setMessage({ type: 'error', text: 'Title and content are required!' });
            return;
        }

        setSubmitting(true);
        setMessage(null);

        const payload = {
            id: editingId,
            title,
            slug,
            category,
            sub_category: subCategory,
            subcategory: subCategory, // উভয় ফরম্যাট যাতে ব্যাকএন্ড যেকোনো একটায় পেলে পায়
            reporter_name: reporterName,
            author_name: reporterName,
            featured_image: featuredImage,
            image_alt: imageAlt || title,
            excerpt,
            content,
            tags,
            status: 'published'
        };

        try {
            const res = await fetch('/api/news', {
                method: editingId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setMessage({
                    type: 'success',
                    text: editingId ? 'Article updated successfully!' : 'Article published successfully!'
                });
                resetForm();
                fetchArticles();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save article.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: 'Server error occurred.' });
        } finally {
            setSubmitting(false);
        }
    };

    const currentSubs = CATEGORY_LIST.find(c => c.name.toLowerCase() === category.toLowerCase())?.subs || [];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <span className="w-3 h-7 bg-[#cc0000] inline-block rounded-sm"></span>
                            USA News Flow Editorial Dashboard
                        </h1>
                        <p className="text-xs text-gray-500 font-semibold mt-1">Publish news, assign reporters, manage SEO and edit live articles.</p>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition"
                    >
                        View Live Site <ExternalLink size={14} />
                    </Link>
                </div>

                {/* Publish & Edit News Form */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6 border-b pb-3">
                        <h2 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                            {editingId ? <Edit size={20} className="text-[#cc0000]" /> : <PlusCircle size={20} className="text-[#cc0000]" />}
                            {editingId ? 'Edit Article' : 'Publish New Article'}
                        </h2>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <XCircle size={15} /> Cancel Edit
                            </button>
                        )}
                    </div>

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
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Enter headline..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">URL Slug (Auto Generated)</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="auto-generated-slug"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none font-mono text-gray-600"
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

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={featuredImage}
                                    onChange={(e) => setFeaturedImage(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Image Caption / Source (SEO Alt)</label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    placeholder="e.g. Photo: Reuters / John Smith"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Short Excerpt (SEO Meta Description)</label>
                                <textarea
                                    rows={2}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Brief 1-2 sentence synopsis for SEO..."
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
                                    placeholder="Write or paste full article body here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Tags (Comma-separated for SEO)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g. trump, whitehouse, economy, breaking"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#cc0000] outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 bg-[#cc0000] text-white font-extrabold uppercase rounded-xl hover:bg-[#b30000] transition shadow-md disabled:bg-gray-400"
                        >
                            {submitting ? 'Processing...' : (editingId ? 'Update Article' : 'Publish News')}
                        </button>
                    </form>
                </div>

                {/* Published Articles List with Edit and Delete Buttons */}
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
                                <div key={item.id} className="py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50 px-3 rounded-xl transition">
                                    <div className="flex-1 min-w-[280px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-[#cc0000] uppercase bg-red-50 px-2 py-0.5 rounded">
                                                {item.category}
                                            </span>
                                            {(item.sub_category || item.subcategory) && (
                                                <span className="text-[10px] font-black text-gray-600 uppercase bg-gray-100 px-2 py-0.5 rounded">
                                                    {item.sub_category || item.subcategory}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-4">
                                            <span>Author: <strong className="text-gray-700">{item.author_name || item.reporter_name || 'N/A'}</strong></span>
                                            <span>Date: {new Date(item.created_at || Date.now()).toLocaleDateString()}</span>
                                            {item.tags && <span>Tags: <em>{item.tags}</em></span>}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/news/article/${item.slug}`}
                                            target="_blank"
                                            className="p-2 text-blue-600 hover:text-blue-800 border border-blue-100 rounded-lg hover:bg-blue-50 transition"
                                            title="View Post"
                                        >
                                            <Eye size={16} />
                                        </Link>

                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 text-emerald-600 hover:text-emerald-800 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition"
                                            title="Edit News"
                                        >
                                            <Edit size={16} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-red-600 hover:text-red-800 border border-red-100 rounded-lg hover:bg-red-50 transition"
                                            title="Delete News"
                                        >
                                            <Trash2 size={16} />
                                        </button>
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