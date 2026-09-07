import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Editorial Policy | ${siteConfig.name}`,
};

export default function EditorialPolicyPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Editorial Policy
            </h1>
            <p className="leading-relaxed">
                At <strong>{siteConfig.name}</strong>, editorial independence, objectivity, and truthfulness guide every report we publish.
            </p>

            <h2 className="text-xl font-bold text-gray-900 pt-4">Sourcing and Verification</h2>
            <p className="leading-relaxed">
                We prioritize primary sources, public records, and verified eyewitness testimonies. Anonymous sources are used sparingly and only when revealing identities puts individuals at personal or professional risk.
            </p>

            <h2 className="text-xl font-bold text-gray-900 pt-4">Fact-Checking Standard</h2>
            <p className="leading-relaxed">
                Before any news piece goes live, its claims, quotes, statistics, and historical context undergo review by our editorial team to prevent misleading information.
            </p>
        </main>
    );
}