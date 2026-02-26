# 📱 Como Testar o App FragBase

## Opção 1: No Seu Computador (Recomendado)

### 1. Clone o Repositório
```bash
git clone https://github.com/mike-warlet/fragbase.git
cd fragbase/app
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Inicie o Expo
```bash
npx expo start
```

### 4. Escolha Como Testar

**No celular (melhor experiência):**
1. Instale o app "Expo Go" no seu celular:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Escaneie o QR code que aparece no terminal

**No navegador:**
- Pressione `w` no terminal para abrir no browser

**No emulador:**
- Pressione `i` para iOS Simulator (Mac)
- Pressione `a` para Android Emulator

---

## Opção 2: Teste Direto Pelo Expo (Mais Rápido)

### Via Snack (Online)
Estou preparando um Snack online para você testar direto no navegador sem instalar nada!

---

## 🧪 Fluxo de Teste

Uma vez que o app abrir:

### 1. **Login**
- Email: `maria@fragbase.com`
- Senha: `senha123`

### 2. **Buscar Perfumes**
- Vá para aba "Buscar" (🔍)
- Digite "Sauvage" ou "Aventus"
- Clique em qualquer perfume

### 3. **Ver Detalhes**
- Veja as notas (topo, coração, base)
- Descrição do perfume
- Reviews de outros usuários
- Rating médio

### 4. **Criar Review**
- Clique em "✍️ Escrever Review"
- Dê uma nota de 1-5 estrelas (obrigatório)
- Ratings opcionais: Duração, Performance, Sillage, Custo-Benefício
- Escreva sua opinião
- Publique!

### 5. **Ver Feed**
- Vá para aba "Feed" (🏠)
- Veja posts de outros usuários
- Posts podem estar vinculados a perfumes

### 6. **Criar Post**
- Clique no botão flutuante ✏️ (canto inferior direito)
- Escreva algo sobre perfumes
- Publique!

### 7. **Ver Perfil**
- Vá para aba "Perfil" (👤)
- Veja suas estatísticas:
  - Número de reviews
  - Seguidores
  - Seguindo

---

## 📊 Dados de Teste Disponíveis

### Usuários (senha: `senha123`)
- maria@fragbase.com
- joao@fragbase.com
- ana@fragbase.com
- pedro@fragbase.com
- carla@fragbase.com

### Perfumes Populares
- Dior Sauvage
- Chanel Bleu de Chanel
- Creed Aventus
- D&G Light Blue
- Paco Rabanne 1 Million
- Armani Acqua di Giò
- YSL Black Opium
- Versace Eros
- Chanel No. 5
- Tom Ford Black Orchid
- ... e mais 40!

---

## 🐛 Troubleshooting

### "Unable to resolve module..."
```bash
cd app
rm -rf node_modules package-lock.json
npm install
```

### "Network request failed"
Verifique se a API está online:
```bash
curl https://fragbase-api.warlet-invest.workers.dev/api/status
```

Deve retornar: `{"status":"ok","version":"1.0.0"}`

### Expo não inicia
```bash
npm install -g expo-cli
npx expo start --clear
```

---

## 📸 Screenshots que Você Vai Ver

1. **Tela de Login** - Email e senha
2. **Feed** - Posts de usuários com perfumes
3. **Busca** - Lista de perfumes com imagens
4. **Detalhes do Perfume** - Notas, descrição, reviews
5. **Criar Review** - Star picker para avaliar
6. **Perfil** - Stats do usuário

---

## ✅ Checklist de Teste

- [ ] Login funciona
- [ ] Busca retorna perfumes
- [ ] Detalhes do perfume carregam
- [ ] Reviews aparecem
- [ ] Consegue criar review
- [ ] Feed mostra posts
- [ ] Consegue criar post
- [ ] Perfil mostra stats corretas
- [ ] Logout funciona

---

## 🚀 Próximo Passo

Depois de testar, me conta:
- O que funcionou?
- O que pode melhorar?
- Teve algum erro?
- Sugestões de features?

---

**API Backend:** https://fragbase-api.warlet-invest.workers.dev  
**GitHub:** https://github.com/mike-warlet/fragbase
