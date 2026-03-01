-- Migration 022: Seed 100 Feminine Perfumes for FragBase
-- Real perfumes with accurate notes, descriptions, and perfumers
-- Uses INSERT OR IGNORE to avoid duplicates

-- BATCH 1: Chanel (f001-f003)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s561', 'No. 5 Eau de Parfum', 'Chanel', 1986, 'Eau de Parfum', 'Aldehydes, Neroli, Ylang-Ylang, Bergamot', 'Jasmine, Rose, Lily of the Valley, Iris', 'Sandalwood, Vetiver, Vanilla, Musk, Cedar', 'The EDP version of the world''s most iconic fragrance. A luxurious floral aldehyde that redefined femininity. Timeless, elegant, and unmistakable.', 'https://fimgs.net/mdimg/perfume/375x500.50.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s562', 'Coco Mademoiselle', 'Chanel', 2001, 'Eau de Parfum', 'Orange, Mandarin, Bergamot', 'Rose, Jasmine, Mimosa, Lychee', 'Patchouli, Vetiver, Musk, Vanilla, Opoponax', 'A fresh and oriental fragrance that became an instant modern classic. Youthful yet sophisticated, with a perfect balance of citrus and patchouli.', 'https://fimgs.net/mdimg/perfume/375x500.611.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s563', 'Chance Eau Tendre', 'Chanel', 2010, 'Eau de Toilette', 'Quince, Grapefruit', 'Hyacinth, Jasmine, Rose', 'Cedar, Iris, Amber, Musk, Virginia Cedar', 'A delicate and romantic take on Chance. A round fruity floral that feels like the softness of spring. Elegant and effortlessly feminine.', NULL);


-- BATCH 2: Dior (f004-f006)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s564', 'J''adore', 'Dior', 1999, 'Eau de Parfum', 'Pear, Melon, Magnolia, Peach, Mandarin, Bergamot', 'Jasmine, Lily of the Valley, Tuberose, Rose, Violet, Freesia', 'Musk, Vanilla, Cedar, Blackberry', 'A luminous and sensual floral bouquet that has become one of the best-selling perfumes worldwide. Opulent and radiant, J''adore is an ode to absolute femininity.', 'https://fimgs.net/mdimg/perfume/375x500.174.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s565', 'Miss Dior Eau de Parfum', 'Dior', 2017, 'Eau de Parfum', 'Blood Orange, Mandarin', 'Grasse Rose, Damascus Rose, Peony', 'Rosewood, Musk, Patchouli', 'A romantic and couture floral reinvention of the iconic Miss Dior. Fresh roses meet warm woods in a vibrant declaration of love.', 'https://fimgs.net/mdimg/perfume/375x500.54882.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s566', 'Hypnotic Poison', 'Dior', 1998, 'Eau de Toilette', 'Apricot, Plum, Coconut', 'Tuberose, Jasmine, Lily of the Valley, Rosewood, Caraway', 'Vanilla, Musk, Sandalwood, Almond, Cedar', 'An intoxicating gourmand oriental that casts an irresistible spell. Bitter almond and vanilla create a hypnotic trail that is both dark and addictive.', NULL);


-- BATCH 3: YSL (f007-f009)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s567', 'Black Opium', 'Yves Saint Laurent', 2014, 'Eau de Parfum', 'Pink Pepper, Orange Blossom, Pear', 'Coffee, Jasmine, Bitter Almond, Licorice', 'Vanilla, Patchouli, Cedar, Cashmere Wood', 'A rock''n''roll floral gourmand that shocked the fragrance world. Coffee and vanilla intertwine in an addictive, darkly seductive composition.', 'https://fimgs.net/mdimg/perfume/375x500.24920.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s568', 'Libre Eau de Parfum', 'Yves Saint Laurent', 2019, 'Eau de Parfum', 'Mandarin, Lavender, Blackcurrant', 'Orange Blossom, Jasmine, Lavender Essence', 'Vanilla, Cedar, Musk, Ambergris', 'A daring contrast of cool lavender and warm vanilla that embodies freedom. A bold floral fougere that breaks conventions with fierce elegance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s569', 'Mon Paris', 'Yves Saint Laurent', 2016, 'Eau de Parfum', 'Strawberry, Raspberry, Pear', 'Datura, Peony, Jasmine', 'Patchouli, White Musk, Ambroxan, Cashmeran', 'An intense and romantic chypre fruity fragrance inspired by Parisian passion. Lush berries cascade into a sultry, intoxicating drydown.', NULL);


-- BATCH 4: Lancome (f010-f012)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s570', 'La Vie Est Belle', 'Lancome', 2012, 'Eau de Parfum', 'Blackcurrant, Pear', 'Iris, Jasmine, Orange Blossom', 'Praline, Vanilla, Patchouli, Tonka Bean', 'A gourmand floral that declares life is beautiful. The sweetness of praline meets the elegance of iris in a warm, enveloping embrace.', 'https://fimgs.net/mdimg/perfume/375x500.14982.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s571', 'Idole', 'Lancome', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Pear', 'Rose, Jasmine', 'White Musk, Cedar, Vanilla, Cashmere Wood', 'A clean and radiant rose fragrance designed for a new generation. Minimalist yet luminous, capturing the spirit of modern femininity.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s572', 'Tresor', 'Lancome', 1990, 'Eau de Parfum', 'Rose, Lilac, Lily of the Valley, Peach, Apricot Blossom, Pineapple', 'Iris, Jasmine, Heliotrope, Rose', 'Sandalwood, Amber, Vanilla, Musk, Apricot', 'A timeless romantic oriental that has been treasured for decades. Powdery rose and warm amber create an intimate, comforting aura.', NULL);


