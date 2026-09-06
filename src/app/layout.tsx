import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://usanewsflow.com"),
    title: {
        default: "USA NEWS FLOW - Your Daily Flow of U.S. News & Insights",
        template: "%s | USA News Flow",
    },
    description: "USA News Flow delivers real-time breaking news, political updates, business trends, technology insights, sports, and comprehensive global coverage across North America.",
    keywords: [
        "USA News",
        "Breaking News",
        "US Politics",
        "World News",
        "Business News",
        "Tech Updates",
        "USA News Flow",
    ],
    authors: [{ name: "USA News Flow Editorial Board" }],
    creator: "USA News Flow",
    publisher: "USA News Flow",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "USA NEWS FLOW - Real-time Breaking News & Insights",
        description: "Stay ahead with real-time coverage on U.S. politics, economy, technology, sports, and international affairs.",
        url: "https://usanewsflow.com",
        siteName: "USA News Flow",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "USA News Flow Header Banner",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "USA NEWS FLOW - Daily U.S. News & Insights",
        description: "Breaking news, political analysis, and real-time world updates.",
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
            <body className="bg-white text-news-black font-sans antialiased min-h-screen flex flex-col justify-between">
                <div>
                    <Header />
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
                <Footer />
            </body>
        </html>
    );
}