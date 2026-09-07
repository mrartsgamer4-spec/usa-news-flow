'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            };
            setCurrentTime(now.toLocaleDateString('en-US', options));
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar: Time, Location, Socials */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs text-gray-600 flex flex-wrap items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">📍 New York, USA</span>
                    <span>•</span>
                    <span>{currentTime || 'Monday, May 19, 2025 | 10:24 AM EDT'}</span>
                </div>

                <div className="flex items-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-600 font-bold">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-600 font-bold">X (Twitter)</a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-600 font-bold">Instagram</a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600 font-bold">YouTube</a>
                </div>
            </div>

            {/* Main Branding Logo Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-1">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-red-600 uppercase">
                        USA NEWS <span className="text-gray-900 font-bold text-2xl sm:text-3xl">FLOW</span>
                    </span>
                </Link>
                <div className="hidden sm:block text-right text-xs text-gray-500 font-medium">
                    Your Daily Flow of U.S. News & Insights
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-red-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto">
                    <div className="flex items-center space-x-1 sm:space-x-4 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap py-3">
                        <Link href="/" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Home
                        </Link>
                        <Link href="/news/category/u-s-news" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            U.S. News
                        </Link>
                        <Link href="/news/category/politics" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Politics
                        </Link>
                        <Link href="/news/category/world" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            World
                        </Link>
                        <Link href="/news/category/business" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Business
                        </Link>
                        <Link href="/news/category/technology" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Technology
                        </Link>
                        <Link href="/news/category/health" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Health
                        </Link>
                        <Link href="/news/category/sports" className="px-3 py-1 hover:bg-red-700 rounded transition">
                            Sports
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative" onMouseEnter={() => setIsToolsOpen(true)} onMouseLeave={() => setIsToolsOpen(false)}>
                            <button className="px-3 py-1 hover:bg-red-700 rounded transition flex items-center gap-1 uppercase">
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
                                    <Link href="/tools/qr-code-generator" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
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
                            <button className="px-3 py-1 hover:bg-red-700 rounded transition flex items-center gap-1 uppercase">
                                🧮 Calculators ▾
                            </button>
                            {isCalculatorsOpen && (
                                <div className="absolute left-0 mt-0 w-52 bg-white text-gray-900 rounded-md shadow-lg py-2 border border-gray-100 z-50 normal-case font-medium">
                                    <Link href="/calculators/salary-calculator" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        💵 Salary Calculator
                                    </Link>
                                    <Link href="/calculators/tax-calculator" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        🏛 Tax Calculator
                                    </Link>
                                    <Link href="/calculators/mortgage-calculator" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
                                        🏠 Mortgage Calculator
                                    </Link>
                                    <Link href="/calculators/loan-calculator" className="block px-4 py-2 hover:bg-red-50 hover:text-red-600">
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