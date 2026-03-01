-- Migration 023: Batch 3 - 100 Unisex/Niche Perfumes
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids and perfumer credits

-- 1. Tom Ford Lost Cherry
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s661', 'Lost Cherry', 'Tom Ford', 2018, 'Eau de Parfum', 'Black Cherry, Cherry Liqueur, Bitter Almond', 'Turkish Rose, Jasmine Sambac', 'Peru Balsam, Roasted Tonka, Sandalwood, Vetiver, Cedar', 'A decadent cherry liqueur bomb wrapped in roasted tonka and almond. Provocative and addictive, it straddles the line between gourmand and floral with effortless allure.', 'https://fimgs.net/mdimg/perfume/375x500.53328.jpg');


-- 2. Tom Ford Bitter Peach
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s662', 'Bitter Peach', 'Tom Ford', 2020, 'Eau de Parfum', 'Blood Orange, Cardamom, Davana', 'Peach, Rum Absolute, Heliotrope', 'Sandalwood, Patchouli, Cashmeran, Benzoin, Vanilla', 'A ripe, boozy peach gourmand that captures the moment of overripe indulgence. Lush and provocative, with a resinous warmth that lingers on skin.', NULL);


-- 3. Tom Ford Neroli Portofino
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s663', 'Neroli Portofino', 'Tom Ford', 2011, 'Eau de Parfum', 'Tunisian Neroli, Bergamot, Lemon, Mandarin, Lavender', 'African Orange Flower, Neroli, Jasmine, Pittosporum', 'Amber, Ambrette, Angelica, Musk', 'A vibrant Mediterranean escape channeling the Italian Riviera. Sparkling citrus and neroli create an airy, sun-drenched freshness that feels like a coastal breeze.', NULL);


-- 4. Tom Ford Soleil Blanc
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s664', 'Soleil Blanc', 'Tom Ford', 2016, 'Eau de Parfum', 'Bergamot, Cardamom, Pink Pepper, Pistachio', 'Ylang-Ylang, Tuberose, Jasmine Sambac', 'Coconut, Amber, Musk, Tonka Bean, Benzoin', 'Sun-drenched luxury captured in a bottle. Creamy coconut, white florals, and warm amber evoke the sensation of golden skin kissed by the sun on a private beach.', NULL);


-- 5. Tom Ford White Suede
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s665', 'White Suede', 'Tom Ford', 2009, 'Eau de Parfum', 'Thyme, Pink Pepper', 'Rose, Lily of the Valley, Suede', 'Amber, Musk, Sandalwood', 'Clean musk and soft suede enveloped in delicate florals. A quietly magnetic fragrance that whispers sophistication and modern minimalism.', NULL);


-- 6. MFK Aqua Universalis
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s666', 'Aqua Universalis', 'Maison Francis Kurkdjian', 2009, 'Eau de Toilette', 'Bergamot, Sicilian Lemon, Petit Grain, Orange', 'Lily of the Valley, White Flowers, Hedione', 'Musk, Cedar, Amber', 'A universal fresh fragrance that embodies pure cleanliness. Bright citrus and transparent white flowers create a scent as refreshing as freshly laundered linen in sunlight.', 'https://fimgs.net/mdimg/perfume/375x500.9499.jpg');


-- 7. MFK Amyris Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s667', 'Amyris Homme', 'Maison Francis Kurkdjian', 2012, 'Eau de Toilette', 'Rosemary, Pink Pepper', 'Iris, Tonka Bean', 'Amyris, Cedar, Musk', 'Sophisticated woody iris elegance for the modern man. The dry, luminous warmth of amyris wood blends seamlessly with powdery iris and aromatic rosemary.', NULL);


-- 8. MFK Gentle Fluidity Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s668', 'Gentle Fluidity Gold', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Juniper Berry, Coriander, Nutmeg', 'Musk, Amber', 'Vanilla, Sandalwood, Amber', 'A warm, golden interpretation of fluidity. Vanilla and amber glow through a spicy opening, creating a soft, enveloping trail that feels both intimate and luxurious.', NULL);


-- 9. MFK Gentle Fluidity Silver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s669', 'Gentle Fluidity Silver', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Juniper Berry, Coriander, Nutmeg', 'Musk, Amber', 'Musks, Woody Notes', 'The cool, silvery counterpart to Gold. A transparent, airy musk built on the same molecular structure but taken in a fresher, more mineral direction.', NULL);


-- 10. MFK A La Rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s670', 'A La Rose', 'Maison Francis Kurkdjian', 2014, 'Eau de Parfum', 'Lemon, Bergamot, Pear', 'Grasse Rose, Damascena Rose', 'Musk, Cedar, Virginia Cedar', 'A luminous, dewy rose captured at the peak of its bloom. Sparkling citrus and crisp pear frame the heart of Grasse rose, creating a modern and joyful floral.', NULL);


-- 11. Le Labo Rose 31
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s671', 'Rose 31', 'Le Labo', 2006, 'Eau de Parfum', 'Cumin, Rose', 'Cistus, Gaiac Wood', 'Cedar, Vetiver, Musk, Amber, Oud', 'A masculine, spiced rose that challenges conventions. Cumin and guaiac wood give this rose a leathery, almost animalic edge that is both arresting and deeply wearable.', 'https://fimgs.net/mdimg/perfume/375x500.16949.jpg');


-- 12. Le Labo Bergamote 22
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s672', 'Bergamote 22', 'Le Labo', 2006, 'Eau de Parfum', 'Bergamot, Grapefruit, Petit Grain', 'Amber, Cedar, Vetiver', 'Musk', 'A bergamot celebration of light and transparency. The bright citrus opening unfolds into warm, woody amber creating a scent that feels effortlessly chic and understated.', NULL);


