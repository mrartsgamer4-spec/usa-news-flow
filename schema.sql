-- Authors Table
CREATE TABLE IF NOT EXISTS authors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    bio TEXT,
    photo_url TEXT,
    twitter_handle TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    image_alt TEXT,
    image_caption TEXT,
    author_id TEXT REFERENCES authors(id),
    status TEXT CHECK(status IN ('draft', 'published', 'archived')) DEFAULT 'published',
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    source_name TEXT,
    source_url TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Automatic Updated At Trigger
CREATE TRIGGER IF NOT EXISTS update_articles_timestamp 
AFTER UPDATE ON articles
BEGIN
    UPDATE articles SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Indexing
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);

-- Seed Data (Test Articles)
INSERT INTO authors (id, name, slug) 
VALUES ('auth_1', 'Editorial Team', 'editorial-team')
ON CONFLICT(id) DO NOTHING;

INSERT INTO articles (id, title, slug, category, excerpt, content, author_id, status) 
VALUES (
    'art_1', 
    'Federal Reserve Signals Interest Rate Pause Amid Steady Growth', 
    'fed-keeps-interest-rates-steady', 
    'business', 
    'The Federal Reserve maintained interest rates at current levels during today meeting.', 
    'Full article content goes here...', 
    'auth_1', 
    'published'
)
ON CONFLICT(id) DO NOTHING;