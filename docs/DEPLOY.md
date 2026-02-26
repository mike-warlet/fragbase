# FragBase - Guia de Deploy

## Backend (Cloudflare Workers)

### Pré-requisitos
- Conta no Cloudflare
- Node.js instalado
- `wrangler` CLI instalado (`npm install -g wrangler`)

### Passos

1. **Login no Cloudflare:**
```bash
wrangler login
```

2. **Criar banco de dados D1:**
```bash
cd backend
npm install
npm run db:create
```

Copie o `database_id` retornado e cole em `wrangler.toml`.

3. **Executar migrations:**
```bash
npm run db:migrate
```

4. **Criar bucket R2 para imagens:**
```bash
wrangler r2 bucket create fragbase-images
```

5. **Adicionar JWT secret:**
```bash
wrangler secret put JWT_SECRET
# Cole um secret aleatório forte (ex: resultado de `openssl rand -base64 32`)
```

6. **Deploy:**
```bash
npm run deploy
```

7. **Teste:**
```bash
curl https://fragbase-api.YOUR_SUBDOMAIN.workers.dev/api/status
```

### Desenvolvimento local

```bash
npm run db:local  # Cria banco local
npm run dev       # Inicia servidor de dev
```

---

## App Mobile (React Native + Expo)

### Pré-requisitos
- Node.js instalado
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) ou Android Emulator

### Passos

1. **Instalar dependências:**
```bash
cd app
npm install
```

2. **Configurar URL da API:**
Edite `app/config.js` e adicione a URL do seu Worker:
```javascript
export const API_URL = 'https://fragbase-api.YOUR_SUBDOMAIN.workers.dev';
```

3. **Iniciar o app:**
```bash
npm start
```

4. **Testar:**
- Pressione `i` para iOS
- Pressione `a` para Android
- Escaneie o QR code com Expo Go (iOS/Android)

### Build para produção

**iOS (TestFlight):**
```bash
eas build --platform ios
eas submit --platform ios
```

**Android (Google Play):**
```bash
eas build --platform android
eas submit --platform android
```

---

## Próximos Passos

- [ ] Adicionar autenticação social (Google, Apple)
- [ ] Implementar upload de imagens para R2
- [ ] Configurar notificações push
- [ ] Implementar WebSockets para mensagens real-time
- [ ] Popular banco com perfumes (scraping)
- [ ] Configurar CI/CD (GitHub Actions)

---

## Troubleshooting

### Erro "Module not found"
```bash
cd backend && npm install
cd ../app && npm install
```

### Erro de CORS
Certifique-se de que o Worker está retornando os headers CORS corretos (já implementado em `worker.js`).

### Database not found
Execute `npm run db:migrate` para criar as tabelas.

### JWT errors
Certifique-se de que o secret foi configurado: `wrangler secret put JWT_SECRET`
