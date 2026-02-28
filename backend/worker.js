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
import { handleSetSOTD, handleGetMySOTD, handleGetSOTDFeed, handleGetSOTDHistory, handleGetDiaryCalendar, handleGetDiaryStats } from './sotd.js';
import { handleGlobalSearch } from './search.js';
import { handleGetChallenges, handleGetChallenge, handleSubmitEntry, handleVoteEntry, handleGetUserBadges } from './challenges.js';
import { handleGetTasteTwins, handleGetTasteMatch } from './taste.js';
import { handleGetLayeringSuggestions, handleCreateLayeringSuggestion, handleVoteLayeringCombo, handleGetTopLayeringCombos } from './layering.js';
import { handleGetAllBadges, handleGetUserBadgesV2, handleGetUserLevel, handleGetLeaderboard, handleGetMyStats, handleCheckBadges } from './gamification.js';
import { handleGetQuiz, handleSubmitQuiz, handleGetProfile, handleGetRecommendations, handleExplore } from './discovery.js';
import { handleRegisterPushToken, handleUnregisterPushToken, handleGetPushPreferences, handleUpdatePushPreferences } from './notifications.js';
import { handleGetListings, handleGetListing, handleCreateListing, handleUpdateListing, handleDeleteListing, handleCreateOffer, handleGetMyListings, handleGetOffers } from './marketplace.js';
export { ChatRoom } from './chatroom.js';

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
      else if (path === '/api/diary/calendar' && method === 'GET') {
        response = await handleGetDiaryCalendar(request, env);
      }
      else if (path === '/api/diary/stats' && method === 'GET') {
        response = await handleGetDiaryStats(request, env);
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

      // Taste Twins
      else if (path === '/api/taste-twins' && method === 'GET') {
        response = await handleGetTasteTwins(request, env);
      }
      else if (path.match(/^\/api\/taste-match\/([^\/]+)$/) && method === 'GET') {
        const otherUserId = path.match(/^\/api\/taste-match\/([^\/]+)$/)[1];
        response = await handleGetTasteMatch(request, env, otherUserId);
      }

      // Challenge routes
      else if (path === '/api/challenges' && method === 'GET') {
        response = await handleGetChallenges(request, env);
      }
      else if (path.match(/^\/api\/challenges\/([^\/]+)\/entries\/([^\/]+)\/vote$/) && method === 'POST') {
        const entryId = path.match(/^\/api\/challenges\/([^\/]+)\/entries\/([^\/]+)\/vote$/)[2];
        response = await handleVoteEntry(request, env, entryId);
      }
      else if (path.match(/^\/api\/challenges\/([^\/]+)\/enter$/) && method === 'POST') {
        const challengeId = path.match(/^\/api\/challenges\/([^\/]+)\/enter$/)[1];
        response = await handleSubmitEntry(request, env, challengeId);
      }
      else if (path.match(/^\/api\/challenges\/([^\/]+)$/) && method === 'GET') {
        const challengeId = path.match(/^\/api\/challenges\/([^\/]+)$/)[1];
        response = await handleGetChallenge(request, env, challengeId);
      }
      else if (path.match(/^\/api\/users\/([^\/]+)\/badges$/) && method === 'GET') {
        const userId = path.match(/^\/api\/users\/([^\/]+)\/badges$/)[1];
        response = await handleGetUserBadges(request, env, userId);
      }

      // Gamification routes
      else if (path === '/api/gamification/badges' && method === 'GET') {
        response = await handleGetAllBadges(request, env);
      }
      else if (path === '/api/gamification/leaderboard' && method === 'GET') {
        response = await handleGetLeaderboard(request, env);
      }
      else if (path === '/api/gamification/stats' && method === 'GET') {
        response = await handleGetMyStats(request, env);
      }
      else if (path === '/api/gamification/check' && method === 'POST') {
        response = await handleCheckBadges(request, env);
      }
      else if (path.match(/^\/api\/gamification\/badges\/([^\/]+)$/) && method === 'GET') {
        const userId = path.match(/^\/api\/gamification\/badges\/([^\/]+)$/)[1];
        response = await handleGetUserBadgesV2(request, env, userId);
      }
      else if (path.match(/^\/api\/gamification\/level\/([^\/]+)$/) && method === 'GET') {
        const userId = path.match(/^\/api\/gamification\/level\/([^\/]+)$/)[1];
        response = await handleGetUserLevel(request, env, userId);
      }

      // Layering routes
      else if (path === '/api/layering' && method === 'GET') {
        response = await handleGetTopLayeringCombos(request, env);
      }
      else if (path === '/api/layering' && method === 'POST') {
        response = await handleCreateLayeringSuggestion(request, env);
      }
      else if (path.match(/^\/api\/layering\/([^\/]+)\/vote$/) && method === 'POST') {
        const comboId = path.match(/^\/api\/layering\/([^\/]+)\/vote$/)[1];
        response = await handleVoteLayeringCombo(request, env, comboId);
      }
      else if (path.match(/^\/api\/perfumes\/([^\/]+)\/layering$/) && method === 'GET') {
        const perfumeId = path.match(/^\/api\/perfumes\/([^\/]+)\/layering$/)[1];
        response = await handleGetLayeringSuggestions(request, env, perfumeId);
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
      
      // Discovery Engine routes
      else if (path === '/api/discovery/quiz' && method === 'GET') {
        response = await handleGetQuiz(request, env);
      }
      else if (path === '/api/discovery/quiz' && method === 'POST') {
        response = await handleSubmitQuiz(request, env);
      }
      else if (path === '/api/discovery/profile' && method === 'GET') {
        response = await handleGetProfile(request, env);
      }
      else if (path === '/api/discovery/recommendations' && method === 'GET') {
        response = await handleGetRecommendations(request, env);
      }
      else if (path === '/api/discovery/explore' && method === 'GET') {
        response = await handleExplore(request, env);
      }

      // Push Notification routes
      else if (path === '/api/push/register' && method === 'POST') {
        response = await handleRegisterPushToken(request, env);
      }
      else if (path === '/api/push/register' && method === 'DELETE') {
        response = await handleUnregisterPushToken(request, env);
      }
      else if (path === '/api/push/preferences' && method === 'GET') {
        response = await handleGetPushPreferences(request, env);
      }
      else if (path === '/api/push/preferences' && method === 'PUT') {
        response = await handleUpdatePushPreferences(request, env);
      }

      // Marketplace routes
      else if (path === '/api/marketplace/my' && method === 'GET') {
        response = await handleGetMyListings(request, env);
      }
      else if (path === '/api/marketplace' && method === 'GET') {
        response = await handleGetListings(request, env);
      }
      else if (path === '/api/marketplace' && method === 'POST') {
        response = await handleCreateListing(request, env);
      }
      else if (path.match(/^\/api\/marketplace\/([^\/]+)\/offer$/) && method === 'POST') {
        const listingId = path.match(/^\/api\/marketplace\/([^\/]+)\/offer$/)[1];
        response = await handleCreateOffer(request, env, listingId);
      }
      else if (path.match(/^\/api\/marketplace\/([^\/]+)\/offers$/) && method === 'GET') {
        const listingId = path.match(/^\/api\/marketplace\/([^\/]+)\/offers$/)[1];
        response = await handleGetOffers(request, env, listingId);
      }
      else if (path.match(/^\/api\/marketplace\/([^\/]+)$/) && method === 'GET') {
        const listingId = path.match(/^\/api\/marketplace\/([^\/]+)$/)[1];
        response = await handleGetListing(request, env, listingId);
      }
      else if (path.match(/^\/api\/marketplace\/([^\/]+)$/) && method === 'PUT') {
        const listingId = path.match(/^\/api\/marketplace\/([^\/]+)$/)[1];
        response = await handleUpdateListing(request, env, listingId);
      }
      else if (path.match(/^\/api\/marketplace\/([^\/]+)$/) && method === 'DELETE') {
        const listingId = path.match(/^\/api\/marketplace\/([^\/]+)$/)[1];
        response = await handleDeleteListing(request, env, listingId);
      }

      // WebSocket route for real-time chat
      else if (path.match(/^\/api\/ws\/([^\/]+)$/) && request.headers.get('Upgrade') === 'websocket') {
        const roomId = path.match(/^\/api\/ws\/([^\/]+)$/)[1];
        const durableId = env.CHAT_ROOMS.idFromName(roomId);
        const stub = env.CHAT_ROOMS.get(durableId);
        return stub.fetch(new Request('https://dummy/websocket' + '?' + url.search.slice(1), request));
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
