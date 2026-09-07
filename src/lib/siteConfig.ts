export const siteConfig = {
    name: "USA News Flow",
    description: "Latest breaking news, politics, business, technology, sports, and world updates.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://usanewsflow.com",
    ogImage: "https://usanewsflow.com/og-image.png",
    publisher: "USA News Flow Media",
    locale: "en_US",
    twitterHandle: "@usanewsflow",
    links: {
        twitter: "https://twitter.com/usanewsflow",
        facebook: "https://facebook.com/usanewsflow",
    },
};

export const getCanonicalUrl = (path: string = "") => {
    const cleanedPath = path.startsWith("/") ? path : `/${path}`;
    return `${siteConfig.url}${cleanedPath}`;
};