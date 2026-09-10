'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Category -> Subcategory Mapping Data
const CATEGORY_MAP: Record<string, string[]> = {
    'U.S. News': ['Donald Trump', 'White House News', 'Breaking News'],
    'Politics': ['Congress', 'Elections', 'Policy & Law'],
    'World': ['Global Affairs', 'Europe', 'Asia-Pacific', 'Middle East'],
    'Business': ['Economy', 'Markets', 'Finance', 'Real Estate'],
    'Technology': ['AI News', 'Latest AI News', 'AI Technology'],
    'Health': ['Medicine', 'Wellness', 'Research'],
    'Sports': ['NFL & Football', 'NBA & Basketball', 'Cricket'],
};

export default function AdminDashboard() {
    const [articles, setArticles] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        featured_image: '',
        image_caption: '',
        writer_name: '',
        category: 'U.S. News',
        sub_category: 'Donald Trump',
        content: '',
    });

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

    // Handle Title and Slug Generation
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

    // Category change handler to reset sub-category automatically
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        const availableSubCategories = CATEGORY_MAP[selectedCategory] || [];

        setFormData((prev) => ({
            ...prev,
            category: selectedCategory,
            sub_category: availableSubCategories[0] || '',
        }));
    };

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
                    featured_image: '',
                    image_caption: '',
                    writer_name: '',
                    category: 'U.S. News',
                    sub_category: 'Donald Trump',
                    content: '',
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

    const handleEdit = (article: any) => {
        setEditingId(article.id);
        setFormData({
            title: article.title || '',
            slug: article.slug || '',
            featured_image: article.featured_image || '',
            image_caption: article.image_caption || '',
            writer_name: article.writer_name || '',
            category: article.category || 'U.S. News',
            sub_category: article.sub_category || 'Donald Trump',
            content: article.content || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                {editingId ? 'Edit News Article' : 'Publish New Article'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow border border-gray-200 mb-10 space-y-4">
                {/* 1. Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700">1. Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        className="w-full mt-1 p-2 border rounded focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                </div>

                {/* 2. Slug */}
                <div>
                    <label className="block text-sm font-bold text-gray-700">2. Slug</label>
                    <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                    />
                </div>

                {/* 3. Image URL & 4. Image Caption */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">3. Image URL</label>
                        <input
                            type="url"
                            value={formData.featured_image}
                            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full mt-1 p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">4. Image Caption</label>
                        <input
                            type="text"
                            value={formData.image_caption}
                            onChange={(e) => setFormData({ ...formData, image_caption: e.target.value })}
                            placeholder="Enter image caption/credit"
                            className="w-full mt-1 p-2 border rounded text-sm"
                        />
                    </div>
                </div>

                {/* 5. Writer Name, 6. Main Category & Sub Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">5. Writer Name</label>
                        <input
                            type="text"
                            value={formData.writer_name}
                            onChange={(e) => setFormData({ ...formData, writer_name: e.target.value })}
                            placeholder="Author Name"
                            className="w-full mt-1 p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">6. Category (Main Menu)</label>
                        <select
                            value={formData.category}
                            onChange={handleCategoryChange}
                            className="w-full mt-1 p-2 border rounded text-sm font-medium"
                        >
                            {Object.keys(CATEGORY_MAP).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Sub Category (Sub Menu)</label>
                        <select
                            value={formData.sub_category}
                            onChange={(e) => setFormData({ ...formData, sub_category: e.target.value })}
                            className="w-full mt-1 p-2 border rounded text-sm font-medium"
                        >
                            {(CATEGORY_MAP[formData.category] || []).map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 7. Main Text / HTML */}
                <div>
                    <label className="block text-sm font-bold text-gray-700">7. Main Text / HTML</label>
                    <textarea
                        rows={8}
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full mt-1 p-2 border rounded font-mono text-sm"
                    />
                </div>

                {/* 8. Publish Button */}
                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-600 text-white px-8 py-2.5 rounded font-bold hover:bg-red-700 disabled:bg-gray-400 text-sm"
                    >
                        {isSubmitting ? 'Publishing...' : editingId ? 'Update Article' : 'Publish News'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({
                                    title: '', slug: '', featured_image: '', image_caption: '', writer_name: '', category: 'U.S. News', sub_category: 'Donald Trump', content: ''
                                });
                            }}
                            className="bg-gray-500 text-white px-5 py-2.5 rounded text-sm hover:bg-gray-600"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Published Articles List */}
            <h2 className="text-xl font-bold mb-4 text-gray-800">Published News Articles List</h2>
            <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                {articles.length === 0 ? (
                    <p className="p-4 text-gray-500 text-sm">No news articles found in D1 database.</p>
                ) : (
                    <div className="divide-y">
                        {articles.map((art: any) => (
                            <div key={art.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                <div>
                                    <Link
                                        href={`/news/${art.slug}`}
                                        target="_blank"
                                        className="font-bold text-blue-700 hover:underline text-base"
                                    >
                                        {art.title} ↗
                                    </Link>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Category: <span className="font-bold text-gray-700">{art.category}</span> | Sub Category: <span className="font-bold text-gray-700">{art.sub_category || 'N/A'}</span> | Writer: {art.writer_name || 'N/A'}
                                    </p>
                                </div>
                                <div className="flex gap-4 text-xs font-bold">
                                    <button onClick={() => handleEdit(art)} className="text-blue-600 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(art.id)} className="text-red-600 hover:underline">
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