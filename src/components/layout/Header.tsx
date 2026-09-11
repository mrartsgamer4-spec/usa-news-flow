'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Clock, ChevronDown, Wrench, Calculator, Home,
    FileText, Image as ImageIcon, QrCode, Type,
    DollarSign, Percent, Landmark, Menu, X
} from 'lucide-react';

const NAVIGATION_CONFIG = [
    { label: "Home", href: "/", isHome: true },
    {
        label: "Politics",
        href: "/news/category/politics",
        sub: [
            { label: "Congress", href: "/news/category/politics?sub=congress" },
            { label: "Elections", href: "/news/category/politics?sub=elections" },
            { label: "Policy & Law", href: "/news/category/politics?sub=policy-law" }
        ]
    },
    {
        label: "U.S. News",
        href: "/news/category/us-news",
        sub: [
            { label: "Donald Trump", href: "/news/category/us-news?sub=donald-trump" },
            { label: "White House News", href: "/news/category/us-news?sub=white-house-news" },
            { label: "Breaking News", href: "/news/category/us-news?sub=breaking-news" }
        ]
    },
    {
        label: "World",
        href: "/news/category/world",
        sub: [
            { label: "Global Affairs", href: "/news/category/world?sub=global-affairs" },
            { label: "Europe", href: "/news/category/world?sub=europe" },
            { label: "Asia-Pacific", href: "/news/category/world?sub=asia-pacific" },
            { label: "Middle East", href: "/news/category/world?sub=middle-east" }
        ]
    },
    {
        label: "Business",
        href: "/news/category/business",
        sub: [
            { label: "Economy", href: "/news/category/business?sub=economy" },
            { label: "Markets", href: "/news/category/business?sub=markets" },
            { label: "Finance", href: "/news/category/business?sub=finance" },
            { label: "Real Estate", href: "/news/category/business?sub=real-estate" }
        ]
    },
    {
        label: "Tech",
        href: "/news/category/technology",
        sub: [
            { label: "AI News", href: "/news/category/technology?sub=ai-news" },
            { label: "Latest AI News", href: "/news/category/technology?sub=latest-ai-news" },
            { label: "AI Technology", href: "/news/category/technology?sub=ai-technology" }
        ]
    },
    {
        label: "Health",
        href: "/news/category/health",
        sub: [
            { label: "Medicine", href: "/news/category/health?sub=medicine" },
            { label: "Wellness", href: "/news/category/health?sub=wellness" },
            { label: "Research", href: "/news/category/health?sub=research" }
        ]
    },
    {
        label: "Sports",
        href: "/news/category/sports",
        sub: [
            { label: "NFL & Football", href: "/news/category/sports?sub=nfl-football" },
            { label: "NBA & Basketball", href: "/news/category/sports?sub=nba-basketball" },
            { label: "Cricket", href: "/news/category/sports?sub=cricket" }
        ]
    },
    { label: "Entertainment", href: "/news/category/entertainment" },
    { label: "Opinion", href: "/news/category/opinion" }
];

const TOOLS_ITEMS = [
    { label: "Image to PDF", href: "/tools/image-to-pdf", icon: ImageIcon },
    { label: "PDF to Image", href: "/tools/pdf-to-image", icon: FileText },
    { label: "QR Code Generator", href: "/tools/qr-code", icon: QrCode },
    { label: "Word Counter", href: "/tools/word-counter", icon: Type },
];

const CALCULATOR_ITEMS = [
    { label: "Salary Calculator", href: "/calculators/salary", icon: DollarSign },
    { label: "Tax Calculator", href: "/calculators/tax", icon: Landmark },
    { label: "Mortgage Calculator", href: "/calculators/mortgage", icon: Home },
    { label: "Percentage Calculator", href: "/calculators/percentage", icon: Percent },
];