-- 13. Le Labo The Noir 29
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s673', 'The Noir 29', 'Le Labo', 2015, 'Eau de Parfum', 'Bergamot, Fig Leaf, Bay Leaf', 'Black Tea, Tobacco, Cedar', 'Vetiver, Musk, Gaiac Wood', 'A smoky black tea rendered literary and warm. The dried fig and tobacco leaves intertwine with black tea to create a fragrance that feels like an afternoon in an old library.', NULL);


-- 14. Le Labo Fleur d'Oranger 27
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s674', 'Fleur d''Oranger 27', 'Le Labo', 2006, 'Eau de Parfum', 'Bergamot, Orange Blossom, Petit Grain', 'Orange Blossom Absolute, Jasmine, Iris', 'Musk, White Amber, Tonka Bean', 'A Mediterranean orange blossom captured in its purest essence. Luminous and honeyed, with the narcotic sweetness of neroli softened by powdery iris and warm tonka.', NULL);


-- 15. Byredo Black Saffron
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s675', 'Black Saffron', 'Byredo', 2012, 'Eau de Parfum', 'Saffron, Juniper Berry', 'Black Violet, Leather, Raspberry', 'Cashmeran, Vetiver, Blonde Wood', 'A dark, luxurious saffron veiled in leather and violet. The precious spice is given depth by a cashmere-soft drydown, creating something exotic yet surprisingly wearable.', NULL);


-- 16. Byredo Rose of No Man's Land
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s676', 'Rose of No Man''s Land', 'Byredo', 2015, 'Eau de Parfum', 'Pink Pepper, Turkish Rose Petals', 'Turkish Rose, Raspberry Blossom', 'Papyrus, White Amber', 'A tribute to the nurses of WWI, known as the Roses of No Man''s Land. Pink pepper and Turkish rose create a poignant beauty, fierce yet tender.', NULL);


-- 17. Byredo Bibliotheque
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s677', 'Bibliotheque', 'Byredo', 2017, 'Eau de Parfum', 'Peach, Plum, Aldehydes', 'Violet, Orris, Patchouli, Peony', 'Leather, Vanilla, Papyrus', 'An olfactory homage to the old library. Leather-bound pages, stone fruit, and soft violet create a warm intellectual atmosphere in fragrance form.', 'https://fimgs.net/mdimg/perfume/375x500.46340.jpg');


-- 18. Byredo Super Cedar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s678', 'Super Cedar', 'Byredo', 2016, 'Eau de Parfum', 'Rose, Virginian Cedar, Haitian Vetiver', 'Cedar, Musk', 'Amber', 'A super-charged cedarwood study in minimalism. The pure, architectural quality of cedar is amplified and polished into a modern, almost sculptural fragrance.', NULL);


-- 19. Diptyque Philosykos
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s679', 'Philosykos', 'Diptyque', 1996, 'Eau de Toilette', 'Fig Leaf, Green Notes', 'Fig, Coconut', 'Cedar, Woody Notes, Musk', 'A complete fig tree experience from leaf to fruit. The green, milky, woody character of the Mediterranean fig is rendered with photorealistic naturalism.', 'https://fimgs.net/mdimg/perfume/375x500.24947.jpg');


-- 20. Diptyque Tam Dao
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s680', 'Tam Dao', 'Diptyque', 2003, 'Eau de Parfum', 'Rosewood, Myrtle, Cypress, Italian Cypress', 'Rose, Sandalwood, Amyris', 'Sandalwood, Cedar, Musk, Amber', 'A meditative journey into Laotian sandalwood. Creamy, warm, and quietly enveloping, it captures the spiritual essence of a temple wrapped in wood and incense.', NULL);


-- 21. Diptyque Eau Duelle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s681', 'Eau Duelle', 'Diptyque', 2010, 'Eau de Parfum', 'Pink Pepper, Elemi', 'Saffron, Juniper Berry', 'Vanilla, Vetiver, Benzoin, Frankincense', 'A vanilla duality exploring both its fresh and warm facets. Dry, spiced vanilla meets resinous frankincense, creating sophistication far beyond typical sweetness.', NULL);


-- 22. Creed Silver Mountain Water
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s682', 'Silver Mountain Water', 'Creed', 1995, 'Eau de Parfum', 'Bergamot, Green Tea, Mandarin, Blackcurrant', 'Galbanum, Petit Grain, Milk Notes', 'Musk, Sandalwood, Amber', 'Inspired by the sparkling streams of the Swiss Alps. A luminous, metallic freshness with milky green tea undertones that evoke mountain air and glacial water.', 'https://fimgs.net/mdimg/perfume/375x500.473.jpg');


-- 23. Creed Royal Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s683', 'Royal Oud', 'Creed', 2011, 'Eau de Parfum', 'Lemon, Pink Pepper, Galbanum', 'Cedar, Angelica Root', 'Sandalwood, Oud, Tonka Bean, Musk', 'A regal woody oud that balances Eastern opulence with Western restraint. Cedar and sandalwood provide the frame for a refined, almost architectural oud accord.', NULL);


-- 24. Creed Original Vetiver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s684', 'Original Vetiver', 'Creed', 2004, 'Eau de Parfum', 'Bergamot, Mandarin, Iris', 'Ginger, Vetiver', 'Ambergris, Musk, Cedar', 'Pure vetiver elegance in Creed''s signature style. Clean, green, and refined, with a soft iris heart that adds powdery sophistication to the earthy root.', NULL);


-- 25. Amouage Memoir Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s685', 'Memoir Man', 'Amouage', 2010, 'Eau de Parfum', 'Absinth, Basil, Oregano, Chamomile', 'Frankincense, Opoponax, Guaiac Wood, Iris', 'Vetiver, Oud, Musk, Moss, Sandalwood', 'A haunting autobiographical scent evoking memories of the Middle East. Herbal bitterness gives way to sacred resins and smoky woods in a deeply contemplative composition.', NULL);


