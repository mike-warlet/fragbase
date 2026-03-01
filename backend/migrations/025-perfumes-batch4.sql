-- Migration 025: Batch 4 - 100 Classic Designer Perfumes
-- Uses INSERT OR IGNORE to avoid duplicates with existing data
-- All real fragrances with accurate note pyramids
-- IDs: s761-s860

-- 1. Givenchy Gentleman Original
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s761', 'Gentleman (1974)', 'Givenchy', 1974, 'Eau de Toilette', 'Bergamot, Lemon, Mandarin, Tarragon', 'Rose, Jasmine, Cinnamon, Orris, Patchouli', 'Oakmoss, Vetiver, Tonka Bean, Amber, Leather, Cedar', 'The original Givenchy Gentleman, a bold honey-patchouli powerhouse that defined 1970s masculine elegance with its rich leather and oakmoss foundation.', NULL);

-- 2. Givenchy Xeryus Rouge
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s762', 'Xeryus Rouge', 'Givenchy', 1995, 'Eau de Toilette', 'Kumquat, Green Pepper, Tarragon', 'Red Cedar, Cyclamen, Geranium', 'Oakmoss, Musk, Amber, Woody Notes', 'A spicy-woody masculine with distinctive kumquat and red cedar creating a warm, assertive character that bridges classic and modern sensibilities.', NULL);

-- 3. Givenchy Gentleman Eau de Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s763', 'Gentleman Eau de Parfum', 'Givenchy', 2018, 'Eau de Parfum', 'Pepper, Lavender, Bergamot', 'Iris, Orange Blossom', 'Patchouli, Tonka Bean, Black Vanilla', 'A sophisticated iris-patchouli composition with a signature black vanilla accord that adds mysterious depth to the Gentleman line.', NULL);

-- 4. Givenchy Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s764', 'Pour Homme', 'Givenchy', 1981, 'Eau de Toilette', 'Mandarin, Bergamot, Aldehydes, Tarragon', 'Nutmeg, Orris, Ylang-Ylang, Geranium', 'Oakmoss, Sandalwood, Tonka Bean, Amber, Musk', 'A classic aromatic fougere with a refined aldehydic opening and warm oakmoss-amber base, representing timeless French masculine elegance.', NULL);

-- 5. Givenchy Dahlia Divin
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s765', 'Dahlia Divin', 'Givenchy', 2014, 'Eau de Parfum', 'Mirabelle Plum, Blood Orange, Jasmine', 'Rose, Jasmine Sambac, White Peach', 'Sandalwood, Patchouli, Vanilla, Vetiver, Musk', 'A couture fragrance inspired by Haute Couture draping, blending juicy mirabelle plum with golden jasmine and creamy sandalwood.', NULL);

-- 6. Balenciaga Paris
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s766', 'Paris', 'Balenciaga', 2010, 'Eau de Parfum', 'Violet Leaves, Green Notes', 'Violet, Lily of the Valley, Magnolia', 'Vetiver, Patchouli, Cedar, Musk', 'A modern Parisian violet fragrance that reinvented the house for a new era with its green floral character and earthy vetiver base.', NULL);

-- 7. Balenciaga B.
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s767', 'B. Balenciaga', 'Balenciaga', 2014, 'Eau de Parfum', 'Green Leaves, Lily of the Valley', 'Violet, Iris', 'Cashmere Wood, Cedar, Ambroxan', 'A sculpted green floral with a clean, mineral edge that captures the architectural spirit of the fashion house through violet and iris.', NULL);

-- 8. Balenciaga Cristobal Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s768', 'Cristobal Pour Homme', 'Balenciaga', 1999, 'Eau de Toilette', 'Bergamot, Mandarin, Coriander, Cardamom', 'Jasmine, Rose, Cedar, Pepper', 'Sandalwood, Musk, Amber, Vetiver, Tonka Bean', 'A refined oriental spicy masculine paying tribute to Cristobal Balenciaga with warm cardamom and luxurious sandalwood.', NULL);

-- 9. Calvin Klein Euphoria Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s769', 'Euphoria Men', 'Calvin Klein', 2006, 'Eau de Toilette', 'Ginger, Pepper, Raindrop Accord', 'Black Basil, Sage, Cedar', 'Amber, Patchouli, Suede, Brazilian Redwood', 'A dark, sensual masculine with an exotic raindrop accord and warm amber-suede base that channels modern seduction.', NULL);

-- 10. Calvin Klein Reveal Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s770', 'Reveal Men', 'Calvin Klein', 2015, 'Eau de Toilette', 'Raw Salt, Ginger, Pink Pepper', 'Vetiver, Orris', 'Suede, Sandalwood, Cashmere Wood, Musk', 'A raw, salt-tinged masculine that strips back to bare essentials with a mineral opening and warm suede-cashmere base.', NULL);

-- 11. Calvin Klein Eternity Flame for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s771', 'Eternity Flame for Men', 'Calvin Klein', 2019, 'Eau de Toilette', 'Grapefruit, Geranium, Pineapple', 'Lavender, Cypress, Cinnamon', 'Amber, Sandalwood, Musk', 'A warmer, spicier interpretation of the Eternity line with tropical pineapple and cinnamon igniting the classic lavender-amber structure.', NULL);

-- 12. Calvin Klein Contradiction for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s772', 'Contradiction for Men', 'Calvin Klein', 1998, 'Eau de Toilette', 'Lime, Sage, Eucalyptus', 'Nutmeg, Anise, Rose, Coriander', 'Sandalwood, Patchouli, Vetiver, Musk, Oakmoss', 'A herbal-aromatic masculine with contrasting fresh and woody elements that live up to its name, blending eucalyptus with warm sandalwood.', NULL);

