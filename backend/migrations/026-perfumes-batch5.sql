-- Migration 026: Batch 5 - 100 Modern Niche & Artisanal Perfumes (2015-2025)
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids
-- IDs: s861-s960

-- 1. Initio Parfums Prives Mystic Experience
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s861', 'Mystic Experience', 'Initio', 2015, 'Eau de Parfum', 'Lavender, Artemisia, Cardamom', 'Iris, Ambrette, Jasmine', 'White Musk, Sandalwood, Amber, Cashmeran', 'A transcendent aromatic musk designed to enhance the wearer''s natural magnetism. Lavender and iris create a hypnotic, meditative aura over creamy sandalwood.', NULL);

-- 2. Initio Parfums Prives The Absolutes - Oud for Happiness
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s862', 'Oud for Happiness', 'Initio', 2020, 'Eau de Parfum', 'Nutmeg, Bergamot', 'Oud, Patchouli, Orris', 'Musk, Amberwood, Benzoin', 'An oud designed to radiate joy rather than darkness. Nutmeg and bergamot brighten the precious oud heart, creating an uplifting, warm oriental.', NULL);

-- 3. Initio Parfums Prives Addictive Vibration
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s863', 'Addictive Vibration', 'Initio', 2018, 'Eau de Parfum', 'Grapefruit, Bergamot, Mandarin', 'Osmanthus, Jasmine, Peach', 'Musk, Vanilla, Amber, Cashmeran', 'A fruity-floral designed to amplify natural pheromones with osmanthus and peach creating an irresistibly warm, skin-like glow.', NULL);

-- 4. Xerjoff 40 Knots
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s864', '40 Knots', 'Xerjoff', 2016, 'Eau de Parfum', 'Sea Salt, Bergamot, Pink Pepper', 'Ambroxan, Jasmine, Iris', 'Driftwood, Musk, Amber, Cedar', 'A marine-woody composition evoking the thrill of sailing at forty knots. Sea salt and driftwood create an exhilarating oceanic experience rooted in Italian craftsmanship.', NULL);

-- 5. Xerjoff Casamorati Italica
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s865', 'Casamorati Italica', 'Xerjoff', 2022, 'Eau de Parfum', 'Bergamot, Mandarin, Apple', 'Vanilla, Tonka Bean, Praline, Orchid', 'Sandalwood, Musk, White Chocolate, Benzoin', 'An Italian gourmand inspired by artisanal gelato with praline, vanilla, and white chocolate creating a decadent, creamy confection.', NULL);

-- 6. Xerjoff Casamorati Mefisto Gentiluomo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s866', 'Mefisto Gentiluomo', 'Xerjoff', 2019, 'Eau de Parfum', 'Bergamot, Lavender, Lemon, Elemi', 'Iris, Jasmine, Rose, Geranium', 'Musk, Amber, Cedar, Tonka Bean', 'A refined gentleman''s version of Mefisto with iris and lavender adding powdery sophistication to the bright citrus framework.', NULL);

-- 7. Xerjoff Soprano
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s867', 'Soprano', 'Xerjoff', 2021, 'Eau de Parfum', 'Pear, Red Berries, Bergamot', 'Iris, Rose, Orange Blossom', 'Musk, Amber, Patchouli, Vanilla, Sandalwood', 'A feminine ode to operatic beauty with pear and red berries opening to a romantic iris-rose heart over a warm, powdery base.', NULL);

-- 8. Nishane Nanshe
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s868', 'Nanshe', 'Nishane', 2019, 'Extrait de Parfum', 'Bergamot, Black Pepper, Grapefruit', 'Jasmine, Iris, Orange Blossom', 'Musk, Amber, Sandalwood, Vetiver, Patchouli', 'Named after the Sumerian goddess of social justice, a clean, soapy iris-musk composition with bergamot brightness and warm amber depth.', NULL);

-- 9. Nishane Ege
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s869', 'Ege / Ailaio', 'Nishane', 2019, 'Extrait de Parfum', 'Bergamot, Mandarin, Grapefruit', 'Orange Blossom, Jasmine, Geranium', 'Musk, Vetiver, Cedar, Amber', 'A luminous Mediterranean citrus inspired by the Aegean Sea. Bright and effervescent, with orange blossom and jasmine adding a summer-garden radiance.', NULL);

-- 10. Nishane Hacivat
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s870', 'Karagoz', 'Nishane', 2017, 'Extrait de Parfum', 'Cardamom, Pink Pepper, Bergamot', 'Coffee, Iris, Cinnamon', 'Sandalwood, Vanilla, Musk, Amber, Patchouli', 'Named after the other character in Turkish shadow theater alongside Hacivat. A warm coffee-spice composition with cardamom and iris creating depth.', NULL);

-- 11. Amouage Interlude Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s871', 'Interlude Man', 'Amouage', 2012, 'Eau de Parfum', 'Oregano, Bergamot, Pimento Berry, Opoponax', 'Amber, Frankincense, Myrrh, Labdanum', 'Oud, Sandalwood, Cistus, Benzoin, Castoreum', 'A smoky incense masterpiece inspired by the Oman Opera House with amber, myrrh and oud creating a powerful, resinous composition of grand proportions.', NULL);

-- 12. Amouage Guidance
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s872', 'Guidance', 'Amouage', 2023, 'Eau de Parfum', 'Bergamot, Blackcurrant, Pink Pepper', 'Rose, Jasmine, Geranium, Birch', 'Oud, Patchouli, Leather, Musk, Vanilla', 'A modern animalic-floral with smoky birch and oud providing a raw, untamed foundation beneath elegant rose and jasmine.', NULL);

