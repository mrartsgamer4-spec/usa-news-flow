'use client';

import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { MockNewsData } from "@/lib/mockData";

export interface ArticleForm {
    id: string;
    title: string;
    slug: string;
    reporterName: string;
    featuredImage: string;
    imageCaption: string;
    category: string;
    subCategory: string;
    content: string;
    publishedAt?: string;
}

const CATEGORY_MAP: Record<string, { name: string; subs: { value: string; label: string }[] }> = {
    "us-news": {
        name: "U.S. News",
        subs: [
            { value: "breaking-news", label: "Breaking News" },
            { value: "california", label: "California" },
            { value: "new-york", label: "New York" },
            { value: "texas", label: "Texas" },
            { value: "florida", label: "Florida" },
        ]
    },
    "politics": {
        name: "Politics",
        subs: [
            { value: "white-house", label: "White House" },
            { value: "congress", label: "Congress" },
            { value: "elections", label: "Elections" },
        ]
    },
    "world": {
        name: "World",
        subs: [
            { value: "asia", label: "Asia" },
            { value: "europe", label: "Europe" },
            { value: "middle-east", label: "Middle East" },
        ]
    },
    "business": {
        name: "Business",
        subs: [
            { value: "economy", label: "Economy" },
            { value: "markets", label: "Markets" },
            { value: "real-estate", label: "Real Estate" },
        ]
    },
    "tech": {
        name: "Technology",
        subs: [
            { value: "ai-news", label: "AI News" },
            { value: "ai-tools", label: "AI Tools & Tech" },
            { value: "cyber-security", label: "Cyber Security" },
        ]
    },
    "health": {
        name: "Health",
        subs: [
            { value: "medicine", label: "Medicine" },
            { value: "fitness", label: "Fitness" },
        ]
    },
    "sports": {
        name: "Sports",
        subs: [
            { value: "cricket", label: "Cricket" },
            { value: "football", label: "Football" },
            { value: "tennis", label: "Tennis" },
            { value: "basketball", label: "Basketball" },
        ]
    }
};

export default function AdminDashboard() {
    const [articles, setArticles] = useState<ArticleForm[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<ArticleForm, "id" | "slug">>({
        title: "",
        reporterName: "",
        featuredImage: "",
        imageCaption: "",
        category: "us-news",
        subCategory: "",
        content: "",
    });

    const getFormattedTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: "America/New_York",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };
        return `${new Intl.DateTimeFormat("en-US", options).format(new Date())} EDT`;
    };

    useEffect(() => {
        const savedArticles = localStorage.getItem("news_articles");
        if (savedArticles) {
            try {
                setArticles(JSON.parse(savedArticles));
            } catch (e) {
                console.error("Error parsing saved articles", e);
            }
        } else {
            const hero = MockNewsData?.heroArticle as any;
            const initial: ArticleForm[] = [
                {
                    id: "1",
                    title: hero?.title || "Default News Title",
                    slug: hero?.slug || "default-news-title",
                    reporterName: "John Doe",
                    featuredImage: hero?.featuredImage || hero?.image || "",
                    imageCaption: "US Infrastructure Investment Plan",
                    category: hero?.category || "us-news",
                    subCategory: "",
                    content: hero?.excerpt || hero?.description || hero?.content || "",
                    publishedAt: getFormattedTime(),
                },
            ];
            setArticles(initial);
            localStorage.setItem("news_articles", JSON.stringify(initial));
        }
    }, []);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const slug = generateSlug(formData.title);
        let updatedArticles: ArticleForm[];

        if (editingId) {
            updatedArticles = articles.map((art) =>
                art.id === editingId
                    ? { ...formData, id: editingId, slug, publishedAt: art.publishedAt || getFormattedTime() }
                    : art
            );
            setEditingId(null);
        } else {
            const newArticle: ArticleForm = {
                ...formData,
                id: Date.now().toString(),
                slug,
                publishedAt: getFormattedTime(),
            };
            updatedArticles = [newArticle, ...articles];
        }

        setArticles(updatedArticles);
        localStorage.setItem("news_articles", JSON.stringify(updatedArticles));

        setFormData({
            title: "",
            reporterName: "",
            featuredImage: "",
            imageCaption: "",
            category: "us-news",
            subCategory: "",
            content: "",
        });
    };

    const handleEdit = (article: ArticleForm) => {
        setEditingId(article.id);
        setFormData({
            title: article.title,
            reporterName: article.reporterName,
            featuredImage: article.featuredImage,
            imageCaption: article.imageCaption,
            category: article.category,
            subCategory: article.subCategory || "",
            content: article.content,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this article?")) {
            const filtered = articles.filter((a) => a.id !== id);
            setArticles(filtered);
            localStorage.setItem("news_articles", JSON.stringify(filtered));
        }
    };

    const handleCategoryChange = (catKey: string) => {
        setFormData({
            ...formData,
            category: catKey,
            subCategory: ""
        });
    };

    return (
        <div className="py-8 space-y-8 max-w-5xl mx-auto px-4 font-sans">
            <div className="border-b pb-4 flex justify-between items-center">
                <h1 className="text-2xl font-serif font-bold">News Admin Dashboard</h1>
                <span className="text-xs bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full">
                    Total Articles: {articles.length}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="font-bold text-lg flex items-center gap-2 border-b pb-2 text-gray-800">
                    <PlusCircle size={18} className="text-news-red" />
                    {editingId ? "Edit News Article" : "Create New Article"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-1">Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-news-red outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1">Reporter Name *</label>
                        <input
                            type="text"
                            value={formData.reporterName}
                            onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-news-red outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1">Main Category *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full border p-2 rounded text-sm bg-white focus:ring-1 focus:ring-news-red outline-none"
                        >
                            {Object.entries(CATEGORY_MAP).map(([key, item]) => (
                                <option key={key} value={key}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1">Sub-Category (Optional)</label>
                        <select
                            value={formData.subCategory}
                            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                            className="w-full border p-2 rounded text-sm bg-white focus:ring-1 focus:ring-news-red outline-none"
                        >
                            <option value="">None (Main Category Only)</option>
                            {CATEGORY_MAP[formData.category]?.subs.map((sub) => (
                                <option key={sub.value} value={sub.value}>
                                    {sub.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1">Featured Image URL *</label>
                        <input
                            type="url"
                            value={formData.featuredImage}
                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                            className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-news-red outline-none"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-1">Image Caption *</label>
                        <input
                            type="text"
                            value={formData.imageCaption}
                            onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                            className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-news-red outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold mb-1">Description / Main Story *</label>
                    <textarea
                        rows={5}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-news-red outline-none"
                        required
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button type="submit" className="bg-news-red text-white px-6 py-2 rounded text-sm font-bold hover:bg-red-700 transition">
                        {editingId ? "Update News" : "Publish News"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ title: "", reporterName: "", featuredImage: "", imageCaption: "", category: "us-news", subCategory: "", content: "" });
                            }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="bg-white border p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="font-bold text-lg border-b pb-2 text-gray-800">Published Articles List</h2>
                <div className="divide-y">
                    {articles.map((item) => (
                        <div key={item.id} className="py-3 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    By {item.reporterName} | <span className="uppercase text-news-red font-bold">{item.category}</span>
                                    {item.subCategory && <span className="text-gray-400"> &gt; {item.subCategory}</span>}
                                    <span className="ml-2 text-gray-400">• {item.publishedAt}</span>
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
                                    <Edit size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 font-bold text-xs flex items-center gap-1 hover:underline">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}