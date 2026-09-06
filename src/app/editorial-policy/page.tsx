import Link from "next/link";
import { Shield, CheckCircle2, AlertCircle, RefreshCw, Eye, Scale } from "lucide-react";

export default function EditorialPolicyPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Header */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-3 border-t-4 border-t-news-red">
                    <div className="inline-flex items-center gap-2 text-news-red font-bold text-xs uppercase tracking-wider">
                        <Shield size={16} /> Trust & Standards
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                        Editorial Policy
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        At USA News Flow, our commitment is to provide accurate, fair, independent, and transparent journalism to our readers across North America and worldwide.
                    </p>
                </div>

                {/* Policy Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 text-gray-900 font-bold font-serif text-lg">
                            <CheckCircle2 size={20} className="text-news-red" /> Accuracy & Fact-Checking
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            We uphold strict fact-checking protocols. Every news item, statistics, and quote is verified through multiple reliable sources before publication to maintain integrity.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 text-gray-900 font-bold font-serif text-lg">
                            <Scale size={20} className="text-news-red" /> Impartiality & Independence
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Our newsroom operates independently from advertisers, political entities, or special interest groups. We present unbiased information without taking political sides.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 text-gray-900 font-bold font-serif text-lg">
                            <Eye size={20} className="text-news-red" /> Sources & Verification
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            We prioritize named sources over anonymous ones. When anonymous sources are required for protection, we verify information with secondary documentary proof.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 text-gray-900 font-bold font-serif text-lg">
                            <RefreshCw size={20} className="text-news-red" /> Corrections & Transparency
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Errors are corrected promptly and transparently. When a substantive mistake occurs, we update the article and clearly note the correction for our readers.
                        </p>
                    </div>

                </div>

                {/* Deep Dive Content */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6 text-gray-700 text-sm leading-relaxed">
                    <h2 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">
                        Detailed Editorial Standards
                    </h2>

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900">1. Originality and Plagiarism</h3>
                        <p>
                            USA News Flow has a zero-tolerance policy for plagiarism. All published content must be original, and attribution is always given when referencing external reporting or data.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900">2. Opinion vs. Fact Identification</h3>
                        <p>
                            We clearly distinguish between objective news reporting, commentary, and opinion pieces. Opinion or analysis content is explicitly tagged so readers can easily differentiate it from factual news updates.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900">3. Artificial Intelligence Guidelines</h3>
                        <p>
                            While we utilize technological tools for efficiency (such as document tools or formatting), our news reports are written, reviewed, and fact-checked by human journalists to ensure tone, ethics, and contextual accuracy.
                        </p>
                    </div>
                </div>

                {/* Contact/Feedback Box */}
                <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={24} className="text-news-red shrink-0" />
                        <div>
                            <h4 className="font-bold text-sm">Spotted an error or have feedback?</h4>
                            <p className="text-xs text-gray-400">Let our editorial desk know so we can investigate and correct it.</p>
                        </div>
                    </div>
                    <Link
                        href="/corrections-policy"
                        className="shrink-0 bg-news-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded transition"
                    >
                        Submit Correction
                    </Link>
                </div>

            </div>
        </div>
    );
}