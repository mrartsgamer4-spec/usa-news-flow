'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function TaxCalculator() {
    const [income, setIncome] = useState<number>(85000);

    // Basic US Federal Income Tax Bracket Estimate
    let tax = 0;
    if (income > 95375) {
        tax = 16290 + (income - 95375) * 0.24;
    } else if (income > 44725) {
        tax = 5147 + (income - 44725) * 0.22;
    } else {
        tax = income * 0.12;
    }

    const effectiveRate = ((tax / income) * 100).toFixed(1);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Calculator className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">US INCOME TAX CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Estimate your federal income tax obligation</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Total Taxable Income ($)</label>
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-6 space-y-3 text-center">
                        <span className="text-xs font-bold uppercase text-gray-500">Estimated Federal Tax</span>
                        <p className="text-3xl font-bold text-news-red">${tax.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Effective Tax Rate: <span className="font-bold text-gray-800">{effectiveRate}%</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}