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

export interface NewsDataStructure {
    heroArticle: Article;
    topStories: Article[];
    middleArticles: Article[];
    popularArticles: Article[];
}

export const MockNewsData: NewsDataStructure = {
    heroArticle: {
        id: '1',
        title: 'Breaking News: Major Policy Changes Announced Across the USA',
        slug: 'breaking-news-major-policy-changes',
        summary: 'This is the lead article content highlighting recent policy changes and key national insights.',
        content: 'Full detailed content about the major policy changes announced recently across the nation...',
        category: 'politics',
        imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800',
        publishedAt: new Date().toISOString()
    },
    topStories: [
        {
            id: '2',
            title: 'Global Markets React to Economic Shifts',
            slug: 'global-markets-react-economic-shifts',
            summary: 'Financial updates and market reactions following the latest economic reports.',
            content: 'Detailed discussion regarding global market reaction, stock trends, and future predictions...',
            category: 'business',
            imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600',
            publishedAt: new Date().toISOString()
        },
        {
            id: '3',
            title: 'Technological Breakthroughs in AI for 2026',
            slug: 'technological-breakthroughs-ai-2026',
            summary: 'How recent artificial intelligence developments are reshaping industries worldwide.',
            content: 'Full analysis on the impact of AI advancements across different industry sectors...',
            category: 'technology',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
            publishedAt: new Date().toISOString()
        }
    ],
    middleArticles: [
        {
            id: '4',
            title: 'Healthcare Reforms: What Citizens Need to Know',
            slug: 'healthcare-reforms-citizens-guide',
            summary: 'A breakdown of upcoming health regulations and public benefits.',
            content: 'In-depth guide explaining how healthcare reform affects insurance and medical access...',
            category: 'health',
            imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600',
            publishedAt: new Date().toISOString()
        }
    ],
    popularArticles: [
        {
            id: '5',
            title: 'Sports Highlights: National Tournament Results',
            slug: 'sports-highlights-national-tournament',
            summary: 'Key moments and scores from the championship games this weekend.',
            content: 'Comprehensive review of top scoring plays, standout players, and championship standings...',
            category: 'sports',
            imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
            publishedAt: new Date().toISOString()
        }
    ]
};