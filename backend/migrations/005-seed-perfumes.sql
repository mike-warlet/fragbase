-- Seed popular perfumes for FragBase MVP
-- 50 iconic fragrances across various categories

INSERT OR IGNORE INTO perfumes (id, name, brand, year, gender, concentration, type) VALUES
-- Men's Classics
('p001', 'Sauvage', 'Dior', 2015, 'masculine', 'Eau de Toilette', 'aromatic'),
('p002', 'Bleu de Chanel', 'Chanel', 2010, 'masculine', 'Eau de Parfum', 'woody'),
('p003', 'Aventus', 'Creed', 2010, 'masculine', 'Eau de Parfum', 'fruity'),
('p004', 'Acqua di Gio', 'Giorgio Armani', 1996, 'masculine', 'Eau de Toilette', 'aquatic'),
('p005', 'La Nuit de L''Homme', 'Yves Saint Laurent', 2009, 'masculine', 'Eau de Toilette', 'spicy'),
('p006', 'Eros', 'Versace', 2012, 'masculine', 'Eau de Toilette', 'aromatic'),
('p007', 'The One', 'Dolce & Gabbana', 2008, 'masculine', 'Eau de Parfum', 'spicy'),
('p008', 'Invictus', 'Paco Rabanne', 2013, 'masculine', 'Eau de Toilette', 'aquatic'),
('p009', 'Dylan Blue', 'Versace', 2016, 'masculine', 'Eau de Toilette', 'aromatic'),
('p010', 'Y', 'Yves Saint Laurent', 2017, 'masculine', 'Eau de Parfum', 'woody'),

-- Men's Niche
('p011', 'Baccarat Rouge 540', 'Maison Francis Kurkdjian', 2015, 'unisex', 'Eau de Parfum', 'amber'),
('p012', 'Oud Wood', 'Tom Ford', 2007, 'unisex', 'Eau de Parfum', 'woody'),
('p013', 'Tobacco Vanille', 'Tom Ford', 2007, 'unisex', 'Eau de Parfum', 'sweet'),
('p014', 'Layton', 'Parfums de Marly', 2016, 'masculine', 'Eau de Parfum', 'spicy'),
('p015', 'Hacivat', 'Nishane', 2017, 'unisex', 'Extrait de Parfum', 'fruity'),
('p016', 'Green Irish Tweed', 'Creed', 1985, 'masculine', 'Eau de Parfum', 'green'),
('p017', 'Silver Mountain Water', 'Creed', 1995, 'masculine', 'Eau de Parfum', 'fresh'),
('p018', 'Interlude Man', 'Amouage', 2012, 'masculine', 'Eau de Parfum', 'smoky'),
('p019', 'Grand Soir', 'Maison Francis Kurkdjian', 2016, 'unisex', 'Eau de Parfum', 'amber'),
('p020', 'Herod', 'Parfums de Marly', 2012, 'masculine', 'Eau de Parfum', 'spicy'),

-- Women's Classics
('p021', 'J''adore', 'Dior', 1999, 'feminine', 'Eau de Parfum', 'floral'),
('p022', 'Coco Mademoiselle', 'Chanel', 2001, 'feminine', 'Eau de Parfum', 'floral'),
('p023', 'La Vie Est Belle', 'Lancôme', 2012, 'feminine', 'Eau de Parfum', 'sweet'),
('p024', 'Black Opium', 'Yves Saint Laurent', 2014, 'feminine', 'Eau de Parfum', 'sweet'),
('p025', 'Good Girl', 'Carolina Herrera', 2016, 'feminine', 'Eau de Parfum', 'sweet'),
('p026', 'Si', 'Giorgio Armani', 2013, 'feminine', 'Eau de Parfum', 'floral'),
('p027', 'Chance Eau Tendre', 'Chanel', 2010, 'feminine', 'Eau de Toilette', 'floral'),
('p028', 'Flowerbomb', 'Viktor & Rolf', 2005, 'feminine', 'Eau de Parfum', 'floral'),
('p029', 'Miss Dior', 'Dior', 2012, 'feminine', 'Eau de Parfum', 'floral'),
('p030', 'Light Blue', 'Dolce & Gabbana', 2001, 'feminine', 'Eau de Toilette', 'citrus'),

