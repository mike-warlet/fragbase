-- Migration 029: Batch 8 - 100 Niche/Artisan Powerhouse Brands
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids
-- IDs: s1161-s1260

-- === XERJOFF (s1161-s1170) ===

-- 1. Xerjoff Naxos
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1161', 'Naxos', 'Xerjoff', 2015, 'Eau de Parfum', 'Bergamot, Lemon, Lavender', 'Cinnamon, Cashmeran, Honey', 'Tobacco, Tonka Bean, Vanilla', 'A warm, honeyed tobacco fragrance inspired by the Sicilian baroque city, blending Mediterranean citrus with rich oriental depth.', NULL);

-- 2. Xerjoff Alexandria II
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1162', 'Alexandria II', 'Xerjoff', 2010, 'Eau de Parfum', 'Peach, Oud, Saffron', 'Turkish Rose, Amber, Musk', 'Sandalwood, Agarwood, Vanilla', 'A regal oud fragrance from the Oud Stars collection, pairing lush peach with smoky agarwood in an opulent oriental blend.', NULL);

-- 3. Xerjoff Erba Pura
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1163', 'Erba Pura', 'Xerjoff', 2019, 'Eau de Parfum', 'Orange, Lemon, Bergamot, Sicilian Mandarin', 'Fruits, White Flowers', 'Amber, Musk, Vanilla, Sugar', 'A vibrant fruity-sweet fragrance from the Sospiro line, bursting with juicy citrus and white florals over a creamy amber base.', NULL);

-- 4. Xerjoff Uden
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1164', 'Uden Overdose', 'Xerjoff', 2011, 'Eau de Parfum', 'Bergamot, Pink Pepper, Clove', 'Iris, Jasmine, Saffron', 'Leather, Amber, Musk, Oud', 'A leather-forward composition from the Join the Club collection, balancing creamy iris and spicy saffron with deep, smoky leather.', NULL);

-- 5. Xerjoff More Than Words
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1165', 'More Than Words', 'Xerjoff', 2013, 'Eau de Parfum', 'Cardamom, Neroli, Mastic', 'Turkish Rose, Orris Root, Oud', 'Musk, Benzoin, Amber', 'An eloquent rose-oud fragrance from the Oud Stars collection, with mastic resin adding a uniquely Mediterranean twist.', NULL);

-- 6. Xerjoff Renaissance
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1166', 'Renaissance', 'Xerjoff', 2010, 'Eau de Parfum', 'Sicilian Lemon, Bergamot, Petit Grain', 'Jasmine, Neroli, Green Tea', 'White Musk, Cedar, Amber', 'A refined citrus-floral composition celebrating Italian Renaissance artistry, fresh and luminous with elegant transparency.', NULL);

-- 7. Xerjoff Lira
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1167', 'Lira', 'Xerjoff', 2013, 'Eau de Parfum', 'Bergamot, Orange, Lemon', 'Caramel, Vanilla, Lavender', 'Musk, Tonka Bean, Sugar', 'A gourmand delight inspired by Italian pastry shops, with creamy caramel and citrus evoking freshly baked Sicilian pastries.', NULL);

-- 8. Xerjoff Ivory Route
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1168', 'Ivory Route', 'Xerjoff', 2012, 'Eau de Parfum', 'Cardamom, Black Pepper, Grapefruit', 'Rose, Jasmine, Ylang-Ylang', 'Vanilla, Sandalwood, Musk, Amber', 'A spice route odyssey from the Oud Stars collection, weaving together Eastern spices and florals over a creamy sandalwood trail.', NULL);

-- 9. Xerjoff Casamorati Bouquet Ideale
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1169', 'Bouquet Ideale', 'Xerjoff', 2015, 'Eau de Parfum', 'Sicilian Mandarin, Lily of the Valley', 'Bulgarian Rose, Jasmine, Ylang-Ylang', 'Patchouli, Sandalwood, Musk, Vanilla', 'A lush floral bouquet from the Casamorati 1888 line, pairing classic rose and jasmine with a warm, powdery sandalwood base.', NULL);

-- 10. Xerjoff Casamorati Mefisto
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1170', 'Mefisto', 'Xerjoff', 2009, 'Eau de Parfum', 'Bergamot, Lavender, Thyme', 'Rose, Geranium, Mint', 'Musk, Vanilla, Leather, Tonka Bean', 'A charming fougere from the Casamorati collection, blending aromatic herbs and cool mint with warm leather in a dapper masculine style.', NULL);

-- === PARFUMS DE MARLY (s1171-s1180) ===

-- 11. Parfums de Marly Layton
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1171', 'Layton', 'Parfums de Marly', 2016, 'Eau de Parfum', 'Apple, Bergamot, Mandarin, Pink Pepper', 'Jasmine, Iris, Violet', 'Vanilla, Sandalwood, Cashmeran, Guaiac Wood', 'A sophisticated apple-vanilla scent with regal floral heart, widely regarded as one of the house''s most iconic and versatile creations.', NULL);

-- 12. Parfums de Marly Herod
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1172', 'Herod', 'Parfums de Marly', 2012, 'Eau de Parfum', 'Cinnamon, Pepper, Osmanthus', 'Tobacco, Incense, Iso E Super', 'Vanilla, Musk, Cedar, Vetiver, Cypriol', 'A rich tobacco-vanilla blend named after a famed racehorse, wrapping warm cinnamon and smoky tobacco in a velvety vanilla embrace.', NULL);

