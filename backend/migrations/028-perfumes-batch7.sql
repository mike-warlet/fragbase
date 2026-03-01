-- Migration 028: Batch 7 - 100 Indie/Emerging + Missing Classics
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids
-- IDs: s1061-s1160

-- === GALLIVANT (s1061-s1070) ===
-- Existing: Tokyo (s734), Istanbul (s735)

-- 1. Gallivant London
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1061', 'London', 'Gallivant', 2014, 'Eau de Parfum', 'Juniper Berry, Bergamot, Grapefruit', 'Earl Grey Tea, Violet Leaf, Geranium', 'Ambrette, Musk, Vetiver', 'A quintessentially British fragrance capturing London from Shoreditch to Savile Row. Earl Grey tea and juniper create a dry, elegant composition.', NULL);

-- 2. Gallivant Brooklyn
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1062', 'Brooklyn', 'Gallivant', 2018, 'Eau de Parfum', 'Bitter Orange, Grapefruit, Black Pepper', 'Jasmine, Musks, Leather', 'Cashmeran, Sandalwood, Amber', 'An ode to Brooklyn''s creative energy. Bitter orange and leather create a hip, urban vibe with cashmeran adding warmth like a vintage leather jacket.', NULL);

-- 3. Gallivant Berlin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1063', 'Berlin', 'Gallivant', 2019, 'Eau de Parfum', 'Pink Pepper, Rhubarb, Bergamot', 'Cedarwood, Violet, Iris', 'Musks, Vetiver, Amber', 'Berlin''s raw energy in fragrance form. Rhubarb tartness and violet powder over woody vetiver capture the city''s mix of brutalist architecture and creative spirit.', NULL);

-- 4. Gallivant Bukhara
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1064', 'Bukhara', 'Gallivant', 2016, 'Eau de Parfum', 'Saffron, Cardamom, Rose', 'Oud, Incense, Amber', 'Sandalwood, Musk, Vanilla, Benzoin', 'A Silk Road fragrance evoking the ancient city of Bukhara. Saffron and oud create an opulent, meditative composition grounded in warm sandalwood.', NULL);

-- 5. Gallivant Tel Aviv
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1065', 'Tel Aviv', 'Gallivant', 2016, 'Eau de Parfum', 'Grapefruit, Bergamot, Neroli', 'Jasmine, Orange Blossom, Linden', 'Musk, Cedar, Amber', 'Mediterranean sunshine bottled. Neroli and orange blossom capture Tel Aviv''s balmy, cosmopolitan energy with jasmine adding warmth as evening falls.', NULL);

-- 6. Gallivant Nairobi
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1066', 'Nairobi', 'Gallivant', 2023, 'Eau de Parfum', 'Bergamot, Cardamom, Black Pepper', 'Tea, Jasmine, Geranium', 'Cedar, Musk, Vetiver, Amber', 'A vibrant portrait of Nairobi''s energy. Kenyan tea and cardamom meet black pepper and jasmine, capturing the dynamism and warmth of East Africa''s capital.', NULL);

-- === IMAGINARY AUTHORS (s1067-s1078) ===
-- Existing: Saint Julep (s726/s338), Every Storm a Serenade (s727/s339)

-- 7. Imaginary Authors A Whiff of Wafflecone
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1067', 'A Whiff of Wafflecone', 'Imaginary Authors', 2018, 'Eau de Parfum', 'Vanilla Ice Cream, Waffle Cone', 'Sugar, Orris Butter', 'Sandalwood, Musk, Ambrette', 'A gourmand poem to the simple joy of an ice cream cone on a summer day. Sweet vanilla ice cream and toasted waffle cone are surprisingly wearable and nostalgic.', NULL);

-- 8. Imaginary Authors The Cobra & The Canary
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1068', 'The Cobra & The Canary', 'Imaginary Authors', 2016, 'Eau de Parfum', 'Lemon, Orris, Tobacco', 'Leather, Myrrh, Palo Santo', 'Musk, Benzoin, Black Amber', 'A wild west tale in fragrance. Lemon and tobacco meet leather and palo santo in a dusty, mysterious composition evoking a desert showdown at dusk.', NULL);

-- 9. Imaginary Authors Memoirs of a Trespasser
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1069', 'Memoirs of a Trespasser', 'Imaginary Authors', 2014, 'Eau de Parfum', 'Coffee, Myrrh', 'Vanilla, Guaiac Wood', 'Musk, Benzoin, Oakmoss', 'A creamy, vanillic woody musk that smells like trespassing through someone''s dreams. Coffee and myrrh add darkness to a seductively soft vanilla-wood core.', NULL);

-- 10. Imaginary Authors Yesterday Haze
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1070', 'Yesterday Haze', 'Imaginary Authors', 2020, 'Eau de Parfum', 'Fig Leaf, Bergamot', 'Blonde Fig, Coconut Milk', 'Sandalwood, Musk, Tonka Bean', 'A milky fig dream wrapped in coconut softness. Like a hazy memory of a Mediterranean fig tree, this is warm, creamy, and irresistibly comforting.', NULL);

-- 11. Imaginary Authors Telegrama
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1071', 'Telegrama', 'Imaginary Authors', 2020, 'Eau de Parfum', 'Petitgrain, Green Pepper, Sage', 'Violet Leaf, Patchouli, Geranium', 'Musk, Vetiver, Cedar, Labdanum', 'A green aromatic with the crispness of a telegram sent from a Mediterranean villa. Sage and violet leaf create an herbal elegance with earthy vetiver depth.', NULL);

-- 12. Imaginary Authors Slow Explosions
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1072', 'Slow Explosions', 'Imaginary Authors', 2016, 'Eau de Parfum', 'Saffron, Bergamot, Black Pepper', 'Rose Absolute, Leather', 'Oud, Amber, Musk, Patchouli', 'A smoldering saffron-rose narrative unfolding slowly like an explosion in slow motion. Leather and oud add dark intensity to this cinematic composition.', NULL);

-- 13. Imaginary Authors Sundrunk
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1073', 'Sundrunk', 'Imaginary Authors', 2018, 'Eau de Parfum', 'Neroli, Lemon, Bergamot', 'Jasmine, Saffron, Orange Blossom', 'Musk, Amber, Vetiver', 'That dizzy feeling of too much sun captured in a bottle. Bright neroli and saffron-tinged jasmine evoke a golden afternoon where time stands blissfully still.', NULL);

