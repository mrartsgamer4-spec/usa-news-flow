import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/**
 * Enable Cloudflare bindings during local development.
 *
 * This allows getRequestContext().env.DB
 * to work when running:
 *
 * npm run dev
 */
if (process.env.NODE_ENV === 'development') {
    setupDevPlatform().catch((error) => {
        console.error(
            'Cloudflare dev platform setup failed:',
            error
        );
    });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},

    serverExternalPackages: ['canvas'],

    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        return config;
    },
};

export default nextConfig;