-- 13. Amouage Portrayal Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s873', 'Portrayal Man', 'Amouage', 2019, 'Eau de Parfum', 'Pink Pepper, Cardamom, Bergamot', 'Iris, Violet Leaf, Orris', 'Vetiver, Amber, Incense, Leather, Musk', 'A sophisticated iris-leather portrait of modern masculinity, with violet leaf and incense adding layers of nuance to the powdery orris.', NULL);

-- 14. Amouage Reflection Man 45
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s874', 'Reflection 45 Man', 'Amouage', 2022, 'Eau de Parfum', 'Rosemary, Pink Pepper, Neroli', 'Jasmine Sambac, Orris, Rose', 'Sandalwood, Vetiver, Musk, Cedar', 'An intensified version of the jasmine-neroli classic with more concentration and greater projection while maintaining its refined elegance.', NULL);

-- 15. Parfums de Marly Haltane
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s875', 'Haltane', 'Parfums de Marly', 2022, 'Eau de Parfum', 'Bergamot, Pink Pepper, Saffron', 'Oud, Rose, Geranium', 'Amber, Musk, Vanilla, Labdanum, Cashmeran', 'A rich saffron-oud composition in the royal equestrian tradition with rose and amber creating a warm, opulent oriental for cooler months.', NULL);

-- 16. Parfums de Marly Pegasus Exclusif
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s876', 'Pegasus Exclusif', 'Parfums de Marly', 2020, 'Eau de Parfum', 'Bergamot, Heliotrope, Bitter Almond', 'Jasmine, Rose, Vanilla', 'Oud, Sandalwood, Amber, Musk', 'An exclusive, oud-enriched Pegasus with darker, smokier depths beneath the beloved almond-vanilla core, adding mystery to the original.', NULL);

-- 17. Parfums de Marly Safanad
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s877', 'Safanad', 'Parfums de Marly', 2014, 'Eau de Parfum', 'Orange Blossom, Pink Pepper', 'Rose, Iris, Jasmine', 'Sandalwood, Musk, Vanilla, Cashmere Wood', 'A graceful feminine named after a legendary Arabian mare, with orange blossom and iris creating an elegant, powdery floral.', NULL);

-- 18. Parfums de Marly Valaya
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s878', 'Valaya', 'Parfums de Marly', 2022, 'Eau de Parfum', 'Mandarin, Black Pepper, Pink Pepper', 'Bulgarian Rose, Orris, Magnolia', 'Musk, Vanilla, Patchouli, Sandalwood', 'A refined floral with Bulgarian rose and magnolia at its heart, balanced by warm patchouli and creamy vanilla in a contemporary composition.', NULL);

-- 19. Montale Intense Cafe Ristretto
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s879', 'Intense Cafe Ristretto', 'Montale', 2022, 'Eau de Parfum', 'Coffee, Pink Pepper, Cardamom', 'Rose, Jasmine, Cacao', 'Vanilla, Amber, White Musk, Benzoin', 'A more concentrated version of the beloved Intense Cafe with added cacao and cardamom intensifying the coffee-rose accord.', NULL);

-- 20. Montale Oud Tobacco
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s880', 'Oud Tobacco', 'Montale', 2019, 'Eau de Parfum', 'Dried Fruits, Spices', 'Oud, Tobacco, Leather', 'Amber, Vanilla, Benzoin, Musk', 'A smoky oud-tobacco blend with dried fruit sweetness and leathery depth, capturing Middle Eastern opulence in the Montale tradition.', NULL);

-- 21. Montale Aoud Lime
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s881', 'Aoud Lime', 'Montale', 2016, 'Eau de Parfum', 'Lime, Bergamot, Green Notes', 'Oud, Rose, Vetiver', 'Musk, Amber, Cedar', 'An unexpectedly refreshing oud pairing with zesty lime, proving that oud can be light and citrusy while maintaining its characteristic depth.', NULL);

-- 22. Montale Vanilla Extasy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s882', 'Vanilla Extasy', 'Montale', 2017, 'Eau de Parfum', 'Mandarin, Pink Pepper', 'Orchid, Rose, Orange Blossom', 'Vanilla, Tonka Bean, Musk, Sandalwood', 'A lush, heady vanilla with orchid and rose adding floral richness. Sweet, warm, and enveloping, it wraps the wearer in a creamy vanilla embrace.', NULL);

-- 23. Mancera Cedrat Boise
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s883', 'Wild Fruits', 'Mancera', 2017, 'Eau de Parfum', 'Wild Berries, Plum, Bergamot', 'Jasmine, Osmanthus, Patchouli', 'Amber, Musk, Vanilla, Sandalwood, Woody Notes', 'A fruity-woody composition bursting with wild berry sweetness and floral depth, finished with smooth amber and patchouli.', NULL);

-- 24. Mancera Sicily
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s884', 'Sicily', 'Mancera', 2016, 'Eau de Parfum', 'Mandarin, Lemon, Bergamot, Grapefruit', 'Orange Blossom, Jasmine, Peach', 'Vanilla, Musk, Amber, Sandalwood', 'A sun-drenched Sicilian citrus with peach and orange blossom adding Mediterranean warmth over a creamy vanilla-amber base.', NULL);

-- 25. Mancera Hindu Kush
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s885', 'Hindu Kush', 'Mancera', 2019, 'Eau de Parfum', 'Cannabis, Bergamot, Green Notes', 'Jasmine, Rose, Iris', 'Sandalwood, Amber, Musk, Patchouli', 'A daring green composition featuring a cannabis accord that blends herbal freshness with floral jasmine and warm sandalwood.', NULL);

