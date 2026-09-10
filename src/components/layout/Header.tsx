'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, Clock, ChevronDown, Wrench, Calculator, Home,
    FileText, Image as ImageIcon, QrCode, Type, ArrowRight,
    DollarSign, Percent, Landmark, Menu, X
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
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setDcDate(now.toLocaleDateString('en-US', {
                timeZone: 'America/New_York',
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }));
            setDcTime(now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }) + ' EDT');
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-4">

                {/* Logo */}
                <Link href="/" className="flex flex-col items-start">
                    <div className="flex items-center text-3xl sm:text-4xl font-black tracking-tight italic">
                        <span className="bg-red-600 text-white px-2 py-0.5 rounded mr-1.5 uppercase">US</span>
                        <span className="text-red-600 uppercase">NEWS</span>
                        <span className="text-red-600 uppercase font-light ml-1.5">FLOW</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-semibold tracking-wide mt-0.5">
                        Your Daily Flow of U.S. News & Insights
                    </span>
                </Link>

                {/* Clock */}
                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 bg-white">
                        <Clock size={20} />
                    </div>
                    <div className="flex flex-col leading-snug">
                        <span className="text-sm font-bold text-gray-900">New York, USA</span>
                        <span className="text-xs text-gray-500 font-medium">{dcDate || 'Monday, May 19, 2026'}</span>
                        <span className="text-xs font-black text-red-600 tracking-wider">{dcTime || '10:24 AM EDT'}</span>
                    </div>
                </div>

                {/* Socials & Mobile Trigger */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center text-sm font-bold shadow-sm">f</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-sm">𝕏</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#e1306c] text-white flex items-center justify-center text-sm font-bold shadow-sm">ig</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center text-sm font-bold shadow-sm">yt</a>
                    </div>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-red-600 focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Red Navbar */}
            <nav className="bg-[#cc0000] text-white">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

                    {/* Desktop Items */}
                    <div className="hidden lg:flex items-center space-x-1 py-1">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative group py-2">
                                <Link
                                    href={item.href}
                                    className="px-3.5 py-1.5 hover:bg-red-800 rounded font-bold uppercase tracking-wider text-[13px] text-white flex items-center gap-1 transition"
                                >
                                    {item.isHome && <Home size={15} className="mb-0.5" />}
                                    {item.label}
                                    {item.sub && <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />}
                                </Link>

                                {item.sub && (
                                    <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 py-2 min-w-[200px] rounded-b-lg z-50">
                                        {item.sub.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                className="block px-4 py-2.5 text-xs font-semibold hover:bg-red-50 hover:text-red-600 border-b border-gray-50 last:border-0 transition"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Tools & Calculators */}
                    <div className="hidden lg:flex items-center space-x-2 py-1.5 border-l border-red-500 pl-3">
                        {/* Tools */}
                        <div className="relative group py-1">
                            <button className="px-3 py-1.5 bg-white text-gray-900 rounded font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-gray-100 shadow-sm">
                                <Wrench size={14} className="text-red-600" />
                                Tools
                                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-56 z-50 py-1 overflow-hidden">
                                {TOOLS_ITEMS.map((tool) => (
                                    <Link key={tool.label} href={tool.href} className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 hover:text-red-600 text-xs font-semibold border-b border-gray-100 last:border-0">
                                        <tool.icon size={15} className="text-gray-500" />
                                        {tool.label}
                                    </Link>
                                ))}
                                <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                                    <Link href="/tools" className="text-xs font-bold text-red-600 hover:underline flex items-center justify-center gap-1">
                                        View All Tools <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Calculators */}
                        <div className="relative group py-1">
                            <button className="px-3 py-1.5 bg-red-800 text-white rounded font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-red-900 shadow-sm">
                                <Calculator size={14} />
                                Calculators
                                <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-60 z-50 py-1 overflow-hidden">
                                {CALCULATOR_ITEMS.map((calc) => (
                                    <Link key={calc.label} href={calc.href} className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 hover:text-red-600 text-xs font-semibold border-b border-gray-100 last:border-0">
                                        <calc.icon size={15} className="text-gray-500" />
                                        {calc.label}
                                    </Link>
                                ))}
                                <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
                                    <Link href="/calculators" className="text-xs font-bold text-red-600 hover:underline flex items-center justify-center gap-1">
                                        View All Calculators <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden bg-red-700 px-4 py-3 space-y-1 border-t border-red-500 max-h-[75vh] overflow-y-auto">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-bold uppercase tracking-wider text-white border-b border-red-600 last:border-0"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}