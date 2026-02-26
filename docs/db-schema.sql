-- Cloudflare D1 Database Schema: FragBase

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfumes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INTEGER,
    type TEXT,
    notes_top TEXT,
    notes_heart TEXT,
    notes_base TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    longevity INTEGER,
    performance INTEGER,
    sillage INTEGER,
    value INTEGER,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    perfume_id TEXT REFERENCES perfumes(id),
    text TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    from_user_id TEXT NOT NULL REFERENCES users(id),
    to_user_id TEXT NOT NULL REFERENCES users(id),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

CREATE TABLE collections (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE collections_perfumes (
    collection_id TEXT NOT NULL REFERENCES collections(id),
    perfume_id TEXT NOT NULL REFERENCES perfumes(id),
    PRIMARY KEY(collection_id, perfume_id)
);

CREATE TABLE follows (
    follower_id TEXT NOT NULL REFERENCES users(id),
    followed_id TEXT NOT NULL REFERENCES users(id),
    PRIMARY KEY(follower_id, followed_id)
);

CREATE TABLE likes (
    user_id TEXT NOT NULL REFERENCES users(id),
    review_id TEXT NOT NULL REFERENCES reviews(id),
    PRIMARY KEY(user_id, review_id)
);