export default function Header() {
    const pathname = usePathname();
    const [dcDate, setDcDate] = useState<string>('');
    const [dcTime, setDcTime] = useState<string>('');
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            {/* Top Bar */}
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-4">
                <Link href="/" className="flex flex-col items-start">
                    <div className="flex items-center text-3xl sm:text-4xl font-black tracking-tight italic">
                        <span className="bg-[#cc0000] text-white px-2 py-0.5 rounded mr-1.5 uppercase">USA</span>
                        <span className="text-[#cc0000] uppercase">NEWS</span>
                        <span className="text-gray-900 uppercase font-light ml-1.5">FLOW</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 font-semibold tracking-wide mt-0.5">
                        Your Daily Flow of U.S. News & Insights
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 bg-white">
                        <Clock size={20} />
                    </div>
                    <div className="flex flex-col leading-snug">
                        <span className="text-sm font-bold text-gray-900">New York, USA</span>
                        <span className="text-xs text-gray-500 font-medium">{dcDate}</span>
                        <span className="text-xs font-black text-[#cc0000] tracking-wider">{dcTime}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center text-sm font-bold shadow-sm">f</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-sm">𝕏</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#e1306c] text-white flex items-center justify-center text-sm font-bold shadow-sm">ig</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center text-sm font-bold shadow-sm">yt</a>
                    </div>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-[#cc0000]"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Red Navbar with Pure White Text */}
            <nav className="bg-[#cc0000] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {NAVIGATION_CONFIG.map((item) => {
                            const isActive = item.isHome ? pathname === '/' : pathname.startsWith(item.href);
                            return (
                                <div key={item.label} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={`px-3.5 py-3 text-[14px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition duration-150 ${isActive
                                                ? 'bg-[#990000] text-white'
                                                : 'text-white hover:bg-[#b30000]'
                                            }`}
                                    >
                                        {item.isHome && <Home size={15} />}
                                        {item.label}
                                        {item.sub && <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />}
                                    </Link>

                                    {item.sub && (
                                        <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-900 shadow-2xl border-t-2 border-[#990000] py-2 min-w-[210px] z-50">
                                            {item.sub.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-4 py-2.5 text-xs font-bold text-gray-800 hover:bg-red-50 hover:text-[#cc0000] border-b border-gray-50 last:border-0 transition"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Tools & Calculators */}
                    <div className="hidden lg:flex items-center space-x-2 py-2 pl-4 border-l border-red-400">
                        <div className="relative group">
                            <button className="px-3 py-1.5 bg-white text-gray-900 rounded font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-gray-100 shadow-sm transition">
                                <Wrench size={13} className="text-[#cc0000]" />
                                Tools
                                <ChevronDown size={12} />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-52 z-50 py-1">
                                {TOOLS_ITEMS.map((tool) => (
                                    <Link key={tool.label} href={tool.href} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 hover:text-[#cc0000] text-xs font-semibold">
                                        <tool.icon size={14} />
                                        {tool.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <button className="px-3 py-1.5 bg-[#990000] text-white rounded font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#800000] shadow-sm transition">
                                <Calculator size={13} />
                                Calculators
                                <ChevronDown size={12} />
                            </button>
                            <div className="absolute top-full right-0 hidden group-hover:block bg-white text-gray-800 shadow-2xl border border-gray-200 rounded-b-lg w-52 z-50 py-1">
                                {CALCULATOR_ITEMS.map((calc) => (
                                    <Link key={calc.label} href={calc.href} className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 hover:text-[#cc0000] text-xs font-semibold">
                                        <calc.icon size={14} />
                                        {calc.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden bg-[#b30000] px-4 py-3 space-y-1 border-t border-red-400 max-h-[80vh] overflow-y-auto">
                        {NAVIGATION_CONFIG.map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between border-b border-red-700 py-2">
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-sm font-extrabold uppercase text-white"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.sub && (
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                            className="p-1 text-white"
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                    )}
                                </div>
                                {item.sub && openDropdown === item.label && (
                                    <div className="bg-[#990000] rounded my-1 py-1 pl-4">
                                        {item.sub.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                href={subItem.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="block py-1.5 text-xs text-white hover:underline"
                                            >
                                                &bull; {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}