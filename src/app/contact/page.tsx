import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} editorial and support team.`,
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 border-l-4 border-red-600 pl-3">
                Contact Us
            </h1>
            <p className="text-gray-700 leading-relaxed">
                Have a news tip, correction, or general inquiry? Reach out to our newsroom directly.
            </p>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg space-y-4">
                <div>
                    <h2 className="font-bold text-gray-900">Editorial & Newsroom</h2>
                    <p className="text-sm text-gray-600">contact@usanewsflow.com</p>
                </div>
                <div>
                    <h2 className="font-bold text-gray-900">Website</h2>
                    <p className="text-sm text-gray-600">{siteConfig.url}</p>
                </div>
            </div>
        </div>
    );
}