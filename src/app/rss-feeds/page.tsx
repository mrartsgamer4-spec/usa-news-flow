'use client';

import { useState } from "react";
import { Rss, Copy, Check, ExternalLink, Radio } from "lucide-react";

const RSS_FEEDS = [
    { name: "All Breaking News", slug: "all", desc: "Main feed including all latest published articles." },
    { name: "U.S. News", slug: "us-news", desc: "National stories, state updates, and breaking U.S. events." },
    { name: "Politics", slug: "politics", desc: "White House, Congress, and national election updates." },
    { name: "World News", slug: "world", desc: "International reports, global economy, and diplomacy." },
    { name: "Business", slug: "business", desc: "Financial news, stock market updates, and real estate." },
    { name: "Technology", slug: "tech", desc: "AI updates, cyber security, and tech industry news." },
    { name: "Health", slug: "health", desc: "Medical research, fitness tips, and healthcare policy." },
    { name: "Sports", slug: "sports", desc: "Cricket, football, tennis, and basketball highlights." },
];

export default function RssFeedsPage() {
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    const getFeedUrl = (slug: string) => {
        const origin = typeof window !== "undefined" ? window.location.origin : "https://usanewsflow.com";
        return `${origin}/api/rss/${slug}`;
    };

    const handleCopy = (slug: string) => {
        const url = getFeedUrl(slug);
        navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-3 border-t-4 border-t-news-red">
                    <div className="inline-flex items-center gap-2 text-news-red font-bold text-xs uppercase tracking-wider">
                        <Rss size={16} /> Content Syndication
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                        RSS Feeds
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Subscribe to USA News Flow RSS feeds to get instant headline updates directly in your favorite RSS reader, news aggregator, or personal site.
                    </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-xs text-blue-900">
                    <Radio size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                        <strong>How to use:</strong> Copy any feed URL below and paste it into your preferred RSS reader application (like Feedly, Inoreader, or Apple News) to receive automated content feeds.
                    </p>
                </div>

                {/* RSS Feeds List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {RSS_FEEDS.map((feed) => {
                        const feedUrl = getFeedUrl(feed.slug);
                        const isCopied = copiedSlug === feed.slug;

                        return (
                            <div
                                key={feed.slug}
                                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-news-red/50 transition space-y-3"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-serif font-bold text-gray-900 text-base">{feed.name}</h3>
                                        <span className="text-[10px] bg-red-50 text-news-red font-bold px-2 py-0.5 rounded">
                                            XML
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">{feed.desc}</p>
                                </div>

                                <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={feedUrl}
                                        className="w-full bg-gray-50 border text-[11px] px-2.5 py-1.5 rounded text-gray-600 outline-none select-all"
                                    />
                                    <button
                                        onClick={() => handleCopy(feed.slug)}
                                        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition ${isCopied
                                                ? "bg-green-600 text-white"
                                                : "bg-news-red hover:bg-red-700 text-white"
                                            }`}
                                    >
                                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                        {isCopied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}