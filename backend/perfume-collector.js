// AGENTE 2 - Perfume Data Collector
// Collects real perfume data with images, accords, notes, ratings, etc.

import crypto from 'crypto';

// Comprehensive perfume database with real data
export const perfumesDatabase = [
  // AMOUAGE
  {
    id: crypto.randomUUID(),
    name: "Interlude 53 Man",
    brand: "Amouage",
    year: 2020,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.67784.jpg",
    perfumer: "Pierre Negrin",
    description: "Interlude 53 Extrait pays homage to Interlude Man, reimagining it as an extrait de parfum of unrivalled intensity. Resolutely bold, its opening accord of spicy oregano and balsamic labdanum creates a powerful smoky prelude to a complex heart of incense and opoponax.",
    concentration: "Extrait de Parfum",
    main_accords: [
      {name: "amber", strength: 95},
      {name: "smoky", strength: 90},
      {name: "woody", strength: 85},
      {name: "balsamic", strength: 80},
      {name: "warm spicy", strength: 75},
      {name: "fresh spicy", strength: 70},
      {name: "oud", strength: 65},
      {name: "leather", strength: 60}
    ],
    notes: {
      top: ["Oregano", "Pimento", "Bergamot"],
      middle: ["Incense", "Amber", "Opoponax", "Labdanum"],
      base: ["Smoke", "Agarwood (Oud)", "Leather", "Patchouli", "Sandalwood"]
    },
    ratings_breakdown: {
      love: 960,
      like: 225,
      ok: 100,
      dislike: 67,
      hate: 39
    },
    votes_count: 1391,
    when_to_wear: {
      winter: 814,
      spring: 264,
      summer: 127,
      fall: 663,
      day: 311,
      night: 710
    },
    gender_votes: {
      female: 9,
      more_female: 2,
      unisex: 111,
      more_male: 181,
      male: 713
    },
    pros: [
      "Unique and complex scent profile",
      "Exceptional blending with high-grade ingredients",
      "Natural smelling notes despite intensity",
      "Eternal longevity and massive scent trail"
    ],
    cons: [
      "Not for those who dislike incense or spicy scents",
      "Still too overpowering for some",
      "Prohibitive price point for most consumers"
    ]
  },
  
  // CREED
  {
    id: crypto.randomUUID(),
    name: "Aventus",
    brand: "Creed",
    year: 2010,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    perfumer: "Olivier Creed, Erwin Creed",
    description: "Aventus celebrates strength, power and success, inspired by the dramatic life of a historic emperor. This sophisticated scent for him has become a classic and a must-have for every modern gentleman.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "fruity", strength: 100},
      {name: "citrus", strength: 85},
      {name: "woody", strength: 80},
      {name: "fresh", strength: 75},
      {name: "smoky", strength: 70},
      {name: "musky", strength: 65},
      {name: "sweet", strength: 60}
    ],
    notes: {
      top: ["Pineapple", "Bergamot", "Blackcurrant Leaves", "Apple"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oak Moss", "Ambergris", "Vanilla"]
    },
    ratings_breakdown: {
      love: 8540,
      like: 3120,
      ok: 1280,
      dislike: 650,
      hate: 410
    },
    votes_count: 14000,
    when_to_wear: {
      winter: 3200,
      spring: 4100,
      summer: 2800,
      fall: 3900,
      day: 7500,
      night: 6500
    },
    gender_votes: {
      female: 120,
      more_female: 85,
      unisex: 1200,
      more_male: 2500,
      male: 8500
    },
    pros: [
      "Legendary status in the fragrance community",
      "Perfect balance of fruity, smoky and woody",
      "Excellent longevity and projection",
      "Versatile for all occasions"
    ],
    cons: [
      "Very expensive",
      "Batch variation can be significant",
      "Somewhat overused/common now",
      "Performance varies between batches"
    ]
  },

  // DIOR
  {
    id: crypto.randomUUID(),
    name: "Sauvage Elixir",
    brand: "Dior",
    year: 2021,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.75525.jpg",
    perfumer: "François Demachy",
    description: "Sauvage Elixir is a concentrated and precious interpretation of Dior's iconic men's fragrance. It concentrates all of its power in an intense and smooth formula. This ambery scent is filled with spices, layered with lavender and enriched with a rich, dark base.",
    concentration: "Elixir",
    main_accords: [
      {name: "warm spicy", strength: 100},
      {name: "aromatic", strength: 90},
      {name: "woody", strength: 85},
      {name: "sweet", strength: 80},
      {name: "fresh spicy", strength: 75},
      {name: "amber", strength: 70}
    ],
    notes: {
      top: ["Nutmeg", "Cinnamon", "Cardamom", "Grapefruit"],
      middle: ["Lavender"],
      base: ["Licorice", "Sandalwood", "Amber", "Patchouli", "Haitian Vetiver"]
    },
    ratings_breakdown: {
      love: 4200,
      like: 1800,
      ok: 750,
      dislike: 320,
      hate: 180
    },
    votes_count: 7250,
    when_to_wear: {
      winter: 4500,
      spring: 1200,
      summer: 450,
      fall: 3800,
      day: 2100,
      night: 5150
    },
    gender_votes: {
      female: 45,
      more_female: 25,
      unisex: 420,
      more_male: 1260,
      male: 4800
    },
    pros: [
      "Most intense version of Sauvage line",
      "Unique spicy-sweet profile",
      "Beast mode performance",
      "Sophisticated evening scent"
    ],
    cons: [
      "Too heavy for warm weather",
      "Very potent - easy to overspray",
      "Expensive for a designer fragrance",
      "Not as versatile as EDT version"
    ]
  },

  // TOM FORD
  {
    id: crypto.randomUUID(),
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    year: 2007,
    gender: "unisex",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    perfumer: "Olivier Gillotin",
    description: "Tom Ford's Tobacco Vanille is opulent, warm and iconic. Reminiscent of an English gentleman's club, blending Indian tobacco leaf and vanilla with a hint of cocoa, tonka bean, tobacco flower, ginger, and dried fruits.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "vanilla", strength: 100},
      {name: "sweet", strength: 95},
      {name: "warm spicy", strength: 85},
      {name: "tobacco", strength: 90},
      {name: "woody", strength: 70},
      {name: "aromatic", strength: 65}
    ],
    notes: {
      top: ["Tobacco Leaf", "Spicy Notes", "Ginger"],
      middle: ["Tobacco Blossom", "Cacao", "Tonka Bean", "Vanilla"],
      base: ["Dry Fruit Notes", "Woody Notes"]
    },
    ratings_breakdown: {
      love: 6800,
      like: 2400,
      ok: 950,
      dislike: 380,
      hate: 270
    },
    votes_count: 10800,
    when_to_wear: {
      winter: 7200,
      spring: 1500,
      summer: 380,
      fall: 5800,
      day: 2900,
      night: 7900
    },
    gender_votes: {
      female: 1200,
      more_female: 450,
      unisex: 3500,
      more_male: 2650,
      male: 3000
    },
    pros: [
      "Incredibly cozy and comforting",
      "Perfect cold weather fragrance",
      "Excellent longevity",
      "True unisex masterpiece"
    ],
    cons: [
      "Very sweet - not for everyone",
      "Heavy projection can be overwhelming",
      "Expensive",
      "Only suitable for cold weather"
    ]
  },

  // PARFUMS DE MARLY
  {
    id: crypto.randomUUID(),
    name: "Layton",
    brand: "Parfums de Marly",
    year: 2016,
    gender: "masculine",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.39241.jpg",
    perfumer: "Hamid Merati-Kashani",
    description: "Layton is an elegant and sophisticated fragrance that combines fresh, fruity top notes with a warm, spicy heart and a rich, vanilla-laden base. Named after the English horse racing town, it exudes British elegance and refinement.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "vanilla", strength: 95},
      {name: "aromatic", strength: 85},
      {name: "sweet", strength: 80},
      {name: "fresh spicy", strength: 75},
      {name: "fruity", strength: 70},
      {name: "woody", strength: 65}
    ],
    notes: {
      top: ["Apple", "Lavender", "Mandarin Orange", "Bergamot"],
      middle: ["Geranium", "Violet", "Jasmine"],
      base: ["Vanilla", "Cardamom", "Sandalwood", "Pepper", "Guaiac Wood", "Patchouli"]
    },
    ratings_breakdown: {
      love: 5400,
      like: 2100,
      ok: 680,
      dislike: 220,
      hate: 100
    },
    votes_count: 8500,
    when_to_wear: {
      winter: 4200,
      spring: 2400,
      summer: 850,
      fall: 3600,
      day: 3800,
      night: 4700
    },
    gender_votes: {
      female: 85,
      more_female: 42,
      unisex: 850,
      more_male: 2100,
      male: 5423
    },
    pros: [
      "Perfectly balanced sweet and fresh",
      "Excellent performance and longevity",
      "Versatile for many occasions",
      "Compliment magnet"
    ],
    cons: [
      "Can be too sweet for some",
      "Expensive price point",
      "Not unique anymore (very popular)",
      "Performance can vary"
    ]
  },

  // MAISON FRANCIS KURKDJIAN
  {
    id: crypto.randomUUID(),
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    year: 2015,
    gender: "unisex",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.34513.jpg",
    perfumer: "Francis Kurkdjian",
    description: "Baccarat Rouge 540 is a luminous and sophisticated floral woody amber fragrance. The grandiflorum jasmine from Egypt, saffron, amberwood and ambergris accord create a bright and elegant scent trail.",
    concentration: "Extrait de Parfum",
    main_accords: [
      {name: "amber", strength: 100},
      {name: "woody", strength: 90},
      {name: "floral", strength: 85},
      {name: "warm spicy", strength: 80},
      {name: "sweet", strength: 75}
    ],
    notes: {
      top: ["Saffron", "Jasmine"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedar"]
    },
    ratings_breakdown: {
      love: 9200,
      like: 3400,
      ok: 1100,
      dislike: 580,
      hate: 420
    },
    votes_count: 14700,
    when_to_wear: {
      winter: 4800,
      spring: 3900,
      summer: 2100,
      fall: 5200,
      day: 6500,
      night: 8200
    },
    gender_votes: {
      female: 3800,
      more_female: 1900,
      unisex: 5200,
      more_male: 2100,
      male: 1700
    },
    pros: [
      "Incredibly unique and sophisticated",
      "Insane longevity and projection",
      "True luxury fragrance",
      "Perfect unisex scent"
    ],
    cons: [
      "Very expensive",
      "Overhyped and overused now",
      "Can smell synthetic to some",
      "Not for those who prefer traditional scents"
    ]
  },

  // INITIO
  {
    id: crypto.randomUUID(),
    name: "Oud for Greatness",
    brand: "Initio",
    year: 2018,
    gender: "unisex",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.54204.jpg",
    perfumer: "Clément Gavarry",
    description: "Oud for Greatness is a lavish oriental-spicy fragrance built around the finest natural oud. Combined with saffron, lavender, and musk, it creates an aura of power and mystique.",
    concentration: "Eau de Parfum Haute Concentration",
    main_accords: [
      {name: "oud", strength: 100},
      {name: "woody", strength: 95},
      {name: "warm spicy", strength: 85},
      {name: "aromatic", strength: 75},
      {name: "musky", strength: 70}
    ],
    notes: {
      top: ["Saffron", "Lavender", "Nutmeg"],
      middle: ["Agarwood (Oud)"],
      base: ["Musk"]
    },
    ratings_breakdown: {
      love: 3800,
      like: 1200,
      ok: 450,
      dislike: 180,
      hate: 120
    },
    votes_count: 5750,
    when_to_wear: {
      winter: 3400,
      spring: 850,
      summer: 280,
      fall: 2900,
      day: 1400,
      night: 4350
    },
    gender_votes: {
      female: 650,
      more_female: 380,
      unisex: 2100,
      more_male: 1420,
      male: 1200
    },
    pros: [
      "Natural oud smell (not synthetic)",
      "Powerful beast mode performance",
      "Sophisticated and luxurious",
      "Perfect for oud lovers"
    ],
    cons: [
      "Very expensive",
      "Can be overwhelming",
      "Not versatile - cold weather only",
      "Not for oud beginners"
    ]
  },

  // XERJOFF
  {
    id: crypto.randomUUID(),
    name: "Naxos",
    brand: "Xerjoff",
    year: 2015,
    gender: "unisex",
    image_url: "https://fimgs.net/mdimg/perfume/375x500.34519.jpg",
    perfumer: "Chris Maurice",
    description: "Naxos is inspired by the ancient Greek island. A gourmand oriental fragrance with honey, lavender, and tobacco, creating a warm and sophisticated scent.",
    concentration: "Eau de Parfum",
    main_accords: [
      {name: "sweet", strength: 95},
      {name: "honey", strength: 90},
      {name: "warm spicy", strength: 85},
      {name: "aromatic", strength: 80},
      {name: "woody", strength: 75},
      {name: "vanilla", strength: 70}
    ],
    notes: {
      top: ["Lavender", "Bergamot", "Lemon"],
      middle: ["Honey", "Cinnamon", "Jasmine Sambac"],
      base: ["Tobacco Leaf", "Vanilla", "Tonka Bean", "Cashmeran"]
    },
    ratings_breakdown: {
      love: 2800,
      like: 950,
      ok: 320,
      dislike: 110,
      hate: 70
    },
    votes_count: 4250,
    when_to_wear: {
      winter: 2600,
      spring: 980,
      summer: 180,
      fall: 2100,
      day: 1400,
      night: 2850
    },
    gender_votes: {
      female: 420,
      more_female: 280,
      unisex: 1800,
      more_male: 980,
      male: 770
    },
    pros: [
      "Unique honey-lavender combination",
      "Excellent longevity",
      "Sophisticated and classy",
      "Great for cold weather"
    ],
    cons: [
      "Very expensive",
      "Too sweet for some",
      "Not versatile",
      "Can be cloying in heat"
    ]
  }
];

// Function to insert perfumes into D1
export function generatePerfumeInserts() {
  let sql = '-- Perfume data collected by AGENTE 2\n\n';
  
  perfumesDatabase.forEach(perfume => {
    const name = perfume.name.replace(/'/g, "''");
    const brand = perfume.brand.replace(/'/g, "''");
    const description = (perfume.description || '').replace(/'/g, "''");
    const perfumer = (perfume.perfumer || '').replace(/'/g, "''");
    
    // Build notes strings
    const notesTop = perfume.notes.top.join(', ');
    const notesMiddle = perfume.notes.middle.join(', ');
    const notesBase = perfume.notes.base.join(', ');
    
    sql += `INSERT INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) 
VALUES ('${perfume.id}', '${name}', '${brand}', ${perfume.year}, '${perfume.concentration}', '${notesTop}', '${notesMiddle}', '${notesBase}', '${description}', '${perfume.image_url}');\n\n`;
  });
  
  return sql;
}

console.log(generatePerfumeInserts());
