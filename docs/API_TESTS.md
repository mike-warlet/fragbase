# FragBase - API Testing Guide

## Base URL
- **Local:** `http://localhost:8787`
- **Production:** `https://fragbase-api.YOUR_SUBDOMAIN.workers.dev`

---

## Test Users (from seed data)
All test users have password: `senha123`

| Email | Name | Bio |
|-------|------|-----|
| maria@fragbase.com | Maria Silva | Apaixonada por perfumes orientais e amadeirados |
| joao@fragbase.com | João Santos | Perfumista amador. Prefiro fragrâncias cítricas |
| ana@fragbase.com | Ana Costa | Adoro florais e gourmands |
| pedro@fragbase.com | Pedro Oliveira | Especialista em fragrâncias de nicho |
| carla@fragbase.com | Carla Mendes | Minimalista: 5 perfumes essenciais |

---

## 1. Health Check

### GET /api/status
**No auth required**

```bash
curl http://localhost:8787/api/status
```

**Expected Response:**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

---

## 2. Authentication

### POST /api/auth/register
**Register new user**

```bash
curl -X POST http://localhost:8787/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@fragbase.com",
    "password": "senha123",
    "name": "Teste Usuario"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUz...",
  "user": {
    "id": "uuid",
    "email": "teste@fragbase.com",
    "name": "Teste Usuario"
  }
}
```

### POST /api/auth/login
**Login existing user**

```bash
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@fragbase.com",
    "password": "senha123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUz...",
  "user": {
    "id": "uuid",
    "email": "maria@fragbase.com",
    "name": "Maria Silva"
  }
}
```

### GET /api/auth/me
**Get current user (requires auth)**

```bash
TOKEN="your_token_here"
curl http://localhost:8787/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "maria@fragbase.com",
    "name": "Maria Silva",
    "photo_url": null,
    "bio": "Apaixonada por perfumes orientais...",
    "created_at": "2026-02-26T..."
  }
}
```

---

## 3. Perfumes

### GET /api/perfumes
**List perfumes (with optional search)**

```bash
# List all (paginated)
curl http://localhost:8787/api/perfumes

# Search
curl http://localhost:8787/api/perfumes?q=Sauvage

# Pagination
curl http://localhost:8787/api/perfumes?page=2&limit=20
```

**Expected Response:**
```json
{
  "perfumes": [
    {
      "id": "uuid",
      "name": "Sauvage",
      "brand": "Dior",
      "year": 2015,
      "type": "Eau de Toilette",
      "image_url": null
    }
  ],
  "page": 1,
  "limit": 20
}
```

### GET /api/perfumes/:id
**Get perfume details with stats**

```bash
PERFUME_ID="uuid_from_seed"
curl http://localhost:8787/api/perfumes/$PERFUME_ID
```

**Expected Response:**
```json
{
  "perfume": {
    "id": "uuid",
    "name": "Sauvage",
    "brand": "Dior",
    "year": 2015,
    "type": "Eau de Toilette",
    "notes_top": "Bergamota, Pimenta",
    "notes_heart": "Lavanda, Gerânio, Elemi",
    "notes_base": "Ambroxan, Cedro, Labdanum",
    "description": "Um perfume masculino icônico...",
    "image_url": null,
    "created_at": "2026-02-26T...",
    "review_count": 5,
    "avg_rating": 4.2
  }
}
```

### POST /api/perfumes
**Create new perfume (requires auth)**

```bash
TOKEN="your_token"
curl -X POST http://localhost:8787/api/perfumes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Perfume",
    "brand": "Marca XYZ",
    "year": 2024,
    "type": "Eau de Parfum",
    "notes_top": "Citrus, Bergamota",
    "notes_heart": "Rosa, Jasmim",
    "notes_base": "Âmbar, Almíscar",
    "description": "Descrição completa aqui"
  }'
```

### GET /api/perfumes/:id/reviews
**Get reviews of a perfume**

```bash
PERFUME_ID="uuid"
curl http://localhost:8787/api/perfumes/$PERFUME_ID/reviews
```

---

## 4. Reviews

### POST /api/reviews
**Create review (requires auth)**

```bash
TOKEN="your_token"
PERFUME_ID="uuid"

curl -X POST http://localhost:8787/api/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "perfume_id": "'$PERFUME_ID'",
    "rating": 5,
    "longevity": 4,
    "performance": 5,
    "sillage": 4,
    "value": 3,
    "text": "Perfume incrível! Adorei a projeção."
  }'
```

**Expected Response:**
```json
{
  "review": {
    "id": "uuid",
    "perfume_id": "uuid",
    "user_id": "uuid",
    "rating": 5,
    "longevity": 4,
    "performance": 5,
    "sillage": 4,
    "value": 3,
    "text": "Perfume incrível!...",
    "created_at": "2026-02-26T...",
    "user_name": "Maria Silva",
    "user_photo": null
  }
}
```

### PUT /api/reviews/:id
**Update review (requires auth, own review only)**

