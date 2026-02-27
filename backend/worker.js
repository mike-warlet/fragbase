// Cloudflare Worker - FragBase API
import { handleRegister, handleLogin, handleGetMe } from './auth.js';
import { handleListPerfumes, handleGetPerfume, handleCreatePerfume, handleGetPerfumeReviews, handleGetTrendingPerfumes, handleComparePerfumes } from './perfumes.js';
import { handleCreateReview, handleUpdateReview, handleDeleteReview, handleLikeReview } from './reviews.js';
import { handleGetUser, handleUpdateUser, handleGetUserReviews, handleFollowUser, handleGetUserCollections, handleGetFollowers, handleGetFollowing, handleGetNotifications, handleGetTasteProfile } from './users.js';
import { handleGetFeed, handleCreatePost, handleDeletePost, handleLikePost, handleGetComments, handleCreateComment, handleDeleteComment } from './posts.js';
import { handleGetConversations, handleGetMessages, handleSendMessage, handleMarkAsRead, handleGetNewMessages, handleTypingIndicator, handleGetChatStatus, handleMessageReaction, handleRemoveReaction } from './messages.js';
import { handleUploadImage, handleGetImage, handleDeleteImage } from './images.js';
import { handleGetCollections, handleGetCollection, handleCreateCollection, handleUpdateCollection, handleDeleteCollection, handleAddPerfumeToCollection, handleRemovePerfumeFromCollection } from './collections.js';
import { handleNoteVote, handleGetNoteVotes, handleAccordVote, handleGetAccordVotes,
         handlePerformanceVote, handleGetPerformanceVotes, handleSeasonVote, handleGetSeasonVotes,
         handleGetSimilarPerfumes, handleAddToWishlist, handleRemoveFromWishlist,
         handleGetMyWishlists, handleGetWishlistStatus } from './voting.js';
