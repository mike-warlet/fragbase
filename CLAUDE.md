# CLAUDE.md — Fragbase Project Context

> Este ficheiro serve como "memória persistente" para o Claude em cada nova sessão.
> Coloca-o na raiz do projeto (`~/fragbase/CLAUDE.md`) para que o Claude o leia automaticamente.

---

## Projeto

**Fragbase** — Rede social mobile de perfumaria (concorrente do Fragrantica).
MVP em desenvolvimento ativo.

## Stack Técnica

- **Frontend:** React Native + Expo SDK 51 (pasta `app/`)
- **Backend:** Cloudflare Workers (ESM module) (pasta `backend/`)
- **Database:** Cloudflare D1 (SQLite serverless)
- **Storage:** Cloudflare R2 (object storage para imagens)
- **Auth:** JWT via `@tsndr/cloudflare-worker-jwt`
- **Repo GitHub:** `mike-warlet/fragbase`

## Credenciais & IDs Cloudflare

- **Account ID:** `c8dd4182b1cf4eeebaf5202cc6c20c02`
- **Account email:** `warlet.invest@gmail.com`
- **API Token:** `Einh3NbZgO9jL3WdlvndReNCcfHnyCgxqqBZHizg`
- **Worker name:** `fragbase-api`
- **Worker URL:** `https://fragbase-api.warlet-invest.workers.dev`
- **D1 database name:** `fragbase`
- **D1 database ID:** `d7b6f6e4-f0e9-4f1f-9f9a-edd9be0d0259`
- **R2 bucket:** `fragbase-images`

## Bindings do Worker

| Tipo | Nome | Valor |
|------|------|-------|
| D1 Database | `DB` | fragbase |
| R2 Bucket | `IMAGES` | fragbase-images |
| Durable Object | `CHAT_ROOMS` | ChatRoom (WebSocket) |
| Secret | `JWT_SECRET` | (encrypted) |

## Estrutura de Ficheiros

