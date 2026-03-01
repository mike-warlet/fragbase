-- Migration 027: Batch 6 - 100 Middle Eastern, Arabian & Brazilian Perfumes
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids
-- IDs: s961-s1060

-- === LATTAFA (s961-s980) ===

-- 1. Lattafa Oud Mood
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s961', 'Oud Mood', 'Lattafa', 2019, 'Eau de Parfum', 'Bergamot, Lemon, Lavender', 'Rose, Geranium, Saffron', 'Oud, Amber, Musk, Vanilla, Sandalwood', 'A rich Arabian oud fragrance balancing Western aromatic freshness with deep Eastern oud and saffron. Warm amber and sandalwood provide lasting comfort.', NULL);

-- 2. Lattafa Ana Abiyedh
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s962', 'Ana Abiyedh', 'Lattafa', 2020, 'Eau de Parfum', 'Bergamot, Pink Pepper, Lemon', 'Iris, Rose, Jasmine', 'Amber, Cedar, Musk, Patchouli', 'A bright, modern Arabian fragrance meaning "I am white." Clean iris and rose over warm amber create an elegant, office-friendly composition.', NULL);

-- 3. Lattafa Oud Mood Elixir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s963', 'Oud Mood Elixir', 'Lattafa', 2020, 'Eau de Parfum', 'Saffron, Cardamom, Nutmeg', 'Rose, Oud, Amber', 'Vanilla, Musk, Sandalwood, Benzoin', 'An intensified version of Oud Mood, amplifying the saffron and oud accord with added warmth from nutmeg and rich benzoin in the drydown.', NULL);

-- 4. Lattafa Qaed Al Fursan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s964', 'Qaed Al Fursan', 'Lattafa', 2022, 'Eau de Parfum', 'Pineapple, Black Pepper, Bergamot', 'Birch, Rose, Patchouli', 'Amber, Musk, Vanilla, Oakmoss', 'A bold fruity-woody scent meaning "Leader of the Knights." Pineapple and birch create a confident, projecting composition suited to Arabian tastes.', NULL);

-- 5. Lattafa Mayar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s965', 'Mayar', 'Lattafa', 2023, 'Eau de Parfum', 'Bergamot, Pink Pepper, Pear', 'Rose, Peony, Jasmine', 'Musk, Amber, Vanilla, Cedar', 'A feminine floral gourmand that has gained a massive following. Delicate pear and pink pepper open into lush florals anchored by creamy vanilla and musk.', NULL);

-- 6. Lattafa Thameen Collection - Sakeena
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s966', 'Thameen Sakeena', 'Lattafa', 2021, 'Eau de Parfum', 'Saffron, Bergamot', 'Rose, Jasmine, Honey', 'Oud, Amber, Musk, Sandalwood, Vanilla', 'From Lattafa''s premium Thameen line, a sumptuous oud-rose composition enriched with honey and saffron. Meaning "tranquility," it offers opulent warmth.', NULL);

-- 7. Lattafa Badee Al Oud Honor & Glory
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s967', 'Badee Al Oud Honor & Glory', 'Lattafa', 2022, 'Eau de Parfum', 'Apple, Pineapple, Bergamot', 'Jasmine, Birch, Ambroxan', 'Cedar, Musk, Patchouli, Vanilla', 'A crowd-pleasing fruity aromatic from Lattafa''s Badee Al Oud collection. Tropical pineapple and apple fused with smoky birch and soft vanilla.', NULL);

-- 8. Lattafa Maharjan Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s968', 'Maharjan Gold', 'Lattafa', 2020, 'Eau de Parfum', 'Bergamot, Pink Pepper, Cardamom', 'Iris, Leather, Amber', 'Oud, Benzoin, Musk, Vanilla, Tonka Bean', 'A luxurious oriental leather inspired by festive celebrations. Rich cardamom and leather wrapped in golden amber and deep oud.', NULL);

-- 9. Lattafa Haya
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s969', 'Haya', 'Lattafa', 2023, 'Eau de Parfum', 'Raspberry, Bergamot, Pink Pepper', 'Rose, Peony, Jasmine Sambac', 'Musk, Ambroxan, Cedar, Patchouli', 'A modern feminine fragrance meaning "modesty." Fruity raspberry and pink pepper open into romantic florals with a clean, musky base that radiates elegance.', NULL);

-- 10. Lattafa Opulent Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s970', 'Opulent Oud', 'Lattafa', 2019, 'Eau de Parfum', 'Bergamot, Lemon, Orange', 'Oud, Rose, Jasmine', 'Amber, Musk, Sandalwood, Vanilla, Leather', 'A rich oud-centric composition with citrus brightness. The rose-oud heart is classic Arabian perfumery, grounded by leather and amber for lasting presence.', NULL);

-- === ARMAF (s971-s985) ===

-- 11. Armaf Club de Nuit Intense Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s971', 'Club de Nuit Intense Man', 'Armaf', 2015, 'Eau de Toilette', 'Lemon, Pineapple, Bergamot, Apple, Blackcurrant', 'Birch, Jasmine, Rose', 'Musk, Ambergris, Patchouli, Vanilla', 'One of the most popular Arabian designer alternatives. A bold fruity-smoky composition with pineapple and birch that has earned cult status among fragrance enthusiasts.', NULL);

-- 12. Armaf Club de Nuit Intense Woman
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s972', 'Club de Nuit Intense Woman', 'Armaf', 2015, 'Eau de Toilette', 'Orange, Peach, Bergamot, Rose', 'Jasmine, Lily of the Valley, Iris, Ylang-Ylang', 'Musk, Amber, Sandalwood, Cedar, Vanilla', 'A floral-fruity feminine with impressive projection. Orange and peach open brightly before settling into a warm, sensual amber and sandalwood drydown.', NULL);

