import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/lib/siteConfig';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seoSchemas';
import JsonLd from '@/components/seo/JsonLd';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

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
        icon: [
            { url: '/icon.png?v=3', type: 'image/png' },
            { url: '/logo.png?v=3', type: 'image/png' },
        ],
        shortcut: '/icon.png?v=3',
        apple: '/icon.png?v=3',
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
                {/* সরাসরি ব্রাউজার ট্যাবে লোগো প্রদর্শনের হার্ডলিঙ্ক */}
                <link rel="icon" href="/icon.png?v=3" type="image/png" />
                <link rel="shortcut icon" href="/icon.png?v=3" type="image/png" />
                <link rel="apple-touch-icon" href="/icon.png?v=3" />
                <JsonLd data={[orgSchema, websiteSchema]} />
            </head>
            <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col antialiased text-base">
                {/* Google Analytics (gtag.js) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-MP01NK9328"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-MP01NK9328');
                    `}
                </Script>

                <Header />
                <main className="flex-grow w-full">{children}</main>
                <Footer />
            </body>
        </html>
    );
}