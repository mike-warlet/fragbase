-- Migration 008: Layering Suggestions
-- Users can suggest and vote on perfume combinations

CREATE TABLE IF NOT EXISTS layering_combos (
    id TEXT PRIMARY KEY,
    perfume_id_1 TEXT NOT NULL REFERENCES perfumes(id),
    perfume_id_2 TEXT NOT NULL REFERENCES perfumes(id),
    suggested_by TEXT NOT NULL REFERENCES users(id),
    description TEXT,
    occasion TEXT,
    votes_up INTEGER DEFAULT 0,
    votes_down INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS layering_votes (
    id TEXT PRIMARY KEY,
    combo_id TEXT NOT NULL REFERENCES layering_combos(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    vote INTEGER NOT NULL, -- 1 = upvote, -1 = downvote
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(combo_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_layering_perfume1 ON layering_combos(perfume_id_1);
CREATE INDEX IF NOT EXISTS idx_layering_perfume2 ON layering_combos(perfume_id_2);
CREATE INDEX IF NOT EXISTS idx_layering_votes_combo ON layering_votes(combo_id);
