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
| Secret | `JWT_SECRET` | (encrypted) |

## Estrutura de Ficheiros

```
fragbase/
├── app/                    # React Native + Expo
│   ├── App.js              # Entry point com navigation (5 tabs + stacks)
│   ├── AuthContext.js       # Global auth state (login/logout/refreshUser)
│   ├── config.js            # API_URL + apiCall/apiUpload helpers
│   ├── theme.js             # Design system (colors, typography, spacing)
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
│       ├── SOTDPicker.js    # Selecionar perfume do dia
│       └── Chat.js          # Chat individual (reactions, typing)
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
│   ├── sotd.js             # Scent of the Day endpoints
│   ├── search.js           # Busca global + avançada
│   ├── images.js           # Upload/serve/delete via R2
│   ├── wrangler.toml       # Config do Worker
│   └── migrations/
│       ├── 002-add-username.sql
│       ├── 003-post-likes-and-comments.sql
│       ├── 004-voting-tables.sql
│       ├── 005-seed-perfumes.sql  # 50 perfumes seed data
│       └── 006-sotd.sql           # SOTD table + posts type column
└── FRAGBASE-PLANO.md       # Roadmap completo
```

## Tabelas D1

users, perfumes, reviews, posts, likes, follows, collections, collections_perfumes, messages, post_likes, comments, perfume_accords, accord_votes, note_votes, performance_votes, season_votes, wishlists, typing_status, message_reactions, sotd

## API Endpoints (~60 rotas)

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
- `GET /api/perfumes/:id/similar` — Similares
- `GET /api/perfumes/:id/wishlist-status` — Status wishlist

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

### SOTD
- `POST /api/sotd` — Definir perfume do dia
- `GET /api/sotd/me` — Meu SOTD de hoje
- `GET /api/sotd/feed` — SOTD feed (seguidos)
- `GET /api/sotd/:userId/history` — Histórico SOTD

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
- **Sprint 5:** Launch Prep — EM PROGRESSO

### Deploy realizado em 27/02/2026:
- Worker deployed com endpoints da FASE 2
- D1 com tabelas base (migrations 002+)
- R2 ativado com bucket `fragbase-images`
- JWT_SECRET configurado como secret
- **Pendente redeploy** com Sprint 3-4 (novos endpoints, migrations 003-006)

## Próximos Passos

1. **Redeploy backend** com todas as novas rotas e migrations (003-006)
2. Push para GitHub
3. Testes em dispositivos reais
4. Criar assets reais (icon, splash) — substituir placeholders
5. EAS Build para TestFlight/Internal Testing
6. WebSocket via Durable Objects para messaging real-time
7. Push notifications (Expo Push)
8. Ingestão de mais dados de perfumes (500+ para MVP)

## Notas Importantes

- O `wrangler.toml` local tinha o R2 comentado — foi adicionado via `echo >> wrangler.toml` durante deploy
- JWT_SECRET foi configurado via dashboard Settings (já existia de deploy anterior)
- O proxy da VM Cowork bloqueia `api.cloudflare.com` — deploys devem ser feitos da máquina do user
- O app frontend precisa de `cd app && npm install && npx expo start` para rodar
- Commits locais: ~30+ commits não pushed para GitHub

---
*Última atualização: 27/02/2026*
