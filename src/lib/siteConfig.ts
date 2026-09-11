export const siteConfig = {
    name: 'USA News Flow',
    description: 'Your Daily Flow of U.S. News & Insights',
    get url() {
        if (typeof window !== 'undefined') {
            return window.location.origin;
        }
        if (process.env.NEXT_PUBLIC_SITE_URL) {
            return process.env.NEXT_PUBLIC_SITE_URL;
        }
        return 'https://usa-news-flow.pages.dev';
    },
    publisher: 'USA News Flow Editorial Team',
    twitterHandle: '@USNewsFlow',
    defaultOgImage: '/og-image.png',
    locale: 'en_US',
};