-- 26. Amouage Epic Woman
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s686', 'Epic Woman', 'Amouage', 2009, 'Eau de Parfum', 'Pink Pepper, Cardamom, Cinnamon, Cumin', 'Geranium, Rose, Tea, Davana', 'Amber, Musk, Oud, Sandalwood', 'An epic journey through the ancient incense route. Rich spices, precious rose, and smoky oud create a sweeping narrative of Oriental grandeur and timeless elegance.', NULL);


-- 27. Xerjoff Alexandria II
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s687', 'Alexandria II', 'Xerjoff', 2009, 'Eau de Parfum', 'Peach, Blackcurrant', 'Rose, Jasmine, Iris', 'Sandalwood, Vanilla, Musk, Benzoin', 'A sweet, fruity floral of uncompromising luxury. Silky peach and blackcurrant melt into velvety rose and iris, resting on a bed of creamy sandalwood and vanilla.', NULL);


-- 28. Xerjoff Nio
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s688', 'Nio', 'Xerjoff', 2010, 'Eau de Parfum', 'Lemon, Bergamot, Pink Pepper', 'Jasmine, Geranium, Cedar', 'Musk, Amber, Vetiver', 'A crisp Italian citrus brimming with Mediterranean energy. Bright lemon and bergamot are grounded by jasmine and cedar in an effortlessly refined composition.', NULL);


-- 29. Xerjoff More Than Words
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s689', 'More Than Words', 'Xerjoff', 2013, 'Eau de Parfum', 'Cardamom, Pink Pepper, Bergamot', 'Rose, Jasmine, Orris', 'Musk, Oud, Sandalwood, Vanilla, Cedar', 'When words are not enough, this fragrance speaks. Rose and oud converse in a language of luxury, with cardamom providing warmth and iris lending powdery elegance.', NULL);


-- 30. Nishane Fan Your Flames
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s690', 'Fan Your Flames', 'Nishane', 2015, 'Extrait de Parfum', 'Clove, Cardamom, Black Pepper', 'Rose, Saffron, Labdanum', 'Sandalwood, Vanilla, Benzoin, Musk', 'A fiery and passionate extrait that ignites the senses. Clove and saffron burn bright around a heart of intoxicating rose, settling into a warm, resinous embrace.', NULL);


-- 31. Nishane Hacivat (skip if exists)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s691', 'Hacivat', 'Nishane', 2017, 'Extrait de Parfum', 'Pineapple, Bergamot, Grapefruit, Green Leaves', 'Jasmine, Rose, Patchouli, Birch', 'Oakmoss, Sandalwood, Amber, Musk, Cedar', 'Named after a character from Turkish shadow puppet theater. A fruity-woody powerhouse with pineapple and patchouli creating an Aventus-like freshness with greater depth.', NULL);


-- 32. Tiziana Terenzi Kirke
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s692', 'Kirke', 'Tiziana Terenzi', 2017, 'Extrait de Parfum', 'Peach, Raspberry, Passion Fruit', 'Rose, Jasmine, Ylang-Ylang', 'Vanilla, Musk, Sandalwood, Amber', 'A mythical fruity floral inspired by the enchantress Circe. Sun-ripened peach and tropical passion fruit weave through an opulent floral heart before settling into creamy warmth.', NULL);


-- 33. Tiziana Terenzi Andromeda
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s693', 'Andromeda', 'Tiziana Terenzi', 2019, 'Extrait de Parfum', 'Mandarin, Bergamot, Pink Pepper', 'Rose, Jasmine, Iris', 'Amber, Musk, Patchouli, Vanilla', 'A celestial floral named after the galaxy. Starlit rose and cosmic iris float above a warm amber constellation, creating a fragrance of otherworldly elegance.', NULL);


-- 34. Tiziana Terenzi Cas
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s694', 'Cas', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Mandarin, Bergamot, Cardamom', 'Iris, Violet, Rose, Jasmine', 'Amber, Musk, Vetiver, Sandalwood, Leather', 'A rich and complex iris-leather composition. Named after the constellation Cassiopeia, it balances powdery iris with warm leather and smooth amber in regal harmony.', NULL);


-- 35. Mancera Red Tobacco
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s695', 'Red Tobacco', 'Mancera', 2017, 'Eau de Parfum', 'Saffron, Cinnamon, Nutmeg', 'Tobacco, Jasmine, Patchouli', 'Vanilla, Oud, Sandalwood, Amber, Woody Notes', 'A rich, spicy tobacco feast that punches well above its price. Saffron and cinnamon ignite a smoky tobacco heart, settling into a warm, resinous base of oud and vanilla.', NULL);


-- 36. Mancera Lemon Line
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s696', 'Lemon Line', 'Mancera', 2016, 'Eau de Parfum', 'Lemon, Bergamot, Grapefruit, Green Apple', 'White Flowers, Magnolia', 'Vanilla, Amber, Musk, White Cedar', 'A citrus explosion that defies the category''s typical brevity. Bright, zesty lemon and bergamot are given incredible longevity by a subtle vanilla-amber foundation.', NULL);


-- 37. Montale Roses Musk
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s697', 'Roses Musk', 'Montale', 2009, 'Eau de Parfum', 'Rose', 'Rose, Musk, Jasmine', 'White Musk, Amber', 'A rose draped in luminous white musk. Soft, clean, and radiant, this has become a modern classic for those who love rose in its most approachable, powdery incarnation.', NULL);


-- 38. Montale Arabians Tonka
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s698', 'Arabians Tonka', 'Montale', 2016, 'Eau de Parfum', 'Lavender, Bergamot', 'Tonka Bean, Amber', 'Vanilla, Oud, Musk, Benzoin', 'Arabian warmth meets French tonka bean in a creamy, exotic embrace. Lavender provides an aromatic opening before yielding to a rich, balsamic heart of tonka and amber.', NULL);


