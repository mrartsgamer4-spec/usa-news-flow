import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seoSchemas';
import JsonLd from '@/components/seo/JsonLd';

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
        type: 'website',
        locale: siteConfig.locale || 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: `${siteConfig.url}${siteConfig.defaultOgImage || '/og-image.png'}`,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        creator: siteConfig.twitterHandle,
        images: [`${siteConfig.url}${siteConfig.defaultOgImage || '/og-image.png'}`],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const orgSchema = generateOrganizationSchema();
    const websiteSchema = generateWebSiteSchema();

    return (
        <html lang="en">
            <head>
                <JsonLd data={[orgSchema, websiteSchema]} />
            </head>
            <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}