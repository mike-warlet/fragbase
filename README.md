# 🌸 FragBase

**Rede social mobile para entusiastas de perfumaria** — Concorrente do Fragrantica focado em mobile-first, engajamento social e experiência moderna.

[![Status](https://img.shields.io/badge/status-development-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## 🎯 Visão Geral

FragBase é uma plataforma 100% mobile (iOS & Android) que combina:
- 📱 **Rede social** tipo Instagram para perfumes
- ⭐ **Sistema de reviews** detalhado (rating, longevity, sillage, performance)
- 🔍 **Busca avançada** de perfumes por notas, marca, tipo
- 👥 **Interação social** (follows, likes, mensagens)
- 📚 **Coleções personalizadas** de perfumes

---

## 🏗️ Arquitetura

### Stack
- **Frontend:** React Native + Expo (iOS/Android)
- **Backend:** Cloudflare Workers (edge computing)
- **Database:** Cloudflare D1 (SQLite distribuído)
- **Storage:** Cloudflare R2 (imagens)
- **Auth:** JWT + Email/Google/Apple Sign-in
- **Real-time:** Durable Objects (WebSockets)

### Estrutura do Repositório

```
fragbase/
├── app/                    # React Native + Expo
│   ├── screens/           # Telas do app
│   ├── config.js          # Configuração da API
│   └── package.json
├── backend/               # Cloudflare Workers
│   ├── worker.js          # Entry point
│   ├── auth.js            # Autenticação JWT
│   ├── users.js           # Rotas de usuários
│   ├── perfumes.js        # Rotas de perfumes
│   ├── reviews.js         # Rotas de reviews
│   └── wrangler.toml      # Config do Cloudflare
└── docs/
    ├── db-schema.sql      # Schema do banco
    ├── PLANO.md           # Plano de desenvolvimento
    └── DEPLOY.md          # Guia de deploy
```

---

## 🚀 Quick Start

### Backend (Cloudflare Workers)

```bash
cd backend
npm install

# Criar banco de dados D1
npm run db:create
# Copie o database_id para wrangler.toml

# Rodar migrations
npm run db:migrate

# Adicionar JWT secret
wrangler secret put JWT_SECRET

# Deploy
npm run deploy
```

### Mobile App

```bash
cd app
npm install

# Configurar API URL em config.js
# Edite: export const API_URL = 'https://sua-url.workers.dev';

# Iniciar o app
npm start
```

📖 **Guia completo:** [docs/DEPLOY.md](docs/DEPLOY.md)

---

## ✨ Features Implementadas (FASE 1)

### Backend ✅
- [x] Sistema de autenticação completo (register, login, JWT)
- [x] CRUD de usuários com perfil público
- [x] CRUD de perfumes
- [x] Sistema de reviews com múltiplos ratings
- [x] Sistema de follows (seguir usuários)
- [x] Sistema de likes (curtir reviews)
- [x] API REST com CORS habilitado
- [x] Paginação em listagens

### Mobile App ✅
- [x] Login/Cadastro
- [x] Navegação bottom tabs (Feed, Search, Profile)
- [x] Busca de perfumes
- [x] Perfil de usuário com estatísticas
- [x] Integração com AsyncStorage para auth

### Database ✅
- [x] Schema completo para todas entidades
- [x] Relações entre tabelas (users, perfumes, reviews, posts, etc.)

---

## 📋 Roadmap

### FASE 2: Core Features (Em desenvolvimento)
- [ ] Feed de posts com perfumes
- [ ] Criar/editar reviews pelo app
- [ ] Detalhes de perfume com reviews
- [ ] Upload de imagens (R2)
- [ ] Sistema de coleções

### FASE 3: Social & Real-time
- [ ] Mensagens privadas (WebSockets)
- [ ] Notificações push
- [ ] Feed algorítmico
- [ ] Compartilhamento

### FASE 4: Dados & Polish
- [ ] Scraping/ingestão de base de perfumes (Fragrantica)
- [ ] Busca avançada com filtros
- [ ] Refinamento de UI/UX
- [ ] Beta testing (TestFlight/Google Play)

📊 **Plano detalhado:** [docs/PLANO.md](docs/PLANO.md)

---

## 🔧 Tecnologias

### Frontend
- React Native 0.74
- Expo 51
- React Navigation 6
- AsyncStorage
- Axios

### Backend
- Cloudflare Workers (V8 engine)
- Cloudflare D1 (SQLite)
- Cloudflare R2 (S3-compatible)
- JWT authentication
- Edge computing (global latency <50ms)

---

## 📚 Documentação

- [Plano de Desenvolvimento](docs/PLANO.md) — Milestones, fases e cronograma
- [Guia de Deploy](docs/DEPLOY.md) — Instruções completas de deploy
- [Database Schema](docs/db-schema.sql) — Estrutura do banco de dados

---

## 🤝 Contribuindo

Este é um projeto privado em desenvolvimento. Para contribuir:

1. Crie uma branch a partir de `main`
2. Faça suas alterações
3. Envie um pull request com descrição detalhada

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` — Cadastro
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Usuário atual

### Users
- `GET /api/users/:id` — Perfil público
- `PUT /api/users/me` — Atualizar perfil
- `POST /api/users/:id/follow` — Seguir usuário
- `DELETE /api/users/:id/follow` — Deixar de seguir

### Perfumes
- `GET /api/perfumes?q=search` — Listar/buscar perfumes
- `GET /api/perfumes/:id` — Detalhes do perfume
- `POST /api/perfumes` — Criar perfume
- `GET /api/perfumes/:id/reviews` — Reviews de um perfume

### Reviews
- `POST /api/reviews` — Criar review
- `PUT /api/reviews/:id` — Editar review
- `DELETE /api/reviews/:id` — Deletar review
- `POST /api/reviews/:id/like` — Curtir review

---

## 📄 Licença

MIT © 2026 FragBase

---

## 👨‍💻 Autor

Desenvolvido por **warlet** com auxílio de **Secretario Claw Outside Crypto** 🤖

---

**Status:** Fase 1 completa — Backend e app funcionais  
**Próximo passo:** Deploy inicial e teste de integração  
**Meta:** Beta público em 6 semanas