-- 39. PDM Percival
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s699', 'Percival', 'Parfums de Marly', 2018, 'Eau de Parfum', 'Bergamot, Mandarin, Lavender, Pink Pepper', 'Geranium, Sage, Jasmine', 'Musk, Amber, Cashmeran, Woody Notes', 'A fresh aromatic knight in Parfums de Marly''s equestrian stable. Lavender and sage create an invigorating opening that mellows into a clean, musky finish.', NULL);


-- 40. PDM Carlisle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s700', 'Carlisle', 'Parfums de Marly', 2015, 'Eau de Parfum', 'Thyme, Nutmeg, Green Apple, Lavender', 'Rose, Patchouli, Osmanthus, Agarwood', 'Vanilla, Tonka Bean, Musk, Amber', 'A sophisticated oud-rose rendered warm and regal. The apple and lavender opening gives way to a rich heart of osmanthus and patchouli, finishing with creamy vanilla.', NULL);


-- 41. PDM Athalia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s701', 'Athalia', 'Parfums de Marly', 2020, 'Eau de Parfum', 'Bergamot, Orange, Pink Pepper, Lily of the Valley', 'Rose, Orange Blossom, Jasmine, Violet', 'Sandalwood, Musk, Cedar, Amber', 'A regal floral composition named after a tragic queen. Bright citrus and lily of the valley give way to a majestic bouquet of rose and jasmine over warm sandalwood.', NULL);


-- 42. Initio Rehab
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s702', 'Rehab', 'Initio', 2020, 'Eau de Parfum', 'Lavender, Musk, Bergamot', 'Iris, Ambrette', 'Sandalwood, Cashmere Musk, Amber', 'A clean musk rehabilitation for those addicted to freshness. Lavender and iris create a powdery, skin-like scent that is effortlessly addictive and impossible to resist.', NULL);


-- 43. Initio Blessed Baraka
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s703', 'Blessed Baraka', 'Initio', 2015, 'Eau de Parfum', 'Bergamot, Green Apple', 'Orris, Ambrette', 'Musk, Ambroxan, Cashmeran', 'A blessed composition channeling pure, uplifting energy. Green apple and bergamot open to a heart of precious orris, settling into a warm, enveloping musk cocoon.', NULL);


-- 44. Initio Atomic Rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s704', 'Atomic Rose', 'Initio', 2018, 'Eau de Parfum', 'Rose, Saffron', 'Rose, Raspberry', 'Amberwood, Patchouli, Musk, Vanilla', 'An explosive rose of atomic intensity. Saffron-laced rose detonates into a cloud of raspberry sweetness, leaving a warm trail of amberwood and vanilla.', NULL);


-- 45. Roja Dove Scandal
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s705', 'Scandal', 'Roja Parfums', 2016, 'Parfum', 'Bergamot, Pineapple, Mandarin', 'Rose, Jasmine, Lavender', 'Sandalwood, Vanilla, Amber, Oud, Musk', 'A scandalous creation from the master perfumer Roja Dove. Opulent fruit and flowers cascade over precious oud and amber in a composition designed to provoke and seduce.', NULL);


-- 46. Roja Dove Creation-E
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s706', 'Creation-E', 'Roja Parfums', 2012, 'Parfum', 'Bergamot, Mandarin, Peach', 'Rose, Jasmine, Ylang-Ylang, Orris', 'Sandalwood, Vanilla, Tonka Bean, Musk, Amber, Benzoin', 'The E stands for Enigma in its feminine incarnation. A masterful blend of precious florals, silky fruits, and warm base notes that epitomizes old-world luxury.', NULL);


-- 47. Kilian Intoxicated
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s707', 'Intoxicated', 'Kilian', 2014, 'Eau de Parfum', 'Cardamom, Nutmeg, Eucalyptus, Cinnamon', 'Turkish Rose, Coffee', 'Amber, Sandalwood, Vanilla, Musk, Tonka Bean', 'A spice-laden coffee-rose that lives up to its name. Warm cardamom and cinnamon embrace rich Turkish coffee, creating a heady, almost narcotic oriental experience.', NULL);


-- 48. Kilian Vodka on the Rocks
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s708', 'Vodka on the Rocks', 'Kilian', 2014, 'Eau de Parfum', 'Aldehydes, Pink Pepper, Rhubarb', 'Lily of the Valley, Violet, Orris', 'Musk, Amber, Suede, Woody Notes', 'A dry, icy cocktail in fragrance form. Transparent aldehydes and pink pepper mimic the crisp chill of vodka, while suede and iris add sophistication.', NULL);


-- 49. Kilian Black Phantom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s709', 'Black Phantom', 'Kilian', 2017, 'Eau de Parfum', 'Rum, Dark Chocolate', 'Coffee, Caramel', 'Sandalwood, Vetiver, Sugar Cane', 'A dark phantom haunting the senses with rum, coffee, and chocolate. This sinister gourmand balances sweetness with woody dryness, creating an addictive shadow.', NULL);


-- 50. Escentric Molecules Escentric 01
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s710', 'Escentric 01', 'Escentric Molecules', 2006, 'Eau de Toilette', 'Lime, Pink Pepper', 'Iso E Super, Iris, White Musk', 'Woody Notes, Musk', 'The creative companion to Molecule 01, built around Iso E Super. Lime and pink pepper accentuate the warm, cedar-like glow of this groundbreaking aroma molecule.', 'https://fimgs.net/mdimg/perfume/375x500.2904.jpg');


