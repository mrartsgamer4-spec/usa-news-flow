import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Advertising Policy | ${siteConfig.name}`,
};

export default function AdvertisingPolicyPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Advertising Policy
            </h1>
            <p className="leading-relaxed">
                To maintain editorial integrity, <strong>{siteConfig.name}</strong> enforces a strict boundary between our journalism and advertising revenue.
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li>Advertisers have zero influence over editorial choices or story coverage.</li>
                <li>Sponsored content or advertorials are explicitly labeled as "Sponsored" or "Paid Content".</li>
                <li>We reserve the right to decline advertisements that contain misleading claims or unlawful material.</li>
            </ul>
        </main>
    );
}