// Auth utilities and routes for FragBase
import { sign, verify } from '@tsndr/cloudflare-worker-jwt';

// JWT secret should be in env.JWT_SECRET
const JWT_EXPIRY = '7d';

// Generate JWT token
export async function generateToken(userId, secret) {
  return await sign({ userId, exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) }, secret);
}

// Verify JWT token
export async function verifyToken(token, secret) {
  try {
    const isValid = await verify(token, secret);
    if (!isValid) return null;
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded;
  } catch {
    return null;
  }
}

// Middleware to check authentication
export async function requireAuth(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }
  
  const token = authHeader.substring(7);
  const decoded = await verifyToken(token, env.JWT_SECRET);
  
  if (!decoded) {
    return { error: 'Invalid token', status: 401 };
  }
  
  return { userId: decoded.userId };
}

// Hash password (simple version - in production use bcrypt or similar)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Register new user
export async function handleRegister(request, env) {
  try {
    const { email, password, name } = await request.json();
    
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if user exists
    const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create user
    const userId = crypto.randomUUID();
    const hashedPassword = await hashPassword(password);
    
    await env.DB.prepare(
      'INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)'
    ).bind(userId, email, name, hashedPassword).run();
    
    // Generate token
    const token = await generateToken(userId, env.JWT_SECRET);
    
    return new Response(JSON.stringify({ 
      token, 
      user: { id: userId, email, name } 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Login user
export async function handleLogin(request, env) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Convert username to email format
    // Accepts: "maria", "@maria", or "maria@fragbase.com"
    let emailAddress = email;
    if (!email.includes('@')) {
      // Just username: "maria"
      emailAddress = `${email}@fragbase.com`;
    } else if (email.startsWith('@')) {
      // @username format: "@maria"
      emailAddress = `${email.substring(1)}@fragbase.com`;
    }
    
    // Find user
    const user = await env.DB.prepare(
      'SELECT id, email, name, password_hash FROM users WHERE email = ?'
    ).bind(emailAddress).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verify password
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.password_hash) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate token
    const token = await generateToken(user.id, env.JWT_SECRET);
    
    return new Response(JSON.stringify({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name } 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get current user
export async function handleGetMe(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const user = await env.DB.prepare(
      'SELECT id, email, name, photo_url, bio, created_at FROM users WHERE id = ?'
    ).bind(auth.userId).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ user }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