-- BATCH 5: Versace (f013-f014)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s573', 'Bright Crystal', 'Versace', 2006, 'Eau de Toilette', 'Pomegranate, Yuzu, Frosted Accord', 'Peony, Magnolia, Lotus', 'Mahogany, Amber, Musk, Vegetal Amber', 'A luminous fresh floral that sparkles like a crystal in sunlight. Delicate yet vibrant, with a clean, airy character that feels effortlessly beautiful.', 'https://fimgs.net/mdimg/perfume/375x500.1507.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s574', 'Crystal Noir', 'Versace', 2004, 'Eau de Parfum', 'Ginger, Cardamom, Pepper', 'Gardenia, Peony, Coconut, Orange Blossom', 'Sandalwood, Musk, Amber, Cashmere Wood', 'A dark and mysterious floral oriental that contrasts with its sibling Bright Crystal. Exotic coconut and spice create a seductive nighttime allure.', NULL);


-- BATCH 6: Marc Jacobs (f015-f016)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s575', 'Daisy', 'Marc Jacobs', 2007, 'Eau de Toilette', 'Strawberry, Violet Leaves, Blood Grapefruit', 'Gardenia, Violet Petals, Jasmine', 'Musk, Vanilla, White Woods', 'A bubbly and cheerful fresh floral that became an icon of youthful femininity. Playful and bright, like picking wildflowers on a sunny day.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s576', 'Daisy Dream', 'Marc Jacobs', 2014, 'Eau de Toilette', 'Blackberry, Grapefruit, Pear', 'Jasmine, Lychee, Blue Wisteria', 'White Woods, Musk, Coconut Water', 'A dreamy and airy interpretation of Daisy. Blue wisteria and coconut water create a breezy, cloud-like softness.', NULL);


-- BATCH 7: Guerlain (f017-f019)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s577', 'Shalimar', 'Guerlain', 1925, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin', 'Jasmine, May Rose, Iris, Opoponax', 'Vanilla, Tonka Bean, Benzoin, Sandalwood, Incense, Musk', 'One of the greatest perfumes ever created, inspired by the love story of Emperor Shah Jahan. A legendary oriental that defined an entire category with its luminous vanilla.', 'https://fimgs.net/mdimg/perfume/375x500.71.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s578', 'Mon Guerlain', 'Guerlain', 2017, 'Eau de Parfum', 'Lavender, Bergamot', 'Iris, Jasmine Sambac', 'Vanilla, Sandalwood, Coumarin, Benzoin', 'A modern tribute to today''s femininity inspired by Angelina Jolie. Fresh lavender meets carnal vanilla in a bold yet graceful composition.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s579', 'La Petite Robe Noire', 'Guerlain', 2012, 'Eau de Parfum', 'Almond, Bergamot, Cherry, Berries', 'Rose, Tea, Licorice, Peach', 'Anise, Vanilla, Tonka Bean, Musk', 'A playful and gourmand little black dress of a fragrance. Cherry and almond dance with rose in a delightfully Parisian composition.', NULL);


-- BATCH 8: Tom Ford, Narciso Rodriguez, Prada (f020-f024)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s580', 'Black Orchid', 'Tom Ford', 2006, 'Eau de Parfum', 'Truffle, Blackcurrant, Ylang-Ylang, Bergamot, Lemon', 'Orchid, Lotus Wood, Fruity Notes, Spices', 'Patchouli, Incense, Vanilla, Vetiver, Sandalwood, Dark Chocolate', 'A luxurious and statement-making dark floral oriental. Opulent layers of black truffle, orchid, and spice create a scent of bold, glamorous mystery.', 'https://fimgs.net/mdimg/perfume/375x500.1018.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s581', 'For Her Eau de Parfum', 'Narciso Rodriguez', 2006, 'Eau de Parfum', 'Rose, Peach', 'Musc, Amber, Osmanthus', 'Patchouli, Sandalwood, Vetiver, Vanilla', 'A celebration of musc at the heart. Sensual and enveloping, this perfume wraps the skin in an intimate veil of warmth. Pure femininity distilled.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s582', 'Pure Musc', 'Narciso Rodriguez', 2019, 'Eau de Parfum', 'Pink Pepper, Bergamot', 'Musc, Cashmeran, Rose', 'Amber, Cedarwood, White Musk', 'A minimalist and addictive composition centered around a single pure musc. Clean yet deeply sensual, like skin on skin.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s583', 'Candy', 'Prada', 2011, 'Eau de Parfum', 'Caramel', 'Musks, Powdery Notes', 'Benzoin, Vanilla, Honey', 'A bold and unapologetic gourmand built on caramel and benzoin. Sweet, addictive, and radiant, it leaves a memorable, lingering trail.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s584', 'La Femme', 'Prada', 2016, 'Eau de Parfum', 'Frangipani, Ylang-Ylang', 'Tuberose, Jasmine, Vetiver', 'Beeswax, Vanilla, Benzoin', 'A floral fougere that bridges classic and modern. Buttery tuberose meets beeswax in a warm, honied embrace that feels truly feminine.', NULL);


