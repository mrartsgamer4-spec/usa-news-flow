'use client';

import Link from 'next/link';

export default function LiveScore() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3 my-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* লাইভ ইন্ডিকেটর ও ছোট হেডার */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-sm font-extrabold text-gray-900 tracking-wide">
            LIVE SPORTS SCORE
          </span>
        </div>

        {/* ক্লিন ছোট বাটন */}
        <Link
          href="/sports/live/today-match"
          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3 py-1.5 rounded-md transition-colors"
        >
          View Live Match Center →
        </Link>
      </div>
    </div>
  );
}
