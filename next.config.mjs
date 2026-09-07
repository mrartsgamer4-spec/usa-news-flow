/** @type {import('next').NextConfig} */
const nextConfig = {
    // Turbopack ইগনোর অপশন
    turbopack: {},

    // Server external packages
    serverExternalPackages: ['canvas'],

    // Webpack Config
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    },
};

export default nextConfig;