-- BATCH 9: D&G, Givenchy, Valentino (f025-f030)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s585', 'Light Blue', 'Dolce & Gabbana', 2001, 'Eau de Toilette', 'Sicilian Lemon, Apple, Cedar, Bellflower', 'Bamboo, Jasmine, White Rose', 'Cedar, Musk, Amber', 'A sparkling Mediterranean escape that captures the essence of a Sicilian summer. Crisp citrus and white florals evoke sun-drenched coastlines and carefree elegance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s586', 'The Only One', 'Dolce & Gabbana', 2018, 'Eau de Parfum', 'Violet Leaf, Grapefruit, Bergamot', 'Coffee, Violet, Iris', 'Patchouli, Vanilla, Cedar, Sugar, Caramel', 'A captivating coffee-floral that balances sophistication with warmth. Iris and coffee beans create a magnetic, unforgettable aura of confident femininity.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s587', 'Irresistible Eau de Parfum', 'Givenchy', 2020, 'Eau de Parfum', 'Pear, Ambrette', 'Rose, Iris', 'Musk, Cedar, Vanilla, Amber', 'A sparkling and radiant rose composition that captures the joy of a beaming smile. Fizzy pear meets luminous rose in a feel-good fragrance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s588', 'L''Interdit', 'Givenchy', 2018, 'Eau de Parfum', 'Pear, Bergamot', 'Tuberose, Orange Blossom, Jasmine', 'Patchouli, Vetiver, Ambroxan', 'A white floral with a dark twist, inspired by Audrey Hepburn''s daring spirit. Luminous tuberose contrasts with dark vetiver in an addictive tension.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s589', 'Donna Born in Roma', 'Valentino', 2019, 'Eau de Parfum', 'Pink Pepper, Bergamot', 'Jasmine Grandiflorum, Turkish Rose', 'Bourbon Vanilla, Cashmeran, Benzoin, Woody Notes', 'A modern haute couture floral gourmand inspired by the eternal city. Jasmine and vanilla intertwine in a bold, youthful composition that commands attention.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s590', 'Voce Viva', 'Valentino', 2020, 'Eau de Parfum', 'Italian Bergamot, Mandarin', 'Orange Blossom, Gardenia, Crystal Moss', 'Vanilla, Sandalwood, Musk', 'A vibrant and luminous floral that celebrates the power of the voice. Gardenia and orange blossom create a warm, golden aura.', NULL);


-- BATCH 10: Carolina Herrera, Thierry Mugler (f031-f034)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s591', 'Good Girl', 'Carolina Herrera', 2016, 'Eau de Parfum', 'Almond, Coffee', 'Tuberose, Jasmine Sambac, Bulgarian Rose', 'Tonka Bean, Cacao, Sandalwood, Cedar, Cinnamon', 'A duality fragrance housed in a stiletto bottle. The light of tuberose meets the dark of tonka and cocoa in an addictive, powerful statement of feminine allure.', 'https://fimgs.net/mdimg/perfume/375x500.37516.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s592', 'Good Girl Supreme', 'Carolina Herrera', 2020, 'Eau de Parfum', 'Red Berries, Egyptian Jasmine', 'Tuberose, Vanilla Orchid', 'Tonka Bean, Roasted Tonka, Brown Sugar', 'A richer and sweeter take on the original Good Girl. Red berries and brown sugar add a gourmand sweetness to the iconic tuberose-tonka formula.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s593', 'Angel', 'Mugler', 1992, 'Eau de Parfum', 'Cotton Candy, Coconut, Mandarin, Cassia, Jasmine', 'Honey, Apricot, Blackberry, Plum, Red Berries', 'Patchouli, Chocolate, Vanilla, Tonka Bean, Caramel', 'The original gourmand that changed perfumery forever. A groundbreaking blend of patchouli and chocolate that divides opinion but never fails to make a statement.', 'https://fimgs.net/mdimg/perfume/375x500.192.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s594', 'Alien', 'Mugler', 2005, 'Eau de Parfum', 'Jasmine Sambac', 'Cashmeran, Amber', 'White Amber, Woody Notes, Musk', 'A solar and mysterious woody amber built around a luminous jasmine. Otherworldly and radiant, it glows on the skin with an almost supernatural warmth.', NULL);


