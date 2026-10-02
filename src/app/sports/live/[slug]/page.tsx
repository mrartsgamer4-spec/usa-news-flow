'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export const runtime = 'edge';

export default function DynamicMatchPage() {
  useEffect(() => {
    const container = document.getElementById('specific-match-widget');
    if (!container) return;

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'widget-3kcvmur7ewbk';
    widgetDiv.className = 'scoreaxis-widget';
    widgetDiv.style.cssText =
      'width: auto; height: auto; font-size: 14px; background-color: #ffffff; color: #141416; border: 1px solid #ecf1f7; overflow: auto;';

    const script = document.createElement('script');
    script.src =
      'https://widgets.scoreaxis.com/api/football/live-match/6a6d3a8951fdd6f30e0dc946?widgetId=3kcvmur7ewbk&lang=en&lineupsBlock=1&eventsBlock=1&statsBlock=1&links=1&noFollowLinks=0&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%23ffffff&textColor=%23141416&linkColor=%23141416&borderColor=%23ecf1f7&tabColor=%23f3f8fd';
    script.async = true;

    const linkDiv = document.createElement('div');
    linkDiv.className = 'widget-main-link';
    linkDiv.style.cssText = 'padding: 6px 12px; font-weight: 500;';
    linkDiv.innerHTML =
      'Live data by <a href="https://www.scoreaxis.com/" style="color: inherit;" target="_blank" rel="noopener noreferrer">Scoreaxis</a>';

    widgetDiv.appendChild(script);
    widgetDiv.appendChild(linkDiv);
    container.appendChild(widgetDiv);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ব্যাক বাটন */}
      <div className="mb-6">
        <Link
          href="/news/category/sports"
          className="inline-flex items-center gap-2 text-sm text-red-600 font-semibold hover:underline"
        >
          ← Back to Sports Category
        </Link>
      </div>

      {/* হেডার সেকশন */}
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
          Live Match Score & Coverage
        </h1>
        <p className="text-gray-600 text-sm">
          Real-time commentary, scoreline, team stats, and instant match updates.
        </p>
      </div>

      {/* কাস্টম স্কোরঅ্যাক্সিস উইজেট */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-8">
        <div id="specific-match-widget" className="w-full min-h-[300px]" />
      </div>

      {/* এসইও / কন্টেন্ট */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-gray-700 text-sm leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-gray-800">
          About Live Sports Coverage
        </h2>
        <p>
          Welcome to USA News Flow live match center. Stay tuned for real-time scores, team lineups, match events, and statistics.
        </p>
      </div>
    </main>
  );
}
