// Seed script for FragBase database
// Populates with 50 popular perfumes, 5 test users, and reviews

import crypto from 'crypto';

// Helper to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Test users
const users = [
  {
    id: crypto.randomUUID(),
    email: 'maria@fragbase.com',
    password_hash: hashPassword('senha123'),
    name: 'Maria Silva',
    bio: 'Apaixonada por perfumes orientais e amadeirados. Colecionadora há 10 anos.',
  },
  {
    id: crypto.randomUUID(),
    email: 'joao@fragbase.com',
    password_hash: hashPassword('senha123'),
    name: 'João Santos',
    bio: 'Perfumista amador. Prefiro fragrâncias cítricas e frescas.',
  },
  {
    id: crypto.randomUUID(),
    email: 'ana@fragbase.com',
    password_hash: hashPassword('senha123'),
    name: 'Ana Costa',
    bio: 'Adoro florais e gourmands! Sempre em busca do perfume perfeito.',
  },
  {
    id: crypto.randomUUID(),
    email: 'pedro@fragbase.com',
    password_hash: hashPassword('senha123'),
    name: 'Pedro Oliveira',
    bio: 'Especialista em fragrâncias de nicho. Aventus é vida!',
  },
  {
    id: crypto.randomUUID(),
    email: 'carla@fragbase.com',
    password_hash: hashPassword('senha123'),
    name: 'Carla Mendes',
    bio: 'Minimalista: 5 perfumes essenciais no armário. Qualidade > quantidade.',
  },
];

