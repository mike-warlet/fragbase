-- Migration 012: Gamification System (Badges, XP Levels, Achievements)
-- Date: 2026-02-28

-- Badge definitions
CREATE TABLE IF NOT EXISTS badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    requirement_type TEXT NOT NULL,
    requirement_value INTEGER NOT NULL,
    xp_reward INTEGER NOT NULL DEFAULT 0,
    rarity TEXT NOT NULL DEFAULT 'common' CHECK(rarity IN ('common', 'rare', 'epic', 'legendary')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User earned badges (new table referencing badge definitions)
CREATE TABLE IF NOT EXISTS user_badges_v2 (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    badge_id TEXT NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- User XP and level tracking
CREATE TABLE IF NOT EXISTS user_xp (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    total_xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- XP transaction history
CREATE TABLE IF NOT EXISTS xp_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    amount INTEGER NOT NULL,
    source TEXT NOT NULL,
    source_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Aggregated user stats for badge checking
CREATE TABLE IF NOT EXISTS user_stats (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    reviews_count INTEGER NOT NULL DEFAULT 0,
    votes_count INTEGER NOT NULL DEFAULT 0,
    collections_count INTEGER NOT NULL DEFAULT 0,
    followers_count INTEGER NOT NULL DEFAULT 0,
    sotd_streak INTEGER NOT NULL DEFAULT 0,
    challenges_won INTEGER NOT NULL DEFAULT 0,
    perfumes_owned INTEGER NOT NULL DEFAULT 0,
    layering_suggestions INTEGER NOT NULL DEFAULT 0,
    login_streak INTEGER NOT NULL DEFAULT 0,
    comments_count INTEGER NOT NULL DEFAULT 0,
    brands_tried INTEGER NOT NULL DEFAULT 0,
    challenges_joined INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_v2_user ON user_badges_v2(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_v2_badge ON user_badges_v2(badge_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_source ON xp_transactions(source);
CREATE INDEX IF NOT EXISTS idx_user_xp_level ON user_xp(level DESC, total_xp DESC);

-- ============================================
-- Seed badges (30+ across all categories)
-- ============================================

-- Collector badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_1', 'Starter', 'Own 5 fragrances in your collection', 'spray-can', 'collector', 'perfumes_owned', 5, 50, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_2', 'Enthusiast', 'Own 25 fragrances in your collection', 'flask', 'collector', 'perfumes_owned', 25, 150, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_3', 'Connoisseur', 'Own 100 fragrances in your collection', 'gem', 'collector', 'perfumes_owned', 100, 500, 'epic');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_4', 'Hoarder', 'Own 250 fragrances in your collection', 'crown', 'collector', 'perfumes_owned', 250, 1000, 'legendary');

-- Reviewer badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_reviewer_1', 'First Words', 'Write your first review', 'pencil', 'reviewer', 'reviews_count', 1, 25, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_reviewer_2', 'Critic', 'Write 10 reviews', 'book-open', 'reviewer', 'reviews_count', 10, 100, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_reviewer_3', 'Expert Nose', 'Write 50 reviews', 'award', 'reviewer', 'reviews_count', 50, 300, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_reviewer_4', 'Master Reviewer', 'Write 100 reviews', 'star', 'reviewer', 'reviews_count', 100, 750, 'epic');

-- Social badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_social_1', 'Friendly', 'Gain 5 followers', 'users', 'social', 'followers_count', 5, 50, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_social_2', 'Influencer', 'Gain 50 followers', 'trending-up', 'social', 'followers_count', 50, 250, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_social_3', 'Celebrity', 'Gain 200 followers', 'zap', 'social', 'followers_count', 200, 600, 'epic');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_social_4', 'Icon', 'Gain 500 followers', 'shield', 'social', 'followers_count', 500, 1500, 'legendary');

-- Voter badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_voter_1', 'Voice Heard', 'Cast 10 votes on perfumes', 'thumbs-up', 'voter', 'votes_count', 10, 30, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_voter_2', 'Tastemaker', 'Cast 100 votes on perfumes', 'bar-chart', 'voter', 'votes_count', 100, 200, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_voter_3', 'Oracle', 'Cast 500 votes on perfumes', 'eye', 'voter', 'votes_count', 500, 750, 'epic');

-- SOTD badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_sotd_1', 'Day One', 'Set your first Scent of the Day', 'sun', 'sotd', 'sotd_streak', 1, 20, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_sotd_2', 'Weekly Wearer', 'Set SOTD for 7 consecutive days', 'calendar', 'sotd', 'sotd_streak', 7, 100, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_sotd_3', 'Monthly Devotion', 'Set SOTD for 30 consecutive days', 'fire', 'sotd', 'sotd_streak', 30, 400, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_sotd_4', 'Year of Scent', 'Set SOTD for 365 consecutive days', 'trophy', 'sotd', 'sotd_streak', 365, 2000, 'legendary');

-- Explorer badges (brands tried)
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_explorer_1', 'Curious', 'Try fragrances from 10 different brands', 'compass', 'explorer', 'brands_tried', 10, 75, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_explorer_2', 'Globe Trotter', 'Try fragrances from 20 different brands', 'globe', 'explorer', 'brands_tried', 20, 200, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_explorer_3', 'Brand Hunter', 'Try fragrances from 50 different brands', 'map', 'explorer', 'brands_tried', 50, 600, 'epic');

-- Challenge badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_challenge_1', 'Challenger', 'Join your first challenge', 'flag', 'challenge', 'challenges_joined', 1, 30, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_challenge_2', 'Champion', 'Win a community challenge', 'medal', 'challenge', 'challenges_won', 1, 200, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_challenge_3', 'Legend', 'Win 10 community challenges', 'crown', 'challenge', 'challenges_won', 10, 1000, 'legendary');

-- Community badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_community_1', 'Helper', 'Suggest 5 layering combinations', 'layers', 'community', 'layering_suggestions', 5, 50, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_community_2', 'Combo Master', 'Suggest 20 layering combinations', 'git-merge', 'community', 'layering_suggestions', 20, 200, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_community_3', 'First Comment', 'Post your first comment', 'message-circle', 'community', 'comments_count', 1, 15, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_community_4', 'Chatterbox', 'Post 100 comments', 'message-square', 'community', 'comments_count', 100, 300, 'rare');

-- Special badges (checked with custom logic)
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_special_og', 'OG', 'Account created before 2027', 'clock', 'special', 'account_before_year', 2027, 100, 'epic');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_special_night_owl', 'Night Owl', 'Set SOTD after midnight', 'moon', 'special', 'sotd_night_owl', 1, 50, 'rare');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_special_early_bird', 'Early Bird', 'Set SOTD before 7am', 'sunrise', 'special', 'sotd_early_bird', 1, 50, 'rare');

-- Additional collector badges
INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_5', 'Curator', 'Create 5 collections', 'folder', 'collector', 'collections_count', 5, 75, 'common');

INSERT OR IGNORE INTO badges (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, rarity)
VALUES ('badge_collector_6', 'Archivist', 'Create 20 collections', 'archive', 'collector', 'collections_count', 20, 250, 'rare');
