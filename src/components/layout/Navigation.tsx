"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

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

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-red-600 text-white shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-11">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                href={item.href}
                                className="px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition flex items-center gap-1 rounded-sm"
                            >
                                {item.label}
                                {item.sub && <ChevronDown size={12} className="opacity-80 group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {item.sub && (
                                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-900 shadow-xl border border-gray-200 py-1.5 min-w-[200px] rounded-b-md z-50">
                                    {item.sub.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block px-4 py-2 text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition border-b border-gray-100 last:border-0"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
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

            {/* Mobile Menu Dropdown */}
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