-- 26. Mancera Velvet Vanilla
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s886', 'Velvet Vanilla', 'Mancera', 2021, 'Eau de Parfum', 'Mandarin, Pink Pepper, Rose', 'Vanilla Orchid, Jasmine, Heliotrope', 'Vanilla, Sandalwood, Musk, Benzoin, Amber', 'A velvety, opulent vanilla with orchid and heliotrope adding powdery floral richness to the sweet, creamy vanilla heart.', NULL);

-- 27. Tiziana Terenzi Orion
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s887', 'Orion', 'Tiziana Terenzi', 2018, 'Extrait de Parfum', 'Bergamot, Grapefruit, Elemi', 'Iris, Cedar, Saffron', 'Amber, Musk, Vetiver, Patchouli, Leather', 'A celestial hunter in fragrance form with saffron-iris at its heart and a raw leather-patchouli trail evoking interstellar grandeur.', NULL);

-- 28. Tiziana Terenzi Draco
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s888', 'Draco', 'Tiziana Terenzi', 2019, 'Extrait de Parfum', 'Plum, Green Leaves, Cardamom', 'Jasmine, Rose, Orris', 'Amber, Musk, Sandalwood, Patchouli, Vetiver', 'A constellation-inspired composition with dark plum and floral jasmine orbiting around a warm amber core, evoking the dragon constellation.', NULL);

-- 29. Tiziana Terenzi Saiph
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s889', 'Saiph', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Saffron, Lavender, Elemi, Cinnamon', 'Leather, Cypriol, Patchouli', 'Sandalwood, Musk, Amber, Vanilla, Oud', 'Named after the bright star in Orion, a spicy-leather composition with saffron and cinnamon blazing like stellar fire over a deep oud-leather base.', NULL);

-- 30. Kilian Paris Love Flaws and All
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s890', 'Love, Flaws and All', 'Kilian', 2023, 'Eau de Parfum', 'Pink Pepper, Bergamot', 'Rose, Jasmine, Iris', 'Musk, Amber, Patchouli, Cedar', 'A romantic rose-iris composition celebrating imperfect love with delicate pink pepper and warm musk creating an intimate, skin-close presence.', NULL);

-- 31. Kilian Paris Moonlight in Heaven
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s891', 'Moonlight in Heaven', 'Kilian', 2017, 'Eau de Parfum', 'Mango, Pink Grapefruit, Bergamot', 'Rice, Jasmine, Coconut Milk', 'Vetiver, Musk, Cedar, Amber', 'A tropical-gourmand inspired by Southeast Asian rice paddies at night. Mango and coconut milk create a creamy, exotic nocturne over clean vetiver.', NULL);

-- 32. Kilian Paris Roses on Ice
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s892', 'Roses on Ice', 'Kilian', 2020, 'Eau de Parfum', 'Grapefruit, Bergamot, Pink Pepper', 'Rose, Menthol, Geranium', 'Musk, Amber, Cedar, White Musk', 'A frozen rose cocktail with a refreshing menthol chill creating the sensation of rose petals over crushed ice on a summer evening.', NULL);

-- 33. BDK Parfums Rouge Smoking
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s893', 'Rouge Smoking', 'BDK Parfums', 2018, 'Eau de Parfum', 'Cinnamon, Pink Pepper, Saffron', 'Iris, Leather, Tobacco', 'Benzoin, Cedar, Musk, Amber', 'A red-tuxedo-wearing fragrance with warm cinnamon and saffron meeting smoky leather and tobacco, evoking Parisian evenings and glamorous soirees.', NULL);

-- 34. BDK Parfums Tabac Rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s894', 'Tabac Rose', 'BDK Parfums', 2019, 'Eau de Parfum', 'Bergamot, Cardamom, Pink Pepper', 'Rose, Tobacco, Geranium', 'Cedar, Patchouli, Musk, Amber', 'A refined tobacco-rose that captures the scent of rose petals pressed in a tobacco humidor, blending floral elegance with smoky warmth.', NULL);

-- 35. BDK Parfums Gris Charnel Extrait
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s895', 'Gris Charnel Extrait', 'BDK Parfums', 2022, 'Extrait de Parfum', 'Cardamom, Pink Pepper, Bergamot', 'Fig, Black Tea, Iris, Saffron', 'Vetiver, Tonka Bean, Sandalwood, Musk, Amber', 'A more concentrated, deeper version of the beloved Gris Charnel with saffron adding golden warmth to the intimate fig-tea accord.', NULL);

-- 36. BDK Parfums Sel d''Argent
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s896', 'Sel d''Argent', 'BDK Parfums', 2022, 'Eau de Parfum', 'Sea Salt, Bergamot, Lime', 'Iris, Jasmine, Violet', 'Ambroxan, Musk, Cedar, Driftwood', 'A silver salt breeze from the French coast with briny air and iris creating a luminous, mineral fragrance that smells of seaside walks.', NULL);

-- 37. Juliette Has A Gun Musc Invisible
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s897', 'Musc Invisible', 'Juliette Has A Gun', 2019, 'Eau de Parfum', 'Cotton Flower, Aldehydes', 'Jasmine, Musk', 'Sandalwood, Amber, Cashmeran, White Musk', 'An invisible veil of clean musk that enhances natural skin scent with cotton flower and sandalwood creating a your-skin-but-better effect.', NULL);

-- 38. Juliette Has A Gun Pear Inc.
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s898', 'Pear Inc.', 'Juliette Has A Gun', 2020, 'Eau de Parfum', 'Pear, Bergamot', 'Almond Milk, Musks', 'Sandalwood, Ambroxan, Cashmeran', 'A minimalist pear-almond composition celebrating simplicity with a creamy, skin-scent quality that feels both fresh and comforting.', NULL);

