-- Migration: Add unique username field to users table
-- Date: 2026-02-26

-- Add username column
ALTER TABLE users ADD COLUMN username TEXT;

-- Create unique index on username
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Populate usernames from existing emails (extract part before @)
UPDATE users SET username = SUBSTR(email, 1, INSTR(email, '@') - 1);

-- Make username required after populating
-- SQLite doesn't support ALTER COLUMN, so we'll enforce in application code
