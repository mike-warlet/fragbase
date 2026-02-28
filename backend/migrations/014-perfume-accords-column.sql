-- Migration 014: Add denormalized accords column to perfumes
-- Used by discovery engine for fast filtering without JOINs

ALTER TABLE perfumes ADD COLUMN accords TEXT;