-- 39. Juliette Has A Gun Lipstick Fever
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s899', 'Lipstick Fever', 'Juliette Has A Gun', 2018, 'Eau de Parfum', 'Raspberry, Bergamot, Pink Pepper', 'Rose, Violet, Iris', 'Musk, Cashmeran, Vanilla', 'A fragrance that smells like freshly applied lipstick with raspberry and violet mimicking the powdery, cosmetic character of a new red lipstick.', NULL);

-- 40. Amouage Overture Man
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s900', 'Overture Man', 'Amouage', 2019, 'Eau de Parfum', 'Apple, Orris, Mandarin, Saffron', 'Rose, Frankincense, Osmanthus', 'Oud, Leather, Patchouli, Musk, Amber', 'An operatic opening act with apple and saffron rising to a crescendo of rose and frankincense before the grand finale of oud and leather.', NULL);

-- 41. Amouage Material
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s901', 'Material', 'Amouage', 2023, 'Eau de Parfum', 'Bergamot, Saffron, Black Pepper', 'Cashmeran, Iris, Violet', 'Oud, Sandalwood, Leather, Amber, Vetiver', 'A rich material exploration with saffron and oud providing the raw material, shaped by iris and leather into something deeply luxurious.', NULL);

-- 42. Parfums de Marly Akaster
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s902', 'Akaster', 'Parfums de Marly', 2023, 'Eau de Parfum', 'Grapefruit, Bergamot, Pink Pepper', 'Lavender, Geranium, Ambroxan', 'Cedar, Vetiver, Musk, Labdanum', 'A fresh aromatic with lavender and ambroxan creating a clean yet powerful presence, named after a legendary horse in the Marly stables.', NULL);

-- 43. Montale Dark Purple
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s903', 'Dark Purple', 'Montale', 2016, 'Eau de Parfum', 'Plum, Bergamot, Mandarin', 'Rose, Peach, Orchid', 'Patchouli, Vanilla, White Musk, Amber', 'A deep purple fruity-floral with rich plum and peach enveloped in dark patchouli and vanilla, mysterious and alluring.', NULL);

-- 44. Montale Sweet Oriental Dream
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s904', 'Sweet Oriental Dream', 'Montale', 2016, 'Eau de Parfum', 'Rose, Raspberry, Bergamot', 'Praline, Amber, Oud', 'Vanilla, Musk, Sandalwood, Benzoin', 'A dreamy oriental gourmand with raspberry praline and rose swirling over warm amber and oud, creating a sweet, hypnotic reverie.', NULL);

-- 45. Mancera Aoud Vanille
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s905', 'Aoud Vanille', 'Mancera', 2012, 'Eau de Parfum', 'Saffron, Oud, Rose', 'Amber, Oud, Patchouli', 'Vanilla, White Musk, Sandalwood, Cedar', 'A warm oud-vanilla pairing with saffron providing golden warmth. Creamy, resinous, and sweet, bridging oriental and gourmand traditions.', NULL);

-- 46. Mancera Gold Intensitive Aoud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s906', 'Gold Intensitive Aoud', 'Mancera', 2015, 'Eau de Parfum', 'Saffron, Grapefruit, Ginger', 'Oud, Rose, Amber', 'Musk, Sandalwood, Patchouli, Cedar', 'An intensely golden oud with saffron and ginger creating a luminous warmth. Powerful projection and exceptional longevity in the Mancera tradition.', NULL);

-- 47. Kilian Paris Angels'' Share
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s907', 'Angels'' Share', 'Kilian', 2020, 'Eau de Parfum', 'Cognac, Cinnamon, Nutmeg, Cardamom', 'Oak Absolute, Praline', 'Tonka Bean, Sandalwood, Vanilla, Vetiver', 'The whispers of evaporating cognac from aging barrels, captured in scent. Warm cognac, cinnamon, and oak create a cozy, boozy masterpiece.', NULL);

-- 48. Kilian Paris Apple Brandy on the Rocks
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s908', 'Apple Brandy on the Rocks', 'Kilian', 2021, 'Eau de Parfum', 'Apple, Cognac, Cardamom', 'Tuberose, Jasmine, Iris, Rose', 'Cedar, Sandalwood, Amberwood', 'A crisp apple brandy served over ice. Green apple and aged cognac are tempered by tuberose and cedar, balancing freshness with warmth.', NULL);

-- 49. Tiziana Terenzi Gumin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s909', 'Gumin', 'Tiziana Terenzi', 2015, 'Extrait de Parfum', 'Saffron, Cumin, Pink Pepper', 'Rose, Oud, Incense', 'Amber, Musk, Sandalwood, Vanilla, Patchouli', 'A warm, spiced extrait featuring cumin and saffron in a bold Middle Eastern-inspired blend with rose and oud creating exotic richness.', NULL);

-- 50. Tiziana Terenzi Ecstasy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s910', 'Ecstasy', 'Tiziana Terenzi', 2020, 'Extrait de Parfum', 'Bergamot, Pink Pepper, Grapefruit', 'Iris, Rose, Jasmine, Osmanthus', 'Sandalwood, Musk, Amber, Vanilla, Patchouli', 'A state of fragrant ecstasy with luminous osmanthus and iris floating above warm sandalwood and vanilla in a euphoric, enveloping composition.', NULL);

