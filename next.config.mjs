import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

// Development এনামেন্টে Cloudflare platform সেটআপ
if (process.env.NODE_ENV === 'development') {
    setupDevPlatform().catch((err) => console.error(err));
}

export default nextConfig;