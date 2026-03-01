-- Migration 030: Additional Ingredients & Pairings
-- 30 new real perfume ingredients + 40 complementary pairings

-- CITRUS (3)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('yuzu', 'Yuzu', 'Yuzu', 'citrus', 'Japanese citrus, sharp and aromatic with a complex, tart grapefruit-mandarin character.', 'Citrino japones, afiado e aromatico com caracter complexo de toranja-tangerina.'),
('lime', 'Lime', 'Lima', 'citrus', 'Bright, green, tart citrus with a sparkling zesty freshness.', 'Citrino brilhante, verde e azedo com frescura efervescente.'),
('blood_orange', 'Blood Orange', 'Laranja Sanguinea', 'citrus', 'Rich, berry-sweet citrus with a deeper, more complex character than regular orange.', 'Citrino rico e doce-baga com caracter mais profundo e complexo que a laranja comum.');

-- FLORAL (5)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('gardenia', 'Gardenia', 'Gardenia', 'floral', 'Creamy, sweet tropical white flower with a lush, buttery, intoxicating aroma.', 'Flor branca tropical cremosa e doce com aroma luxuoso, amanteigado e inebriante.'),
('lotus', 'Lotus', 'Lotus', 'floral', 'Watery, clean, slightly sweet aquatic flower with a meditative, serene quality.', 'Flor aquatica, limpa, ligeiramente doce com qualidade meditativa e serena.'),
('osmanthus', 'Osmanthus', 'Osmanthus', 'floral', 'Fruity-floral, apricot-like precious flower prized in Chinese perfumery traditions.', 'Flor preciosa frutada-floral, tipo damasco, apreciada nas tradicoes de perfumaria chinesa.'),
('heliotrope', 'Heliotrope', 'Heliotropo', 'floral', 'Sweet, powdery flower with a distinctive cherry-almond, marzipan-like scent.', 'Flor doce e empoada com aroma distinto de cereja-amendoa, tipo marzipa.'),
('frangipani', 'Frangipani', 'Frangipani', 'floral', 'Tropical, sweet, creamy exotic flower evoking island paradises and warm breezes.', 'Flor exotica tropical, doce e cremosa evocando paraisos insulares e brisas quentes.');

-- FRUITY (4)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('plum', 'Plum', 'Ameixa', 'fruity', 'Dark, jammy, wine-like stone fruit with a rich, sensual depth.', 'Fruta de caroco escura, tipo compota, vinosa com profundidade rica e sensual.'),
('fig', 'Fig', 'Figo', 'fruity', 'Green, milky, slightly sweet Mediterranean fruit with a creamy, lactonic quality.', 'Fruta mediterranea verde, leitosa, ligeiramente doce com qualidade cremosa e lactonica.'),
('lychee', 'Lychee', 'Lichia', 'fruity', 'Sweet, floral, tropical fruit with a delicate rosy, translucent character.', 'Fruta tropical doce e floral com caracter delicado rosado e translucido.'),
('pomegranate', 'Pomegranate', 'Roma', 'fruity', 'Tart, juicy, red fruit with a sparkling, slightly tannic, ruby-like character.', 'Fruta vermelha azeda e suculenta com caracter efervescente e ligeiramente tanico.');

-- WOODY (3) + GREEN (1)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('cypress', 'Cypress', 'Cipreste', 'woody', 'Clean, evergreen, resinous wood with a sharp, Mediterranean aromatic character.', 'Madeira limpa, perene e resinosa com caracter aromatico mediterraneo afiado.'),
('bamboo', 'Bamboo', 'Bambu', 'green', 'Fresh, clean, watery green note evoking zen gardens and tranquil spaces.', 'Nota verde fresca, limpa e aquosa evocando jardins zen e espacos tranquilos.'),
('teak', 'Teak', 'Teca', 'woody', 'Warm, rich, slightly oily tropical wood with a refined, sophisticated dryness.', 'Madeira tropical quente, rica e ligeiramente oleosa com secura refinada e sofisticada.'),
('driftwood', 'Driftwood', 'Madeira a Deriva', 'woody', 'Salty, weathered, mineral wood evoking coastal landscapes and ocean-bleached timber.', 'Madeira salgada, desgastada e mineral evocando paisagens costeiras e madeira branqueada pelo oceano.');

-- SPICY (3)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('clove', 'Clove', 'Cravo', 'spicy', 'Warm, sweet, slightly medicinal spice with a deep, numbing, eugenol-rich character.', 'Especiaria quente, doce, ligeiramente medicinal com caracter profundo rico em eugenol.'),
('star_anise', 'Star Anise', 'Anis Estrelado', 'spicy', 'Sweet, licorice-like warm spice with an exotic, slightly mysterious character.', 'Especiaria quente doce, tipo alcacuz com caracter exotico e ligeiramente misterioso.'),
('cumin', 'Cumin', 'Cominho', 'spicy', 'Warm, earthy, slightly sweaty spice that adds raw, animalic depth to compositions.', 'Especiaria quente, terrosa que adiciona profundidade crua e animalica as composicoes.');

