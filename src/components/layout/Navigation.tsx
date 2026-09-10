"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    {
        label: "U.S. News",
        href: "/news/category/us-news",
        sub: [
            { label: "Breaking News", href: "/news/category/us-news?sub=breaking-news" },
            { label: "California", href: "/news/category/us-news?sub=california" },
            { label: "New York", href: "/news/category/us-news?sub=new-york" },
            { label: "Texas", href: "/news/category/us-news?sub=texas" },
            { label: "Florida", href: "/news/category/us-news?sub=florida" },
        ],
    },
    {
        label: "Politics",
        href: "/news/category/politics",
        sub: [
            { label: "White House", href: "/news/category/politics?sub=white-house" },
            { label: "Congress", href: "/news/category/politics?sub=congress" },
            { label: "Elections", href: "/news/category/politics?sub=elections" },
        ],
    },
    {
        label: "World",
        href: "/news/category/world",
        sub: [
            { label: "Global Affairs", href: "/news/category/world?sub=global-affairs" },
            { label: "Europe", href: "/news/category/world?sub=europe" },
            { label: "Asia-Pacific", href: "/news/category/world?sub=asia-pacific" },
            { label: "Middle East", href: "/news/category/world?sub=middle-east" },
        ],
    },
    {
        label: "Business",
        href: "/news/category/business",
        sub: [
            { label: "Economy", href: "/news/category/business?sub=economy" },
            { label: "Markets", href: "/news/category/business?sub=markets" },
            { label: "Finance", href: "/news/category/business?sub=finance" },
            { label: "Real Estate", href: "/news/category/business?sub=real-estate" },
        ],
    },
    {
        label: "Technology",
        href: "/news/category/technology",
        sub: [
            { label: "AI News", href: "/news/category/technology?sub=ai-news" },
            { label: "AI Tools & Tech", href: "/news/category/technology?sub=ai-tools" },
            { label: "Cyber Security", href: "/news/category/technology?sub=cyber-security" },
            { label: "Gadgets", href: "/news/category/technology?sub=gadgets" },
        ],
    },
    {
        label: "Health",
        href: "/news/category/health",
        sub: [
            { label: "Medicine", href: "/news/category/health?sub=medicine" },
            { label: "Wellness", href: "/news/category/health?sub=wellness" },
            { label: "Research", href: "/news/category/health?sub=research" },
        ],
    },
    {
        label: "Sports",
        href: "/news/category/sports",
        sub: [
            { label: "Football", href: "/news/category/sports?sub=football" },
            { label: "Basketball", href: "/news/category/sports?sub=basketball" },
            { label: "Cricket", href: "/news/category/sports?sub=cricket" },
            { label: "Tennis", href: "/news/category/sports?sub=tennis" },
        ],
    },
    {
        label: "Tools",
        href: "/tools",
        sub: [
            { label: "Image to PDF", href: "/tools/image-to-pdf" },
            { label: "PDF to Image", href: "/tools/pdf-to-image" },
            { label: "QR Code Generator", href: "/tools/qr-code" },
            { label: "Word to PDF", href: "/tools/word-to-pdf" },
        ],
    },
    {
        label: "Calculators",
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
        <nav className="bg-news-red text-white shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
                <div className="hidden lg:flex items-center space-x-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                href={item.href}
                                className="px-3 py-2 text-sm font-bold uppercase tracking-wider hover:bg-news-darkRed transition flex items-center gap-1 rounded-sm"
                            >
                                {item.label}
                                {item.sub && <ChevronDown size={14} className="opacity-80 group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {item.sub && (
                                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-news-black shadow-xl border border-news-border py-2 min-w-[200px] rounded-b-md z-50">
                                    {item.sub.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block px-4 py-2 text-sm font-medium hover:bg-news-lightRed hover:text-news-red transition"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="lg:hidden flex items-center justify-between w-full">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/90">Navigation Menu</span>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1.5 focus:outline-none hover:bg-news-darkRed rounded"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-news-black border-t border-red-800 text-white px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-gray-800 pb-2">
                            <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-base font-bold uppercase hover:text-news-red"
                            >
                                {item.label}
                            </Link>
                            {item.sub && (
                                <div className="pl-4 mt-2 space-y-1.5 border-l-2 border-news-red">
                                    {item.sub.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block text-sm text-gray-300 hover:text-white"
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