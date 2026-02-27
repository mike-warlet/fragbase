# Como Testar o App FragBase

## 📱 Opção 1: iPhone Físico (RECOMENDADO)

### Passo 1: Instalar Expo Go no iPhone
- Abra a **App Store**
- Procure por **"Expo Go"**
- Instale o app

### Passo 2: Clonar e rodar no Mac
```bash
# No seu Mac, abra o Terminal
git clone https://github.com/mike-warlet/fragbase.git
cd fragbase/app

# Instalar dependências
npm install

# Instalar Expo CLI globalmente (se não tiver)
npm install -g expo-cli

# Iniciar o servidor
npx expo start
```

### Passo 3: Conectar pelo iPhone
1. Certifique-se de que **Mac e iPhone estão na mesma rede Wi-Fi**
2. No terminal do Mac, vai aparecer um **QR code**
3. No iPhone, abra o **Expo Go**
4. Toque em **"Scan QR Code"**
5. Aponte a câmera para o QR code no terminal
6. O app vai carregar! 🎉

---

## 🖥️ Opção 2: Simulador iOS no Mac

### Passo 1: Instalar Xcode
1. Abra a **App Store** no Mac
2. Procure por **"Xcode"**
3. Instale (demora ~10GB)
4. Abra o Xcode uma vez para aceitar os termos

### Passo 2: Rodar no simulador
```bash
cd fragbase/app
npm install
npx expo start --ios
```

O simulador iOS vai abrir automaticamente com o app! 🚀

---

## 🌐 Opção 3: Web (Teste Rápido)

```bash
cd fragbase/app
npx expo start --web
```

Abre no navegador Chrome/Safari. 

⚠️ **Limitações:** 
- Upload de foto não funciona
- Algumas features nativas podem ter bugs

---

## 🔧 Se der erro "Metro Bundler"

Limpe o cache e rode novamente:

```bash
cd fragbase/app
rm -rf node_modules
npm install
npx expo start --clear
```

---

## 📡 API em Produção

O app já está configurado para usar a API de produção:

**URL:** `https://fragbase-api.warlet-invest.workers.dev`

✅ Funcionalidades testadas:
- Login/Cadastro
- Buscar perfumes
- Criar reviews
- Feed de posts
- Coleções
- Seguir usuários

---

## 🆘 Problemas Comuns

### "Cannot connect to Metro"
- Mac e iPhone precisam estar na **mesma rede Wi-Fi**
- Desative VPN se estiver usando

### "Error loading app"
- Rode `npx expo start --clear` para limpar cache
- Verifique se todas as dependências foram instaladas com `npm install`

### "Expo Go says incompatible"
- Atualize o Expo Go na App Store
- Ou rode `npm install expo@latest` no projeto

---

## 📱 Usuário de Teste

Para facilitar os testes, já existe um usuário criado:

**Username:** `teste`  
**Senha:** `123456`

Ou crie uma nova conta direto no app! 😊

---

## 🚀 Próximos Passos (Fase 3)

Depois de testar, vamos implementar:
- [ ] Mensagens privadas (real-time)
- [ ] Notificações push
- [ ] Feed algorítmico
- [ ] Upload de imagens (R2)
- [ ] Likes em posts
- [ ] Comentários

---

**Dúvidas?** Abra uma issue no GitHub ou me chame no Telegram! 💬
