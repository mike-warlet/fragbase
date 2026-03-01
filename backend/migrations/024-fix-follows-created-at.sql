-- Migration 024: Add created_at to follows table if missing
-- Fixes: "no such column: f.created_at" error in notifications endpoint
ALTER TABLE follows ADD COLUMN created_at TEXT DEFAULT NULL;