-- 13. Hugo Boss Bottled
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s773', 'Boss Bottled Eau de Parfum', 'Hugo Boss', 2020, 'Eau de Parfum', 'Apple, Mandarin, Bergamot', 'Cardamom, Cinnamon, Clove, Geranium', 'Chestnut, Vetiver, Musk, Sandalwood', 'A more intense and woody reformulation of the iconic Bottled with a warm chestnut accord adding autumnal richness.', NULL);

-- 14. Hugo Boss Bottled Night
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s774', 'Boss Bottled Night', 'Hugo Boss', 2010, 'Eau de Toilette', 'Lavender, Birch Leaf, Cardamom', 'African Violet, Musk, Oud', 'Sandalwood, Woody Notes, Louro Amarelo', 'A nocturnal Boss Bottled with birch and violet creating a darker, more seductive character for evening occasions.', NULL);

-- 15. Hugo Boss Alive
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s775', 'Boss Alive', 'Hugo Boss', 2020, 'Eau de Parfum', 'Apple, Plum, Redcurrant', 'Jasmine, Thyme', 'Sandalwood, Vanilla, Cashmeran, Olive Wood', 'A vibrant feminine with a thyme twist that adds unexpected herbal freshness to the fruity floral structure.', NULL);

-- 16. Hugo Boss The Scent for Her
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s776', 'Boss The Scent for Her', 'Hugo Boss', 2016, 'Eau de Parfum', 'Peach, Freesia', 'Osmanthus, Roasted Cocoa', 'Suede, Musk, Sandalwood', 'A sensual feminine counterpart built on peach and osmanthus with a warm cocoa-suede base that mirrors the masculine original.', NULL);

-- 17. Prada Amber Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s777', 'Amber Pour Homme', 'Prada', 2006, 'Eau de Toilette', 'Bergamot, Cardamom, Mandarin, Neroli', 'Orange Blossom, Myrrh, Saffron, Vetiver', 'Leather, Patchouli, Sandalwood, Tonka Bean, Vanilla', 'A sophisticated saffron-leather composition that epitomizes Italian luxury with its blend of oriental warmth and clean modernity.', NULL);

-- 18. Prada Amber Pour Homme Intense
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s778', 'Amber Pour Homme Intense', 'Prada', 2011, 'Eau de Parfum', 'Bergamot, Myrrh, Neroli', 'Saffron, Oud, Leather', 'Amber, Tonka Bean, Patchouli, Vanilla', 'A darker, more resinous interpretation with oud and saffron amplifying the original amber leather formula into something more nocturnal.', NULL);

-- 19. Prada Luna Rossa
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s779', 'Luna Rossa', 'Prada', 2012, 'Eau de Toilette', 'Lavender, Bitter Orange, Artemisia', 'Clary Sage, Spearmint', 'Ambroxan, Musk', 'A clean, aromatic fougere inspired by sailing with Prada''s Luna Rossa team, blending fresh lavender and spearmint with ambroxan.', NULL);

-- 20. Burberry Touch for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s780', 'Touch for Men', 'Burberry', 2000, 'Eau de Toilette', 'Mandarin, Violet Leaf, Artemisia', 'Nutmeg, White Pepper, Cedar', 'Vetiver, Tonka Bean, White Musk', 'A tactile woody aromatic with an unusual violet leaf accord and warm tonka-vetiver base evoking the sensation of touch.', NULL);

-- 21. Burberry Brit for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s781', 'Brit for Men', 'Burberry', 2004, 'Eau de Toilette', 'Green Mandarin, Bergamot, Ginger, Cardamom', 'Cedarwood, Wild Rose, Nutmeg', 'Tonka Bean, Grey Musk, Oriental Woody Notes', 'A quintessentially British masculine with ginger warmth and cedarwood grounding, embodying relaxed London style.', NULL);

-- 22. Burberry Weekend for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s782', 'Weekend for Men', 'Burberry', 1997, 'Eau de Toilette', 'Grapefruit, Melon, Pineapple, Lemon', 'Sandalwood, Birch, Ivy, Oakmoss', 'Amber, Musk, Honey', 'A fresh, green-fruity weekend scent with a distinctive ivy note and sweet honey base capturing casual British countryside ease.', NULL);

-- 23. Burberry for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s783', 'Burberry for Men', 'Burberry', 1995, 'Eau de Toilette', 'Bergamot, Lavender, Thyme, Mint', 'Cedarwood, Sandalwood, Jasmine, Oakmoss', 'Amber, Musk, Vanilla', 'A classic British aromatic fougere with lavender, thyme and cedarwood creating a well-mannered, dependable masculine.', NULL);

-- 24. Dolce & Gabbana Light Blue Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s784', 'Light Blue Pour Homme', 'Dolce & Gabbana', 2007, 'Eau de Toilette', 'Sicilian Mandarin, Frozen Grapefruit, Juniper', 'Rosemary, Brazilian Rosewood, Pepper', 'Musk, Oakmoss, Incense', 'A bright Mediterranean masculine pairing citrus freshness with aromatic rosemary and a dry incense finish, evoking sun-soaked Italian coastlines.', NULL);

-- 25. Dolce & Gabbana Light Blue Eau Intense Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s785', 'Light Blue Eau Intense Pour Homme', 'Dolce & Gabbana', 2017, 'Eau de Parfum', 'Grapefruit, Mandarin, Juniper', 'Sea Water, Amber', 'Musk, Oakmoss', 'An intensified aquatic version with a marine accord and deeper amber giving the beloved Light Blue more depth and longevity.', NULL);