-- 14. Imaginary Authors Cape Heartache
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1074', 'Cape Heartache', 'Imaginary Authors', 2015, 'Eau de Parfum', 'Strawberry, Pine Needle', 'Douglas Fir, Old Growth, Moss', 'Vanilla, Musk, Black Pepper', 'A love letter to the Pacific Northwest coast. Strawberry and Douglas fir is an unexpected pairing that evokes red fruit scattered on a forest floor near the ocean.', NULL);

-- === D.S. & DURGA (s1075-s1082) ===
-- Existing: Debaser (s724), Bowmakers (s725), Rose Atlantic (s340)

-- 15. D.S. & Durga I Don''t Know What
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1075', 'I Don''t Know What', 'D.S. & Durga', 2018, 'Eau de Parfum', 'Bergamot, Elemi', 'Musk, Amber, Iso E Super', 'Cashmeran, Ambroxan, Cedarwood', 'A molecular scent enhancer designed to smell like "your skin but better." Transparent musks and ambery molecules create a personal, addictive aura unique to each wearer.', NULL);

-- 16. D.S. & Durga Burning Barbershop
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1076', 'Burning Barbershop', 'D.S. & Durga', 2009, 'Eau de Parfum', 'Spearmint, Lime, Hemlock', 'Lavender, Charred Wood', 'Musk, Smoke, Cedar', 'The brand''s cult debut imagining a 1891 barbershop on fire. Spearmint and lavender clash with charred wood and smoke in a startlingly vivid aromatic experience.', NULL);

-- 17. D.S. & Durga Cowboy Grass
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1077', 'Cowboy Grass', 'D.S. & Durga', 2011, 'Eau de Parfum', 'Cut Grass, Bergamot', 'Sage, Basil', 'Vetiver, Cedar, Musk', 'Fresh cut grass on the prairie. A clean, green aromatic that evokes wide-open spaces with sage and vetiver adding a rugged, earthy depth.', NULL);

-- 18. D.S. & Durga El Cosmico
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1078', 'El Cosmico', 'D.S. & Durga', 2018, 'Eau de Parfum', 'Grapefruit, Campfire', 'Cactus Flower, Sage, Palo Santo', 'Leather, Cedar, Musk', 'Inspired by the artist colony hotel in Marfa, Texas. Desert campfire smoke meets cactus flower in a romantic ode to the vast Texan landscape under starlight.', NULL);

-- 19. D.S. & Durga Amber Kiso
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1079', 'Amber Kiso', 'D.S. & Durga', 2020, 'Eau de Parfum', 'Camphor, Cedarwood', 'Hinoki, Amber, Incense', 'Sandalwood, Musk, Benzoin', 'An amber inspired by the ancient Kiso road through Japanese cedar forests. Hinoki wood and camphor create a serene, meditative ambery composition.', NULL);

-- 20. D.S. & Durga White Peacock Lily
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1080', 'White Peacock Lily', 'D.S. & Durga', 2016, 'Eau de Parfum', 'Bergamot, Lily', 'White Tea, Heliotrope, Jasmine', 'Musk, Ambrette, Sandalwood', 'An ethereal white floral inspired by a white peacock in a lily pond. Lily and white tea create a luminous, clean beauty with heliotrope adding powder.', NULL);

-- === 4160 TUESDAYS (s1081-s1086) ===

-- 21. 4160 Tuesdays The Sexiest Scent on the Planet. Ever. (IMHO)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1081', 'The Sexiest Scent on the Planet. Ever. (IMHO)', '4160 Tuesdays', 2016, 'Eau de Parfum', 'Grapefruit, Bergamot, Petitgrain', 'Jasmine, Orris, Rose', 'Musk, Sandalwood, Amber, Vanilla', 'A bold claim for a beguiling fragrance. Creator Sarah McCartney blends grapefruit brightness with jasmine and orris in a composition that proves confidence is sexy.', NULL);

-- 22. 4160 Tuesdays What I Did On My Holidays
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1082', 'What I Did On My Holidays', '4160 Tuesdays', 2015, 'Eau de Parfum', 'Coconut, Lemon, Bergamot', 'Jasmine, Ylang-Ylang, Frangipani', 'Musk, Vanilla, Sandalwood, Benzoin', 'A tropical holiday in a bottle from the quirky British indie house. Coconut and frangipani transport you to a beach while jasmine adds exotic warmth.', NULL);

-- 23. 4160 Tuesdays Midnight in the Palace Garden
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1083', 'Midnight in the Palace Garden', '4160 Tuesdays', 2019, 'Eau de Parfum', 'Bergamot, Green Notes, Galbanum', 'Tuberose, Jasmine, Rose', 'Oud, Sandalwood, Musk, Amber', 'A nocturnal floral oud inspired by the scented gardens of Arabian palaces. Tuberose and jasmine bloom in the dark while oud and sandalwood create depth.', NULL);

-- 24. 4160 Tuesdays The Dark Heart of Old Havana
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1084', 'The Dark Heart of Old Havana', '4160 Tuesdays', 2015, 'Eau de Parfum', 'Tobacco, Lime, Rum', 'Leather, Coffee, Cinnamon', 'Sandalwood, Vanilla, Musk, Benzoin', 'A smoky, boozy ode to Cuba. Rum, tobacco, and coffee create a nocturnal atmosphere of old Havana''s jazz clubs and cigar lounges.', NULL);

-- 25. 4160 Tuesdays Sunshine & Pancakes
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1085', 'Sunshine & Pancakes', '4160 Tuesdays', 2018, 'Eau de Parfum', 'Lemon, Butter, Maple Syrup', 'Vanilla, Flour, Milk', 'Musk, Sandalwood, Amber', 'A delightfully literal gourmand that smells exactly like pancakes on a sunny morning. Butter, maple, and vanilla create pure comfort in fragrance form.', NULL);

