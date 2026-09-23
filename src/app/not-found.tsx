import Link from 'next/link';

export const runtime = 'edge';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-black text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                href="/"
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
            >
                Return Home
            </Link>
        </div>
    );
}
