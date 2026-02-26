# FragBase

Rede social mobile para entusiastas de perfumaria. Base 100% app (iOS/Android), com backend moderno e arquitetura desenhada para alto engajamento, colecionismo, reviews e interação.

## Arquitetura

- **Frontend:** React Native + Expo (iOS/Android)
- **Backend:** Cloudflare Workers (REST API & WebSockets)
- **Database:** Cloudflare D1 (SQL) + R2 (imagens)
- **Auth:** Email, Google, Apple Sign-in
- **Realtime:** Durable Objects

---

Os próximos arquivos cobrirão:
- Estrutura do banco (`/docs/db-schema.sql`)
- API backend routes (`/backend/`)
- Prototipo do app Expo (`/app/`)