-- 26. 4160 Tuesdays The Lion Cupboard
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1086', 'The Lion Cupboard', '4160 Tuesdays', 2014, 'Eau de Parfum', 'Bergamot, Pine, Camphor', 'Cedarwood, Turkish Delight, Rose', 'Musk, Amber, Fur, Sandalwood', 'A Narnia-inspired scent capturing the moment of stepping through the wardrobe. Cedar, fur, and Turkish delight evoke that magical transition from mundane to fantastic.', NULL);

-- === HOUSE OF OUD (s1087-s1092) ===
-- Existing: Dates Delight (s740)

-- 27. House of Oud Empathy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1087', 'Empathy', 'House of Oud', 2018, 'Eau de Parfum', 'Cardamom, Bergamot, Pink Pepper', 'Rose, Oud, Cinnamon', 'Amber, Musk, Sandalwood, Vanilla', 'A warm, inviting oud-rose with cinnamon adding spicy sweetness. Named for its ability to bridge cultures through the universal language of scent.', NULL);

-- 28. House of Oud Breath of the Infinite
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1088', 'Breath of the Infinite', 'House of Oud', 2017, 'Eau de Parfum', 'Bergamot, Mandarin, Pink Pepper', 'Iris, Jasmine, Violet', 'Oud, Sandalwood, Musk, Amber, Cashmeran', 'A meditative oud built on powdery iris and violet. The combination of European floral refinement with Arabian oud tradition creates a transcendent, timeless composition.', NULL);

-- 29. House of Oud Almond Harmony
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1089', 'Almond Harmony', 'House of Oud', 2017, 'Eau de Parfum', 'Bitter Almond, Bergamot, Saffron', 'Cherry, Rose, Heliotrope', 'Oud, Vanilla, Sandalwood, Musk, Tonka Bean', 'A gourmand oud featuring bitter almond and cherry. The marriage of nutty-fruity sweetness with precious oud creates a unique, dessert-like oriental.', NULL);

-- 30. House of Oud Golden Powder
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1090', 'Golden Powder', 'House of Oud', 2017, 'Eau de Parfum', 'Bergamot, Cinnamon, Saffron', 'Iris, Oud, Amber', 'Vanilla, Musk, Sandalwood, Benzoin, Tonka Bean', 'A shimmering powder-gold oud with iris providing elegant powderiness. Saffron and cinnamon add warmth while benzoin and vanilla create a silky, luminous trail.', NULL);

-- 31. House of Oud Just Before
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1091', 'Just Before', 'House of Oud', 2018, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Rose, Geranium, Saffron', 'Oud, Amber, Vetiver, Musk, Patchouli', 'Capturing the anticipation "just before" an event. Fresh grapefruit transitions to rose and saffron before a deep oud-vetiver base creates confident presence.', NULL);

-- 32. House of Oud Keep Glazed
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1092', 'Keep Glazed', 'House of Oud', 2019, 'Eau de Parfum', 'Candied Fruits, Bergamot, Apple', 'Caramel, Rose, Praline', 'Oud, Vanilla, Musk, Sandalwood, Tonka Bean', 'A playful gourmand oud blending candied fruits and caramel with precious oud wood. The praline and vanilla base makes it feel like a luxury confection.', NULL);

-- === ALEXANDRIA FRAGRANCES (s1093-s1098) ===

-- 33. Alexandria Fragrances Zion
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1093', 'Zion', 'Alexandria Fragrances', 2019, 'Extrait de Parfum', 'Pineapple, Bergamot, Grapefruit', 'Birch, Rose, Jasmine, Patchouli', 'Musk, Ambergris, Oakmoss, Vanilla, Cedar', 'An extrait-strength fruity-woody with powerful pineapple-birch projection. Created in the clone house tradition but has developed its own devoted following.', NULL);

-- 34. Alexandria Fragrances Hafez 1984
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1094', 'Hafez 1984', 'Alexandria Fragrances', 2020, 'Extrait de Parfum', 'Saffron, Nutmeg, Cinnamon', 'Rose, Oud, Amber', 'Sandalwood, Vanilla, Musk, Benzoin, Leather', 'A bold, spicy-sweet oriental named in homage to the Persian poet. Saffron and cinnamon dominate with oud and leather adding depth to this powerful extrait.', NULL);

-- 35. Alexandria Fragrances Interplay
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1095', 'Interplay', 'Alexandria Fragrances', 2020, 'Extrait de Parfum', 'Cardamom, Bergamot, Lavender', 'Iris, Ambroxan, Rose', 'Cedar, Musk, Patchouli, Vetiver, Vanilla', 'A sophisticated aromatic built on iris and ambroxan. Lavender and cardamom create an elevated opening before settling into a smooth, skin-hugging vetiver base.', NULL);

-- 36. Alexandria Fragrances Hawaii Volcano
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1096', 'Hawaii Volcano', 'Alexandria Fragrances', 2019, 'Extrait de Parfum', 'Pineapple, Mango, Bergamot', 'Coconut, Jasmine, Ylang-Ylang', 'Vanilla, Musk, Ambroxan, Sandalwood', 'A tropical extrait evoking Hawaiian paradise. Pineapple, mango, and coconut create a sun-drenched island experience with lasting vanilla and ambroxan warmth.', NULL);

-- 37. Alexandria Fragrances Black Tie Affair
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1097', 'Black Tie Affair', 'Alexandria Fragrances', 2021, 'Extrait de Parfum', 'Bergamot, Pink Pepper, Saffron', 'Iris, Leather, Oud', 'Amber, Vanilla, Musk, Cedar, Tonka Bean', 'A formal, elegant extrait for special occasions. Saffron and iris meet leather and oud in a composition designed for black-tie sophistication.', NULL);

-- 38. Alexandria Fragrances Brasilia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1098', 'Brasilia', 'Alexandria Fragrances', 2020, 'Extrait de Parfum', 'Bergamot, Grapefruit, Green Apple', 'Ambroxan, Jasmine, Cedar', 'Musk, Vetiver, Oakmoss, Amber', 'A fresh, green masculine with ambroxan creating an airy, modern freshness. Green apple and grapefruit make it an invigorating, versatile everyday wear.', NULL);

-- === ZADIG & VOLTAIRE (s1099-s1104) ===
-- Existing: This is Him! (s393), This is Her! (s394)