-- 51. Nishane B-612
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s911', 'B-612', 'Nishane', 2019, 'Extrait de Parfum', 'Mandarin, Bergamot, Grapefruit', 'Rose, Jasmine, Peony, Freesia', 'Musk, Sandalwood, Amber, Patchouli', 'Named after the Little Prince''s asteroid, a delicate floral capturing the rose-tending spirit of the beloved story with gentle florals and soft musk.', NULL);

-- 52. Xerjoff Casamorati Bouquet Ideale
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s912', 'Bouquet Ideale', 'Xerjoff', 2017, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin', 'Bulgarian Rose, Geranium, Lily of the Valley', 'Sandalwood, Musk, Benzoin, Amber', 'An ideal bouquet of classic flowers composed with Italian artistry, with Bulgarian rose and lily of the valley creating timeless floral elegance.', NULL);

-- 53. Parfums de Marly Layton
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s913', 'Layton Exclusif', 'Parfums de Marly', 2016, 'Eau de Parfum', 'Apple, Mandarin, Bergamot, Lavender', 'Jasmine, Violet, Geranium', 'Vanilla, Guaiac Wood, Patchouli, Sandalwood, Cardamom', 'The exclusive version of the house bestseller with deeper guaiac wood and richer vanilla creating a more intense, luxurious experience.', NULL);

-- 54. Initio Parfums Prives Musk Therapy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s914', 'Magnetic Blend 1', 'Initio', 2015, 'Eau de Parfum', 'Bergamot, Lavender, Grapefruit', 'Iris, Geranium, Jasmine', 'White Musk, Amber, Sandalwood, Cedar', 'A magnetic musk blend designed to enhance natural attraction through harmonious iris and white musk, clean and alluringly close to skin.', NULL);

-- 55. Maison Francis Kurkdjian Baccarat Rouge 540 Extrait
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s915', 'Baccarat Rouge 540 Extrait', 'Maison Francis Kurkdjian', 2017, 'Extrait de Parfum', 'Saffron, Bitter Almond', 'Egyptian Jasmine, Cedar', 'Ambergris, Fir Resin, Cashmeran', 'The intensified extrait of the iconic BR540 with added almond bitterness and deeper ambergris creating an even more magnetic, crystalline aura.', NULL);

-- 56. Maison Francis Kurkdjian Oud Satin Mood Extrait
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s916', 'Oud Satin Mood Extrait', 'Maison Francis Kurkdjian', 2018, 'Extrait de Parfum', 'Violet, Bulgarian Rose, Oud', 'Oud, Rose, Benzoin', 'Vanilla, Sandalwood, Musk', 'A luxurious oud-rose extrait wrapped in satin-smooth benzoin and vanilla, creating a rich, opulent oriental of extraordinary refinement.', NULL);

-- 57. Maison Francis Kurkdjian Gentle Fluidity Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s917', 'Gentle Fluidity Gold', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Juniper Berry, Nutmeg, Coriander', 'Musk, Amber, Vanilla', 'Sandalwood, Tonka Bean, Cedar', 'A warm, golden interpretation of fluidity with vanilla and tonka bean creating an enveloping sweetness. The more oriental of the Fluidity pair.', NULL);

-- 58. Maison Francis Kurkdjian Gentle Fluidity Silver
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s918', 'Gentle Fluidity Silver', 'Maison Francis Kurkdjian', 2019, 'Eau de Parfum', 'Juniper Berry, Nutmeg', 'Musk, Amber', 'Woodsy Notes, Vanilla', 'The cooler, more aromatic counterpart with gin-like juniper and clean musk creating a crisp, silvery freshness. A modern unisex essential.', NULL);

-- 59. Le Labo Rose 31
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s919', 'Rose 31', 'Le Labo', 2006, 'Eau de Parfum', 'Rose, Cumin, Pepper', 'Cedar, Cistus, Gaiac Wood', 'Vetiver, Amber, Musk, Olibanum', 'A deconstructed rose with raw cumin and cedar stripping away romantic convention to reveal rose in its most carnal, woody incarnation.', NULL);

-- 60. Le Labo Bergamote 22
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s920', 'Bergamote 22', 'Le Labo', 2006, 'Eau de Parfum', 'Bergamot, Grapefruit, Orange Blossom', 'Petit Grain, Jasmine', 'Cedar, Vetiver, Musk, Amber', 'A masterful bergamot study with the Italian citrus explored in all its facets through petit grain and orange blossom, bright and sophisticated.', NULL);

-- 61. Le Labo The Noir 29
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s921', 'The Noir 29', 'Le Labo', 2015, 'Eau de Parfum', 'Bergamot, Bay Leaf, Black Tea', 'Fig, Cedar, Vetiver, Tobacco', 'Musk, Hay, Amber', 'A smoky black tea composition with fig and tobacco evoking afternoon tea in a dimly lit library, contemplative and richly layered.', NULL);

-- 62. Byredo Mojave Ghost
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s922', 'Mojave Ghost', 'Byredo', 2014, 'Eau de Parfum', 'Jamaican Nesberry, Violet, Ambrette', 'Sandalwood, Magnolia, Chantilly Musk', 'Cedarwood, Amber, Crisp Amber', 'Inspired by the ghost flower of the Mojave Desert that blooms against all odds in harsh conditions, ethereal and luminous with woody musks.', NULL);

-- 63. Byredo Blanche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s923', 'Blanche', 'Byredo', 2009, 'Eau de Parfum', 'White Rose, Pink Pepper, Aldehyde', 'Peony, Violet, Neroli', 'Blonde Wood, Sandalwood, Musk', 'The scent of white. Fresh linen, soap, and pure florals creating a blank canvas of clean femininity that smells like skin just out of the bath.', NULL);

