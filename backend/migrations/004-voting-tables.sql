-- Migration 004: Voting tables, wishlists, chat improvements, and perfume metadata
-- Date: 2026-02-27

-- Perfume accords (canonical list per perfume)
CREATE TABLE IF NOT EXISTS perfume_accords (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    accord_name TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(perfume_id, accord_name)
);
CREATE INDEX IF NOT EXISTS idx_perfume_accords_perfume ON perfume_accords(perfume_id);

-- Accord votes: users vote on how strongly they perceive each accord (0-5)
CREATE TABLE IF NOT EXISTS accord_votes (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    accord_name TEXT NOT NULL,
    strength INTEGER NOT NULL CHECK(strength BETWEEN 0 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(perfume_id, user_id, accord_name)
);
CREATE INDEX IF NOT EXISTS idx_accord_votes_perfume ON accord_votes(perfume_id);
CREATE INDEX IF NOT EXISTS idx_accord_votes_user ON accord_votes(user_id);

-- Note votes: users vote on individual note intensity (-1 to 3)
-- -1 = "I don't smell this", 0 = barely there, 1 = light, 2 = moderate, 3 = strong
CREATE TABLE IF NOT EXISTS note_votes (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    note_name TEXT NOT NULL,
    note_layer TEXT NOT NULL CHECK(note_layer IN ('top', 'heart', 'base')),
    intensity INTEGER NOT NULL CHECK(intensity BETWEEN -1 AND 3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(perfume_id, user_id, note_name)
);
CREATE INDEX IF NOT EXISTS idx_note_votes_perfume ON note_votes(perfume_id);

-- Performance votes: longevity, sillage, projection on a 1-10 scale
CREATE TABLE IF NOT EXISTS performance_votes (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    longevity INTEGER CHECK(longevity BETWEEN 1 AND 10),
    sillage INTEGER CHECK(sillage BETWEEN 1 AND 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(perfume_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_performance_votes_perfume ON performance_votes(perfume_id);

-- Season/occasion votes
CREATE TABLE IF NOT EXISTS season_votes (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    spring INTEGER DEFAULT 0 CHECK(spring IN (0, 1)),
    summer INTEGER DEFAULT 0 CHECK(summer IN (0, 1)),
    fall INTEGER DEFAULT 0 CHECK(fall IN (0, 1)),
    winter INTEGER DEFAULT 0 CHECK(winter IN (0, 1)),
    day INTEGER DEFAULT 0 CHECK(day IN (0, 1)),
    night INTEGER DEFAULT 0 CHECK(night IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(perfume_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_season_votes_perfume ON season_votes(perfume_id);

-- Wishlists: own / want / tried
CREATE TABLE IF NOT EXISTS wishlists (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    list_type TEXT NOT NULL CHECK(list_type IN ('own', 'want', 'tried')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, perfume_id, list_type)
);
CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_perfume ON wishlists(perfume_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_type ON wishlists(user_id, list_type);

-- Typing status for chat
CREATE TABLE IF NOT EXISTS typing_status (
    user_id TEXT NOT NULL,
    chat_with_user_id TEXT NOT NULL,
    last_typed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, chat_with_user_id)
);

-- Message reactions
CREATE TABLE IF NOT EXISTS message_reactions (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL REFERENCES messages(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    emoji TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id)
);

-- Add new columns to perfumes table
ALTER TABLE perfumes ADD COLUMN gender TEXT;
ALTER TABLE perfumes ADD COLUMN perfumer TEXT;
ALTER TABLE perfumes ADD COLUMN concentration TEXT;

-- Add last_active_at to users for online status
ALTER TABLE users ADD COLUMN last_active_at TIMESTAMP;

-- Add read_at to messages for read receipts
ALTER TABLE messages ADD COLUMN read_at TIMESTAMP;
