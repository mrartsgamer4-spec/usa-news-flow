'use client';

export const runtime = 'edge';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
