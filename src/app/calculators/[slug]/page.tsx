export const runtime = 'edge';

import { notFound } from 'next/navigation';
import LoanCalculator from '../loan/page';
import MortgageCalculator from '../mortgage/page';
import PercentageCalculator from '../percentage/page';
import SalaryCalculator from '../salary/page';
import TaxCalculator from '../tax/page';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DynamicCalculatorPage({ params }: Props) {
    const { slug } = await params;

    switch (slug) {
        case 'loan':
            return <LoanCalculator />;
        case 'mortgage':
            return <MortgageCalculator />;
        case 'percentage':
            return <PercentageCalculator />;
        case 'salary':
            return <SalaryCalculator />;
        case 'tax':
            return <TaxCalculator />;
        default:
            notFound();
    }
}