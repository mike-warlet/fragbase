-- Migration 020: Ingredient Encyclopedia
-- Common perfume ingredients with descriptions and categories

CREATE TABLE IF NOT EXISTS ingredients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_pt TEXT, -- Portuguese name
    category TEXT NOT NULL CHECK(category IN ('citrus','floral','fruity','green','spicy','woody','amber','musk','aquatic','gourmand','herbal','leather','animalic','mineral','resinous')),
    description TEXT,
    description_pt TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredient_pairings (
    ingredient_id TEXT NOT NULL,
    pairs_with TEXT NOT NULL,
    affinity REAL DEFAULT 0.5, -- 0-1 how well they pair
    PRIMARY KEY (ingredient_id, pairs_with),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (pairs_with) REFERENCES ingredients(id)
);

CREATE INDEX IF NOT EXISTS idx_ingredients_category ON ingredients(category);
CREATE INDEX IF NOT EXISTS idx_ingredient_pairings_id ON ingredient_pairings(ingredient_id);

-- Seed 70 common perfume ingredients
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
-- CITRUS
('bergamot', 'Bergamot', 'Bergamota', 'citrus', 'Bright, slightly floral citrus from Southern Italy. The backbone of most colognes and fresh openings.', 'Citrino brilhante e ligeiramente floral do sul de Italia. A base da maioria das colonias.'),
('lemon', 'Lemon', 'Limao', 'citrus', 'Sharp, clean, zesty top note that adds instant freshness and brightness.', 'Nota de topo afiada, limpa e vibrante que adiciona frescura instantanea.'),
('orange', 'Orange', 'Laranja', 'citrus', 'Sweet, juicy citrus with natural warmth. Both peel and blossom are widely used.', 'Citrino doce e suculento com calor natural. Tanto a casca como a flor sao usadas.'),
('grapefruit', 'Grapefruit', 'Toranja', 'citrus', 'Tart, slightly bitter citrus with a sparkling, energetic character.', 'Citrino azedo e ligeiramente amargo com caracter efervescente.'),
('mandarin', 'Mandarin', 'Tangerina', 'citrus', 'Soft, sweet citrus with a honeyed quality. Gentler than lemon or grapefruit.', 'Citrino suave e doce com qualidade mel. Mais gentil que limao ou toranja.'),
('neroli', 'Neroli', 'Neroli', 'citrus', 'Bitter orange blossom distillate. Elegant, slightly honeyed floral-citrus.', 'Destilado de flor de laranjeira amarga. Elegante, floral-citrino ligeiramente mel.'),
('petitgrain', 'Petitgrain', 'Petitgrain', 'citrus', 'Extracted from bitter orange leaves. Green, woody-citrus with a herbal twist.', 'Extraido das folhas de laranjeira amarga. Verde, lenhoso-citrino com toque herbal.'),

-- FLORAL
('rose', 'Rose', 'Rosa', 'floral', 'The queen of flowers in perfumery. Can range from fresh and dewy to deep, jammy, and opulent.', 'A rainha das flores na perfumaria. Pode variar de fresca a profunda e opulenta.'),
('jasmine', 'Jasmine', 'Jasmim', 'floral', 'Rich, sensual, and narcotic white flower. One of the most used floral materials.', 'Flor branca rica, sensual e narcotica. Um dos materiais florais mais usados.'),
('tuberose', 'Tuberose', 'Tuberosa', 'floral', 'Intensely creamy, almost buttery white flower with a touch of green freshness.', 'Flor branca intensamente cremosa, quase amanteigada, com toque de frescura verde.'),
('iris', 'Iris', 'Iris', 'floral', 'Powdery, elegant, earthy floral. One of the most expensive raw materials in perfumery.', 'Floral empoado, elegante e terroso. Um dos materiais mais caros da perfumaria.'),
('lily_of_the_valley', 'Lily of the Valley', 'Lirio do Vale', 'floral', 'Fresh, green, dewy floral with a clean, spring-like character.', 'Floral fresco, verde e orvalhado com caracter primaveril e limpo.'),
('ylang_ylang', 'Ylang Ylang', 'Ylang Ylang', 'floral', 'Sweet, tropical, slightly banana-like exotic flower. Used in many oriental blends.', 'Flor exotica doce, tropical, ligeiramente bananada. Usada em muitas composicoes orientais.'),
('violet', 'Violet', 'Violeta', 'floral', 'Soft, powdery, slightly green floral with a sweet candy-like facet.', 'Floral suave, empoado, ligeiramente verde com faceta doce.'),
('peony', 'Peony', 'Peonia', 'floral', 'Light, fresh, slightly rosy floral with a clean, feminine character.', 'Floral leve, fresco, ligeiramente rosado com caracter limpo e feminino.'),
('magnolia', 'Magnolia', 'Magnolia', 'floral', 'Creamy, lemony-sweet white flower with green and champagne-like facets.', 'Flor branca cremosa, doce-limonada com facetas verdes e champanhe.'),