// 50 popular perfumes with detailed data
const perfumes = [
  {
    id: crypto.randomUUID(),
    name: 'Sauvage',
    brand: 'Dior',
    year: 2015,
    type: 'Eau de Toilette',
    notes_top: 'Bergamota, Pimenta',
    notes_heart: 'Lavanda, Gerânio, Elemi',
    notes_base: 'Ambroxan, Cedro, Labdanum',
    description: 'Um perfume masculino icônico com frescor amadeirado e especiado. Perfeito para uso diário.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    year: 2010,
    type: 'Eau de Parfum',
    notes_top: 'Limão, Hortelã, Toranja Rosa',
    notes_heart: 'Gengibre, Noz-moscada, Jasmim',
    notes_base: 'Incenso, Cedro, Sândalo, Almíscar',
    description: 'Elegância atemporal em um frasco. Aromático amadeirado sofisticado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Aventus',
    brand: 'Creed',
    year: 2010,
    type: 'Eau de Parfum',
    notes_top: 'Abacaxi, Bergamota, Maçã, Groselha Preta',
    notes_heart: 'Rosa, Bétula, Patchouli, Jasmim',
    notes_base: 'Almíscar, Carvalho, Âmbar Cinza, Baunilha',
    description: 'A lenda. Frutado, amadeirado e elegante. Símbolo de sucesso e poder.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Light Blue',
    brand: 'Dolce & Gabbana',
    year: 2001,
    type: 'Eau de Toilette',
    notes_top: 'Limão Siciliano, Maçã, Cedro',
    notes_heart: 'Bambu, Jasmim, Rosa Branca',
    notes_base: 'Cedro, Almíscar, Âmbar',
    description: 'Frescor mediterrâneo. Cítrico floral perfeito para o verão.',
  },
  {
    id: crypto.randomUUID(),
    name: '1 Million',
    brand: 'Paco Rabanne',
    year: 2008,
    type: 'Eau de Toilette',
    notes_top: 'Toranja, Hortelã, Mandarina',
    notes_heart: 'Canela, Especiarias, Rosa',
    notes_base: 'Âmbar, Couro, Patchouli, Madeira',
    description: 'Ousado e sensual. Especiado amadeirado com projeção impressionante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Acqua di Giò',
    brand: 'Giorgio Armani',
    year: 1996,
    type: 'Eau de Toilette',
    notes_top: 'Limão, Bergamota, Neroli, Tangerina',
    notes_heart: 'Jasmim, Calone, Pêssego, Fresia, Jacinto',
    notes_base: 'Cedro, Almíscar, Musgo de Carvalho, Patchouli',
    description: 'Clássico aquático. Fresco, clean e versátil.',
  },
  {
    id: crypto.randomUUID(),
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    year: 2012,
    type: 'Eau de Parfum',
    notes_top: 'Groselha Preta, Pera',
    notes_heart: 'Íris, Jasmim, Flor de Laranjeira',
    notes_base: 'Patchouli, Baunilha, Pralinê, Tonka',
    description: 'Gourmand floral irresistível. Doce, elegante e feminino.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    year: 2014,
    type: 'Eau de Parfum',
    notes_top: 'Pera, Flor de Laranjeira, Groselha Rosa',
    notes_heart: 'Café, Jasmim, Amêndoa Amarga, Alcaçuz',
    notes_base: 'Baunilha, Patchouli, Cedro, Cássia',
    description: 'Viciante. Café doce com baunilha. Perfeito para a noite.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Invictus',
    brand: 'Paco Rabanne',
    year: 2013,
    type: 'Eau de Toilette',
    notes_top: 'Toranja, Folhas de Louro, Mandarina',
    notes_heart: 'Jasmim, Folhas de Violeta',
    notes_base: 'Âmbar Cinza, Guaiaco, Musgo de Carvalho, Patchouli',
    description: 'Esportivo e vibrante. Fresco amadeirado com toque marinho.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Carolina Herrera Good Girl',
    brand: 'Carolina Herrera',
    year: 2016,
    type: 'Eau de Parfum',
    notes_top: 'Limão, Amêndoa, Café',
    notes_heart: 'Tuberosa, Jasmim Sambac, Flor de Laranjeira',
    notes_base: 'Tonka, Cacau, Baunilha, Sândalo, Almíscar',
    description: 'Dualidade em um frasco. Doce, sensual e misterioso.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Eros',
    brand: 'Versace',
    year: 2012,
    type: 'Eau de Toilette',
    notes_top: 'Hortelã, Maçã Verde, Limão',
    notes_heart: 'Tonka, Gerânio, Ambroxan',
    notes_base: 'Madagascar Vanilla, Vetiver, Musgo de Carvalho, Cedro da Virgínia',
    description: 'Paixão grega. Fresco, doce e sedutor.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Chanel No. 5',
    brand: 'Chanel',
    year: 1921,
    type: 'Eau de Parfum',
    notes_top: 'Aldeídos, Ylang-Ylang, Neroli, Bergamota, Limão',
    notes_heart: 'Íris, Jasmim, Rosa, Lírio-do-vale',
    notes_base: 'Civeta, Almíscar, Sândalo, Âmbar, Vetiver, Baunilha, Musgo',
    description: 'O perfume mais icônico do mundo. Elegância eterna.',
  },
  {
    id: crypto.randomUUID(),
    name: 'JPG Le Male',
    brand: 'Jean Paul Gaultier',
    year: 1995,
    type: 'Eau de Toilette',
    notes_top: 'Lavanda, Hortelã, Cardamomo, Bergamota',
    notes_heart: 'Canela, Cumarina, Flor de Laranjeira',
    notes_base: 'Baunilha, Tonka, Sândalo, Cedro',
    description: 'O marinheiro sensual. Lavanda baunilhada clássica.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Alien',
    brand: 'Thierry Mugler',
    year: 2005,
    type: 'Eau de Parfum',
    notes_top: 'Jasmim Sambac',
    notes_heart: 'Jasmim Sambac, Caxemira, Âmbar',
    notes_base: 'Madeira Branca, Âmbar',
    description: 'Intergaláctico. Jasmim potente e amadeirado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Polo Blue',
    brand: 'Ralph Lauren',
    year: 2003,
    type: 'Eau de Toilette',
    notes_top: 'Melão, Pepino, Mandarina, Calone',
    notes_heart: 'Basílio, Sálvia, Gerânio',
    notes_base: 'Almíscar, Patchouli, Madeiras, Âmbar',
    description: 'Aquático fresco. Perfeito para dias quentes.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    year: 2015,
    type: 'Extrait de Parfum',
    notes_top: 'Açafrão, Jasmim',
    notes_heart: 'Amberwood, Âmbar Cinza',
    notes_base: 'Resina de Abeto, Cedro',
    description: 'Luxo em estado puro. Amadeirado floral âmbar hipnotizante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Gabrielle',
    brand: 'Chanel',
    year: 2017,
    type: 'Eau de Parfum',
    notes_top: 'Grapefruit, Mandarina',
    notes_heart: 'Flor de Laranjeira, Jasmim, Ylang-Ylang, Tuberosa',
    notes_base: 'Almíscar, Sândalo, Caxemira',
    description: 'Floral solar radiante. Feminilidade moderna.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Dior Homme Intense',
    brand: 'Dior',
    year: 2007,
    type: 'Eau de Parfum',
    notes_top: 'Lavanda, Pera, Sálvia',
    notes_heart: 'Íris, Cedro da Virgínia',
    notes_base: 'Vetiver, Couro, Almíscar',
    description: 'Íris empoeirada elegante. Sofisticação máxima.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    year: 2019,
    type: 'Eau de Parfum',
    notes_top: 'Mandarina, Lavanda, Groselha Preta',
    notes_heart: 'Flor de Laranjeira, Jasmim, Lavanda',
    notes_base: 'Madagascar Vanilla, Almíscar, Cedro, Âmbar Cinza',
    description: 'Liberdade feminina. Lavanda baunilhada moderna.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    year: 2006,
    type: 'Eau de Parfum',
    notes_top: 'Trufa, Gardênia, Groselha Preta, Ylang-Ylang, Jasmim, Bergamota, Limão, Mandarina',
    notes_heart: 'Orquídea, Especiarias, Gardênia, Frutas, Ylang-Ylang',
    notes_base: 'Chocolate, Patchouli, Baunilha, Incenso, Âmbar, Sândalo, Vetiver',
    description: 'Luxo obscuro. Oriental floral denso e misterioso.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Versace Dylan Blue',
    brand: 'Versace',
    year: 2016,
    type: 'Eau de Toilette',
    notes_top: 'Grapefruit, Bergamota, Figo, Folhas de Violeta',
    notes_heart: 'Papiro, Patchouli, Folhas de Violeta',
    notes_base: 'Almíscar, Incenso, Tonka, Açafrão',
    description: 'Mediterrâneo moderno. Aromático fougère.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Prada Candy',
    brand: 'Prada',
    year: 2011,
    type: 'Eau de Parfum',
    notes_top: 'Caramelo',
    notes_heart: 'Almíscar, Benzoin',
    notes_base: 'Baunilha',
    description: 'Doçura minimalista. Caramelo baunilhado viciante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Montblanc Legend',
    brand: 'Montblanc',
    year: 2011,
    type: 'Eau de Toilette',
    notes_top: 'Lavanda, Pineapple, Bergamota, Lemon Verbena',
    notes_heart: 'Oak Moss, Geranium, Coumarin, Apple, Rose, Pomarosa',
    notes_base: 'Sandalwood, Tonka Bean, Evernyl',
    description: 'Aromático fresco versátil. Dia a dia sofisticado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Calvin Klein CK One',
    brand: 'Calvin Klein',
    year: 1994,
    type: 'Eau de Toilette',
    notes_top: 'Limão, Bergamota, Cardamomo, Pineapple, Papaya',
    notes_heart: 'Hedione, Lírio-do-vale, Jasmim, Violeta, Rosa, Nutmeg',
    notes_base: 'Âmbar, Almíscar, Cedro, Sândalo, Musgo de Carvalho',
    description: 'O unissex original. Clean e atemporal.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Gucci Guilty',
    brand: 'Gucci',
    year: 2010,
    type: 'Eau de Toilette',
    notes_top: 'Limão, Pink Pepper, Mandarina',
    notes_heart: 'Geranium, Lilac, Peach',
    notes_base: 'Patchouli, Amber',
    description: 'Rebelde e sensual. Oriental floral moderno.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Burberry Brit',
    brand: 'Burberry',
    year: 2003,
    type: 'Eau de Toilette',
    notes_top: 'Lime, Pear, Almond',
    notes_heart: 'Candied Almond, Sugar, Peony, Vanilla',
    notes_base: 'Amber, Tonka Bean, Mahogany, Vanilla',
    description: 'Doçura britânica. Gourmand aconchegante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Azzaro Pour Homme',
    brand: 'Azzaro',
    year: 1978,
    type: 'Eau de Toilette',
    notes_top: 'Lavanda, Anis, Basilico, Bergamota, Limão',
    notes_heart: 'Cardamomo, Cravo, Cedro, Iris, Vetiver, Patchouli, Sândalo',
    notes_base: 'Almíscar, Âmbar, Couro, Musgo de Carvalho',
    description: 'Clássico aromático. Masculinidade atemporal.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Lancôme Hypnôse',
    brand: 'Lancôme',
    year: 2005,
    type: 'Eau de Parfum',
    notes_top: 'Passion Flower, Jasmim',
    notes_heart: 'Vetiver',
    notes_base: 'Baunilha',
    description: 'Sedutor e misterioso. Floral amadeirado baunilhado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Hugo Boss Bottled',
    brand: 'Hugo Boss',
    year: 1998,
    type: 'Eau de Toilette',
    notes_top: 'Maçã, Bergamota, Limão, Plum, Oak moss, Gerânio, Mahogany',
    notes_heart: 'Canela, Mahogany, Cravo',
    notes_base: 'Baunilha, Sândalo, Cedro, Vetiver, Olive tree',
    description: 'Elegância corporativa. Amadeirado especiado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Narciso Rodriguez For Her',
    brand: 'Narciso Rodriguez',
    year: 2003,
    type: 'Eau de Toilette',
    notes_top: 'Flor de Laranjeira, Osmanthus',
    notes_heart: 'Âmbar, Almíscar, Patchouli',
    notes_base: 'Baunilha, Vetiver',
    description: 'Sensualidade sutil. Almíscar floral icônico.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Viktor & Rolf Flowerbomb',
    brand: 'Viktor & Rolf',
    year: 2005,
    type: 'Eau de Parfum',
    notes_top: 'Bergamota, Chá Verde, Osmanthus',
    notes_heart: 'Sambac Jasmine, Orchid, Freesia, Rosa',
    notes_base: 'Patchouli, Almíscar',
    description: 'Explosão floral. Potente e feminino.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Givenchy Gentleman',
    brand: 'Givenchy',
    year: 2017,
    type: 'Eau de Parfum',
    notes_top: 'Pera, Cardamomo, Lavanda',
    notes_heart: 'Íris, Gerânio',
    notes_base: 'Patchouli, Couro, Baunilha, Tonka',
    description: 'Cavalheiro moderno. Aromático amadeirado elegante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Hermès Terre d\'Hermès',
    brand: 'Hermès',
    year: 2006,
    type: 'Eau de Toilette',
    notes_top: 'Grapefruit, Laranja',
    notes_heart: 'Pimenta, Pelargonium, Flint',
    notes_base: 'Vetiver, Cedro, Patchouli, Benzoin',
    description: 'Terra e céu. Amadeirado cítrico mineral.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Armani Code',
    brand: 'Giorgio Armani',
    year: 2004,
    type: 'Eau de Toilette',
    notes_top: 'Limão, Bergamota',
    notes_heart: 'Flor de Laranjeira, Azeite, Star Anise',
    notes_base: 'Tonka, Tabaco, Couro',
    description: 'Sedução cifrada. Oriental amadeirado misterioso.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Valentino Donna Born in Roma',
    brand: 'Valentino',
    year: 2019,
    type: 'Eau de Parfum',
    notes_top: 'Blackcurrant, Bergamota',
    notes_heart: 'Jasmim, Baunilha',
    notes_base: 'Bourbon Vanilla',
    description: 'Roma moderna. Floral gourmand vibrante.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Issey Miyake L\'Eau d\'Issey',
    brand: 'Issey Miyake',
    year: 1992,
    type: 'Eau de Toilette',
    notes_top: 'Lotus, Melon, Freesia, Cyclamen, Coriander, Rose Water',
    notes_heart: 'Peony, Lily, Carnation',
    notes_base: 'Osmanthus, Tuberose, Amberseed, Cedarwood, Sandalwood, Musk',
    description: 'Água pura. Aquático floral minimalista.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Abercrombie & Fitch Fierce',
    brand: 'Abercrombie & Fitch',
    year: 2002,
    type: 'Cologne',
    notes_top: 'Lemon, Orange, Petitgrain, Cardamom, Fir',
    notes_heart: 'Rosemary, Jasmine, Rose, Lily-of-the-Valley',
    notes_base: 'Musk, Oakmoss, Vetiver, Brazilian Rosewood',
    description: 'Confiança jovem. Fresco amadeirado icônico.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Chloé Eau de Parfum',
    brand: 'Chloé',
    year: 2008,
    type: 'Eau de Parfum',
    notes_top: 'Peony, Freesia, Lychee',
    notes_heart: 'Magnolia, Lily-of-the-Valley, Rose',
    notes_base: 'Cedarwood, Amber',
    description: 'Feminilidade parisiense. Floral romântico.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Davidoff Cool Water',
    brand: 'Davidoff',
    year: 1988,
    type: 'Eau de Toilette',
    notes_top: 'Lavender, Mint, Coriander, Green Notes',
    notes_heart: 'Jasmine, Sandalwood, Neroli, Geranium',
    notes_base: 'Cedarwood, Musk, Oakmoss, Tobacco, Amber',
    description: 'O aquático pioneiro. Fresco e clean.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Paco Rabanne Olympéa',
    brand: 'Paco Rabanne',
    year: 2015,
    type: 'Eau de Parfum',
    notes_top: 'Water Jasmine, Ginger Flower, Mandarin Orange, Green Tangerine',
    notes_heart: 'Salted Vanilla, Vanilla',
    notes_base: 'Cashmere Wood, Sandalwood, Ambergris',
    description: 'Deusa moderna. Oriental floral salgado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Dior Sauvage Elixir',
    brand: 'Dior',
    year: 2021,
    type: 'Elixir',
    notes_top: 'Nutmeg, Cinnamon, Cardamom, Grapefruit',
    notes_heart: 'Lavender',
    notes_base: 'Licorice, Sandalwood, Amber, Patchouli, Haitian Vetiver',
    description: 'Sauvage supremo. Especiado amadeirado intenso.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Armaf Club De Nuit Intense',
    brand: 'Armaf',
    year: 2015,
    type: 'Eau de Toilette',
    notes_top: 'Lemon, Pineapple, Bergamot, Blackcurrant, Apple',
    notes_heart: 'Birch, Patchouli, Rose, Jasmine',
    notes_base: 'Musk, Oakmoss, Ambergris, Vanilla',
    description: 'Alternativa acessível. Frutado amadeirado potente.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Dolce & Gabbana The One',
    brand: 'Dolce & Gabbana',
    year: 2006,
    type: 'Eau de Parfum',
    notes_top: 'Bergamot, Mandarin Orange, Peach, Lychee',
    notes_heart: 'Lily, Plum, Jasmine, Lily-of-the-Valley',
    notes_base: 'Vanilla, Musk, Amber, Vetiver',
    description: 'O único. Oriental floral elegante e sensual.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Mancera Cedrat Boise',
    brand: 'Mancera',
    year: 2011,
    type: 'Eau de Parfum',
    notes_top: 'Citron, Blackcurrant, Spanish Labdanum',
    notes_heart: 'Fruits, Patchouli, Jasmine',
    notes_base: 'Vanilla, White Musk, Sandalwood, Leather, Oakmoss',
    description: 'Nicho acessível. Cítrico amadeirado versátil.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Burberry Her',
    brand: 'Burberry',
    year: 2018,
    type: 'Eau de Parfum',
    notes_top: 'Sour Cherry, Blackberry, Strawberry, Raspberry, Mandarin Orange, Lemon',
    notes_heart: 'Violet, Jasmine',
    notes_base: 'Vanilla, Amber, Dry Wood, Cashmeran, Musk',
    description: 'Londres vibrante. Frutas vermelhas gourmand.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Creed Silver Mountain Water',
    brand: 'Creed',
    year: 1995,
    type: 'Eau de Parfum',
    notes_top: 'Mandarin, Bergamot',
    notes_heart: 'Green Tea, Blackcurrant',
    notes_base: 'Musk, Sandalwood',
    description: 'Alpes suíços. Aquático metálico fresco.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Memo Paris Irish Leather',
    brand: 'Memo Paris',
    year: 2013,
    type: 'Eau de Parfum',
    notes_top: 'Pink Pepper, Clary Sage, Juniper Berry',
    notes_heart: 'Leather, Mate',
    notes_base: 'Tonka Bean, Amber, Musk',
    description: 'Irlanda selvagem. Couro verde único.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Maison Margiela Replica Jazz Club',
    brand: 'Maison Margiela',
    year: 2013,
    type: 'Eau de Toilette',
    notes_top: 'Pink Pepper, Primofiore Lemon, Neroli',
    notes_heart: 'Clary Sage, Java Vetiver Oil, Tobacco Leaf',
    notes_base: 'Vanilla Bean, Styrax Resin, Cashmeran',
    description: 'Nova York anos 50. Tabaco baunilhado sofisticado.',
  },
  {
    id: crypto.randomUUID(),
    name: 'Parfums de Marly Layton',
    brand: 'Parfums de Marly',
    year: 2016,
    type: 'Eau de Parfum',
    notes_top: 'Apple, Lavender, Mandarin Orange, Bergamot',
    notes_heart: 'Geranium, Violet, Jasmine',
    notes_base: 'Vanilla, Cardamom, Sandalwood, Pepper, Guaiac Wood, Patchouli',
    description: 'Realeza perfumada. Aromático baunilhado luxuoso.',
  },
];