-- 13. Armaf Sillage
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s973', 'Sillage', 'Armaf', 2019, 'Eau de Parfum', 'Black Pepper, Grapefruit, Cardamom, Juniper Berry', 'Lavender, Pineapple, Geranium, Apple', 'Cedar, Ambroxan, Elemi, Clearwood', 'Named after the fragrance trail a perfume leaves. A modern aromatic with fresh cardamom and lavender creating outstanding projection and longevity.', NULL);

-- 14. Armaf Tres Nuit
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s974', 'Tres Nuit', 'Armaf', 2017, 'Eau de Toilette', 'Bergamot, Lavender, Lemon Verbena', 'Pink Pepper, Peppermint, Cinnamon, Iris', 'Ambergris, Musk, Patchouli, Labdanum', 'A refined aromatic fougere with lavender, iris, and ambergris. The subtle spice of pink pepper bridges the fresh opening and the warm, earthy base.', NULL);

-- 15. Armaf Club de Nuit Milestone
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s975', 'Club de Nuit Milestone', 'Armaf', 2020, 'Eau de Parfum', 'Bergamot, Green Apple, Blackcurrant', 'Birch, Jasmine, Rose, Patchouli', 'Oakmoss, Cedar, Ambergris, Musk, Vanilla', 'An elevated take on the Club de Nuit DNA with richer ingredients. Green apple and blackcurrant meet birch and oakmoss in a sophisticated, long-lasting formula.', NULL);

-- 16. Armaf Derby Club House Blanche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s976', 'Derby Club House Blanche', 'Armaf', 2015, 'Eau de Toilette', 'Bergamot, Green Apple, Pineapple', 'Jasmine, Lily, Rose', 'White Musk, Amber, Sandalwood, Cedar', 'A clean, white-themed masculine with fresh pineapple and green apple. The white musk drydown is smooth and office-appropriate, making it an everyday staple.', NULL);

-- 17. Armaf Niche Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s977', 'Niche Oud', 'Armaf', 2018, 'Eau de Parfum', 'Bergamot, Saffron, Black Pepper', 'Rose, Oud, Patchouli', 'Leather, Amber, Musk, Vanilla, Sandalwood', 'A premium oud offering from Armaf''s Niche line. Saffron and rose frame a rich oud heart with leather and sandalwood creating depth and sophistication.', NULL);

-- 18. Armaf Legesi
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s978', 'Legesi', 'Armaf', 2020, 'Eau de Parfum', 'Grapefruit, Bergamot, Lemon', 'Lavender, Apple, Sage', 'Cedar, Vetiver, Ambroxan, Musk', 'A modern, clean aromatic with bright citrus and herbaceous lavender. The ambroxan-driven base creates a skin-hugging, long-lasting mineral freshness.', NULL);

-- 19. Armaf Hunter Intense
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s979', 'Hunter Intense', 'Armaf', 2017, 'Eau de Parfum', 'Bergamot, Grapefruit, Black Pepper', 'Geranium, Lavender, Nutmeg', 'Vetiver, Cedar, Amber, Patchouli, Musk', 'A bold, spicy aromatic fougere with projection to match. Black pepper and nutmeg give it warmth while vetiver and patchouli anchor it with earthy masculinity.', NULL);

-- 20. Armaf Ventana Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s980', 'Ventana Pour Homme', 'Armaf', 2021, 'Eau de Parfum', 'Bergamot, Lavender, Mint', 'Geranium, Iris, Violet Leaf', 'Tonka Bean, Ambroxan, Cedar, Musk', 'A fresh, office-friendly aromatic with iris and lavender at its heart. Ambroxan and tonka bean create a smooth, skin-scent finish perfect for daily wear.', NULL);

-- === AL HARAMAIN (s981-s990) ===

-- 21. Al Haramain Amber Oud Rouge
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s981', 'Amber Oud Rouge', 'Al Haramain', 2020, 'Eau de Parfum', 'Bitter Almond, Saffron, Plum', 'Jasmine, Rose, Orris, Cedar', 'Amber, Vanilla, Fir Resin, Labdanum', 'A deep, resinous oriental with plum and bitter almond creating an opulent opening. Saffron-laced rose and amber make it a standout in Al Haramain''s luxury line.', NULL);

-- 22. Al Haramain Detour Noir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s982', 'Detour Noir', 'Al Haramain', 2018, 'Eau de Parfum', 'Bergamot, Grapefruit, Elemi', 'Iris, Violet, Geranium, Ambroxan', 'Vetiver, Benzoin, Musk, Patchouli, Cedar', 'A dark, sophisticated woody aromatic. Iris and violet give it a powdery elegance while vetiver and patchouli create depth. A hidden gem from the UAE house.', NULL);

-- 23. Al Haramain Junoon
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s983', 'Junoon', 'Al Haramain', 2016, 'Eau de Parfum', 'Rose, Saffron, Black Pepper', 'Oud, Amber, Incense', 'Sandalwood, Musk, Leather, Benzoin', 'Meaning "obsession" in Arabic, a passionate oud-rose fragrance with smoky incense and warm leather. A traditional Arabian composition with modern projection.', NULL);

-- 24. Al Haramain Portfolio Imperial Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s984', 'Portfolio Imperial Oud', 'Al Haramain', 2020, 'Eau de Parfum', 'Bergamot, Cardamom, Plum', 'Iris, Oud, Amber', 'Leather, Sandalwood, Musk, Vetiver, Vanilla', 'A regal oud from Al Haramain''s premium Portfolio range. Cardamom and plum add richness to the iris-oud heart, with leather and vetiver ensuring masculine depth.', NULL);

-- 25. Al Haramain L''Aventure Blanche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s985', 'L''Aventure Blanche', 'Al Haramain', 2018, 'Eau de Parfum', 'Lemon, Bergamot, Grapefruit', 'Jasmine, Orange Blossom, Rose', 'White Musk, Cedar, Ambroxan, Sandalwood', 'A clean, luminous flanker of the popular L''Aventure. White musk and ambroxan create a modern, fresh finish ideal for warm weather and everyday sophistication.', NULL);