-- 13. Parfums de Marly Percival
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1173', 'Percival', 'Parfums de Marly', 2018, 'Eau de Parfum', 'Bergamot, Mandarin, White Pepper', 'Lavender, Geranium, Sage, Violet', 'Musk, Amber, Cashmeran, Sandalwood', 'A fresh-clean fragrance with lavender and musk at its heart, evoking the elegance of a tailored gentleman''s wardrobe.', NULL);

-- 14. Parfums de Marly Pegasus
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1174', 'Pegasus', 'Parfums de Marly', 2011, 'Eau de Parfum', 'Bergamot, Heliotrope', 'Almond, Jasmine, Vanilla', 'Amber, Sandalwood, Musk, Oud', 'A creamy almond-vanilla masterpiece, pairing sweet heliotrope and bitter almond with rich amber and a touch of oud.', NULL);

-- 15. Parfums de Marly Carlisle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1175', 'Carlisle', 'Parfums de Marly', 2015, 'Eau de Parfum', 'Green Apple, Nutmeg, Lemon, Bergamot', 'Rose, Patchouli, Lavender', 'Tonka Bean, Vanilla, Oud, Musk', 'A complex rose-patchouli blend with apple top notes and a deep oud-vanilla base, offering rich sophistication with modern flair.', NULL);

-- 16. Parfums de Marly Delina
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1176', 'Delina', 'Parfums de Marly', 2017, 'Eau de Parfum', 'Lychee, Rhubarb, Bergamot, Nutmeg', 'Turkish Rose, Peony, Lily of the Valley', 'Cashmeran, Musk, Vanilla, Cedar, Vetiver', 'A feminine floral with fruity lychee-rhubarb opening and romantic rose heart, finishing with a cashmere-soft musky base.', NULL);

-- 17. Parfums de Marly Sedley
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1177', 'Sedley', 'Parfums de Marly', 2019, 'Eau de Parfum', 'Spearmint, Bergamot, Black Currant', 'Geranium, Sage, Lavender', 'Sandalwood, Vetiver, Cedar, Musk', 'A fresh, minty-herbal fragrance ideal for warm weather, balancing cool spearmint with earthy vetiver and sandalwood.', NULL);

-- 18. Parfums de Marly Galloway
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1178', 'Galloway', 'Parfums de Marly', 2014, 'Eau de Parfum', 'Citrus, Mandarin, Grapefruit', 'Orange Blossom, Rose, Jasmine', 'Musk, Cedar, Vetiver', 'A bright, citrus-forward composition with a delicate floral heart, capturing the freshness of an English garden in bloom.', NULL);

-- 19. Parfums de Marly Kalan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1179', 'Kalan', 'Parfums de Marly', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Grapefruit', 'Orange Blossom, Rose, Jasmine', 'Vanilla, Sandalwood, Musk, Cashmeran', 'A spicy-floral amber fragrance blending citrus and pink pepper with a lush floral bouquet over warm sandalwood and vanilla.', NULL);

-- 20. Parfums de Marly Godolphin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1180', 'Godolphin', 'Parfums de Marly', 2011, 'Eau de Parfum', 'Saffron, Plum, Thyme', 'Rose, Leather, Iris', 'Oud, Amber, Sandalwood, Vanilla', 'A dark, leathery rose-oud composition with fruity saffron-plum opening, evoking the grandeur of Arabian equestrian tradition.', NULL);

-- === INITIO PARFUMS PRIVES (s1181-s1188) ===

-- 21. Initio Oud for Greatness
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1181', 'Oud for Greatness', 'Initio Parfums Prives', 2018, 'Eau de Parfum', 'Saffron, Nutmeg, Lavender', 'Agarwood (Oud), Orris', 'Musk, Patchouli, Sandalwood', 'A refined oud-centric creation that makes agarwood accessible and modern, with lavender and saffron providing elegant contrast.', NULL);

-- 22. Initio Side Effect
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1182', 'Side Effect', 'Initio Parfums Prives', 2016, 'Eau de Parfum', 'Rum, Cinnamon, Saffron', 'Tobacco, Vanilla, Benzoin', 'Musk, Cashmeran, Sandalwood', 'An intoxicating rum-tobacco accord that evokes the heady warmth of a late-night lounge, sweet and boozy with addictive depth.', NULL);

-- 23. Initio Atomic Rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1183', 'Atomic Rose', 'Initio Parfums Prives', 2018, 'Eau de Parfum', 'Rose, Saffron, Lemon', 'Rose Absolute, Amber', 'Sandalwood, Musk, Amberwood', 'A rose amplified to explosive intensity with saffron and amber, creating a bold and unapologetically opulent floral experience.', NULL);

-- 24. Initio Blessed Baraka
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1184', 'Blessed Baraka', 'Initio Parfums Prives', 2015, 'Eau de Parfum', 'Bergamot, Ginger, Cinnamon', 'Oud, Benzoin, Vanilla', 'Amber, Sandalwood, Musk, Patchouli', 'A warm spicy-woody oud creation blending ginger and cinnamon with smoky benzoin and sandalwood for a blessed, comforting aura.', NULL);

-- 25. Initio Musk Therapy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1185', 'Musk Therapy', 'Initio Parfums Prives', 2016, 'Eau de Parfum', 'Orange Blossom, Hedione', 'Rose, Jasmine, Lily of the Valley', 'Musk, Sandalwood, Amber, Cedar', 'A skin-scent musk fragrance designed to enhance natural pheromones, with delicate florals creating an intimate, therapeutic aura.', NULL);