-- BATCH 11: Jo Malone, Chloe, Viktor & Rolf (f035-f040)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s595', 'Peony & Blush Suede', 'Jo Malone London', 2013, 'Cologne', 'Red Apple', 'Peony, Jasmine, Rose, Carnation, Gillyflower', 'Suede, Musk', 'A flirtatious and charming floral with a suede undertone. Lush peonies blush against soft suede in an irresistibly textured composition.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s596', 'Wood Sage & Sea Salt', 'Jo Malone London', 2014, 'Cologne', 'Ambrette Seeds, Sea Salt', 'Sea Kale, Sage', 'Driftwood, Grapefruit, Red Algae', 'A windswept escape to the coast. Earthy sage meets sea salt spray in a mineral, fresh composition that feels utterly natural and modern.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s597', 'Chloe Eau de Parfum', 'Chloe', 2008, 'Eau de Parfum', 'Pink Pepper, Litchi, Freesia', 'Peony, Lily of the Valley, Magnolia, Rose', 'Virginia Cedar, Amber, Honey', 'A romantic and powdery rose that defined a generation of femininity. Fresh yet creamy, with pink pepper adding a modern spark to classic rose.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s598', 'Nomade', 'Chloe', 2018, 'Eau de Parfum', 'Mirabelle, Bergamot, Lemon', 'Freesia, Rose, Jasmine Absolute', 'Oakmoss, Amberwood, White Musk', 'A spirited chypre for the modern free spirit. Sun-ripened mirabelle and oakmoss frame a bright floral heart that captures wanderlust and independence.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s599', 'Flowerbomb', 'Viktor & Rolf', 2005, 'Eau de Parfum', 'Bergamot, Tea, Freesia', 'Jasmine, Orchid, Rose, Cattleya Orchid', 'Patchouli, Musk, Vanilla, Cedar', 'An explosive floral bouquet that detonates a profusion of flowers. Thousands of flowers explode into a single sensation: an addictive, opulent floral oriental.', 'https://fimgs.net/mdimg/perfume/375x500.2219.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s600', 'Bonbon', 'Viktor & Rolf', 2014, 'Eau de Parfum', 'Mandarin, Orange, Peach', 'Caramel, Orange Blossom, Jasmine, Grapes', 'Guaiac Wood, Cedar, Amber, Sandalwood', 'A couture caramel treat wrapped in citrus and wood. Playfully sweet yet sophisticated, like an irresistible haute couture confection.', NULL);


-- BATCH 12: Burberry, Ariana Grande, Sol de Janeiro (f041-f045)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s601', 'Her', 'Burberry', 2018, 'Eau de Parfum', 'Blackberry, Blackcurrant, Raspberry, Strawberry, Blueberry, Mandarin', 'Jasmine, Violet', 'Musk, Amber, Dry Cocoa, Cashmeran', 'A vibrant berry-forward fragrance that captures the spirit of London. Juicy British berries meet jasmine and cocoa in a modern, youthful composition.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s602', 'My Burberry', 'Burberry', 2014, 'Eau de Parfum', 'Sweet Pea, Bergamot', 'Geranium Leaf, Golden Quince, Freesia', 'Damask Rose, Patchouli, Rain-Tipped Damask, Rose', 'Inspired by the iconic Burberry trench coat caught in a London rain shower. Dewy sweet pea and rain-kissed rose create a refined British elegance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s603', 'Cloud', 'Ariana Grande', 2018, 'Eau de Parfum', 'Lavender Blossom, Juicy Pear, Bergamot', 'Coconut, Praline, Vanilla Orchid', 'Creamy Musks, Blonde Woods, Cashmere', 'A dreamy and airy unisex-leaning gourmand that became a viral sensation. Whipped praline and coconut float on a cloud of creamy musks.', 'https://fimgs.net/mdimg/perfume/375x500.51993.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s604', 'R.E.M.', 'Ariana Grande', 2020, 'Eau de Parfum', 'Fig, Pear, Salted Caramel, Zefir', 'Lavender, Quince', 'Tonka Bean, Sandalwood, Musks, Cashmere', 'A celestial lavender gourmand inspired by dreams. Salted caramel and lavender merge in a cosmic, ethereal sweetness that transcends reality.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s605', 'Brazilian Bum Bum Cream', 'Sol de Janeiro', 2018, 'Eau de Parfum', 'Pistachio, Almond', 'Jasmine, Salted Caramel', 'Sandalwood, Vanilla, Musk', 'The beloved body cream scent turned perfume. Warm salted caramel, pistachio, and vanilla evoke Brazilian beaches and golden skin.', NULL);


-- BATCH 13: Parfums de Marly, Initio, Xerjoff, Nishane (f046-f050)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s606', 'Delina', 'Parfums de Marly', 2017, 'Eau de Parfum', 'Litchi, Rhubarb, Bergamot, Nutmeg', 'Turkish Rose, Peony, Vanilla', 'Cashmeran, Cedar, Musk, Incense', 'A regal and romantic rose fragrance with a fruity twist. Lychee-kissed Turkish rose and creamy vanilla create an opulent, princess-like aura.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s607', 'Delina Exclusif', 'Parfums de Marly', 2018, 'Parfum', 'Litchi, Pear, Bergamot, Grapefruit', 'Turkish Rose, Peony, Aoud', 'Vanilla, Amber, Musk, Incense, Cashmeran, Evernyl', 'The richer, more opulent and animalic version of Delina. Oud and incense deepen the rose into a more intense, captivating expression.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s608', 'Musk Therapy', 'Initio Parfums Prives', 2019, 'Eau de Parfum', 'Bergamot, Tangerine', 'Rose, Egyptian Jasmine', 'Musk, Ambroxan, Vanilla, White Cedar, Cashmeran', 'A skin-scent therapy that wraps you in a warm musk cocoon. Minimalist yet deeply comforting, like being embraced by cashmere.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s609', 'Casamorati Lira', 'Xerjoff', 2009, 'Eau de Parfum', 'Tangerine, Orange, Bergamot, Rose', 'Orange Blossom, Lavender, Incense', 'Caramel, Vanilla, Tolu Balsam, Tonka Bean, Musk', 'An Italian gourmand masterpiece. Citrus-glazed caramel and orange blossom create a luxurious, warm fragrance reminiscent of artisanal Italian confections.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s610', 'Wulong Cha', 'Nishane', 2015, 'Extrait de Parfum', 'Sicilian Bergamot, Grapefruit, Green Tea', 'Hungarian Cinnamon, Oolong Tea, Egyptian Jasmine', 'Musk, Haitian Vetiver, Virginia Cedar, Cashmeran', 'A refined and meditative tea fragrance. Oolong tea and jasmine create a serene, elegant composition that feels both calming and sophisticated.', NULL);