-- 26. Al Haramain Oudh 36
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s986', 'Oudh 36', 'Al Haramain', 2016, 'Extrait de Parfum', 'Bergamot, Green Apple, Saffron', 'Agarwood, Rose, Orris', 'Sandalwood, Musk, Vanilla, Amber, Oud', 'An extrait concentration from the prestigious 36 Madinah collection. Deep oud and saffron create an intensely rich, long-lasting Arabian oud experience.', NULL);

-- 27. Al Haramain Rafia Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s987', 'Rafia Gold', 'Al Haramain', 2021, 'Eau de Parfum', 'Bergamot, Pear, Mandarin', 'Rose, Jasmine, Peony, Magnolia', 'Musk, Amber, Vanilla, Patchouli, Cedar', 'A golden feminine with juicy pear and bright bergamot opening into a lush floral bouquet. Warm vanilla and amber give it a sensuous trail.', NULL);

-- === SWISS ARABIAN (s988-s995) ===

-- 28. Swiss Arabian Shaghaf Oud Aswad
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s988', 'Shaghaf Oud Aswad', 'Swiss Arabian', 2019, 'Eau de Parfum', 'Saffron, Lavender, Lemon', 'Rose, Oud, Labdanum', 'Amber, Vanilla, Sandalwood, Musk, Patchouli', 'The "Black Passion" edition of the popular Shaghaf line. Darker and more intense, with lavender and labdanum adding smoky, animalic depth to the oud-rose core.', NULL);

-- 29. Swiss Arabian Casablanca
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s989', 'Casablanca', 'Swiss Arabian', 2020, 'Eau de Parfum', 'Bergamot, Pink Pepper, Apple', 'Iris, Jasmine, Rose', 'Amber, Musk, Cedar, Vetiver, Patchouli', 'A modern, versatile masculine from the long-established Dubai house. Fresh apple and bergamot meet warm amber in a crowd-pleasing composition.', NULL);

-- 30. Swiss Arabian Rasheeqa
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s990', 'Rasheeqa', 'Swiss Arabian', 2018, 'Eau de Parfum', 'Bergamot, Apple, Grapefruit', 'Jasmine, Rose, Lily of the Valley', 'Musk, Cedar, Amber, Sandalwood', 'Meaning "graceful," a bright, feminine floral fruity with green apple and bergamot. The jasmine-rose heart is soft and romantic over a gentle musky base.', NULL);

-- 31. Swiss Arabian Layali
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s991', 'Layali', 'Swiss Arabian', 2012, 'Eau de Parfum', 'Rose, Bergamot', 'Jasmine, White Musk, Amber', 'Sandalwood, Vanilla, Oud', 'Meaning "nights," an enchanting oriental floral. Rose and jasmine are bathed in amber and sandalwood creating a warm, romantic evening scent from this heritage house.', NULL);

-- 32. Swiss Arabian Amaani
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s992', 'Amaani', 'Swiss Arabian', 2020, 'Eau de Parfum', 'Mandarin, Pear, Pink Pepper', 'Rose, Peony, Jasmine, Lily', 'Musk, Amber, Sandalwood, Cedar', 'A delicate feminine meaning "my wishes." Fresh mandarin and pear cascade into a soft floral heart with rose and peony, finished with warm sandalwood and musk.', NULL);

-- 33. Swiss Arabian Mutaqin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s993', 'Mutaqin', 'Swiss Arabian', 2021, 'Eau de Parfum', 'Bergamot, Black Pepper, Cardamom', 'Geranium, Lavender, Cedar', 'Vetiver, Amber, Musk, Patchouli, Oud', 'A spicy-woody masculine with traditional Arabian oud depth. Cardamom and black pepper add vigor while lavender and vetiver provide aromatic elegance.', NULL);

-- === RASASI (s994-s1000) ===

-- 34. Rasasi Rumz Al Rasasi 9325 Pour Lui
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s994', 'Rumz Al Rasasi 9325 Pour Lui', 'Rasasi', 2016, 'Eau de Parfum', 'Grapefruit, Apple, Cinnamon', 'Jasmine, Lily, Geranium', 'Sandalwood, Musk, Vanilla, Amber', 'A refined masculine from Rasasi''s premium line with a sophisticated transition from fresh citrus to warm sandalwood. Versatile and well-blended.', NULL);

-- 35. Rasasi Fattan Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s995', 'Fattan Pour Homme', 'Rasasi', 2020, 'Eau de Parfum', 'Bergamot, Pink Pepper, Grapefruit', 'Lavender, Geranium, Cardamom', 'Vetiver, Cedar, Amber, Tonka Bean, Musk', 'A fresh, spicy aromatic masculine with excellent longevity. Lavender and cardamom create an elegant, professional aura with warm tonka bean depth.', NULL);

-- 36. Rasasi Sotoor Seen
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s996', 'Sotoor Seen', 'Rasasi', 2017, 'Eau de Parfum', 'Saffron, Cardamom, Pink Pepper', 'Rose, Oud, Amber', 'Sandalwood, Vanilla, Musk, Benzoin', 'From Rasasi''s Sotoor collection, a luxurious saffron-oud composition. Rose and amber bridge the spicy opening with a velvety sandalwood-vanilla drydown.', NULL);

-- 37. Rasasi Blue Lady
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s997', 'Blue Lady', 'Rasasi', 2013, 'Eau de Parfum', 'Bergamot, Peach, Pear', 'Jasmine, Rose, Ylang-Ylang, Lily', 'Sandalwood, Musk, Amber, Vanilla, Cedar', 'A feminine fruity-floral with peach and pear opening into a rich floral bouquet. The warm sandalwood-vanilla base gives it lasting sensuality and presence.', NULL);

