// Additional perfumes - Wave 2
import crypto from 'crypto';

export const additionalPerfumes = [
  // VERSACE
  {
    id: crypto.randomUUID(),
    name: "Eros",
    brand: "Versace",
    year: 2012,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.16657.jpg",
    perfumer: "Aurélien Guichard",
    description: "Eros is a fragrance for a strong, passionate man, who is master of himself. Fresh, woody and slightly oriental, the fragrance combines the sweetness of mint with Italian lemon zest, and tonka bean with Venezuelan ambroxan.",
    concentration: "Eau de Toilette",
    main_accords: [
      {name: "fresh", strength: 100},
      {name: "sweet", strength: 85},
      {name: "aromatic", strength: 80},
      {name: "vanilla", strength: 75},
      {name: "woody", strength: 70},
      {name: "citrus", strength: 65}
    ],
    notes: {
      top: ["Mint", "Green Apple", "Lemon"],
      middle: ["Tonka Bean", "Geranium", "Ambroxan"],
      base: ["Madagascar Vanilla", "Vetiver", "Oakmoss", "Virginia Cedar"]
    },
    ratings_breakdown: { love: 5200, like: 2800, ok: 1100, dislike: 450, hate: 250 },
    votes_count: 9800,
    when_to_wear: { winter: 2100, spring: 3200, summer: 2800, fall: 2400, day: 4500, night: 5300 },
    pros: ["Great for young men", "Sweet and fresh balance", "Good performance", "Affordable designer"],
    cons: ["Can be too sweet", "Very popular/common", "Synthetic smell to some", "Not very mature"]
  },

  // JEAN PAUL GAULTIER
  {
    id: crypto.randomUUID(),
    name: "Le Male",
    brand: "Jean Paul Gaultier",
    year: 1995,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.124.jpg",
    perfumer: "Francis Kurkdjian",
    description: "Le Male celebrates the archetypal symbolic man. His weapon of seduction is his legendary fragrance. The powerfully fresh mint is heightened by the traditional lavender with its aromatic accents. The vanilla blends with the sensuous warmth of tonka bean.",
    concentration: "Eau de Toilette",
    main_accords: [
      {name: "aromatic", strength: 100},
      {name: "vanilla", strength: 95},
      {name: "sweet", strength: 85},
      {name: "powdery", strength: 75},
      {name: "fresh", strength: 70}
    ],
    notes: {
      top: ["Lavender", "Mint", "Cardamom", "Bergamot"],
      middle: ["Cinnamon", "Cumin", "Orange Blossom"],
      base: ["Vanilla", "Tonka Bean", "Sandalwood", "Cedar"]
    },
    ratings_breakdown: { love: 6800, like: 3200, ok: 1400, dislike: 680, hate: 420 },
    votes_count: 12500,
    when_to_wear: { winter: 4200, spring: 2800, summer: 1800, fall: 3700, day: 4200, night: 8300 },
    pros: ["Timeless classic", "Unique lavender-vanilla", "Great longevity", "Iconic bottle"],
    cons: ["Can be too sweet", "Might smell old-fashioned", "Heavy for summer", "Polarizing"]
  },

  // PACO RABANNE
  {
    id: crypto.randomUUID(),
    name: "1 Million",
    brand: "Paco Rabanne",
    year: 2008,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.3747.jpg",
    perfumer: "Christophe Raynaud, Olivier Pescheux, Michel Girard",
    description: "1 Million is a spicy leather fragrance with blood mandarin, grapefruit, mint, and rose. The base combines leather, white wood, amber, and patchouli.",
    concentration: "Eau de Toilette",
    main_accords: [
      {name: "sweet", strength: 95},
      {name: "warm spicy", strength: 90},
      {name: "citrus", strength: 75},
      {name: "woody", strength: 70},
      {name: "amber", strength: 65}
    ],
    notes: {
      top: ["Grapefruit", "Mint", "Blood Mandarin"],
      middle: ["Cinnamon", "Spicy Notes", "Rose"],
      base: ["Leather", "Woody Notes", "Amber", "Patchouli"]
    },
    ratings_breakdown: { love: 4200, like: 3100, ok: 1800, dislike: 920, hate: 580 },
    votes_count: 10600,
    when_to_wear: { winter: 3200, spring: 2400, summer: 1400, fall: 3600, day: 3800, night: 6800 },
    pros: ["Attention grabbing", "Good projection", "Sweet and spicy", "Party scent"],
    cons: ["Very common", "Can be cloying", "Not sophisticated", "Overused in clubs"]
  },

  // YSL
  {
    id: crypto.randomUUID(),
    name: "Y Eau de Parfum",
    brand: "Yves Saint Laurent",
    year: 2018,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.52893.jpg",
    perfumer: "Dominique Ropion",
    description: "Y EDP is the ultimate freedom cologne by Yves Saint Laurent. A white and dark fougère created for the fearless. This masculine perfume is for those who live their dreams for real.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "aromatic", strength: 95},
      {name: "fresh spicy", strength: 85},
      {name: "woody", strength: 80},
      {name: "fruity", strength: 70},
      {name: "sweet", strength: 65}
    ],
    notes: {
      top: ["Apple", "Ginger", "Bergamot"],
      middle: ["Sage", "Juniper Berries", "Geranium"],
      base: ["Amberwood", "Tonka Bean", "Cedar", "Vetiver", "Olibanum"]
    },
    ratings_breakdown: { love: 3800, like: 2200, ok: 980, dislike: 340, hate: 180 },
    votes_count: 7500,
    when_to_wear: { winter: 2100, spring: 2800, summer: 1200, fall: 2600, day: 4200, night: 3300 },
    pros: ["Versatile", "Modern fresh aromatic", "Good performance", "Safe compliment getter"],
    cons: ["Not unique", "Can be generic", "Similar to many others", "Sweetness can be too much"]
  },

  // DOLCE & GABBANA
  {
    id: crypto.randomUUID(),
    name: "The One",
    brand: "Dolce & Gabbana",
    year: 2006,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.2825.jpg",
    perfumer: "Olivier Polge",
    description: "The One is a sophisticated oriental woody fragrance with tobacco, amber, and spices. Elegant and masculine, perfect for evening wear.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "warm spicy", strength: 95},
      {name: "sweet", strength: 85},
      {name: "tobacco", strength: 80},
      {name: "woody", strength: 75},
      {name: "aromatic", strength: 65}
    ],
    notes: {
      top: ["Grapefruit", "Coriander", "Basil"],
      middle: ["Cardamom", "Ginger", "Orange Blossom"],
      base: ["Cedarwood", "Ambergris", "Tobacco"]
    },
    ratings_breakdown: { love: 5600, like: 2900, ok: 1200, dislike: 420, hate: 280 },
    votes_count: 10400,
    when_to_wear: { winter: 4200, spring: 2100, summer: 1100, fall: 3800, day: 2800, night: 7600 },
    pros: ["Sophisticated", "Perfect date scent", "Warm and inviting", "Timeless"],
    cons: ["Weak performance", "Needs reapplication", "Not long-lasting", "Gets better with age"]
  },

  // ARMANI
  {
    id: crypto.randomUUID(),
    name: "Acqua di Giò Profumo",
    brand: "Giorgio Armani",
    year: 2015,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.31675.jpg",
    perfumer: "Alberto Morillas",
    description: "Acqua di Giò Profumo is an aquatic aromatic fragrance that combines marine notes with incense, patchouli, and bergamot. Deeper and more intense than the original.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "aquatic", strength: 100},
      {name: "aromatic", strength: 90},
      {name: "woody", strength: 80},
      {name: "fresh", strength: 75},
      {name: "smoky", strength: 65}
    ],
    notes: {
      top: ["Bergamot", "Sea Notes"],
      middle: ["Geranium", "Rosemary", "Sage"],
      base: ["Patchouli", "Incense"]
    },
    ratings_breakdown: { love: 6200, like: 2800, ok: 980, dislike: 320, hate: 200 },
    votes_count: 10500,
    when_to_wear: { winter: 1800, spring: 3400, summer: 3200, fall: 2900, day: 5800, night: 4700 },
    pros: ["Better than original ADG", "Excellent performance", "Sophisticated aquatic", "Very versatile"],
    cons: ["Expensive", "Can be too aquatic", "Common in offices", "Overused"]
  },

  // CHANEL
  {
    id: crypto.randomUUID(),
    name: "Bleu de Chanel Parfum",
    brand: "Chanel",
    year: 2018,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.46149.jpg",
    perfumer: "Olivier Polge",
    description: "Bleu de Chanel Parfum is the most intense and sophisticated version of the Bleu line. A woody aromatic fragrance with sandalwood, cedar, and tonka bean.",
    concentration: "Parfum",
    main_accords: [
      {name: "woody", strength: 100},
      {name: "aromatic", strength: 90},
      {name: "citrus", strength: 75},
      {name: "warm spicy", strength: 70},
      {name: "fresh", strength: 65}
    ],
    notes: {
      top: ["Lemon", "Mint", "Pink Pepper", "Grapefruit"],
      middle: ["Ginger", "Nutmeg", "Jasmine"],
      base: ["Incense", "Cedar", "Sandalwood", "Tonka Bean", "Patchouli"]
    },
    ratings_breakdown: { love: 7200, like: 2900, ok: 980, dislike: 320, hate: 200 },
    votes_count: 11600,
    when_to_wear: { winter: 3800, spring: 3200, summer: 1800, fall: 4200, day: 5200, night: 6400 },
    pros: ["Most refined BDC", "Excellent longevity", "Very sophisticated", "Safe for all occasions"],
    cons: ["Very expensive", "Too safe/generic for some", "Similar to EDT", "Not unique"]
  },

  // GIVENCHY
  {
    id: crypto.randomUUID(),
    name: "Gentleman",
    brand: "Givenchy",
    year: 2017,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.42157.jpg",
    perfumer: "Olivier Cresp, Nathalie Lorson",
    description: "Gentleman is an aromatic woody fragrance with iris, patchouli, and vanilla. Modern elegance for the contemporary gentleman.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "aromatic", strength: 95},
      {name: "woody", strength: 85},
      {name: "powdery", strength: 75},
      {name: "sweet", strength: 70},
      {name: "vanilla", strength: 65}
    ],
    notes: {
      top: ["Pear", "Cardamom", "Lavender"],
      middle: ["Iris", "Geranium"],
      base: ["Patchouli", "Leather", "Vanilla", "Tonka Bean"]
    },
    ratings_breakdown: { love: 4200, like: 2100, ok: 850, dislike: 280, hate: 170 },
    votes_count: 7600,
    when_to_wear: { winter: 2800, spring: 2200, summer: 980, fall: 2900, day: 3200, night: 4400 },
    pros: ["Sophisticated iris", "Elegant and classy", "Great for office", "Refined"],
    cons: ["Can be too powdery", "Not for everyone", "Performance varies", "Iris can be polarizing"]
  },

  // CAROLINA HERRERA
  {
    id: crypto.randomUUID(),
    name: "Good Girl",
    brand: "Carolina Herrera",
    year: 2016,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.37328.jpg",
    perfumer: "Louise Turner, Clément Gavarry",
    description: "Good Girl is a captivating oriental floral fragrance. It's sexy, bold, and intriguing with notes of jasmine, tuberose, tonka, and cocoa.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "sweet", strength: 100},
      {name: "floral", strength: 90},
      {name: "vanilla", strength: 85},
      {name: "warm spicy", strength: 75},
      {name: "powdery", strength: 70}
    ],
    notes: {
      top: ["Almond", "Coffee", "Lemon"],
      middle: ["Tuberose", "Jasmine Sambac", "Orange Blossom"],
      base: ["Tonka Bean", "Cacao", "Vanilla", "Sandalwood", "Musk"]
    },
    ratings_breakdown: { love: 7200, like: 3100, ok: 1200, dislike: 580, hate: 420 },
    votes_count: 12500,
    when_to_wear: { winter: 5200, spring: 2800, summer: 1400, fall: 4600, day: 3800, night: 8700 },
    pros: ["Iconic shoe bottle", "Addictive scent", "Great longevity", "Compliment magnet"],
    cons: ["Very sweet", "Can be cloying", "Not for daytime", "Headache-inducing for some"]
  },

  // YSL WOMEN
  {
    id: crypto.randomUUID(),
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    year: 2014,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.22767.jpg",
    perfumer: "Nathalie Lorson, Marie Salamagne, Honorine Blanc, Olivier Cresp",
    description: "Black Opium is a glowing floral and oriental fragrance with coffee, vanilla, and white flowers. Addictive and seductive.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "sweet", strength: 100},
      {name: "vanilla", strength: 95},
      {name: "warm spicy", strength: 85},
      {name: "floral", strength: 75},
      {name: "powdery", strength: 70}
    ],
    notes: {
      top: ["Pear", "Pink Pepper", "Orange Blossom"],
      middle: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
      base: ["Vanilla", "Patchouli", "Cedarwood", "Cashmere Wood"]
    },
    ratings_breakdown: { love: 9800, like: 3800, ok: 1400, dislike: 720, hate: 580 },
    votes_count: 16300,
    when_to_wear: { winter: 7200, spring: 3200, summer: 1200, fall: 6400, day: 4200, night: 12100 },
    pros: ["Addictive coffee-vanilla", "Beast mode performance", "Perfect for nights out", "Very popular"],
    cons: ["Extremely sweet", "Can be overwhelming", "Very common", "Not versatile"]
  },

  // LANCÔME
  {
    id: crypto.randomUUID(),
    name: "La Vie Est Belle",
    brand: "Lancôme",
    year: 2012,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.14982.jpg",
    perfumer: "Olivier Polge, Dominique Ropion, Anne Flipo",
    description: "La Vie Est Belle is a gourmand floral fragrance with iris, patchouli, and praline. The scent of happiness and freedom.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "sweet", strength: 100},
      {name: "floral", strength: 90},
      {name: "vanilla", strength: 85},
      {name: "powdery", strength: 80},
      {name: "fruity", strength: 70}
    ],
    notes: {
      top: ["Blackcurrant", "Pear"],
      middle: ["Iris", "Jasmine", "Orange Blossom"],
      base: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"]
    },
    ratings_breakdown: { love: 8600, like: 3800, ok: 1600, dislike: 820, hate: 680 },
    votes_count: 15500,
    when_to_wear: { winter: 5800, spring: 3800, summer: 2100, fall: 5200, day: 6200, night: 9300 },
    pros: ["Iconic sweet floral", "Great longevity", "Elegant and feminine", "Popular for a reason"],
    cons: ["Very sweet", "Can be cloying", "Extremely common", "Not unique anymore"]
  },

  // VIKTOR & ROLF
  {
    id: crypto.randomUUID(),
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    year: 2005,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.1459.jpg",
    perfumer: "Olivier Polge, Carlos Benaïm, Domitille Bertier",
    description: "Flowerbomb is a floral explosion, a bouquet of sambac jasmine, centifolia rose, cattleya orchid, and ballerina freesia.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "floral", strength: 100},
      {name: "sweet", strength: 90},
      {name: "powdery", strength: 80},
      {name: "vanilla", strength: 75},
      {name: "fruity", strength: 65}
    ],
    notes: {
      top: ["Bergamot", "Green Tea", "Osmanthus"],
      middle: ["Sambac Jasmine", "Orchid", "Freesia", "Rose"],
      base: ["Patchouli", "Musk"]
    },
    ratings_breakdown: { love: 8200, like: 3400, ok: 1300, dislike: 680, hate: 520 },
    votes_count: 14100,
    when_to_wear: { winter: 4800, spring: 4200, summer: 2200, fall: 4600, day: 5800, night: 8300 },
    pros: ["Powerful floral bomb", "Excellent longevity", "Very feminine", "Timeless"],
    cons: ["Very strong", "Can be headache-inducing", "Too sweet for some", "Overused"]
  },

  // CHANEL WOMEN
  {
    id: crypto.randomUUID(),
    name: "Coco Mademoiselle",
    brand: "Chanel",
    year: 2001,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    perfumer: "Jacques Polge",
    description: "Coco Mademoiselle is an oriental fragrance with a fresh citrus top, a sensual heart of rose and jasmine, and a warm base of patchouli and vanilla.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "citrus", strength: 95},
      {name: "floral", strength: 90},
      {name: "sweet", strength: 80},
      {name: "vanilla", strength: 75},
      {name: "powdery", strength: 70}
    ],
    notes: {
      top: ["Orange", "Mandarin Orange", "Orange Blossom", "Bergamot"],
      middle: ["Mimosa", "Jasmine", "Turkish Rose", "Ylang-Ylang"],
      base: ["Tonka Bean", "Opoponax", "Vanilla", "Vetiver", "White Musk", "Patchouli"]
    },
    ratings_breakdown: { love: 9200, like: 4100, ok: 1600, dislike: 720, hate: 580 },
    votes_count: 16200,
    when_to_wear: { winter: 4200, spring: 4800, summer: 3200, fall: 5200, day: 7800, night: 8400 },
    pros: ["Timeless Chanel elegance", "Very versatile", "Sophisticated", "Great performance"],
    cons: ["Very common", "Expensive", "Can smell old-fashioned", "Overused in offices"]
  },

  // DIOR WOMEN
  {
    id: crypto.randomUUID(),
    name: "Miss Dior",
    brand: "Dior",
    year: 2017,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.41727.jpg",
    perfumer: "François Demachy",
    description: "Miss Dior is a floral fragrance with centifolia rose, Grasse rose, and Damascus rose. Couture and optimistic.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "floral", strength: 100},
      {name: "fruity", strength: 85},
      {name: "sweet", strength: 75},
      {name: "green", strength: 65},
      {name: "fresh", strength: 60}
    ],
    notes: {
      top: ["Blood Orange", "Mandarin Orange", "Pink Pepper"],
      middle: ["Grasse Rose", "Damask Rose", "Peony"],
      base: ["White Musk", "Patchouli"]
    },
    ratings_breakdown: { love: 6800, like: 3200, ok: 1400, dislike: 620, hate: 380 },
    votes_count: 12400,
    when_to_wear: { winter: 2800, spring: 4800, summer: 2600, fall: 3600, day: 7200, night: 5200 },
    pros: ["Beautiful rose scent", "Romantic and elegant", "Good longevity", "Dior quality"],
    cons: ["Can be too floral", "Expensive", "Not unique", "Rose can be polarizing"]
  },

  // GUCCI
  {
    id: crypto.randomUUID(),
    name: "Gucci Bloom",
    brand: "Gucci",
    year: 2017,
    gender: "feminine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.42595.jpg",
    perfumer: "Alberto Morillas",
    description: "Gucci Bloom is a white floral fragrance featuring tuberose, jasmine, and Rangoon creeper. A thriving garden of flowers.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "floral", strength: 100},
      {name: "white floral", strength: 95},
      {name: "sweet", strength: 75},
      {name: "powdery", strength: 65},
      {name: "green", strength: 60}
    ],
    notes: {
      top: [],
      middle: ["Natural Tuberose", "Jasmine", "Rangoon Creeper"],
      base: []
    },
    ratings_breakdown: { love: 5600, like: 2800, ok: 1200, dislike: 580, hate: 420 },
    votes_count: 10600,
    when_to_wear: { winter: 2400, spring: 3800, summer: 2200, fall: 3200, day: 5800, night: 4800 },
    pros: ["Natural white floral", "Elegant and classy", "Not too sweet", "Beautiful bottle"],
    cons: ["Can be overpowering", "Tuberose dominant", "Expensive", "Not versatile"]
  }
];

// Generate SQL
export function generateAdditionalPerfumeInserts() {
  let sql = '-- Additional Premium Perfumes - Wave 2\n\n';
  
  additionalPerfumes.forEach(perfume => {
    const name = perfume.name.replace(/'/g, "''");
    const brand = perfume.brand.replace(/'/g, "''");
    const description = (perfume.description || '').replace(/'/g, "''");
    
    const notesTop = perfume.notes.top.join(', ');
    const notesMiddle = perfume.notes.middle.join(', ');
    const notesBase = perfume.notes.base.join(', ');
    
    sql += `INSERT INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) 
VALUES ('${perfume.id}', '${name}', '${brand}', ${perfume.year}, '${perfume.concentration}', '${notesTop}', '${notesMiddle}', '${notesBase}', '${description}', '${perfume.image_url}');\n\n`;
  });
  
  return sql;
}

console.log(generateAdditionalPerfumeInserts());
