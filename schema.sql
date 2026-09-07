-- 1. Upgrade Articles Table with SEO & Source Attribution Fields
ALTER TABLE articles ADD COLUMN image_alt TEXT;
ALTER TABLE articles ADD COLUMN image_caption TEXT;
ALTER TABLE articles ADD COLUMN subcategory TEXT;
ALTER TABLE articles ADD COLUMN source_name TEXT;
ALTER TABLE articles ADD COLUMN source_url TEXT;
ALTER TABLE articles ADD COLUMN meta_title TEXT;
ALTER TABLE articles ADD COLUMN meta_description TEXT;
ALTER TABLE articles ADD COLUMN canonical_url TEXT;

-- 2. Upgrade Authors Table with Detailed Author Fields
CREATE TABLE IF NOT EXISTS authors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    bio TEXT,
    avatar TEXT,
    role TEXT DEFAULT 'Staff Writer',
    email TEXT,
    website TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Performance Indexes for D1 SQL Query Optimization
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_subcategory ON articles(subcategory, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors(slug);

-- 4. Automatic updated_at Trigger for Content Edits
CREATE TRIGGER IF NOT EXISTS update_articles_timestamp 
AFTER UPDATE ON articles
FOR EACH ROW
BEGIN
    UPDATE articles SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;