-- 26. Dolce & Gabbana The One for Men EDT
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s786', 'The One for Men', 'Dolce & Gabbana', 2008, 'Eau de Toilette', 'Grapefruit, Coriander, Basil', 'Ginger, Cardamom, Orange Blossom, Cedar', 'Amber, Labdanum, Tobacco, Musk', 'The original EDT version with a lighter tobacco-amber character that works impeccably as a refined everyday signature.', NULL);

-- 27. Dolce & Gabbana Light Blue Italian Love
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s787', 'Light Blue Italian Love', 'Dolce & Gabbana', 2022, 'Eau de Toilette', 'Green Apple, Blueberry', 'Jasmine, White Rose', 'Musk, Cedar, Amber', 'A fruity romantic flanker celebrating Italian love with sweet blueberry and crisp green apple over a musky base.', NULL);

-- 28. Valentino Donna
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s788', 'Valentino Donna', 'Valentino', 2015, 'Eau de Parfum', 'Bergamot, Pink Pepper, Iris', 'Bulgarian Rose, Leather', 'Patchouli, Vanilla, Musk', 'An iris-leather composition that channels Roman couture elegance with powdery iris and sophisticated Italian leather.', NULL);

-- 29. Valentino Born in Roma Donna Intense
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s789', 'Donna Born in Roma Intense', 'Valentino', 2022, 'Eau de Parfum', 'Pink Pepper, Bergamot', 'Jasmine Grandiflorum, Vanilla Bourbon, Ylang-Ylang', 'Benzoin, Sandalwood, Musk, Patchouli', 'A richer, more intoxicating version of the original with ylang-ylang adding exotic depth to the jasmine-vanilla accord.', NULL);

-- 30. Valentino Uomo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s790', 'Valentino Uomo', 'Valentino', 2014, 'Eau de Toilette', 'Bergamot, Myrtle', 'Coffee, Gianduja Cream', 'Cedar, Leather', 'An Italian coffee-leather masculine inspired by Roman piazzas, with a unique gianduja chocolate-hazelnut cream note at its heart.', NULL);

-- 31. Carolina Herrera 212
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s791', '212', 'Carolina Herrera', 1997, 'Eau de Toilette', 'Green Notes, Bergamot, Mandarin, Camellia Petals', 'Gardenia, White Lily, Rose, Jasmine', 'Sandalwood, White Musk, Incense, Woodsy Notes', 'The original 212, a fresh floral musk capturing the energy of New York City''s area code with sparkling green notes and white flowers.', NULL);

-- 32. Carolina Herrera 212 Sexy
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s792', '212 Sexy', 'Carolina Herrera', 2004, 'Eau de Parfum', 'Pink Pepper, Rose, Bergamot, Mandarin', 'Geranium, Gardenia, Camellia, Cotton Flower', 'Musk, Sandalwood, Vanilla, Cashmeran', 'A sensual and warm floral musk with cotton flower and vanilla adding soft, inviting sweetness to the 212 family.', NULL);

-- 33. Carolina Herrera 212 Men NYC
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s793', '212 NYC Men', 'Carolina Herrera', 1999, 'Eau de Toilette', 'Green Notes, Grapefruit, Lavender, Spices', 'Gardenia, Ginger, Green Pepper, Sage', 'Sandalwood, Musk, Guaiac Wood, Labdanum, Incense', 'A magnetic urban masculine embodying New York nightlife with green spice and incense-kissed sandalwood.', NULL);

-- 34. Carolina Herrera Bad Boy Le Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s794', 'Bad Boy Le Parfum', 'Carolina Herrera', 2022, 'Eau de Parfum', 'Green Cardamom, Black and White Pepper', 'Sage, Iris', 'Cacao, Tonka Bean, Benzoin, Amberwood', 'A darker, more intense evolution of Bad Boy with cacao and iris creating a richer, more sophisticated lightning bolt.', NULL);

-- 35. Narciso Rodriguez For Him Bleu Noir Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s795', 'For Him Bleu Noir Parfum', 'Narciso Rodriguez', 2022, 'Parfum', 'Cardamom, Lavender, Bergamot', 'Musk, Ebony Wood', 'Amber, Vetiver, Cedar', 'The parfum concentration of the iconic Bleu Noir, deepening the musk signature with rich ebony wood and smoky amber.', NULL);

-- 36. Narciso Rodriguez For Her Musc Noir Rose
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s796', 'For Her Musc Noir Rose', 'Narciso Rodriguez', 2022, 'Eau de Parfum', 'Pink Pepper, Plum', 'Rose, Musk, Geranium', 'Cashmeran, Patchouli, Cedarwood, Amber', 'A rose-entwined musk noir with pink pepper and plum adding feminine sensuality to the signature musc foundation.', NULL);

-- 37. Narciso Rodriguez Narciso Eau de Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s797', 'Narciso', 'Narciso Rodriguez', 2014, 'Eau de Parfum', 'Rose, Gardenia', 'Musk, Bulgarian Rose', 'Vetiver, Cedarwood, White Amber', 'A musky floral built around a powdery gardenia-musk accord with white amber and cedar lending a creamy, enveloping warmth.', NULL);

-- 38. Dolce & Gabbana Intenso
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s798', 'Pour Homme Intenso', 'Dolce & Gabbana', 2014, 'Eau de Parfum', 'Basil, Aquatic Accord, Geranium, Lavender', 'Tobacco, Hay, Labdanum', 'Sandalwood, Leather, Tonka Bean, Cashmeran', 'A warm, haylike tobacco masculine with aquatic freshness and smooth sandalwood-leather creating a contemplative, natural character.', NULL);

