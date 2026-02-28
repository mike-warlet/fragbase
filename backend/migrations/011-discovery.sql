-- Discovery Engine tables (Scent Quiz + Recommendations)

CREATE TABLE IF NOT EXISTS quiz_responses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_user ON quiz_responses(user_id);

CREATE TABLE IF NOT EXISTS user_scent_profile (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  preference_key TEXT NOT NULL,
  preference_value REAL NOT NULL,
  confidence REAL DEFAULT 0.5,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, preference_key)
);

CREATE INDEX IF NOT EXISTS idx_scent_profile_user ON user_scent_profile(user_id);

CREATE TABLE IF NOT EXISTS recommendations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  perfume_id TEXT NOT NULL,
  score REAL NOT NULL,
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (perfume_id) REFERENCES perfumes(id),
  UNIQUE(user_id, perfume_id)
);

CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_score ON recommendations(user_id, score DESC);
