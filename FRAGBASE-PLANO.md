# FRAGBASE - Plano de Desenvolvimento Completo

## Visão Geral
Fragbase é uma rede social mobile focada em perfumes/fragrâncias. Permite aos utilizadores catalogar coleções, descobrir novos perfumes, partilhar reviews, seguir outros entusiastas e interagir socialmente.

## Stack Tecnológico
- **Frontend**: React Native + Expo (iOS/Android)
- **Backend**: Cloudflare Workers (ESM), D1 (SQLite), R2 (imagens)
- **Auth**: JWT via @tsndr/cloudflare-worker-jwt
- **API**: https://fragbase-api.warlet-invest.workers.dev

## Status Atual
- ✅ FASE 1: Fundação (auth, DB schema, deploy)
- ✅ FASE 2: Core Features (45 endpoints, CRUD, imagens)
- ⏳ FASE 3: Social & Real-time
- ⏳ FASE 4: Data, Polish & Launch

---

## FASE 3: Social & Real-time

### 3.1 Frontend - Estrutura Base do App (PRIORIDADE ALTA)
Criar a estrutura de navegação e telas principais no Expo:

```
app/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.js        # Stack principal
│   │   ├── AuthNavigator.js       # Login/Register
│   │   ├── MainTabNavigator.js    # Bottom tabs
│   │   └── ProfileNavigator.js    # Stack do perfil
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── ForgotPasswordScreen.js
│   │   ├── home/
│   │   │   ├── FeedScreen.js         # Feed social
│   │   │   └── FragranceDetailScreen.js
│   │   ├── search/
│   │   │   ├── SearchScreen.js       # Busca fragrâncias
│   │   │   └── FilterScreen.js
│   │   ├── collection/
│   │   │   ├── MyCollectionScreen.js
│   │   │   ├── AddFragranceScreen.js
│   │   │   └── WishlistScreen.js
│   │   ├── social/
│   │   │   ├── ProfileScreen.js
│   │   │   ├── EditProfileScreen.js
│   │   │   ├── FollowersScreen.js
│   │   │   └── NotificationsScreen.js
│   │   └── review/
│   │       ├── WriteReviewScreen.js
│   │       └── ReviewDetailScreen.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Avatar.js
│   │   │   ├── Card.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── EmptyState.js
│   │   ├── fragrance/
│   │   │   ├── FragranceCard.js
│   │   │   ├── NotesPyramid.js      # Top/heart/base notes visual
│   │   │   ├── SeasonalChart.js
│   │   │   └── RatingStars.js
│   │   ├── social/
│   │   │   ├── FeedPost.js
│   │   │   ├── CommentItem.js
│   │   │   ├── LikeButton.js
│   │   │   └── UserCard.js
│   │   └── review/
│   │       ├── ReviewCard.js
│   │       └── ReviewForm.js
│   ├── services/
│   │   ├── api.js                 # Axios/fetch config base
│   │   ├── authService.js         # Login, register, token
│   │   ├── fragranceService.js    # CRUD fragrâncias
│   │   ├── collectionService.js   # Coleção do user
│   │   ├── socialService.js       # Follow, feed
│   │   ├── reviewService.js       # Reviews e ratings
│   │   └── imageService.js        # Upload imagens R2
│   ├── context/
│   │   ├── AuthContext.js         # Auth state global
│   │   └── ThemeContext.js        # Dark/light mode
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFragrance.js
│   │   └── useInfiniteScroll.js
│   ├── utils/
│   │   ├── constants.js           # API URL, colors, etc
│   │   ├── storage.js             # AsyncStorage helpers
│   │   └── validators.js          # Form validation
│   └── theme/
│       ├── colors.js
│       ├── typography.js
│       └── spacing.js
```

**Tarefas:**
1. Instalar dependências: `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/stack`, `axios`, `@react-native-async-storage/async-storage`, `expo-image-picker`, `expo-secure-store`
2. Criar AuthContext com login/register/logout e persistência de token
3. Criar api.js service com interceptor que adiciona JWT header
4. Criar as 5 tabs principais: Feed, Busca, Coleção, Notificações, Perfil
5. Implementar LoginScreen e RegisterScreen conectando à API
6. Criar tema visual (cores, fontes, espaçamentos) - tema escuro como default

### 3.2 Frontend - Telas de Fragrância
1. SearchScreen com busca por nome, marca, notas olfativas
2. FragranceDetailScreen com: imagem, nome, marca, notas (pirâmide), reviews, ratings, botão "adicionar à coleção"
3. NotesPyramid component visual mostrando top/heart/base notes
4. FilterScreen: filtrar por marca, família olfativa, ocasião, estação, preço

### 3.3 Frontend - Coleção Pessoal
1. MyCollectionScreen: grid/lista das fragrâncias do user
2. Cada item mostra: imagem, nome, rating pessoal, ml restante
3. AddFragranceScreen: buscar fragrância existente ou criar nova
4. WishlistScreen: fragrâncias que quer comprar
5. Stats: total de fragrâncias, valor estimado, marcas favoritas

### 3.4 Social Features - Feed
1. FeedScreen: scroll infinito com posts dos users seguidos
2. Tipos de post: review nova, fragrância adicionada à coleção, SOTD (scent of the day)
3. FeedPost component com: avatar, nome, conteúdo, imagem, likes, comments
4. LikeButton com animação
5. Pull-to-refresh e infinite scroll

