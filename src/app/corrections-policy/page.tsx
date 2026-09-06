import Link from "next/link";
import { RefreshCw, CheckCircle2, FileText, Send } from "lucide-react";

export default function CorrectionsPolicyPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-3 border-t-4 border-t-news-red">
                    <div className="inline-flex items-center gap-2 text-news-red font-bold text-xs uppercase tracking-wider">
                        <RefreshCw size={16} /> Accuracy Commitment
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                        Corrections Policy
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        While we strive for 100% accuracy in every news piece we publish, errors occasionally happen. When mistakes occur, USA News Flow is committed to correcting them quickly, transparently, and noticeably.
                    </p>
                </div>

                {/* Standard Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 font-bold font-serif text-gray-900">
                            <CheckCircle2 size={18} className="text-news-red" /> Substantive Errors
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            When a factual error significantly changes the meaning of a story, we update the article and add a clear **"Correction Note"** at the bottom explaining what was changed and when.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-2">
                        <div className="flex items-center gap-2 font-bold font-serif text-gray-900">
                            <FileText size={18} className="text-news-red" /> Minor Fixes
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Minor typographical errors, spelling mistakes, or grammatical tweaks that do not alter the facts are corrected directly without a formal correction tag.
                        </p>
                    </div>
                </div>

                {/* Submission Form Section */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-gray-900">Report an Error</h2>
                        <p className="text-xs text-gray-500 mt-1">Found a factual mistake in one of our stories? Let our editorial desk review it.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-news-red"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-news-red"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Article URL / Title</label>
                            <input
                                type="text"
                                placeholder="https://usanewsflow.com/news/..."
                                className="w-full text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-news-red"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Description of the Error</label>
                            <textarea
                                rows={4}
                                placeholder="Please describe the mistake and provide a reliable source if available..."
                                className="w-full text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-news-red"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-news-red hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded transition inline-flex items-center gap-2"
                        >
                            <Send size={14} /> Submit Correction Request
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}