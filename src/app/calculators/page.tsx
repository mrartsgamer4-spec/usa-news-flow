'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function MortgageCalculator() {
    const [homeValue, setHomeValue] = useState<number>(300000);
    const [downPayment, setDownPayment] = useState<number>(60000);
    const [interestRate, setInterestRate] = useState<number>(6.5);
    const [loanTerm, setLoanTerm] = useState<number>(30);

    // Mortgage Calculation Logic
    const principal = homeValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
        monthlyRate > 0
            ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
            : principal / numberOfPayments;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <Calculator className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">MORTGAGE CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Calculate and analyze your monthly financial metrics</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Home Price ($)</label>
                            <input
                                type="number"
                                value={homeValue}
                                onChange={(e) => setHomeValue(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Down Payment ($)</label>
                            <input
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Loan Term (Years)</label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            >
                                <option value={15}>15 Years</option>
                                <option value={30}>30 Years</option>
                            </select>
                        </div>
                    </div>

                    {/* Result Output */}
                    <div className="bg-gray-50 border rounded-lg p-6 flex flex-col justify-between text-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimated Monthly Payment</span>
                        <div className="my-auto">
                            <span className="text-4xl font-bold text-news-red">${monthlyPayment.toFixed(2)}</span>
                            <span className="block text-xs text-gray-400 mt-1">/ month</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
                            <div className="flex justify-between">
                                <span>Loan Amount:</span>
                                <span className="font-bold text-gray-800">${principal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}