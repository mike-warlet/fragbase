// Cloudflare Worker - FragBase API
import { handleRegister, handleLogin, handleGetMe } from './auth.js';
import { handleListPerfumes, handleGetPerfume, handleCreatePerfume, handleGetPerfumeReviews } from './perfumes.js';
import { handleCreateReview, handleUpdateReview, handleDeleteReview, handleLikeReview } from './reviews.js';
import { handleGetUser, handleUpdateUser, handleGetUserReviews, handleFollowUser, handleGetUserCollections } from './users.js';
import { handleGetFeed, handleCreatePost, handleDeletePost } from './posts.js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function handleCors(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
}

// Router
export default {
  async fetch(request, env) {
    // Handle CORS preflight
    const corsResponse = handleCors(request);
    if (corsResponse) return corsResponse;
    
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    
    let response;
    
    try {
      // Health check
      if (path === '/api/status') {
        response = new Response(JSON.stringify({ status: 'ok', version: '1.0.0' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Auth routes
      else if (path === '/api/auth/register' && method === 'POST') {
        response = await handleRegister(request, env);
      }
      else if (path === '/api/auth/login' && method === 'POST') {
        response = await handleLogin(request, env);
      }
      else if (path === '/api/auth/me' && method === 'GET') {
        response = await handleGetMe(request, env);
      }
      
      // Users routes
      else if (path === '/api/users/me' && method === 'PUT') {
        response = await handleUpdateUser(request, env);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)$/)[1];
        response = await handleGetUser(request, env, userId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/reviews$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/reviews$/)[1];
        response = await handleGetUserReviews(request, env, userId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/collections$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/collections$/)[1];
        response = await handleGetUserCollections(request, env, userId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/follow$/) && (method === 'POST' || method === 'DELETE')) {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/follow$/)[1];
        response = await handleFollowUser(request, env, userId);
      }
      
      // Perfumes routes
      else if (path === '/api/perfumes' && method === 'GET') {
        response = await handleListPerfumes(request, env);
      }
      else if (path === '/api/perfumes' && method === 'POST') {
        response = await handleCreatePerfume(request, env);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)$/)[1];
        response = await handleGetPerfume(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/reviews$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/reviews$/)[1];
        response = await handleGetPerfumeReviews(request, env, perfumeId);
      }
      
      // Reviews routes
      else if (path === '/api/reviews' && method === 'POST') {
        response = await handleCreateReview(request, env);
      }
      else if (path.match(/^\/api\/reviews\/([^\/]+)$/) && method === 'PUT') {
        const reviewId = path.match(/^\/api\/reviews\/([^\/]+)$/)[1];
        response = await handleUpdateReview(request, env, reviewId);
      }
      else if (path.match(/^\/api\/reviews\/([^\/]+)$/) && method === 'DELETE') {
        const reviewId = path.match(/^\/api\/reviews\/([^\/]+)$/)[1];
        response = await handleDeleteReview(request, env, reviewId);
      }
      else if (path.match(/^\/api\/reviews\/([^\/]+)\/like$/) && method === 'POST') {
        const reviewId = path.match(/^\/api\/reviews\/([^\/]+)\/like$/)[1];
        response = await handleLikeReview(request, env, reviewId);
      }
      
      // Posts routes (Feed)
      else if (path === '/api/posts' && method === 'GET') {
        response = await handleGetFeed(request, env);
      }
      else if (path === '/api/posts' && method === 'POST') {
        response = await handleCreatePost(request, env);
      }
      else if (path.match(/^\/api\/posts\/([^\/]+)$/) && method === 'DELETE') {
        const postId = path.match(/^\/api\/posts\/([^\/]+)$/)[1];
        response = await handleDeletePost(request, env, postId);
      }
      
      // 404
      else {
        response = new Response(JSON.stringify({ error: 'Route not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Add CORS headers to all responses
      Object.keys(corsHeaders).forEach(key => {
        response.headers.set(key, corsHeaders[key]);
      });
      
      return response;
      
    } catch (error) {
      console.error('Worker error:', error);
      const errorResponse = new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
      return errorResponse;
    }
  }
};
