-- Migration 007: Extend SOTD into Fragrance Diary
-- Adds occasion, mood, and weather tracking to SOTD entries

ALTER TABLE sotd ADD COLUMN occasion TEXT;
ALTER TABLE sotd ADD COLUMN mood TEXT;
ALTER TABLE sotd ADD COLUMN weather TEXT;