```bash
TOKEN="your_token"
REVIEW_ID="uuid"

curl -X PUT http://localhost:8787/api/reviews/$REVIEW_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "text": "Mudei minha opinião..."
  }'
```

### DELETE /api/reviews/:id
**Delete review (requires auth, own review only)**

```bash
TOKEN="your_token"
REVIEW_ID="uuid"

curl -X DELETE http://localhost:8787/api/reviews/$REVIEW_ID \
  -H "Authorization: Bearer $TOKEN"
```

### POST /api/reviews/:id/like
**Like/unlike review (requires auth)**

```bash
TOKEN="your_token"
REVIEW_ID="uuid"

curl -X POST http://localhost:8787/api/reviews/$REVIEW_ID/like \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{ "liked": true }
// or
{ "liked": false }  // if unliking
```

---

## 5. Posts (Feed)

### GET /api/posts
**Get feed (requires auth)**

```bash
TOKEN="your_token"
curl http://localhost:8787/api/posts \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "posts": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "perfume_id": "uuid",
      "text": "Acabei de descobrir este perfume incrível!",
      "image_url": null,
      "created_at": "2026-02-26T...",
      "user_name": "Maria Silva",
      "user_photo": null,
      "perfume_name": "Sauvage",
      "perfume_brand": "Dior",
      "perfume_image": null
    }
  ],
  "page": 1,
  "limit": 20
}
```

### POST /api/posts
**Create post (requires auth)**

```bash
TOKEN="your_token"
PERFUME_ID="uuid"  # optional

curl -X POST http://localhost:8787/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Meu novo perfume favorito!",
    "perfume_id": "'$PERFUME_ID'"
  }'
```

### DELETE /api/posts/:id
**Delete post (requires auth, own post only)**

```bash
TOKEN="your_token"
POST_ID="uuid"

curl -X DELETE http://localhost:8787/api/posts/$POST_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 6. Users

### GET /api/users/:id
**Get user profile (public)**

```bash
USER_ID="uuid"
curl http://localhost:8787/api/users/$USER_ID
```

**Expected Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "maria@fragbase.com",
    "name": "Maria Silva",
    "photo_url": null,
    "bio": "Apaixonada por perfumes...",
    "created_at": "2026-02-26T...",
    "follower_count": 3,
    "following_count": 4,
    "review_count": 12
  }
}
```

### PUT /api/users/me
**Update own profile (requires auth)**

```bash
TOKEN="your_token"

curl -X PUT http://localhost:8787/api/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Nome",
    "bio": "Nova bio aqui",
    "photo_url": "https://example.com/photo.jpg"
  }'
```

### GET /api/users/:id/reviews
**Get user reviews**

```bash
USER_ID="uuid"
curl http://localhost:8787/api/users/$USER_ID/reviews
```

### GET /api/users/:id/collections
**Get user collections**

```bash
USER_ID="uuid"
curl http://localhost:8787/api/users/$USER_ID/collections
```

### POST /api/users/:id/follow
**Follow user (requires auth)**

```bash
TOKEN="your_token"
USER_ID="uuid"

curl -X POST http://localhost:8787/api/users/$USER_ID/follow \
  -H "Authorization: Bearer $TOKEN"
```

### DELETE /api/users/:id/follow
**Unfollow user (requires auth)**

```bash
TOKEN="your_token"
USER_ID="uuid"

curl -X DELETE http://localhost:8787/api/users/$USER_ID/follow \
  -H "Authorization: Bearer $TOKEN"
```

---

## Testing Workflow

### 1. Register/Login
```bash
# Login as Maria
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@fragbase.com","password":"senha123"}'

# Save the token
export TOKEN="eyJhbGciOiJIUz..."
```

### 2. List Perfumes
```bash
curl http://localhost:8787/api/perfumes
```

### 3. Get Perfume Details
```bash
# Use one of the IDs from the list
export PERFUME_ID="uuid"
curl http://localhost:8787/api/perfumes/$PERFUME_ID
```

### 4. Create Review
```bash
curl -X POST http://localhost:8787/api/reviews \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "perfume_id": "'$PERFUME_ID'",
    "rating": 5,
    "longevity": 4,
    "performance": 5,
    "sillage": 4,
    "text": "Simplesmente perfeito!"
  }'
```

### 5. Create Post
```bash
curl -X POST http://localhost:8787/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Acabei de experimentar este perfume incrível!",
    "perfume_id": "'$PERFUME_ID'"
  }'
```

### 6. Get Feed
```bash
curl http://localhost:8787/api/posts \
  -H "Authorization: Bearer $TOKEN"
```

---

## Database Stats (Seed Data)

- **Users:** 5 test accounts
- **Perfumes:** 50 popular perfumes
- **Reviews:** ~70 reviews (10-15 per user)
- **Follows:** ~14 follow relationships
- **Posts:** ~15 posts linking to perfumes

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

---

## Next Steps

1. Deploy to Cloudflare Workers
2. Test all endpoints in production
3. Update mobile app with production API_URL
4. Test end-to-end flows
