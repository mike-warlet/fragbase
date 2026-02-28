-- Migration 015: Marketplace (buy/sell/swap fragrances)

CREATE TABLE IF NOT EXISTS marketplace_listings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  perfume_id TEXT REFERENCES perfumes(id),
  title TEXT NOT NULL,
  description TEXT,
  condition TEXT NOT NULL CHECK(condition IN ('new', 'used_like_new', 'used_good', 'used_fair', 'decant', 'sample')),
  listing_type TEXT NOT NULL CHECK(listing_type IN ('sell', 'swap', 'both')),
  price REAL,
  currency TEXT DEFAULT 'BRL',
  volume_ml INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'sold', 'reserved', 'expired', 'removed')),
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_listings_user ON marketplace_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_perfume ON marketplace_listings(perfume_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_type ON marketplace_listings(listing_type);
CREATE INDEX IF NOT EXISTS idx_listings_created ON marketplace_listings(created_at DESC);

CREATE TABLE IF NOT EXISTS marketplace_offers (
  id TEXT PRIMARY KEY,
  listing_id TEXT NOT NULL REFERENCES marketplace_listings(id),
  buyer_id TEXT NOT NULL REFERENCES users(id),
  message TEXT,
  offer_price REAL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'declined', 'withdrawn')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_offers_listing ON marketplace_offers(listing_id);
CREATE INDEX IF NOT EXISTS idx_offers_buyer ON marketplace_offers(buyer_id);
