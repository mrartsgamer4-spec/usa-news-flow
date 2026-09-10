import Link from "next/link";
import Image from "next/image";
import { Clock, Sun, ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="bg-[#f8f9fa] min-h-screen py-6">
            <div className="max-w-7xl mx-auto px-4 space-y-8">

                {/* ================= HERO SECTION ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Hero Banner (Left 6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                        <div className="relative h-[320px] md:h-[420px] w-full">
                            <Image
                                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"
                                alt="U.S. House Passes Major Infrastructure Bill"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                                <span className="bg-red-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded w-fit mb-3 tracking-wider">
                                    Politics
                                </span>
                                <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2 hover:underline cursor-pointer">
                                    U.S. House Passes Major Infrastructure Bill in Bipartisan Vote
                                </h1>
                                <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                                    The $1.2 trillion bill aims to modernize roads, bridges, and public transportation across the country.
                                </p>
                                <div className="flex items-center text-xs text-gray-300 gap-1.5">
                                    <Clock size={14} />
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Hero List (Middle 3 Cols) */}
                    <div className="lg:col-span-3 space-y-4">

                        {/* Item 1 */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80" alt="News" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">BUSINESS</span>
                                    <h3 className="text-xs font-bold line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 leading-snug mt-0.5">
                                        Stock Markets Rally After Positive Inflation Report
                                    </h3>
                                </div>
                                <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                    <Clock size={12} />
                                    <span>1 hour ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=300&q=80" alt="News" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">SPORTS</span>
                                    <h3 className="text-xs font-bold line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 leading-snug mt-0.5">
                                        Lakers Win Thriller Game 7, Advance to Conference Finals
                                    </h3>
                                </div>
                                <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                    <Clock size={12} />
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80" alt="News" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">TECH</span>
                                    <h3 className="text-xs font-bold line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 leading-snug mt-0.5">
                                        Apple Unveils New iPhone 16 Series with AI Features
                                    </h3>
                                </div>
                                <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                    <Clock size={12} />
                                    <span>3 hours ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" alt="News" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">HEALTH</span>
                                    <h3 className="text-xs font-bold line-clamp-2 hover:text-red-600 cursor-pointer text-gray-900 leading-snug mt-0.5">
                                        CDC Reports Decline in Flu Cases Across the U.S.
                                    </h3>
                                </div>
                                <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                    <Clock size={12} />
                                    <span>4 hours ago</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar Widget Area (Right 3 Cols) */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Breaking News Feed */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between border-b pb-2 mb-3">
                                <span className="bg-red-600 text-white text-[11px] font-black uppercase px-2 py-0.5 rounded tracking-wide">
                                    BREAKING NEWS
                                </span>
                            </div>

                            <div className="space-y-3.5 divide-y divide-gray-100">
                                <div className="pt-1">
                                    <span className="text-[11px] font-bold text-red-600">10:15 AM</span>
                                    <p className="text-xs text-gray-800 font-medium hover:text-red-600 cursor-pointer leading-snug mt-0.5">
                                        Supreme Court Issues Ruling on Tech Regulation Case
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <span className="text-[11px] font-bold text-red-600">09:45 AM</span>
                                    <p className="text-xs text-gray-800 font-medium hover:text-red-600 cursor-pointer leading-snug mt-0.5">
                                        Federal Reserve Hints at Possible Interest Rate Cut Next Month
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <span className="text-[11px] font-bold text-red-600">09:30 AM</span>
                                    <p className="text-xs text-gray-800 font-medium hover:text-red-600 cursor-pointer leading-snug mt-0.5">
                                        SpaceX Successfully Launches Next-Gen Satellite Series
                                    </p>
                                </div>
                            </div>

                            <Link href="/news" className="text-red-600 text-xs font-bold flex items-center gap-1 mt-4 hover:underline">
                                View All Breaking News <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Weather Widget */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                                WEATHER – NEW YORK
                            </span>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Sun className="w-10 h-10 text-amber-500" />
                                    <div>
                                        <div className="text-2xl font-black text-gray-900">18°C</div>
                                        <div className="text-xs text-gray-500 font-medium">Cloudy</div>
                                    </div>
                                </div>
                                <div className="text-[11px] text-gray-500 text-right space-y-0.5">
                                    <div>Humidity: 72%</div>
                                    <div>Wind: 12 km/h</div>
                                    <div>Feels like: 17°C</div>
                                </div>
                            </div>
                            <Link href="#" className="text-red-600 text-xs font-bold flex items-center justify-end gap-1 mt-3 hover:underline">
                                View Full Forecast <ArrowRight size={12} />
                            </Link>
                        </div>

                    </div>

                </div>

                {/* ================= SECOND SECTION: TOP STORIES & POPULAR ARTICLES ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">

                    {/* TOP STORIES (Left 8 Cols) */}
                    <div className="lg:col-span-8">
                        <div className="border-b-2 border-red-600 pb-1 mb-4 flex items-center">
                            <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">
                                TOP STORIES
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                            {/* Card 1 */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="relative h-28 w-full">
                                        <Image src="https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=400&q=80" alt="News" fill className="object-cover" />
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                            U.S. NEWS
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                            Memorial Day Events Honoring Our Heroes Across the Nation
                                        </h3>
                                    </div>
                                </div>
                                <div className="px-3 pb-3 flex items-center text-[10px] text-gray-500 gap-1">
                                    <Clock size={12} />
                                    <span>5 hours ago</span>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="relative h-28 w-full">
                                        <Image src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80" alt="News" fill className="object-cover" />
                                        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                            WORLD
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                            G7 Leaders Meet to Discuss Global Economic Challenges
                                        </h3>
                                    </div>
                                </div>
                                <div className="px-3 pb-3 flex items-center text-[10px] text-gray-500 gap-1">
                                    <Clock size={12} />
                                    <span>6 hours ago</span>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="relative h-28 w-full">
                                        <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" alt="News" fill className="object-cover" />
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                            BUSINESS
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                            Wall Street Ends Higher as Tech Stocks Lead Market Gains
                                        </h3>
                                    </div>
                                </div>
                                <div className="px-3 pb-3 flex items-center text-[10px] text-gray-500 gap-1">
                                    <Clock size={12} />
                                    <span>7 hours ago</span>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="relative h-28 w-full">
                                        <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" alt="News" fill className="object-cover" />
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                            TECH
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                            OpenAI Launches New AI Model for Business Solutions
                                        </h3>
                                    </div>
                                </div>
                                <div className="px-3 pb-3 flex items-center text-[10px] text-gray-500 gap-1">
                                    <Clock size={12} />
                                    <span>8 hours ago</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* POPULAR ARTICLES (Right 4 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="border-b-2 border-red-600 pb-1 mb-4 flex items-center">
                            <h2 className="text-base font-extrabold text-gray-900 uppercase tracking-wider">
                                POPULAR ARTICLES
                            </h2>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-4">

                            {/* Item 1 */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    1
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                        How the New Tax Plan Will Affect American Families
                                    </h3>
                                    <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                        <Clock size={11} />
                                        <span>12 hours ago</span>
                                    </div>
                                </div>
                                <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=200&q=80" alt="Popular" fill className="object-cover" />
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center gap-3 border-t pt-3">
                                <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    2
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                        5 Things to Know About the U.S. Job Market in 2026
                                    </h3>
                                    <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                        <Clock size={11} />
                                        <span>14 hours ago</span>
                                    </div>
                                </div>
                                <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80" alt="Popular" fill className="object-cover" />
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center gap-3 border-t pt-3">
                                <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    3
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xs font-bold text-gray-900 hover:text-red-600 cursor-pointer leading-snug">
                                        Best National Parks to Visit This Summer
                                    </h3>
                                    <div className="flex items-center text-[10px] text-gray-500 gap-1 mt-1">
                                        <Clock size={11} />
                                        <span>16 hours ago</span>
                                    </div>
                                </div>
                                <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=200&q=80" alt="Popular" fill className="object-cover" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}