```
fragbase/
├── app/                    # React Native + Expo
│   ├── App.js              # Entry point com navigation (5 tabs + stacks)
│   ├── AuthContext.js       # Global auth state (login/logout/refreshUser)
│   ├── config.js            # API_URL + apiCall/apiUpload helpers
│   ├── theme.js             # Design system (colors, typography, spacing)
│   ├── PushNotificationManager.js # Expo push notifications hook
│   ├── useWebSocket.js      # WebSocket hook for real-time chat
│   ├── app.json             # Expo config (icon, splash, permissions)
│   ├── eas.json             # EAS Build config (dev/preview/production)
│   ├── assets/              # App icon, splash screen, favicon
│   ├── components/
│   │   ├── ErrorBoundary.js
│   │   ├── RatingStars.js       # Interactive star rating
│   │   ├── SOTDBanner.js        # Scent of the Day banner
│   │   ├── ReviewCard.js        # Review display card
│   │   ├── AccordVoting.js      # Accord voting UI
│   │   ├── NoteVoting.js        # Note voting UI
│   │   ├── PerformanceVoting.js # Performance voting
│   │   ├── SeasonVoting.js      # Season voting
│   │   ├── SimilarPerfumes.js   # Similar perfumes list
│   │   ├── WishlistButtons.js   # Own/Want/Tried buttons
│   │   ├── LayeringSuggestions.js # Layering combo suggestions
│   │   ├── MessageBubble.js     # Chat message bubble
│   │   ├── TypingIndicator.js   # Chat typing indicator
│   │   └── OnlineIndicator.js   # Online status dot
│   └── screens/
│       ├── Login.js         # Login/Register
│       ├── Home.js          # Feed (infinite scroll, likes, comments, SOTD)
│       ├── Search.js        # Busca global
│       ├── MyCollection.js  # Grid/list perfumes (tab Coleção)
│       ├── Messages.js      # Lista de conversas
│       ├── Profile.js       # Perfil próprio
│       ├── UserProfile.js   # Perfil de outro user
│       ├── EditProfile.js   # Editar perfil
│       ├── PerfumeDetail.js # Detalhes (voting, notes, accords)
│       ├── CreateReview.js  # Criar review (com RatingStars)
│       ├── CreatePost.js    # Criar post
│       ├── Collections.js   # Lista de coleções
│       ├── CollectionDetail.js
│       ├── CreateCollection.js
│       ├── Wishlist.js      # Want/Tried lists (tabs)
│       ├── AddFragrance.js  # Search + create perfume
│       ├── Notifications.js # Follow, like, comment notifications
│       ├── SOTDPicker.js    # Selecionar perfume do dia (+ mood/occasion/weather)
│       ├── FragranceDiary.js # Calendar view + wear stats
│       ├── Compare.js       # Side-by-side perfume comparison
│       ├── Chat.js          # Chat individual (WebSocket + reactions, typing)
│       ├── ScentQuiz.js     # Discovery scent quiz (multi-step)
│       ├── Recommendations.js # Personalized perfume recommendations
│       ├── Explore.js       # Discovery explore (horizontal sections)
│       ├── Badges.js        # Gamification badges by category
│       └── Leaderboard.js   # XP leaderboard with podium
├── backend/                # Cloudflare Worker
│   ├── worker.js           # Router principal (ESM module)
│   ├── auth.js             # Register/login/JWT
│   ├── users.js            # CRUD users + follows + followers + notifications
│   ├── perfumes.js         # CRUD perfumes + trending
│   ├── reviews.js          # CRUD reviews + likes
│   ├── posts.js            # CRUD posts + likes + comments
│   ├── collections.js      # CRUD collections
│   ├── messages.js         # CRUD messages + typing + reactions
│   ├── voting.js           # Accords, notes, performance, season voting + wishlists
│   ├── sotd.js             # Scent of the Day + Diary endpoints
│   ├── layering.js         # Layering suggestions + voting
│   ├── search.js           # Busca global + avançada
│   ├── images.js           # Upload/serve/delete via R2
│   ├── discovery.js         # Scent quiz + recommendations engine
│   ├── gamification.js      # Badges, XP, levels, achievements
│   ├── notifications.js     # Push notifications (Expo Push API)
│   ├── chatroom.js          # Durable Object for WebSocket chat
│   ├── deploy.sh            # Deploy script (migrations + worker)
│   ├── wrangler.toml       # Config do Worker
│   └── migrations/
│       ├── 002-add-username.sql
│       ├── 003-post-likes-and-comments.sql
│       ├── 004-voting-tables.sql
│       ├── 005-seed-perfumes.sql  # 50 perfumes seed data
│       ├── 006-sotd.sql           # SOTD table + posts type column
│       ├── 007-diary-fields.sql   # Add occasion/mood/weather to SOTD
│       ├── 008-layering.sql       # Layering combos + votes tables
│       ├── 009-challenges.sql     # Weekly challenges + badges + voting
│       ├── 010-seed-500-perfumes.sql # 450+ additional perfumes (total 500+)
│       ├── 011-discovery.sql      # Quiz responses + scent profiles + recommendations
│       ├── 012-gamification.sql   # Badges, XP, levels, user stats (34 badges seeded)
│       └── 013-push-tokens.sql    # Push tokens + notification preferences
└── FRAGBASE-PLANO.md       # Roadmap completo
```

## Tabelas D1

users, perfumes, reviews, posts, likes, follows, collections, collections_perfumes, messages, post_likes, comments, perfume_accords, accord_votes, note_votes, performance_votes, season_votes, wishlists, typing_status, message_reactions, sotd, layering_combos, layering_votes, challenges, challenge_entries, challenge_votes, user_badges, quiz_responses, user_scent_profile, recommendations, badges, user_badges_v2, user_xp, xp_transactions, user_stats, push_tokens, notification_preferences

## API Endpoints (~100 rotas)

### Auth
- `POST /api/auth/register` — Cadastro
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Dados do user autenticado

### Users
- `GET /api/users/:id` — Perfil público
- `PUT /api/users/me` — Atualizar perfil
- `GET /api/users/:id/reviews` — Reviews do user
- `GET /api/users/:id/collections` — Coleções
- `POST /api/users/:id/follow` — Seguir
- `DELETE /api/users/:id/follow` — Deixar de seguir
- `GET /api/users/:id/followers` — Lista seguidores
- `GET /api/users/:id/following` — Lista seguidos
- `GET /api/users/:id/taste-profile` — Perfil de gosto
- `GET /api/notifications` — Notificações agregadas

### Perfumes
- `GET /api/perfumes` — Listar (paginado, busca)
- `GET /api/perfumes/:id` — Detalhes
- `POST /api/perfumes` — Criar
- `GET /api/perfumes/:id/reviews` — Reviews
- `GET /api/perfumes/trending` — Trending
- `GET /api/perfumes/compare?ids=id1,id2` — Comparar 2-4 perfumes
- `GET /api/perfumes/:id/similar` — Similares
- `GET /api/perfumes/:id/wishlist-status` — Status wishlist
- `GET /api/perfumes/:id/layering` — Layering suggestions