-- 39. Zadig & Voltaire This is Love! Pour Lui
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1099', 'This is Love! Pour Lui', 'Zadig & Voltaire', 2020, 'Eau de Toilette', 'Grapefruit, Coconut, Cardamom', 'Iris, Papaya, Fig Leaf', 'Tonka Bean, Cedar, Vanilla, Musk', 'A tropical twist on the brand''s masculine DNA. Coconut and papaya bring exotic warmth to iris and tonka bean in this summer-ready love letter.', NULL);

-- 40. Zadig & Voltaire This is Love! Pour Elle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1100', 'This is Love! Pour Elle', 'Zadig & Voltaire', 2020, 'Eau de Parfum', 'Raspberry, Orange Blossom, Pink Pepper', 'Jasmine, Rose, Coconut Milk', 'Musk, Vanilla, Sandalwood, Tonka Bean', 'A fruity-floral feminine celebrating love. Raspberry and coconut milk create sweetness while jasmine and rose add romantic depth to this youthful composition.', NULL);

-- 41. Zadig & Voltaire This is Him! Vibes of Freedom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1101', 'This is Him! Vibes of Freedom', 'Zadig & Voltaire', 2022, 'Eau de Toilette', 'Bergamot, Pear, Green Tea', 'Lavender, Mate, Sage', 'Cedar, Musk, Amber, Tonka Bean', 'A free-spirited, green aromatic with mate tea adding a South American twist. Lavender and sage create a fresh, herbaceous vibe perfect for the adventurous spirit.', NULL);

-- 42. Zadig & Voltaire This is Her! Vibes of Freedom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1102', 'This is Her! Vibes of Freedom', 'Zadig & Voltaire', 2022, 'Eau de Parfum', 'Bergamot, Pear, Mandarin', 'Jasmine, Peony, Rose, Iris', 'Musk, Cedar, Vanilla, Tonka Bean', 'A luminous, free-spirited floral with pear and mandarin creating freshness. Jasmine and peony float above a warm musk-vanilla base for carefree elegance.', NULL);

-- 43. Zadig & Voltaire This is Really Him!
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1103', 'This is Really Him!', 'Zadig & Voltaire', 2023, 'Eau de Toilette Intense', 'Grapefruit, Cardamom, Ginger', 'Iris, Fig Leaf, Cashmeran', 'Tonka Bean, Sandalwood, Vanilla, Benzoin', 'An intensified "This is Him!" with ginger and cashmeran adding warmth and complexity. The fig leaf and iris heart retains the original''s character with greater depth.', NULL);

-- 44. Zadig & Voltaire Just Rock! Pour Lui
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1104', 'Just Rock! Pour Lui', 'Zadig & Voltaire', 2017, 'Eau de Toilette', 'Grapefruit, Cardamom, Pink Pepper', 'Sage, Geranium, Ambroxan', 'Vetiver, Benzoin, Labdanum, Sandalwood', 'Rock''n''roll energy with aromatic sage and spicy cardamom. Vetiver and labdanum create a raw, magnetic base that captures the spirit of live music.', NULL);

-- === ACQUA DI PARMA - Missing ones (s1105-s1114) ===
-- Existing: Colonia (s252/s719), Colonia Essenza (s253), Fico di Amalfi (s254),
--           Quercia (s255), Oud (s720), Rosa Nobile (s643)

-- 45. Acqua di Parma Colonia Pura
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1105', 'Colonia Pura', 'Acqua di Parma', 2017, 'Eau de Cologne', 'Bergamot, Orange, Narcissus', 'Coriander, Jasmine, Cyclamen', 'White Musk, Cedar, Amber', 'A lighter, more translucent take on the classic Colonia. Narcissus and cyclamen add a floral delicacy to the citrus core, creating a purer, airier interpretation.', NULL);

-- 46. Acqua di Parma Colonia Club
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1106', 'Colonia Club', 'Acqua di Parma', 2015, 'Eau de Cologne', 'Grapefruit, Mint, Neroli', 'Artemisia, Geranium, Lavender', 'Musk, Tonka Bean, Vetiver', 'A sporty, energetic Colonia flanker with mint and grapefruit creating an invigorating freshness. Designed for the active Italian gentleman who values tradition.', NULL);

-- 47. Acqua di Parma Mandorlo di Sicilia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1107', 'Mandorlo di Sicilia', 'Acqua di Parma', 2013, 'Eau de Toilette', 'Bergamot, Star Anise, Orange', 'Almond, Coffee, Vanilla', 'Musk, Tonka Bean, White Chocolate', 'Sicilian almond blossoms in fragrance form. Almond and coffee create a gourmand Italian dream with star anise adding Mediterranean warmth and white chocolate richness.', NULL);

-- 48. Acqua di Parma Colonia Ambra
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1108', 'Colonia Ambra', 'Acqua di Parma', 2015, 'Eau de Cologne Concentree', 'Bergamot, Lemon, Black Pepper', 'Labdanum, Amber, Cistus', 'Benzoin, Vanilla, Guaiac Wood, Musk', 'The warmest Colonia, wrapping the signature citrus in rich amber and labdanum. A wintertime Italian elegance with vanilla and guaiac wood adding depth.', NULL);

-- 49. Acqua di Parma Mirto di Panarea
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1109', 'Mirto di Panarea', 'Acqua di Parma', 2008, 'Eau de Toilette', 'Myrtle, Bergamot, Lemon, Basil', 'Jasmine, Rose, Lily of the Valley', 'Lentisk, Cedar, Musk', 'Named after the island of Panarea, a Mediterranean herbal composition. Wild myrtle and basil evoke the aromatic maquis landscape of the Aeolian Islands.', NULL);

-- 50. Acqua di Parma Blu Mediterraneo Arancia di Capri
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1110', 'Arancia di Capri', 'Acqua di Parma', 1999, 'Eau de Toilette', 'Sweet Orange, Bitter Orange, Mandarin', 'Petit Grain, Cardamom, Rose', 'Musk, Amber, Caramel', 'The first in the Blu Mediterraneo line, a joyful orange composition capturing Capri''s citrus groves. Sweet and bitter orange intertwine in Italian sunshine.', NULL);