-- 39. Lacoste L.12.12 Blanc
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s799', 'L.12.12 Blanc', 'Lacoste', 2011, 'Eau de Toilette', 'Grapefruit, Rosemary, Cardamom', 'Tuberose, Ylang-Ylang, Lily', 'Cedar, Suede, Leather', 'A clean, crisp masculine inspired by the iconic white Lacoste polo shirt, with fresh citrus and subtle suede evoking laundered elegance.', NULL);

-- 40. Lacoste Essential
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s800', 'Essential', 'Lacoste', 2005, 'Eau de Toilette', 'Mandarin, Cassia, Tomato Leaf', 'Rose, Black Pepper, Cardamom', 'Sandalwood, Patchouli, Vanilla', 'A distinctive green-fresh masculine with an unusual tomato leaf note that creates an organic, garden-fresh character.', NULL);

-- 41. Dunhill Icon
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s801', 'Icon', 'Dunhill', 2015, 'Eau de Parfum', 'Neroli, Bergamot, Black Pepper, Cardamom', 'Sage, Lavender, Iris', 'Vetiver, Agarwood, Leather, Sandalwood', 'A British luxury masculine with refined neroli and sage leading to a rich foundation of oud and leather befitting the Dunhill heritage.', NULL);

-- 42. Dunhill Desire Red
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s802', 'Desire Red', 'Dunhill', 2000, 'Eau de Toilette', 'Bergamot, Apple, Green Leaf, Pink Pepper', 'Rose, Labdanum, Tonka Bean', 'Vanilla, Musk, Amber, Sandalwood', 'A warm, red-hued masculine with apple sweetness and rosy spice creating an accessible yet distinctive scent.', NULL);

-- 43. Issey Miyake L''Eau d''Issey Pour Homme Eau Fraiche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s803', 'L''Eau d''Issey Pour Homme Eau Fraiche', 'Issey Miyake', 2016, 'Eau de Toilette', 'Yuzu, Grapefruit, Bergamot', 'Ginger, Cardamom, Cypress', 'Sandalwood, Musk, Amber, Incense', 'A fresher, more effervescent take on the original with bright yuzu and zesty grapefruit creating a sparkling, energetic character.', NULL);

-- 44. Issey Miyake L''Eau d''Issey Pure
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s804', 'L''Eau d''Issey Pure', 'Issey Miyake', 2016, 'Eau de Parfum', 'Rose, Lily, Sea Salt', 'Jasmine, Orange Blossom', 'Cashmere Wood, Ambrox, Musk', 'A modern, minimalist reinvention of the feminine L''Eau d''Issey with sea salt adding an oceanic shimmer to transparent florals.', NULL);

-- 45. Dolce & Gabbana The One Gold
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s805', 'The One Gold', 'Dolce & Gabbana', 2021, 'Eau de Parfum', 'Plum, Orange Blossom, Grapefruit', 'Coffee, Cardamom, Rose', 'Amber, Tonka Bean, Tobacco, Vetiver', 'A golden, richer rendition with plum and coffee adding luxurious depth to the beloved tobacco-amber DNA of The One.', NULL);

-- 46. Carolina Herrera CH
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s806', 'CH Eau de Parfum Sublime', 'Carolina Herrera', 2017, 'Eau de Parfum', 'Bitter Orange, Bergamot, Pink Pepper', 'Rose, Jasmine, Iris', 'Tonka Bean, Vanilla, Sandalwood, Musk', 'A sophisticated floral oriental with bitter orange brightness and a warm tonka-vanilla base that elevates the CH line to sublime heights.', NULL);

-- 47. Roberto Cavalli Uomo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s807', 'Uomo', 'Roberto Cavalli', 2016, 'Eau de Toilette', 'Mandarin, Ginger, Cardamom', 'Cinnamon, Iris, Violet Leaf', 'Sandalwood, Tonka Bean, Benzoin, Musk', 'A suave Italian masculine with warm cinnamon-iris and creamy sandalwood capturing Roberto Cavalli''s glamorous spirit.', NULL);

-- 48. Roberto Cavalli Just Cavalli
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s808', 'Just Cavalli', 'Roberto Cavalli', 2013, 'Eau de Toilette', 'Mandarin, Cardamom, Star Anise', 'Violet, Geranium, Musk', 'Patchouli, Tonka Bean, Cedarwood', 'A youthful, modern masculine with star anise adding distinctive sweetness to the violet-patchouli core.', NULL);

-- 49. Guerlain Habit Rouge
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s809', 'Habit Rouge', 'Guerlain', 1965, 'Eau de Toilette', 'Lemon, Bergamot, Basil, Orange', 'Rose, Carnation, Cinnamon, Patchouli, Sandalwood', 'Vanilla, Amber, Benzoin, Leather, Opoponax', 'The first oriental fragrance designed for men, a groundbreaking Guerlain classic that blends citrus with warm vanilla and leather.', NULL);

-- 50. Guerlain Shalimar
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s810', 'Shalimar', 'Guerlain', 1925, 'Eau de Parfum', 'Bergamot, Lemon, Mandarin', 'Jasmine, Rose, May Rose, Iris, Opoponax', 'Vanilla, Tonka Bean, Benzoin, Sandalwood, Opoponax, Musk', 'The legendary oriental that inspired a century of perfumery, named after the Gardens of Shalimar with its revolutionary vanilla-tonka base.', NULL);

-- 51. Guerlain La Petite Robe Noire
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s811', 'La Petite Robe Noire', 'Guerlain', 2012, 'Eau de Parfum', 'Bergamot, Cherry, Almond', 'Rose, Tea, Licorice', 'Tonka Bean, Vanilla, Anise, Patchouli', 'A playful gourmand floral inspired by the little black dress, with cherry-almond sweetness and a sophisticated tea-rose heart.', NULL);