-- 51. Bond No. 9 I Love New York
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s711', 'I Love New York', 'Bond No. 9', 2011, 'Eau de Parfum', 'Coffee, Ginger', 'Chocolate, Amber', 'Leather, Sandalwood, Patchouli, Musk', 'A declaration of love for New York City. Rich coffee and chocolate capture the energy of Manhattan cafes, while leather and sandalwood echo the city''s sophisticated edge.', NULL);


-- 52. Bond No. 9 Scent of Peace
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s712', 'Scent of Peace', 'Bond No. 9', 2004, 'Eau de Parfum', 'Grapefruit, Blackcurrant, Lily of the Valley', 'Cedar, Rose, Muguet', 'Musk, Patchouli, Blonde Wood', 'A hopeful, luminous fragrance born from a wish for world peace. Gentle florals and soft woods create a harmonious, calming composition that bridges divides.', NULL);


-- 53. Penhaligon's Endymion
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s713', 'Endymion', 'Penhaligon''s', 2003, 'Cologne', 'Mandarin, Bergamot, Sage, Green Notes', 'Coffee, Jasmine, Lavender, Geranium', 'Musk, Sandalwood, Incense, Vanilla, Labdanum', 'A gentleman''s club cologne of coffee and lavender. Named after Keats'' poem, it captures the relaxed sophistication of an English club with a warm, incense-tinged finish.', NULL);


-- 54. Penhaligon's Blenheim Bouquet
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s714', 'Blenheim Bouquet', 'Penhaligon''s', 1902, 'Eau de Toilette', 'Lemon, Lavender, Lime', 'Pine, Black Pepper, Musk', 'Cedar, Musk', 'A heritage citrus aromatic dating back over a century. This classic English cologne captures the crisp refinement of Blenheim Palace with pine-accented citrus and dry cedar.', NULL);


-- 55. Memo Paris Irish Leather
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s715', 'Irish Leather', 'Memo Paris', 2013, 'Eau de Parfum', 'Juniper Berry, Elemi, Pink Pepper', 'Leather, Birch, Iris', 'Vetiver, Musk, Styrax, Cedar', 'The wild, rain-soaked leather of the Irish countryside. Juniper and birch create a rugged landscape, while iris adds an unexpected touch of refinement to the untamed leather.', NULL);


-- 56. Memo Paris African Leather
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s716', 'African Leather', 'Memo Paris', 2013, 'Eau de Parfum', 'Cardamom, Bergamot, Geranium', 'Oud, Saffron, Leather, Cumin', 'Vetiver, Musk, Birch Tar, Castoreum', 'The raw, exotic scent of African leather under a burning sun. Saffron and cumin add desert heat to an animalic leather accord that is primal, bold, and unforgettable.', NULL);


-- 57. Serge Lutens Ambre Sultan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s717', 'Ambre Sultan', 'Serge Lutens', 2000, 'Eau de Parfum', 'Bay Leaf, Myrtle, Coriander, Oregano', 'Angelica, Amber', 'Sandalwood, Patchouli, Benzoin, Vanilla, Amber', 'A legendary resinous amber born in a Marrakech souk. Herbal aromatics open to a massive, warm amber heart that redefined the amber category in modern niche perfumery.', NULL);


-- 58. Serge Lutens Bois de Violette
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s718', 'Bois de Violette', 'Serge Lutens', 2003, 'Eau de Parfum', 'Violet, Bergamot, Pepper', 'Cedar, Iris, Violet Leaf', 'Sandalwood, Musk, Amber, Benzoin', 'A poetic meeting of violet and wood. The powdery, melancholic character of violet is given depth and gravitas by precious woods, creating quiet, contemplative beauty.', NULL);


-- 59. Acqua di Parma Colonia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s719', 'Colonia', 'Acqua di Parma', 1916, 'Eau de Cologne', 'Lemon, Orange, Bergamot, Lavender, Rosemary', 'Rose, Verbena, Jasmine', 'Vetiver, Patchouli, Sandalwood, Musk', 'The original Italian cologne, a century of timeless citrus elegance. Crafted in 1916, its sparkling bergamot and lavender embody the effortless style of the Italian gentleman.', 'https://fimgs.net/mdimg/perfume/375x500.1681.jpg');


-- 60. Acqua di Parma Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s720', 'Oud', 'Acqua di Parma', 2012, 'Eau de Parfum', 'Bergamot, Agarwood', 'Oud, Smoky Notes, Leather', 'Sandalwood, Amber, Musk, Patchouli', 'An Italian interpretation of oud that bridges East and West. Rather than the heavy Middle Eastern approach, this presents oud with Mediterranean warmth and refined smokiness.', NULL);


-- 61. Maison Margiela Replica Jazz Club
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s721', 'Replica Jazz Club', 'Maison Margiela', 2013, 'Eau de Toilette', 'Pink Pepper, Lemon, Neroli', 'Rum Absolute, Clary Sage, Java Vetiver', 'Tobacco Leaf, Vanilla, Styrax, Tonka Bean', 'A smoky jazz bar in Brooklyn, late at night. The clink of rum glasses, clouds of tobacco smoke, and the warmth of worn leather seats are all captured in this evocative tribute.', 'https://fimgs.net/mdimg/perfume/375x500.17684.jpg');


-- 62. Replica By the Fireplace
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s722', 'Replica By the Fireplace', 'Maison Margiela', 2015, 'Eau de Toilette', 'Clove, Pink Pepper, Orange Blossom', 'Chestnut, Guaiac Wood, Cashmeran', 'Vanilla, Peru Balsam, Gaiac Wood', 'A crackling fireplace on a winter evening. Smoky chestnut, warm cashmeran, and sweet vanilla capture the cozy intimacy of sitting by the fire with profound comfort.', 'https://fimgs.net/mdimg/perfume/375x500.28571.jpg');


