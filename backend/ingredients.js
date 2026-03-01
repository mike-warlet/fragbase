// Ingredient Encyclopedia API

export async function handleGetIngredients(request, env) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('q');

  let query = 'SELECT * FROM ingredients';
  const params = [];
  const conditions = [];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (search) {
    conditions.push('(name LIKE ? OR name_pt LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY category, name';

  const { results } = await env.DB.prepare(query).bind(...params).all();
  return Response.json({ ingredients: results });
}

export async function handleGetIngredient(request, env, ingredientId) {
  const ingredient = await env.DB.prepare(
    'SELECT * FROM ingredients WHERE id = ?'
  ).bind(ingredientId).first();

  if (!ingredient) {
    return Response.json({ error: 'Ingredient not found' }, { status: 404 });
  }

  // Get pairings
  const { results: pairings } = await env.DB.prepare(`
    SELECT ip.pairs_with as id, ip.affinity, i.name, i.name_pt, i.category
    FROM ingredient_pairings ip
    JOIN ingredients i ON i.id = ip.pairs_with
    WHERE ip.ingredient_id = ?
    ORDER BY ip.affinity DESC
  `).bind(ingredientId).all();

  // Get perfumes containing this ingredient in their notes
  const searchTerm = `%${ingredient.name}%`;
  const { results: perfumes } = await env.DB.prepare(`
    SELECT id, name, brand, year, image_url,
      CASE
        WHEN notes_top LIKE ? THEN 'top'
        WHEN notes_heart LIKE ? THEN 'heart'
        WHEN notes_base LIKE ? THEN 'base'
      END as note_position
    FROM perfumes
    WHERE notes_top LIKE ? OR notes_heart LIKE ? OR notes_base LIKE ?
    ORDER BY year DESC
    LIMIT 20
  `).bind(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm).all();

  return Response.json({
    ingredient,
    pairings,
    perfumes,
    perfume_count: perfumes.length,
  });
}

export async function handleSearchByNote(request, env) {
  const url = new URL(request.url);
  const note = url.searchParams.get('note');
  if (!note) {
    return Response.json({ error: 'note parameter required' }, { status: 400 });
  }

  const searchTerm = `%${note}%`;
  const { results } = await env.DB.prepare(`
    SELECT id, name, brand, year, image_url, avg_rating,
      CASE
        WHEN notes_top LIKE ? THEN 'top'
        WHEN notes_heart LIKE ? THEN 'heart'
        WHEN notes_base LIKE ? THEN 'base'
      END as note_position
    FROM perfumes
    WHERE notes_top LIKE ? OR notes_heart LIKE ? OR notes_base LIKE ?
    ORDER BY avg_rating DESC NULLS LAST, year DESC
    LIMIT 50
  `).bind(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm).all();

  return Response.json({ perfumes: results, note, count: results.length });
}