-- 52. Guerlain Mon Guerlain Intense
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s812', 'Mon Guerlain Intense', 'Guerlain', 2019, 'Eau de Parfum', 'Bergamot, Mandarin', 'Jasmine Sambac, Rose', 'Vanilla, Benzoin, Sandalwood, Iris', 'A richer, more resinous Mon Guerlain with deeper benzoin and sandalwood amplifying the beloved lavender-vanilla DNA.', NULL);

-- 53. Lancome La Nuit Tresor
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s813', 'La Nuit Tresor', 'Lancome', 2015, 'Eau de Parfum', 'Litchi, Mandarin, Rose', 'Jasmine, Orchid, Pink Pepper', 'Patchouli, Papyrus, Vanilla, Caramel', 'A romantic oriental with lychee and orchid swirling through caramel-kissed vanilla, designed as a nocturnal love declaration.', NULL);

-- 54. Lancome Idole
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s814', 'Idole', 'Lancome', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Pear', 'Rose Centifolia, Jasmine Grandiflorum', 'White Musk, Vanilla, Cedar, Cashmere Wood, Patchouli', 'A clean, modern rose-jasmine designed for a new generation of bold women, in the thinnest fragrance bottle ever created.', NULL);

-- 55. Lancome Tresor
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s815', 'Tresor', 'Lancome', 1990, 'Eau de Parfum', 'Rose, Lilac Blossom, Peach, Pineapple', 'Iris, Rose, Jasmine, Lily of the Valley, Heliotrope', 'Sandalwood, Amber, Vanilla, Musk, Apricot', 'A timeless romantic oriental rose that became one of the best-selling perfumes of all time with its warm amber-vanilla embrace.', NULL);

-- 56. Lancome La Vie Est Belle Intensement
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s816', 'La Vie Est Belle Intensement', 'Lancome', 2020, 'Eau de Parfum', 'Raspberry, Red Berry', 'Iris, Jasmine, Orange Blossom', 'Patchouli, Vanilla, Sandalwood, Benzoin', 'A deeper, more intense version with red berries and orange blossom adding romantic richness to the classic iris-vanilla signature.', NULL);

-- 57. Chanel Chance Eau de Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s817', 'Chance Eau de Parfum', 'Chanel', 2002, 'Eau de Parfum', 'Pink Pepper, Pineapple, Hyacinth', 'Jasmine, Iris, Orange Blossom', 'Amber, Patchouli, Musk, Vanilla, Vetiver', 'The original Chance in its EDP concentration, a round and vibrant floral-spicy composition built on perpetual motion and unexpected encounters.', NULL);

-- 58. Chanel Cristalle Eau Verte
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s818', 'Cristalle Eau Verte', 'Chanel', 2009, 'Eau de Parfum', 'Grapefruit, Lemon, Mandarin', 'Jasmine, Galbanum, Green Notes', 'Musk, Vetiver, Amber', 'A green-fresh chypre that captures morning dew on leaves with bright citrus and galbanum creating a crystalline clarity.', NULL);

-- 59. Chanel Egoiste
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s819', 'Egoiste', 'Chanel', 1990, 'Eau de Toilette', 'Coriander, Rose, Mandarin', 'Rose, Cinnamon, Sandalwood', 'Vanilla, Amber, Vetiver, Opoponax', 'A bold oriental-woody rose with sandalwood and vanilla creating a warm, self-assured character for the unapologetic egoist.', NULL);

-- 60. Chanel Les Exclusifs Coromandel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s820', 'Coromandel', 'Chanel', 2007, 'Eau de Parfum', 'Bergamot, Orange, Mandarin', 'Jasmine, Rose', 'Patchouli, Benzoin, Frankincense, White Musk', 'A luxurious patchouli-benzoin from the Les Exclusifs collection inspired by Coco Chanel''s beloved Coromandel screens.', NULL);

-- 61. Dior Sauvage Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s821', 'Sauvage Parfum', 'Dior', 2019, 'Parfum', 'Bergamot, Nutmeg', 'Lavender, Sichuan Pepper', 'Vanilla, Ambroxan, Sandalwood', 'The parfum concentration of Sauvage adds a smooth vanilla accord and Oriental depth to the signature bergamot-ambroxan formula.', NULL);

-- 62. Dior Miss Dior Absolutely Blooming
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s822', 'Miss Dior Absolutely Blooming', 'Dior', 2016, 'Eau de Parfum', 'Red Berries, Pomegranate, Blackcurrant', 'Damask Rose, Peony, Grasse Rose', 'White Musk, Cashmere Musk', 'A radiant berry-rose composition bursting with fruity exuberance and blooming peony, like a spring garden in full flower.', NULL);

-- 63. Dior J''adore Infinissime
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s823', 'J''adore Infinissime', 'Dior', 2020, 'Eau de Parfum', 'Centifolia Rose, Grasse Rose', 'Tuberose, Jasmine Sambac, Jasmine Grandiflorum', 'Sandalwood, Benzoin, Virginia Cedar', 'An intensely floral J''adore variation with an abundant Grasse rose and tuberose bouquet over a warm sandalwood-benzoin base.', NULL);

-- 64. Tom Ford Tobacco Vanille
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s824', 'Tobacco Vanille', 'Tom Ford', 2007, 'Eau de Parfum', 'Tobacco Leaf, Spicy Notes, Ginger', 'Tobacco Blossom, Vanilla, Cacao, Tonka Bean', 'Dried Fruits, Woody Notes, Suede', 'An opulent tobacco-vanilla masterpiece that warms like a vintage gentlemen''s club, rich with pipe tobacco and creamy vanilla.', NULL);

