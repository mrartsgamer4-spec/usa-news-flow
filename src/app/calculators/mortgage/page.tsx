'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function MortgageCalculator() {
    const [homeValue, setHomeValue] = useState<number>(350000);
    const [downPayment, setDownPayment] = useState<number>(70000);
    const [interestRate, setInterestRate] = useState<number>(6.5);
    const [loanTerm, setLoanTerm] = useState<number>(30);

    const principal = homeValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
        principal > 0 && monthlyRate > 0
            ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
            : 0;

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Home className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">US MORTGAGE CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Estimate your monthly mortgage payments and total interest</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Home Price ($)</label>
                            <input
                                type="number"
                                value={homeValue}
                                onChange={(e) => setHomeValue(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Down Payment ($)</label>
                            <input
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Loan Term (Years)</label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            >
                                <option value={15}>15-Year Fixed</option>
                                <option value={20}>20-Year Fixed</option>
                                <option value={30}>30-Year Fixed</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
                        <span className="text-xs font-bold uppercase text-gray-500">Estimated Monthly Payment</span>
                        <p className="text-3xl font-bold text-news-red">${monthlyPayment.toFixed(2)}</p>
                        <div className="border-t pt-3 text-xs space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                <span>Loan Principal Amount:</span>
                                <span className="font-bold text-gray-800">${principal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Interest Paid:</span>
                                <span className="font-bold text-gray-800">${totalInterest.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Loan Cost:</span>
                                <span className="font-bold text-gray-800">${totalPayment.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}