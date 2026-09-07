'use client';

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageToPdf from "../image-to-pdf/page";
import PdfToImage from "../pdf-to-image/page";
import QRCodeGenerator from "../qr-code/page";
import WordToPdf from "../word-to-pdf/page";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ToolDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    // URL slug অনুযায়ী নির্দিষ্ট টুল রেন্ডার করা
    switch (slug) {
        case "image-to-pdf":
            return <ImageToPdf />;
        case "pdf-to-image":
            return <PdfToImage />;
        case "qr-code":
            return <QRCodeGenerator />;
        case "word-to-pdf":
            return <WordToPdf />;
        default:
            return (
                <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
                    <h1 className="text-xl font-bold text-gray-800">Tool Not Found</h1>
                    <p className="text-xs text-gray-500">The requested tool does not exist or has been moved.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-news-red hover:underline"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </div>
            );
    }
}
export const runtime = 'edge';