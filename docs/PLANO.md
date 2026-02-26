# FragBase - Plano de Desenvolvimento

**Objetivo:** Construir MVP funcional de rede social de perfumaria (concorrente mobile do Fragrantica) em 4-6 semanas.

---

## 🎯 Milestones

### FASE 1: Fundação (Semana 1-2) ✅ ATUAL
**Responsável:** Backend + Infraestrutura

- [x] Estrutura do repositório
- [x] Schema do banco de dados (D1)
- [x] Skeleton do Worker (Cloudflare)
- [x] App React Native + Expo inicial
- [ ] **Rotas de API essenciais implementadas**
- [ ] **Autenticação funcional (email + social)**
- [ ] **Deploy inicial do Worker + D1 configurado**

**Entregas:**
- API funcional com rotas básicas (auth, users, perfumes, reviews)
- App com navegação entre telas principais
- Banco de dados criado no Cloudflare D1

---

### FASE 2: Core Features (Semana 3-4)
**Responsável:** Frontend + Backend Integration

- [ ] Telas principais implementadas:
  - Login/Cadastro (email, Google, Apple)
  - Feed de posts
  - Perfil de usuário
  - Detalhes de perfume
  - Criação de review
  - Busca de perfumes
- [ ] CRUD completo de perfumes, reviews, posts
- [ ] Sistema de follows/likes funcionando
- [ ] Upload de imagens (R2)
- [ ] Integração completa app ↔ API

**Entregas:**
- App navegável com fluxo completo de usuário
- Funcionalidades sociais básicas (follow, like, post)
- Sistema de reviews operacional

---

### FASE 3: Social & Real-time (Semana 5)
**Responsável:** Real-time + Engagement

- [ ] Mensagens privadas (WebSocket via Durable Objects)
- [ ] Notificações push
- [ ] Feed algorítmico básico (ordenação por engajamento)
- [ ] Coleções de perfumes
- [ ] Compartilhamento de perfis/perfumes

**Entregas:**
- Chat privado funcional
- Sistema de notificações
- Engajamento melhorado no feed

---

### FASE 4: Ingestão de Dados & Polish (Semana 6)
**Responsável:** Data + UX

- [ ] **Scraping/ingestão de base de perfumes** (Fragrantica, Parfumo, etc.)
  - Script de scraping com rate-limit
  - Pipeline de ingestão para D1
  - Normalização de dados (marcas, notas, anos)
- [ ] Busca avançada (filtros por notas, marca, tipo, ano)
- [ ] Refinamento de UI/UX
- [ ] Testes de performance
- [ ] Preparação para beta (TestFlight/Google Play Internal)

**Entregas:**
- Base de dados populada com milhares de perfumes
- App polido e pronto para beta testers
- Documentação de API

---

## 📋 Rotas de API Essenciais (Próximo Foco)

### Auth
- `POST /api/auth/register` - Cadastro com email
- `POST /api/auth/login` - Login com email
- `POST /api/auth/google` - Login com Google
- `POST /api/auth/apple` - Login com Apple
- `GET /api/auth/me` - Dados do usuário autenticado

### Users
- `GET /api/users/:id` - Perfil público
- `PUT /api/users/me` - Atualizar perfil
- `GET /api/users/:id/reviews` - Reviews de um usuário
- `GET /api/users/:id/collections` - Coleções de um usuário
- `POST /api/users/:id/follow` - Seguir usuário
- `DELETE /api/users/:id/follow` - Deixar de seguir

### Perfumes
- `GET /api/perfumes` - Listar perfumes (paginado, busca)
- `GET /api/perfumes/:id` - Detalhes de perfume
- `POST /api/perfumes` - Criar perfume (admin/user)
- `PUT /api/perfumes/:id` - Atualizar perfume
- `GET /api/perfumes/:id/reviews` - Reviews de um perfume

### Reviews
- `POST /api/reviews` - Criar review
- `PUT /api/reviews/:id` - Editar review
- `DELETE /api/reviews/:id` - Deletar review
- `POST /api/reviews/:id/like` - Curtir review