-- 26. Initio Rehab
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1186', 'Rehab', 'Initio Parfums Prives', 2018, 'Eau de Parfum', 'Lavender, Saffron, Nutmeg', 'Tobacco, Vanilla', 'Musk, Cashmeran, Sandalwood, Cedar', 'An addictive lavender-tobacco composition that transforms classic barbershop aromatics into a modern, narcotic-sweet obsession.', NULL);

-- 27. Initio Psychedelic Love
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1187', 'Psychedelic Love', 'Initio Parfums Prives', 2016, 'Eau de Parfum', 'Bergamot, Hedione', 'Rose, Jasmine, Lily of the Valley', 'Musk, Sandalwood, Cedar', 'A hypnotic floral musk designed to captivate through molecular chemistry, blending hedione with white florals for a love-potion effect.', NULL);

-- 28. Initio Absolute Aphrodisiac
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1188', 'Absolute Aphrodisiac', 'Initio Parfums Prives', 2015, 'Eau de Parfum', 'Saffron, Myrrh, Rum', 'Vanilla, Benzoin, Oud', 'Sandalwood, Musk, Castoreum', 'A dark, animalic creation combining rum-soaked vanilla with oud and castoreum, designed to be the ultimate seductive weapon.', NULL);

-- === NISHANE (s1189-s1196) ===

-- 29. Nishane Hacivat
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1189', 'Hacivat', 'Nishane', 2017, 'Extrait de Parfum', 'Pineapple, Bergamot, Grapefruit', 'Jasmine, Rose, Patchouli', 'Oakmoss, Cedarwood, Sandalwood, Musk', 'A fruity-woody powerhouse with tropical pineapple and earthy patchouli, inspired by the witty Turkish shadow puppet character.', NULL);

-- 30. Nishane Ani
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1190', 'Ani', 'Nishane', 2019, 'Extrait de Parfum', 'Bergamot, Cardamom, Mandarin', 'Orchid, Rose, Jasmine', 'Vanilla, Tonka Bean, Sandalwood, Musk', 'A gourmand-floral extrait named after the ancient Armenian city, pairing exotic orchid with rich vanilla and cardamom.', NULL);

-- 31. Nishane Fan Your Flames
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1191', 'Fan Your Flames', 'Nishane', 2017, 'Extrait de Parfum', 'Saffron, Pink Pepper, Bergamot', 'Rose, Patchouli, Geranium', 'Oud, Amber, Vanilla, Musk', 'A passionate rose-oud extrait with fiery saffron and pink pepper, building to a smoldering amber-vanilla foundation.', NULL);

-- 32. Nishane Hundred Silent Ways
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1192', 'Hundred Silent Ways', 'Nishane', 2017, 'Extrait de Parfum', 'Bergamot, Davana, Pink Pepper', 'Jasmine, Rose, Vanilla Orchid', 'Tonka Bean, Vanilla, Sandalwood, Musk', 'A poetic vanilla-floral extrait where a hundred silent ways of love unfold through creamy jasmine, davana, and warm tonka.', NULL);

-- 33. Nishane Wulong Cha
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1193', 'Wulong Cha', 'Nishane', 2019, 'Extrait de Parfum', 'Oolong Tea, Bergamot, Mandarin', 'Jasmine, Mate, White Tea', 'Virginia Cedar, Benzoin, Musk', 'A refined tea-centric creation inspired by Chinese oolong, capturing the meditative calm of a tea ceremony in fragrance form.', NULL);

-- 34. Nishane Vain & Naive
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1194', 'Vain & Naive', 'Nishane', 2017, 'Extrait de Parfum', 'Grapefruit, Green Mandarin, Bergamot', 'Jasmine, Rose, Ylang-Ylang', 'Musk, Cedarwood, Amber', 'A bright, youthful citrus-floral extrait with effervescent grapefruit and mandarin softened by jasmine and sheer musk.', NULL);

-- 35. Nishane Sultan Vetiver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1195', 'Sultan Vetiver', 'Nishane', 2013, 'Extrait de Parfum', 'Bergamot, Black Pepper, Grapefruit', 'Vetiver, Geranium, Nutmeg', 'Vetiver, Amber, Labdanum, Musk', 'A bold vetiver extrait that crowns the earthy root king, amplified with black pepper and labdanum for smoky, regal depth.', NULL);

-- 36. Nishane Tempfluo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1196', 'Tempfluo', 'Nishane', 2019, 'Extrait de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Iris, Violet, Jasmine', 'Patchouli, Amber, Musk, Vanilla', 'A powdery iris extrait exploring the fluidity of time, with violet and patchouli adding contemplative depth to the floral heart.', NULL);

-- === AMOUAGE (s1197-s1206) ===

-- 37. Amouage Interlude Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1197', 'Interlude Man', 'Amouage', 2012, 'Eau de Parfum', 'Oregano, Bergamot, Pimento Berry', 'Frankincense, Opoponax, Labdanum', 'Amber, Sandalwood, Agarwood, Musk, Castoreum', 'A controlled chaos of incense and smoke, layering oregano and pimento over a massive resinous-woody base of rare complexity.', NULL);

