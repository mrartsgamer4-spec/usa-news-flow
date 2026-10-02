'use client';

export default function LiveScore() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 my-6">
      {/* হেডার সেকশন */}
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

      {/* ফ্রি স্পোর্টস উইজেট (Sofascore Official Embed) */}
      <div className="w-full overflow-hidden rounded-lg min-h-[400px]">
        <iframe
          id="sofascore-embed-widget"
          src="https://widgets.sofascore.com/embed/unique-tournament/7/season/52571/widget"
          className="w-full h-[450px] border-0 rounded-md"
          title="Live Sports Score"
          loading="lazy"
        />
      </div>
    </div>
  );
}
