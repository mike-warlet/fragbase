// Marketplace API routes for FragBase
import { requireAuth, authenticate } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/marketplace — Browse listings
export async function handleGetListings(request, env) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
    const offset = (page - 1) * limit;
    const type = url.searchParams.get('type'); // sell, swap, both
    const condition = url.searchParams.get('condition');
    const search = url.searchParams.get('q');
    const sort = url.searchParams.get('sort') || 'recent'; // recent, price_low, price_high
    const minPrice = url.searchParams.get('min_price');
    const maxPrice = url.searchParams.get('max_price');

    let where = "ml.status = 'active'";
    const params = [];

    if (type) {
      where += ' AND ml.listing_type = ?';
      params.push(type);
    }
    if (condition) {
      where += ' AND ml.condition = ?';
      params.push(condition);
    }
    if (search) {
      where += ' AND (ml.title LIKE ? OR p.name LIKE ? OR p.brand LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (minPrice) {
      where += ' AND ml.price >= ?';
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      where += ' AND ml.price <= ?';
      params.push(parseFloat(maxPrice));
    }

    let orderBy = 'ml.created_at DESC';
    if (sort === 'price_low') orderBy = 'ml.price ASC';
    else if (sort === 'price_high') orderBy = 'ml.price DESC';

    const { results } = await env.DB.prepare(
      `SELECT ml.*,
              u.username, u.name as seller_name, u.photo_url as seller_photo,
              p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image
       FROM marketplace_listings ml
       JOIN users u ON ml.user_id = u.id
       LEFT JOIN perfumes p ON ml.perfume_id = p.id
       WHERE ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`
    ).bind(...params, limit, offset).all();

    const total = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM marketplace_listings ml
       LEFT JOIN perfumes p ON ml.perfume_id = p.id
       WHERE ${where}`
    ).bind(...params).first();

    return json({
      listings: results,
      page,
      limit,
      total: total.count,
      has_more: offset + limit < total.count,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/marketplace/:id — Listing detail
export async function handleGetListing(request, env, listingId) {
  try {
    const listing = await env.DB.prepare(
      `SELECT ml.*,
              u.id as seller_id, u.username, u.name as seller_name, u.photo_url as seller_photo, u.bio as seller_bio,
              p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image, p.id as perfume_id_ref
       FROM marketplace_listings ml
       JOIN users u ON ml.user_id = u.id
       LEFT JOIN perfumes p ON ml.perfume_id = p.id
       WHERE ml.id = ?`
    ).bind(listingId).first();

    if (!listing) return json({ error: 'Listing not found' }, 404);

    // Get offer count
    const offerCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM marketplace_offers WHERE listing_id = ? AND status = 'pending'"
    ).bind(listingId).first();

    // Get seller stats
    const sellerStats = await env.DB.prepare(
      `SELECT COUNT(*) as total_listings,
              SUM(CASE WHEN status = 'sold' THEN 1 ELSE 0 END) as sold_count
       FROM marketplace_listings WHERE user_id = ?`
    ).bind(listing.user_id).first();

    return json({
      listing: {
        ...listing,
        offer_count: offerCount.count,
        seller_total_listings: sellerStats.total_listings,
        seller_sold_count: sellerStats.sold_count,
      },
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// POST /api/marketplace — Create listing
export async function handleCreateListing(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const body = await request.json();
    const { title, description, perfume_id, condition, listing_type, price, currency, volume_ml, image_url, location } = body;

    if (!title || !condition || !listing_type) {
      return json({ error: 'Title, condition, and listing type are required' }, 400);
    }

    if (listing_type === 'sell' && !price) {
      return json({ error: 'Price is required for sell listings' }, 400);
    }

    const id = crypto.randomUUID();

    await env.DB.prepare(
      `INSERT INTO marketplace_listings (id, user_id, perfume_id, title, description, condition, listing_type, price, currency, volume_ml, image_url, location)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, auth.userId, perfume_id || null, title, description || null, condition, listing_type, price || null, currency || 'BRL', volume_ml || null, image_url || null, location || null).run();

    const listing = await env.DB.prepare('SELECT * FROM marketplace_listings WHERE id = ?').bind(id).first();
    return json({ listing }, 201);
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// PUT /api/marketplace/:id — Update listing
export async function handleUpdateListing(request, env, listingId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const existing = await env.DB.prepare('SELECT * FROM marketplace_listings WHERE id = ?').bind(listingId).first();
    if (!existing) return json({ error: 'Listing not found' }, 404);
    if (existing.user_id !== auth.userId) return json({ error: 'Not authorized' }, 403);

    const body = await request.json();
    const { title, description, condition, listing_type, price, volume_ml, image_url, location, status } = body;

    await env.DB.prepare(
      `UPDATE marketplace_listings SET
         title = COALESCE(?, title),
         description = COALESCE(?, description),
         condition = COALESCE(?, condition),
         listing_type = COALESCE(?, listing_type),
         price = COALESCE(?, price),
         volume_ml = COALESCE(?, volume_ml),
         image_url = COALESCE(?, image_url),
         location = COALESCE(?, location),
         status = COALESCE(?, status),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(title, description, condition, listing_type, price, volume_ml, image_url, location, status, listingId).run();

    const listing = await env.DB.prepare('SELECT * FROM marketplace_listings WHERE id = ?').bind(listingId).first();
    return json({ listing });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// DELETE /api/marketplace/:id — Remove listing
export async function handleDeleteListing(request, env, listingId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const existing = await env.DB.prepare('SELECT * FROM marketplace_listings WHERE id = ?').bind(listingId).first();
    if (!existing) return json({ error: 'Listing not found' }, 404);
    if (existing.user_id !== auth.userId) return json({ error: 'Not authorized' }, 403);

    await env.DB.prepare("UPDATE marketplace_listings SET status = 'removed' WHERE id = ?").bind(listingId).run();
    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// POST /api/marketplace/:id/offer — Make an offer
export async function handleCreateOffer(request, env, listingId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const listing = await env.DB.prepare('SELECT * FROM marketplace_listings WHERE id = ?').bind(listingId).first();
    if (!listing) return json({ error: 'Listing not found' }, 404);
    if (listing.status !== 'active') return json({ error: 'Listing is no longer active' }, 400);
    if (listing.user_id === auth.userId) return json({ error: 'Cannot make offer on your own listing' }, 400);

    const body = await request.json();
    const { message, offer_price } = body;

    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO marketplace_offers (id, listing_id, buyer_id, message, offer_price) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, listingId, auth.userId, message || null, offer_price || null).run();

    return json({ offer: { id, listing_id: listingId, status: 'pending' } }, 201);
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/marketplace/my — My listings
export async function handleGetMyListings(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { results } = await env.DB.prepare(
      `SELECT ml.*,
              p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image,
              (SELECT COUNT(*) FROM marketplace_offers mo WHERE mo.listing_id = ml.id AND mo.status = 'pending') as pending_offers
       FROM marketplace_listings ml
       LEFT JOIN perfumes p ON ml.perfume_id = p.id
       WHERE ml.user_id = ? AND ml.status != 'removed'
       ORDER BY ml.created_at DESC`
    ).bind(auth.userId).all();

    return json({ listings: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/marketplace/:id/offers — Get offers for a listing (seller only)
export async function handleGetOffers(request, env, listingId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const listing = await env.DB.prepare('SELECT user_id FROM marketplace_listings WHERE id = ?').bind(listingId).first();
    if (!listing) return json({ error: 'Listing not found' }, 404);
    if (listing.user_id !== auth.userId) return json({ error: 'Not authorized' }, 403);

    const { results } = await env.DB.prepare(
      `SELECT mo.*, u.username, u.name as buyer_name, u.photo_url as buyer_photo
       FROM marketplace_offers mo
       JOIN users u ON mo.buyer_id = u.id
       WHERE mo.listing_id = ?
       ORDER BY mo.created_at DESC`
    ).bind(listingId).all();

    return json({ offers: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