-- 51. Acqua di Parma Blu Mediterraneo Bergamotto di Calabria
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1111', 'Bergamotto di Calabria', 'Acqua di Parma', 2010, 'Eau de Toilette', 'Bergamot, Citron, Grapefruit', 'Ginger, Cedar, Red Tea', 'Musk, Vetiver, Benzoin', 'A luminous bergamot centered on Calabrian citrus. Red tea and ginger add unexpected spice to this sparkling, uplifting composition that embodies Italian coastal living.', NULL);

-- 52. Acqua di Parma Leather
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1112', 'Leather', 'Acqua di Parma', 2019, 'Eau de Parfum', 'Bergamot, Sichuan Pepper', 'Leather, Birch, Cade Oil', 'Amber, Musk, Guaiac Wood, Cedar', 'An Italian leather accord that feels worn and warm, not harsh. Birch and cade create a smoky tanning effect while Sichuan pepper adds aromatic brightness.', NULL);

-- 53. Acqua di Parma Vaniglia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1113', 'Vaniglia', 'Acqua di Parma', 2019, 'Eau de Parfum', 'Bergamot, Saffron, Ginger', 'Vanilla, Jasmine, Heliotrope', 'Musk, Sandalwood, Tonka Bean, Benzoin', 'An Italian vanilla that avoids gourmand sweetness through saffron and ginger. Heliotrope adds powder while sandalwood ensures a refined, sophisticated warmth.', NULL);

-- 54. Acqua di Parma Osmanthus
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1114', 'Osmanthus', 'Acqua di Parma', 2019, 'Eau de Parfum', 'Bergamot, Mandarin, Cassis', 'Osmanthus, Suede, Geranium', 'Musk, Sandalwood, Cashmeran, Cedar', 'A velvety osmanthus flower with its natural fruity-leathery character enhanced by suede and cassis. Cashmeran adds a cozy warmth to this elegant floral.', NULL);

-- === CREED - Missing ones (s1115-s1124) ===
-- Existing: Aventus (p003), Green Irish Tweed (p016), Silver Mountain Water (p017/s682),
--           Aventus Cologne (p045), Viking (s041), Royal Oud (s042/s683),
--           Millesime Imperial (s043), Original Santal (s044), Himalaya (s045),
--           Wind Flowers (s046), Virgin Island Water (s047), Royal Water (s048),
--           Original Vetiver (s049/s684), Royal Princess Oud (s050)

-- 55. Creed Love in White
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1115', 'Love in White', 'Creed', 2005, 'Eau de Parfum', 'Orange Blossom, Magnolia, Bergamot, Lemon', 'Daphne, Iris, Rose, Rice Husk', 'Sandalwood, Vanilla, Ambergris, Cedar, Musk', 'A luminous white floral dedicated to the women of the world. Orange blossom and daphne create an elegant, uplifting composition with iris refinement and rice husk uniqueness.', NULL);

-- 56. Creed Spring Flower
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1116', 'Spring Flower', 'Creed', 2006, 'Eau de Parfum', 'Apple, Peach, Melon', 'Rose, Jasmine, Cyclamen', 'Musk, Ambrox, Vanilla, Vetiver', 'A fresh feminine created for Audrey Hepburn''s granddaughter. Fruity apple and peach meet delicate florals in a youthful, optimistic composition celebrating spring.', NULL);

-- 57. Creed Aventus for Her
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1117', 'Aventus for Her', 'Creed', 2016, 'Eau de Parfum', 'Green Apple, Pink Pepper, Lemon, Bergamot', 'Rose, Lily of the Valley, Peach, Styrax', 'Sandalwood, Musk, Amber, Moss', 'The feminine counterpart to Aventus with green apple and pink pepper meeting roses and peach. Confident yet delicate, pairing Aventus''s spirit with feminine grace.', NULL);

-- 58. Creed Carmina
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1118', 'Carmina', 'Creed', 2024, 'Eau de Parfum', 'Bergamot, Blackcurrant, Pink Pepper', 'Turkish Rose, Peony, Iris', 'Patchouli, Sandalwood, Musk, Cashmere Wood', 'Creed''s latest feminine, a sophisticated rose-patchouli composition with Turkish rose at its heart. Cashmere wood adds a modern, enveloping softness.', NULL);

-- 59. Creed Viking Cologne
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1119', 'Viking Cologne', 'Creed', 2021, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin, Peppermint', 'Geranium, Thyme, Rosemary', 'Sandalwood, Vetiver, Musk', 'A fresher, more citrus-driven take on Viking. Mediterranean herbs and peppermint create an invigorating, sporty composition that''s lighter yet distinctly Creed.', NULL);

-- 60. Creed Absolu Aventus
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1120', 'Absolu Aventus', 'Creed', 2024, 'Extrait de Parfum', 'Blackcurrant, Bergamot, Apple', 'Birch, Patchouli, Rose', 'Musk, Ambergris, Vanilla, Sandalwood, Oakmoss', 'An extrait concentration of the legendary Aventus. Richer, deeper, and longer lasting with intensified birch and oakmoss creating a more opulent, refined version.', NULL);

-- 61. Creed Bois du Portugal
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1121', 'Bois du Portugal', 'Creed', 1987, 'Eau de Parfum', 'Bergamot, Lemon, Lavender', 'Cedar, Sandalwood, Geranium', 'Ambergris, Musk, Tonka Bean, Vetiver', 'A sophisticated woody-lavender classic once worn by European aristocracy. The cedarwood and sandalwood heart creates a regal warmth with ambergris adding depth.', NULL);

-- 62. Creed Erolfa
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1122', 'Erolfa', 'Creed', 1992, 'Eau de Parfum', 'Melon, Bergamot, Lemon, Green Apple', 'Cyclamen, Jasmine, Marine Notes', 'Sandalwood, Musk, Cedar, Ambergris', 'Named from ERwin, OLivier, and their boat FAlcon, a maritime masterpiece. Melon and marine notes create the sensation of sailing the French Riviera.', NULL);

-- 63. Creed Fleurissimo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1123', 'Fleurissimo', 'Creed', 1956, 'Eau de Parfum', 'Bergamot, Violet', 'Tuberose, Iris, Rose', 'Musk, Ambergris, Sandalwood', 'Created for Grace Kelly''s wedding to Prince Rainier III of Monaco. A classic white floral bouquet of tuberose, iris, and rose that embodies royal elegance.', NULL);

