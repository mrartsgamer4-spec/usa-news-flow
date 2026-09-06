'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QRCodeGenerator() {
    const [text, setText] = useState<string>('https://usanewsflow.com');
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qrcode.png';
            a.click();
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Tools
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <QrCode className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">TEXT TO QR CODE GENERATOR</h1>
                        <p className="text-xs text-gray-500">Convert your text or link into a downloadable QR Code</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-700">Enter Text or URL</label>
                        <textarea
                            rows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your URL or text here..."
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-news-red"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-50 p-6 border rounded-lg">
                        <div ref={qrRef} className="bg-white p-3 rounded border shadow-sm">
                            <QRCodeCanvas value={text || 'USA NEWS FLOW'} size={160} level="H" />
                        </div>
                        <button
                            onClick={downloadQR}
                            className="flex items-center gap-2 bg-news-red text-white text-xs font-bold px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            <Download size={14} /> Download QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}