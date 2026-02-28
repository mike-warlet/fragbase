# FragBase - Guia Completo de Build e Publicacao com EAS

> Guia passo a passo para compilar e publicar o FragBase nas lojas Apple App Store e Google Play Store usando Expo Application Services (EAS).

---

## Informacoes do Projeto

| Campo                  | Valor                          |
|------------------------|--------------------------------|
| Nome do app            | **FragBase**                   |
| Slug Expo              | `fragbase`                     |
| Versao                 | `1.0.0`                        |
| Bundle Identifier (iOS)| `com.fragbase.app`             |
| Package Name (Android) | `com.fragbase.app`             |
| Expo SDK               | `~51.0.0`                      |
| Apple ID configurado   | `warlet.invest@gmail.com`      |

---

## Indice

1. [Pre-requisitos](#1-pre-requisitos)
2. [Instalar o EAS CLI](#2-instalar-o-eas-cli)
3. [Login na conta Expo](#3-login-na-conta-expo)
4. [Configurar o projeto](#4-configurar-o-projeto)
5. [Configurar credenciais Apple (iOS)](#5-configurar-credenciais-apple-ios)
6. [Configurar credenciais Google Play (Android)](#6-configurar-credenciais-google-play-android)
7. [Executar builds](#7-executar-builds)
8. [Submeter as lojas](#8-submeter-as-lojas)
9. [Resolucao de problemas comuns](#9-resolucao-de-problemas-comuns)

---

## 1. Pre-requisitos

Antes de comecar, certifica-te de que tens:

- **Node.js** versao 18 ou superior instalado
- Uma **conta Expo** criada em https://expo.dev (gratis)
- O codigo do FragBase clonado e funcional localmente
- Acesso a internet estavel (os builds correm nos servidores da Expo)

Para verificar o Node.js:

```bash
node --version
```

---

## 2. Instalar o EAS CLI

O EAS CLI e a ferramenta de linha de comando que te permite compilar e publicar o app. Instala globalmente:

```bash
npm install -g eas-cli
```

Verifica se a instalacao correu bem:

```bash
eas --version
```

O `eas.json` do projeto requer a versao `>= 12.0.0`. Se tiveres uma versao anterior, atualiza:

```bash
npm install -g eas-cli@latest
```

---

## 3. Login na conta Expo

Faz login com a tua conta Expo. Se ainda nao tens conta, cria uma em https://expo.dev/signup.

```bash
eas login
```

Vai pedir o teu email/username e password. Depois de autenticado, confirma:

```bash
eas whoami
```

Deves ver o teu username no terminal.

---

## 4. Configurar o projeto

Navega ate a pasta do app:

```bash
cd /caminho/para/fragbase/app
```

O projeto ja tem um `eas.json` configurado com tres perfis de build:

- **development** - para desenvolvimento local (gera APK no Android e build de simulador no iOS)
- **preview** - para testes internos (distribuicao interna)
- **production** - para publicar nas lojas (gera App Bundle no Android com auto-incremento de versao)

Se precisares reconfigurar do zero:

```bash
eas build:configure
```

Este comando analisa o `app.json` e cria/atualiza o `eas.json`. Como o projeto ja tem ambos configurados, so precisas correr isto se fizeres alteracoes estruturais.

### Vincular o projeto ao Expo

Se o projeto ainda nao estiver vinculado a tua conta Expo, corre:

```bash
eas init
```

Isto vai atribuir um `projectId` real ao projeto (atualmente esta como `"fragbase"` em `app.json > extra > eas > projectId`). O EAS vai pedir para confirmar e vai atualizar automaticamente o `app.json` com o ID correto.

---

## 5. Configurar credenciais Apple (iOS)

### 5.1. Conta Apple Developer

Para publicar na App Store, precisas de uma **Apple Developer Account**:

- Vai a https://developer.apple.com/programs/
- O custo e de **$99 USD/ano** (aproximadamente 90 EUR)
- O processo de aprovacao pode demorar 1-2 dias uteis
- Precisas de um Apple ID (podes usar o que ja esta configurado: `warlet.invest@gmail.com`)

### 5.2. Metodo de autenticacao

Tens duas opcoes para autenticar com a Apple:

#### Opcao A: Login com Apple ID (mais simples para comecar)

Quando correres o build, o EAS vai pedir:
1. O teu **Apple ID** (email)
2. A tua **password do Apple ID**
3. O **codigo de verificacao 2FA** (se tiveres ativado, e recomendado)

O EAS guarda as credenciais em cache para nao teres de inserir sempre.

#### Opcao B: App Store Connect API Key (recomendado para CI/CD)

Para automacao e pipelines de CI/CD:

1. Vai a https://appstoreconnect.apple.com/access/api
2. Clica em **"Generate API Key"** (precisas de permissao de Admin)
3. Da um nome a key (ex: "FragBase EAS")
4. Seleciona o role **"App Manager"** ou **"Admin"**
5. Faz download do ficheiro `.p8` (so podes fazer download uma vez!)
6. Anota o **Key ID** e o **Issuer ID**

Depois configura no EAS:

```bash
eas credentials
```

Seleciona **iOS** e segue as instrucoes para adicionar a API Key.

### 5.3. Certificados e Provisioning Profiles

O EAS trata disto automaticamente. Quando correres o primeiro build para iOS, o EAS vai:

1. Criar um **Distribution Certificate** na tua conta Apple
2. Criar um **Provisioning Profile** para o bundle identifier `com.fragbase.app`
3. Guardar tudo de forma segura nos servidores da Expo

Nao precisas de abrir o Xcode nem de gerir certificados manualmente.

Se preferires gerir os certificados tu proprio:

```bash
eas credentials --platform ios
```

### 5.4. Registar o App no App Store Connect

Antes de submeter, cria o app no App Store Connect:

1. Vai a https://appstoreconnect.apple.com
2. Clica em **"My Apps"** > **"+"** > **"New App"**
3. Preenche:
   - **Platform**: iOS
   - **Name**: FragBase
   - **Primary Language**: Portugues (Portugal) ou Portugues (Brasil)
   - **Bundle ID**: `com.fragbase.app`
   - **SKU**: `fragbase-app` (identificador interno, pode ser qualquer coisa unica)
4. Depois de criar, anota o **Apple App ID** (numero que aparece no URL, tipo `1234567890`)
5. Atualiza o `eas.json` com esse ID:

```json
"submit": {
  "production": {
    "ios": {
      "appleId": "warlet.invest@gmail.com",
      "ascAppId": "COLOCA_O_APPLE_APP_ID_AQUI",
      "appleTeamId": "COLOCA_O_TEAM_ID_AQUI"
    }
  }
}
```

O **Apple Team ID** encontras em https://developer.apple.com/account > Membership Details.

---

## 6. Configurar credenciais Google Play (Android)

### 6.1. Conta Google Play Console

Para publicar na Google Play Store:

- Vai a https://play.google.com/console/signup
- O custo e de **$25 USD** (pagamento unico)
- Precisas de uma conta Google
- A aprovacao e normalmente imediata

### 6.2. Criar o app na Google Play Console

1. No Google Play Console, clica em **"Criar app"**
2. Preenche:
   - **Nome do app**: FragBase
   - **Idioma padrao**: Portugues (Portugal) ou Portugues (Brasil)
   - **App ou jogo**: App
   - **Gratuito ou pago**: escolhe conforme o teu modelo
3. Aceita as declaracoes e clica em **"Criar app"**

### 6.3. Criar uma Service Account para upload automatico

Este passo e necessario para o `eas submit` funcionar com Android:

1. Vai a **Google Play Console** > **Configuracoes** > **API access**
2. Clica em **"Link Google Cloud Project"** (se ainda nao tiveres um projeto Cloud linkado)
3. Clica em **"Create new service account"**
4. Vai ser redirecionado para a **Google Cloud Console**
5. Na Cloud Console:
   - Clica em **"Create Service Account"**
   - Nome: `fragbase-eas-submit`
   - Role: nao precisa de role na Cloud Console
   - Clica em **"Done"**
6. Na lista de service accounts, clica nos tres pontos > **"Manage keys"**
7. Clica em **"Add Key"** > **"Create new key"** > **JSON**
8. Faz download do ficheiro JSON (guarda-o em seguranca!)
9. Volta ao **Google Play Console** > **API access**
10. A nova service account deve aparecer na lista
11. Clica em **"Grant access"** junto a service account
12. Da permissao de **"Release manager"** ou **"Admin"**
13. Confirma

### 6.4. Configurar o caminho da Service Account Key

Coloca o ficheiro JSON num local seguro (NAO o comites no git!) e atualiza o `eas.json`:

```json
"submit": {
  "production": {
    "android": {
      "serviceAccountKeyPath": "./path/to/service-account-key.json"
    }
  }
}
```

Por exemplo, podes criar uma pasta `credentials/` na raiz do projeto e adiciona-la ao `.gitignore`:

```bash
mkdir -p credentials
cp ~/Downloads/service-account-key.json ./credentials/
echo "credentials/" >> .gitignore
```

Depois atualiza o `eas.json`:

```json
"android": {
  "serviceAccountKeyPath": "./credentials/service-account-key.json"
}
```

---

## 7. Executar Builds

### 7.1. Build de producao para iOS

```bash
cd /caminho/para/fragbase/app
eas build --platform ios --profile production
```

O que vai acontecer:
- O EAS faz upload do teu codigo para os servidores da Expo
- Compila o app num servidor macOS na cloud
- Gera um ficheiro `.ipa` assinado
- O `buildNumber` vai ser auto-incrementado (configurado no `eas.json`)
- O build demora normalmente **15-30 minutos**
- Recebes um link para acompanhar o progresso no browser

### 7.2. Build de producao para Android

```bash
cd /caminho/para/fragbase/app
eas build --platform android --profile production
```

O que vai acontecer:
- O EAS compila o app e gera um **App Bundle (.aab)** (configurado como `"buildType": "app-bundle"` no `eas.json`)
- O `versionCode` vai ser auto-incrementado
- O build demora normalmente **10-20 minutos**

### 7.3. Build para ambas as plataformas ao mesmo tempo

```bash
eas build --platform all --profile production
```

### 7.4. Builds de teste (antes de publicar)

Para testar antes de ir para producao:

```bash
# Build de preview (APK para Android, IPA para iOS - distribuicao interna)
eas build --platform android --profile preview
eas build --platform ios --profile preview

# Build de desenvolvimento (com dev client)
eas build --platform android --profile development
eas build --platform ios --profile development
```

O perfil `preview` gera um APK que podes instalar diretamente no telemovel Android para testar. Para iOS, gera um build que podes distribuir internamente via link.

### 7.5. Verificar o estado dos builds

```bash
# Ver builds recentes
eas build:list

# Ver detalhes de um build especifico
eas build:view
```

Tambem podes ver tudo em https://expo.dev no dashboard do teu projeto.

---

## 8. Submeter as Lojas

### 8.1. Submeter para a App Store (iOS)

Depois do build iOS estar completo:

```bash
eas submit --platform ios --profile production
```

Opcoes que vao ser pedidas:
- **Selecionar o build**: escolhe o build mais recente ou indica o ID/URL
- **Credenciais Apple**: usa o Apple ID ou API Key conforme configuraste

O app vai aparecer no App Store Connect em **"TestFlight"** ou **"App Store"** > **"iOS App"** conforme o estado.

Para submeter um build especifico:

```bash
# Submeter o build mais recente automaticamente
eas submit --platform ios --latest

# Submeter um build especifico pelo URL
eas submit --platform ios --url https://expo.dev/artifacts/eas/XXXXX.ipa
```

**Depois da submissao**, ainda precisas de:
1. Ir ao **App Store Connect**
2. Preencher as informacoes da loja (screenshots, descricao, categorias, etc.)
3. Selecionar o build para revisao
4. Submeter para **Review da Apple** (demora normalmente 1-3 dias)

### 8.2. Submeter para a Google Play Store (Android)

Depois do build Android estar completo:

```bash
eas submit --platform android --profile production
```

O App Bundle (.aab) vai ser enviado para o Google Play Console.

Para submeter um build especifico:

```bash
# Submeter o build mais recente automaticamente
eas submit --platform android --latest

# Submeter um build especifico pelo URL
eas submit --platform android --url https://expo.dev/artifacts/eas/XXXXX.aab
```

**Depois da submissao**, ainda precisas de:
1. Ir ao **Google Play Console**
2. Completar o **questionario de conteudo do app**
3. Adicionar screenshots, descricao, graficos, etc.
4. Configurar precos e distribuicao
5. Publicar na track desejada (Internal testing > Closed testing > Open testing > Production)

### 8.3. Build e submit num so comando

Podes combinar build e submit:

```bash
# iOS
eas build --platform ios --profile production --auto-submit

# Android
eas build --platform android --profile production --auto-submit
```

---

## 9. Resolucao de Problemas Comuns

### Erro: "Missing bundle identifier" ou "Missing package name"

O `app.json` do FragBase ja tem ambos configurados:
- iOS: `"bundleIdentifier": "com.fragbase.app"`
- Android: `"package": "com.fragbase.app"`

Se este erro aparecer, verifica que estas a correr os comandos dentro da pasta `app/` onde esta o `app.json`.

### Erro: "EAS CLI version mismatch"

O projeto requer EAS CLI `>= 12.0.0`. Atualiza:

```bash
npm install -g eas-cli@latest
```

### Erro: "Apple credentials not found" ou "Authentication failed"

1. Limpa as credenciais em cache:
```bash
eas credentials --platform ios
```
2. Seleciona "Remove" para remover credenciais antigas
3. Tenta o build novamente -- vai pedir novas credenciais

### Erro: "Provisioning profile does not match bundle identifier"

Isto acontece quando o bundle identifier mudou. Resolve com:

```bash
eas credentials --platform ios
```

Seleciona a opcao de criar novo provisioning profile.

### Erro: "Google Play service account key invalid"

1. Verifica que o caminho no `eas.json` aponta para o ficheiro JSON correto
2. Verifica que a service account tem permissoes de "Release manager" no Google Play Console
3. Confirma que o ficheiro JSON nao esta corrompido

### Erro: "versionCode X has already been used"

O `eas.json` do FragBase tem `"autoIncrement": true` para ambas as plataformas, o que deveria evitar isto. Se acontecer:

1. Verifica o `versionCode` atual no `app.json` (atualmente `1`)
2. Incrementa manualmente para um valor superior ao ultimo publicado
3. Tenta o build novamente

### Build fica preso na fila

Os builds correm nos servidores da Expo. Nos planos gratuitos, pode haver fila:

- **Plano Free**: 1 build de cada vez, pode haver espera
- **Plano EAS Production ($99/mes)**: builds prioritarios e mais rapidos

Verifica o estado em https://expo.dev > teu projeto > Builds.

### O app crasha ao abrir depois de instalar

1. Verifica os logs do build no dashboard da Expo
2. Testa primeiro com o perfil `preview` antes de ir para `production`
3. Confirma que todas as permissoes no `app.json` estao corretas (Camera, Storage)
4. Verifica se o backend/API esta acessivel a partir do dispositivo

### Problemas com notificacoes push

O FragBase usa `expo-notifications`. Para funcionar em producao:

- **iOS**: o EAS configura automaticamente os Push Notification certificates
- **Android**: precisas de configurar o **Firebase Cloud Messaging (FCM)**
  1. Cria um projeto no Firebase Console
  2. Faz download do `google-services.json`
  3. Adiciona ao projeto conforme a documentacao do Expo

### Como ver os logs do build

```bash
# Ver o log completo de um build
eas build:view --platform ios
eas build:view --platform android
```

Ou acede diretamente ao dashboard em https://expo.dev.

### Limpar cache local

Se tiveres problemas estranhos, limpa o cache:

```bash
# Limpar cache do Expo
npx expo start --clear

# Limpar cache do Metro bundler
npx react-native start --reset-cache

# Reinstalar dependencias
rm -rf node_modules
npm install
```

---

## Resumo dos Comandos Principais

```bash
# Instalacao e setup
npm install -g eas-cli
eas login
eas init

# Builds
eas build --platform ios --profile production
eas build --platform android --profile production
eas build --platform all --profile production

# Submissao
eas submit --platform ios --latest
eas submit --platform android --latest

# Build + submissao automatica
eas build --platform ios --profile production --auto-submit
eas build --platform android --profile production --auto-submit

# Gestao de credenciais
eas credentials --platform ios
eas credentials --platform android

# Verificar builds
eas build:list
eas build:view
```

---

## Checklist antes de Publicar

- [ ] Conta Apple Developer ativa ($99/ano)
- [ ] Conta Google Play Console ativa ($25 unico)
- [ ] App criado no App Store Connect com bundle ID `com.fragbase.app`
- [ ] App criado no Google Play Console com package `com.fragbase.app`
- [ ] `ascAppId` preenchido no `eas.json` (iOS)
- [ ] `appleTeamId` preenchido no `eas.json` (iOS)
- [ ] Service Account Key JSON criada e caminho configurado no `eas.json` (Android)
- [ ] Screenshots preparadas para ambas as lojas
- [ ] Descricao do app escrita em Portugues
- [ ] Politica de privacidade publicada num URL acessivel
- [ ] Icone (`icon.png`) e splash screen (`splash.png`) em alta resolucao
- [ ] Testado com perfil `preview` num dispositivo real
- [ ] Build de `production` concluido com sucesso
- [ ] Submissao feita com `eas submit`
