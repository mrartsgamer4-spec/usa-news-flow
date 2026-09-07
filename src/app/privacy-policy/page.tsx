import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Privacy Policy | ${siteConfig.name}`,
};

export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Privacy Policy
            </h1>
            <p className="leading-relaxed">
                At <strong>{siteConfig.name}</strong>, accessible from {siteConfig.url}, your privacy is paramount. This policy outlines the limited data we collect and how it is used to deliver site performance and analytics.
            </p>
            <h2 className="text-xl font-bold text-gray-900 pt-4">Analytics & Cookies</h2>
            <p className="leading-relaxed">
                We use standard web analytics to understand readership trends without selling personal reader data to third parties.
            </p>
        </main>
    );
}