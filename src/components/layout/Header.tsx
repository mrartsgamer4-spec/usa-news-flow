'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
    { label: "HOME", href: "/" },
    {
        label: "U.S. NEWS",
        href: "/news/category/us-news",
        sub: [
            { label: "Donald Trump", href: "/news/category/us-news?sub=donald-trump" },
            { label: "White House News", href: "/news/category/us-news?sub=white-house" },
            { label: "Breaking News", href: "/news/category/us-news?sub=breaking-news" },
        ],
    },
    {
        label: "POLITICS",
        href: "/news/category/politics",
        sub: [
            { label: "Congress", href: "/news/category/politics?sub=congress" },
            { label: "Elections", href: "/news/category/politics?sub=elections" },
            { label: "Policy & Law", href: "/news/category/politics?sub=policy" },
        ],
    },
    { label: "WORLD", href: "/news/category/world" },
    { label: "BUSINESS", href: "/news/category/business" },
    {
        label: "TECHNOLOGY",
        href: "/news/category/technology",
        sub: [
            { label: "AI News", href: "/news/category/technology?sub=ai-news" },
            { label: "Latest AI News", href: "/news/category/technology?sub=latest-ai" },
            { label: "AI Technology", href: "/news/category/technology?sub=ai-tech" },
        ],
    },
    { label: "HEALTH", href: "/news/category/health" },
    {
        label: "SPORTS",
        href: "/news/category/sports",
        sub: [
            { label: "NFL & Football", href: "/news/category/sports?sub=football" },
            { label: "NBA & Basketball", href: "/news/category/sports?sub=basketball" },
            { label: "Cricket", href: "/news/category/sports?sub=cricket" },
        ],
    },
    {
        label: "TOOLS",
        href: "/tools",
        sub: [
            { label: "Image to PDF", href: "/tools/image-to-pdf" },
            { label: "PDF to Image", href: "/tools/pdf-to-image" },
            { label: "QR Code Generator", href: "/tools/qr-code" },
            { label: "Word to PDF", href: "/tools/word-to-pdf" },
        ],
    },
    {
        label: "CALCULATORS",
        href: "/calculators",
        sub: [
            { label: "Salary Calculator", href: "/calculators/salary" },
            { label: "Tax Calculator", href: "/calculators/tax" },
            { label: "Mortgage Calculator", href: "/calculators/mortgage" },
            { label: "Loan Calculator", href: "/calculators/loan" },
            { label: "Percentage Calculator", href: "/calculators/percentage" },
        ],
    },
];

export default function Header() {
    const [nyTime, setNyTime] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleDateString('en-US', {
                timeZone: 'America/New_York',
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }) + ' • ' + now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }) + ' EDT';
            setNyTime(timeString);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-200">
            {/* Top Logo & Live US Time Header */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <span className="text-3xl font-black text-red-600 tracking-tight">
                        USA NEWS <span className="text-black font-semibold">FLOW</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
                    <span>{nyTime || 'Mon, Sep 7, 2026 • 03:40:44 AM EDT'}</span>
                    <button aria-label="Search" className="hover:text-red-600">
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* Red Navbar */}
            <nav className="bg-red-600 text-white">
                <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 overflow-visible">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group py-2.5">
                            <Link
                                href={item.href}
                                className="px-3 py-1.5 text-xs font-bold hover:bg-red-700 rounded transition flex items-center gap-1 uppercase tracking-wider"
                            >
                                {item.label}
                                {item.sub && <ChevronDown size={13} className="group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {item.sub && (
                                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-xl border border-gray-200 py-1.5 min-w-[190px] rounded-b-md z-50">
                                    {item.sub.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block px-4 py-2 text-xs font-semibold hover:bg-red-50 hover:text-red-600 border-b border-gray-100 last:border-0"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
}