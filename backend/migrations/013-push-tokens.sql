-- Push Notifications tables

CREATE TABLE IF NOT EXISTS push_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  platform TEXT DEFAULT 'expo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);

CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id TEXT PRIMARY KEY,
  follows INTEGER DEFAULT 1,
  likes INTEGER DEFAULT 1,
  comments INTEGER DEFAULT 1,
  messages INTEGER DEFAULT 1,
  challenges INTEGER DEFAULT 1,
  badges INTEGER DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