-- BATCH 14: Kilian (f051-f052)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s611', 'Love, Don''t Be Shy', 'Kilian', 2007, 'Eau de Parfum', 'Neroli, Pink Pepper, Bergamot, Coriander', 'Orange Blossom, Jasmine, Honeysuckle, Iris', 'Sugar, Caramel, Vanilla, Musk, Civet', 'A tender and addictive gourmand floral. Marshmallow-like sweetness meets orange blossom in a romantic, skin-hugging composition. Famous for its caramel embrace.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s612', 'Good Girl Gone Bad', 'Kilian', 2012, 'Eau de Parfum', 'May Rose, Osmanthus', 'Tuberose, Jasmine Sambac', 'Amber, Cedar, Musk, Vanilla', 'A seductive white floral that tells the story of a good girl''s transformation. Intoxicating tuberose and jasmine create an irresistible floral cocktail.', NULL);


-- BATCH 15: Estee Lauder, Elizabeth Arden (f053-f055)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s613', 'Beautiful', 'Estee Lauder', 1985, 'Eau de Parfum', 'Rose, Lily, Mandarin, Bergamot, Marigold', 'Tuberose, Jasmine, Orange Blossom, Ylang-Ylang, Carnation', 'Sandalwood, Vetiver, Cedar, Musk', 'A grand floral bouquet for the beautiful bride. Over a thousand flowers compose this lush, romantic masterpiece of American perfumery.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s614', 'Pleasures', 'Estee Lauder', 1995, 'Eau de Parfum', 'Violet Leaves, Green Notes, Pink Pepper, Karo Karounde', 'Lilac, Lily of the Valley, Peony, Rose, Jasmine, Geranium', 'Patchouli, Sandalwood, Cedar, Musk', 'A sheer and airy floral that captures the pleasure of a garden in bloom. Light, transparent florals feel fresh and effortlessly feminine.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s615', 'Red Door', 'Elizabeth Arden', 1989, 'Eau de Toilette', 'Red Rose, Lily of the Valley, Wild Violet, Apple Blossom, Freesia', 'Jasmine, Moroccan Rose, Ylang-Ylang, Orchid, Tuberose', 'Honey, Sandalwood, Amber, Musk, Vetiver, Cedar', 'A rich and opulent floral inspired by the iconic red doors of the Elizabeth Arden salon. A powerhouse of layered roses and oriental warmth.', NULL);


-- BATCH 16: Armani, Clinique (f056-f059)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s616', 'Si', 'Giorgio Armani', 2013, 'Eau de Parfum', 'Blackcurrant Nectar, Mandarin', 'May Rose, Freesia, Neroli', 'Vanilla, Patchouli, Ambroxan, Musk, Woody Notes', 'An elegant and modern chypre that says yes to life. Blackcurrant and vanilla create a strong yet graceful fragrance of irresistible femininity.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s617', 'Si Passione', 'Giorgio Armani', 2018, 'Eau de Parfum', 'Pink Pepper, Pear, Bergamot', 'Rose, Jasmine, Heliotrope', 'Vanilla, Cedar, Amber, Patchouli, White Musk', 'A passionate and bold red take on the Si line. Rose and pink pepper ignite a fiery warmth that is both seductive and powerful.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s618', 'Happy', 'Clinique', 1998, 'Parfum', 'Ruby Red Grapefruit, Bergamot, Mandarin', 'Hawaiian Wedding Flower, Boysenberry Bush Flower, Morning Dew Orchid, Freesia', 'Amber, Musk, Lily of the Valley', 'A bright and cheerful citrus floral that instantly lifts spirits. Effervescent grapefruit and florals create a feel-good fragrance of pure optimism.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s619', 'Aromatics Elixir', 'Clinique', 1971, 'Parfum', 'Chamomile, Coriander, Clary Sage, Bergamot', 'Jasmine, Ylang-Ylang, Rose, Carnation, Geranium', 'Patchouli, Oakmoss, Sandalwood, Vetiver, Musk', 'A groundbreaking chypre that was avant-garde in its day and remains a cult classic. Intense patchouli and oakmoss create a brooding, intellectual fragrance.', NULL);


