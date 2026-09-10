"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface SubItem {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    sub?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
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

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);

    return (
        <nav
            className="w-full bg-red-600 text-white shadow-md relative"
            onMouseLeave={() => setHoveredItem(null)}
        >
            {/* মূল মেনুবার */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-11">
                <div className="hidden lg:flex items-center space-x-1">
                    {NAV_ITEMS.map((item) => {
                        const isHovered = hoveredItem?.label === item.label;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => setHoveredItem(item.sub ? item : null)}
                                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition rounded-sm flex items-center gap-1 ${isHovered ? 'bg-red-800 text-white' : 'hover:bg-red-700 text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* মোবাইল মেনু বাটন */}
                <div className="lg:hidden flex items-center justify-between w-full">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90">Navigation Menu</span>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1 focus:outline-none hover:bg-red-700 rounded"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* ইনলাইন হরাইজন্টাল সাব-ক্যাটাগরি বার (হিরো ইমেজের উপরে কোনো পপআপ ভাসবে না) */}
            {hoveredItem && hoveredItem.sub && (
                <div
                    className="w-full bg-red-800 border-t border-red-500 py-1.5 px-4 animate-in fade-in duration-150"
                    onMouseEnter={() => setHoveredItem(hoveredItem)}
                >
                    <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto text-[11px] font-medium">
                        <span className="text-red-200 uppercase font-bold tracking-wider text-[10px]">
                            {hoveredItem.label}:
                        </span>
                        {hoveredItem.sub.map((subItem) => (
                            <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="text-white hover:text-red-200 hover:underline transition whitespace-nowrap"
                            >
                                {subItem.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* মোবাইল ড্রপডাউন */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-black text-white px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-gray-800 pb-2">
                            <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-sm font-bold uppercase hover:text-red-500"
                            >
                                {item.label}
                            </Link>
                            {item.sub && (
                                <div className="pl-4 mt-2 space-y-1.5 border-l-2 border-red-600">
                                    {item.sub.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-xs text-gray-300 hover:text-white"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}