-- 65. Versace Man Eau Fraiche
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s825', 'Man Eau Fraiche', 'Versace', 2006, 'Eau de Toilette', 'White Lemon, Rosewood, Carambola', 'Tarragon, Cedar, Sage', 'Sycamore Wood, Musk, Amber', 'A fresh, light masculine with the unusual starfruit note adding tropical brightness to the woody-herbal framework.', NULL);

-- 66. Versace Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s826', 'Pour Homme', 'Versace', 2008, 'Eau de Toilette', 'Citruses, Neroli, Bergamot, Citron', 'Hyacinth, Cedar, Clary Sage, Blue Wisteria, Geranium', 'Musk, Amber, Sycamore Wood', 'A refined Mediterranean masculine with aromatic herbs and wisteria creating a relaxed yet sophisticated character.', NULL);

-- 67. Giorgio Armani Code
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s827', 'Armani Code', 'Giorgio Armani', 2004, 'Eau de Toilette', 'Bergamot, Lemon', 'Olive Blossom, Star Anise', 'Guaiac Wood, Tonka Bean, Leather', 'A sleek, modern seduction code with star anise and olive blossom creating a distinctive gourmand-woody character.', NULL);

-- 68. Giorgio Armani Code Profumo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s828', 'Armani Code Profumo', 'Giorgio Armani', 2016, 'Parfum', 'Green Apple, Cardamom, Bergamot', 'Orange Blossom, Lavender, Nutmeg', 'Tonka Bean, Amber, Leather', 'The richest Code concentration with green apple and amber-leather creating a magnetic, deeply seductive aura.', NULL);

-- 69. Giorgio Armani Acqua di Gio Profumo
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s829', 'Acqua di Gio Profumo', 'Giorgio Armani', 2015, 'Eau de Parfum', 'Bergamot, Aquatic Notes, Geranium', 'Rosemary, Sage, Amber', 'Patchouli, Incense', 'A darker, more intense evolution of the original Acqua di Gio with incense and patchouli adding nocturnal depth to the aquatic signature.', NULL);

-- 70. Thierry Mugler A*Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s830', 'A*Men', 'Mugler', 1996, 'Eau de Toilette', 'Lavender, Mint, Bergamot', 'Coffee, Tar, Caramel', 'Patchouli, Chocolate, Vanilla, Musk, Tonka Bean', 'The original Angel for men, a groundbreaking gourmand with a tar-coffee accord and rich patchouli that divided opinions and changed masculine perfumery.', NULL);

-- 71. Thierry Mugler Angel
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s831', 'Angel', 'Mugler', 1992, 'Eau de Parfum', 'Cotton Candy, Coconut, Mandarin, Jasmine, Bergamot', 'Red Berries, Honey, Apricot, Blackberry', 'Patchouli, Dark Chocolate, Vanilla, Caramel, Tonka Bean', 'The revolutionary gourmand that invented the category, blending cotton candy and patchouli in a startling combination that became one of the world''s top-selling perfumes.', NULL);

-- 72. Paco Rabanne One Million
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s832', 'One Million', 'Paco Rabanne', 2008, 'Eau de Toilette', 'Grapefruit, Blood Mandarin, Peppermint', 'Rose Absolute, Cinnamon, Spice Notes', 'Leather, Amber, Woody Notes, Indonesian Patchouli, White Musk', 'A flamboyant spicy-leather scent in a gold bar bottle that became a global blockbuster with its cinnamon-leather signature.', NULL);

-- 73. Paco Rabanne One Million Lucky
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s833', 'One Million Lucky', 'Paco Rabanne', 2018, 'Eau de Toilette', 'Grapefruit, Ozonic Accord, Plum', 'Hazelnut, Honey', 'Cedar, Amber, Patchouli', 'A sweet, nutty flanker with honey and hazelnut creating a gourmand twist on the One Million franchise.', NULL);

-- 74. Paco Rabanne Invictus Legend
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s834', 'Invictus Legend', 'Paco Rabanne', 2019, 'Eau de Parfum', 'Sea Salt, Grapefruit', 'Geranium, Bay Leaf, Red Pepper', 'Amber, Guaiac Wood, Benzoin, Musk', 'A marine-woody legend with sea salt and bay leaf creating an epic, mythological character in the Invictus universe.', NULL);

-- 75. Davidoff Cool Water
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s835', 'Cool Water', 'Davidoff', 1988, 'Eau de Toilette', 'Sea Water, Lavender, Mint, Green Notes, Calone, Rosemary', 'Neroli, Jasmine, Geranium, Sandalwood', 'Musk, Amber, Tobacco, Cedar, Oakmoss', 'The original cool water that defined the aquatic genre in the late 1980s, inspired by the sea with its pioneering use of calone.', NULL);

-- 76. Gucci Guilty Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s836', 'Guilty Pour Homme', 'Gucci', 2011, 'Eau de Toilette', 'Lavender, Lemon, Bergamot, Orange Blossom', 'Orange Blossom, Neroli', 'Cedar, Patchouli, Amber', 'A bold aromatic with orange blossom at its heart creating a distinctive floral-woody masculine that embodies guilt-free pleasure.', NULL);

-- 77. Gucci Guilty Absolute
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s837', 'Guilty Absolute', 'Gucci', 2017, 'Eau de Parfum', 'Leather, Nubuck', 'Goldenwood, Cypress', 'Vetiver, Patchouli, Woody Notes', 'A raw, unfiltered leather fragrance stripped to its essence with nubuck and goldenwood creating an authentically masculine, untamed character.', NULL);