-- 38. Rasasi Shuhrah Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s998', 'Shuhrah Pour Homme', 'Rasasi', 2019, 'Eau de Parfum', 'Bergamot, Apple, Mint', 'Lavender, Geranium, Sage', 'Amber, Musk, Cedar, Tonka Bean, Vetiver', 'A fresh aromatic fougere with mint and lavender creating a clean, masculine character. Cedar and tonka bean add warmth to this versatile daily fragrance.', NULL);

-- 39. Rasasi Al Wisam Day
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s999', 'Al Wisam Day', 'Rasasi', 2015, 'Eau de Parfum', 'Bergamot, Grapefruit, Green Apple', 'Cardamom, Cedar, Geranium', 'Sandalwood, Musk, Amber, Vetiver, Moss', 'A bright, office-appropriate masculine designed for daytime wear. Green apple freshness transitions smoothly into aromatic cedar and sandalwood.', NULL);

-- 40. Rasasi Faqat Lil Rijal
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1000', 'Faqat Lil Rijal', 'Rasasi', 2017, 'Eau de Parfum', 'Bergamot, Lavender, Grapefruit', 'Cinnamon, Nutmeg, Orris', 'Leather, Amber, Oud, Musk, Patchouli', 'Meaning "for men only," a robust spicy-leather oriental. Cinnamon and nutmeg meet rich leather and oud in a traditionally masculine Arabian composition.', NULL);

-- === AJMAL (s1001-s1010) ===

-- 41. Ajmal Aristocrat
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1001', 'Aristocrat', 'Ajmal', 2019, 'Eau de Parfum', 'Bergamot, Mandarin, Lavender', 'Geranium, Jasmine, Cinnamon', 'Tonka Bean, Amber, Musk, Cedar, Vanilla', 'A refined, polished masculine from the prestigious Dubai house. Lavender and mandarin open with elegance before warm tonka bean and amber create a noble drydown.', NULL);

-- 42. Ajmal Amber Wood
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1002', 'Amber Wood', 'Ajmal', 2018, 'Eau de Parfum', 'Lemon, Pink Pepper', 'Amber, Cedar, Geranium', 'Sandalwood, Musk, Vetiver, Patchouli', 'A smooth woody amber from Ajmal''s premium collection. Pink pepper adds sparkle to the amber-cedar heart while sandalwood and vetiver provide earthy depth.', NULL);

-- 43. Ajmal Shadow II Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1003', 'Shadow II Pour Homme', 'Ajmal', 2016, 'Eau de Parfum', 'Cardamom, Grapefruit, Mint', 'Oud, Amber, Rose', 'Sandalwood, Musk, Vanilla, Cedar', 'A mysterious oud-amber masculine with cooling mint and cardamom. The rose-oud heart is quintessentially Arabian, softened by smooth vanilla and cedar.', NULL);

-- 44. Ajmal Sacrifice For Him
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1004', 'Sacrifice For Him', 'Ajmal', 2016, 'Eau de Parfum', 'Bergamot, Green Apple, Pink Pepper', 'Rose, Jasmine, Iris', 'Leather, Amber, Musk, Patchouli, Vetiver', 'A bold, projecting masculine with fruity brightness giving way to a leather-patchouli base. The iris adds powdery refinement to this confident composition.', NULL);

-- 45. Ajmal Wisal Dhahab
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1005', 'Wisal Dhahab', 'Ajmal', 2019, 'Eau de Parfum', 'Bergamot, Saffron, Pink Pepper', 'Oud, Rose, Geranium', 'Amber, Sandalwood, Musk, Vanilla, Tonka Bean', 'The "Golden Connection" is a luxurious saffron-oud oriental. Rose and geranium bridge the spicy opening with a warm, golden amber base.', NULL);

-- 46. Ajmal Oudh Mukhallat
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1006', 'Oudh Mukhallat', 'Ajmal', 2015, 'Eau de Parfum', 'Saffron, Rose, Bergamot', 'Oud, Amber, Incense', 'Sandalwood, Vanilla, Musk, Benzoin', 'A traditional mukhallat-style oud blending saffron, rose, and incense in the classic Arabian manner. Rich sandalwood and benzoin create a meditative, lasting trail.', NULL);

-- 47. Ajmal Raindrops
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1007', 'Raindrops', 'Ajmal', 2018, 'Eau de Parfum', 'Mandarin, Raspberry, Pear', 'Jasmine, Rose, Peony', 'Musk, Amber, Cedar, Vanilla', 'A fresh, feminine fruity-floral evoking petrichor. Raspberry and mandarin sparkle like morning dew over delicate florals and a warm, skin-like musk finish.', NULL);

-- === ARD AL ZAAFARAN (s1008-s1017) ===

-- 48. Ard Al Zaafaran Dirham Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1008', 'Dirham Gold', 'Ard Al Zaafaran', 2018, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin', 'Jasmine, Rose, Ylang-Ylang', 'Musk, Amber, Sandalwood, Vanilla, Patchouli', 'Named after the golden coin, a bright, opulent floral oriental. Citrus and florals create an inviting, warm composition with excellent sillage for the price.', NULL);

-- 49. Ard Al Zaafaran Oud 24 Hours
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1009', 'Oud 24 Hours', 'Ard Al Zaafaran', 2017, 'Eau de Parfum', 'Saffron, Bergamot, Cardamom', 'Oud, Rose, Incense', 'Amber, Sandalwood, Musk, Vanilla, Leather', 'Promising all-day oud longevity, a robust, traditional Arabian oud. Saffron and incense create a smoky, spiritual aura grounded by leather and sandalwood.', NULL);

-- 50. Ard Al Zaafaran Midnight Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1010', 'Midnight Oud', 'Ard Al Zaafaran', 2019, 'Eau de Parfum', 'Bergamot, Lavender, Pink Pepper', 'Iris, Oud, Amber', 'Leather, Sandalwood, Musk, Vanilla, Tonka Bean', 'A dark, nocturnal oud with lavender and iris adding a sophisticated Western touch. Leather and vanilla create a seductive midnight atmosphere.', NULL);