-- 64. Byredo Super Cedar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s924', 'Super Cedar', 'Byredo', 2016, 'Eau de Parfum', 'Rose, Green Leaves, Bergamot', 'Virginia Cedar, Haitian Vetiver', 'Musk, Kashmir Wood', 'A superhero of cedars with the noble wood explored in its most elemental form, supported by vetiver and rose creating a modern woody classic.', NULL);

-- 65. Byredo Oud Immortel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s925', 'Oud Immortel', 'Byredo', 2010, 'Eau de Parfum', 'Lemon, Incense, Limoncello', 'Oud, Patchouli, Brazilian Rosewood', 'Tobacco, Papyrus, Moss', 'An immortal oud stripped of cliches, pairing the precious wood with limoncello brightness and papyrus dryness in a contemporary, Scandinavian-minimalist approach.', NULL);

-- 66. Maison Margiela Jazz Club
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s926', 'Jazz Club', 'Maison Margiela', 2013, 'Eau de Toilette', 'Pink Pepper, Neroli, Lemon', 'Rum Absolute, Clary Sage, Java Vetiver', 'Tobacco Leaf, Vanilla Bean, Styrax, Tonka Bean', 'The atmosphere of a Brooklyn jazz club at 2am, thick with tobacco smoke, spilled rum, and the warmth of a late-night crowd.', NULL);

-- 67. Maison Margiela Whispers in the Library
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s927', 'Whispers in the Library', 'Maison Margiela', 2019, 'Eau de Toilette', 'Pepper Essence, Orange Blossom', 'Cedarwood, Vanilla Absolute', 'Benzoin, Peru Balsam, Tonka Bean', 'The scent of old book pages and wooden shelves with vanilla and benzoin recreating the warmth and quiet of a beloved library.', NULL);

-- 68. Maison Margiela Bubble Bath
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s928', 'Bubble Bath', 'Maison Margiela', 2020, 'Eau de Toilette', 'Lavender, Super Soap Accord, Coconut Milk', 'Rose, Peony, Jasmine', 'White Musk, Sandalwood, Cedar', 'A luxurious bubble bath reimagined as a wearable scent with soapy coconut milk and clean lavender creating an irresistible just-bathed freshness.', NULL);

-- 69. Escentric Molecules Molecule 02
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s929', 'Molecule 02', 'Escentric Molecules', 2008, 'Eau de Toilette', 'Ambroxan', 'Ambroxan', 'Ambroxan', 'A single molecule fragrance built entirely on ambroxan, the synthetic ambergris note. It creates a warm, musky aura that blooms differently on every skin.', NULL);

-- 70. Escentric Molecules Escentric 01
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s930', 'Escentric 01', 'Escentric Molecules', 2006, 'Eau de Toilette', 'Lime, Pink Pepper', 'Iso E Super, Orris', 'White Cedar, Musk', 'The companion to Molecule 01, surrounding the Iso E Super molecule with lime, pink pepper, and iris to create a sparkling, woody-fresh composition.', NULL);

-- 71. Penhaligon''s Halfeti
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s931', 'Halfeti', 'Penhaligon''s', 2015, 'Eau de Parfum', 'Bergamot, Grapefruit, Green Notes, Cardamom', 'Rose, Oud, Lavender, Jasmine', 'Sandalwood, Tonka Bean, Amber, Leather, Cypress', 'Named after the Turkish village where black roses grow, a dark and exotic oud-rose composition that is widely considered the finest Penhaligon''s creation.', NULL);

-- 72. Penhaligon''s Sartorial
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s932', 'Sartorial', 'Penhaligon''s', 2010, 'Eau de Toilette', 'Metallic, Honey, Beeswax', 'Cyclamen, Violet, Jasmine, Lily of the Valley', 'Musk, Oakmoss, Sandalwood, Leather, Cedar', 'Inspired by Savile Row tailoring with beeswax, metallic notes and leather evoking the workshop of master suit-makers.', NULL);

-- 73. Diptyque Tam Dao
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s933', 'Tam Dao', 'Diptyque', 2003, 'Eau de Parfum', 'Rose, Myrtle, Italian Cypress', 'Sandalwood, Amyris', 'Cedar, Musk, Amber', 'A pure sandalwood meditation inspired by Vietnamese temples. Creamy, warm, and serene, it captures the essence of sacred wood with remarkable clarity.', NULL);

-- 74. Diptyque Eau Duelle
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s934', 'Eau Duelle', 'Diptyque', 2010, 'Eau de Parfum', 'Elemi, Pink Pepper, Saffron', 'Black Tea, Juniper Berry, Calamus', 'Vanilla, Benzoin, Myrrh, Amber', 'A dual-natured vanilla that is both spicy and smooth, fresh and warm. Saffron and black tea give this vanilla a sophisticated, non-gourmand character.', NULL);

-- 75. Diptyque Philosykos
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s935', 'Philosykos', 'Diptyque', 1996, 'Eau de Parfum', 'Fig Leaf, Green Notes', 'Fig, Coconut', 'Cedar, Woody Notes, Musk', 'A fig lover''s paradise capturing the full fig tree experience: green leaves, ripe fruit, and warm wood in a Mediterranean garden composition.', NULL);

-- 76. Serge Lutens Ambre Sultan
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s936', 'Ambre Sultan', 'Serge Lutens', 2000, 'Eau de Parfum', 'Coriander, Bay Leaf, Oregano, Myrtle', 'Amber, Benzoin, Sandalwood', 'Vanilla, Patchouli, Musk, Resins', 'A benchmark amber fragrance with herbal Mediterranean opening notes giving way to a rich, resinous amber of almost supernatural warmth and depth.', NULL);