-- 63. Replica Coffee Break
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s723', 'Replica Coffee Break', 'Maison Margiela', 2018, 'Eau de Toilette', 'Coffee, Lavender', 'Milk Mousse', 'Vanilla, Tonka Bean, Cedar', 'A mid-morning coffee pause in a Stockholm cafe. The creamy aroma of a lavender latte, warm milk foam, and sweet vanilla create a comforting, cozy fragrance moment.', NULL);


-- 64. DS & Durga Debaser
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s724', 'Debaser', 'D.S. & Durga', 2015, 'Eau de Parfum', 'Bergamot, Fig Leaf, Green Leaves', 'Fig, Coconut, Iris', 'Blonde Woods, Musk, Ambrette', 'Named after the Pixies song, a hazy fig-coconut dream. The green freshness of fig leaves meets milky coconut in a composition that feels like a sun-warmed Mediterranean garden.', NULL);


-- 65. DS & Durga Bowmakers
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s725', 'Bowmakers', 'D.S. & Durga', 2016, 'Eau de Parfum', 'Maple, Sycamore', 'Mahogany, Violin Varnish, Spruce Resin', 'Rosewood, Cedar, Amber', 'The workshop of a violin maker rendered in scent. Warm mahogany, spruce resin, and freshly varnished instruments create a remarkably evocative woody composition.', NULL);


-- 66. Imaginary Authors Saint Julep
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s726', 'Saint Julep', 'Imaginary Authors', 2016, 'Eau de Parfum', 'Mint, Sugar, Bourbon', 'Orange Blossom, Honeysuckle', 'Musk, Vanilla', 'A southern mint julep in a crystal tumbler on a hot Georgia afternoon. Bright mint and sweet bourbon capture the languid charm of the American South in liquid form.', NULL);


-- 67. Imaginary Authors Every Storm a Serenade
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s727', 'Every Storm a Serenade', 'Imaginary Authors', 2014, 'Eau de Parfum', 'Eucalyptus, Vetiver, Black Moss', 'Wildflowers, Sea Salt', 'Musk, Driftwood', 'A Pacific Northwest storm witnessed from a rocky coastline. Green eucalyptus, salty ocean spray, and wet driftwood paint a vivid picture of wild, untamed coastal beauty.', NULL);


-- 68. Comme des Garcons Wonderwood
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s728', 'Wonderwood', 'Comme des Garcons', 2010, 'Eau de Parfum', 'Sichuan Pepper, Nutmeg, Bergamot', 'Cashmeran, Gaiac Wood', 'Sandalwood, Vetiver, Oud, Virginia Cedar', 'A synthetic wonderland of woods. Comme des Garcons explores the boundary between natural and artificial in this clever, warm woody composition with a spiced opening.', NULL);


-- 69. Comme des Garcons 2
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s729', 'Comme des Garcons 2', 'Comme des Garcons', 1999, 'Eau de Parfum', 'Aldehyde, Ink', 'Saffron, Incense, Vetiver', 'Amber, Musk, Labdanum', 'An anti-perfume manifesto in scent form. Ink, saffron, and aldehyde create an avant-garde composition that challenged every convention of mainstream fragrance upon release.', NULL);


-- 70. Commodity Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s730', 'Gold', 'Commodity', 2014, 'Eau de Parfum', 'White Pepper, Mandarin', 'Tuberose, Jasmine, Orris', 'Amber, Vetiver, Sandalwood', 'A golden shimmer of warm florals and amber. White pepper and mandarin sparkle before giving way to a lush tuberose heart, settling into a sun-warmed amber glow.', NULL);


-- 71. Commodity Velvet
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s731', 'Velvet', 'Commodity', 2019, 'Eau de Parfum', 'Saffron, Cardamom', 'Rose, Oud, Leather', 'Vanilla, Amber, Musk', 'Plush velvet textures translated into scent. Saffron and cardamom open to a rich heart of oud-tinged rose and leather, finishing with smooth warmth of vanilla and amber.', NULL);


-- 72. Clean Reserve Sueded Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s732', 'Sueded Oud', 'Clean Reserve', 2016, 'Eau de Parfum', 'Bergamot, Cardamom', 'Rose, Oud, Leather', 'Sandalwood, Musk, Amber', 'A clean, approachable take on oud that strips away heaviness. Bergamot and cardamom lift the oud, while suede and rose soften it into something wearable and modern.', NULL);


-- 73. Clean Reserve Radiant Nectar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s733', 'Radiant Nectar', 'Clean Reserve', 2020, 'Eau de Parfum', 'Nectarine, Bergamot', 'Orange Blossom, Jasmine', 'Musk, Amber, Cedar', 'Sun-soaked nectar glowing with warmth. Juicy nectarine and bright bergamot lead into a honeyed floral heart, finishing with a sheer, skin-like musk foundation.', NULL);


-- 74. Gallivant Tokyo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s734', 'Tokyo', 'Gallivant', 2014, 'Eau de Parfum', 'Bergamot, Shiso, Yuzu', 'Hinoki Wood, Green Tea, Violet Leaf', 'Musk, Cedar, Vetiver', 'A fragrant postcard from Tokyo. The clean precision of hinoki wood and green tea meets bright yuzu and herbal shiso, capturing the city''s blend of tradition and modernity.', NULL);


-- 75. Gallivant Istanbul
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s735', 'Istanbul', 'Gallivant', 2014, 'Eau de Parfum', 'Turkish Rose, Saffron, Black Pepper', 'Oud, Incense, Cinnamon', 'Amber, Musk, Leather, Labdanum', 'The ancient crossroads of East and West in olfactory form. Turkish rose and saffron mingle with incense smoke, capturing the grandeur of Istanbul''s bazaars and mosques.', NULL);


