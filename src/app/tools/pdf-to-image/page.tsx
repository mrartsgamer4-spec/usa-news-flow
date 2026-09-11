'use client';

import { useState } from 'react';
import { Download, FileText, ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';

declare global {
    interface Window {
        pdfjsLib: any;
    }
}

export default function PdfToImage() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState('');

    // নিরাপদভাবে CDN থেকে PDF.js লোড করার ফাংশন
    const loadPdfJs = async (): Promise<any> => {
        if (window.pdfjsLib) return window.pdfjsLib;

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                const pdfjs = window.pdfjsLib;
                pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve(pdfjs);
            };
            script.onerror = () => reject(new Error('Failed to load PDF engine'));
            document.head.appendChild(script);
        });
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setImages([]);
        setStatusText('Loading PDF engine...');

        try {
            const pdfjsLib = await loadPdfJs();
            setStatusText('Reading PDF file...');

            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
            const pdf = await loadingTask.promise;

            const extractedImages: string[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                setStatusText(`Rendering page ${i} of ${pdf.numPages}...`);
                const page = await pdf.getPage(i);

                // শার্প ও পরিষ্কার ইমেজের জন্য স্কেল ১.৫
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({
                        canvasContext: context,
                        viewport: viewport,
                    }).promise;

                    extractedImages.push(canvas.toDataURL('image/png'));
                }
            }

            setImages(extractedImages);
            setStatusText('');
        } catch (error) {
            console.error("PDF Processing Error:", error);
            alert("Could not extract images from this PDF. Please make sure the PDF is valid.");
            setStatusText('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#cc0000] font-bold hover:underline mb-6 uppercase"
            >
                <ArrowLeft size={14} /> Back to Tools
            </Link>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="p-2.5 bg-red-50 text-[#cc0000] rounded-xl">
                        <FileText size={26} />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">PDF TO IMAGE CONVERTER</h1>
                        <p className="text-xs text-gray-500 font-medium">Extract high-resolution images from each PDF page directly in your browser</p>
                    </div>
                </div>

                {/* ড্রপজোন */}
                <div className="border-2 border-dashed border-gray-300 hover:border-[#cc0000] rounded-2xl p-8 text-center bg-gray-50/50 transition">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                        id="pdf-input"
                        className="hidden"
                        disabled={loading}
                    />
                    <label htmlFor="pdf-input" className="cursor-pointer inline-flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-[#cc0000]">
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-800 block">
                                {loading ? 'Processing Document...' : 'Click to Upload PDF'}
                            </span>
                            <span className="text-xs text-gray-400 mt-0.5 block">Supports multi-page PDF documents</span>
                        </div>
                    </label>
                </div>

                {loading && (
                    <div className="text-center py-2">
                        <p className="text-xs font-bold text-[#cc0000] tracking-wide animate-pulse">
                            {statusText || 'Converting pages, please wait...'}
                        </p>
                    </div>
                )}

                {/* কনভার্ট করা পেজগুলোর গ্রিড */}
                {images.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase text-gray-700">Converted Pages ({images.length})</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {images.map((img, index) => (
                                <div key={index} className="border border-gray-200 p-3.5 rounded-xl text-center space-y-3 bg-white shadow-sm hover:shadow transition">
                                    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                        <img
                                            src={img}
                                            alt={`Page ${index + 1}`}
                                            className="w-full h-auto object-contain max-h-80 mx-auto"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-xs font-bold text-gray-600">Page {index + 1}</span>
                                        <a
                                            href={img}
                                            download={`document-page-${index + 1}.png`}
                                            className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-[#cc0000] hover:bg-[#b30000] text-white px-3.5 py-1.5 rounded-lg shadow-sm transition"
                                        >
                                            <Download size={13} /> Download PNG
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}