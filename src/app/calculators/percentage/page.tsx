'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Percent } from 'lucide-react';

export default function PercentageCalculator() {
    const [percent, setPercent] = useState<number>(15);
    const [total, setTotal] = useState<number>(200);

    const result = (percent / 100) * total;

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Percent className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">PERCENTAGE CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Quickly calculate percentage values</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-6 border rounded-lg">
                    <span className="text-sm font-bold text-gray-700">What is</span>
                    <input type="number" value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-20 border rounded px-2 py-1 text-center font-bold" />
                    <span className="text-sm font-bold text-gray-700">% of</span>
                    <input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} className="w-28 border rounded px-2 py-1 text-center font-bold" />
                    <span className="text-sm font-bold text-gray-700">=</span>
                    <span className="text-2xl font-bold text-news-red">{result.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}