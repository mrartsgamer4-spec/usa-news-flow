import React from 'react';
import Link from 'next/link';

interface NewsTickerProps {
    headlines: Array<{
        title: string;
        url: string;
    }>;
}

export default function NewsTicker({ headlines }: NewsTickerProps) {
    if (!headlines || headlines.length === 0) return null;

    return (
        <div className="bg-red-600 text-white rounded flex items-center overflow-hidden py-2 px-3 text-xs md:text-sm font-semibold shadow-xs">
            <span className="bg-black text-white px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider mr-3 shrink-0">
                BREAKING
            </span>
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center space-x-6 animate-pulse">
                    <Link
                        href={headlines[0].url}
                        className="hover:underline truncate block"
                    >
                        {headlines[0].title}
                    </Link>
                </div>
            </div>
        </div>
    );
}