import Link from "next/link";
import { ShieldCheck, Globe, Users, Newspaper, Award, Target } from "lucide-react";

export default function AboutUsPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4 border-b border-gray-200 pb-8">
                    <div className="inline-flex items-center gap-2 bg-news-red/10 text-news-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Newspaper size={16} /> About USA News Flow
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900">
                        Delivering News That Matters
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
                        Your trusted source for breaking updates, accurate reporting, unbiased political news, and real-time insights across North America and the world.
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-3">
                        <div className="w-10 h-10 bg-news-red/10 text-news-red rounded-lg flex items-center justify-center">
                            <Target size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 font-serif">Our Mission</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            To empower communities through fact-checked journalism and real-time updates. We aim to keep our readers informed with speed, transparency, and uncompromising integrity.
                        </p>
                    </div>

                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 font-serif">Global Coverage</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            From Capitol Hill to international policy shifts, economics, technology trends, and daily consumer tools—we cover stories that shape our everyday life.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
                        Why Readers Trust Us
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2">
                            <ShieldCheck size={32} className="mx-auto text-news-red" />
                            <h3 className="font-bold text-gray-900 text-base">Unbiased Reporting</h3>
                            <p className="text-xs text-gray-500">We present clear facts without political editorial bias or hidden agendas.</p>
                        </div>
                        <div className="space-y-2">
                            <Users size={32} className="mx-auto text-news-red" />
                            <h3 className="font-bold text-gray-900 text-base">Dedicated Team</h3>
                            <p className="text-xs text-gray-500">Our experienced journalists and analysts verify information round-the-clock.</p>
                        </div>
                        <div className="space-y-2">
                            <Award size={32} className="mx-auto text-news-red" />
                            <h3 className="font-bold text-gray-900 text-base">Utility Tools</h3>
                            <p className="text-xs text-gray-500">Free, secure tax, salary, and document processing tools right inside our platform.</p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-[#0b1321] text-white rounded-xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-serif font-bold">Have Questions or News Tips?</h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                        Our newsroom is open 24/7. Reach out to our editorial board with feedback, tips, or press releases.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-block bg-news-red hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition"
                        >
                            Contact Our Team
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}