-- 38. Amouage Reflection Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1198', 'Reflection Man', 'Amouage', 2007, 'Eau de Parfum', 'Rosemary, Pink Pepper, Bitter Orange', 'Jasmine, Neroli, Orris Root', 'Sandalwood, Cedar, Vetiver, Musk', 'An elegant jasmine-sandalwood composition of refined simplicity, capturing the reflection of an Omani palace in still water.', NULL);

-- 39. Amouage Jubilation XXV Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1199', 'Jubilation XXV Man', 'Amouage', 2007, 'Eau de Parfum', 'Frankincense, Orange, Tarragon, Blackberry', 'Guaiac Wood, Rose, Orchid, Cinnamon', 'Oud, Musk, Amber, Myrrh, Cedar', 'A masterwork created for Amouage''s 25th anniversary, weaving frankincense and blackberry through an opulent tapestry of oud and myrrh.', NULL);

-- 40. Amouage Memoir Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1200', 'Memoir Man', 'Amouage', 2010, 'Eau de Parfum', 'Absinth, Basil, Oregano, Incense', 'Pepper, Cardamom, Guaiac Wood', 'Oud, Tobacco, Vetiver, Musk, Cedar', 'A dark, herbal-incense composition inspired by autobiographical writing, evoking absinthe-tinged memories and smoky contemplation.', NULL);

-- 41. Amouage Beach Hut Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1201', 'Beach Hut Man', 'Amouage', 2017, 'Eau de Parfum', 'Lemon, Galbanum, Petitgrain', 'Ginger, Frankincense, Red Thyme', 'Myrrh, Cedar, Moss, Musk', 'A fresh herbal composition evoking windswept English beach huts, blending bracing lemon and galbanum with aromatic thyme.', NULL);

-- 42. Amouage Sunshine Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1202', 'Sunshine Man', 'Amouage', 2016, 'Eau de Parfum', 'Lavender, Cinnamon, Davana', 'Osmanthus, Orris Root, Dried Fruits', 'Frankincense, Sandalwood, Tonka Bean, Cashmeran', 'A warm, spiced lavender composition that captures golden afternoon sunshine through dried fruits, orris, and creamy sandalwood.', NULL);

-- 43. Amouage Gold Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1203', 'Gold Man', 'Amouage', 1983, 'Eau de Parfum', 'Frankincense, Myrrh, Rose', 'Jasmine, Lily, Cedar, Patchouli', 'Amber, Sandalwood, Musk, Civet', 'The original Amouage masterpiece and the world''s most expensive perfume at launch, an opulent frankincense-rose oriental of legendary status.', NULL);

-- 44. Amouage Dia Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1204', 'Dia Man', 'Amouage', 2002, 'Eau de Parfum', 'Bergamot, Thyme, Labdanum', 'Rose, Jasmine, Incense', 'Amber, Cedar, Sandalwood, Musk', 'A luminous floral-woody composition named after the Arabic word for light, pairing classic rose-jasmine with warm amber.', NULL);

-- 45. Amouage Lyric Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1205', 'Lyric Man', 'Amouage', 2008, 'Eau de Parfum', 'Lime, Angelica, Ginger', 'Rose, Jasmine, Frankincense, Orchid', 'Sandalwood, Musk, Vanilla, Amber', 'A romantic rose-ginger composition inspired by the opera Madame Butterfly, blending Eastern exoticism with Western lyricism.', NULL);

-- 46. Amouage Epic Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1206', 'Epic Man', 'Amouage', 2009, 'Eau de Parfum', 'Pink Pepper, Nutmeg, Cardamom, Cumin', 'Rose, Geranium, Myrrh, Opoponax', 'Agarwood, Musk, Frankincense, Sandalwood', 'A Silk Road epic in fragrance form, tracing spice caravan routes through cumin-laced deserts and resinous frankincense temples.', NULL);

-- === ROJA PARFUMS (s1207-s1214) ===

-- 47. Roja Parfums Elysium Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1207', 'Elysium Pour Homme', 'Roja Parfums', 2017, 'Eau de Parfum', 'Bergamot, Grapefruit, Lemon, Pink Pepper, Juniper', 'Jasmine, Rose, Geranium, Lavender, Lily of the Valley', 'Vetiver, Cedar, Sandalwood, Musk, Amber', 'A fresh, citrus-aromatic masterpiece that captures Elysian paradise through sparkling bergamot, jasmine, and refined vetiver.', NULL);

-- 48. Roja Parfums Scandal Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1208', 'Scandal Pour Homme', 'Roja Parfums', 2011, 'Eau de Parfum', 'Bergamot, Mandarin, Lavender, Basil', 'Patchouli, Jasmine, Clove', 'Leather, Oud, Amber, Vanilla, Musk', 'A provocatively named leather-oud composition from Britain''s master perfumer, blending Mediterranean herbs with deep, scandalous oud.', NULL);

-- 49. Roja Parfums Enigma Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1209', 'Enigma Pour Homme', 'Roja Parfums', 2017, 'Eau de Parfum', 'Bergamot, Lemon, Pink Pepper, Nutmeg', 'Jasmine, Rose, Orris, Lavender', 'Sandalwood, Vanilla, Amber, Musk, Cedar', 'A mysterious, multifaceted creation that unfolds like a riddle, with each layer revealing new aromatic dimensions.', NULL);

-- 50. Roja Parfums Fetish Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1210', 'Fetish Pour Homme', 'Roja Parfums', 2010, 'Eau de Parfum', 'Bergamot, Mandarin, Basil', 'Lavender, Cardamom, Orris', 'Leather, Amber, Musk, Sandalwood, Patchouli', 'A deeply sensual leather-amber composition designed to beguile and captivate, with lavender and orris adding aristocratic refinement.', NULL);

