import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    metadataBase: new URL('https://usanewsflow.com'),
    title: {
        default: 'USA News Flow | Latest Breaking News & Updates',
        template: '%s | USA News Flow',
    },
    description: 'Stay updated with the latest breaking news, politics, business, technology, and world updates from USA News Flow.',
    keywords: ['USA News', 'Breaking News', 'Latest News', 'US Politics', 'Tech News', 'Finance News'],
    authors: [{ name: 'USA News Flow Team' }],
    creator: 'USA News Flow',
    publisher: 'USA News Flow',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const siteUrl = 'https://usanewsflow.com';

    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'USA News Flow',
        url: siteUrl,
        logo: `${siteUrl}/globe.svg`,
        sameAs: [],
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
                />
            </head>
            <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}