-- GOURMAND (3)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('honey', 'Honey', 'Mel', 'gourmand', 'Sweet, warm, slightly animalic golden nectar with a rich, beeswax-like depth.', 'Nectar dourado doce, quente, ligeiramente animalico com profundidade tipo cera de abelha.'),
('milk', 'Milk', 'Leite', 'gourmand', 'Creamy, soft, comforting lactonic note evoking warmth and nurturing tenderness.', 'Nota lactonica cremosa, suave e reconfortante evocando calor e ternura.'),
('pistachio', 'Pistachio', 'Pistache', 'gourmand', 'Sweet, nutty, slightly green richness with a distinctive creamy, marzipan-like warmth.', 'Riqueza doce, tipo noz, ligeiramente verde com calor cremoso distinto tipo marzipa.');

-- OTHER (8)
INSERT OR IGNORE INTO ingredients (id, name, name_pt, category, description, description_pt) VALUES
('tobacco', 'Tobacco', 'Tabaco', 'woody', 'Rich, sweet, smoky dried leaf with a complex, aromatic, slightly honeyed warmth.', 'Folha seca rica, doce e fumada com calor complexo, aromatico e ligeiramente mel.'),
('fig_leaf', 'Fig Leaf', 'Folha de Figueira', 'green', 'Green, coconut-like, lactonic leaf with a fresh, creamy, slightly woody character.', 'Folha verde, tipo coco, lactonica com caracter fresco, cremoso e ligeiramente lenhoso.'),
('moss', 'Oakmoss', 'Musgo de Carvalho', 'green', 'Earthy, damp, mossy forest floor note. The backbone of classic chypre compositions.', 'Nota terrosa, humida de chao de floresta musgoso. A espinha dorsal das composicoes chypre classicas.'),
('orris_root', 'Orris Root', 'Raiz de Iris', 'floral', 'Buttery, powdery, expensive violet-rooty note. One of the most precious perfumery materials.', 'Nota amanteigada, empoada, cara tipo raiz de violeta. Um dos materiais mais preciosos da perfumaria.'),
('white_pepper', 'White Pepper', 'Pimenta Branca', 'spicy', 'Clean, sharp, less pungent pepper with a refined, woody, slightly musty warmth.', 'Pimenta limpa, afiada, menos pungente com calor refinado, lenhoso e ligeiramente mofado.'),
('marine_notes', 'Marine Notes', 'Notas Marinhas', 'aquatic', 'Clean, ozonic, watery freshness evoking ocean spray and coastal air.', 'Frescura limpa, ozonica e aquosa evocando spray oceanico e ar costeiro.'),
('styrax', 'Styrax', 'Estoraque', 'resinous', 'Sweet, balsamic, leathery resin with a warm, cinnamon-like, slightly smoky character.', 'Resina doce, balsamica e couro com caracter quente, tipo canela, ligeiramente fumado.'),
('elemi', 'Elemi', 'Elemi', 'resinous', 'Fresh, lemony, peppery resin with an uplifting, slightly piney, incense-like quality.', 'Resina fresca, limonada e apimentada com qualidade elevante, ligeiramente pinheiro.');

-- 40 new complementary pairings
INSERT OR IGNORE INTO ingredient_pairings (ingredient_id, pairs_with, affinity) VALUES
-- Yuzu pairings
('yuzu', 'bergamot', 0.85), ('yuzu', 'green_tea', 0.8),
-- Fig pairings
('fig', 'coconut', 0.8), ('fig', 'cedar', 0.75),
-- Tobacco pairings
('tobacco', 'vanilla', 0.9), ('tobacco', 'leather', 0.85), ('tobacco', 'honey', 0.85),
-- Honey pairings
('honey', 'amber', 0.85), ('honey', 'vanilla', 0.9), ('honey', 'rose', 0.75),
-- Plum pairings
('plum', 'amber', 0.8), ('plum', 'rose', 0.75),
-- Clove pairings
('clove', 'cinnamon', 0.9), ('clove', 'vanilla', 0.8), ('clove', 'oud', 0.85),
-- Moss pairings
('moss', 'patchouli', 0.85), ('moss', 'lavender', 0.9), ('moss', 'cedar', 0.8),
-- Gardenia pairings
('gardenia', 'jasmine', 0.85), ('gardenia', 'tuberose', 0.8),
-- Osmanthus pairings
('osmanthus', 'peach', 0.8), ('osmanthus', 'leather', 0.7),
-- Lotus pairings
('lotus', 'water_notes', 0.85), ('lotus', 'green_tea', 0.8),
-- Fig leaf pairings
('fig_leaf', 'coconut', 0.85), ('fig_leaf', 'fig', 0.95),
-- Orris root pairings
('orris_root', 'iris', 0.95), ('orris_root', 'violet', 0.85), ('orris_root', 'musk', 0.8),
-- Pistachio pairings
('pistachio', 'almond', 0.85), ('pistachio', 'praline', 0.8),
-- Milk pairings
('milk', 'vanilla', 0.9), ('milk', 'caramel', 0.85),
-- Tobacco-wood pairings
('tobacco', 'cedar', 0.8), ('tobacco', 'oud', 0.85),
-- Lychee pairings
('lychee', 'rose', 0.8), ('lychee', 'raspberry', 0.75),
-- Cypress pairings
('cypress', 'cedar', 0.85), ('cypress', 'vetiver', 0.8),
-- Star anise pairings
('star_anise', 'vanilla', 0.75), ('star_anise', 'cinnamon', 0.8),
-- Marine notes pairings
('marine_notes', 'sea_salt', 0.9), ('marine_notes', 'water_notes', 0.85);
