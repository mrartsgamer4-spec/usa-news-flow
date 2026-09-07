import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `About Us | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name}, our editorial standards, mission, and newsroom team.`,
};

export default function AboutPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-gray-800">
            <h1 className="text-3xl font-extrabold text-gray-900 border-b-2 border-red-600 pb-2">
                About {siteConfig.name}
            </h1>
            <p className="text-lg leading-relaxed">
                Welcome to <strong>{siteConfig.name}</strong>, your trusted independent source for breaking news, in-depth reports, political analysis, and current events across the United States and worldwide.
            </p>

            <h2 className="text-xl font-bold text-gray-900 pt-4">Our Editorial Mission</h2>
            <p className="leading-relaxed">
                Our mission is simple: to deliver factual, objective, and timely journalism to our readers. We adhere strictly to journalistic integrity, verifying facts from primary sources before publication and maintaining absolute independence from external influences.
            </p>

            <h2 className="text-xl font-bold text-gray-900 pt-4">Newsroom Standards</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Accuracy First:</strong> Every story is double-checked for truthfulness and context.</li>
                <li><strong>Transparency:</strong> We clearly attribute sources and distinguish between news reporting and opinion pieces.</li>
                <li><strong>Accountability:</strong> When we make mistakes, we correct them swiftly and transparently.</li>
            </ul>
        </main>
    );
}