-- 64. Creed Tabarome Millesime
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1124', 'Tabarome Millesime', 'Creed', 2000, 'Eau de Parfum', 'Ginger, Mandarin, Bergamot', 'Tobacco, Sandalwood, Pepper', 'Ambergris, Musk, Tonka Bean, Vanilla', 'A distinguished tobacco masculine with ginger''s sharpness and sandalwood''s cream. The refined tobacco note captures the aroma of a gentleman''s study.', NULL);

-- === JO MALONE - Missing ones (s1125-s1135) ===
-- Existing: Wood Sage & Sea Salt (s220/s596), English Pear & Freesia (s221),
--           Peony & Blush Suede (s222/s595), Lime Basil & Mandarin (s223),
--           Pomegranate Noir (s224), Velvet Rose & Oud (s225), Myrrh & Tonka (s226),
--           Oud & Bergamot (s227), Wild Bluebell (s228), Blackberry & Bay (s229),
--           Scarlet Poppy (s230)

-- 65. Jo Malone Nectarine Blossom & Honey
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1125', 'Nectarine Blossom & Honey', 'Jo Malone', 2005, 'Cologne', 'Green Notes, Cassis, Petit Grain', 'Nectarine, Peach Blossom, Plum', 'Honey, Vetiver, Musk, Amber', 'A luscious fruity floral with nectarine blossom drizzled in acacia honey. The cassis adds tartness while honey creates a warm, sensuous sweetness.', NULL);

-- 66. Jo Malone Orange Blossom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1126', 'Orange Blossom', 'Jo Malone', 2003, 'Cologne', 'Clementine, Water Lily', 'Orange Blossom, White Lilac', 'Iris, Vetiver, Orris', 'A delicate white floral celebrating the Mediterranean orange tree in bloom. Water lily and clementine create a dewy freshness around the luminous orange blossom heart.', NULL);

-- 67. Jo Malone Red Roses
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1127', 'Red Roses', 'Jo Malone', 2005, 'Cologne', 'Lemon, Crushed Violet Leaves', 'Damask Rose, Scarlet Rose', 'Honeycomb, Musk', 'A celebration of seven roses combined for a rich, voluptuous bouquet. Lemon adds brightness while honeycomb gives warmth to this lush, purely romantic rose.', NULL);

-- 68. Jo Malone Basil & Neroli
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1128', 'Basil & Neroli', 'Jo Malone', 2019, 'Cologne', 'Basil, Bergamot, White Tea', 'Neroli, Jasmine', 'Vetiver, White Musk', 'An aromatic, herbaceous fragrance with basil and neroli creating a surprisingly elegant pairing. White tea adds a serene quality to this modern cologne.', NULL);

-- 69. Jo Malone Fig & Lotus Flower
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1129', 'Fig & Lotus Flower', 'Jo Malone', 2021, 'Cologne', 'Mandarin, Cardamom', 'Fig, Lotus Flower, Jasmine', 'Musk, Amber, Cedar', 'From the Blossoms collection, a milky fig paired with sacred lotus flower. Cardamom adds warmth to this dreamy, meditative composition.', NULL);

-- 70. Jo Malone Cypress & Grapevine
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1130', 'Cypress & Grapevine', 'Jo Malone', 2019, 'Cologne Intense', 'Juniper Berry, Pink Pepper', 'Cypress, Pine, Grapevine', 'Amber, Musk, Cedar, Patchouli', 'A woody aromatic from the English Fields collection. Cypress and pine create a forest atmosphere with grapevine adding unexpected green freshness.', NULL);

-- 71. Jo Malone Tuberose Angelica
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1131', 'Tuberose Angelica', 'Jo Malone', 2008, 'Cologne Intense', 'Bergamot, Clove', 'Tuberose, Gardenia, Jasmine', 'Amber, Sandalwood, Angelica, Vetiver', 'A sultry, dark floral from the Cologne Intense line. Tuberose''s heady narcotic quality is grounded by earthy angelica root and warm sandalwood.', NULL);

-- 72. Jo Malone Dark Amber & Ginger Lily
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1132', 'Dark Amber & Ginger Lily', 'Jo Malone', 2012, 'Cologne Intense', 'Pink Pepper, Saffron', 'Ginger Lily, Cardamom', 'Amber, Cinnamon, Benzoin, Black Orchid', 'A dark, spicy oriental from the Cologne Intense range. Saffron and ginger lily create an exotic warmth with dark amber and benzoin adding resinous depth.', NULL);

-- 73. Jo Malone Honeysuckle & Davana
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1133', 'Honeysuckle & Davana', 'Jo Malone', 2017, 'Cologne', 'Davana, Mandarin, Orange', 'Honeysuckle, Rose, Peach', 'Musk, Moss, Cedar', 'Davana''s fruity, wine-like richness meets sweet honeysuckle in a surprisingly complex pairing. The herbal-fruity opening evolves into warm, sensual florals.', NULL);

-- 74. Jo Malone English Oak & Hazelnut
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1134', 'English Oak & Hazelnut', 'Jo Malone', 2017, 'Cologne', 'Green Hazelnut, Elemi', 'Cedarwood, Roasted Oak', 'Musk, Amber, Birch', 'A warm, nutty woody with roasted English oak at its heart. Green hazelnut adds a uniquely autumnal character while birch and amber create a cozy, masculine warmth.', NULL);

-- 75. Jo Malone Poppy & Barley
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1135', 'Poppy & Barley', 'Jo Malone', 2017, 'Cologne', 'Blackcurrant, Barley', 'Poppy, Rose, Violet', 'Ambrette, Musk, Wheat', 'A meadow in a bottle from the English Fields collection. Barley and wheat create a warm, golden character while poppy and rose add gentle floral beauty.', NULL);

-- === MISSING CLASSICS & IMPORTANT FRAGRANCES (s1136-s1160) ===

-- 76. Chanel Coco Mademoiselle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1136', 'Coco Mademoiselle', 'Chanel', 2001, 'Eau de Parfum', 'Orange, Mandarin, Bergamot', 'Jasmine, Rose, Mimosa, Ylang-Ylang', 'Tonka Bean, Vanilla, Musk, Patchouli, Vetiver, White Musk', 'One of the world''s best-selling feminine fragrances. A sophisticated, youthful interpretation of Coco with patchouli and orange creating an irresistibly chic allure.', NULL);