-- 51. Roja Parfums Amber Aoud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1211', 'Amber Aoud', 'Roja Parfums', 2012, 'Extrait de Parfum', 'Saffron, Lemon', 'Rose, Jasmine, Orange Blossom', 'Oud, Amber, Frankincense, Sandalwood, Musk', 'An extrait that marries the finest amber with precious aoud wood, creating a resinous, golden Oriental of extraordinary richness.', NULL);

-- 52. Roja Parfums Burlington 1819
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1212', 'Burlington 1819', 'Roja Parfums', 2017, 'Eau de Parfum', 'Bergamot, Grapefruit, Mandarin, Lime', 'Rose, Jasmine, Iris, Violet', 'Musk, Sandalwood, Amber, Cedarwood', 'Created for Burlington Arcade''s bicentenary, a refined British citrus-floral capturing the elegance of London''s finest covered shopping passage.', NULL);

-- 53. Roja Parfums Diaghilev
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1213', 'Diaghilev', 'Roja Parfums', 2010, 'Extrait de Parfum', 'Bergamot, Aldehydes, Tarragon', 'Rose, Jasmine, Ylang-Ylang, Orris, Carnation', 'Sandalwood, Amber, Musk, Civet, Patchouli, Oud', 'A tribute to the legendary ballet impresario, considered Roja Dove''s finest creation with over 100 ingredients in a symphonic composition.', NULL);

-- 54. Roja Parfums Harrods Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1214', 'Harrods Pour Homme', 'Roja Parfums', 2015, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Jasmine, Orris, Geranium', 'Sandalwood, Musk, Amber, Cedar, Vetiver', 'An exclusive creation for the iconic Harrods department store, embodying British luxury through refined citrus, florals, and noble woods.', NULL);

-- === TIZIANA TERENZI (s1215-s1220) ===

-- 55. Tiziana Terenzi Kirke
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1215', 'Kirke', 'Tiziana Terenzi', 2014, 'Extrait de Parfum', 'Passion Fruit, Peach, Raspberry', 'Rose, Jasmine, Lily of the Valley', 'Patchouli, Vanilla, Musk, Amber', 'A fruity-floral extrait named after the enchantress Circe, with luscious tropical fruits and rose creating an irresistibly captivating aura.', NULL);

-- 56. Tiziana Terenzi Andromeda
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1216', 'Andromeda', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Mandarin, Ginger, Cardamom', 'Lavender, Geranium, Orris', 'Tonka Bean, Amber, Vanilla, Musk', 'A celestial lavender-tonka extrait from the Luna Star Collection, evoking the ethereal beauty of the Andromeda constellation.', NULL);

-- 57. Tiziana Terenzi Cassiopeia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1217', 'Cassiopeia', 'Tiziana Terenzi', 2018, 'Extrait de Parfum', 'Black Pepper, Elemi, Bergamot', 'Agarwood, Rose, Orris Root', 'Amber, Vanilla, Musk, Labdanum', 'A regal oud-rose extrait honoring the vain queen of Greek mythology, with smoldering agarwood and rich amber creating celestial opulence.', NULL);

-- 58. Tiziana Terenzi Luna Collection - Luna
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1218', 'Luna', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Bergamot, Green Apple, Pear', 'Jasmine, Lily, Gardenia', 'Musk, Cedar, Sandalwood, Amber', 'A luminous white floral extrait capturing moonlight in a bottle, with crisp green apple and gardenia creating nocturnal elegance.', NULL);

-- 59. Tiziana Terenzi Orion
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1219', 'Orion', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Pineapple, Lemon, Grapefruit', 'Geranium, Jasmine, Orris', 'Amber, Cedar, Leather, Musk', 'A bold citrus-leather extrait named after the hunter constellation, with tropical pineapple and smoky leather creating starlit masculinity.', NULL);

-- 60. Tiziana Terenzi Gold Rose Oudh
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1220', 'Gold Rose Oudh', 'Tiziana Terenzi', 2013, 'Extrait de Parfum', 'Saffron, Coriander, Pink Pepper', 'Rose, Oud, Incense', 'Sandalwood, Amber, Musk, Vanilla', 'A luxurious rose-oud extrait from the Gold Collection, marrying Damascene rose with aged agarwood in a golden resinous embrace.', NULL);

-- === MAISON FRANCIS KURKDJIAN (s1221-s1228) ===

-- 61. Maison Francis Kurkdjian Baccarat Rouge 540
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1221', 'Baccarat Rouge 540', 'Maison Francis Kurkdjian', 2015, 'Eau de Parfum', 'Saffron, Jasmine', 'Amberwood, Maison Cedar', 'Fir Resin, Musk, Ambergris', 'An iconic modern classic that defined a new era in niche perfumery, with its crystalline saffron-amber signature recognized worldwide.', NULL);

-- 62. Maison Francis Kurkdjian Grand Soir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1222', 'Grand Soir', 'Maison Francis Kurkdjian', 2016, 'Eau de Parfum', 'Amber, Benzoin', 'Amber, Tonka Bean, Vanilla', 'Amber, Benzoin, Musk', 'A magnificent amber composition celebrating the magic of a grand evening, wrapping the wearer in a warm, luminous benzoin-vanilla cloud.', NULL);

