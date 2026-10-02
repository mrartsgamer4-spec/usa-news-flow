'use client';

import { use } from 'react';
import Link from 'next/link';

// Cloudflare Pages এর জন্য Edge Runtime কনফিগারেশন
export const runtime = 'edge';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function DynamicMatchPage({ params }: PageProps) {
  // Next.js 15/16 এর জন্য use() hook
  const resolvedParams = use(params);
  const matchSlug = resolvedParams.slug;

  // স্লাগ থেকে ম্যাচের নাম সুন্দর করে দেখানোর জন্য
  const matchTitle = matchSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ব্যাক নেভিগেশন */}
      <div className="mb-6">
        <Link
          href="/news/category/sports"
          className="inline-flex items-center gap-2 text-sm text-red-600 font-semibold hover:underline"
        >
          ← Back to Sports Category
        </Link>
      </div>

      {/* ম্যাচ হেডার সেকশন */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Live Match Center
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {matchTitle} Live Score & Updates
        </h1>
        <p className="text-gray-600 text-sm">
          Real-time commentary, scoreline, team stats, and instant match updates for {matchTitle}.
        </p>
      </div>

      {/* লাইভ স্কোর উইজেট */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm mb-8 overflow-hidden">
        <iframe
          src="https://www.scoreaxis.com/widget/live-scores?autoHeight=0&font=Helvetica"
          className="w-full h-[550px] border-0 rounded-md"
          title={`${matchTitle} Live Score`}
          loading="lazy"
        />
      </div>

      {/* অ্যাডসেন্স এবং এসইও কন্টেন্ট */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-gray-700 text-sm leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-gray-800">
          About {matchTitle} Live Coverage
        </h2>
        <p>
          Welcome to USA News Flow live coverage of {matchTitle}. Stay tuned for live minute-by-minute updates, goals, possession stats, and key match highlights as they unfold in real time.
        </p>
        <p>
          Our live sports center aggregates instant data to keep fans updated with accurate scoreboards, tournament rankings, and fixtures across major worldwide sports events.
        </p>
      </div>
    </main>
  );
}
