-- Migration 009: Weekly Community Challenges + Badges
-- Date: 2026-02-27

CREATE TABLE IF NOT EXISTS challenges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT DEFAULT 'weekly',
    rules TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    created_by TEXT REFERENCES users(id),
    status TEXT DEFAULT 'active',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenge_entries (
    id TEXT PRIMARY KEY,
    challenge_id TEXT NOT NULL REFERENCES challenges(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    perfume_id TEXT REFERENCES perfumes(id),
    note TEXT,
    image_url TEXT,
    votes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(challenge_id, user_id)
);

CREATE TABLE IF NOT EXISTS challenge_votes (
    id TEXT PRIMARY KEY,
    entry_id TEXT NOT NULL REFERENCES challenge_entries(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entry_id, user_id)
);

CREATE TABLE IF NOT EXISTS user_badges (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    badge_type TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    description TEXT,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_challenges_status ON challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_dates ON challenges(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_challenge_entries_challenge ON challenge_entries(challenge_id);
CREATE INDEX IF NOT EXISTS idx_challenge_entries_user ON challenge_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_votes_entry ON challenge_votes(entry_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
