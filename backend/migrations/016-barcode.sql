-- Migration 016: Add barcode/EAN column to perfumes for scanner lookup

ALTER TABLE perfumes ADD COLUMN barcode TEXT;
CREATE INDEX IF NOT EXISTS idx_perfumes_barcode ON perfumes(barcode);