-- BATCH 17: Dolce, Coach, Michael Kors, Tiffany, Bottega Veneta (f060-f065)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s620', 'Dolce', 'Dolce & Gabbana', 2014, 'Eau de Parfum', 'Neroli Leaves, Papaya Flower', 'White Amaryllis, White Daffodil, White Water Lily', 'Cashmeran, Musky Notes, Sandalwood', 'A fresh and innocent white floral inspired by the Sicilian countryside. Delicate white flowers bloom against a soft musky base.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s621', 'Floral', 'Coach', 2018, 'Eau de Parfum', 'Pink Pepper, Pineapple, Mandarin Orange', 'Rose, Gardenia, Jasmine', 'Sandalwood, Musk, Suede', 'A cheerful and optimistic American floral. Sun-drenched gardenia and suede evoke the carefree energy of a road trip through the heartland.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s622', 'Dreams', 'Coach', 2020, 'Eau de Parfum', 'Pear, Bitter Orange', 'Gardenia, Cactus Flower', 'Musk, Cashmere Wood, Joshua Tree', 'A desert-inspired floral with a dreamy quality. Cactus flower and Joshua tree add an arid, sun-baked warmth to the classic gardenia heart.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s623', 'Gorgeous!', 'Michael Kors', 2021, 'Eau de Parfum', 'White Cosmos, Melon', 'Jasmine, Tuberose, Lily of the Valley, Gardenia', 'Smokewood, Cashmeran, Vetiver, Musk', 'A luminous white floral that embodies effortless glamour. Creamy florals meet smoky woods in a surprisingly modern twist on classic elegance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s624', 'Tiffany & Co Eau de Parfum', 'Tiffany & Co', 2017, 'Eau de Parfum', 'Mandarin, Pink Pepper, Lemon', 'Iris, Rose, Ylang-Ylang, Jasmine', 'Patchouli, Musk, Cashmeran, Cedar', 'An elegant iris fragrance as refined as the iconic blue box. Noble iris meets musky patchouli in a composition of understated luxury.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s625', 'Bottega Veneta Eau de Parfum', 'Bottega Veneta', 2011, 'Eau de Parfum', 'Pink Pepper, Bergamot', 'Jasmine Sambac, Leather, Lavender, Patchouli', 'Oakmoss, Vetiver, Leather', 'A sophisticated Italian leather chypre. Supple leather and oakmoss recall the artistry of Bottega Veneta''s woven leather goods. Refined and quietly luxurious.', NULL);


-- BATCH 18: Gucci (f066-f068)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s626', 'Bloom', 'Gucci', 2017, 'Eau de Parfum', 'Rangoon Creeper', 'Tuberose, Jasmine Bud', 'Orris, Sandalwood, Musk', 'A modern white floral that celebrates authenticity. Rare Rangoon creeper and tuberose create a rich, enveloping floral that feels alive and blooming on the skin.', 'https://fimgs.net/mdimg/perfume/375x500.42980.jpg');


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s627', 'Flora Gorgeous Gardenia', 'Gucci', 2021, 'Eau de Parfum', 'Pear Blossom, Red Berries', 'Gardenia, Jasmine', 'Brown Sugar, Patchouli, Musk', 'A joyful gardenia reinvention with a gourmand twist. The brown sugar base adds warmth and sweetness to the lush tropical gardenia heart.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s628', 'Guilty Pour Femme', 'Gucci', 2019, 'Eau de Parfum', 'Pink Pepper, Mandarin, Bergamot', 'Lilac, Rose, Geranium, Violet', 'Patchouli, Amber, Cedarwood', 'A bold and unapologetic floral chypre for the free spirit. Lilac and patchouli create a modern, gender-fluid femininity.', NULL);


-- BATCH 19: Paco Rabanne, Nina Ricci, Azzaro (f069-f072)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s629', 'Olympea', 'Paco Rabanne', 2015, 'Eau de Parfum', 'Green Mandarin, Water Jasmine', 'Ginger Lily, Salt', 'Cashmere Wood, Sandalwood, Vanilla, Amber', 'A salty and sensual aquatic floral inspired by a modern Cleopatra. Briny salt and ginger lily create a fresh yet deeply alluring composition.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s630', 'Fame', 'Paco Rabanne', 2022, 'Eau de Parfum', 'Mango', 'Jasmine Sambac, Incense', 'Sandalwood, Vanilla, Cedar, Cashmeran', 'A futuristic floral gourmand in a robot-goddess bottle. Juicy mango meets jasmine and incense in a bold, sweet-smoky composition.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s631', 'Nina', 'Nina Ricci', 2006, 'Eau de Toilette', 'Calabrian Lemon, Caipirinha Lime', 'Peony, Moonflower, Toffee Apple', 'Apple Tree Wood, Musk, Cedar, Delectone', 'A fairytale fragrance in an apple-shaped bottle. Toffee apple and peony create a youthful, whimsical sweetness that is pure fantasy.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s632', 'Mademoiselle', 'Azzaro', 2015, 'Eau de Toilette', 'Rose, Pink Pepper, Orange Blossom', 'Jasmine Sambac, Lily of the Valley', 'Musk, Cashmere Wood, Amber', 'A sparkling and cheerful floral for the modern Mademoiselle. Rose and orange blossom radiate effortless Parisian charm and joie de vivre.', NULL);


-- BATCH 20: Balenciaga, Celine, Diptyque, Byredo (f073-f076)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s633', 'Florabotanica', 'Balenciaga', 2012, 'Eau de Parfum', 'Mint, Carnation, Green Notes', 'Rose, Cannabis, Vetiver', 'Amber, Musk', 'A wild and subversive green floral. Mint and cannabis leaf challenge convention while carnation and rose ground the composition in bold femininity.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s634', 'Parade', 'Celine', 2019, 'Eau de Parfum', 'Bergamot, Mandarin', 'Iris, Jasmine, Narcissus', 'Musk, Amber, Sandalwood, Cedar', 'A refined and luminous iris from Hedi Slimane''s debut perfume collection. Understated Parisian elegance in a bottle, with impeccable balance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s635', 'Do Son', 'Diptyque', 2005, 'Eau de Toilette', 'Orange Blossom, Pink Pepper', 'Tuberose, Jasmine', 'Musk, Benzoin, Iris', 'Inspired by tuberose gardens in a Vietnamese bay. Creamy tuberose unfurls with watery freshness, capturing a distant memory of exotic gardens by the sea.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s636', 'Bal d''Afrique', 'Byredo', 2009, 'Eau de Parfum', 'Bergamot, Lemon, Neroli, African Marigold', 'Violet, Jasmine, Cyclamen', 'Vetiver, Amber, Musk, Black Amber, Moroccan Cedarwood', 'A tribute to Africa and the creative pulse of Paris. Neroli and violet paint a vivid portrait of two cultures dancing together in rhythm.', NULL);