// Generate SQL INSERT statements
export function generateSeedSQL() {
  let sql = '-- FragBase Seed Data\n-- 50 perfumes + 5 users\n\n';

  // Insert users
  sql += '-- Users\n';
  users.forEach(user => {
    sql += `INSERT INTO users (id, email, password_hash, name, bio) VALUES ('${user.id}', '${user.email}', '${user.password_hash}', '${user.name}', '${user.bio}');\n`;
  });

  sql += '\n-- Perfumes\n';
  perfumes.forEach(perfume => {
    const name = perfume.name.replace(/'/g, "''");
    const brand = perfume.brand.replace(/'/g, "''");
    const notesTop = perfume.notes_top.replace(/'/g, "''");
    const notesHeart = perfume.notes_heart.replace(/'/g, "''");
    const notesBase = perfume.notes_base.replace(/'/g, "''");
    const desc = perfume.description.replace(/'/g, "''");
    
    sql += `INSERT INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description) VALUES ('${perfume.id}', '${name}', '${brand}', ${perfume.year}, '${perfume.type}', '${notesTop}', '${notesHeart}', '${notesBase}', '${desc}');\n`;
  });

  // Create some reviews (each user reviews 10-15 perfumes)
  sql += '\n-- Reviews\n';
  const reviewTexts = [
    'Simplesmente perfeito! Uso diariamente.',
    'Adorei a projeção e durabilidade. Vale cada centavo.',
    'Muito bom para o verão, fresco e agradável.',
    'Não é para mim, mas entendo quem gosta.',
    'Obra-prima! Um dos melhores que já usei.',
    'Bom custo-benefício, recomendo.',
    'Esperava mais... achei enjoativo.',
    'Clássico atemporal, nunca falha.',
    'Perfeito para ocasiões especiais.',
    'Uso no dia a dia, muito versátil.',
    'Projeção insana! Cuidado com a quantidade.',
    'Sofisticado e elegante, adoro.',
    'Não vale o preço, existem melhores.',
    'Viciante! Não consigo parar de cheirar.',
    'Leve e discreto, gosto muito.',
  ];

  let reviewIndex = 0;
  users.forEach((user, userIdx) => {
    const startIdx = userIdx * 10;
    const reviewCount = 10 + Math.floor(Math.random() * 6); // 10-15 reviews per user
    
    for (let i = 0; i < reviewCount && (startIdx + i) < perfumes.length; i++) {
      const perfume = perfumes[startIdx + i];
      const reviewId = crypto.randomUUID();
      const rating = 3 + Math.floor(Math.random() * 3); // 3-5 stars
      const longevity = 2 + Math.floor(Math.random() * 4); // 2-5
      const performance = 2 + Math.floor(Math.random() * 4);
      const sillage = 2 + Math.floor(Math.random() * 4);
      const value = 2 + Math.floor(Math.random() * 4);
      const text = reviewTexts[reviewIndex % reviewTexts.length].replace(/'/g, "''");
      reviewIndex++;
      
      sql += `INSERT INTO reviews (id, perfume_id, user_id, rating, longevity, performance, sillage, value, text) VALUES ('${reviewId}', '${perfume.id}', '${user.id}', ${rating}, ${longevity}, ${performance}, ${sillage}, ${value}, '${text}');\n`;
    }
  });

  // Create some follows (users follow each other)
  sql += '\n-- Follows\n';
  users.forEach((follower, i) => {
    users.forEach((followed, j) => {
      if (i !== j && Math.random() > 0.3) { // 70% chance of follow
        sql += `INSERT INTO follows (follower_id, followed_id) VALUES ('${follower.id}', '${followed.id}');\n`;
      }
    });
  });

  // Create some posts
  sql += '\n-- Posts\n';
  const postTexts = [
    'Acabei de descobrir este perfume incrível! 😍',
    'Minha coleção cresceu mais um pouco hoje...',
    'Alguém já experimentou este? Vale a pena?',
    'Meu perfume favorito para o inverno! ❄️',
    'Nada supera um clássico bem feito.',
    'Procurando recomendações de perfumes frescos para o verão!',
    'Este aqui é viciante, não consigo parar de usar! 🌸',
    'Acabei de fazer um unboxing incrível!',
  ];

  users.forEach((user, idx) => {
    const postCount = 2 + Math.floor(Math.random() * 3); // 2-4 posts per user
    for (let i = 0; i < postCount; i++) {
      const postId = crypto.randomUUID();
      const text = postTexts[(idx * postCount + i) % postTexts.length].replace(/'/g, "''");
      const perfumeId = Math.random() > 0.4 ? `'${perfumes[Math.floor(Math.random() * perfumes.length)].id}'` : 'NULL';
      
      sql += `INSERT INTO posts (id, user_id, perfume_id, text) VALUES ('${postId}', '${user.id}', ${perfumeId}, '${text}');\n`;
    }
  });

  return sql;
}

// Write to file
const sql = generateSeedSQL();
console.log(sql);