### Voting
- `POST /api/perfumes/:id/notes/vote` — Votar nota
- `GET /api/perfumes/:id/notes/votes` — Votos notas
- `POST /api/perfumes/:id/accords/vote` — Votar accord
- `GET /api/perfumes/:id/accords/votes` — Votos accords
- `POST /api/perfumes/:id/performance/vote` — Votar performance
- `GET /api/perfumes/:id/performance/votes` — Votos performance
- `POST /api/perfumes/:id/season/vote` — Votar estação
- `GET /api/perfumes/:id/season/votes` — Votos estação

### Reviews
- `POST /api/reviews` — Criar
- `PUT /api/reviews/:id` — Editar
- `DELETE /api/reviews/:id` — Deletar
- `POST /api/reviews/:id/like` — Curtir

### Posts
- `GET /api/posts` — Feed (likes/comments count, infinite scroll)
- `POST /api/posts` — Criar
- `DELETE /api/posts/:id` — Deletar
- `POST /api/posts/:id/like` — Curtir/descurtir
- `GET /api/posts/:id/comments` — Listar comentários
- `POST /api/posts/:id/comments` — Comentar
- `DELETE /api/comments/:id` — Deletar comentário

### SOTD & Diary
- `POST /api/sotd` — Definir perfume do dia (+ occasion/mood/weather)
- `GET /api/sotd/me` — Meu SOTD de hoje
- `GET /api/sotd/feed` — SOTD feed (seguidos)
- `GET /api/sotd/:userId/history` — Histórico SOTD
- `GET /api/diary/calendar?year=&month=` — Calendar entries
- `GET /api/diary/stats` — Wear stats (most worn, streak, patterns)

### Layering
- `GET /api/layering` — Top layering combos (global)
- `POST /api/layering` — Sugerir combo
- `POST /api/layering/:id/vote` — Votar combo (1/-1 toggle)

### Wishlists
- `POST /api/wishlists` — Adicionar (own/want/tried)
- `DELETE /api/wishlists` — Remover
- `GET /api/wishlists/me` — Minhas wishlists (filtro ?type=)

### Collections
- `POST /api/collections` — Criar
- `GET /api/collections/:id` — Detalhes
- `PUT /api/collections/:id` — Atualizar
- `DELETE /api/collections/:id` — Deletar
- `POST /api/collections/:id/perfumes` — Adicionar perfume
- `DELETE /api/collections/:id/perfumes/:perfumeId` — Remover

### Messages
- `GET /api/messages/conversations` — Conversas
- `GET /api/messages/:userId` — Chat
- `POST /api/messages` — Enviar
- `PUT /api/messages/:userId/read` — Marcar lida
- `GET /api/messages/:userId/new` — Mensagens novas (polling)
- `POST /api/messages/:userId/typing` — Indicador typing
- `GET /api/messages/:userId/status` — Status chat
- `POST /api/messages/:id/react` — Reação a mensagem
- `DELETE /api/messages/:id/react` — Remover reação

### Discovery Engine
- `GET /api/discovery/quiz` — Quiz questions (12 questions)
- `POST /api/discovery/quiz` — Submit quiz, compute scent profile
- `GET /api/discovery/profile` — User's computed scent profile
- `GET /api/discovery/recommendations` — Personalized recommendations
- `GET /api/discovery/explore` — Curated discovery sections

### Gamification
- `GET /api/gamification/badges` — All badges (with earned status)
- `GET /api/gamification/badges/:userId` — User's earned badges
- `GET /api/gamification/level/:userId` — User XP and level
- `GET /api/gamification/leaderboard` — Top users by XP
- `GET /api/gamification/stats` — Current user's stats
- `POST /api/gamification/check` — Trigger badge check

### Push Notifications
- `POST /api/push/register` — Register push token
- `DELETE /api/push/register` — Unregister push token
- `GET /api/push/preferences` — Get notification preferences
- `PUT /api/push/preferences` — Update preferences

### WebSocket (Real-time Chat)
- `WS /api/ws/:roomId` — WebSocket connection for real-time messaging

### Images
- `POST /api/images/upload` — Upload
- `GET /images/:filename` — Serve imagem
- `DELETE /api/images/:filename` — Deletar

