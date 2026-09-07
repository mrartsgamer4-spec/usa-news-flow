import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} | Latest Breaking News & Updates`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ['USA News', 'Breaking News', 'Latest News', 'US Politics', 'Tech News', 'Finance News'],
    authors: [{ name: siteConfig.publisher }],
    creator: siteConfig.publisher,
    publisher: siteConfig.publisher,
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
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: siteConfig.twitterHandle,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [
            siteConfig.links.twitter,
            siteConfig.links.facebook,
        ],
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