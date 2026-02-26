# FragBase - Production Deployment Guide

Este guia cobre o deploy completo do FragBase no Cloudflare Workers + D1.

---

## Prerequisites

- Conta no Cloudflare (free tier funciona)
- Token de API do Cloudflare com permissões:
  - D1 (read + write)
  - Workers (read + write)
  - R2 (read + write)
- `wrangler` CLI instalado (`npm install -g wrangler`)

---

## 1. Setup do Cloudflare

### Autenticar Wrangler

```bash
wrangler login
# Ou use API token:
# export CLOUDFLARE_API_TOKEN="your_token"
```

### Verificar Autenticação

```bash
wrangler whoami
```

---

## 2. Deploy do Backend

### 2.1. Criar Banco de Dados D1

```bash
cd backend
wrangler d1 create fragbase
```

Anote o `database_id` retornado. Exemplo:
```
database_id = "abc123def-456-789-012-345678901234"
```

### 2.2. Atualizar wrangler.toml

Edite `backend/wrangler.toml` e adicione o `database_id`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "fragbase"
database_id = "abc123def-456-789-012-345678901234"  # Cole o ID aqui
```

### 2.3. Rodar Migrations (Schema)

```bash
wrangler d1 execute fragbase --remote --file=../docs/db-schema.sql
```

Você deve ver: **"9 commands executed successfully."**

### 2.4. Popular com Dados (Seed)

```bash
wrangler d1 execute fragbase --remote --file=seed.sql
```

Você deve ver: **"~143 commands executed successfully."**

Isso adiciona:
- 5 usuários de teste
- 50 perfumes populares
- ~70 reviews
- ~14 follows
- ~15 posts

### 2.5. Criar Bucket R2 (Imagens)

```bash
wrangler r2 bucket create fragbase-images
```

### 2.6. Configurar JWT Secret

```bash
wrangler secret put JWT_SECRET
```

Quando solicitado, cole um secret forte. Exemplo:
```bash
openssl rand -base64 32
```

Copie a saída e cole quando solicitado pelo wrangler.

### 2.7. Deploy do Worker

```bash
npm install
wrangler deploy
```

Anote a URL retornada. Exemplo:
```
https://fragbase-api.YOUR_SUBDOMAIN.workers.dev
```

---

## 3. Testar o Deploy

### 3.1. Health Check

```bash
curl https://fragbase-api.YOUR_SUBDOMAIN.workers.dev/api/status
```

**Esperado:**
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

### 3.2. Login com Usuário de Teste

```bash
curl -X POST https://fragbase-api.YOUR_SUBDOMAIN.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@fragbase.com",
    "password": "senha123"
  }'
```

**Esperado:**
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

### 3.3. Listar Perfumes

```bash
curl https://fragbase-api.YOUR_SUBDOMAIN.workers.dev/api/perfumes
```

Você deve ver uma lista com 20 perfumes.

### 3.4. Teste Completo

Siga o guia em `docs/API_TESTS.md` usando a URL de produção.

---

## 4. Configurar o Mobile App

### 4.1. Atualizar API URL

Edite `app/config.js`:

```javascript
export const API_URL = 'https://fragbase-api.YOUR_SUBDOMAIN.workers.dev';
```

### 4.2. Instalar Dependências

```bash
cd app
npm install
```

### 4.3. Iniciar o App

```bash
npm start
```

Pressione:
- `i` para iOS Simulator
- `a` para Android Emulator
- Ou escaneie o QR code com Expo Go

### 4.4. Testar Fluxo Completo

1. **Login:**
   - Email: `maria@fragbase.com`
   - Senha: `senha123`

2. **Buscar Perfumes:**
   - Vá para aba "Buscar"
   - Digite "Sauvage"
   - Clique no resultado

3. **Ver Detalhes:**
   - Veja as notas, descrição, reviews

4. **Criar Review:**
   - Clique em "Escrever Review"
   - Dê uma nota de 1-5
   - Adicione ratings opcionais
   - Escreva um texto
   - Publique

5. **Ver Feed:**
   - Vá para aba "Feed"
   - Veja posts de outros usuários
   - Clique no botão ✏️ para criar um post

6. **Criar Post:**
   - Escreva algo
   - Publique

---

## 5. Monitoramento

### Logs do Worker

```bash
wrangler tail
```

Ou veja no dashboard:
https://dash.cloudflare.com/

### Consultar Banco D1

```bash
wrangler d1 execute fragbase --remote --command "SELECT COUNT(*) FROM perfumes;"
```

**Esperado:**
```
50
```

```bash
wrangler d1 execute fragbase --remote --command "SELECT COUNT(*) FROM users;"
```

**Esperado:**
```
5
```

---

## 6. Configurações Adicionais (Opcional)

### Custom Domain

1. No Cloudflare Dashboard, vá em Workers → fragbase-api
2. Clique em "Triggers" → "Add Custom Domain"
3. Digite: `api.fragbase.com` (ou seu domínio)
4. Configure DNS automaticamente

### CORS Personalizado

Se precisar restringir CORS, edite `backend/worker.js`:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://seuapp.com',  // Específico
  // ...
};
```

### Rate Limiting

Adicione rate limiting para proteger a API:

```javascript
// Em worker.js, antes do router
const ip = request.headers.get('CF-Connecting-IP');
// Implemente lógica de rate limit com KV ou Durable Objects
```

---

## 7. Custos Estimados (Free Tier)

Cloudflare Free Tier é generoso:

| Serviço | Limite Free | Custo Excedente |
|---------|-------------|-----------------|
| Workers | 100k req/dia | $0.50 / milhão |
| D1 | 5M reads/mês | $0.001 / 1k reads |
| R2 | 10 GB storage | $0.015 / GB |

**Para um MVP com 100 usuários ativos:**
- Workers: ~10k requests/dia → **FREE**
- D1: ~300k reads/mês → **FREE**
- R2: ~1 GB de imagens → **FREE**

**Total: $0/mês** 🎉

---

## 8. Backup e Restore

### Backup do Banco

```bash
wrangler d1 export fragbase --remote --output=backup.sql
```

### Restore

```bash
wrangler d1 execute fragbase --remote --file=backup.sql
```

---

## 9. CI/CD (GitHub Actions)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd backend && npm install
      
      - name: Deploy to Cloudflare
        run: cd backend && npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Adicione `CLOUDFLARE_API_TOKEN` nos secrets do repo.

---

## 10. Troubleshooting

### Erro: "Authentication error [code: 10000]"
- Token de API sem permissões suficientes
- Crie novo token com permissões D1 + Workers + R2

### Erro: "Module not found"
- Rode `npm install` no diretório `backend/`

### Erro: "Database not found"
- Certifique-se de ter criado o banco com `wrangler d1 create`
- Verifique se o `database_id` está correto no `wrangler.toml`

### Erro: "JWT errors"
- Configure o secret: `wrangler secret put JWT_SECRET`

### Worker não responde
- Verifique logs: `wrangler tail`
- Teste health check: `curl https://YOUR_URL/api/status`

---

## Próximos Passos

- [ ] Deploy completo em produção
- [ ] Testes end-to-end
- [ ] Configurar domínio customizado
- [ ] Implementar upload de imagens (R2)
- [ ] Beta testing com usuários reais
- [ ] Analytics e monitoramento

---

**Qualquer dúvida, consulte:**
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
