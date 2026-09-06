export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    category: string;
    reporterName?: string;
    publishedAt: string;
    featuredImage: string;
    caption?: string;
    content: string;
    description?: string;
}

export const MockNewsData = {
    heroArticle: {
        id: "hero-1",
        title: "Senate Advances New Spending Bill After Marathon Session and Extended Vote",
        slug: "senate-advances-new-spending-bill",
        category: "politics",
        reporterName: "Akash",
        publishedAt: "15 mins ago",
        featuredImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200",
        caption: "U.S. Capitol building during the Senate vote session.",
        content: "Lawmakers worked through the night to pass the latest fiscal agreement, addressing key infrastructure and economic priorities across multiple states."
    },

    topStories: [
        {
            id: "top-1",
            title: "Wall Street Surges as Inflation Cools More Than Expected",
            slug: "wall-street-surges-as-inflation-cools",
            category: "business",
            reporterName: "Staff Reporter",
            publishedAt: "45 mins ago",
            featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
            caption: "Trading floor active following positive economic reports.",
            content: "Stock indices reached new monthly highs following surprising drop in consumer price index data released earlier this morning."
        },
        {
            id: "top-2",
            title: "OpenAI Begins Rollout of New Powerful AI Model with Advanced Reasoning",
            slug: "openai-begins-rollout-of-new-ai-model",
            category: "technology",
            reporterName: "Staff Reporter",
            publishedAt: "1 hour ago",
            featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
            caption: "Next generation artificial intelligence architecture announced.",
            content: "The latest model demonstrates unprecedented capabilities in logic, mathematical problem solving, and complex software development tasks."
        },
        {
            id: "top-3",
            title: "New York City Invests $150M in Affordable Housing and Urban Renewal",
            slug: "nyc-invests-150m-in-affordable-housing",
            category: "us-news",
            reporterName: "Akash",
            publishedAt: "2 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
            caption: "New housing project development site in NYC.",
            content: "City leaders announced major financial commitments aimed at modernizing urban residential communities and bolstering local workforce housing."
        }
    ],

    middleArticles: [
        {
            id: "mid-1",
            title: "Federal Reserve Signals Possible Rate Adjustments Later This Year",
            slug: "fed-signals-possible-rate-adjustments",
            category: "business",
            reporterName: "Staff Reporter",
            publishedAt: "3 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
            caption: "Federal Reserve headquarters in Washington, D.C.",
            content: "Central bank officials indicated potential adjustments in monetary policy as economic indicators show sustained stability."
        },
        {
            id: "mid-2",
            title: "California Expands Clean Energy Infrastructure and Solar Grants",
            slug: "california-expands-clean-energy-infrastructure",
            category: "us-news",
            reporterName: "Akash",
            publishedAt: "4 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
            caption: "Renewable energy wind and solar farm facility.",
            content: "State officials introduced new initiatives targeting carbon neutrality through expanded public-private solar partnerships."
        },
        {
            id: "mid-3",
            title: "Bipartisan Coalition Introduces Modernized Border Security Reform Bill",
            slug: "bipartisan-coalition-introduces-border-security-reform",
            category: "politics",
            reporterName: "Staff Reporter",
            publishedAt: "5 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800",
            caption: "Congressional leaders hold press briefing on proposed legislation.",
            content: "The proposal aims to streamline processing protocols while deploying additional technological surveillance capabilities."
        }
    ],

    popularArticles: [
        {
            id: "pop-1",
            title: "Apple iPhone Lineup Leaks Reveal Major Hardware and Camera Overhauls",
            slug: "apple-iphone-lineup-leaks-reveal-major-hardware-overhauls",
            category: "technology",
            reporterName: "Staff Reporter",
            publishedAt: "6 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800",
            caption: "Smartphone design and mobile technological devices.",
            content: "Suppliers indicate significant improvements to display responsiveness and battery optimization ahead of the official autumn event."
        },
        {
            id: "pop-2",
            title: "European Union Approves Comprehensive New Framework for International Trade",
            slug: "eu-approves-comprehensive-new-framework-for-international-trade",
            category: "world",
            reporterName: "Staff Reporter",
            publishedAt: "8 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800",
            caption: "European Parliament assembly hall during policy debates.",
            content: "Member states voted overwhelmingly in favor of updated economic guidelines regulating international supply logistics."
        },
        {
            id: "pop-3",
            title: "Lakers Advance to Western Conference Finals After Thrilling Game 7 Win",
            slug: "lakers-advance-to-western-conference-finals",
            category: "sports",
            reporterName: "Akash",
            publishedAt: "10 hours ago",
            featuredImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
            caption: "Basketball action in professional playoff championship series.",
            content: "A last-second shot sealed the victory in one of the most competitive postseason matchups of the decade."
        }
    ]
};