-- 78. Gucci Pour Homme II
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s838', 'Pour Homme II', 'Gucci', 2007, 'Eau de Toilette', 'Bergamot, Violet Leaf, Black Pepper, Green Tea', 'Cinnamon, Tobacco, African Orange Flower', 'Amber, Musk, Oud', 'A smoky tea-tobacco fragrance discontinued and coveted, with violet leaf and cinnamon creating an unmistakable, elegantly masculine signature.', NULL);

-- 79. Gucci Bloom
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s839', 'Bloom', 'Gucci', 2017, 'Eau de Parfum', 'Natural Tuberose, Jasmine Bud Extract', 'Rangoon Creeper', 'Sandalwood, Musk, Orris', 'A white floral that smells of a thriving garden of flowers with rangoon creeper adding an unusual powdery-musky accord to tuberose and jasmine.', NULL);

-- 80. Gucci Flora Gorgeous Gardenia
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s840', 'Flora Gorgeous Gardenia', 'Gucci', 2021, 'Eau de Parfum', 'Pear Blossom, Red Berries', 'Gardenia, Jasmine Grandiflorum', 'Brown Sugar, Patchouli, Musk', 'A dewy, sweet gardenia with pear blossom innocence and brown sugar warmth creating a youthful, optimistic floral gourmand.', NULL);

-- 81. Hermes Terre d''Hermes
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s841', 'Terre d''Hermes', 'Hermes', 2006, 'Eau de Toilette', 'Grapefruit, Orange', 'Pepper, Geranium, Patchouli', 'Benzoin, Cedar, Vetiver', 'A woody-mineral masculine mapping the connections between earth and sky, with a distinctive flint note and grapefruit-vetiver signature by Jean-Claude Ellena.', NULL);

-- 82. Hermes Terre d''Hermes Parfum
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s842', 'Terre d''Hermes Parfum', 'Hermes', 2009, 'Parfum', 'Orange, Grapefruit', 'Flint, Pepper, Geranium', 'Benzoin, Oakmoss, Patchouli, Cedar', 'The parfum concentration adds deeper benzoin and oakmoss richness to the mineral signature, creating a more contemplative, earthy meditation.', NULL);

-- 83. Hermes Un Jardin Sur Le Nil
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s843', 'Un Jardin Sur Le Nil', 'Hermes', 2005, 'Eau de Toilette', 'Green Mango, Lotus, Grapefruit', 'Sycamore, Peony, Orange Blossom', 'Incense, Iris, Musk', 'A stroll through a garden on the Nile with green mango and lotus creating a lush, aquatic freshness that evokes Egypt''s fertile riverbanks.', NULL);

-- 84. Hermes Eau d''Orange Verte
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s844', 'Eau d''Orange Verte', 'Hermes', 1979, 'Eau de Cologne', 'Orange, Lemon, Mandarin, Bergamot', 'Mint, Blackcurrant, Leafy Green Notes', 'Oakmoss, Patchouli, Vetiver', 'A legendary hesperidia cologne with a sharp green orange accord that has been the standard-bearer for refined citrus fragrances for decades.', NULL);

-- 85. Yves Saint Laurent Kouros
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s845', 'Kouros', 'Yves Saint Laurent', 1981, 'Eau de Toilette', 'Aldehydes, Artemisia, Coriander, Clary Sage, Bergamot', 'Carnation, Jasmine, Cinnamon, Geranium, Patchouli', 'Civet, Tonka Bean, Incense, Leather, Musk, Oakmoss, Honey, Amber, Vanilla', 'A legendary fougere-animalic powerhouse that embodies pure Olympian masculinity with honey, civet and incense in bold proportions.', NULL);

-- 86. Yves Saint Laurent Opium Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s846', 'Opium Pour Homme', 'Yves Saint Laurent', 1995, 'Eau de Toilette', 'Star Anise, Mandarin, Bergamot, Pepper, Basil', 'Galanga, Lily of the Valley, Carnation', 'Cedar, Vanilla, Amber, Tonka Bean, Musk', 'A sophisticated spicy oriental for men with star anise and galanga creating an exotic warmth tempered by smooth vanilla-amber.', NULL);

-- 87. Yves Saint Laurent La Nuit de L''Homme Bleu Electrique
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s847', 'La Nuit de L''Homme Bleu Electrique', 'Yves Saint Laurent', 2021, 'Eau de Toilette', 'Cardamom, Bergamot, Geranium', 'Ginger, Sage, Lavender', 'Cedar, Amber, Musk, Elemi', 'An electrifying reinvention of La Nuit with ginger and sage adding sparkling, vibrant energy to the beloved cardamom-amber framework.', NULL);

-- 88. Yves Saint Laurent Libre
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s848', 'Libre', 'Yves Saint Laurent', 2019, 'Eau de Parfum', 'Mandarin Essence, Lavender, Black Currant', 'Orange Blossom, Jasmine Sambac', 'Madagascar Vanilla, Cedar, Ambergris, Musk', 'A bold feminine lavender-vanilla that challenges convention by pairing traditionally masculine lavender with warm orange blossom and vanilla.', NULL);

-- 89. Yves Saint Laurent Black Opium
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s849', 'Black Opium', 'Yves Saint Laurent', 2014, 'Eau de Parfum', 'Pink Pepper, Orange Blossom, Pear', 'Coffee, Jasmine, Bitter Almond, Licorice', 'Vanilla, Patchouli, Cedar, Cashmere Wood', 'An addictive coffee-vanilla feminine that became a modern icon with its shot of black coffee and white flowers creating rock-and-roll glamour.', NULL);