-- FRUITY
('apple', 'Apple', 'Maca', 'fruity', 'Crisp, juicy, and clean. Green apple is tart; red apple is sweet and comforting.', 'Crocante, suculenta e limpa. Maca verde e azeda; maca vermelha e doce e reconfortante.'),
('peach', 'Peach', 'Pessego', 'fruity', 'Soft, velvety, and sweet with a juicy, skin-like warmth. Common in feminine fragrances.', 'Suave, aveludado e doce com calor suculento. Comum em fragancias femininas.'),
('pear', 'Pear', 'Pera', 'fruity', 'Clean, slightly green, watery fruit note. Fresh and modern.', 'Nota frutada limpa, ligeiramente verde e aquosa. Fresca e moderna.'),
('raspberry', 'Raspberry', 'Framboesa', 'fruity', 'Tart, slightly jammy berry with a pink, sweet-sour character.', 'Baga azeda, ligeiramente doce com caracter rosa agridoce.'),
('blackcurrant', 'Blackcurrant', 'Groselha Preta', 'fruity', 'Tart, green, catty fruit note. Adds a sharp, distinctive character.', 'Nota frutada azeda, verde. Adiciona caracter distinto e afiado.'),

-- GREEN & HERBAL
('vetiver', 'Vetiver', 'Vetiver', 'green', 'Earthy, smoky, woody grass root. Clean and grounding. A masculine staple.', 'Raiz de erva terrosa, fumada e lenhosa. Limpa e estabilizadora. Um basico masculino.'),
('basil', 'Basil', 'Manjericao', 'herbal', 'Fresh, green, slightly spicy herb with an aromatic, Mediterranean character.', 'Erva fresca, verde, ligeiramente picante com caracter aromatico mediterraneo.'),
('lavender', 'Lavender', 'Lavanda', 'herbal', 'Aromatic, clean, slightly camphoraceous herb. The classic fougere material.', 'Erva aromatica, limpa, ligeiramente canforada. O material classico fougere.'),
('mint', 'Mint', 'Menta', 'herbal', 'Cool, fresh, invigorating green note. Peppermint is sharp; spearmint is sweeter.', 'Nota verde fresca, refrescante e revigorante.'),
('green_tea', 'Green Tea', 'Cha Verde', 'green', 'Light, clean, slightly bitter green note with a calming, zen-like quality.', 'Nota verde leve, limpa, ligeiramente amarga com qualidade calmante.'),

-- SPICY
('pepper', 'Black Pepper', 'Pimenta Preta', 'spicy', 'Sharp, warm, dry spice that adds energy and a tingling sensation.', 'Especiaria afiada, quente e seca que adiciona energia e sensacao formigante.'),
('cardamom', 'Cardamom', 'Cardamomo', 'spicy', 'Aromatic, slightly sweet, camphoraceous spice with green and woody facets.', 'Especiaria aromatica, ligeiramente doce, canforada com facetas verdes e lenhosas.'),
('cinnamon', 'Cinnamon', 'Canela', 'spicy', 'Warm, sweet, spicy bark with a comforting, festive character.', 'Casca quente, doce e picante com caracter reconfortante e festivo.'),
('saffron', 'Saffron', 'Acafrao', 'spicy', 'Rich, metallic, slightly leathery spice. Opulent and luxurious.', 'Especiaria rica, metalica, ligeiramente couro. Opulenta e luxuosa.'),
('ginger', 'Ginger', 'Gengibre', 'spicy', 'Bright, warm, slightly lemony spice. Fresh ginger is zingy; dry ginger is warmer.', 'Especiaria brilhante, quente, ligeiramente limonada.'),
('nutmeg', 'Nutmeg', 'Noz Moscada', 'spicy', 'Warm, sweet, aromatic spice with a slightly woody, nutty character.', 'Especiaria quente, doce e aromatica com caracter lenhoso.'),
('pink_pepper', 'Pink Pepper', 'Pimenta Rosa', 'spicy', 'Bright, fruity, slightly rosy pepper. More delicate than black pepper.', 'Pimenta brilhante, frutada, ligeiramente rosada. Mais delicada que pimenta preta.'),

