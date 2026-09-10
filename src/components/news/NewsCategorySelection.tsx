'use client';

import React from 'react';
import Link from 'next/link';

interface NewsItem {
    id?: string | number;
    title: string;
    publishedAt?: string;
    category?: string;
    slug?: string;
    featuredImage?: string;
}

interface NewsCategorySelectionProps {
    articles?: NewsItem[];
    getArticleUrl?: (item: NewsItem) => string;
}

const DEFAULT_CATEGORIES = [
    {
        name: 'POLITICS',
        slug: 'politics',
        items: [
            { title: "Senate Advances New Spending Bill After Marathon Vote", image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&q=80", time: "1 hour ago", slug: "senate-advances-new-spending-bill" },
            { title: "Bipartisan Group Introduces Border Security Reform", image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=300&q=80", time: "2 hours ago", slug: "bipartisan-group-border-security" },
            { title: "2025 Election Polls Show Tight Race Nationwide", image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=300&q=80", time: "3 hours ago", slug: "2025-election-polls-tight-race" }
        ]
    },
    {
        name: 'U.S. NEWS',
        slug: 'us-news',
        items: [
            { title: "New York City Invests $150M in Affordable Housing", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80", time: "1 hour ago", slug: "nyc-invests-150m-affordable-housing" },
            { title: "California Expands Clean Energy Initiative", image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=300&q=80", time: "2 hours ago", slug: "california-expands-clean-energy" },
            { title: "Texas Schools Implement New Safety Measures", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&q=80", time: "3 hours ago", slug: "texas-schools-safety-measures" }
        ]
    },
    {
        name: 'BUSINESS',
        slug: 'business',
        items: [
            { title: "Wall Street Rallies as Inflation Cools More Than Expected", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80", time: "1 hour ago", slug: "wall-street-rallies-inflation-cools" },
            { title: "Fed Signals Possible Rate Cut Later This Year", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&q=80", time: "2 hours ago", slug: "fed-signals-rate-cut" },
            { title: "Big Tech Earnings Beat Estimates Across the Board", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80", time: "2 hours ago", slug: "big-tech-earnings-beat-estimates" }
        ]
    },
    {
        name: 'TECHNOLOGY',
        slug: 'technology',
        items: [
            { title: "OpenAI Unveils New AI Model with Advanced Reasoning", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&q=80", time: "1 hour ago", slug: "openai-unveils-new-ai-model" },
            { title: "Apple iPhone 16 Rumors Heat Up Ahead of Launch", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80", time: "2 hours ago", slug: "apple-iphone-16-rumors" },
            { title: "Microsoft Introduces AI-Powered Copilot Upgrades", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80", time: "3 hours ago", slug: "microsoft-introduces-copilot-upgrades" }
        ]
    },
    {
        name: 'SPORTS',
        slug: 'sports',
        items: [
            { title: "Lakers Advance to Western Conference Finals", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&q=80", time: "1 hour ago", slug: "lakers-advance-western-conference-finals" },
            { title: "NFL 2025 Schedule Release: Key Matchups Revealed", image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=300&q=80", time: "2 hours ago", slug: "nfl-2025-schedule-release" },
            { title: "Yankees Win Thriller in 11 Innings Against Red Sox", image: "https://images.unsplash.com/photo-1508802259102-127e22137683?w=300&q=80", time: "3 hours ago", slug: "yankees-win-thriller-11-innings" }
        ]
    },
    {
        name: 'WORLD',
        slug: 'world',
        items: [
            { title: "European Union Approves New Trade Agreement", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=300&q=80", time: "1 hour ago", slug: "eu-approves-trade-agreement" },
            { title: "Ceasefire Talks Resume in Middle East Conflict", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80", time: "2 hours ago", slug: "ceasefire-talks-resume-middle-east" },
            { title: "UN Climate Report Highlights Urgent Action Needed", image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&q=80", time: "3 hours ago", slug: "un-climate-report-urgent-action" }
        ]
    }
];

export default function NewsCategorySelection({ articles, getArticleUrl }: NewsCategorySelectionProps) {
    return (
        <section className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {DEFAULT_CATEGORIES.map((cat) => {
                    const catArticles = articles && articles.length > 0
                        ? articles.filter((item) => item.category?.toLowerCase() === cat.slug || item.category?.toLowerCase() === cat.name.toLowerCase()).slice(0, 3)
                        : [];

                    const displayList = catArticles.length > 0 ? catArticles.map(a => ({
                        title: a.title,
                        image: a.featuredImage || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&q=80",
                        time: a.publishedAt || "1 hour ago",
                        url: getArticleUrl ? getArticleUrl(a) : `/news/${a.slug}`
                    })) : cat.items.map(i => ({
                        title: i.title,
                        image: i.image,
                        time: i.time,
                        url: `/news/${i.slug}`
                    }));

                    return (
                        <div key={cat.slug} className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <div className="flex justify-between items-center border-b-2 border-red-600 pb-2 mb-4">
                                <h2 className="text-sm font-extrabold text-gray-900 border-l-4 border-red-600 pl-2 uppercase tracking-wider">
                                    {cat.name}
                                </h2>
                                <Link href={`/news/category/${cat.slug}`} className="text-xs font-bold text-red-600 hover:underline">
                                    View All &rarr;
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {displayList.map((item, idx) => (
                                    <Link key={idx} href={item.url} className="group flex flex-col">
                                        <div className="relative w-full h-24 rounded overflow-hidden bg-gray-100 mb-2">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <h3 className="font-bold text-xs text-gray-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 mt-1 block">
                                            🕒 {item.time}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}