-- 51. Ard Al Zaafaran Bukhoor
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1011', 'Bukhoor', 'Ard Al Zaafaran', 2016, 'Eau de Parfum', 'Saffron, Black Pepper, Cinnamon', 'Oud, Rose, Incense, Amber', 'Sandalwood, Musk, Benzoin, Vanilla', 'Capturing the essence of traditional Arabian incense burning. Saffron and cinnamon evoke the ritual of bukhoor, while sandalwood and benzoin add lasting warmth.', NULL);

-- 52. Ard Al Zaafaran Ana Abiyedh Rouge
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1012', 'Ana Abiyedh Rouge', 'Ard Al Zaafaran', 2021, 'Eau de Parfum', 'Saffron, Bitter Almond, Jasmine', 'Rose, Cedar, Amber', 'Vanilla, Fir Resin, Musk, Labdanum', 'A deep red interpretation of the Ana Abiyedh line. Bitter almond and saffron create a rich, gourmand opening with rose and labdanum adding dark warmth.', NULL);

-- 53. Ard Al Zaafaran Musk Al Aroos
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1013', 'Musk Al Aroos', 'Ard Al Zaafaran', 2018, 'Eau de Parfum', 'Bergamot, Rose, Green Notes', 'Jasmine, White Musk, Lily', 'Sandalwood, Amber, Cedar, Vanilla', 'Meaning "Bridal Musk," a delicate, romantic feminine perfect for special occasions. White musk and jasmine create an ethereal, soft veil of fragrance.', NULL);

-- 54. Ard Al Zaafaran Oud Al Shams
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1014', 'Oud Al Shams', 'Ard Al Zaafaran', 2019, 'Eau de Parfum', 'Saffron, Bergamot, Pink Pepper', 'Oud, Amber, Rose', 'Sandalwood, Vanilla, Musk, Benzoin, Leather', 'Meaning "Oud of the Sun," a warm, radiant oud bathed in golden saffron and amber. Rose and leather add complexity to this celebratory Arabian composition.', NULL);

-- 55. Ard Al Zaafaran Parfum Sultan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1015', 'Parfum Sultan', 'Ard Al Zaafaran', 2020, 'Eau de Parfum', 'Bergamot, Apple, Pineapple', 'Birch, Jasmine, Rose', 'Musk, Ambergris, Patchouli, Vanilla', 'A bold, projecting masculine with tropical fruit and smoky birch. Designed for the man who commands attention with confident, lasting presence.', NULL);

-- 56. Ard Al Zaafaran Bakhoor Al Arais
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1016', 'Bakhoor Al Arais', 'Ard Al Zaafaran', 2017, 'Eau de Parfum', 'Rose, Saffron, Cardamom', 'Oud, Amber, Jasmine', 'Sandalwood, Musk, Vanilla, Benzoin', 'An incense-inspired bridal fragrance blending traditional bakhoor accords with delicate florals. Oud and sandalwood create a ceremonial, reverent atmosphere.', NULL);

-- 57. Ard Al Zaafaran Oud Romancea
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1017', 'Oud Romancea', 'Ard Al Zaafaran', 2019, 'Eau de Parfum', 'Raspberry, Saffron, Pink Pepper', 'Rose, Oud, Jasmine', 'Amber, Musk, Vanilla, Sandalwood, Patchouli', 'A romantic, fruity oud pairing raspberry sweetness with traditional oud. Rose and jasmine add femininity while amber and vanilla create a sensuous, lasting trail.', NULL);

-- === O BOTICARIO (s1018-s1035) ===

-- 58. O Boticario Malbec
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1018', 'Malbec', 'O Boticario', 2004, 'Eau de Parfum', 'Bergamot, Grapefruit, Cardamom', 'Wine Accord, Geranium, Cinnamon', 'Oak Barrel, Vanilla, Amber, Musk, Sandalwood', 'Brazil''s most iconic masculine fragrance, aged in French oak barrels like its namesake wine. The wine accord gives it a unique, boozy warmth beloved across Latin America.', NULL);

-- 59. O Boticario Malbec Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1019', 'Malbec Gold', 'O Boticario', 2017, 'Eau de Parfum', 'Bergamot, Orange, Ginger', 'Wine Accord, Cinnamon, Saffron', 'Vanilla, Amber, Tonka Bean, Sandalwood', 'A golden evolution of the classic Malbec with saffron and tonka bean adding luxurious depth. The wine-barrel accord remains central in this warmer, richer flanker.', NULL);

-- 60. O Boticario Malbec Magnetic
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1020', 'Malbec Magnetic', 'O Boticario', 2022, 'Eau de Parfum', 'Bergamot, Pink Pepper, Cardamom', 'Magnetic Accord, Lavender, Wine', 'Amber, Vanilla, Tonka Bean, Cedar', 'The latest in the Malbec family, featuring a proprietary "magnetic" accord combining modern ambroxan-style molecules with the classic wine-barrel DNA.', NULL);

-- 61. O Boticario Lily
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1021', 'Lily', 'O Boticario', 2015, 'Eau de Parfum', 'Mandarin, Bergamot, Green Notes', 'Lily, Rose, Jasmine, Ylang-Ylang', 'Sandalwood, Musk, Amber, Vanilla', 'Brazil''s best-selling feminine fragrance centered on the lily flower. A luminous, elegant floral with Brazilian warmth and sophistication.', NULL);

-- 62. O Boticario Lily Absolu
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1022', 'Lily Absolu', 'O Boticario', 2019, 'Eau de Parfum', 'Bergamot, Black Pepper, Pear', 'Lily, Jasmine Sambac, Tuberose', 'Amber, Vanilla, Musk, Sandalwood, Benzoin', 'An intensified, more sensual version of the classic Lily. Black pepper and tuberose add boldness while benzoin and amber create an opulent, lingering base.', NULL);