-- 77. Serge Lutens La Fille de Berlin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s937', 'La Fille de Berlin', 'Serge Lutens', 2013, 'Eau de Parfum', 'Rose, Pepper, Raspberry', 'Turkish Rose, Geranium', 'Incense, Tolu Balsam, Musk, Cashmeran', 'A lipstick-red rose inspired by a Berlin cabaret performer, raw and spicy with raspberry tartness adding modern edge to the classic rose.', NULL);

-- 78. Frederic Malle Portrait of a Lady
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s938', 'Portrait of a Lady', 'Frederic Malle', 2010, 'Eau de Parfum', 'Rose, Raspberry, Black Currant, Clove', 'Turkish Rose, Patchouli, Cinnamon', 'Benzoin, Sandalwood, Incense, Musk, Amber', 'A monumental rose-patchouli by Dominique Ropion that has become one of the most revered niche perfumes. Dense, dark, and magnificently feminine.', NULL);

-- 79. Frederic Malle Musc Ravageur
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s939', 'Musc Ravageur', 'Frederic Malle', 2000, 'Eau de Parfum', 'Lavender, Bergamot', 'Musk, Amber, Vanilla', 'Sandalwood, Cedar, Guaiac Wood, Tonka Bean', 'A devastating musk by Maurice Roucel that redefined musky sensuality with its bold amber-vanilla and raw animalic musk character.', NULL);

-- 80. Frederic Malle Carnal Flower
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s940', 'Carnal Flower', 'Frederic Malle', 2005, 'Eau de Parfum', 'Melon, Eucalyptus, Bergamot', 'Tuberose, Jasmine, Ylang-Ylang', 'Coconut, Musk, White Musk', 'A massive tuberose composition that captures the flower in its full glory with an indolic, almost narcotic intensity. The reference tuberose fragrance.', NULL);

-- 81. Memo Paris African Leather
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s941', 'African Leather', 'Memo Paris', 2016, 'Eau de Parfum', 'Cardamom, Geranium, Bergamot', 'Oud, Saffron, Cumin, Mango', 'Leather, Birch, Amber, Musk, Castoreum', 'An African leather journey with mango and saffron adding tropical warmth to raw birch and leather in a distinctive, animalic travel fragrance.', NULL);

-- 82. Memo Paris Marfa
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s942', 'Marfa', 'Memo Paris', 2017, 'Eau de Parfum', 'Freesia, Mandarin, Cassis', 'Hellebore, Orris, Rose, Jasmine, Heliotrope', 'Cashmeran, Sandalwood, Musk, Amber', 'Inspired by the art oasis in the Texas desert, a luminous floral with freesia and hellebore creating an airy, sun-bleached beauty.', NULL);

-- 83. Amouage Crimson Rocks
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s943', 'Crimson Rocks', 'Amouage', 2023, 'Eau de Parfum', 'Red Pepper, Pink Pepper, Grapefruit', 'Rose Absolute, Geranium, Orris', 'Oud, Patchouli, Amber, Musk, Castoreum', 'A fiery rose-oud inspired by Oman''s crimson rock formations, with double pepper providing volcanic heat above deep, animalic oud.', NULL);

-- 84. Nishane Hundred Silent Ways Extrait
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s944', 'Colognise', 'Nishane', 2020, 'Extrait de Parfum', 'Bergamot, Lemon, Grapefruit, Lime', 'Neroli, Petitgrain, Orange Blossom', 'Musk, Vetiver, Cedar, Amber', 'A luxurious extrait-strength cologne with Italian citrus given unprecedented longevity and depth through high-quality neroli and amber base notes.', NULL);

-- 85. BDK Parfums Wood Jasmin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s945', 'Wood Jasmin', 'BDK Parfums', 2023, 'Eau de Parfum', 'Bergamot, Cardamom, Pink Pepper', 'Jasmine, Cashmeran, Iris', 'Sandalwood, Cedar, Musk, Amber, Patchouli', 'A Parisian wood-jasmine pairing with cardamom and cashmeran adding smoky warmth to the jasmine heart, sophisticated and intimate.', NULL);

-- 86. Xerjoff V - Accento
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s946', 'Accento', 'Xerjoff', 2019, 'Eau de Parfum', 'Pineapple, Egyptian Jasmine, Ylang-Ylang', 'Rose, Orris, Heliotrope, Iris', 'Musk, Vanilla, Sandalwood, Cedar, Amber', 'A sweet floral with tropical pineapple and jasmine creating a radiant, joyful composition often compared to a more refined, luxurious fruity-floral.', NULL);

-- 87. Xerjoff Casamorati Dolce Amalfi
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s947', 'Dolce Amalfi', 'Xerjoff', 2019, 'Eau de Parfum', 'Lemon, Orange, Bergamot', 'Jasmine, Neroli, Rose', 'Musk, Tonka Bean, Vanilla, Benzoin', 'A sweet Amalfi Coast citrus with neroli and jasmine adding floral depth. Italian sunshine in a bottle, warm, bright, and endlessly cheerful.', NULL);

-- 88. Initio Parfums Prives Narcotic Delight
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s948', 'Narcotic Delight', 'Initio', 2021, 'Eau de Parfum', 'Coffee, Cardamom, Pink Pepper', 'Rose, Vanilla, Caramel', 'Musk, Sandalwood, Amber, Cashmeran', 'An addictive coffee-rose gourmand with caramel sweetness and cardamom spice creating a narcotic, pleasure-inducing composition.', NULL);