-- BATCH 21: Frederic Malle, Juliette Has a Gun (f077-f080)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s637', 'Portrait of a Lady', 'Frederic Malle', 2010, 'Eau de Parfum', 'Blackcurrant, Raspberry, Cinnamon, Clove, Pink Pepper', 'Turkish Rose, Egyptian Jasmine', 'Patchouli, Sandalwood, Frankincense, Benzoin, Musk, Amber', 'A monumental rose-patchouli masterpiece by Dominique Ropion. Rich, complex, and deeply sensual, it paints an unforgettable olfactory portrait.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s638', 'Carnal Flower', 'Frederic Malle', 2005, 'Eau de Parfum', 'Melon, Bergamot, Eucalyptus', 'Tuberose, Ylang-Ylang, Jasmine, Orange Blossom', 'Musk, Coconut Milk', 'The definitive tuberose fragrance. Impossibly lush and carnal, this is tuberose in its most intoxicating, creamy, and narcotic glory.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s639', 'Not a Perfume', 'Juliette Has a Gun', 2010, 'Eau de Parfum', 'Ambroxan', 'Ambroxan', 'Ambroxan', 'A radical minimalist fragrance built on a single molecule: Cetalox (Ambroxan). Clean, warm, and skin-like, it adapts uniquely to each wearer.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s640', 'Moscow Mule', 'Juliette Has a Gun', 2017, 'Eau de Parfum', 'Ginger, Lime', 'Musk, Cucumber', 'Amber, Cedar, Vetiver', 'A sparkling cocktail-inspired fragrance. Fizzy ginger and lime recall the famous drink, while musk and amber add a sophisticated base.', NULL);


-- BATCH 22: Maison Margiela Replica (f081-f082)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s641', 'Bubble Bath', 'Maison Margiela', 2020, 'Eau de Toilette', 'Lavender, Pink Pepper, Bergamot', 'Rose Super Essence, Coconut Milk, Soap Bubbles', 'White Musk, Tonka Bean, Cedar', 'A comforting recreation of stepping into a warm bubble bath. Soapy, clean, and enveloping, with just enough warmth to feel like a cozy ritual.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s642', 'Lazy Sunday Morning', 'Maison Margiela', 2012, 'Eau de Toilette', 'Pear, Aldehyde, Lily of the Valley', 'Iris, Orange Blossom, Rose', 'White Musk, Ambroxan', 'The scent of crisp white sheets on a leisurely morning. Clean aldehydes and soft florals capture that blissful moment of waking up with nowhere to go.', NULL);


-- BATCH 23: Acqua di Parma, Penhaligon's, Atelier Cologne, Clean (f083-f086)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s643', 'Rosa Nobile', 'Acqua di Parma', 2014, 'Eau de Parfum', 'Bergamot, Mandarin, Black Pepper', 'Peony, Rose, Lily of the Valley, Violet', 'Musk, Ambrox, Cedar', 'An aristocratic Italian rose of timeless grace. Centifolia rose from Grasse is framed by Italian citrus in a composition of pure refinement.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s644', 'Halfeti', 'Penhaligon''s', 2015, 'Eau de Parfum', 'Grapefruit, Bergamot, Cardamom, Armoise', 'Rose, Jasmine, Lavender, Saffron, Nutmeg', 'Oud, Leather, Sandalwood, Amber, Tonka Bean, Cedar, Musk, Styrax', 'Named after a sunken Turkish village, this is a rich, spiced rose-oud of remarkable depth. Dark, opulent, and hauntingly beautiful.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s645', 'Orange Sanguine', 'Atelier Cologne', 2011, 'Cologne Absolue', 'Blood Orange, Mandarin Orange', 'Jasmine, Geranium', 'Tonka Bean, Sandalwood, Amber', 'A burst of freshly squeezed blood oranges on a Mediterranean terrace. Vivid citrus realism with a warm amber backbone that extends the sunshine.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s646', 'Skin', 'Clean Reserve', 2016, 'Eau de Parfum', 'Pink Grapefruit, Honeydew Melon', 'Violet Leaves, Jasmine', 'Musk, Amber, Blonde Woods, Sandalwood', 'A celebration of clean, warm skin. Sheer florals and light musk create the effect of freshly moisturized skin with a natural, barely-there beauty.', NULL);


