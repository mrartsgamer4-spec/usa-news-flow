import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Corrections Policy | ${siteConfig.name}`,
};

export default function CorrectionsPolicyPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Corrections Policy
            </h1>
            <p className="leading-relaxed">
                <strong>{siteConfig.name}</strong> is committed to accuracy. When factual errors occur, we correct them promptly, clearly, and transparently.
            </p>

            <h2 className="text-xl font-bold text-gray-900 pt-4">How We Handle Corrections</h2>
            <p className="leading-relaxed">
                Substantive factual corrections in articles will include an explicit correction note at the bottom of the article page explaining what was corrected and when. Minor typos or spelling errors are corrected directly without formal disclosure.
            </p>

            <p className="text-sm text-gray-600 pt-2">
                To report a factual error, please email us at <strong>corrections@usanewsflow.com</strong> with the article link and details.
            </p>
        </main>
    );
}