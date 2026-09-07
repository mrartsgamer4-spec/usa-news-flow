export interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
}

export const mockArticles: Article[] = [
    {
        id: '1',
        title: 'Fed Keeps Interest Rates Steady Amid Economic Growth',
        slug: 'fed-keeps-interest-rates-steady',
        summary: 'The Federal Reserve has decided to hold benchmark interest rates steady as economic indicators show balanced growth.',
        content: 'The Federal Reserve announced today that key benchmark interest rates will remain unchanged. Economists note that inflation metrics have stabilized, allowing policymakers to maintain a watchful approach while observing labor market stability and consumer spending trends across the nation.',
        category: 'business',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        author: 'Sarah Jenkins',
        publishedAt: '2026-09-07',
    },
    {
        id: '2',
        title: 'New Advances in AI and Cloud Computing Introduced',
        slug: 'new-advances-in-ai-cloud-computing',
        summary: 'Tech leaders showcase groundbreaking artificial intelligence frameworks designed to improve server efficiency and speed.',
        content: 'Major technology companies have unveiled next-generation AI automation tools aimed at enterprise infrastructure. These models optimize server power consumption while significantly increasing processing performance for cloud-native applications.',
        category: 'technology',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        author: 'David Chen',
        publishedAt: '2026-09-06',
    },
    {
        id: '3',
        title: 'National Parks See Record Visitors This Season',
        slug: 'national-parks-record-visitors-season',
        summary: 'Tourism departments report historic outdoor enthusiasm as millions visit national parks across the country.',
        content: 'Park rangers and outdoor travel organizations report unprecedented foot traffic across iconic natural landmarks this season. Conservation efforts are being scaled up to support ecosystem preservation alongside sustainable tourism management.',
        category: 'lifestyle',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        author: 'Emily Watson',
        publishedAt: '2026-09-05',
    },
];