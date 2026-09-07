export interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    imageUrl?: string;
    publishedAt: string;
}

const sampleArticle: Article = {
    id: '1',
    title: 'Breaking News: Latest Updates and Developments Across the USA',
    slug: 'example-news-title',
    summary: 'Stay informed with the latest updates on current events and major stories.',
    content: '<p>This is the full article content highlighting major developments and insights.</p>',
    category: 'us-news',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f',
    publishedAt: new Date().toISOString(),
};

export const mockArticles: Article[] = [
    sampleArticle,
    { ...sampleArticle, id: '2', title: 'Technology Trends in 2026', slug: 'tech-trends-2026', category: 'technology' },
    { ...sampleArticle, id: '3', title: 'Global Market & Business Insights', slug: 'market-insights', category: 'business' },
    { ...sampleArticle, id: '4', title: 'Sports & Entertainment Highlights', slug: 'sports-highlights', category: 'sports' },
];

export const MockNewsData = {
    heroArticle: sampleArticle,
    topStories: [
        { ...sampleArticle, id: 'top-1', title: 'Top Story 1: Major Policy Changes Announced' },
        { ...sampleArticle, id: 'top-2', title: 'Top Story 2: Global Markets React to Economic Shift' },
        { ...sampleArticle, id: 'top-3', title: 'Top Story 3: Technological Breakthroughs Ahead' },
    ],
    middleArticles: [
        { ...sampleArticle, id: 'mid-1', title: 'Middle Story 1: Insights into Future Industry Growth' },
        { ...sampleArticle, id: 'mid-2', title: 'Middle Story 2: Community Development and News' },
    ],
    popularArticles: [
        { ...sampleArticle, id: 'pop-1', title: 'Popular Story 1: Trending Analysis and Opinions' },
        { ...sampleArticle, id: 'pop-2', title: 'Popular Story 2: Key Highlights of the Week' },
    ],
};