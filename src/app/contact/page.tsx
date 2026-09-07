import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Get in touch with the editorial team at ${siteConfig.name} for news tips, corrections, or inquiries.`,
};

export default function ContactPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                Contact Us
            </h1>
            <p className="text-lg leading-relaxed">
                We value feedback, story tips, and inquiries from our readers. Please feel free to reach out to our editorial desk.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4 max-w-xl">
                <div>
                    <h3 className="font-bold text-gray-900">Editorial Desk & News Tips</h3>
                    <p className="text-sm text-gray-600">contact@usanewsflow.com</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Corrections & Feedback</h3>
                    <p className="text-sm text-gray-600">corrections@usanewsflow.com</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Media & Business Inquiries</h3>
                    <p className="text-sm text-gray-600">publisher@usanewsflow.com</p>
                </div>
            </div>
        </main>
    );
}