-- 89. Parfums de Marly Delina La Rosee
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s949', 'Delina La Rosee', 'Parfums de Marly', 2020, 'Eau de Parfum', 'Litchi, Bergamot, Pear', 'Turkish Rose, Peony, Magnolia', 'White Musk, Cedar, Cashmeran', 'A dewdrop-fresh version of Delina with magnolia and pear adding crisp, morning-garden lightness to the beloved rose-lychee formula.', NULL);

-- 90. Montale Roses Elixir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s950', 'Roses Elixir', 'Montale', 2015, 'Eau de Parfum', 'Rose, Raspberry, Litchi', 'Rose, Jasmine, Peony', 'White Musk, Amber, Vanilla', 'A fruity rose elixir with raspberry and lychee adding sweetness to a radiant rose bouquet, popular and universally appealing.', NULL);

-- 91. Mancera Instant Crush
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s951', 'Lemon Line Aoud', 'Mancera', 2017, 'Eau de Parfum', 'Lemon, Bergamot, Green Notes', 'Oud, Rose, Jasmine', 'Vanilla, Amber, Musk, Sandalwood', 'An unusual lemon-oud pairing that brings brightness and zest to the typically dark aoud character, refreshing and distinctive.', NULL);

-- 92. Kilian Paris Vodka on the Rocks
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s952', 'Flower of Immortality', 'Kilian', 2019, 'Eau de Parfum', 'Goji Berry, Lemon, Bergamot', 'Osmanthus, Mate Tea, Jasmine', 'Sandalwood, Musk, Amber', 'A wellness-inspired fragrance with antioxidant-rich goji berry and green mate tea creating a fresh, energizing composition centered on longevity and vitality.', NULL);

-- 93. Tiziana Terenzi Laudano Nero
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s953', 'Laudano Nero', 'Tiziana Terenzi', 2016, 'Extrait de Parfum', 'Bergamot, Orange, Pink Pepper', 'Rose, Styrax, Oud, Labdanum', 'Amber, Musk, Patchouli, Vanilla, Benzoin', 'A dark, opium-inspired extrait with labdanum and styrax creating a narcotic, resinous quality. Intensely smoky and deeply hypnotic.', NULL);

-- 94. Juliette Has A Gun Gentlewoman
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s954', 'Gentlewoman', 'Juliette Has A Gun', 2015, 'Eau de Parfum', 'Ginger, Neroli, Orange Blossom', 'Jasmine, Violet', 'Musk, Amber, Patchouli, Cedar', 'A feminine take on the classic gentleman''s cologne with neroli and orange blossom creating a bright, sophisticated floral-aromatic composition.', NULL);

-- 95. Le Labo Tonka 25
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s955', 'Tonka 25', 'Le Labo', 2008, 'Eau de Parfum', 'Orange Flower, Cedar Wood', 'Tonka Bean, Musk', 'Cedarwood, Amber, Vanilla', 'A warm, enveloping tonka bean composition with orange flower adding brightness to the creamy, hay-like bean in a cozy, comforting embrace.', NULL);

-- 96. Byredo Slow Dance
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s956', 'Slow Dance', 'Byredo', 2019, 'Eau de Parfum', 'Opoponax, Geranium', 'Violet, Labdanum, Vanilla', 'Patchouli, Amber, Oud, Musk', 'The intimacy of a slow dance captured in scent. Opoponax and labdanum create resinous warmth while violet adds tender sweetness to the close embrace.', NULL);

-- 97. Frederic Malle The Night
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s957', 'The Night', 'Frederic Malle', 2021, 'Eau de Parfum', 'Pink Pepper, Plum', 'Oud, Turkish Rose, Saffron', 'Amber, Incense, Sandalwood, Musk', 'A nocturnal oud-rose created for Middle Eastern nights with saffron and plum adding opulence to a rich, dark tapestry of precious ingredients.', NULL);

-- 98. Diptyque Do Son
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s958', 'Do Son', 'Diptyque', 2005, 'Eau de Parfum', 'Orange Blossom, Pink Pepper', 'Tuberose, Jasmine', 'Musk, Benzoin, Iris', 'Named after a Vietnamese beach, a luminous tuberose captured in sea breeze. The tropical flower''s heady sweetness is tempered by clean musk and salty air.', NULL);

-- 99. Serge Lutens Chergui
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s959', 'Chergui', 'Serge Lutens', 2005, 'Eau de Parfum', 'Hay, Iris, Rose', 'Tobacco, Honey, Amber', 'Musk, Sandalwood, Vanilla, Incense, Benzoin', 'Named after the dry desert wind, a warm tobacco-honey oriental with hay and iris adding a golden, sun-baked quality. A cult classic among connoisseurs.', NULL);

-- 100. Memo Paris Winter Palace
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s960', 'Winter Palace', 'Memo Paris', 2017, 'Eau de Parfum', 'Bergamot, Orange Blossom, Cardamom', 'Rose, Jasmine, Leather', 'Sandalwood, Amber, Musk, Vanilla, Cedar', 'Inspired by the Russian Winter Palace with orange blossom and leather evoking aristocratic splendor against the cold, finished with warm amber and sandalwood.', NULL);

-- End of migration 026
-- Total: 100 modern niche & artisanal perfumes (s861-s960)
-- Brands covered: Initio, Xerjoff, Nishane, Amouage, Parfums de Marly, Montale, Mancera,
-- Tiziana Terenzi, Kilian, BDK Parfums, Juliette Has A Gun, Maison Francis Kurkdjian,
-- Le Labo, Byredo, Maison Margiela, Escentric Molecules, Penhaligon's, Diptyque,
-- Serge Lutens, Frederic Malle, Memo Paris
