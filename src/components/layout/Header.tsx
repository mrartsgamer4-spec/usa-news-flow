'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, Clock, ChevronDown, Wrench, Calculator, Home,
    FileText, Image as ImageIcon, QrCode, Type, ArrowRight,
    DollarSign, Percent, Landmark
} from 'lucide-react';

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
    { label: "Image to PDF", href: "/tools/image-to-pdf", icon: ImageIcon },
    { label: "PDF to Image", href: "/tools/pdf-to-image", icon: FileText },
    { label: "PDF Converter", href: "/tools/pdf-converter", icon: FileText },
    { label: "Merge PDF", href: "/tools/merge-pdf", icon: FileText },
    { label: "Compress PDF", href: "/tools/compress-pdf", icon: FileText },
    { label: "QR Code Generator", href: "/tools/qr-code", icon: QrCode },
    { label: "Word Counter", href: "/tools/word-counter", icon: Type },
    { label: "Case Converter", href: "/tools/case-converter", icon: Type },
];

const CALCULATOR_ITEMS = [
    { label: "Salary Calculator", href: "/calculators/salary", icon: DollarSign },
    { label: "Tax Calculator", href: "/calculators/tax", icon: Landmark },
    { label: "Mortgage Calculator", href: "/calculators/mortgage", icon: Home },
    { label: "Loan Calculator", href: "/calculators/loan", icon: DollarSign },
    { label: "Percentage Calculator", href: "/calculators/percentage", icon: Percent },
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
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar with Logo, Time, Socials */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo Section */}
                <Link href="/" className="flex flex-col items-start">
                    <div className="flex items-center text-3xl md:text-4xl font-black tracking-tight italic">
                        <span className="bg-red-600 text-white px-2 py-0.5 rounded-sm mr-1 uppercase">US</span>
                        <span className="text-red-600 uppercase">NEWS</span>
                        <span className="text-red-600 uppercase font-light ml-1">FLOW</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                        Your Daily Flow of U.S. News & Insights
                    </span>
                </Link>

                {/* Washington D.C. Clock Section */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700">
                        <Clock size={18} />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-gray-900">New York, USA</span>
                        <span className="text-[11px] text-gray-500 font-medium">
                            {dcDate || 'Monday, May 19, 2026'}
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
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="bg-gray-100 text-xs px-3 py-1.5 pr-8 rounded-full border border-gray-300 focus:outline-none focus:border-red-600 w-36 sm:w-48 transition-all"
                        />
                        <Search size={14} className="absolute right-2.5 top-2 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Red Navbar */}
            <nav className="bg-[#cc0000] text-white relative">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold">
                    {/* Left Navigation Categories */}
                    <div className="flex items-center space-x-1 py-1 overflow-x-visible">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative group py-1.5">
                                <Link
                                    href={item.href}
                                    className="px-2.5 py-1 hover:bg-red-800 rounded transition flex items-center gap-1 uppercase tracking-wider text-white text-[11px]"
                                >
                                    {item.isHome && <Home size={13} className="mb-0.5" />}
                                    {item.label}
                                    {item.sub && <ChevronDown size={11} className="group-hover:rotate-180 transition-transform duration-200" />}
                                </Link>

                                {/* Category Hover Dropdown */}
                                {item.sub && (
                                    <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 py-2 min-w-[200px] rounded-b-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                        {item.sub.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="block px-4 py-2 text-xs hover:bg-red-50 hover:text-red-600 border-b border-gray-50 last:border-0 font-medium transition"
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
                    <div className="flex items-center space-x-2 pl-3 border-l border-red-500 py-1.5">
                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button className="px-3 py-1 bg-white text-gray-900 rounded flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-bold hover:bg-gray-100 transition shadow-sm">
                                <Wrench size={13} className="text-red-600" />
                                Tools
                                <ChevronDown size={11} className="group-hover:rotate-180 transition-transform duration-200 text-gray-500" />
                            </button>

                            {/* Tools Menu Body */}
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-56 z-50 py-1.5 overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    {TOOLS_ITEMS.map((tool) => {
                                        const Icon = tool.icon;
                                        return (
                                            <Link
                                                key={tool.label}
                                                href={tool.href}
                                                className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 hover:text-red-600 text-xs font-semibold transition"
                                            >
                                                <Icon size={14} className="text-gray-500 group-hover:text-red-600" />
                                                <span>{tool.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                                    <Link
                                        href="/tools"
                                        className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center justify-center gap-1"
                                    >
                                        View All Tools <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Calculators Dropdown */}
                        <div className="relative group">
                            <button className="px-3 py-1 bg-red-800 text-white rounded flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-bold hover:bg-red-900 transition">
                                <Calculator size={13} />
                                Calculators
                                <ChevronDown size={11} className="group-hover:rotate-180 transition-transform duration-200 text-gray-300" />
                            </button>

                            {/* Calculators Menu Body */}
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-60 z-50 py-1.5 overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    {CALCULATOR_ITEMS.map((calc) => {
                                        const Icon = calc.icon;
                                        return (
                                            <Link
                                                key={calc.label}
                                                href={calc.href}
                                                className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 hover:text-red-600 text-xs font-semibold transition"
                                            >
                                                <Icon size={14} className="text-gray-500 group-hover:text-red-600" />
                                                <span>{calc.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                                    <Link
                                        href="/calculators"
                                        className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center justify-center gap-1"
                                    >
                                        View All Calculators <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}