-- 63. Maison Francis Kurkdjian Oud Satin Mood
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1223', 'Oud Satin Mood', 'Maison Francis Kurkdjian', 2014, 'Eau de Parfum', 'Violet', 'Bulgarian Rose, Oud', 'Benzoin, Vanilla, Musk', 'A satiny rose-oud composition that makes oud feel like liquid velvet, with Bulgarian rose and creamy benzoin creating opulent softness.', NULL);

-- 64. Maison Francis Kurkdjian Gentle Fluidity Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1224', 'Gentle Fluidity Gold', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Coriander, Juniper Berry, Nutmeg', 'Musks, Amber', 'Vanilla, Sandalwood, Amber', 'A warm, enveloping amber-vanilla with spicy top notes, representing fluidity between genders with golden, honeyed warmth.', NULL);

-- 65. Maison Francis Kurkdjian Gentle Fluidity Silver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1225', 'Gentle Fluidity Silver', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Juniper Berry, Nutmeg, Pink Pepper', 'Musks, Amber', 'Woody Notes, Vanilla, Musk', 'The cooler, more aromatic counterpart to Gold, with juniper and woody musks evoking silver moonlight and crystalline freshness.', NULL);

-- 66. Maison Francis Kurkdjian A la rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1226', 'A la rose', 'Maison Francis Kurkdjian', 2014, 'Eau de Parfum', 'Damascena Rose, Centifolia Rose', 'Rose, Peony, Violet', 'Musk, Cedar, Amber', 'A joyful, luminous rose duo that celebrates the queen of flowers in her most radiant form, fresh and dewy rather than heavy.', NULL);

-- 67. Maison Francis Kurkdjian Amyris Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1227', 'Amyris Homme', 'Maison Francis Kurkdjian', 2012, 'Eau de Toilette', 'Rosemary, Mandarin, Pink Pepper', 'Iris, Tonka Bean', 'Amyris, Sandalwood, Musk', 'A sophisticated woody-aromatic built around the precious amyris wood, with rosemary and iris adding French-Caribbean refinement.', NULL);

-- 68. Maison Francis Kurkdjian Petit Matin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1228', 'Petit Matin', 'Maison Francis Kurkdjian', 2020, 'Eau de Parfum', 'Lemon, Litchi, Green Notes', 'Rose, Jasmine, Orange Blossom', 'Musk, Cedar, Iris', 'A sparkling dawn-inspired fragrance capturing the first light of a small morning, with dewy litchi and delicate florals.', NULL);

-- === PENHALIGON'S (s1229-s1235) ===

-- 69. Penhaligon's Halfeti
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1229', 'Halfeti', 'Penhaligon''s', 2015, 'Eau de Parfum', 'Bergamot, Grapefruit, Green Cardamom', 'Rose, Jasmine, Saffron, Nutmeg', 'Oud, Leather, Amber, Sandalwood, Tonka Bean', 'Named after the sunken Turkish village famous for black roses, a spiced rose-oud of dramatic beauty and mysterious depth.', NULL);

-- 70. Penhaligon's Endymion
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1230', 'Endymion', 'Penhaligon''s', 2003, 'Eau de Cologne Concentree', 'Bergamot, Mandarin, Sage', 'Lavender, Geranium, Coffee', 'Sandalwood, Musk, Incense, Vanilla', 'A refined British gentleman''s fragrance named after the mythological shepherd, with an unusual coffee-lavender heart of distinguished character.', NULL);

-- 71. Penhaligon's Sartorial
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1231', 'Sartorial', 'Penhaligon''s', 2010, 'Eau de Toilette', 'Honey, Bergamot, Thyme', 'Beeswax, Cyclamen, Jasmine', 'Leather, Musk, Amber, Wood', 'Inspired by Norton & Sons of Savile Row, capturing the scent of a bespoke tailor''s workshop with beeswax, leather, and honey.', NULL);

-- 72. Penhaligon's The Tragedy of Lord George
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1232', 'The Tragedy of Lord George', 'Penhaligon''s', 2016, 'Eau de Parfum', 'Rum, Brandy, Lavender', 'Tonka Bean, Iris, Rose', 'Sandalwood, Oud, Styrax, Musk', 'A debauched aristocratic portrait from the Portraits collection, with boozy rum-brandy opening and sinful oud-sandalwood depths.', NULL);

-- 73. Penhaligon's Juniper Sling
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1233', 'Juniper Sling', 'Penhaligon''s', 2011, 'Eau de Toilette', 'Juniper Berry, Black Pepper, Angelica', 'Gin Accord, Orange Blossom, Orris', 'Leather, Amber, Musk', 'A botanical gin cocktail in fragrance form, with juniper and black pepper evoking the finest London dry gin in an elegant glass.', NULL);

-- 74. Penhaligon's Lothair
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1234', 'Lothair', 'Penhaligon''s', 2012, 'Eau de Toilette', 'Bergamot, Grapefruit, Basil', 'Jasmine, Rose, Black Tea', 'Vetiver, Patchouli, Vanilla, Labdanum', 'A sophisticated tea-based fragrance from the Trade Routes collection, inspired by Victorian Ceylon with jasmine-scented black tea.', NULL);

-- 75. Penhaligon's Empressa
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1235', 'Empressa', 'Penhaligon''s', 2014, 'Eau de Toilette', 'Rose, Bergamot, Davana', 'Rose, Orris, Osmanthus', 'Ambrette, Musk, Patchouli, Vanilla', 'A regal rose-orris composition from the Trade Routes collection, inspired by Empress Eugenie with refined, powdery floral elegance.', NULL);

