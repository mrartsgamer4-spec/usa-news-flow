/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // যেকোনো এক্সটার্নাল ইমেজের ইউআরএল এলাউ করার জন্য
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    serverExternalPackages: ["pdfjs-dist"],
};

export default nextConfig;