-- 77. Chanel Chance Eau Tendre
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1137', 'Chance Eau Tendre', 'Chanel', 2010, 'Eau de Toilette', 'Grapefruit, Quince', 'Hyacinth, Jasmine, Rose Petal', 'White Musk, Iris, Amber, Cedar, Virginia Cedar', 'The softest, most romantic Chance flanker. Quince and hyacinth create a tender, fresh floral with white musk providing an intimate, skin-close finish.', NULL);

-- 78. Guerlain Mon Guerlain
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1138', 'Mon Guerlain', 'Guerlain', 2017, 'Eau de Parfum', 'Lavender, Bergamot', 'Iris, Jasmine Sambac, Rose', 'Sandalwood, Vanilla, Coumarin, Benzoin', 'Created as a tribute to Angelina Jolie. Lavender and jasmine sambac create a fresh yet sensual duality, with Australian sandalwood and coumarin adding warmth.', NULL);

-- 79. Lancome La Vie Est Belle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1139', 'La Vie Est Belle', 'Lancome', 2012, 'Eau de Parfum', 'Blackcurrant, Pear', 'Iris, Jasmine, Orange Blossom', 'Praline, Vanilla, Patchouli, Tonka Bean', 'A revolutionary gourmand floral that became one of the best-selling feminines globally. Iris absolute and praline create the signature "iris gourmand" accord.', NULL);

-- 80. YSL Libre
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1140', 'Libre', 'Yves Saint Laurent', 2019, 'Eau de Parfum', 'Mandarin, Lavender, Bergamot', 'Orange Blossom, Jasmine Sambac, Orchid', 'Vanilla, Cedar, Musk, Ambergris', 'A bold feminine pairing lavender with orange blossom in a gender-defying composition. The hot-cold contrast of cool lavender and warm vanilla is daringly modern.', NULL);

-- 81. Marc Jacobs Daisy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1141', 'Daisy', 'Marc Jacobs', 2007, 'Eau de Toilette', 'Strawberry, Violet Leaves, Blood Grapefruit', 'Gardenia, Jasmine, Violet', 'Musk, Vanilla, White Woods', 'A youthful, airy floral that has become a modern classic. Strawberry and gardenia create an infectious, happy sweetness with musk and vanilla keeping it grounded.', NULL);

-- 82. Viktor & Rolf Flowerbomb
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1142', 'Flowerbomb', 'Viktor & Rolf', 2005, 'Eau de Parfum', 'Bergamot, Tea, Osmanthus', 'Cattleya Orchid, Sambac Jasmine, Centifolia Rose, Freesia', 'Patchouli, Musk, Vanilla', 'An explosion of flowers in a grenade-shaped bottle. Thousands of flowers create an opulent, feminine bouquet with patchouli and vanilla adding addictive sweetness.', NULL);

-- 83. Narciso Rodriguez For Her
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1143', 'For Her', 'Narciso Rodriguez', 2003, 'Eau de Toilette', 'Rose, Peach, Bergamot', 'Musk, Amber, Osmanthus', 'Sandalwood, Vetiver, Patchouli, Vanilla', 'A musk-centric masterpiece that revolutionized the musky-floral genre. The interplay of heart and skin musks creates an intimate, sensual veil close to the skin.', NULL);

-- 84. Valentino Donna Born in Roma
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1144', 'Donna Born in Roma', 'Valentino', 2019, 'Eau de Parfum', 'Blackcurrant, Pink Pepper, Bergamot', 'Jasmine, Rose, Granny Smith Apple', 'Cashmeran, Vanilla, Bourbon Woody', 'A modern Roman feminine with jasmine and blackcurrant creating couture elegance. Cashmeran and vanilla add warmth reminiscent of sunset over the Eternal City.', NULL);

-- 85. Carolina Herrera Good Girl
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1145', 'Good Girl', 'Carolina Herrera', 2016, 'Eau de Parfum', 'Almond, Coffee, Bergamot', 'Tuberose, Jasmine Sambac, Rose', 'Tonka Bean, Cacao, Sandalwood, Vanilla, Cedar', 'Duality in a stiletto bottle: good girl meets bad girl. Jasmine''s light elegance clashes with dark tonka bean and cacao in a seductively contrasting composition.', NULL);

-- 86. Mugler Angel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1146', 'Angel', 'Mugler', 1992, 'Eau de Parfum', 'Bergamot, Coconut, Cotton Candy', 'Red Berries, Honey, Caramel', 'Patchouli, Vanilla, Chocolate, Dark Woody Notes', 'The revolutionary gourmand that changed perfumery forever. Chocolate, patchouli, and caramel created a completely new olfactory family when it launched in 1992.', NULL);

-- 87. Dolce & Gabbana Light Blue
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1147', 'Light Blue', 'Dolce & Gabbana', 2001, 'Eau de Toilette', 'Sicilian Lemon, Apple, Bluebell, Bamboo', 'Jasmine, White Rose', 'Cedar, Musk, Amber', 'A sparkling Mediterranean citrus that has become an iconic summer fragrance. Sicilian lemon and apple create an irresistible freshness evoking Italian coastline holidays.', NULL);

-- 88. Prada Luna Rossa Carbon
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1148', 'Luna Rossa Carbon', 'Prada', 2017, 'Eau de Toilette', 'Bergamot, Lavender, Pepper', 'Metallic Notes, Ambroxan', 'Patchouli, Drywood, Amber', 'A futuristic aromatic inspired by carbon fiber technology in sailing. Lavender and ambroxan create a mineral, sleek masculinity that feels both modern and lasting.', NULL);

-- 89. Versace Eros
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1149', 'Eros', 'Versace', 2012, 'Eau de Toilette', 'Mint, Green Apple, Lemon', 'Tonka Bean, Ambroxan, Geranium', 'Vanilla, Vetiver, Oakmoss, Cedar', 'Named after the Greek god of love, a bold, sweet-fresh masculine. Mint and green apple over tonka and vanilla create an unmistakable, crowd-pleasing signature.', NULL);