-- WOODY
('sandalwood', 'Sandalwood', 'Sandalo', 'woody', 'Creamy, warm, milky wood with a soft, meditative quality. One of the oldest perfume materials.', 'Madeira cremosa, quente e leitosa com qualidade meditativa suave.'),
('cedar', 'Cedarwood', 'Cedro', 'woody', 'Dry, pencil-shaving woody note. Clean and structured. A versatile base material.', 'Nota lenhosa seca. Limpa e estruturada. Um material de base versatil.'),
('oud', 'Oud (Agarwood)', 'Oud', 'woody', 'Dark, complex, animalic wood. Smoky, medicinal, and deeply luxurious. Highly prized in Middle Eastern perfumery.', 'Madeira escura, complexa e animalica. Fumada e profundamente luxuosa.'),
('patchouli', 'Patchouli', 'Patchouli', 'woody', 'Dark, earthy, slightly sweet and chocolatey leaf. A powerhouse base note.', 'Folha escura, terrosa, ligeiramente doce e achocolatada. Uma nota de base poderosa.'),
('birch', 'Birch', 'Betula', 'woody', 'Smoky, leathery, tar-like wood. Adds a rugged, outdoorsy character.', 'Madeira fumada, couro, alcatroada. Adiciona caracter robusto e exterior.'),
('guaiac', 'Guaiacwood', 'Guaiaco', 'woody', 'Smoky, rosy, creamy wood with a tea-like, slightly vanillic quality.', 'Madeira fumada, rosada e cremosa com qualidade tipo cha.'),

-- AMBER & RESINOUS
('amber', 'Amber', 'Ambar', 'amber', 'Warm, sweet, powdery, resinous blend. The classic oriental base accord.', 'Mistura quente, doce, empoada e resinosa. O classico acorde base oriental.'),
('vanilla', 'Vanilla', 'Baunilha', 'gourmand', 'Sweet, warm, creamy, comforting. The most popular gourmand material.', 'Doce, quente, cremosa, reconfortante. O material gourmand mais popular.'),
('tonka', 'Tonka Bean', 'Fava Tonka', 'gourmand', 'Sweet, warm, almond-vanilla-hay character. A sophisticated gourmand note.', 'Caracter doce, quente, amendoa-baunilha-feno. Uma nota gourmand sofisticada.'),
('benzoin', 'Benzoin', 'Benjoim', 'resinous', 'Sweet, balsamic, vanilla-like resin with a warm, cozy character.', 'Resina doce, balsamica, tipo baunilha com caracter quente e acolhedor.'),
('frankincense', 'Frankincense', 'Olibano', 'resinous', 'Smoky, lemony, sacred resin with an incense-like, spiritual quality.', 'Resina fumada, limonada, sagrada com qualidade tipo incenso.'),
('myrrh', 'Myrrh', 'Mirra', 'resinous', 'Dark, balsamic, slightly medicinal resin. Deep and mysterious.', 'Resina escura, balsamica, ligeiramente medicinal. Profunda e misteriosa.'),
('labdanum', 'Labdanum', 'Labdano', 'resinous', 'Rich, dark, ambery, leathery resin from rockrose. Often used in amber accords.', 'Resina rica, escura, ambarada e couro de esteva.'),

-- MUSK & ANIMALIC
('musk', 'White Musk', 'Almiscar Branco', 'musk', 'Clean, skin-like, slightly powdery and sweet. Modern musks are synthetic and safe.', 'Limpo, tipo pele, ligeiramente empoado e doce. Almiscares modernos sao sinteticos.'),
('ambroxan', 'Ambroxan', 'Ambroxan', 'musk', 'Synthetic ambergris molecule. Woody, ambery, skin-like with powerful projection.', 'Molecula sintetica de ambar cinzento. Lenhoso, ambarado, tipo pele com grande projecao.'),
('civet', 'Civet', 'Civeta', 'animalic', 'Animalic, dark, musky note. Today recreated synthetically. Adds depth and sensuality.', 'Nota animalica, escura, almiscarada. Hoje recriada sinteticamente.'),
('ambergris', 'Ambergris', 'Ambar Cinzento', 'animalic', 'Salty, marine, sweet, woody note from whale secretion. Extremely rare and precious.', 'Nota salgada, marinha, doce e lenhosa. Extremamente rara e preciosa.'),

-- AQUATIC
('sea_salt', 'Sea Salt', 'Sal Marinho', 'aquatic', 'Mineral, ozonic, marine note evoking ocean breeze and sea spray.', 'Nota mineral, ozonica, marinha evocando brisa oceanica.'),
('water_notes', 'Water Notes', 'Notas Aquaticas', 'aquatic', 'Synthetic fresh, clean, wet notes evoking rain, streams, or morning dew.', 'Notas sinteticas frescas, limpas evocando chuva ou orvalho.'),