## Padrões Importantes

### API Helper (config.js)
```javascript
apiCall(endpoint, options = {})   // Auto-injeta JWT token
apiUpload(endpoint, formData)     // Upload com multipart
```
**NÃO** usar: `apiCall(url, method, body)` — usar sempre `apiCall(url, { method, body })`

### Theme (theme.js)
Dark theme default: `background: '#1a1a2e'`, `surface: '#2a2a45'`, `primary: '#8b4513'`
Exports: `colors`, `typography`, `spacing`, `borderRadius`, `shadows`, `getAccordColor()`, `getGenderColor()`

### Navigation (App.js)
5 tabs: Feed, Buscar, Coleção, Mensagens, Perfil
Stack screens acessíveis via `navigation.getParent()?.navigate()`

## Status do Projeto

- **Sprint 1:** App funcional básico — COMPLETO
- **Sprint 2:** Coleção & Reviews — COMPLETO
- **Sprint 3:** Social (feed, likes, comments, notificações) — COMPLETO
- **Sprint 4:** Data & Polish (seed, SOTD, Expo config, EAS) — COMPLETO
- **Sprint 5:** Launch Prep (audit, bug fixes) — COMPLETO
- **Sprint 6:** New Features (comparison, diary, layering, challenges, taste twins) — COMPLETO
- **Sprint 7:** Platform Features — COMPLETO
  - Discovery Engine (scent quiz + 12 questions + recommendation algorithm)
  - Gamification (34 badges, XP levels, leaderboard, achievement tracking)
  - Push Notifications (Expo Push API, preferences, token management)
  - WebSocket Real-time Chat (Durable Objects, typing, online status)
  - 500+ perfumes seeded (designer + niche, 50+ brands)
  - Deploy script (`backend/deploy.sh`)

- **Sprint 8:** Competitor Features & Performance — COMPLETO
  - Statements (micro-reviews, 280 chars, tags, voting)
  - Perfumer/Nose profiles (15 seeded, lineage tracking)
  - "If You Like X, Try Y" user recommendations with voting
  - Backend caching (Cache-Control headers, ETags)
  - Frontend cache layer (in-memory with TTL)
  - React.memo on PerfumeCard, ReviewCard
  - useCallback on all FlatList renderItems
  - Debounce on Compare search
  - Messages polling reduced 10s -> 30s

### Deploy:
- Worker deployed em 28/02/2026 com Sprint 1-8 completo (migrations 001-017)
- Deploy script disponível: `cd backend && bash deploy.sh`
- GitHub: All commits pushed, up to date with origin/main

### New Endpoints (Sprint 8):
- `GET/POST /api/perfumes/:id/statements` — Micro-reviews
- `POST /api/statements/:id/vote` — Vote on statement
- `GET /api/perfumers` — List perfumers
- `GET /api/perfumers/:id` — Perfumer detail + fragrances
- `GET /api/perfumes/:id/noses` — Perfumers for a perfume
- `POST /api/perfumers/link` — Link perfumer to perfume
- `GET/POST /api/perfumes/:id/recommendations` — User recs
- `POST /api/recommendations/:id/vote` — Vote on rec

## Notas Importantes

- JWT_SECRET foi configurado via dashboard Settings
- O app frontend precisa de `cd app && npm install && npx expo start` para rodar
- GitHub token configurado no remote URL para push automático
- Assets: icon.png (1024x1024), splash.png (1284x2778) - prontos para store
- EAS: eas.json configurado, faltam credenciais Apple/Google no submit section

## Competitor Intelligence Summary

Features implementadas que concorrentes NAO tem:
- Gamification (34 badges, XP, levels) - Fragrantica/Parfumo nao tem
- Weather smart picks - unico
- Taste twins / affinity matching - unico
- Real-time WebSocket chat - unico
- Layering suggestions - unico
- Batch code checker - unico
- Weekly challenges - unico

Features futuras recomendadas (por prioridade):
1. Scent Compass / Visual Map (Parfumo tem) - Medium effort
2. SOTD Calendar View (Parfumo tem) - Easy
3. Ingredient Encyclopedia (Fragrantica tem) - Easy-Medium
4. Collection Analytics (Parfumo tem) - Easy-Medium
5. Price Tracking & Alerts (Parfumo/Sniff tem) - Hard

---
*Ultima atualizacao: 28/02/2026*
*Sprint 8 completado: Statements, Perfumer Profiles, User Recommendations, Performance Optimizations*
