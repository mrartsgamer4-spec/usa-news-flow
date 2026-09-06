'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function LoanCalculator() {
    const [amount, setAmount] = useState<number>(20000);
    const [rate, setRate] = useState<number>(7.5);
    const [years, setYears] = useState<number>(5);

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <CreditCard className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">LOAN & EMI CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Calculate personal or auto loan monthly payments</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Loan Amount ($)</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Term (Years)</label>
                            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-6 space-y-3">
                        <span className="text-xs font-bold uppercase text-gray-500">Monthly Payment</span>
                        <p className="text-3xl font-bold text-news-red">${monthlyPayment.toFixed(2)}</p>
                        <div className="border-t pt-2 text-xs space-y-1 text-gray-600">
                            <div className="flex justify-between"><span>Total Interest:</span> <span className="font-bold">${totalInterest.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Total Amount Paid:</span> <span className="font-bold">${totalPayment.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}