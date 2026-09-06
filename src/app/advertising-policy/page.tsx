import Link from "next/link";
import { Megaphone, ShieldCheck, HelpCircle, DollarSign } from "lucide-react";

export default function AdvertisingPolicyPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-3 border-t-4 border-t-news-red">
                    <div className="inline-flex items-center gap-2 text-news-red font-bold text-xs uppercase tracking-wider">
                        <Megaphone size={16} /> Commercial Transparency
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                        Advertising Policy
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        USA News Flow accepts advertising to support our newsroom operations. However, we strictly maintain a clear boundary between news content and commercial interests.
                    </p>
                </div>

                {/* Policy Guidelines */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6 text-gray-700 text-sm leading-relaxed">

                    <div className="space-y-2">
                        <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-news-red" /> 1. Editorial Independence
                        </h2>
                        <p>
                            Advertisers and corporate sponsors have no influence over our editorial content, reporting decisions, or headline choices. Our journalism remains entirely objective and independent.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                            <DollarSign size={18} className="text-news-red" /> 2. Clear Labeling
                        </h2>
                        <p>
                            We ensure our readers can easily distinguish between news stories and promotional content. Any sponsored post, native ad, or paid partnership is explicitly labeled as **"Sponsored Content"**, **"Advertisement"**, or **"Paid Partner"**.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                            <HelpCircle size={18} className="text-news-red" /> 3. Prohibited Content
                        </h2>
                        <p>
                            We reserve the right to decline or remove any advertisement that promotes illegal products, hate speech, misleading claims, malware, or deceptive financial schemes.
                        </p>
                    </div>

                </div>

                {/* Contact CTA */}
                <div className="bg-[#0b1321] text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-base">Want to advertise with USA News Flow?</h3>
                        <p className="text-xs text-gray-400">Reach millions of readers across North America with transparent ad placements.</p>
                    </div>
                    <Link
                        href="/contact"
                        className="shrink-0 bg-news-red hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded transition"
                    >
                        Contact Ad Sales
                    </Link>
                </div>

            </div>
        </div>
    );
}