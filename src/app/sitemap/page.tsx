import Link from "next/link";
import {
    Map,
    Globe,
    Wrench,
    Calculator as CalcIcon,
    ShieldAlert,
    ExternalLink,
    ChevronRight
} from "lucide-react";

const SITEMAP_DATA = [
    {
        category: "Main Pages & News Categories",
        icon: Globe,
        links: [
            { name: "Home", href: "/" },
            { name: "U.S. News", href: "/news/category/us-news" },
            { name: "Politics", href: "/news/category/politics" },
            { name: "World News", href: "/news/category/world" },
            { name: "Business", href: "/news/category/business" },
            { name: "Technology", href: "/news/category/tech" },
            { name: "Health", href: "/news/category/health" },
            { name: "Sports", href: "/news/category/sports" },
        ]
    },
    {
        category: "Sub-Categories",
        icon: ChevronRight,
        links: [
            { name: "Breaking News (U.S.)", href: "/news/category/us-news?sub=breaking-news" },
            { name: "White House (Politics)", href: "/news/category/politics?sub=white-house" },
            { name: "Congress (Politics)", href: "/news/category/congress" },
            { name: "Elections (Politics)", href: "/news/category/elections" },
            { name: "AI News (Tech)", href: "/news/category/tech?sub=ai-news" },
            { name: "Cyber Security (Tech)", href: "/news/category/tech?sub=cyber-security" },
            { name: "Cricket (Sports)", href: "/news/category/sports?sub=cricket" },
            { name: "Football (Sports)", href: "/news/category/sports?sub=football" },
        ]
    },
    {
        category: "Useful Online Tools",
        icon: Wrench,
        links: [
            { name: "Tools Directory", href: "/tools" },
            { name: "Image to PDF", href: "/tools/image-to-pdf" },
            { name: "PDF to Image", href: "/tools/pdf-to-image" },
            { name: "QR Code Generator", href: "/tools/qr-code" },
            { name: "Word to PDF", href: "/tools/word-to-pdf" },
        ]
    },
    {
        category: "Calculators",
        icon: CalcIcon,
        links: [
            { name: "Calculators Directory", href: "/calculators" },
            { name: "Salary Calculator", href: "/calculators/salary" },
            { name: "Tax Calculator", href: "/calculators/tax" },
            { name: "Mortgage Calculator", href: "/calculators/mortgage" },
            { name: "Loan Calculator", href: "/calculators/loan" },
            { name: "Percentage Calculator", href: "/calculators/percentage" },
        ]
    },
    {
        category: "Policies & Information",
        icon: ShieldAlert,
        links: [
            { name: "About Us", href: "/about-us" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Use", href: "/terms-of-use" },
            { name: "Editorial Policy", href: "/editorial-policy" },
            { name: "Advertising Policy", href: "/advertising-policy" },
            { name: "Corrections Policy", href: "/corrections-policy" },
            { name: "RSS Feeds", href: "/rss-feeds" },
            { name: "Contact Us", href: "/contact" },
        ]
    }
];

export default function SitemapPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-3 border-t-4 border-t-news-red">
                    <div className="inline-flex items-center gap-2 text-news-red font-bold text-xs uppercase tracking-wider">
                        <Map size={16} /> Site Navigation Architecture
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                        Sitemap
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Find everything on USA News Flow. Below is an organized index of all our news categories, interactive calculators, online tools, and policy guidelines.
                    </p>
                </div>

                {/* Sitemap Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SITEMAP_DATA.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <div className="p-2 bg-red-50 text-news-red rounded-lg">
                                        <Icon size={18} />
                                    </div>
                                    <h2 className="font-serif font-bold text-gray-900 text-base">
                                        {section.category}
                                    </h2>
                                </div>

                                <ul className="space-y-2">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-xs text-gray-600 hover:text-news-red hover:underline flex items-center justify-between group py-1"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform inline-block">
                                                    {link.name}
                                                </span>
                                                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-news-red" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}