-- 90. Jean Paul Gaultier Le Male
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s850', 'Le Male', 'Jean Paul Gaultier', 1995, 'Eau de Toilette', 'Mint, Lavender, Bergamot, Cardamom, Artemisia', 'Orange Blossom, Cumin, Cinnamon', 'Vanilla, Tonka Bean, Amber, Sandalwood, Cedar', 'The iconic masculine in the sailor-torso bottle, blending fresh mint-lavender with warm vanilla-tonka in a formula that redefined masculine sweetness.', NULL);

-- 91. Jean Paul Gaultier Scandal Pour Homme
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s851', 'Scandal Pour Homme', 'Jean Paul Gaultier', 2021, 'Eau de Toilette', 'Lemon, Mandarin, Green Leaves', 'Caramel, Iris, Speculoos', 'Vetiver, Tonka Bean, Woody Notes', 'A sweet, caramel-forward masculine with a speculoos biscuit accord creating an irresistible, gourmand character.', NULL);

-- 92. Azzaro Wanted
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s852', 'Wanted', 'Azzaro', 2016, 'Eau de Toilette', 'Lemon, Ginger', 'Cardamom, Juniper, Star Anise', 'Tonka Bean, Vetiver, Tobacco Leaves', 'A warm, spicy masculine inspired by the American dream with ginger and cardamom creating bold optimism over smooth vetiver-tobacco.', NULL);

-- 93. Azzaro Chrome
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s853', 'Chrome', 'Azzaro', 1996, 'Eau de Toilette', 'Lemon, Bergamot, Neroli, Rosemary, Pineapple', 'Cyclamen, Jasmine, Oakmoss, Coriander', 'Tonka Bean, Cardamom, Musk, Sandalwood, Brazilian Rosewood, Cedar', 'A fresh, clean aromatic that evokes the father-son bond with its lemony, mossy character and subtle woods.', NULL);

-- 94. Ralph Lauren Polo Red
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s854', 'Polo Red', 'Ralph Lauren', 2013, 'Eau de Toilette', 'Red Grapefruit, Italian Lemon, Cranberry', 'Red Saffron, Red Sage', 'Amber, Coffee, Ebony Wood', 'A bold red fragrance built around vibrant grapefruit-saffron energy with a warm coffee-amber finish, embodying daring American spirit.', NULL);

-- 95. Ralph Lauren Polo Black
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s855', 'Polo Black', 'Ralph Lauren', 2005, 'Eau de Toilette', 'Iced Mango, Silver Armoise, Tangerine', 'Patchouli, Sage, Dahlia', 'Sandalwood, Tonka Bean, Musk', 'A sleek, dark masculine with frozen mango and silver armoise creating an enigmatic, nocturnal character.', NULL);

-- 96. Dolce & Gabbana Velvet Desert Oud
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s856', 'Velvet Desert Oud', 'Dolce & Gabbana', 2013, 'Eau de Parfum', 'Saffron, Bergamot, Green Notes', 'Incense, Oud, Guaiac Wood', 'Amber, Musk, Cashmeran, Vanilla', 'A luxurious Middle Eastern-inspired oud composition from the Velvet Collection with saffron and incense capturing the spirit of Arabian deserts.', NULL);

-- 97. Calvin Klein Escape for Men
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s857', 'Escape for Men', 'Calvin Klein', 1993, 'Eau de Toilette', 'Eucalyptus, Mandarin, Birch Leaf, Juniper Berry, Grapefruit', 'Cypress, Fir, Sage, Sea Notes, Rose, Jasmine', 'Oakmoss, Sandalwood, Musk, Amber, Birch', 'A fresh, green-woody masculine evoking coastal escape with eucalyptus, birch, and marine notes creating outdoor freedom.', NULL);

-- 98. Hugo Boss Bottled Elixir
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s858', 'Boss Bottled Elixir', 'Hugo Boss', 2023, 'Parfum', 'Cardamom, Apple', 'Incense, Vetiver', 'Labdanum, Leather, Sandalwood', 'The most concentrated Boss Bottled with smoky incense and rich leather adding new depth to the apple-spice foundation.', NULL);

-- 99. Givenchy L''Interdit Rouge
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s859', 'L''Interdit Eau de Parfum Rouge', 'Givenchy', 2021, 'Eau de Parfum', 'Tuberose, Red Pepper', 'Ginger, Iris, Orange Blossom', 'Patchouli, Vetiver, Oud', 'A fiery red reinterpretation with ginger and red pepper igniting the forbidden tuberose-patchouli signature with oriental heat.', NULL);

-- 100. Narciso Rodriguez For Her EDT
INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) VALUES
('s860', 'For Her Eau de Toilette', 'Narciso Rodriguez', 2003, 'Eau de Toilette', 'Rose Petals, Peach, Bergamot', 'Musc, Amber, Orange Blossom', 'Patchouli, Sandalwood, Vetiver, Vanilla', 'The EDT version of the iconic For Her with a lighter, more transparent musc character and rosy peach opening that defined a new category of musc fragrances.', NULL);

-- End of migration 025
-- Total: 100 classic designer perfumes (s761-s860)
-- Brands covered: Givenchy, Balenciaga, Calvin Klein, Hugo Boss, Prada, Burberry,
-- Dolce & Gabbana, Valentino, Carolina Herrera, Narciso Rodriguez, Lacoste, Dunhill,
-- Issey Miyake, Roberto Cavalli, Guerlain, Lancome, Chanel, Dior, Tom Ford, Versace,
-- Giorgio Armani, Mugler, Paco Rabanne, Davidoff, Gucci, Hermes, YSL, Jean Paul Gaultier,
-- Azzaro, Ralph Lauren
