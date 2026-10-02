'use client';

import Link from 'next/link';

const FEATURED_MATCHES = [
  {
    id: '1',
    title: 'Brazil vs India',
    slug: 'brazil-vs-india',
    sport: 'Football',
    status: 'LIVE NOW',
    time: 'Today',
  },
  {
    id: '2',
    title: 'Argentina vs Burkina Faso',
    slug: 'argentina-vs-burkina-faso',
    sport: 'Football',
    status: 'Scheduled',
    time: 'Today 20:00 UTC',
  },
  {
    id: '3',
    title: 'Real Madrid vs Villarreal',
    slug: 'real-madrid-vs-villarreal',
    sport: 'Football',
    status: 'Upcoming',
    time: 'Tomorrow',
  },
  {
    id: '4',
    title: 'Arsenal vs River Plate',
    slug: 'arsenal-vs-river-plate',
    sport: 'Football',
    status: 'Upcoming',
    time: 'Oct 4, 2026',
  },
];

export default function LiveScore() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 my-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">
            Live Sports Dashboard
          </h3>
        </div>
        <span className="text-xs text-gray-500 font-medium">Select a match for full score</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURED_MATCHES.map((match) => (
          <div
            key={match.id}
            className="flex flex-col justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-red-300 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                  {match.sport}
                </span>
                <span
                  className={`px-2 py-0.5 rounded ${
                    match.status === 'LIVE NOW'
                      ? 'bg-red-100 text-red-600 animate-pulse'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {match.status}
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{match.title}</h4>
              <p className="text-xs text-gray-500 mb-4">{match.time}</p>
            </div>

            <Link
              href={`/sports/live/${match.slug}`}
              className="w-full text-center py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-md transition-colors"
            >
              Watch Live Score & Stats →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
