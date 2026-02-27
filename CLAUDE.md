# CLAUDE.md — Fragbase Project Context

> Este ficheiro serve como "memória persistente" para o Claude em cada nova sessão.
> Coloca-o na raiz do projeto (`~/fragbase/CLAUDE.md`) para que o Claude o leia automaticamente.

---

## Projeto

**Fragbase** — Rede social mobile de perfumaria (concorrente do Fragrantica).
MVP em desenvolvimento ativo.

## Stack Técnica

- **Frontend:** React Native + Expo (pasta `app/`)
- **Backend:** Cloudflare Workers (ESM module) (pasta `backend/`)
- **Database:** Cloudflare D1 (SQLite serverless)
- **Storage:** Cloudflare R2 (object storage para imagens)
- **Auth:** JWT via `@tsndr/cloudflare-worker-jwt`
- **Repo GitHub:** `mike-warlet/fragbase`

## Credenciais & IDs Cloudflare

- **Account ID:** `c8dd4182b1cf4eeebaf5202cc6c20c02`
- **Account email:** `warlet.invest@gmail.com`
- **API Token:** `-CzMYx_vE5EBm-F3sEpYEnf3HnDRlqHuByctiHaG`
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
│   ├── App.js              # Entry point com navigation
│   ├── AuthContext.js       # Global auth state (login/logout/refreshUser)
│   ├── config.js            # API_URL + apiCall/apiUpload helpers
│   ├── components/
│   │   └── ErrorBoundary.js
│   └── screens/
│       ├── Login.js         # Login/Register
│       ├── Home.js          # Feed de posts
│       ├── Search.js        # Busca global
│       ├── Profile.js       # Perfil próprio
│       ├── UserProfile.js   # Perfil de outro user
│       ├── EditProfile.js   # Editar perfil
│       ├── PerfumeDetail.js # Detalhes do perfume
│       ├── CreateReview.js  # Criar review
│       ├── CreatePost.js    # Criar post
│       ├── Collections.js   # Lista de coleções
│       ├── CollectionDetail.js
│       ├── CreateCollection.js
│       ├── Messages.js      # Lista de conversas
│       └── Chat.js          # Chat individual
├── backend/                # Cloudflare Worker
│   ├── worker.js           # Router principal (ESM module)
│   ├── auth.js             # Register/login/JWT
│   ├── users.js            # CRUD users + follows
│   ├── perfumes.js         # CRUD perfumes
│   ├── reviews.js          # CRUD reviews + likes
│   ├── posts.js            # CRUD posts + likes + comments
│   ├── collections.js      # CRUD collections
│   ├── messages.js         # CRUD messages/conversations
│   ├── search.js           # Busca global + avançada
│   ├── images.js           # Upload/serve/delete via R2
│   ├── wrangler.toml       # Config do Worker
│   └── migrations/
│       ├── 002-add-username.sql
│       └── 003-post-likes-and-comments.sql
└── docs/
    └── PLANO.md            # Roadmap completo
```

## Tabelas D1

users, perfumes, reviews, posts, likes, follows, collections, collections_perfumes, messages, post_likes, comments

## API Endpoints (45 rotas)

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

### Perfumes
- `GET /api/perfumes` — Listar (paginado, busca)
- `GET /api/perfumes/:id` — Detalhes
- `POST /api/perfumes` — Criar
- `GET /api/perfumes/:id/reviews` — Reviews

### Reviews
- `POST /api/reviews` — Criar
- `PUT /api/reviews/:id` — Editar
- `DELETE /api/reviews/:id` — Deletar
- `POST /api/reviews/:id/like` — Curtir

### Posts
- `GET /api/posts` — Feed (com likes/comments count)
- `POST /api/posts` — Criar
- `DELETE /api/posts/:id` — Deletar
- `POST /api/posts/:id/like` — Curtir/descurtir
- `GET /api/posts/:id/comments` — Listar comentários
- `POST /api/posts/:id/comments` — Comentar
- `DELETE /api/comments/:id` — Deletar comentário

### Collections
- `GET /api/collections` — Minhas coleções
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

### Search
- `GET /api/search?q=termo` — Busca global
- `GET /api/search/perfumes?filters` — Busca avançada (brand, type, year, rating, notes, sort)

### Images
- `POST /api/images/upload` — Upload
- `GET /images/:filename` — Serve imagem
- `DELETE /api/images/:filename` — Deletar

## Status do Projeto

- **FASE 1:** Fundação — COMPLETA
- **FASE 2:** Core Features — COMPLETA + DEPLOYED
- **FASE 3:** Social & Real-time — Pendente
- **FASE 4:** Ingestão de Dados & Polish — Pendente

### Deploy realizado em 27/02/2026:
- Worker deployed com todos os endpoints
- D1 com todas as tabelas (incluindo migration 003)
- R2 ativado com bucket `fragbase-images`
- JWT_SECRET configurado como secret

## Próximos Passos (FASE 3)

1. WebSocket via Durable Objects para messaging real-time
2. Push notifications (Expo Push)
3. Feed algorítmico (ordenação por engajamento)
4. Autenticação social (Google, Apple)
5. Ingestão de dados de perfumes (scraping Fragrantica)
6. GitHub Actions para CI/CD
7. Preparação para beta (TestFlight/Google Play)

## Notas Importantes

- O `wrangler.toml` local tinha o R2 comentado — foi adicionado via `echo >> wrangler.toml` durante deploy
- JWT_SECRET foi configurado via dashboard Settings (já existia de deploy anterior)
- O proxy da VM Cowork bloqueia `api.cloudflare.com` — deploys devem ser feitos da máquina do user
- O app frontend precisa de `cd app && npm install && npx expo start` para rodar

---
*Última atualização: 27/02/2026*
