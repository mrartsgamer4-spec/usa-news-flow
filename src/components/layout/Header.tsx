'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Clock, ChevronDown, Wrench, Calculator, Home } from 'lucide-react';

const NAV_ITEMS = [
    { label: "Home", href: "/", isHome: true },
    { label: "Politics", href: "/news/category/politics" },
    {
        label: "U.S. News",
        href: "/news/category/us-news",
        sub: [
            { label: "Donald Trump", href: "/news/category/us-news?sub=donald-trump" },
            { label: "White House News", href: "/news/category/us-news?sub=white-house" },
            { label: "Breaking News", href: "/news/category/us-news?sub=breaking-news" },
        ],
    },
    { label: "World", href: "/news/category/world" },
    { label: "Business", href: "/news/category/business" },
    { label: "Tech", href: "/news/category/technology" },
    { label: "Health", href: "/news/category/health" },
    { label: "Sports", href: "/news/category/sports" },
    { label: "Entertainment", href: "/news/category/entertainment" },
    { label: "Opinion", href: "/news/category/opinion" },
    {
        label: "More",
        href: "#",
        sub: [
            { label: "Lifestyle", href: "/news/category/lifestyle" },
            { label: "Science", href: "/news/category/science" },
            { label: "Education", href: "/news/category/education" },
        ],
    },
];

const TOOLS_ITEMS = [
    { label: "Image to PDF", href: "/tools/image-to-pdf" },
    { label: "PDF to Image", href: "/tools/pdf-to-image" },
    { label: "PDF Converter", href: "/tools/pdf-converter" },
    { label: "Merge PDF", href: "/tools/merge-pdf" },
    { label: "Compress PDF", href: "/tools/compress-pdf" },
    { label: "QR Code Generator", href: "/tools/qr-code" },
    { label: "Word Counter", href: "/tools/word-counter" },
    { label: "Case Converter", href: "/tools/case-converter" },
];

const CALCULATOR_ITEMS = [
    { label: "Salary Calculator", href: "/calculators/salary" },
    { label: "Tax Calculator", href: "/calculators/tax" },
    { label: "Mortgage Calculator", href: "/calculators/mortgage" },
    { label: "Loan Calculator", href: "/calculators/loan" },
    { label: "Percentage Calculator", href: "/calculators/percentage" },
];

export default function Header() {
    const [dcDate, setDcDate] = useState<string>('');
    const [dcTime, setDcTime] = useState<string>('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            const dateStr = now.toLocaleDateString('en-US', {
                timeZone: 'America/New_York',
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            const timeStr = now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }) + ' EDT';

            setDcDate(dateStr);
            setDcTime(timeStr);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-200">
            {/* Top Bar with Logo, Time, Socials */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo Section */}
                <Link href="/" className="flex flex-col items-start">
                    <div className="flex items-center text-3xl md:text-4xl font-black tracking-tight italic">
                        <span className="bg-red-600 text-white px-2 py-0.5 rounded-sm mr-1 uppercase">US</span>
                        <span className="text-red-600 uppercase">NEWS</span>
                        <span className="text-red-600 uppercase font-light ml-1">FLOW</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium tracking-wide">
                        Your Daily Flow of U.S. News & Insights
                    </span>
                </Link>

                {/* Washington D.C. Clock Section */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700">
                        <Clock size={20} />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-gray-900">Washington, D.C., USA</span>
                        <span className="text-[11px] text-gray-500 font-medium">
                            {dcDate || 'Monday, May 19, 2025'}
                        </span>
                        <span className="text-xs font-black text-red-600 tracking-wider">
                            {dcTime || '10:24 AM EDT'}
                        </span>
                    </div>
                </div>

                {/* Social Links & Search */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <a href="#" className="w-7 h-7 rounded-full bg-[#3b5998] text-white flex items-center justify-center text-xs font-bold hover:opacity-90">f</a>
                        <a href="#" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold hover:opacity-90">𝕏</a>
                        <a href="#" className="w-7 h-7 rounded-full bg-[#e1306c] text-white flex items-center justify-center text-xs font-bold hover:opacity-90">ig</a>
                        <a href="#" className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center text-xs font-bold hover:opacity-90">yt</a>
                    </div>
                    <div className="h-5 w-[1px] bg-gray-300 mx-1"></div>
                    <button aria-label="Search" className="p-1.5 text-gray-700 hover:text-red-600 rounded-full hover:bg-gray-100">
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* Red Navbar */}
            <nav className="bg-[#cc0000] text-white">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto text-xs font-bold">
                    <div className="flex items-center space-x-1 py-1">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative group py-2">
                                <Link
                                    href={item.href}
                                    className="px-3 py-1.5 hover:bg-red-800 rounded transition flex items-center gap-1 uppercase tracking-wider text-white"
                                >
                                    {item.isHome && <Home size={14} className="mb-0.5" />}
                                    {item.label}
                                    {item.sub && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />}
                                </Link>

                                {item.sub && (
                                    <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-xl border border-gray-200 py-1.5 min-w-[180px] rounded-b z-50">
                                        {item.sub.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 border-b border-gray-100 last:border-0 font-semibold"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tools & Calculators Right Dropdowns */}
                    <div className="flex items-center space-x-1 pl-4 border-l border-red-500 py-1">
                        <div className="relative group py-2">
                            <button className="px-3 py-1.5 hover:bg-red-800 rounded flex items-center gap-1 uppercase tracking-wider text-white font-bold bg-red-700">
                                <Wrench size={13} />
                                Tools
                                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-xl border border-gray-200 py-2 min-w-[210px] rounded-b z-50">
                                {TOOLS_ITEMS.map((tool) => (
                                    <Link
                                        key={tool.label}
                                        href={tool.href}
                                        className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 border-b border-gray-100 last:border-0 font-medium"
                                    >
                                        {tool.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="relative group py-2">
                            <button className="px-3 py-1.5 hover:bg-red-800 rounded flex items-center gap-1 uppercase tracking-wider text-white font-bold bg-red-700">
                                <Calculator size={13} />
                                Calculators
                                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-xl border border-gray-200 py-2 min-w-[210px] rounded-b z-50">
                                {CALCULATOR_ITEMS.map((calc) => (
                                    <Link
                                        key={calc.label}
                                        href={calc.href}
                                        className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 border-b border-gray-100 last:border-0 font-medium"
                                    >
                                        {calc.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}