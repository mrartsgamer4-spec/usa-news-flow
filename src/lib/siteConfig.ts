export const siteConfig = {
    name: 'USA News Flow',
    shortName: 'USA News Flow',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://usanewsflow.com',
    description: 'Your Daily Flow of U.S. News & Insights',
    locale: 'en_US',
    language: 'en-US',
    twitterHandle: '',
    logo: '/logo.png', // logo প্রপার্টি যুক্ত করা হয়েছে
    ogImage: '/og-image.jpg',
    defaultOgImage: '/og-image.jpg', // defaultOgImage প্রপার্টি যুক্ত করা হয়েছে
    publisher: 'USA News Flow Editorial Team',
    sameAs: [] as string[], // sameAs প্রপার্টি যুক্ত করা হয়েছে
    links: {
        twitter: '',
        facebook: '',
    },
};