import { handleSetSOTD, handleGetMySOTD, handleGetSOTDFeed, handleGetSOTDHistory } from './sotd.js';
import { handleGlobalSearch } from './search.js';

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
      // Root / welcome
      if (path === '/' || path === '') {
        response = new Response(JSON.stringify({ 
          message: 'FragBase API',
          version: '1.0.0',
          status: 'online',
          endpoints: {
            health: '/api/status',
            perfumes: '/api/perfumes',
            auth: '/api/auth/login',
            docs: 'https://github.com/mike-warlet/fragbase'
          }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Health check
      else if (path === '/api/status') {
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
      else if (path.match(/^\/api\/users\/([^\/]+)\/followers$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/followers$/)[1];
        response = await handleGetFollowers(request, env, userId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/following$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/following$/)[1];
        response = await handleGetFollowing(request, env, userId);
      }
      else if (path === '/api/notifications' && method === 'GET') {
        response = await handleGetNotifications(request, env);
      }
      // SOTD routes
      else if (path === '/api/sotd' && method === 'POST') {
        response = await handleSetSOTD(request, env);
      }
      else if (path === '/api/sotd/me' && method === 'GET') {
        response = await handleGetMySOTD(request, env);
      }
      else if (path === '/api/sotd/feed' && method === 'GET') {
        response = await handleGetSOTDFeed(request, env);
      }
      else if (path.match(/^\/api\/sotd\/([^\/]+)\/history$/) && method === 'GET') {
        const userId = path.match(/^\/api\/sotd\/([^\/]+)\/history$/)[1];
        response = await handleGetSOTDHistory(request, env, userId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/taste-profile$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/taste-profile$/)[1];
        response = await handleGetTasteProfile(request, env, userId);
      }
      
      // Global search
      else if (path === '/api/search' && method === 'GET') {
        response = await handleGlobalSearch(request, env);
      }

      // Perfumes routes
      else if (path === '/api/perfumes/compare' && method === 'GET') {
        response = await handleComparePerfumes(request, env);
      }
      else if (path === '/api/perfumes/trending' && method === 'GET') {
        response = await handleGetTrendingPerfumes(request, env);
      }
      else if (path === '/api/perfumes' && method === 'GET') {
        response = await handleListPerfumes(request, env);
      }
      else if (path === '/api/perfumes' && method === 'POST') {
        response = await handleCreatePerfume(request, env);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/notes\/vote$/) && method === 'POST') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/notes\/vote$/)[1];
        response = await handleNoteVote(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/notes\/votes$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/notes\/votes$/)[1];
        response = await handleGetNoteVotes(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/accords\/vote$/) && method === 'POST') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/accords\/vote$/)[1];
        response = await handleAccordVote(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/accords\/votes$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/accords\/votes$/)[1];
        response = await handleGetAccordVotes(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/performance\/vote$/) && method === 'POST') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/performance\/vote$/)[1];
        response = await handlePerformanceVote(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/performance\/votes$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/performance\/votes$/)[1];
        response = await handleGetPerformanceVotes(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/season\/vote$/) && method === 'POST') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/season\/vote$/)[1];
        response = await handleSeasonVote(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/season\/votes$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/season\/votes$/)[1];
        response = await handleGetSeasonVotes(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/similar$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/similar$/)[1];
        response = await handleGetSimilarPerfumes(request, env, perfumeId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/wishlist-status$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/wishlist-status$/)[1];
        response = await handleGetWishlistStatus(request, env, perfumeId);
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
      else if (path.match(/^\/api\/posts\/([^\/]+)\/like$/) && method === 'POST') {
        const postId = path.match(/^\/api\/posts\/([^\/]+)\/like$/)[1];
        response = await handleLikePost(request, env, postId);
      }
      else if (path.match(/^\/api\/posts\/([^\/]+)\/comments$/) && method === 'GET') {
        const postId = path.match(/^\/api\/posts\/([^\/]+)\/comments$/)[1];
        response = await handleGetComments(request, env, postId);
      }
      else if (path.match(/^\/api\/posts\/([^\/]+)\/comments$/) && method === 'POST') {
        const postId = path.match(/^\/api\/posts\/([^\/]+)\/comments$/)[1];
        response = await handleCreateComment(request, env, postId);
      }
      else if (path.match(/^\/api\/comments\/([^\/]+)$/) && method === 'DELETE') {
        const commentId = path.match(/^\/api\/comments\/([^\/]+)$/)[1];
        response = await handleDeleteComment(request, env, commentId);
      }
      else if (path.match(/^\/api\/posts\/([^\/]+)$/) && method === 'DELETE') {
        const postId = path.match(/^\/api\/posts\/([^\/]+)$/)[1];
        response = await handleDeletePost(request, env, postId);
      }
      
      // Wishlists routes
      else if (path === '/api/wishlists' && method === 'POST') {
        response = await handleAddToWishlist(request, env);
      }
      else if (path === '/api/wishlists' && method === 'DELETE') {
        response = await handleRemoveFromWishlist(request, env);
      }
      else if (path === '/api/wishlists/me' && method === 'GET') {
        response = await handleGetMyWishlists(request, env);
      }

      // Messages routes
      else if (path === '/api/messages/conversations' && method === 'GET') {
        response = await handleGetConversations(request, env);
      }
      else if (path === '/api/messages' && method === 'POST') {
        response = await handleSendMessage(request, env);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/new$/) && method === 'GET') {
        const otherUserId = path.match(/^\/api\/messages\/([^\/]+)\/new$/)[1];
        response = await handleGetNewMessages(request, env, otherUserId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/typing$/) && method === 'POST') {
        const otherUserId = path.match(/^\/api\/messages\/([^\/]+)\/typing$/)[1];
        response = await handleTypingIndicator(request, env, otherUserId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/status$/) && method === 'GET') {
        const otherUserId = path.match(/^\/api\/messages\/([^\/]+)\/status$/)[1];
        response = await handleGetChatStatus(request, env, otherUserId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/react$/) && method === 'POST') {
        const messageId = path.match(/^\/api\/messages\/([^\/]+)\/react$/)[1];
        response = await handleMessageReaction(request, env, messageId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/react$/) && method === 'DELETE') {
        const messageId = path.match(/^\/api\/messages\/([^\/]+)\/react$/)[1];
        response = await handleRemoveReaction(request, env, messageId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)$/) && method === 'GET') {
        const otherUserId = path.match(/^\/api\/messages\/([^\/]+)$/)[1];
        response = await handleGetMessages(request, env, otherUserId);
      }
      else if (path.match(/^\/api\/messages\/([^\/]+)\/read$/) && method === 'PUT') {
        const fromUserId = path.match(/^\/api\/messages\/([^\/]+)\/read$/)[1];
        response = await handleMarkAsRead(request, env, fromUserId);
      }
      
      // Image routes
      else if (path === '/api/images/upload' && method === 'POST') {
        response = await handleUploadImage(request, env);
      }
      else if (path.match(/^\/images\/(.+)$/) && method === 'GET') {
        const filename = path.match(/^\/images\/(.+)$/)[1];
        response = await handleGetImage(request, env, filename);
      }
      else if (path.match(/^\/api\/images\/(.+)$/) && method === 'DELETE') {
        const filename = path.match(/^\/api\/images\/(.+)$/)[1];
        response = await handleDeleteImage(request, env, filename);
      }
      
      // Collections routes
      else if (path.match(/^\/api\/users\/([^\/]+)\/collections$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/collections$/)[1];
        response = await handleGetCollections(request, env, userId);
      }
      else if (path === '/api/collections' && method === 'POST') {
        response = await handleCreateCollection(request, env);
      }
      else if (path.match(/^\/api\/collections\/([^\/]+)$/) && method === 'GET') {
        const collectionId = path.match(/^\/api\/collections\/([^\/]+)$/)[1];
        response = await handleGetCollection(request, env, collectionId);
      }
      else if (path.match(/^\/api\/collections\/([^\/]+)$/) && method === 'PUT') {
        const collectionId = path.match(/^\/api\/collections\/([^\/]+)$/)[1];
        response = await handleUpdateCollection(request, env, collectionId);
      }
      else if (path.match(/^\/api\/collections\/([^\/]+)$/) && method === 'DELETE') {
        const collectionId = path.match(/^\/api\/collections\/([^\/]+)$/)[1];
        response = await handleDeleteCollection(request, env, collectionId);
      }
      else if (path.match(/^\/api\/collections\/([^\/]+)\/perfumes$/) && method === 'POST') {
        const collectionId = path.match(/^\/api\/collections\/([^\/]+)\/perfumes$/)[1];
        response = await handleAddPerfumeToCollection(request, env, collectionId);
      }
      else if (path.match(/^\/api\/collections\/([^\/]+)\/perfumes\/([^\/]+)$/) && method === 'DELETE') {
        const collectionId = path.match(/^\/api\/collections\/([^\/]+)\/perfumes\/([^\/]+)$/)[1];
        const perfumeId = path.match(/^\/api\/collections\/([^\/]+)\/perfumes\/([^\/]+)$/)[2];
        response = await handleRemovePerfumeFromCollection(request, env, collectionId, perfumeId);
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
