'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'U.S. News',
        featured_image: '',
        status: 'published',
    });

    // 1. Fetch Articles on Load
    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/news');
            if (res.ok) {
                const data = await res.json();
                setArticles(data);
            }
        } catch (err) {
            console.error('Failed to fetch articles:', err);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Auto-generate Slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        setFormData((prev) => ({
            ...prev,
            title,
            slug: prev.slug && editingId ? prev.slug : slug,
        }));
    };

    // 2. Handle Publish / Update (POST / PUT)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = '/api/news';
            const method = editingId ? 'PUT' : 'POST';
            const bodyData = editingId ? { ...formData, id: editingId } : formData;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            if (res.ok) {
                alert(editingId ? 'Article updated successfully!' : 'Article published successfully!');
                setFormData({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    category: 'U.S. News',
                    featured_image: '',
                    status: 'published',
                });
                setEditingId(null);
                fetchArticles();
            } else {
                const errData = await res.json();
                alert(`Error: ${errData.error || 'Failed to save article'}`);
            }
        } catch (err) {
            alert('An error occurred while saving.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. Edit Selection
    const handleEdit = (article: Article) => {
        setEditingId(article.id);
        setFormData({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || '',
            content: article.content,
            category: article.category,
            featured_image: article.featured_image || '',
            status: article.status || 'published',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 4. Delete Article (DELETE API)
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Article deleted successfully!');
                fetchArticles();
            } else {
                alert('Failed to delete article.');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {editingId ? 'Edit Article' : 'Publish New Article'}
            </h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4 border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        className="w-full mt-1 p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            <option value="U.S. News">U.S. News</option>
                            <option value="Politics">Politics</option>
                            <option value="World">World</option>
                            <option value="Business">Business</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Sports">Sports</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                    <input
                        type="url"
                        value={formData.featured_image}
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                        rows={2}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (HTML or Text)</label>
                    <textarea
                        rows={6}
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full mt-1 p-2 border rounded-md font-mono text-sm"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Saving...' : editingId ? 'Update Article' : 'Publish News'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ title: '', slug: '', excerpt: '', content: '', category: 'U.S. News', featured_image: '', status: 'published' });
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Published List */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Published Articles List</h2>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                {articles.length === 0 ? (
                    <p className="p-4 text-gray-500">No articles found in D1 database.</p>
                ) : (
                    <div className="divide-y">
                        {articles.map((art) => (
                            <div key={art.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{art.title}</h3>
                                    <p className="text-xs text-gray-500">
                                        Category: <span className="font-bold">{art.category}</span> | Slug: {art.slug} | Status: {art.status || 'published'}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(art)} className="text-blue-600 font-medium hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(art.id)} className="text-red-600 font-medium hover:underline">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}