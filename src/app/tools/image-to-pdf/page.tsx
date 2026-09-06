'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import { FileUp, Download, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ImageToPdf() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const convertToPdf = () => {
        if (!image) return;

        const img = new Image();
        img.src = image;

        img.onload = () => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // পেজের চারপাশে মার্জিন
            const margin = 10;
            const maxWidth = pdfWidth - margin * 2;
            const maxHeight = pdfHeight - margin * 2;

            // আসল অনুপাত (Aspect Ratio) ধরে রাখা
            let imgWidth = maxWidth;
            let imgHeight = (img.height * imgWidth) / img.width;

            // যদি ইমেজ পেজের হাইটের চেয়ে বড় হয়ে যায়, তবে স্কেল ডাউন করা
            if (imgHeight > maxHeight) {
                imgHeight = maxHeight;
                imgWidth = (img.width * imgHeight) / img.height;
            }

            // ইমেজে যেন চ্যাপ্টা না হয়ে সেন্টারে থাকে
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;

            pdf.addImage(image, 'JPEG', x, y, imgWidth, imgHeight);
            pdf.save('converted-document.pdf');
        };
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-news-red font-bold hover:underline mb-6">
                <ArrowLeft size={14} /> Back to Tools
            </Link>

            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                    <ImageIcon className="text-news-red" size={28} />
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">IMAGE TO PDF CONVERTER</h1>
                        <p className="text-xs text-gray-500">Upload JPG or PNG and convert to PDF instantly</p>
                    </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4">
                    <input type="file" accept="image/*" onChange={handleImageUpload} id="img-input" className="hidden" />
                    <label htmlFor="img-input" className="cursor-pointer inline-flex flex-col items-center gap-2">
                        <FileUp size={36} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-700">Click to upload an image</span>
                    </label>

                    {image && (
                        <div className="space-y-4 pt-4">
                            <img src={image} alt="Preview" className="max-h-48 mx-auto rounded border shadow-sm" />
                            <button
                                onClick={convertToPdf}
                                className="inline-flex items-center gap-2 bg-news-red text-white text-xs font-bold px-5 py-2.5 rounded hover:bg-red-700 transition"
                            >
                                <Download size={14} /> Convert & Download PDF
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}