-- === BYREDO (s1236-s1243) ===

-- 76. Byredo Gypsy Water
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1236', 'Gypsy Water', 'Byredo', 2008, 'Eau de Parfum', 'Bergamot, Lemon, Pepper, Juniper Berries', 'Incense, Pine Needles, Orris', 'Amber, Vanilla, Sandalwood', 'A romantic ode to the bohemian lifestyle, with fresh pine, smoky incense, and warm vanilla evoking campfire nights under starlit skies.', NULL);

-- 77. Byredo Mojave Ghost
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1237', 'Mojave Ghost', 'Byredo', 2014, 'Eau de Parfum', 'Sapodilla, Ambrette, Violet', 'Sandalwood, Magnolia, Jamaican Naseberry', 'Musk, Chantilly Cream, Cedarwood', 'Inspired by the ghost flower blooming in the Mojave Desert, a woody-floral that thrives on contradiction: delicate yet resilient.', NULL);

-- 78. Byredo Bal d'Afrique
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1238', 'Bal d''Afrique', 'Byredo', 2009, 'Eau de Parfum', 'Bergamot, Lemon, Neroli, African Marigold', 'Violet, Jasmine, Cyclamen', 'Vetiver, Amber, Musk, Moroccan Cedarwood', 'A celebration of the cultural cross-pollination between Africa and 1920s Paris, with marigold and vetiver creating a sun-drenched dance.', NULL);

-- 79. Byredo Blanche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1239', 'Blanche', 'Byredo', 2009, 'Eau de Parfum', 'White Rose, Pink Pepper, Aldehyde', 'Peony, Violet', 'Musk, Sandalwood, Blonde Wood', 'A study in white, capturing the scent of freshly laundered sheets and white flowers in a pristine, clean-skin composition.', NULL);

-- 80. Byredo Rose of No Man's Land
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1240', 'Rose of No Man''s Land', 'Byredo', 2015, 'Eau de Parfum', 'Pink Pepper, Turkish Rose Petals', 'Turkish Rose, Raspberry Blossom, Geranium', 'Papyrus, White Amber, White Musk', 'A tribute to WWI nurses nicknamed Roses of No Man''s Land, a luminous Turkish rose with papyrus warmth and quiet courage.', NULL);

-- 81. Byredo Super Cedar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1241', 'Super Cedar', 'Byredo', 2016, 'Eau de Parfum', 'Rose, Virginian Cedar', 'Haitian Vetiver, Power Accord', 'Musk, Cedar', 'A hyper-focused cedar composition stripped to its essence, amplifying the noble wood with vetiver and a touch of rose.', NULL);

-- 82. Byredo Black Saffron
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1242', 'Black Saffron', 'Byredo', 2012, 'Eau de Parfum', 'Saffron, Juniper Berry, Chinese Grapefruit', 'Black Violet, Cristal Rose', 'Vetiver, Blonde Leather, Raspberry', 'A spice route composition blending precious saffron with dark fruits and leather, evoking ancient trade caravans laden with exotic cargo.', NULL);

-- 83. Byredo Mixed Emotions
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1243', 'Mixed Emotions', 'Byredo', 2021, 'Eau de Parfum', 'Cassis, Mate Absolute, Black Tea', 'Violet, Iris', 'Birch Wood, Papyrus, Musk', 'A contemplative fragrance capturing the complexity of conflicting feelings, with black tea and violet creating bittersweet introspection.', NULL);

-- === SERGE LUTENS (s1244-s1250) ===

-- 84. Serge Lutens Ambre Sultan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1244', 'Ambre Sultan', 'Serge Lutens', 2000, 'Eau de Parfum', 'Myrtle, Coriander, Bay Leaf, Oregano', 'Amber, Sandalwood, Vanilla', 'Benzoin, Patchouli, Labdanum, Musk', 'A majestic amber composition born from a Moroccan souk resin purchase, redefining the amber genre with herbal-resinous opulence.', NULL);

-- 85. Serge Lutens Chergui
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1245', 'Chergui', 'Serge Lutens', 2001, 'Eau de Parfum', 'Honey, Tobacco, Hay', 'Rose, Iris, Sandalwood', 'Amber, Benzoin, Musk, Incense, Tonka Bean', 'Named after the hot Saharan wind, a honeyed tobacco-hay masterpiece that captures golden Moroccan light in liquid form.', NULL);

-- 86. Serge Lutens La Fille de Berlin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1246', 'La Fille de Berlin', 'Serge Lutens', 2013, 'Eau de Parfum', 'Rose, Raspberry, Pepper', 'Turkish Rose, Tart Fruits', 'Musk, Incense, Woody Notes', 'A tart, thorny rose inspired by Berlin''s bold spirit, stripping away sweetness to reveal the flower''s raw, lipstick-red intensity.', NULL);

-- 87. Serge Lutens Datura Noir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1247', 'Datura Noir', 'Serge Lutens', 2001, 'Eau de Parfum', 'Mandarin, Lemon, Bitter Almond', 'Tuberose, Heliotrope, Coconut', 'Tonka Bean, Vanilla, Musk, Myrrh', 'A bewitching tropical-gourmand nocturne, with deadly datura flower, coconut, and almond creating a dangerously seductive narcotic evening scent.', NULL);

