// Perfumer (Nose) profiles and lineage

export async function handleGetPerfumers(request, env) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM perfumers';
  const binds = [];

  if (q) {
    query += ' WHERE name LIKE ?';
    binds.push(`%${q}%`);
  }

  query += ' ORDER BY name LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const result = await env.DB.prepare(query).bind(...binds).all();

  return new Response(JSON.stringify({
    perfumers: result.results.map(p => ({
      ...p,
      notable_houses: p.notable_houses ? JSON.parse(p.notable_houses) : [],
    })),
  }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleGetPerfumer(request, env, perfumerId) {
  const perfumer = await env.DB.prepare('SELECT * FROM perfumers WHERE id = ?').bind(perfumerId).first();
  if (!perfumer) {
    return new Response(JSON.stringify({ error: 'Perfumer not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  // Get their fragrances
  const fragrances = await env.DB.prepare(`
    SELECT p.id, p.name, p.brand, p.year, p.image_url, p.gender, pp.role,
      (SELECT AVG(rating) FROM reviews WHERE perfume_id = p.id) as avg_rating,
      (SELECT COUNT(*) FROM reviews WHERE perfume_id = p.id) as review_count
    FROM perfume_perfumers pp
    JOIN perfumes p ON pp.perfume_id = p.id
    WHERE pp.perfumer_id = ?
    ORDER BY p.year DESC
  `).bind(perfumerId).all();

  return new Response(JSON.stringify({
    perfumer: {
      ...perfumer,
      notable_houses: perfumer.notable_houses ? JSON.parse(perfumer.notable_houses) : [],
    },
    fragrances: fragrances.results,
    fragrance_count: fragrances.results.length,
  }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleGetPerfumeNoses(request, env, perfumeId) {
  const noses = await env.DB.prepare(`
    SELECT pr.*, pp.role
    FROM perfume_perfumers pp
    JOIN perfumers pr ON pp.perfumer_id = pr.id
    WHERE pp.perfume_id = ?
  `).bind(perfumeId).all();

  return new Response(JSON.stringify({
    perfumers: noses.results.map(p => ({
      ...p,
      notable_houses: p.notable_houses ? JSON.parse(p.notable_houses) : [],
    })),
  }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleLinkPerfumer(request, env) {
  // Admin-only: link a perfumer to a perfume
  const { perfume_id, perfumer_id, role } = await request.json();
  if (!perfume_id || !perfumer_id) {
    return new Response(JSON.stringify({ error: 'perfume_id and perfumer_id are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  await env.DB.prepare(
    'INSERT OR IGNORE INTO perfume_perfumers (perfume_id, perfumer_id, role) VALUES (?, ?, ?)'
  ).bind(perfume_id, perfumer_id, role || 'creator').run();

  return new Response(JSON.stringify({ success: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
}