-- BATCH 24: Tocca, Nest, Kayali, Philosophy (f087-f090)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s647', 'Florence', 'Tocca', 2007, 'Eau de Parfum', 'Apple, Pear, Bergamot, Grapefruit', 'Gardenia, Tuberose, Jasmine, Iris', 'Blonde Wood, Musk, White Amber', 'A refined Italian gardenia inspired by the Renaissance city. Elegant white flowers meet crisp fruit in a composition of timeless beauty and grace.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s648', 'Indigo', 'Nest New York', 2013, 'Eau de Parfum', 'Moroccan Tea, Bergamot, Cardamom', 'Fig, Jasmine, Lemon Tree Blossom', 'Cedar, Musk', 'A Moroccan-inspired sensory journey. Fig and Moroccan tea create an exotic, atmospheric fragrance that transports you to a distant bazaar.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s649', 'Vanilla 28', 'Kayali', 2018, 'Eau de Parfum', 'Mandarin, Gardenia', 'Vanilla Orchid, Jasmine Sambac', 'Brown Sugar, Musk, Tonka Bean, Amber', 'A warm and cozy vanilla gourmand with Middle Eastern influences. Brown sugar and vanilla orchid create a comforting, addictive sweetness.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s650', 'Amazing Grace', 'Philosophy', 1996, 'Eau de Toilette', 'Bergamot, Grapefruit, Mandarin', 'Muguet, Freesia, Rose', 'Musk, Cedar, Blonde Woods', 'A clean and graceful floral that embodies the beauty of simplicity. Soft muguet and musk create a gentle, universally flattering fragrance.', NULL);


-- BATCH 25: Vera Wang, Jessica Simpson, DKNY, Marc Jacobs (f091-f094)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s651', 'Princess', 'Vera Wang', 2006, 'Eau de Toilette', 'Mandarin, Apple, Water Lily, Apricot', 'Guava, Tiare Flower, Dark Chocolate, Tuberose', 'Amber, Vanilla, Musk, Wood', 'A playful and whimsical fragrance for the modern princess. Fruity and floral notes dance with a touch of dark chocolate for a youthful sparkle.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s652', 'Fancy', 'Jessica Simpson', 2008, 'Eau de Parfum', 'Pear, Apricot, Red Berries', 'Gardenia, Jasmine, Almond, Caramel', 'Sandalwood, Amber, Vanilla, Musk', 'A glamorous and sweet floral gourmand. Caramel and gardenia create a fun, indulgent fragrance with a warm amber embrace.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s653', 'Be Delicious', 'DKNY', 2004, 'Eau de Parfum', 'Green Apple, Cucumber, Grapefruit, Magnolia', 'Tuberose, Muguet, Rose, Violet, Jasmine', 'Sandalwood, Amber, White Woods, Musk', 'A fresh and crisp city fragrance in the iconic apple bottle. Green apple and cucumber capture the invigorating energy of New York City.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s654', 'Perfect', 'Marc Jacobs', 2020, 'Eau de Parfum', 'Rhubarb, Daffodil', 'Almond Milk, Jasmine', 'Cedar, Cashmeran, Musk, Amber', 'A celebration of individuality and self-love. Almond milk and daffodil create a comforting yet unique composition that encourages you to be perfectly you.', NULL);


-- BATCH 26: Versace, Mugler, Issey Miyake, Roberto Cavalli (f095-f100)
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s655', 'Yellow Diamond', 'Versace', 2011, 'Eau de Toilette', 'Lemon, Pear Sorbet, Bergamot, Neroli, Citron', 'Mimosa, Freesia, Orange Blossom, Water Lily, Nymphaea', 'Amber, Guaiac Wood, Musk', 'A sparkling and sunny floral that glows like a golden gemstone. Luminous citrus and mimosa radiate pure Mediterranean sunshine and elegance.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s656', 'Womanity', 'Mugler', 2010, 'Eau de Parfum', 'Fig Leaves, Caviar', 'Fig Tree, Coconut', 'Wood, Musk, Amber', 'A provocative and unconventional composition that juxtaposes sweet fig with salty caviar. Divisive and daring, it challenged the rules of feminine perfumery.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s657', 'L''Eau d''Issey', 'Issey Miyake', 1992, 'Eau de Toilette', 'Lotus, Freesia, Cyclamen, Rose Water, Calone', 'Peony, Lily, Carnation, Lily of the Valley', 'Tuberose, Osmanthus, Amber, Musk, Cedar, Sandalwood', 'A revolutionary aquatic floral that redefined freshness in women''s perfumery. Crystal-clear water and transparent florals create a scent of pure serenity.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s658', 'Paradiso', 'Roberto Cavalli', 2015, 'Eau de Parfum', 'Mandarin, Bergamot', 'Jasmine Sambac, Laurel', 'Cypress, Sandalwood, Pine, Amber', 'A Mediterranean escape to an Italian garden paradise. Jasmine and cypress evoke sun-drenched coastal landscapes and the scent of wild Mediterranean herbs.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s659', 'Flora Gorgeous Gardenia Eau de Toilette', 'Gucci', 2012, 'Eau de Toilette', 'Red Apple, Mandarin', 'Gardenia, Frangipani', 'Patchouli, Brown Sugar, Musk', 'The original gardenia-focused Flora flanker. Bright and cheerful with tropical frangipani and a warm patchouli finish.', NULL);


INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s660', 'La Vie Est Belle Intensement', 'Lancome', 2020, 'Eau de Parfum Intense', 'Raspberry, Pink Pepper', 'Iris, Rose, Orange Blossom, Jasmine', 'Praline, Vanilla, Patchouli, Benzoin, Tonka Bean, Sandalwood', 'A deeper and more intense version of the beloved original. Rich iris and praline are amplified with warm benzoin for an even more enveloping experience.', NULL);