-- 88. Serge Lutens Feminite du Bois
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1248', 'Feminite du Bois', 'Serge Lutens', 1992, 'Eau de Parfum', 'Orange, Plum, Peach, Beeswax', 'Cedar, Cinnamon, Clove, Rose', 'Vanilla, Musk, Amber, Honey', 'A groundbreaking cedar fragrance that shattered gender norms in 1992, proving cedarwood could be utterly feminine with fruit and spice.', NULL);

-- 89. Serge Lutens Un Bois Vanille
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1249', 'Un Bois Vanille', 'Serge Lutens', 2003, 'Eau de Parfum', 'Coconut, Bitter Almond', 'Vanilla, Benzoin, Guaiac Wood', 'Sandalwood, Musk, Tonka Bean, Licorice', 'A dark, woody vanilla that subverts the note''s usual sweetness with smoky guaiac and bitter almond, creating a sophisticated gourmand.', NULL);

-- 90. Serge Lutens Fleurs d'Oranger
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1250', 'Fleurs d''Oranger', 'Serge Lutens', 2003, 'Eau de Parfum', 'Orange Blossom, Bitter Orange', 'Tuberose, Jasmine, White Flowers', 'Musk, Cedar, Amber', 'A luminous orange blossom captured at its most intoxicating, with tuberose adding lush creaminess to this Moroccan-inspired white floral.', NULL);

-- === MANCERA (s1251-s1260) ===

-- 91. Mancera Cedrat Boise
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1251', 'Cedrat Boise', 'Mancera', 2011, 'Eau de Parfum', 'Sicilian Lemon, Bergamot, Black Currant, Spices', 'Jasmine, Rose, Patchouli, Watermelon', 'Cedar, Sandalwood, Leather, Vanilla, Musk', 'A citrus-woody crowd-pleaser with surprising watermelon accord, blending zesty Sicilian lemon with dark patchouli and leather.', NULL);

-- 92. Mancera Instant Crush
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1252', 'Instant Crush', 'Mancera', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Red Berries', 'Rose, Jasmine, Amber', 'Sandalwood, Vanilla, White Musk, Benzoin', 'An instant-attraction fragrance with bright berries and rose over addictive amber-vanilla, designed to charm on first encounter.', NULL);

-- 93. Mancera Red Tobacco
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1253', 'Red Tobacco', 'Mancera', 2017, 'Eau de Parfum', 'Saffron, Cinnamon, Pink Pepper', 'Tobacco, Oud, Patchouli', 'Amber, Vanilla, Sandalwood, Musk', 'A spiced tobacco powerhouse that packs intense sillage, wrapping saffron-cinnamon heat around a rich tobacco-oud core.', NULL);

-- 94. Mancera Roses Vanille
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1254', 'Roses Vanille', 'Mancera', 2011, 'Eau de Parfum', 'Lemon, Watermelon', 'Rose, Jasmine, Orange Blossom', 'Vanilla, White Musk, Plum, Cedar, Guaiac Wood', 'A decadent rose-vanilla duo that pairs fresh Turkish rose with creamy bourbon vanilla and a surprising fruity watermelon top.', NULL);

-- 95. Mancera Lemon Line
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1255', 'Lemon Line', 'Mancera', 2013, 'Eau de Parfum', 'Lemon, Grapefruit, Mandarin', 'Rose, Jasmine, Orange Blossom', 'Sandalwood, Musk, Amber', 'A vibrant citrus bomb that delivers long-lasting lemon freshness defying the note''s typical fleeting nature with Mancera''s signature intensity.', NULL);

-- 96. Mancera Aoud Blue Notes
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1256', 'Aoud Blue Notes', 'Mancera', 2014, 'Eau de Parfum', 'Bergamot, Lemon, Mint', 'Lavender, Geranium, Oud', 'Sandalwood, Tonka Bean, Musk, Vanilla', 'A fresh take on oud that brings the note into blue-fresh territory, with cooling mint and lavender tempering the agarwood.', NULL);

-- 97. Mancera Gold Prestigium
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1257', 'Gold Prestigium', 'Mancera', 2016, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Jasmine, Rose, Saffron', 'Vanilla, Amber, Musk, Oud, Sandalwood', 'A golden-hued oriental blending bright citrus with saffron-rose heart and luxurious oud-amber base of prestigious depth.', NULL);

-- 98. Mancera Wind Wood
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1258', 'Wind Wood', 'Mancera', 2014, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Iris, Violet, Patchouli', 'Vetiver, Amber, Cedarwood, Musk', 'A breezy woody-iris composition evoking wind through a cedar forest, with earthy vetiver and patchouli grounding the airy freshness.', NULL);

-- 99. Mancera Hindu Kush
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1259', 'Hindu Kush', 'Mancera', 2017, 'Eau de Parfum', 'Cannabis, Bergamot, Spices', 'Amber, Patchouli, Incense', 'Musk, Oud, Cedarwood, Labdanum', 'A daring cannabis-incense composition named after the famed mountain range, with herbal, resinous notes evoking ancient trade routes.', NULL);

-- 100. Mancera Wild Fruits
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s1260', 'Wild Fruits', 'Mancera', 2013, 'Eau de Parfum', 'Pineapple, Grapefruit, Bergamot, Lemon', 'Jasmine, Rose, Orange Blossom', 'Vanilla, Sandalwood, Musk, Amber, Cedar', 'A tropical fruit cocktail with intense pineapple and citrus, balanced by white florals and a warm vanilla-sandalwood finish.', NULL);