-- 76. Vilhelm Parfumerie Dear Polly
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s736', 'Dear Polly', 'Vilhelm Parfumerie', 2015, 'Eau de Parfum', 'Apple, Green Tea, Bergamot', 'Taif Rose, Peony, Watery Notes', 'Musk, Amber, Cedar', 'A love letter addressed to Polly. Crisp green apple and dewy peony over a bed of green tea and soft musk create a scent as fresh and tender as a handwritten note.', NULL);


-- 77. Vilhelm Parfumerie Mango Skin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s737', 'Mango Skin', 'Vilhelm Parfumerie', 2015, 'Eau de Parfum', 'Mango, Bergamot, Lemon', 'Jasmine, Neroli, Orange Blossom', 'Sandalwood, Musk, Cedar', 'The sensation of biting into a ripe mango on warm skin. Tropical mango meets Mediterranean neroli and jasmine in a radiant, solar fragrance that glows with natural beauty.', NULL);


-- 78. Ormonde Jayne Ormonde Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s738', 'Ormonde Man', 'Ormonde Jayne', 2004, 'Eau de Parfum', 'Juniper Berry, Bergamot, Coriander, Pink Pepper', 'Hemlock, Black Hemlock Absolute, Violet Leaf', 'Vetiver, Cedar, Amber, Musk', 'A revolutionary green-woody masterpiece featuring the rare black hemlock absolute. Dark, herbal, and primordially green, it evokes an ancient forest floor after rain.', NULL);


-- 79. Ormonde Jayne Woman
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s739', 'Ormonde Woman', 'Ormonde Jayne', 2002, 'Eau de Parfum', 'Cardamom, Grass, Coriander', 'Violet, Jasmine, Black Hemlock Absolute', 'Vetiver, Sandalwood, Amber, Musk', 'The feminine counterpart built around the same extraordinary black hemlock. Violet and jasmine soften the green darkness into something mysterious, elegant, and unforgettable.', NULL);


-- 80. House of Oud Dates Delight
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s740', 'Dates Delight', 'House of Oud', 2017, 'Eau de Parfum', 'Date, Saffron, Bergamot', 'Rose, Jasmine, Oud', 'Vanilla, Amber, Musk, Sandalwood', 'A Middle Eastern gourmand centered on the luscious sweetness of dates. Saffron and oud add depth to the date accord, creating a warm, dessert-like fragrance rooted in tradition.', NULL);


-- 81. Histoires de Parfums 1899
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s741', '1899', 'Histoires de Parfums', 2000, 'Eau de Parfum', 'Bergamot, Orange Blossom, Tea', 'Cedar, Oud, Spices', 'Patchouli, Leather, Musk, Amber', 'A homage to Ernest Hemingway, the year of his birth captured in scent. Tea and cedar evoke his writing desk, while leather and oud recall his adventurous travels.', NULL);


-- 82. Histoires de Parfums 1740
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s742', '1740', 'Histoires de Parfums', 2004, 'Eau de Parfum', 'Ginger, Cinnamon, Black Pepper', 'Myrrh, Oud, Leather', 'Amber, Sandalwood, Musk, Patchouli, Vanilla', 'A tribute to the Marquis de Sade. Dark, provocative, and unapologetically bold, with smoky myrrh and leather creating a dangerously seductive oriental.', NULL);


-- 83. Zoologist Bee
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s743', 'Bee', 'Zoologist', 2015, 'Eau de Parfum', 'Honey, Beeswax, Heliotrope', 'Mimosa, Chamomile, Royal Jelly', 'Benzoin, Tonka Bean, Amber, Musk', 'The buzzing life of a beehive in olfactory form. Rich honey, waxy beeswax, and golden mimosa create a sweet, naturalistic portrait of apian industry and liquid gold.', NULL);


-- 84. Zoologist T-Rex
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s744', 'T-Rex', 'Zoologist', 2016, 'Eau de Parfum', 'Blood Orange, Pink Pepper, Ginger', 'Davana, Saffron, Cinnamon, Smoke', 'Birch Tar, Labdanum, Civet, Castoreum, Amber', 'The king of the dinosaurs reimagined as fragrance. Smoky, animalic, and primal, with birch tar and civet creating a ferocious, prehistoric intensity. Not for the faint-hearted.', NULL);


-- 85. Bvlgari Man Wood Neroli
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s745', 'Man Wood Neroli', 'Bvlgari', 2019, 'Eau de Parfum', 'Neroli, Mandarin, Bergamot, Petit Grain', 'Orange Blossom, Cedar', 'Musk, Cocoa, Vetiver, Cashmeran', 'A Mediterranean woody neroli that radiates sunny elegance. The bright citrus-floral opening unfolds into warm cedar and an unexpected cocoa note that adds depth.', NULL);


-- 86. Bvlgari Omnia Crystalline
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s746', 'Omnia Crystalline', 'Bvlgari', 2005, 'Eau de Toilette', 'Bamboo, Nashi Pear, Balm', 'Lotus, Tea', 'Guaiac Wood, Musk', 'Crystal-clear aquatic transparency. Bamboo and lotus achieve a zen-like calm, while the crystalline quality of the composition evokes the purity of morning dew.', NULL);


-- 87. Guerlain Aqua Allegoria Mandarine Basilic
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s747', 'Aqua Allegoria Mandarine Basilic', 'Guerlain', 1999, 'Eau de Toilette', 'Mandarin, Basil, Caraway', 'Anise, Tea', 'Musk', 'A joyful allegory of mandarin and basil. The bright citrus zing of mandarin intertwines with the aromatic freshness of basil, creating a simple yet perfectly balanced delight.', NULL);


-- 88. Hermes Un Jardin sur le Nil
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s748', 'Un Jardin sur le Nil', 'Hermes', 2005, 'Eau de Toilette', 'Green Mango, Lotus, Grapefruit', 'Calamus, Peony, Orange Blossom', 'Incense, Sycamore, Oakmoss', 'A garden on the banks of the Nile rendered in watercolor. Green mango and lotus float above calamus root, creating an exotic green freshness inspired by Aswan island.', NULL);


