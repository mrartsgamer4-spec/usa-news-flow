'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SalaryCalculator from '../salary/page';
import TaxCalculator from '../tax/page';
import MortgageCalculator from '../mortgage/page';
import LoanCalculator from '../loan/page';
import PercentageCalculator from '../percentage/page';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function CalculatorDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    switch (slug) {
        case 'salary':
            return <SalaryCalculator />;
        case 'tax':
            return <TaxCalculator />;
        case 'mortgage':
            return <MortgageCalculator />;
        case 'loan':
            return <LoanCalculator />;
        case 'percentage':
            return <PercentageCalculator />;
        default:
            return (
                <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
                    <h1 className="text-xl font-bold text-gray-800">Calculator Not Found</h1>
                    <p className="text-xs text-gray-500">Please select a valid calculator from the top navigation bar.</p>
                    <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-news-red hover:underline">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </div>
            );
    }
}