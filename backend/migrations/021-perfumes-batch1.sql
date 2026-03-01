-- Migration 021: 100 real masculine/unisex perfumes (IDs s461-s560)
-- Mix of new brands + missing perfumes from existing brands

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s461', 'L''Eau d''Issey Pour Homme', 'Issey Miyake', 1994, 'Eau de Toilette', 'Yuzu, Bergamot, Lemon, Tarragon', 'Nutmeg, Water Lily, Sage, Geranium', 'Sandalwood, Cedar, Musk, Vetiver, Amber', 'A groundbreaking aquatic fragrance that redefined the genre with its transparent, ozonic freshness and Japanese minimalist aesthetic.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s462', 'L''Eau d''Issey Pour Homme Intense', 'Issey Miyake', 2007, 'Eau de Toilette', 'Mandarin Orange, Bergamot, Davana', 'Saffron, Cinnamon, Nutmeg, Blue Lotus', 'Incense, Gaiac Wood, Amber, Benzoin', 'A richer, spicier reinterpretation of the original with oriental warmth and depth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s463', 'Nuit d''Issey', 'Issey Miyake', 2014, 'Eau de Toilette', 'Bergamot, Grapefruit, Pink Pepper', 'Leather, Black Pepper, Incense', 'Patchouli, Vetiver, Tonka Bean, Cashmeran', 'A dark, leathery fragrance that breaks from the aquatic tradition of the house with smoky intensity.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s464', 'John Varvatos', 'John Varvatos', 2004, 'Eau de Toilette', 'Tarragon, Green Leaves, Basil', 'Clary Sage, Rose, Coriander', 'Suede Leather, Tobacco, Woodsy Notes, Amber', 'A vintage-inspired masculine scent blending aromatic herbs with warm suede and tobacco.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s465', 'John Varvatos Artisan', 'John Varvatos', 2009, 'Eau de Toilette', 'Orange, Tangelo, Thyme', 'Lavender, Orange Blossom, Jasmine Sambac', 'Woody Notes, Amber, Musk', 'A fresh, Mediterranean-inspired citrus aromatic with a hand-woven rattan bottle.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s466', 'John Varvatos Dark Rebel', 'John Varvatos', 2015, 'Eau de Toilette', 'Jamaican Rum, Pink Pepper, Clary Sage', 'Saffron, Olibanum, Java Vetiver', 'Oak, Leather, Patchouli', 'A bold, rebellious scent with dark leather and smoky accents inspired by rock and roll culture.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s467', 'Loewe 001 Man', 'Loewe', 2016, 'Eau de Parfum', 'Bergamot, Lemon, Pink Pepper, Cypress', 'Sandalwood, Carrot Seeds, Coconut', 'Musk, Cistus Labdanum, Cashmere Wood', 'A post-intimacy fragrance capturing the scent of morning-after skin with subtle warmth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s468', 'Loewe 7', 'Loewe', 2010, 'Eau de Toilette', 'Tangerine, Bergamot, Grapefruit', 'Incense, Violet Leaf, Clary Sage', 'Leather, Benzoin, Vetiver, Amber', 'A sophisticated leather fragrance combining citrus brightness with deep incense and amber.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s469', 'Loewe Solo Cedro', 'Loewe', 2018, 'Eau de Toilette', 'Bergamot, Mandarin Orange, Cardamom', 'Lavender, Cypress, Thyme', 'Atlas Cedar, Vetiver, Musk', 'A woody aromatic fragrance centered on majestic cedar with Mediterranean herbal notes.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s470', 'Bottega Veneta Pour Homme', 'Bottega Veneta', 2013, 'Eau de Toilette', 'Hedgehog Cactus, Pimento, Juniper Berry', 'Iris, Fir Balsam, Cedarwood', 'Leather, Labdanum, Patchouli', 'A refined masculine leather fragrance with Italian craftsmanship, dry woods, and aromatic depth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s471', 'Bottega Veneta Pour Homme Extreme', 'Bottega Veneta', 2014, 'Eau de Parfum', 'Elemi, Ginger, Pink Pepper', 'Geranium, Violet Leaf, Egyptian Jasmine', 'Patchouli, Leather, Amber, Benzoin', 'An intensified version with richer patchouli and warmer amber for a more opulent experience.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s472', 'Declaration de Cartier', 'Cartier', 2001, 'Eau de Toilette', 'Artemisia, Bergamot, Birch', 'Caraway, Cedar, Iris', 'Vetiver, Leather, Musk, Oakmoss', 'A bold, aromatic statement fragrance built around bitter artemisia and caraway spice.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s473', 'Cartier L''Envol', 'Cartier', 2016, 'Eau de Parfum', 'Ginger, Violet Leaf, Honey', 'Iris, Gaiac Wood, Lavender', 'Musk, Amber, Sandalwood', 'An elegant, honeyed iris fragrance that feels like taking flight, refined and airy.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s474', 'Pasha de Cartier Edition Noire', 'Cartier', 2013, 'Eau de Toilette', 'Grapefruit, Quince, Green Accord', 'Artemisia, Geranium, Clary Sage', 'Sandalwood, Papyrus, Ebony Wood', 'A dark, woody aromatic with an austere elegance, playing on contrasts of light and shadow.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s475', 'Balmain Homme', 'Balmain', 2015, 'Eau de Toilette', 'Cardamom, Green Apple, Nutmeg', 'Iris, Violet, Sage', 'Sandalwood, Amber, Leather, Musk', 'A modern masculine from the revived Balmain house with spicy top notes and a warm sandalwood base.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s476', 'Salvatore Ferragamo Uomo', 'Ferragamo', 2016, 'Eau de Toilette', 'Mandarin Orange, Black Pepper, Cardamom', 'Coffee, Iris, Tiramisu Accord', 'Tonka Bean, Cashmeran, Sandalwood', 'A gourmand aromatic centered on Italian tiramisu accord with warm coffee and spice notes.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s477', 'Salvatore Ferragamo Uomo Casual Life', 'Ferragamo', 2017, 'Eau de Toilette', 'Bergamot, Pink Pepper, Violet Leaf', 'Cinnamon, Lavender, Geranium', 'Cashmeran, Ambroxan, White Musk', 'A lighter, more casual take on Uomo with lavender and clean musk for everyday wear.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s478', 'Ermenegildo Zegna Essenze Indonesian Oud', 'Zegna', 2012, 'Eau de Parfum', 'Saffron, Pink Pepper', 'Oud, Rose, Orris', 'Vetiver, Musk, Amber', 'A sophisticated oud interpretation with Italian elegance, balancing precious oud with refined rose.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s479', 'Zegna XXX Darkside Vetiver', 'Zegna', 2022, 'Eau de Parfum', 'Grapefruit, Bergamot', 'Cypress, Violet Leaf, Black Pepper', 'Vetiver, Sandalwood, Musk, Benzoin', 'A modern vetiver fragrance with a dark, smoky character and citrus brightness on top.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s480', 'Rasasi Hawas', 'Rasasi', 2015, 'Eau de Parfum', 'Bergamot, Apple, Mint', 'Cinnamon, Ambroxan, Sea Notes', 'Musk, Amber, Driftwood, Sandalwood', 'A crowd-pleasing fresh aquatic with surprising depth, widely regarded as a hidden gem from the Middle East.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s481', 'Rasasi La Yuqawam Pour Homme', 'Rasasi', 2014, 'Eau de Parfum', 'Ginger, Elemi, Cinnamon', 'Turkish Rose, Saffron, Oud', 'Amber, Sandalwood, Castoreum, Leather', 'A rich, leathery oud fragrance often compared to Tom Ford Tuscan Leather at a fraction of the price.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s482', 'Rasasi Daarej Pour Homme', 'Rasasi', 2014, 'Eau de Parfum', 'Lime, Orange, Lavender', 'Rose, Jasmine, Orris Root', 'Sandalwood, Musk, Tonka Bean, Vanilla', 'A smooth, elegant fragrance bridging Western and Middle Eastern perfumery traditions.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s483', 'Swiss Arabian Shaghaf Oud', 'Swiss Arabian', 2016, 'Eau de Parfum', 'Saffron, Lemon', 'Turkish Rose, Oud, Amber', 'Sandalwood, Musk, Vanilla, Incense', 'A luxurious Middle Eastern oud fragrance with rich rose and amber creating an opulent sillage.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s484', 'Swiss Arabian Walaa', 'Swiss Arabian', 2020, 'Eau de Parfum', 'Bergamot, Grapefruit, Pink Pepper', 'Iris, Jasmine, Oud', 'Vetiver, Amber, Musk, Leather', 'A contemporary oud composition balancing Western freshness with traditional Arabian richness.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s485', 'Ajmal Kuro', 'Ajmal', 2018, 'Eau de Parfum', 'Bergamot, Lemon, Apple', 'Lavender, Cedar, Violet Leaf', 'Amber, Musk, Tonka Bean, Vanilla', 'A versatile, mass-appealing fresh spicy fragrance from the renowned Dubai perfume house.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s486', 'Ajmal Hatkora Wood', 'Ajmal', 2019, 'Eau de Parfum', 'Saffron, Black Pepper, Elemi', 'Rose Absolute, Amber, Agarwood', 'Sandalwood, Patchouli, Musk, Vetiver', 'A luxurious woody oriental built around the rare hatkora citrus and precious agarwood.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s487', 'Ajmal Evoke Gold Edition', 'Ajmal', 2019, 'Eau de Parfum', 'Pineapple, Bergamot, Green Apple', 'Birch, Jasmine, Ambroxan', 'Cedar, Vanilla, Musk, Oakmoss', 'A golden fruity aromatic with tropical pineapple and smooth birch, popular among enthusiasts.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s488', 'A*Men Pure Malt', 'Mugler', 2009, 'Eau de Toilette', 'Peppermint, Cardamom', 'Irish Whiskey, Coffee', 'Caramel, Tonka Bean, Patchouli, Vanilla', 'A boozy, gourmand flanker combining whisky and coffee notes with the signature tar-like A*Men DNA.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s489', 'A*Men Ultra Zest', 'Mugler', 2016, 'Eau de Toilette', 'Grapefruit, Ginger, Green Apple', 'Cinnamon, Tonka Bean, Patchouli', 'Coffee, Malt, Caramel, Vanilla', 'A vibrant, zesty take on the A*Men line with bright citrus cutting through the dark gourmand base.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s490', 'Alien Man', 'Mugler', 2018, 'Eau de Toilette', 'Osmanthus, Leather, White Amber', 'Beechwood, Cashmeran', 'Amber, Smoky Notes, Moss', 'A smoky, woody amber fragrance from the Alien line reimagined for men with smoked beechwood.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s491', 'Mercedes-Benz Club Black', 'Mercedes-Benz', 2017, 'Eau de Toilette', 'Grapefruit, Bergamot, Aldehydes', 'Leather, Geranium, Clary Sage', 'Benzoin, Cedar, Tonka Bean, Musk', 'A refined leather fragrance evoking the interior of a luxury automobile with polished aldehydes.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s492', 'Mercedes-Benz Man Intense', 'Mercedes-Benz', 2015, 'Eau de Toilette', 'Pear, Bergamot, Black Pepper', 'Sandalwood, Cashmeran, Violet Leaf', 'Amberwood, Dry Wood, Leather', 'An intensified version of the original with deeper woods and pepper for evening occasions.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s493', 'Jaguar Classic Black', 'Jaguar', 2009, 'Eau de Toilette', 'Apple, Mandarin Orange, Bergamot', 'Suede, Iris, Aquatic Notes', 'Sandalwood, Cedar, Musk, Vanilla', 'An affordable classic with fresh apple and warm suede, delivering remarkable quality for the price.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s494', 'Jaguar Pace', 'Jaguar', 2016, 'Eau de Toilette', 'Black Pepper, Cardamom, Elemi', 'Geranium, Iris, Lavender', 'Tonka Bean, Leather, Vetiver, Musk', 'A dynamic spicy aromatic inspired by the thrill of driving with peppery energy and smooth leather.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s495', 'Police To Be The King', 'Police', 2015, 'Eau de Toilette', 'Bergamot, Green Apple, Cinnamon', 'Geranium, Lavender, Cardamom', 'Patchouli, Tonka Bean, Vanilla, Amber', 'A sweet spicy composition with cinnamon and vanilla that offers excellent projection.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s496', 'Kenneth Cole Black', 'Kenneth Cole', 2006, 'Eau de Toilette', 'Bergamot, Nutmeg, Mandarin Orange', 'Cedar, Cardamom, Jasmine', 'Suede, Musk, Sandalwood, Amber', 'A smooth, suede-forward masculine that bridges casual and dressed-up occasions effortlessly.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s497', 'Kenneth Cole Mankind', 'Kenneth Cole', 2013, 'Eau de Toilette', 'Cardamom, Ginger, Lavender', 'Geranium, Nutmeg, Cypress', 'Suede, Vetiver, Sandalwood, Musk', 'A clean, woodsy aromatic with lavender and cardamom for the modern urban man.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s498', 'Moschino Toy Boy', 'Moschino', 2019, 'Eau de Parfum', 'Pink Pepper, Elemi, Nutmeg, Indonesian Clove Bud', 'Rose Absolute, Magnolia, Flax Flowers', 'Cashmeran, Sandalwood, Amber, Musk', 'A provocative floral masculine with abundant rose, challenging gender norms in a teddy bear bottle.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s499', 'Moschino Forever', 'Moschino', 2011, 'Eau de Toilette', 'Bergamot, Star Anise, Kumquat', 'Cardamom, Pepper, Violet Leaf', 'Sandalwood, Amber, Benzoin, Musk', 'A warm, amber-spiced fragrance with Mediterranean kumquat and licorice-like star anise.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s500', 'Dsquared2 Wood Pour Homme', 'Dsquared2', 2018, 'Eau de Toilette', 'Bergamot, Lemon, Pink Pepper', 'Violet Leaf, Cypress, Cardamom', 'Amberwood, Vetiver, White Musk', 'A casual, woody aromatic with clean violet leaf and warm amberwood for effortless daily wear.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s501', 'Dsquared2 He Wood', 'Dsquared2', 2007, 'Eau de Toilette', 'Amalfi Lemon, Violet Leaf', 'Guatemalan Cardamom, Haitian Vetiver', 'Cedarwood, Musk, White Birch', 'A pioneer in the woody genre with contrasting violet leaf and birch, still relevant years after release.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s502', 'Cerruti 1881 Pour Homme', 'Cerruti', 1990, 'Eau de Toilette', 'Lavender, Bergamot, Cypress, Rosemary', 'Sandalwood, Cedar, Juniper Berry', 'Amber, Patchouli, Tonka Bean, Musk', 'A timeless aromatic fougere that defined 90s sophistication with clean lavender and warm amber.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s503', 'Trussardi Uomo', 'Trussardi', 2011, 'Eau de Toilette', 'Violet Leaf, White Pepper, Grapefruit', 'Leather, Geranium, Iris', 'Amber, Cashmere Wood, Musk', 'An Italian leather fragrance with violet leaf that captures the essence of Milanese elegance.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s504', 'Banana Republic Classic', 'Banana Republic', 1995, 'Eau de Parfum', 'Bergamot, Green Apple, Ginger', 'Jasmine, Lily of the Valley, Coriander', 'Cedar, Musk, Amber, Sandalwood', 'A clean, versatile unisex classic that embodies understated American style with fresh green notes.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s505', 'Banana Republic 78 Vintage Green', 'Banana Republic', 2018, 'Eau de Parfum', 'Bergamot, Fig Leaf, Green Tea', 'Vetiver, Galbanum, Cardamom', 'Oakmoss, Patchouli, Musk, Cedar', 'A modern green aromatic capturing the spirit of vintage 1978 with fig leaf and galbanum.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s506', 'Dior Sauvage Elixir', 'Dior', 2021, 'Elixir', 'Cinnamon, Cardamom, Grapefruit, Nutmeg', 'Lavender, Licorice, Haitian Vetiver', 'Amber, Sandalwood, Patchouli, Guaiac Wood', 'The most concentrated Sauvage expression, a spicy-woody elixir with remarkable depth and longevity.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s507', 'Dior Fahrenheit', 'Dior', 1988, 'Eau de Toilette', 'Lavender, Mandarin, Hawthorn, Cedar', 'Nutmeg, Violet, Sandalwood', 'Leather, Patchouli, Amber, Vetiver, Musk', 'A revolutionary fragrance that introduced a gasoline-like note to perfumery, bold and unapologetic.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s508', 'Dior Fahrenheit Parfum', 'Dior', 2014, 'Parfum', 'Violet, Hawthorn', 'Leather, Benzoin', 'Amber, Vetiver, Tonka Bean', 'A darker, more leathery parfum concentration of Fahrenheit with amplified benzoin and amber.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s509', 'Dior Homme Intense', 'Dior', 2011, 'Eau de Parfum', 'Lavender, Iris', 'Iris, Rose Absolute, Amber', 'Virginia Cedar, Vetiver, Musk', 'The intensified iris masterpiece, more sensual and rich with rose absolute adding romantic depth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s510', 'Dior Homme Parfum', 'Dior', 2014, 'Parfum', 'Bismuth, Black Leather', 'Iris, Amber, Australian Sandalwood', 'Leather, Vetiver, Ebony Wood', 'The darkest, most concentrated Dior Homme flanker with a mineral bismuth note and deep leather.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s511', 'Bleu de Chanel Parfum', 'Chanel', 2018, 'Parfum', 'Citrus, Mint', 'Cedar, Nutmeg, Iso E Super', 'Sandalwood, Amber, Vetiver, Incense', 'The parfum concentration adds sandalwood and warm amber to the Bleu de Chanel line for ultimate refinement.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s512', 'Chanel Allure Homme Sport Eau Extreme', 'Chanel', 2012, 'Eau de Parfum', 'Mandarin Orange, Black Pepper, Mint', 'Sage, Cedar', 'Tonka Bean, Musky Notes, Sandalwood', 'A richer, longer lasting version of the Sport flanker with amplified tonka bean warmth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s513', 'Chanel Platinum Egoiste', 'Chanel', 1993, 'Eau de Toilette', 'Lavender, Rosemary, Petitgrain', 'Clary Sage, Jasmine, Geranium, Rose', 'Oakmoss, Amber, Vetiver, Cedar', 'A masterclass in understated elegance, considered one of the finest lavender fragrances ever created.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s514', 'Tom Ford Noir Extreme', 'Tom Ford', 2015, 'Eau de Parfum', 'Mandarin Orange, Neroli, Cardamom, Nutmeg', 'Rose Absolute, Jasmine Sambac, Kulfi Accord', 'Sandalwood, Amber, Vanilla, Woody Notes', 'An opulent, gourmand oriental with a unique Indian kulfi ice cream accord adding creamy sweetness.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s515', 'Tom Ford Noir Anthracite', 'Tom Ford', 2017, 'Eau de Parfum', 'Green Leaves, Clary Sage, Basil', 'Orris, Incense, Black Pepper', 'Vetiver, Patchouli, Woody Notes, Benzoin', 'A dark, smoky incense fragrance evoking volcanic ash and sacred resins with raw green notes.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s516', 'Tom Ford Beau de Jour', 'Tom Ford', 2019, 'Eau de Parfum', 'Lavender, Black Pepper, Mint', 'Rosemary, Geranium, Basil', 'Amber, Patchouli, Oakmoss, Musk', 'A modern fougere from the Private Blend, celebrating classic barbershop elegance with contemporary flair.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s517', 'Tom Ford Ombre Leather', 'Tom Ford', 2018, 'Eau de Parfum', 'Cardamom, Leather', 'Jasmine Sambac, Black Leather', 'Patchouli, Amber, Moss, Vetiver', 'A raw, animalistic leather fragrance inspired by the Wild West with floral jasmine adding intrigue.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s518', 'Tom Ford Grey Vetiver', 'Tom Ford', 2009, 'Eau de Parfum', 'Grapefruit, Orange Blossom, Sage', 'Orris, Nutmeg, Vetiver', 'Amber, Woody Notes, Oakmoss', 'A crisp, office-appropriate vetiver that showcases the note in its most refined and versatile form.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s519', 'Versace Pour Homme Dylan Blue', 'Versace', 2016, 'Eau de Toilette', 'Calabrian Bergamot, Grapefruit, Fig Leaf, Aquatic Notes', 'Violet Leaf, Papyrus, Patchouli, Black Pepper, Ambroxan', 'Musk, Tonka Bean, Saffron, Incense', 'A bold blue fragrance with excellent projection, combining ambroxan freshness with warm incense.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s520', 'Versace Eros Flame', 'Versace', 2018, 'Eau de Parfum', 'Mandarin Orange, Black Pepper, Lemon, Chinotto', 'Rosemary, Geranium, Pepperwood', 'Tonka Bean, Vanilla, Sandalwood, Cedar, Patchouli', 'A fiery, warm companion to the original Eros, replacing the cool mint with spicy woods and vanilla.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s521', 'Versace The Dreamer', 'Versace', 1996, 'Eau de Toilette', 'Tarragon, Mandarin, Lavender, Juniper Berry', 'Flax, Lily, Sage, Mugwort, Geranium', 'Tobacco, Amber, Musk, Tonka Bean', 'A dreamy, tobacco-centered fragrance that has earned cult status as one of the best budget masculines.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s522', 'Giorgio Armani Acqua di Gio Profondo', 'Giorgio Armani', 2020, 'Eau de Parfum', 'Green Mandarin, Bergamot, Aquatic Notes', 'Cypress, Rosemary, Lavender, Amber', 'Musk, Patchouli, Mineral Amber', 'A deeper, more intense Acqua di Gio with marine depth and aromatic herbs inspired by the ocean floor.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s523', 'Giorgio Armani Acqua di Gio Absolu', 'Giorgio Armani', 2018, 'Eau de Parfum', 'Marine Notes, Bergamot, Pear', 'Geranium, Rosemary, Lavender', 'Tonka Bean, Patchouli, Woody Notes', 'A warmer, woodier Acqua di Gio flanker with pear sweetness and sensual tonka bean in the dry down.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s524', 'Giorgio Armani Stronger With You Intensely', 'Giorgio Armani', 2019, 'Eau de Parfum', 'Pink Pepper, Juniper Berry, Violet', 'Cinnamon, Toffee, Sage', 'Vanilla, Amber, Suede, Musk', 'An intensely sweet and spicy flanker with a toffee accord that makes it a cold-weather favorite.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s525', 'Prada Luna Rossa Carbon', 'Prada', 2017, 'Eau de Toilette', 'Bergamot, Lavender, Pepper', 'Metallic Notes', 'Ambroxan, Patchouli', 'A synthetic, minimalist composition often compared to Sauvage, built on lavender and ambroxan molecules.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s526', 'Prada Luna Rossa Black', 'Prada', 2018, 'Eau de Parfum', 'Bergamot, Angelica', 'Coumarin, Patchouli', 'Sandalwood, Amber, Musk', 'A darker, more mysterious flanker centered on coumarin with angular sandalwood and amber.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s527', 'Prada L''Homme', 'Prada', 2016, 'Eau de Toilette', 'Iris, Neroli, Cardamom', 'Iris, Amber, Geranium', 'Sandalwood, Patchouli, Cedar, Amber', 'A powdery, soapy iris fragrance that embodies quiet luxury and impeccable grooming.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s528', 'Yves Saint Laurent La Nuit de L''Homme', 'Yves Saint Laurent', 2009, 'Eau de Toilette', 'Cardamom, Star Anise, Bergamot', 'Lavender, Cedarwood, Virginian Cedar', 'Vetiver, Caraway, Tonka Bean', 'A seductive evening fragrance built on cardamom spice and fresh lavender with cozy vetiver warmth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s529', 'Yves Saint Laurent Y Eau de Parfum', 'Yves Saint Laurent', 2018, 'Eau de Parfum', 'Apple, Ginger, Bergamot', 'Sage, Juniper Berry, Geranium', 'Amber, Cedar, Tonka Bean, Olibanum', 'A powerful, sweet-fresh masculine with green apple sweetness and sage aromatics for confident wear.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s530', 'Yves Saint Laurent L''Homme', 'Yves Saint Laurent', 2006, 'Eau de Toilette', 'Bergamot, Ginger, Lemon', 'White Pepper, Basil, Violet Leaf, Spices', 'Tonka Bean, Vetiver, Cedar', 'A refined, versatile woody floral musk that works seamlessly from office to dinner.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s531', 'Calvin Klein Eternity for Men', 'Calvin Klein', 1989, 'Eau de Toilette', 'Lavender, Mandarin, Green Notes', 'Jasmine, Sage, Basil, Geranium', 'Sandalwood, Amber, Vetiver, Musk', 'A timeless fougere representing 90s optimism and commitment, still relevant after decades.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s532', 'Calvin Klein Obsession for Men', 'Calvin Klein', 1986, 'Eau de Toilette', 'Mandarin, Bergamot, Lime, Lavender', 'Nutmeg, Coriander, Red Carnation, Jasmine', 'Amber, Sandalwood, Vanilla, Musk, Patchouli', 'A powerhouse 80s oriental that defined an era of bold, unapologetic masculine fragrances.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s533', 'Hugo Boss Bottled Intense', 'Hugo Boss', 2015, 'Eau de Parfum', 'Apple, Mandarin Orange, Orange Blossom', 'Cinnamon, Clove, Geranium', 'Sandalwood, Vetiver, Olive Tree, Vanilla', 'A richer, more complex version of the iconic Bottled with amplified vanilla and spice.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s534', 'Hugo Boss The Scent', 'Hugo Boss', 2015, 'Eau de Toilette', 'Ginger, Mandarin Orange, Maninka Fruit', 'Lavender, Maninka', 'Leather, Musk, Amber', 'A seductive fragrance featuring the exotic African maninka fruit with ginger and leather.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s535', 'Guerlain L''Homme Ideal Extreme', 'Guerlain', 2020, 'Eau de Parfum', 'Almond, Bulgarian Rose', 'Tobacco, Cherry, Leather', 'Tonka Bean, Vanilla, Benzoin, Sandalwood', 'A rich gourmand combining smoky cherry with tobacco and almond in a distinctly Guerlain composition.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s536', 'Guerlain L''Instant de Guerlain Pour Homme', 'Guerlain', 2004, 'Eau de Toilette', 'Mandarin Orange, Star Anise, Grapefruit', 'Ylang Ylang, Cacao, Cinnamon', 'Amber, Patchouli, Sandalwood, Musk', 'A masterful blend of citrus, cocoa, and anise creating a unique gourmand-aromatic hybrid.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s537', 'Guerlain Vetiver', 'Guerlain', 1961, 'Eau de Toilette', 'Lemon, Bergamot, Mandarin, Neroli', 'Nutmeg, Coriander, Pepper, Tobacco', 'Vetiver, Tonka Bean, Amber, Oakmoss', 'The definitive vetiver fragrance, a benchmark in the genre for over sixty years of unbroken production.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s538', 'Givenchy Gentleman Eau de Parfum Boisee', 'Givenchy', 2020, 'Eau de Parfum', 'Cardamom, Pink Pepper', 'Iris, Cinnamon, Cocoa', 'Sandalwood, Patchouli, Leather', 'A woody, spicy evolution of the Gentleman line with warm cocoa and refined iris.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s539', 'Givenchy Pi', 'Givenchy', 1998, 'Eau de Toilette', 'Mandarin, Basil, Tarragon, Neroli', 'Mimosa, Lily of the Valley, Ylang Ylang', 'Vanilla, Almond, Tonka Bean, Cedar, Benzoin', 'A unique sweet almond-vanilla fragrance with mathematical precision, celebrating intelligence and charm.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s540', 'Dolce & Gabbana The One Eau de Parfum', 'Dolce & Gabbana', 2008, 'Eau de Parfum', 'Grapefruit, Coriander, Basil', 'Ginger, Cardamom, Orange Blossom, Cedar', 'Amber, Labdanum, Tobacco, Musk', 'The EDP concentration adds more tobacco and amber depth to this modern classic gentleman fragrance.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s541', 'Dolce & Gabbana The One Exclusive Edition', 'Dolce & Gabbana', 2014, 'Eau de Parfum', 'Grapefruit, Coriander, Cardamom', 'Ginger, Cedar, Labdanum', 'Amber, Tobacco, Leather, Benzoin', 'A richer, limited edition with leather and benzoin amplifying the signature warm tobacco DNA.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s542', 'Paco Rabanne Invictus Aqua', 'Paco Rabanne', 2016, 'Eau de Toilette', 'Grapefruit, Sea Salt, Bergamot', 'Violet Leaf, Amber, Moss', 'Amberwood, Driftwood, Guaiac Wood', 'A marine-aquatic flanker of Invictus with salty sea notes and driftwood for a coastal vibe.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s543', 'Paco Rabanne Phantom', 'Paco Rabanne', 2021, 'Eau de Toilette', 'Lemon, Lavender, Pink Pepper', 'Smoke, Apple', 'Vanilla, Cashmeran, Woody Notes, Patchouli', 'A futuristic fragrance in a robot-shaped bottle, blending lavender with smoky vanilla and tech-inspired marketing.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s544', 'Jean Paul Gaultier Le Male Le Parfum', 'Jean Paul Gaultier', 2020, 'Eau de Parfum', 'Cardamom, Lavender, Iris', 'Leather, Laotian Benzoin', 'Oriental Notes, Woody Notes, Vanilla', 'The parfum concentration with oriental benzoin and vanilla making the iconic Le Male richer and warmer.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s545', 'Jean Paul Gaultier Ultra Male', 'Jean Paul Gaultier', 2015, 'Eau de Toilette Intense', 'Pear, Bergamot, Lavender, Mint, Lemon', 'Cinnamon, Cumin, Clary Sage, Black Pepper', 'Vanilla, Amber, Cedar, Patchouli', 'A sweeter, more intense Le Male flanker with pear and vanilla creating an irresistibly sweet profile.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s546', 'Carolina Herrera Bad Boy', 'Carolina Herrera', 2019, 'Eau de Toilette', 'Black Pepper, White Pepper, Bergamot', 'Sage, Cedar', 'Tonka Bean, Amber, Cacao, Vetiver', 'A daring, lightning bolt-shaped fragrance contrasting bright pepper with dark cacao and tonka bean.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s547', 'Carolina Herrera CH Men Prive', 'Carolina Herrera', 2015, 'Eau de Toilette', 'Grapefruit, Pomelo, Cardamom', 'Benzoin, Iris, Whiskey, Leather', 'Sandalwood, Tonka Bean, Suede, Woody Notes', 'A luxurious, boozy masculine with whiskey and leather evoking a private gentlemen''s club.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s548', 'Valentino Uomo Born In Roma', 'Valentino', 2019, 'Eau de Toilette', 'Mineral Sage, Green Earl Grey Tea', 'Ginger, Violet', 'Vetiver, Guaiac Wood, Benzoin, Akigalawood', 'A couture masculine blending sage and earl grey with refined violet and smoky vetiver base.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s549', 'Valentino Uomo Intense', 'Valentino', 2016, 'Eau de Parfum', 'Myrtle, Cardamom, Iris', 'Tonka Bean, Leather, Coffee', 'Vanilla, Cedar, Cashmeran', 'A dark, leathery iris composition with aromatic myrtle and espresso adding Italian sophistication.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s550', 'Azzaro The Most Wanted', 'Azzaro', 2021, 'Eau de Parfum Intense', 'Cardamom, Lavender', 'Toffee, Iris, Incense', 'Amber, Patchouli, Vanilla, Woody Notes', 'A sweet, attention-grabbing flanker of Wanted with toffee and lavender creating addictive warmth.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s551', 'Azzaro Chrome Aqua', 'Azzaro', 2019, 'Eau de Toilette', 'Bergamot, Green Apple, Pink Pepper', 'Aromatic Notes, White Musk', 'Musk, Tonka Bean, Sandalwood', 'A fresh, aquatic reformulation of the Chrome line with enhanced musk and subtle sweetness.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s552', 'Burberry London for Men', 'Burberry', 2006, 'Eau de Toilette', 'Lavender, Bergamot, Cinnamon', 'Mimosa, Leather', 'Tobacco, Opoponax, Guaiac Wood, Oakmoss', 'A cozy British tobacco fragrance evoking a London gentleman''s study with leather-bound books.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s553', 'Burberry Hero', 'Burberry', 2021, 'Eau de Toilette', 'Bergamot, Lemon, Black Pepper, Juniper Berry', 'Cedar, Vetiver', 'Black Cedarwood, Pine, Benzoin, Ebony Wood', 'A woody masculine combining horse-ride energy with cedarwood strength and fresh juniper.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s554', 'Ralph Lauren Polo Green', 'Ralph Lauren', 1978, 'Eau de Toilette', 'Artemisia, Basil, Thyme, Juniper Berry', 'Pine, Chamomile, Rose, Carnation', 'Leather, Tobacco, Patchouli, Oakmoss, Cedar', 'The quintessential American masculine fragrance, a chypre-fougere icon that defined preppy sophistication.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s555', 'Ralph Lauren Polo Blue', 'Ralph Lauren', 2003, 'Eau de Toilette', 'Cucumber, Melon, Mandarin Orange', 'Basil, Sage, Geranium', 'Suede, Patchouli, Woodsy Notes, Musk', 'A fresh, aquatic-aromatic scent with cucumber and melon evoking ocean horizons and blue skies.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s556', 'Davidoff Cool Water Intense', 'Davidoff', 2019, 'Eau de Parfum', 'Green Mandarin, Coconut Water, Peppermint', 'Cypress, Geranium, Sage', 'Amberwood, Musk, Cashmeran', 'A modern, intensified Cool Water with coconut water freshness and warmer amber wood base.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s557', 'Montblanc Explorer', 'Montblanc', 2019, 'Eau de Parfum', 'Bergamot, Pink Pepper, Clary Sage', 'Leather, Vetiver, Patchouli', 'Cacao, Indonesian Vetiver, Akigalawood, Cashmeran', 'An adventurous woody aromatic often compared to Aventus at an accessible price point.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s558', 'Montblanc Legend Spirit', 'Montblanc', 2016, 'Eau de Toilette', 'Grapefruit, Pink Pepper, Bergamot', 'Lavender, Cardamom, Aquatic Notes', 'White Wood, Cashmere, Oakmoss', 'A bright, transparent flanker of Legend with a mineral aquatic character and white wood elegance.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s559', 'Diesel Only The Brave', 'Diesel', 2009, 'Eau de Toilette', 'Mandarin Orange, Lemon, Amalfi Lemon', 'Coriander, Violet, Cedar, Rosemary', 'Amber, Labdanum, Styrax, Leather', 'A bold, fist-shaped bottle containing a woody-ambery composition for the fearless modern man.');

INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES
('s560', 'Diesel Spirit of the Brave', 'Diesel', 2019, 'Eau de Toilette', 'Bergamot, Grapefruit', 'Lavender, Sage', 'Cypress, Labdanum, Fir Resin, Benzoin', 'An aromatic woody flanker with herbal lavender and sage bringing a natural, outdoor spirit.');