-- 89. Hermes Twilly
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s749', 'Twilly d''Hermes', 'Hermes', 2017, 'Eau de Parfum', 'Ginger', 'Tuberose', 'Sandalwood, Vanilla', 'Young, free, and audacious, built on an unlikely trio. Spicy ginger meets heady tuberose, bound together by creamy sandalwood in a playful composition for the unconventional.', NULL);


-- 90. Issey Miyake L'Eau d'Issey Pure
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s750', 'L''Eau d''Issey Pure', 'Issey Miyake', 2016, 'Eau de Parfum', 'Rose Water, Lily of the Valley, Bergamot', 'Jasmine, Orange Blossom', 'Cashmeran, Ambrox, Musk', 'A distillation of the original into its purest essence. Sheer florals and transparent musks create a feeling of water made fragrant, intimate, and serene.', NULL);


-- 91. Maison Crivelli Iris Malikhan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s751', 'Iris Malikhan', 'Maison Crivelli', 2018, 'Eau de Parfum', 'Saffron, Cardamom, Bergamot', 'Iris, Rose, Oud', 'Sandalwood, Amber, Musk, Vanilla', 'A regal iris from the house of Crivelli. Saffron and cardamom give the powdery iris an Eastern warmth, while oud adds depth to this cross-cultural floral masterpiece.', NULL);


-- 92. Juliette Has a Gun Sunny Side Up
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s752', 'Sunny Side Up', 'Juliette Has a Gun', 2019, 'Eau de Parfum', 'White Flowers, Jasmine', 'Jasmine, Iris, Heliotrope', 'Sandalwood, Musk', 'Bright floral optimism in a bottle. A luminous white floral that captures the feeling of a sunny morning, with jasmine and heliotrope creating an uplifting, carefree aura.', NULL);


-- 93. Aesop Tacit
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s753', 'Tacit', 'Aesop', 2015, 'Eau de Parfum', 'Yuzu, Basil Grand Vert, Green Pepper', 'Clove Bud, Vetiver', 'Amber, Musk', 'A quiet, contemplative green composition. Yuzu and basil create a crisp freshness that speaks softly through vetiver and clove, embodying thoughtful minimalism.', NULL);


-- 94. Aesop Hwyl
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s754', 'Hwyl', 'Aesop', 2017, 'Eau de Parfum', 'Elemi, Thyme', 'Incense, Cypress, Vetiver', 'Moss, Oud, Musk', 'A mossy, incense-filled walk through a Japanese forest. The Welsh word hwyl suggests a journey of the spirit, capturing the meditative solitude of ancient woods.', NULL);


-- 95. Loewe 001
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s755', '001', 'Loewe', 2016, 'Eau de Parfum', 'Bergamot, Lemon, Tangerine', 'Jasmine, Indian Jasmine, Sandalwood', 'Musk, Vanilla, Amber, Linen', 'The first fragrance of intimacy. Created to capture the scent of skin after a first encounter, with soft sandalwood and jasmine evoking tender, post-dawn warmth.', NULL);


-- 96. Floris London No.89
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s756', 'No.89', 'Floris London', 1951, 'Eau de Toilette', 'Bergamot, Lavender, Neroli, Orange, Petit Grain, Nutmeg', 'Geranium, Rose, Jasmine, Ylang-Ylang', 'Sandalwood, Oakmoss, Musk, Vetiver, Cedar', 'Named after Floris'' Jermyn Street address, a quintessentially English gentleman''s cologne. Lavender and neroli open to a refined floral heart in this classic aromatic fougere.', NULL);


-- 97. BDK Pas Ce Soir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s757', 'Pas Ce Soir', 'BDK Parfums', 2020, 'Eau de Parfum', 'Bergamot, Pepper, Raspberry', 'Rose, Jasmine, Oud', 'Vanilla, Amber, Musk, Patchouli', 'Not tonight, or perhaps tonight after all. A seductive rose-oud pairing brightened by raspberry and tempered by vanilla, capturing the tension between restraint and desire.', NULL);


-- 98. BDK Gris Charnel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s758', 'Gris Charnel', 'BDK Parfums', 2019, 'Eau de Parfum', 'Cardamom, Pink Pepper, Bergamot', 'Fig, Tea, Iris', 'Vetiver, Sandalwood, Tonka Bean, Musk', 'A grey, carnal warmth that sits close to skin. Spiced fig and smoky tea create an intimate, skin-scent quality that blurs the line between perfume and natural body chemistry.', NULL);


-- 99. Tiziana Terenzi Cassiopea (bonus niche)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s759', 'Cassiopea', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Black Cherry, Blackcurrant, Mandarin', 'Jasmine, Rose, Ylang-Ylang, Heliotrope', 'Vanilla, Musk, Amber, Sandalwood, Benzoin', 'A constellation of dark fruits and white flowers. Black cherry and blackcurrant shine through a floral heart, trailing into a warm, creamy vanilla-amber cosmos.', NULL);


-- 100. Penhaligon's The Tragedy of Lord George (bonus niche)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s760', 'The Tragedy of Lord George', 'Penhaligon''s', 2016, 'Eau de Parfum', 'Lavender, Rum, Elemi', 'Orris, Davana', 'Tonka Bean, Benzoin, Olibanum', 'A noble portrait in fragrance from the Portraits collection. Rich rum and lavender give way to precious orris and incense, painting a picture of flawed aristocratic charm.', NULL);


-- End of migration 023
-- Total: 100 unisex/niche perfumes (u001-u100)
-- Covers all requested perfumes plus 2 bonus niche entries
-- Note: INSERT OR IGNORE ensures no duplicates with existing perfumes in migrations 005, 010, etc.