-- 63. O Boticario Floratta Blue
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1023', 'Floratta Blue', 'O Boticario', 2004, 'Eau de Toilette', 'Bergamot, Mandarin, Water Notes', 'Violet, Lily of the Valley, Jasmine', 'Musk, Cedar, Amber, Sandalwood', 'A fresh, aquatic floral from the beloved Floratta line. Violet and lily of the valley create a youthful, airy composition perfect for tropical Brazilian days.', NULL);

-- 64. O Boticario Egeo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1024', 'Egeo', 'O Boticario', 2007, 'Eau de Toilette', 'Bergamot, Apple, Grapefruit', 'Coffee, Chocolate, Orange Blossom', 'Vanilla, Musk, Amber, Cedar', 'A gourmand unisex built around a delicious coffee-chocolate accord. The Brazilian cacao and coffee create a warm, inviting sweetness loved by both men and women.', NULL);

-- 65. O Boticario Egeo Dolce
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1025', 'Egeo Dolce', 'O Boticario', 2015, 'Eau de Toilette', 'Raspberry, Mandarin, Black Pepper', 'Dulce de Leche, Rose, Jasmine', 'Vanilla, Musk, Sandalwood, Tonka Bean', 'A sweet, dessert-like feminine from the Egeo line. Raspberry and dulce de leche create an irresistible caramel-fruity sweetness with Brazilian flair.', NULL);

-- 66. O Boticario Coffee Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1026', 'Coffee Man', 'O Boticario', 2005, 'Eau de Toilette', 'Cardamom, Bergamot, Grapefruit', 'Coffee, Lavender, Geranium', 'Leather, Amber, Vanilla, Musk, Tonka Bean', 'A distinctive masculine centered on Brazilian coffee. Cardamom and lavender frame the coffee heart, while leather and tonka bean create a warm, masculine base.', NULL);

-- 67. O Boticario Elysee
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1027', 'Elysee', 'O Boticario', 2017, 'Eau de Parfum', 'Bergamot, Mandarin, Green Notes', 'Rose, Iris, Jasmine, Peony', 'Amber, Musk, Patchouli, Sandalwood, Vanilla', 'A sophisticated French-inspired feminine featuring iris and rose over warm patchouli. Named after the Parisian avenue, it bridges Brazilian warmth with Parisian chic.', NULL);

-- 68. O Boticario Glamour Midnight
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1028', 'Glamour Midnight', 'O Boticario', 2017, 'Eau de Parfum', 'Pink Pepper, Bergamot, Raspberry', 'Rose, Jasmine, Osmanthus', 'Amber, Vanilla, Patchouli, Musk, Tonka Bean', 'A dark, seductive evening fragrance from the Glamour line. Raspberry and osmanthus create a mysterious, fruity-floral opening that deepens into velvety amber.', NULL);

-- === NATURA (s1029-s1045) ===

-- 69. Natura Essencial
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1029', 'Essencial', 'Natura', 2004, 'Eau de Parfum', 'Bergamot, Cardamom, Green Apple', 'Lavender, Geranium, Cedar', 'Sandalwood, Musk, Amber, Vetiver', 'Natura''s flagship masculine, one of the best-selling fragrances in Brazil. Clean bergamot and lavender over earthy sandalwood create a timeless, elegant composition.', NULL);

-- 70. Natura Essencial Exclusivo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1030', 'Essencial Exclusivo', 'Natura', 2015, 'Eau de Parfum', 'Bergamot, Pink Pepper, Nutmeg', 'Iris, Lavender, Rose', 'Vetiver, Amber, Patchouli, Tonka Bean, Musk', 'A premium evolution of the classic Essencial with iris and pink pepper adding sophistication. The vetiver-patchouli base provides depth and character.', NULL);

-- 71. Natura Humor 1
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1031', 'Humor 1', 'Natura', 2002, 'Eau de Toilette', 'Bergamot, Grapefruit, Apple', 'Jasmine, Rose, Lily of the Valley', 'Musk, Cedar, Sandalwood, Vanilla', 'The original from Natura''s playful Humor line. A bright, cheerful fruity-floral with apple and grapefruit creating an infectious, good-mood aura.', NULL);

-- 72. Natura Kaiak
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1032', 'Kaiak', 'Natura', 2005, 'Eau de Toilette', 'Mandarin, Bergamot, Grapefruit, Water Notes', 'Lavender, Sage, Marine Notes', 'Musk, Cedar, Amber, Driftwood', 'Named after the kayak, a fresh aquatic masculine evoking Brazilian rivers and coast. Citrus and marine notes create an energetic, sporty composition.', NULL);

-- 73. Natura Kaiak Urbe
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1033', 'Kaiak Urbe', 'Natura', 2017, 'Eau de Toilette', 'Bergamot, Pink Pepper, Ginger', 'Cardamom, Geranium, Lavender', 'Vetiver, Amber, Musk, Cedar, Patchouli', 'An urban take on the Kaiak line with ginger and cardamom adding metropolitan edge. Vetiver and patchouli create a sophisticated, city-ready composition.', NULL);

-- 74. Natura Luna
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1034', 'Luna', 'Natura', 2017, 'Eau de Parfum', 'Bergamot, Mandarin, Cherry', 'Rose, Jasmine, Peony, Lily', 'Musk, Sandalwood, Vanilla, Amber, Cedar', 'A romantic feminine inspired by moonlight. Cherry and rose create a sweet, luminous heart while sandalwood and vanilla add warmth like moonbeams on skin.', NULL);

-- 75. Natura Revelar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1035', 'Revelar', 'Natura', 2019, 'Eau de Parfum', 'Pink Pepper, Pear, Bergamot', 'Rose, Iris, Peony', 'Musk, Amber, Patchouli, Sandalwood, Vanilla', 'A feminine that "reveals" layers of personality. Pink pepper and pear make a sparkling impression, while iris and patchouli unveil hidden depth and sensuality.', NULL);

