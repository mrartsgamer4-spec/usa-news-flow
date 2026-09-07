import { MetadataRoute } from 'next';
import { mockArticles } from '@/lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://yourwebsite.com'; // আপনার আসল ডোমেইন লিংক দিন

    // mockArticles থেকে ডাইনামিক নিউজের লিংক জেনারেট করা
    const articleUrls = (mockArticles || []).map((article) => ({
        url: `${baseUrl}/news/${article.category}/${article.slug}`,
        lastModified: new Date(article.publishedAt || Date.now()),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/terms-of-use`,
            lastModified: new Date(),
        },
        ...articleUrls,
    ];
}