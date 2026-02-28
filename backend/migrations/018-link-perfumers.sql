-- Migration 018: Link perfumers to their known fragrances

-- p010 = Francois Demachy (Dior) - Sauvage, Miss Dior
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('8c6e61d3-1631-4fd2-b55f-b3f058e90f16', 'p010', 'creator'),
  ('a692ba71-8798-473c-8bd3-9c46c5650c7d', 'p010', 'creator'),
  ('f59b35b1-7baf-493d-9532-e2aebbc37546', 'p010', 'creator'),
  ('ec95846c-1f62-4c60-99ed-83802eae2346', 'p010', 'creator'),
  ('s019', 'p010', 'creator'),
  ('s411', 'p010', 'creator'),
  ('s388', 'p010', 'creator'),
  ('s011', 'p010', 'creator'),
  ('s383', 'p010', 'creator');

-- p001 = Francis Kurkdjian (MFK) - Baccarat Rouge, Aqua Universalis, etc
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('7392b848-ed94-458f-b62e-6e9d67746bc3', 'p001', 'creator'),
  ('231f0f0c-a632-4150-89f2-39f45bf5ff22', 'p001', 'creator'),
  ('s161', 'p001', 'creator'),
  ('s163', 'p001', 'creator'),
  ('s164', 'p001', 'creator'),
  ('s167', 'p001', 'creator');

-- p003 = Alberto Morillas - Acqua di Gio, CK One
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('609c0ea3-87ed-4790-beaa-d701c1f83de3', 'p003', 'creator'),
  ('1ef578ac-2244-48c3-a6fd-3f568a181724', 'p003', 'creator'),
  ('s098', 'p003', 'creator'),
  ('s130', 'p003', 'co-creator'),
  ('s084', 'p003', 'co-creator');

-- p005 = Olivier Cresp - Angel, Light Blue, Invictus
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('aa1bd4a1-18e1-4a17-aa03-8f82a153e0fb', 'p005', 'co-creator'),
  ('s300', 'p005', 'co-creator'),
  ('608af0f7-89fb-4f65-bded-cedd7b46907b', 'p005', 'creator'),
  ('s406', 'p005', 'creator'),
  ('1e621241-d6fd-4c07-a9c2-52ca247f449d', 'p005', 'co-creator');

-- p009 = Dominique Ropion - Flowerbomb, 1 Million, YSL
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('68462d86-099d-4e9e-bd36-e6a94ab906d1', 'p009', 'creator'),
  ('9b61f6fa-b791-404d-8a1c-c2b79b418220', 'p009', 'creator'),
  ('c2903067-93a1-4137-a658-a6eb85bf1eda', 'p009', 'co-creator'),
  ('471fe3a0-4a3e-4b4a-9d34-fd4bfa19cf8e', 'p009', 'co-creator'),
  ('s064', 'p009', 'co-creator'),
  ('dd9f6987-74d7-4912-bb6d-bb8baa0a80d5', 'p009', 'creator'),
  ('1a70d2d2-f405-46f1-9f12-cb4a99a17998', 'p009', 'creator'),
  ('s380', 'p009', 'co-creator');

-- p013 = Quentin Bisch - Phantom
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s066', 'p013', 'creator'),
  ('s454', 'p013', 'creator');

-- p014 = Anne Flipo - La Vie Est Belle
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('92d720bb-2939-4506-a404-2b05556cdc23', 'p014', 'co-creator'),
  ('feaf7ba1-11aa-438c-93fa-d88b21a2315f', 'p014', 'co-creator'),
  ('s341', 'p014', 'co-creator');

-- p012 = Aurelien Guichard - 1 Million Elixir, Born in Roma
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s067', 'p012', 'creator'),
  ('s120', 'p012', 'creator'),
  ('s456', 'p012', 'co-creator'),
  ('s144', 'p012', 'co-creator');

-- p011 = Nathalie Lorson - Narciso Rodriguez, Burberry
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('84ca1df7-678e-472f-a446-fe105def9429', 'p011', 'creator'),
  ('s418', 'p011', 'creator');

-- p006 = Daniela Andrier - Prada, Givenchy
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s094', 'p006', 'creator');

-- p015 = Carlos Benaim - CK One
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s130', 'p015', 'co-creator'),
  ('s134', 'p015', 'creator');

-- p008 = Jean-Claude Ellena - Hermes
-- p007 = Christine Nagel - Jo Malone, Hermes
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s229', 'p007', 'creator');

-- p004 = Thierry Wasser - Guerlain Shalimar (custodian)
INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES
  ('s084', 'p004', 'creator'),
  ('s398', 'p004', 'creator'),
  ('s400', 'p004', 'creator');
