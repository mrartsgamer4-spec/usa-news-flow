'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign } from 'lucide-react';

export default function SalaryCalculator() {
    const [annualSalary, setAnnualSalary] = useState<number>(75000);
    const [filingStatus, setFilingStatus] = useState<string>('single');

    // Approximate US Tax Calculation (Federal + FICA ~ 15.3% + Estimated State)
    const ficaTax = annualSalary * 0.0765;
    const estimatedFederalTax = annualSalary > 45000 ? annualSalary * 0.12 : annualSalary * 0.10;
    const netAnnual = annualSalary - (ficaTax + estimatedFederalTax);
    const monthlyPay = netAnnual / 12;
    const biWeeklyPay = netAnnual / 26;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Calculators
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <DollarSign className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">US SALARY PAYCHECK CALCULATOR</h1>
                        <p className="text-xs text-gray-500">Estimate your take-home pay after federal & FICA taxes</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Gross Annual Salary ($)</label>
                            <input
                                type="number"
                                value={annualSalary}
                                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Filing Status</label>
                            <select
                                value={filingStatus}
                                onChange={(e) => setFilingStatus(e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-news-red"
                            >
                                <option value="single">Single</option>
                                <option value="married">Married Filing Jointly</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg p-6 space-y-3">
                        <h2 className="text-xs font-bold uppercase text-gray-500">Estimated Take-Home Pay</h2>
                        <div className="border-b pb-2">
                            <span className="text-xs text-gray-500">Bi-Weekly (Every 2 Weeks):</span>
                            <p className="text-2xl font-bold text-news-red">${biWeeklyPay.toFixed(2)}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500">Monthly Paycheck:</span>
                            <p className="text-lg font-bold text-gray-800">${monthlyPay.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}