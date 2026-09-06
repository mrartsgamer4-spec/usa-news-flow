'use client';

import Link from "next/link";
import {
    FileImage,
    FileText,
    QrCode,
    FileType,
    Calculator,
    DollarSign,
    Home,
    CreditCard,
    Percent,
    ArrowUp
} from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#0b1321] text-gray-300 pt-12 pb-6 border-t border-gray-800 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800">

                {/* Brand Column */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="flex items-center gap-1">
                        <span className="bg-news-red text-white font-black text-xl px-2 py-0.5 rounded-sm">USA</span>
                        <span className="font-serif font-black text-xl text-white tracking-wider">NEWS</span>
                        <span className="text-news-red font-bold text-xs uppercase self-end mb-1">FLOW</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Your trusted source for breaking news, in-depth analysis, and the latest updates from across the United States and around the world.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
                    <ul className="grid grid-cols-2 gap-y-2 text-xs">
                        <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link href="/news/category/health" className="hover:text-white transition">Health</Link></li>
                        <li><Link href="/news/category/us-news" className="hover:text-white transition">U.S. News</Link></li>
                        <li><Link href="/news/category/sports" className="hover:text-white transition">Sports</Link></li>
                        <li><Link href="/news/category/politics" className="hover:text-white transition">Politics</Link></li>
                        <li><Link href="/tools" className="hover:text-white transition">Tools</Link></li>
                        <li><Link href="/news/category/world" className="hover:text-white transition">World</Link></li>
                        <li><Link href="/calculators" className="hover:text-white transition">Calculators</Link></li>
                        <li><Link href="/news/category/business" className="hover:text-white transition">Business</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        <li><Link href="/news/category/tech" className="hover:text-white transition">Technology</Link></li>
                        <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Useful Tools (Synced with Navbar Dropdown) */}
                <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Useful Tools</h3>
                    <ul className="space-y-2.5 text-xs">
                        <li>
                            <Link href="/tools/image-to-pdf" className="flex items-center gap-2 hover:text-white transition">
                                <FileImage size={14} className="text-news-red" /> Image to PDF
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/pdf-to-image" className="flex items-center gap-2 hover:text-white transition">
                                <FileText size={14} className="text-news-red" /> PDF to Image
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/qr-code" className="flex items-center gap-2 hover:text-white transition">
                                <QrCode size={14} className="text-news-red" /> QR Code Generator
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/word-to-pdf" className="flex items-center gap-2 hover:text-white transition">
                                <FileType size={14} className="text-news-red" /> Word to PDF
                            </Link>
                        </li>
                    </ul>
                    <Link href="/tools" className="inline-block mt-4 text-xs font-bold text-news-red hover:underline">
                        View All Tools &rarr;
                    </Link>
                </div>

                {/* Calculators (Synced with Navbar Dropdown) */}
                <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Calculators</h3>
                    <ul className="space-y-2.5 text-xs">
                        <li>
                            <Link href="/calculators/salary" className="flex items-center gap-2 hover:text-white transition">
                                <Calculator size={14} className="text-news-red" /> Salary Calculator
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators/tax" className="flex items-center gap-2 hover:text-white transition">
                                <DollarSign size={14} className="text-news-red" /> Tax Calculator
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators/mortgage" className="flex items-center gap-2 hover:text-white transition">
                                <Home size={14} className="text-news-red" /> Mortgage Calculator
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators/loan" className="flex items-center gap-2 hover:text-white transition">
                                <CreditCard size={14} className="text-news-red" /> Loan Calculator
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculators/percentage" className="flex items-center gap-2 hover:text-white transition">
                                <Percent size={14} className="text-news-red" /> Percentage Calculator
                            </Link>
                        </li>
                    </ul>
                    <Link href="/calculators" className="inline-block mt-4 text-xs font-bold text-news-red hover:underline">
                        View All Calculators &rarr;
                    </Link>
                </div>

                {/* Policies & Info Links */}
                <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Policies & Info</h3>
                    <ul className="space-y-2 text-xs">
                        <li><Link href="/about-us" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-use" className="hover:text-white transition">Terms of Use</Link></li>
                        <li><Link href="/editorial-policy" className="hover:text-white transition">Editorial Policy</Link></li>
                        <li><Link href="/advertising-policy" className="hover:text-white transition">Advertising Policy</Link></li>
                        <li><Link href="/corrections-policy" className="hover:text-white transition">Corrections Policy</Link></li>
                        <li><Link href="/sitemap" className="hover:text-white transition">Sitemap</Link></li>
                        <li><Link href="/rss-feeds" className="hover:text-white transition">RSS Feeds</Link></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
                <div className="flex items-center gap-6">
                    <a href="mailto:contact@usanewsflow.com" className="hover:text-white transition">
                        ✉ contact@usanewsflow.com
                    </a>
                    <a href="tel:+12125550198" className="hover:text-white transition">
                        📞 +1 (212) 555-0198
                    </a>
                </div>
                <div>
                    © 2026 USA News Flow. All Rights Reserved.
                </div>
                <div className="flex items-center gap-4">
                    <span>made with ❤️ for readers in the U.S. and beyond.</span>
                    <button
                        onClick={scrollToTop}
                        className="p-2 bg-gray-800 hover:bg-news-red text-white rounded transition"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={14} />
                    </button>
                </div>
            </div>
        </footer>
    );
}