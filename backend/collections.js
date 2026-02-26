// Collections module
import { authenticate } from './auth.js';

// Get all collections for a user
export async function handleGetCollections(request, env, userId) {
  try {
    const collections = await env.DB.prepare(`
      SELECT 
        c.*,
        COUNT(DISTINCT cp.perfume_id) as perfume_count
      FROM collections c
      LEFT JOIN collections_perfumes cp ON c.id = cp.collection_id
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).bind(userId).all();

    return new Response(JSON.stringify(collections.results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get collections error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch collections' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get single collection with perfumes
export async function handleGetCollection(request, env, collectionId) {
  try {
    // Get collection info
    const collection = await env.DB.prepare(`
      SELECT c.*, u.username, u.display_name, u.avatar_url
      FROM collections c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).bind(collectionId).first();

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get perfumes in collection
    const perfumes = await env.DB.prepare(`
      SELECT 
        p.*,
        cp.added_at,
        AVG(r.rating) as avg_rating,
        COUNT(DISTINCT r.id) as review_count
      FROM collections_perfumes cp
      JOIN perfumes p ON cp.perfume_id = p.id
      LEFT JOIN reviews r ON p.id = r.perfume_id
      WHERE cp.collection_id = ?
      GROUP BY p.id
      ORDER BY cp.added_at DESC
    `).bind(collectionId).all();

    collection.perfumes = perfumes.results;

    return new Response(JSON.stringify(collection), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch collection' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Create collection
export async function handleCreateCollection(request, env) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { name, description, is_public } = await request.json();

    if (!name || name.trim() === '') {
      return new Response(JSON.stringify({ error: 'Collection name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await env.DB.prepare(`
      INSERT INTO collections (user_id, name, description, is_public)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `).bind(user.id, name.trim(), description || null, is_public ? 1 : 0).first();

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Create collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create collection' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Update collection
export async function handleUpdateCollection(request, env, collectionId) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check ownership
    const collection = await env.DB.prepare('SELECT * FROM collections WHERE id = ?')
      .bind(collectionId).first();

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (collection.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, description, is_public } = await request.json();

    const result = await env.DB.prepare(`
      UPDATE collections 
      SET name = ?, description = ?, is_public = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `).bind(
      name || collection.name,
      description !== undefined ? description : collection.description,
      is_public !== undefined ? (is_public ? 1 : 0) : collection.is_public,
      collectionId
    ).first();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update collection' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete collection
export async function handleDeleteCollection(request, env, collectionId) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check ownership
    const collection = await env.DB.prepare('SELECT * FROM collections WHERE id = ?')
      .bind(collectionId).first();

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (collection.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete all perfumes from collection first
    await env.DB.prepare('DELETE FROM collections_perfumes WHERE collection_id = ?')
      .bind(collectionId).run();

    // Delete collection
    await env.DB.prepare('DELETE FROM collections WHERE id = ?').bind(collectionId).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete collection' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Add perfume to collection
export async function handleAddPerfumeToCollection(request, env, collectionId) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check ownership
    const collection = await env.DB.prepare('SELECT * FROM collections WHERE id = ?')
      .bind(collectionId).first();

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (collection.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { perfume_id } = await request.json();

    if (!perfume_id) {
      return new Response(JSON.stringify({ error: 'perfume_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if perfume exists
    const perfume = await env.DB.prepare('SELECT * FROM perfumes WHERE id = ?')
      .bind(perfume_id).first();

    if (!perfume) {
      return new Response(JSON.stringify({ error: 'Perfume not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if already in collection
    const existing = await env.DB.prepare(
      'SELECT * FROM collections_perfumes WHERE collection_id = ? AND perfume_id = ?'
    ).bind(collectionId, perfume_id).first();

    if (existing) {
      return new Response(JSON.stringify({ error: 'Perfume already in collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add to collection
    await env.DB.prepare(`
      INSERT INTO collections_perfumes (collection_id, perfume_id)
      VALUES (?, ?)
    `).bind(collectionId, perfume_id).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Add perfume to collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to add perfume' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Remove perfume from collection
export async function handleRemovePerfumeFromCollection(request, env, collectionId, perfumeId) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check ownership
    const collection = await env.DB.prepare('SELECT * FROM collections WHERE id = ?')
      .bind(collectionId).first();

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (collection.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(`
      DELETE FROM collections_perfumes 
      WHERE collection_id = ? AND perfume_id = ?
    `).bind(collectionId, perfumeId).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Remove perfume from collection error:', error);
    return new Response(JSON.stringify({ error: 'Failed to remove perfume' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
