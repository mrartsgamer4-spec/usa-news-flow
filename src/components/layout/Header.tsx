'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-xs sticky top-0 z-50">
            {/* Main Branding Logo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-gray-100">
                <Link href="/" className="flex items-center gap-1">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-red-600 uppercase">
                        USA NEWS <span className="text-gray-900 font-bold">FLOW</span>
                    </span>
                </Link>
                <div className="hidden sm:block text-right text-xs text-gray-500 font-medium">
                    Your Daily Flow of U.S. News & Insights
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-red-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto">
                    <div className="flex items-center space-x-1 sm:space-x-3 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap py-2.5">
                        <Link href="/" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Home
                        </Link>
                        <Link href="/news/category/u-s-news" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            U.S. News
                        </Link>
                        <Link href="/news/category/politics" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Politics
                        </Link>
                        <Link href="/news/category/world" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            World
                        </Link>
                        <Link href="/news/category/business" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Business
                        </Link>
                        <Link href="/news/category/technology" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Technology
                        </Link>
                        <Link href="/news/category/health" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Health
                        </Link>
                        <Link href="/news/category/sports" className="px-3 py-1.5 hover:bg-red-700 rounded transition">
                            Sports
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative" onMouseEnter={() => setIsToolsOpen(true)} onMouseLeave={() => setIsToolsOpen(false)}>
                            <button className="px-3 py-1.5 hover:bg-red-700 rounded transition flex items-center gap-1 uppercase">
                                🛠 Tools ▾
                            </button>
                            {isToolsOpen && (
                                <div className="absolute left-0 mt-0 w-48 bg-white text-gray-900 rounded-md shadow-lg py-2 border border-gray-100 z-50 normal-case font-medium">
                                    <Link href="/tools/image-to-pdf" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        🖼 Image to PDF
                                    </Link>
                                    <Link href="/tools/pdf-to-image" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        📄 PDF to Image
                                    </Link>
                                    <Link href="/tools/qr-code" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        📲 QR Code Generator
                                    </Link>
                                    <Link href="/tools/word-to-pdf" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        📝 Word to PDF
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Calculators Dropdown */}
                        <div className="relative" onMouseEnter={() => setIsCalculatorsOpen(true)} onMouseLeave={() => setIsCalculatorsOpen(false)}>
                            <button className="px-3 py-1.5 hover:bg-red-700 rounded transition flex items-center gap-1 uppercase">
                                🧮 Calculators ▾
                            </button>
                            {isCalculatorsOpen && (
                                <div className="absolute left-0 mt-0 w-52 bg-white text-gray-900 rounded-md shadow-lg py-2 border border-gray-100 z-50 normal-case font-medium">
                                    <Link href="/calculators/salary" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        💵 Salary Calculator
                                    </Link>
                                    <Link href="/calculators/tax" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        🏛 Tax Calculator
                                    </Link>
                                    <Link href="/calculators/mortgage" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        🏠 Mortgage Calculator
                                    </Link>
                                    <Link href="/calculators/loan" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        💳 Loan Calculator
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}