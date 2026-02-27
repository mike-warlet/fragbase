-- Migration 006: Scent of the Day (SOTD) feature
-- Date: 2026-02-27

-- SOTD table: one entry per user per day
CREATE TABLE IF NOT EXISTS sotd (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    note TEXT,
    date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);
CREATE INDEX IF NOT EXISTS idx_sotd_user ON sotd(user_id);
CREATE INDEX IF NOT EXISTS idx_sotd_date ON sotd(date);
CREATE INDEX IF NOT EXISTS idx_sotd_perfume ON sotd(perfume_id);

-- Add type column to posts for distinguishing SOTD posts from general posts
ALTER TABLE posts ADD COLUMN type TEXT DEFAULT 'general';