-- Women's Niche
('p031', 'Delina', 'Parfums de Marly', 2017, 'feminine', 'Eau de Parfum', 'floral'),
('p032', 'Lost Cherry', 'Tom Ford', 2018, 'unisex', 'Eau de Parfum', 'fruity'),
('p033', 'Not a Perfume', 'Juliette Has A Gun', 2010, 'unisex', 'Eau de Parfum', 'musky'),
('p034', 'Alien', 'Mugler', 2005, 'feminine', 'Eau de Parfum', 'woody'),
('p035', 'Mon Guerlain', 'Guerlain', 2017, 'feminine', 'Eau de Parfum', 'vanilla'),

-- Unisex Favorites
('p036', 'Santal 33', 'Le Labo', 2011, 'unisex', 'Eau de Parfum', 'woody'),
('p037', 'Another 13', 'Le Labo', 2010, 'unisex', 'Eau de Parfum', 'musky'),
('p038', 'Molecule 01', 'Escentric Molecules', 2006, 'unisex', 'Eau de Toilette', 'woody'),
('p039', 'Bal d''Afrique', 'Byredo', 2009, 'unisex', 'Eau de Parfum', 'woody'),
('p040', 'Gypsy Water', 'Byredo', 2008, 'unisex', 'Eau de Parfum', 'woody'),

-- Fresh & Summer
('p041', 'Acqua di Gio Profumo', 'Giorgio Armani', 2015, 'masculine', 'Eau de Parfum', 'aquatic'),
('p042', 'Cool Water', 'Davidoff', 1988, 'masculine', 'Eau de Toilette', 'aquatic'),
('p043', 'CK One', 'Calvin Klein', 1994, 'unisex', 'Eau de Toilette', 'citrus'),
('p044', 'Neroli Portofino', 'Tom Ford', 2007, 'unisex', 'Eau de Parfum', 'citrus'),
('p045', 'Aventus Cologne', 'Creed', 2019, 'masculine', 'Eau de Parfum', 'citrus'),

-- Oriental & Evening
('p046', 'Spicebomb', 'Viktor & Rolf', 2012, 'masculine', 'Eau de Toilette', 'spicy'),
('p047', 'Wanted by Night', 'Azzaro', 2018, 'masculine', 'Eau de Parfum', 'spicy'),
('p048', 'Ultra Male', 'Jean Paul Gaultier', 2015, 'masculine', 'Eau de Toilette Intense', 'sweet'),
('p049', 'Tuscan Leather', 'Tom Ford', 2007, 'unisex', 'Eau de Parfum', 'leather'),
('p050', 'By the Fireplace', 'Maison Margiela', 2015, 'unisex', 'Eau de Toilette', 'smoky');

-- Seed accord data for some popular perfumes
INSERT OR IGNORE INTO perfume_accords (perfume_id, accord_name) VALUES
('p001', 'aromatic'), ('p001', 'fresh spicy'), ('p001', 'woody'),
('p002', 'woody'), ('p002', 'citrus'), ('p002', 'aromatic'),
('p003', 'fruity'), ('p003', 'woody'), ('p003', 'smoky'),
('p004', 'aquatic'), ('p004', 'citrus'), ('p004', 'fresh'),
('p011', 'amber'), ('p011', 'sweet'), ('p011', 'woody'),
('p012', 'woody'), ('p012', 'oud'), ('p012', 'smoky'),
('p013', 'sweet'), ('p013', 'vanilla'), ('p013', 'warm spicy'),
('p021', 'floral'), ('p021', 'fruity'), ('p021', 'sweet'),
('p022', 'floral'), ('p022', 'citrus'), ('p022', 'powdery'),
('p024', 'sweet'), ('p024', 'vanilla'), ('p024', 'floral'),
('p036', 'woody'), ('p036', 'leather'), ('p036', 'musky');