### Posts (Feed)
- `GET /api/posts` - Feed principal
- `POST /api/posts` - Criar post
- `DELETE /api/posts/:id` - Deletar post

### Collections
- `GET /api/collections` - Minhas coleções
- `POST /api/collections` - Criar coleção
- `POST /api/collections/:id/perfumes` - Adicionar perfume à coleção
- `DELETE /api/collections/:id/perfumes/:perfumeId` - Remover da coleção

### Messages
- `GET /api/messages/:userId` - Conversa com usuário
- `POST /api/messages` - Enviar mensagem
- `PUT /api/messages/:id/read` - Marcar como lida

### Search
- `GET /api/search?q=termo` - Busca global (perfumes, users)
- `GET /api/search/perfumes?filters=...` - Busca avançada de perfumes

---

## 🎨 Telas Principais do App (Próximo Foco)

### Navegação Base
- **Bottom Tab Navigator:**
  - Home (Feed)
  - Search (Busca)
  - Post (Criar post/review)
  - Messages (Mensagens)
  - Profile (Perfil)

### Telas Essenciais
1. **Login/Cadastro** (stack separado)
2. **Home/Feed** - Posts de quem você segue
3. **Search** - Busca de perfumes e usuários
4. **PerfumeDetail** - Detalhes, reviews, botão de review
5. **CreateReview** - Form de avaliação (rating, notas, texto)
6. **UserProfile** - Perfil público com reviews e coleções
7. **MyProfile** - Perfil próprio com edição
8. **Collections** - Lista de coleções + gerenciamento
9. **Messages** - Lista de conversas
10. **Chat** - Conversa individual

---

## 🚀 Próximos Passos Imediatos

### Backend (Prioridade 1)
1. Implementar middleware de autenticação (JWT)
2. Criar rotas de auth (register, login, social)
3. Implementar rotas de users, perfumes, reviews
4. Setup de Cloudflare D1 (criar banco, migrations)
5. Deploy do Worker

### Frontend (Prioridade 2)
1. Criar estrutura de navegação completa (Stack + Bottom Tabs)
2. Implementar telas de Login/Cadastro
3. Criar componentes reutilizáveis (PerfumeCard, ReviewCard, UserCard)
4. Setup de chamadas à API (axios/fetch)
5. Context/State management (Context API ou Zustand)

### DevOps (Prioridade 3)
1. Configurar GitHub Actions para deploy automático
2. Setup de ambientes (dev/staging/prod)
3. Configurar Cloudflare D1 + R2 buckets
4. Docs de API (Swagger/OpenAPI)

---

## 📊 Estratégia de Ingestão de Dados (FASE 4)

### Fontes de Dados
- Fragrantica (principal)
- Parfumo (complementar)
- Basenotes (opcional)

### Abordagem
1. **Scraping ético:**
   - Rate limiting (1-2 req/segundo)
   - User-agent identificável
   - Respeitar robots.txt
   - Pausas programadas

2. **Pipeline:**
   - Script Node.js com Puppeteer/Cheerio
   - Extração de: nome, marca, ano, tipo, notas (top/heart/base), descrição, imagem
   - Normalização de dados (lowercase, trim, deduplicação)
   - Ingestão batch no D1 (500-1000 perfumes/vez)

3. **Manutenção:**
   - Cron job semanal para novos perfumes
   - Validação de dados por usuários (reportar erros)
   - Sistema de edição colaborativa (tipo Wikipedia)

### Estimativa
- ~50.000 perfumes no Fragrantica
- ~2-3 dias de scraping contínuo (respeitando rate limits)
- Armazenamento: ~500MB de dados estruturados + imagens no R2

---

## 🎯 Métricas de Sucesso (MVP)

- [ ] 1.000+ perfumes no banco
- [ ] Sistema de auth funcionando (3 métodos)
- [ ] Feed de posts em tempo real
- [ ] Sistema de reviews completo
- [ ] Busca funcional
- [ ] 10+ beta testers usando o app
- [ ] Performance: API < 200ms p95
- [ ] Zero crashes críticos

---

**Última atualização:** 26/02/2026  
**Status:** FASE 1 em progresso - Implementando rotas de API
