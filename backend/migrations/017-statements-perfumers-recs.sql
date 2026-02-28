-- Migration 017: Statements (micro-reviews), Perfumer profiles, User recommendations

-- Short-form statements (micro-reviews, max 280 chars)
CREATE TABLE IF NOT EXISTS statements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  perfume_id TEXT NOT NULL REFERENCES perfumes(id),
  text TEXT NOT NULL CHECK(length(text) <= 280),
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10),
  tags TEXT DEFAULT NULL, -- JSON array: ["blind_buy", "compliment_getter", "office_safe"]
  upvotes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_statements_perfume ON statements(perfume_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_statements_user ON statements(user_id);

-- Statement votes (upvote/downvote)
CREATE TABLE IF NOT EXISTS statement_votes (
  user_id TEXT NOT NULL REFERENCES users(id),
  statement_id TEXT NOT NULL REFERENCES statements(id),
  vote INTEGER NOT NULL CHECK(vote IN (-1, 1)),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, statement_id)
);

-- Perfumers (noses)
CREATE TABLE IF NOT EXISTS perfumers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  nationality TEXT,
  birth_year INTEGER,
  notable_houses TEXT, -- JSON array of brand names
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_perfumers_name ON perfumers(name);

-- Perfume-Perfumer junction (many-to-many)
CREATE TABLE IF NOT EXISTS perfume_perfumers (
  perfume_id TEXT NOT NULL REFERENCES perfumes(id),
  perfumer_id TEXT NOT NULL REFERENCES perfumers(id),
  role TEXT DEFAULT 'creator', -- creator, co-creator
  PRIMARY KEY (perfume_id, perfumer_id)
);

CREATE INDEX IF NOT EXISTS idx_pp_perfumer ON perfume_perfumers(perfumer_id);

-- User recommendations ("If you like X, try Y")
CREATE TABLE IF NOT EXISTS user_recommendations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  source_perfume_id TEXT NOT NULL REFERENCES perfumes(id),
  recommended_perfume_id TEXT NOT NULL REFERENCES perfumes(id),
  reason TEXT CHECK(length(reason) <= 280),
  upvotes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_recs_source ON user_recommendations(source_perfume_id, upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_recs_user ON user_recommendations(user_id);

-- Recommendation votes
CREATE TABLE IF NOT EXISTS recommendation_votes (
  user_id TEXT NOT NULL REFERENCES users(id),
  recommendation_id TEXT NOT NULL REFERENCES user_recommendations(id),
  vote INTEGER NOT NULL CHECK(vote IN (-1, 1)),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, recommendation_id)
);

-- Seed famous perfumers
INSERT OR IGNORE INTO perfumers (id, name, bio, nationality, notable_houses) VALUES
  ('p001', 'Francis Kurkdjian', 'One of the most celebrated contemporary perfumers, known for elegant and sophisticated compositions.', 'French', '["Maison Francis Kurkdjian", "Dior", "Burberry", "Carven"]'),
  ('p002', 'Jacques Cavallier', 'Master perfumer at Louis Vuitton, creator of iconic fragrances for multiple luxury houses.', 'French', '["Louis Vuitton", "Bulgari", "Stella McCartney"]'),
  ('p003', 'Alberto Morillas', 'Swiss-Spanish perfumer behind some of the best-selling fragrances in history.', 'Swiss-Spanish', '["Giorgio Armani", "Calvin Klein", "Bulgari", "Guerlain"]'),
  ('p004', 'Thierry Wasser', 'In-house perfumer at Guerlain since 2008, guardian of the houses legendary heritage.', 'Swiss', '["Guerlain"]'),
  ('p005', 'Olivier Cresp', 'Prolific perfumer known for Angel, Light Blue, and other commercial hits.', 'French', '["Thierry Mugler", "Dolce & Gabbana", "Armani"]'),
  ('p006', 'Daniela Andrier', 'Master perfumer at Givaudan, known for refined and complex creations.', 'French', '["Prada", "Givenchy", "Issey Miyake"]'),
  ('p007', 'Christine Nagel', 'Head perfumer at Hermes since 2016, crafting the maisons exclusive fragrances.', 'French', '["Hermes", "Jo Malone"]'),
  ('p008', 'Jean-Claude Ellena', 'Legendary minimalist perfumer, former Hermes in-house nose.', 'French', '["Hermes", "Cartier", "Bulgari"]'),
  ('p009', 'Dominique Ropion', 'Master perfumer at IFF known for bold, powerful fragrances.', 'French', '["Frederic Malle", "YSL", "Viktor & Rolf", "Paco Rabanne"]'),
  ('p010', 'Francois Demachy', 'Dior in-house perfumer, creator of Sauvage and curator of the Dior fragrance legacy.', 'French', '["Dior"]'),
  ('p011', 'Nathalie Lorson', 'Versatile perfumer behind fragrances for Gucci, Chloe, and Narciso Rodriguez.', 'French', '["Gucci", "Chloe", "Narciso Rodriguez"]'),
  ('p012', 'Aurelien Guichard', 'Third-generation perfumer, known for contemporary and approachable compositions.', 'French', '["Paco Rabanne", "Valentino", "Narciso Rodriguez"]'),
  ('p013', 'Quentin Bisch', 'Young talent known for Paco Rabanne Phantom and other modern hits.', 'French', '["Paco Rabanne", "Maison Margiela"]'),
  ('p014', 'Anne Flipo', 'Master perfumer at IFF, known for Lancome La Vie Est Belle.', 'French', '["Lancome", "Viktor & Rolf", "Ralph Lauren"]'),
  ('p015', 'Carlos Benaim', 'Legendary perfumer behind many iconic 80s and 90s fragrances.', 'Moroccan-American', '["Calvin Klein", "Ralph Lauren", "Marc Jacobs"]');