### 3.5 Social Features - Interações
1. Sistema de follow/unfollow
2. Comentários em posts e reviews
3. Likes em posts, reviews e comentários
4. ProfileScreen de outros users com: bio, coleção pública, reviews, seguidores
5. NotificationsScreen: likes, follows, comments

### 3.6 Backend - Endpoints Faltantes para Social
Verificar e criar endpoints necessários:
- `GET /api/feed` - feed personalizado (posts de quem segue)
- `POST /api/posts` - criar post (SOTD, general)
- `GET /api/posts/:id/comments` - comentários de um post
- `POST /api/posts/:id/comments` - comentar
- `POST /api/posts/:id/like` - dar like
- `GET /api/users/:id/followers` - lista de seguidores
- `GET /api/users/:id/following` - lista de seguidos
- `GET /api/notifications` - notificações do user
- `PUT /api/notifications/read` - marcar como lidas
- WebSocket ou polling para notificações em tempo real

---

## FASE 4: Data, Polish & Launch

### 4.1 Base de Dados de Fragrâncias
1. Popular o banco com fragrâncias conhecidas (web scraping ou API pública)
2. Fontes possíveis: Fragrantica, Parfumo (verificar ToS)
3. Dados necessários: nome, marca, ano, notas (top/heart/base), família olfativa, concentração, imagem
4. Criar seed script para popular D1
5. Objetivo: pelo menos 500-1000 fragrâncias populares no lançamento

### 4.2 Funcionalidades Avançadas
1. SOTD (Scent of the Day): user seleciona o perfume do dia, aparece no feed
2. Comparação: comparar 2 fragrâncias lado a lado
3. Recomendações: "se gostas de X, vais gostar de Y" (baseado em notas similares)
4. Dupes/Clones: sugestões de alternativas mais baratas
5. Seasonal suggestions: fragrâncias recomendadas por estação
6. Barcode scanner: scan do código de barras para identificar fragrância (fase futura)

### 4.3 UX/UI Polish
1. Animações de transição entre telas (react-native-reanimated)
2. Skeleton loading screens
3. Haptic feedback nos likes e ações
4. Onboarding flow para novos users (escolher fragrâncias favoritas)
5. Empty states bonitos para coleção vazia, sem seguidores, etc
6. Dark mode (default) e light mode
7. App icon e splash screen

### 4.4 Performance & Qualidade
1. Image caching e lazy loading
2. Optimistic updates (likes, follows)
3. Offline mode básico (ver coleção sem internet)
4. Error boundaries e tratamento de erros global
5. Analytics: Mixpanel ou similar para tracking de uso
6. Crash reporting: Sentry ou Bugsnag

### 4.5 Preparação para Launch
1. Testes em dispositivos reais (iOS + Android)
2. TestFlight (iOS) e Internal Testing (Android) com beta testers
3. App Store assets: screenshots, descrição, keywords
4. Privacy policy e Terms of Service
5. Landing page: fragbase.app
6. `eas build` para gerar builds de produção
7. Submit para App Store e Google Play

---

## Ordem de Execução Recomendada

### Sprint 1 (Semana 1-2): App Funcional Básico
- [ ] Setup navegação (tabs + stacks)
- [ ] AuthContext + Login/Register screens
- [ ] api.js service conectado ao backend
- [ ] Tema visual (cores, fontes)
- [ ] SearchScreen básica
- [ ] FragranceDetailScreen

### Sprint 2 (Semana 3-4): Coleção & Reviews
- [ ] MyCollectionScreen
- [ ] AddFragranceScreen
- [ ] WishlistScreen
- [ ] WriteReviewScreen
- [ ] ReviewCard component
- [ ] RatingStars component

### Sprint 3 (Semana 5-6): Social
- [ ] FeedScreen com scroll infinito
- [ ] Follow/unfollow
- [ ] Likes e comentários
- [ ] ProfileScreen (próprio e de outros)
- [ ] NotificationsScreen
- [ ] Endpoints backend faltantes

### Sprint 4 (Semana 7-8): Data & Polish
- [ ] Popular DB com fragrâncias
- [ ] SOTD feature
- [ ] Recomendações básicas
- [ ] Animações e polish
- [ ] Dark/light mode
- [ ] App icon e splash

### Sprint 5 (Semana 9-10): Launch Prep
- [ ] Testes em dispositivos reais
- [ ] Bug fixes
- [ ] TestFlight / Internal Testing
- [ ] App Store assets
- [ ] Submit para stores

---

## Comandos Úteis

```bash
# Backend
cd ~/fragbase/backend
npx wrangler deploy                    # Deploy backend
npx wrangler d1 execute fragbase-db --remote --command "SQL"  # Run SQL

# Frontend
cd ~/fragbase/app
npm install                            # Instalar deps
npx expo start                         # Dev server
npx expo start --tunnel                # Dev com tunnel (para testar no phone)
eas build --platform ios               # Build iOS
eas build --platform android           # Build Android

# Git
git add -A && git commit -m "msg" && git push
```

---

## Notas para o Claude VPS
- O projeto está em `~/fragbase`
- Backend em `~/fragbase/backend`, frontend em `~/fragbase/app`
- Sempre faz commit e push depois de alterações significativas
- Testa o backend com curl antes de integrar no frontend
- Mantém o CLAUDE.md atualizado com o progresso
