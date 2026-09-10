-- Create Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  role TEXT
);

-- Create Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  featured_image TEXT,
  image_alt TEXT,
  image_caption TEXT,
  author_id TEXT,
  author TEXT DEFAULT 'Editorial Team',
  author_slug TEXT,
  status TEXT DEFAULT 'published',
  published_at TEXT NOT NULL,
  updated_at TEXT,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  source_name TEXT,
  source_url TEXT,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);