# FragBase Backend

Backend API para FragBase, construído com Cloudflare Workers + D1.

## Quick Start

### Desenvolvimento Local

```bash
npm install
wrangler d1 execute fragbase --local --file=../docs/db-schema.sql
wrangler d1 execute fragbase --local --file=seed.sql
JWT_SECRET="dev-secret" wrangler dev --local
```

### Deploy para Produção

```bash
npm install
wrangler d1 create fragbase  # Anote o database_id
# Edite wrangler.toml com o database_id
wrangler d1 execute fragbase --remote --file=../docs/db-schema.sql
wrangler d1 execute fragbase --remote --file=seed.sql
wrangler secret put JWT_SECRET
wrangler deploy
```

Veja guia completo em: `../docs/DEPLOY_PRODUCTION.md`

## Dados de Seed

O arquivo `seed.sql` (gerado por `seed.js`) contém:

- **5 usuários de teste** (senha: `senha123`):
  - maria@fragbase.com — Maria Silva
  - joao@fragbase.com — João Santos
  - ana@fragbase.com — Ana Costa
  - pedro@fragbase.com — Pedro Oliveira
  - carla@fragbase.com — Carla Mendes

- **50 perfumes populares**:
  - Sauvage (Dior)
  - Bleu de Chanel (Chanel)
  - Aventus (Creed)
  - Light Blue (D&G)
  - 1 Million (Paco Rabanne)
  - ... e mais 45

- **~70 reviews** (10-15 por usuário)
- **~14 follows** (usuários seguem uns aos outros)
- **~15 posts** (alguns vinculados a perfumes)

## Estrutura

```
backend/
├── worker.js        # Entry point + router
├── auth.js          # Auth (JWT, register, login)
├── users.js         # User routes
├── perfumes.js      # Perfume routes
├── reviews.js       # Review routes
├── posts.js         # Posts/feed routes
├── seed.js          # Script gerador de dados
├── seed.sql         # Dados gerados (50 perfumes + 5 users)
├── wrangler.toml    # Cloudflare config
└── package.json     # Dependencies
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users
- `GET /api/users/:id`
- `PUT /api/users/me`
- `GET /api/users/:id/reviews`
- `GET /api/users/:id/collections`
- `POST /api/users/:id/follow`
- `DELETE /api/users/:id/follow`

### Perfumes
- `GET /api/perfumes`
- `GET /api/perfumes/:id`
- `POST /api/perfumes`
- `GET /api/perfumes/:id/reviews`

### Reviews
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`
- `POST /api/reviews/:id/like`

### Posts (Feed)
- `GET /api/posts`
- `POST /api/posts`
- `DELETE /api/posts/:id`

Veja testes em: `../docs/API_TESTS.md`

## Testing

```bash
# Health check
curl http://localhost:8787/api/status

# Login
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@fragbase.com","password":"senha123"}'

# List perfumes
curl http://localhost:8787/api/perfumes
```

## Environment Variables

- `JWT_SECRET` — Secret para assinatura de tokens JWT (configurar com `wrangler secret put JWT_SECRET`)

## Dependencies

- `@tsndr/cloudflare-worker-jwt` — JWT para Workers
- `wrangler` — Cloudflare Workers CLI

## License

MIT
