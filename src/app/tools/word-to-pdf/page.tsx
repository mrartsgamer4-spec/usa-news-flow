'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import { FileUp, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WordToPdf() {
    const [text, setText] = useState<string>('');

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setText(event.target?.result as string || '');
            };
            reader.readAsText(file);
        }
    };

    const convertToPdf = () => {
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(text || 'Converted Document Content', 180);
        pdf.text(lines, 15, 15);
        pdf.save('document.pdf');
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Tools
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <h1 className="text-2xl font-serif font-bold text-gray-900 border-b pb-4">WORD TO PDF CONVERTER</h1>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4">
                    <input type="file" accept=".doc,.docx,.txt" onChange={handleFile} id="word-input" className="hidden" />
                    <label htmlFor="word-input" className="cursor-pointer inline-flex flex-col items-center gap-2">
                        <FileUp size={36} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-700">Upload Word/Text Document</span>
                    </label>

                    {text && (
                        <div className="pt-4 space-y-4">
                            <button
                                onClick={convertToPdf}
                                className="inline-flex items-center gap-2 bg-news-red text-white text-xs font-bold px-5 py-2.5 rounded"
                            >
                                <Download size={14} /> Download PDF
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}