-- GOURMAND
('chocolate', 'Chocolate', 'Chocolate', 'gourmand', 'Rich, dark, bittersweet cocoa. Adds warmth and indulgence.', 'Cacau rico, escuro e agridoce. Adiciona calor e indulgencia.'),
('coffee', 'Coffee', 'Cafe', 'gourmand', 'Roasted, bitter, energizing note. Can be creamy or sharp depending on treatment.', 'Nota torrada, amarga e energizante. Pode ser cremosa ou afiada.'),
('caramel', 'Caramel', 'Caramelo', 'gourmand', 'Sweet, buttery, slightly burnt sugar note. Comfort in a bottle.', 'Nota doce, amanteigada, acucar ligeiramente queimado.'),
('almond', 'Almond', 'Amendoa', 'gourmand', 'Sweet, nutty, slightly cherry-like note. Marzipan character.', 'Nota doce, tipo noz, ligeiramente cereja. Caracter marzipa.'),
('praline', 'Praline', 'Praline', 'gourmand', 'Caramelized nuts. Sweet, toasty, nutty warmth.', 'Nozes caramelizadas. Doce, tostado, calor de noz.'),
('coconut', 'Coconut', 'Coco', 'gourmand', 'Tropical, creamy, sweet, sunscreen-like note evoking beaches.', 'Nota tropical, cremosa, doce, tipo protetor solar evocando praia.'),

-- LEATHER
('leather', 'Leather', 'Couro', 'leather', 'Smoky, animalic, dry. Can range from refined suede to raw hide.', 'Fumado, animalico, seco. Pode variar de camurca refinada a couro cru.'),
('suede', 'Suede', 'Camurca', 'leather', 'Soft, powdery, velvety leather note. More delicate and refined.', 'Nota de couro suave, empoada, aveludada. Mais delicada e refinada.'),

-- MINERAL
('incense', 'Incense', 'Incenso', 'mineral', 'Smoky, sacred, resinous note evoking temples and rituals.', 'Nota fumada, sagrada, resinosa evocando templos e rituais.');

-- Common pairings (bidirectional)
INSERT OR IGNORE INTO ingredient_pairings (ingredient_id, pairs_with, affinity) VALUES
('bergamot', 'vetiver', 0.9), ('bergamot', 'lavender', 0.85), ('bergamot', 'pepper', 0.8),
('rose', 'oud', 0.95), ('rose', 'patchouli', 0.85), ('rose', 'vanilla', 0.8), ('rose', 'saffron', 0.9),
('jasmine', 'sandalwood', 0.9), ('jasmine', 'tuberose', 0.85), ('jasmine', 'musk', 0.8),
('vanilla', 'tonka', 0.95), ('vanilla', 'amber', 0.9), ('vanilla', 'sandalwood', 0.85), ('vanilla', 'caramel', 0.9),
('oud', 'saffron', 0.95), ('oud', 'amber', 0.85), ('oud', 'sandalwood', 0.9),
('sandalwood', 'vanilla', 0.85), ('sandalwood', 'cedar', 0.8), ('sandalwood', 'musk', 0.85),
('patchouli', 'vanilla', 0.9), ('patchouli', 'chocolate', 0.85), ('patchouli', 'amber', 0.8),
('lavender', 'vanilla', 0.7), ('lavender', 'tonka', 0.85), ('lavender', 'cedar', 0.8),
('cedar', 'vetiver', 0.85), ('cedar', 'pepper', 0.8), ('cedar', 'iris', 0.75),
('amber', 'musk', 0.9), ('amber', 'vanilla', 0.9), ('amber', 'labdanum', 0.85),
('coffee', 'vanilla', 0.9), ('coffee', 'chocolate', 0.85), ('coffee', 'tonka', 0.8),
('iris', 'violet', 0.85), ('iris', 'cedar', 0.8), ('iris', 'musk', 0.75),
('pepper', 'ambroxan', 0.85), ('pepper', 'vetiver', 0.8), ('pepper', 'cardamom', 0.85),
('cardamom', 'cedar', 0.8), ('cardamom', 'oud', 0.85), ('cardamom', 'vanilla', 0.75),
('neroli', 'musk', 0.85), ('neroli', 'cedar', 0.8), ('neroli', 'petitgrain', 0.9),
('frankincense', 'myrrh', 0.9), ('frankincense', 'labdanum', 0.85), ('frankincense', 'cedar', 0.8),
('ambroxan', 'musk', 0.9), ('ambroxan', 'cedar', 0.85), ('ambroxan', 'pepper', 0.85),
('leather', 'oud', 0.85), ('leather', 'birch', 0.9), ('leather', 'amber', 0.8),
('saffron', 'amber', 0.85), ('saffron', 'leather', 0.8);