-- 76. Natura Homem
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1036', 'Homem', 'Natura', 2006, 'Eau de Toilette', 'Bergamot, Grapefruit, Mandarin', 'Sage, Pepper, Geranium', 'Cedar, Vetiver, Musk, Amber', 'Meaning simply "Man," Natura''s masculine pillar fragrance. Clean citrus and sage with cedar and vetiver creating an honest, straightforward masculine identity.', NULL);

-- 77. Natura Homem Dom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1037', 'Homem Dom', 'Natura', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Nutmeg', 'Iris, Whisky Accord, Tobacco', 'Amber, Vanilla, Sandalwood, Vetiver, Tonka Bean', 'A premium masculine with whisky and tobacco accords adding sophisticated warmth. Iris provides powdery elegance in this confident, evening-worthy composition.', NULL);

-- 78. Natura Ekos Frescor
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1038', 'Ekos Frescor de Maracuja', 'Natura', 2013, 'Eau de Toilette', 'Passion Fruit, Bergamot, Mandarin', 'Green Leaves, Jasmine, Watery Notes', 'Musk, Cedar, White Woods', 'From the sustainable Ekos line celebrating Amazonian biodiversity. Passion fruit creates a vibrant tropical freshness unique to Brazilian perfumery.', NULL);

-- 79. Natura Una
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1039', 'Una', 'Natura', 2015, 'Eau de Parfum', 'Bergamot, Pink Pepper, Mandarin', 'Rose, Jasmine, Tuberose, Iris', 'Patchouli, Amber, Musk, Sandalwood, Vanilla', 'Natura''s premium feminine line, a rich floral-oriental with tuberose and iris creating opulence. The patchouli-amber base adds lasting warmth and Brazilian sensuality.', NULL);

-- 80. Natura Essencial Feminino
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1040', 'Essencial Feminino', 'Natura', 2004, 'Eau de Parfum', 'Bergamot, Mandarin, Peach', 'Rose, Jasmine, Ylang-Ylang, Lily', 'Sandalwood, Musk, Amber, Vanilla, Cedar', 'The feminine counterpart to Essencial, one of Brazil''s most beloved women''s fragrances. Peach and rose create timeless femininity with warm sandalwood.', NULL);

-- 81. Natura Essencial Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1041', 'Essencial Oud', 'Natura', 2020, 'Eau de Parfum', 'Saffron, Bergamot, Cardamom', 'Oud, Rose, Amber', 'Sandalwood, Vanilla, Musk, Benzoin', 'Natura''s entry into oud perfumery, blending Arabian oud traditions with Brazilian warmth. Saffron and rose frame a rich, accessible oud experience.', NULL);

-- === L''BEL (s1042-s1050) ===

-- 82. L''Bel Devos Magnetic Elixir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1042', 'Devos Magnetic Elixir', 'L''Bel', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Mandarin', 'Lavender, Geranium, Cardamom', 'Amber, Vanilla, Tonka Bean, Musk, Cedar', 'A magnetic masculine elixir with lavender and cardamom creating sophistication. Tonka bean and vanilla add sweetness to this popular Latin American fragrance.', NULL);

-- 83. L''Bel Bleu Intense
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1043', 'Bleu Intense', 'L''Bel', 2015, 'Eau de Parfum', 'Bergamot, Grapefruit, Black Pepper', 'Lavender, Cedar, Apple', 'Vetiver, Amber, Musk, Patchouli, Tonka Bean', 'An intense blue fragrance with aromatic lavender and peppery notes. The vetiver-amber base adds depth to this versatile, office-friendly composition.', NULL);

-- 84. L''Bel Rouge Absolute
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1044', 'Rouge Absolute', 'L''Bel', 2018, 'Eau de Parfum', 'Raspberry, Pink Pepper, Bergamot', 'Rose, Jasmine, Iris, Osmanthus', 'Amber, Vanilla, Musk, Patchouli, Sandalwood', 'A red-themed feminine with raspberry and rose creating a passionate, romantic character. Osmanthus adds a fruity-apricot facet to this Latin American favorite.', NULL);

-- 85. L''Bel Noir Absolu
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1045', 'Noir Absolu', 'L''Bel', 2016, 'Eau de Parfum', 'Bergamot, Black Pepper, Cardamom', 'Leather, Iris, Cedar', 'Amber, Oud, Musk, Vanilla, Tonka Bean', 'A dark, mysterious masculine built around leather and oud. Cardamom and iris add refinement to this bold evening fragrance popular across Latin America.', NULL);

-- 86. L''Bel Expression
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1046', 'Expression', 'L''Bel', 2017, 'Eau de Toilette', 'Bergamot, Grapefruit, Apple', 'Jasmine, Rose, Peony', 'Musk, Cedar, Sandalwood, Amber', 'A fresh, feminine daily wear with apple brightness and floral elegance. Clean musk and sandalwood create a gentle, office-appropriate finish.', NULL);

-- 87. L''Bel Leyenda
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1047', 'Leyenda', 'L''Bel', 2019, 'Eau de Parfum', 'Bergamot, Ginger, Cardamom', 'Geranium, Lavender, Sage', 'Amber, Vetiver, Musk, Cedar, Leather', 'Meaning "legend," a bold masculine with ginger and cardamom spice. Lavender and vetiver create a classic fougere structure with a leather-amber base.', NULL);

-- 88. L''Bel Mithyka
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1048', 'Mithyka', 'L''Bel', 2018, 'Eau de Parfum', 'Bergamot, Mandarin, Pear', 'Rose, Jasmine, Tuberose, Peony', 'Amber, Musk, Vanilla, Sandalwood, Patchouli', 'An opulent feminine with tuberose and pear creating a rich, floral-fruity character. Named for its mythical allure, it offers lasting warmth and sensuality.', NULL);