-- 90. Givenchy L''Interdit
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1150', 'L''Interdit', 'Givenchy', 2018, 'Eau de Parfum', 'Pear, Bergamot, Pink Pepper', 'Orange Blossom, Jasmine, Tuberose', 'Patchouli, Vetiver, Ambroxan, Musk', 'A modern reinterpretation of the 1957 fragrance created for Audrey Hepburn. White flowers clash with dark patchouli and vetiver in a daring, elegant paradox.', NULL);

-- 91. Maison Francis Kurkdjian Baccarat Rouge 540
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1151', 'Baccarat Rouge 540', 'Maison Francis Kurkdjian', 2015, 'Eau de Parfum', 'Saffron, Jasmine', 'Amberwood, Ambergris', 'Fir Resin, Cedar, Musk', 'The fragrance phenomenon of the 2020s. Saffron, amberwood, and fir resin create a luminous, candied, woody-amber that has spawned countless imitators worldwide.', NULL);

-- 92. Paco Rabanne 1 Million
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1152', '1 Million', 'Paco Rabanne', 2008, 'Eau de Toilette', 'Grapefruit, Mint, Blood Mandarin', 'Rose, Cinnamon, Spice Notes', 'Leather, Amber, Woody Notes, Patchouli', 'An audaciously sweet spicy leather in a gold bar bottle. The grapefruit-cinnamon-leather combination became a nightlife staple and one of the century''s top sellers.', NULL);

-- 93. Issey Miyake L''Eau d''Issey Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1153', 'L''Eau d''Issey Pour Homme', 'Issey Miyake', 1994, 'Eau de Toilette', 'Yuzu, Bergamot, Lemon, Tarragon, Sage', 'Blue Water Lily, Cinnamon, Nutmeg, Bourbon Geranium', 'Vetiver, Amber, Musk, Sandalwood, Cedar', 'A pioneering aquatic masculine that defined the clean, fresh genre. Yuzu and water lily create a transparent, ozonic freshness that remains influential decades later.', NULL);

-- 94. Dolce & Gabbana The One
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1154', 'The One', 'Dolce & Gabbana', 2006, 'Eau de Toilette', 'Grapefruit, Coriander, Basil', 'Ginger, Cardamom, Orange Blossom, Cedar', 'Amber, Labdanum, Tobacco, Musk', 'A warm, spicy masculine that embodies Italian sophistication. Ginger and tobacco create a refined warmth perfect for the man who knows quality.', NULL);

-- 95. Giorgio Armani Acqua di Gio Profumo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1155', 'Acqua di Gio Profumo', 'Giorgio Armani', 2015, 'Eau de Parfum', 'Bergamot, Aquatic Notes, Mandarin', 'Geranium, Rosemary, Sage, Amber', 'Patchouli, Incense, Amber, Musk', 'The masterful evolution of Acqua di Gio with incense and amber adding sophistication. Alberto Morillas created a darker, more complex version that transcends seasons.', NULL);

-- 96. Montblanc Explorer
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1156', 'Legend Spirit', 'Montblanc', 2016, 'Eau de Toilette', 'Grapefruit, Pink Pepper, Bergamot', 'Lavender, Aquatic Notes, Cardamom', 'Oakmoss, Sandalwood, Cashmere Wood, Musk', 'A bright, fresh aromatic that captures the spirit of modern exploration. Grapefruit and lavender create an invigorating start that settles into smooth sandalwood.', NULL);

-- 97. Guerlain Shalimar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1157', 'Shalimar', 'Guerlain', 1925, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin', 'Iris, Jasmine, Rose, May Rose', 'Sandalwood, Vanilla, Tonka Bean, Incense, Opoponax, Benzoin', 'One of the greatest perfumes ever created, inspired by the love story of Shah Jahan and Mumtaz Mahal. Vanilla and incense create an oriental masterpiece that defined a genre.', NULL);

-- 98. Chanel No 5
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1158', 'No 5', 'Chanel', 1921, 'Eau de Parfum', 'Neroli, Ylang-Ylang, Bergamot, Lemon, Aldehydes', 'Jasmine, Rose, Iris, Lily of the Valley', 'Sandalwood, Vanilla, Vetiver, Musk, Cedar, Amber', 'The most famous perfume in history. Ernest Beaux''s revolutionary use of aldehydes created an abstract floral that transcended perfumery to become a cultural icon.', NULL);

-- 99. Guerlain L''Heure Bleue
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1159', 'L''Heure Bleue', 'Guerlain', 1912, 'Eau de Parfum', 'Bergamot, Anise, Coriander, Lemon', 'Rose, Carnation, Violet, Tuberose, Iris', 'Vanilla, Benzoin, Musk, Sandalwood, Incense', 'The "Blue Hour" between daylight and dusk, created by Jacques Guerlain. A melancholic, powdery masterpiece with iris and vanilla capturing twilight''s tender nostalgia.', NULL);

-- 100. Chanel Bleu de Chanel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1160', 'Bleu de Chanel', 'Chanel', 2010, 'Eau de Parfum', 'Lemon, Mint, Pink Pepper, Grapefruit', 'Iso E Super, Ginger, Jasmine, Nutmeg', 'Incense, Vetiver, Cedar, Sandalwood, Patchouli, Labdanum', 'One of the best-selling masculine fragrances worldwide. Jacques Polge created a supremely versatile woody-aromatic that transitions seamlessly from office to evening.', NULL);

-- End of migration 028
-- Total: 100 Indie/Emerging + Missing Classics (s1061-s1160)
-- Brands covered: Gallivant (6), Imaginary Authors (8), D.S. & Durga (6),
-- 4160 Tuesdays (6), House of Oud (6), Alexandria Fragrances (6),
-- Zadig & Voltaire (6), Acqua di Parma (10), Creed (10), Jo Malone (11),
-- Chanel (3), Guerlain (3), Lancome (1), YSL (1), Marc Jacobs (1),
-- Viktor & Rolf (1), Narciso Rodriguez (1), Valentino (1), Carolina Herrera (1),
-- Mugler (1), D&G (2), Prada (1), Versace (1), Givenchy (1), MFK (1),
-- Paco Rabanne (1), Issey Miyake (1), Montblanc (1), Giorgio Armani (1)
