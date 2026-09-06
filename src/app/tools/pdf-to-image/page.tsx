'use client';

import { useState } from 'react';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PdfToImage() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setImages([]);

        try {
            const pdfjsLib = await import('pdfjs-dist');

            // Unpkg CDN Worker Setup
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const extractedImages: string[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);

                // সঠিক Aspect Ratio ধরে রাখতে স্কেল ২ ব্যবহার করা হলো
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // Canvas Dimensions
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    // Smooth image rendering context setup
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = 'high';

                    await page.render({
                        canvasContext: context,
                        viewport: viewport,
                    }).promise;

                    extractedImages.push(canvas.toDataURL('image/png'));
                }
            }

            setImages(extractedImages);
        } catch (error) {
            console.error("PDF Processing Error:", error);
            alert("Failed to process PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Tools
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <FileText className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">PDF TO IMAGE CONVERTER</h1>
                        <p className="text-xs text-gray-500">Extract all PDF pages into downloadable images</p>
                    </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input type="file" accept="application/pdf" onChange={handlePdfUpload} id="pdf-input" className="hidden" />
                    <label htmlFor="pdf-input" className="cursor-pointer inline-flex flex-col items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">Select PDF File</span>
                    </label>
                </div>

                {loading && <p className="text-center text-xs text-gray-500">Converting pages, please wait...</p>}

                {images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {images.map((img, index) => (
                            <div key={index} className="border p-3 rounded-lg text-center space-y-2 bg-gray-50">
                                <img src={img} alt={`Page ${index + 1}`} className="w-full h-auto object-contain max-h-96 mx-auto border rounded" />
                                <a
                                    href={img}
                                    download={`page-${index + 1}.png`}
                                    className="inline-flex items-center gap-1 text-xs font-bold bg-news-red text-white px-3 py-1.5 rounded"
                                >
                                    <Download size={12} /> Download Page {index + 1}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}