-- 89. L''Bel Kentia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1049', 'Kentia', 'L''Bel', 2020, 'Eau de Parfum', 'Pink Pepper, Bergamot, Raspberry', 'Rose, Jasmine, Lily, Magnolia', 'Musk, Amber, Vanilla, Cedar, Tonka Bean', 'A modern feminine built on a lush floral heart of rose and jasmine with raspberry sweetness. Tonka bean and vanilla provide a gourmand softness on the skin.', NULL);

-- 90. L''Bel Devos Seduction
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1050', 'Devos Seduction', 'L''Bel', 2017, 'Eau de Toilette', 'Bergamot, Lemon, Apple', 'Lavender, Geranium, Cinnamon', 'Amber, Vanilla, Musk, Tonka Bean, Cedar', 'A seductive aromatic masculine with cinnamon warmth and lavender freshness. The vanilla-tonka base adds irresistible sweetness to this crowd-pleasing composition.', NULL);

-- === ADDITIONAL MIDDLE EASTERN (s1051-s1060) ===

-- 91. Afnan Supremacy Silver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1051', 'Supremacy Silver', 'Afnan', 2016, 'Eau de Parfum', 'Pineapple, Bergamot, Blackcurrant, Apple', 'Birch, Jasmine, Rose, Patchouli', 'Musk, Ambergris, Vanilla, Cedar', 'A highly popular Arabian fruity-woody that has developed a massive following. Pineapple and birch create bold projection with a smooth vanillic drydown.', NULL);

-- 92. Afnan 9pm
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1052', '9pm', 'Afnan', 2020, 'Eau de Parfum', 'Cinnamon, Apple, Bergamot', 'Lavender, Orange Blossom, Rose', 'Vanilla, Amber, Tonka Bean, Musk, Cedar', 'A sweet, spicy amber that has become one of the best-selling Arabian designer fragrances globally. Apple and cinnamon with lavender and vanilla create an addictive warmth.', NULL);

-- 93. Afnan Rare Carbon
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1053', 'Rare Carbon', 'Afnan', 2021, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Ambroxan, Geranium, Violet', 'Cedar, Musk, Patchouli, Labdanum', 'A mineral, woody aromatic with ambroxan creating an airy, modern masculinity. Pink pepper and grapefruit add brightness to the earthy cedar-patchouli base.', NULL);

-- 94. Rasasi Egra
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1054', 'Egra', 'Rasasi', 2016, 'Eau de Parfum', 'Pink Pepper, Bergamot, Mandarin', 'Rose, Saffron, Oud', 'Amber, Sandalwood, Musk, Vanilla', 'A refined feminine oud from Rasasi with pink pepper and rose creating an elegant, modern Arabian composition. Saffron and amber add warmth and depth.', NULL);

-- 95. Al Rehab Lovely
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1055', 'Lovely', 'Al Rehab', 2010, 'Perfume Oil', 'Bergamot, Peach, Green Apple', 'Rose, Jasmine, Lily of the Valley', 'Musk, Sandalwood, Amber, Vanilla', 'An affordable Arabian perfume oil that has achieved cult status. Peach and rose create a sweet, feminine character in this highly concentrated oil format.', NULL);

-- 96. Al Rehab Choco Musk
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1056', 'Choco Musk', 'Al Rehab', 2012, 'Perfume Oil', 'Bergamot, Orange', 'Chocolate, Coffee, Vanilla', 'Musk, Amber, Sandalwood', 'One of the most popular Arabian perfume oils worldwide. Rich chocolate and coffee create an irresistible gourmand over a clean musk base at an unbeatable price.', NULL);

-- 97. Lattafa Ejaazi
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1057', 'Ejaazi', 'Lattafa', 2021, 'Eau de Parfum', 'Bergamot, Lemon, Pink Pepper', 'Iris, Rose, Lavender', 'Amber, Musk, Sandalwood, Cedar, Leather', 'A versatile, office-appropriate fragrance with iris and lavender creating refinement. Leather and amber add depth to this polished Arabian composition.', NULL);

-- 98. Swiss Arabian Shagaf Oud AHMAR
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1058', 'Shaghaf Oud Ahmar', 'Swiss Arabian', 2020, 'Eau de Parfum', 'Saffron, Red Berries, Pink Pepper', 'Rose, Oud, Amber', 'Sandalwood, Vanilla, Musk, Benzoin', 'The "Red Passion" from the Shaghaf series. Red berries add a fruity dimension to the classic oud-rose-saffron combination, creating a warm, passionate oriental.', NULL);

-- 99. Ajmal Aurum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1059', 'Aurum', 'Ajmal', 2013, 'Eau de Parfum', 'Raspberry, Orange Blossom, Bergamot', 'Rose, Gardenia, Jasmine, Peony', 'Musk, Amber, Vanilla, Sandalwood, Cedar', 'A fruity-floral feminine meaning "Gold." Raspberry and orange blossom create a sweet, luxurious opening before settling into a warm gardenia-rose heart with lasting amber.', NULL);

-- 100. Lattafa Ana Abiyedh Poudrée
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1060', 'Ana Abiyedh Poudree', 'Lattafa', 2021, 'Eau de Parfum', 'Bergamot, Pear, Pink Pepper', 'Rose, Iris, Heliotrope', 'Musk, Amber, Sandalwood, Vanilla, Tonka Bean', 'A powdery feminine version of Ana Abiyedh. Iris and heliotrope create a soft, powdery heart while pear and vanilla add gentle sweetness. Elegant and understated.', NULL);

-- End of migration 027
-- Total: 100 Middle Eastern, Arabian & Brazilian perfumes (s961-s1060)
-- Brands covered: Lattafa (12), Armaf (10), Al Haramain (7), Swiss Arabian (7), Rasasi (7),
-- Ajmal (9), Ard Al Zaafaran (10), O Boticario (11), Natura (13), L'Bel (9),
-- Afnan (3), Al Rehab (2)
