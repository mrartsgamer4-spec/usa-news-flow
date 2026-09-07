import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Terms of Use | ${siteConfig.name}`,
};

export default function TermsOfUsePage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Terms of Use
            </h1>
            <p className="leading-relaxed">
                By accessing <strong>{siteConfig.name}</strong>, you agree to comply with these Terms of Use and all applicable laws and regulations.
            </p>
            <h2 className="text-xl font-bold text-gray-900 pt-4">Intellectual Property</h2>
            <p className="leading-relaxed">
                All articles, original graphics, and editorial content published on this website are protected under copyright laws. Redistribution without prior written permission is prohibited.
            </p>
        </main>
    );
}