'use client';

import { useEffect } from 'react';

export default function LiveScore() {
  useEffect(() => {
    const container = document.getElementById('scoreaxis-widget-container');
    if (!container) return;

    // Clear any previous script or content
    container.innerHTML = '';

    // Create wrapper div
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'widget-n4blmur4evz4';
    widgetDiv.className = 'scoreaxis-widget';
    widgetDiv.style.cssText =
      'width: auto; height: auto; font-size: 14px; background-color: #ffffff; color: #141416; border: 1px solid #ecf1f7; overflow: auto;';

    // Create script element
    const script = document.createElement('script');
    script.src =
      'https://widgets.scoreaxis.com/api/football/live-match/6a6d3a8951fdd6f30e0dc946?widgetId=n4blmur4evz4&lang=en&lineupsBlock=1&eventsBlock=0&statsBlock=0&links=0&noFollowLinks=0&font=heebo&fontSize=14&rowDensity=100&widgetWidth=auto&widgetHeight=auto&bodyColor=%23ffffff&textColor=%23141416&linkColor=%23141416&borderColor=%23ecf1f7&tabColor=%23f3f8fd';
    script.async = true;

    // Create footer link div
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
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Live Sports Score
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-medium">Real-time Updates</span>
      </div>

      {/* ScoreAxis Dynamic Script Container */}
      <div id="scoreaxis-widget-container" className="w-full min-h-[300px]" />
    </div>
  );
}
