# FRAGBASE - Plano de Trabalho Autonomo com Subagentes

Le este documento inteiro antes de comecar. Vais trabalhar de forma autonoma criando e executando scripts para avancar o projeto Fragbase. Trabalha em ciclos: executa uma tarefa, faz commit, passa para a proxima.

---

## AGENTE 1: Bug Hunter (PRIORIDADE MAXIMA - FAZER PRIMEIRO)

Objetivo: Encontrar e corrigir todos os bugs do app.

### Passo 1: Corrigir navegacao quebrada
Em TODOS os ficheiros em app/screens/, substitui `navigation.getParent()?.navigate` por `navigation.navigate`. O getParent() retorna null em muitos contextos e faz a navegacao falhar silenciosamente.

```bash
cd ~/fragbase/app
grep -rl "getParent()?.navigate" screens/ | while read f; do
  sed -i 's/navigation\.getParent()?\.navigate/navigation.navigate/g' "$f"
  echo "Fixed: $f"
done
```
Faz commit: "fix: Replace getParent().navigate with direct navigation"

### Passo 2: Corrigir tratamento de erros
Em cada tela que faz chamadas API, adicionar tratamento de erro visivel ao usuario em vez de so console.error. Focar em: Home.js, Profile.js, Search.js, PerfumeDetail.js, MyCollection.js

### Passo 3: Corrigir Profile.js
- Substituir `https://via.placeholder.com/100` por um placeholder local (View com emoji ou iniciais)
- Adicionar verificacao de token expirado

### Passo 4: Corrigir PerfumeDetail.js
- Adicionar null check em `perfume.gender` antes de getGenderColor
- Verificar se expo-linear-gradient esta instalado: `npx expo install expo-linear-gradient`
- Envolver secoes em try-catch individual

### Passo 5: Verificar dependencias
```bash
cd ~/fragbase/app
npx expo install expo-linear-gradient
npm ls expo-linear-gradient
```

### Passo 6: Adicionar coluna type a tabela posts se nao existir
```bash
cd ~/fragbase/backend
npx wrangler d1 execute fragbase-db --remote --command "ALTER TABLE posts ADD COLUMN type TEXT DEFAULT 'post';"
```
(Se ja existir, vai dar erro - tudo bem, ignora)

### Passo 7: Limpar cache apos logout
Em app/config.js, adicionar funcao clearAllCache() e chama-la no logout() do AuthContext.js

Depois de TODOS os bugs corrigidos, faz commit final e passa ao Agente 2.

---

## AGENTE 2: Perfume Data Collector (PRIORIDADE ALTA)

Objetivo: Popular o banco com 500+ perfumes reais, com dados completos e imagens corretas.

### Passo 1: Criar script perfume-collector-v3.js
Cria ~/fragbase/backend/perfume-collector-v3.js com dados hardcoded de perfumes reais. Para CADA perfume incluir:
- name, brand, year, concentration (EDT/EDP/Parfum)
- gender (masculine/feminine/unisex)
- notes_top, notes_heart, notes_base (em ingles, separados por virgula)
- description (2-3 frases em ingles descrevendo o perfume)
- image_url (URL real da imagem - usar formato Fragrantica: https://fimgs.net/mdimg/perfume/375x500.XXXXX.jpg)
- perfumer (nome do perfumista/nariz)
- main_accords (JSON string com array de acordes)

### Passo 2: Lista de perfumes a incluir (minimo 300)

MASCULINOS TOP (pelo menos 100):
Dior Sauvage, Bleu de Chanel, Chanel Allure Homme Sport, YSL Y EDP, YSL La Nuit de L'Homme, Versace Eros, Versace Dylan Blue, JPG Le Male, JPG Ultra Male, Dior Homme Intense, Acqua di Gio Profumo, Armani Code, Armani Code Profumo, Tom Ford Tobacco Vanille, Tom Ford Oud Wood, Tom Ford Noir Extreme, Creed Aventus, Creed Green Irish Tweed, Creed Viking, Prada L'Homme, Prada Luna Rossa Carbon, Dolce & Gabbana The One EDP, Dolce & Gabbana Light Blue, Givenchy Gentleman, Hugo Boss Bottled, Montblanc Explorer, Azzaro Wanted, Azzaro The Most Wanted, Calvin Klein Eternity, Issey Miyake L'Eau d'Issey, Valentino Uomo Born in Roma, Burberry London, Carolina Herrera Bad Boy, Narciso Rodriguez Bleu Noir, Maison Francis Kurkdjian Baccarat Rouge 540, Parfums de Marly Layton, Parfums de Marly Pegasus, Initio Oud for Greatness, Xerjoff Naxos, Nishane Hacivat, Amouage Interlude Man, Amouage Reflection Man, Le Labo Santal 33, Byredo Gypsy Water, Mancera Cedrat Boise, Montale Intense Cafe, Rasasi La Yuqawam, Lattafa Raghba, Al Haramain Amber Oud, Afnan 9pm

FEMININOS TOP (pelo menos 100):
Chanel No. 5, Chanel Coco Mademoiselle, Dior J'adore, Dior Miss Dior, YSL Black Opium, YSL Libre, Lancome La Vie Est Belle, Lancome Idole, Versace Bright Crystal, Marc Jacobs Daisy, Guerlain Shalimar, Guerlain Mon Guerlain, Tom Ford Black Orchid, Narciso Rodriguez For Her, Prada Candy, Dolce & Gabbana Light Blue Femme, Givenchy Irresistible, Valentino Donna Born in Roma, Carolina Herrera Good Girl, Thierry Mugler Angel, Thierry Mugler Alien, Jo Malone Peony & Blush Suede, Chloe EDP, Viktor & Rolf Flowerbomb, Burberry Her, Ariana Grande Cloud, Sol de Janeiro Brazilian Bum Bum, Maison Francis Kurkdjian Baccarat Rouge 540 (F), Parfums de Marly Delina, Initio Musk Therapy, Xerjoff Casamorati Lira, Nishane Wulong Cha

NICHO/UNISEX (pelo menos 100):
Tom Ford Lost Cherry, Tom Ford Bitter Peach, MFK Petit Matin, MFK Grand Soir, MFK Aqua Universalis, Le Labo Rose 31, Le Labo Another 13, Byredo Mojave Ghost, Byredo Bal d'Afrique, Diptyque Philosykos, Diptyque Do Son, Creed Millesime Imperial, Creed Silver Mountain Water, Amouage Jubilation XXV, Xerjoff Alexandria II, Xerjoff Erba Pura, Nishane Ani, Nishane Hundred Silent Ways, Tiziana Terenzi Kirke, Mancera Instant Crush, Montale Chocolate Greedy, Parfums de Marly Sedley, PDM Percival, Initio Side Effect, Initio Rehab, Roja Dove Elysium, Roja Dove Enigma, Kilian Love Don't Be Shy, Kilian Good Girl Gone Bad, Kilian Angels Share, Escentric Molecules 01, Juliette Has a Gun Not a Perfume

### Passo 3: Para encontrar image_url corretas do Fragrantica
Para cada perfume, a URL da imagem no Fragrantica segue o padrao:
https://fimgs.net/mdimg/perfume/375x500.XXXXX.jpg
Onde XXXXX e o ID do perfume no Fragrantica.

Alternativa: usar URLs de imagens de lojas publicas ou CDNs.

IMPORTANTE: Verifica que cada URL de imagem funciona antes de inserir. Testa com curl:
```bash
curl -sI "URL" | head -1
# Deve retornar HTTP/2 200
```

### Passo 4: Inserir no banco D1
Para cada perfume, gera um UUID e insere:
```bash
npx wrangler d1 execute fragbase-db --remote --command "INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, gender, notes_top, notes_heart, notes_base, description, image_url, perfumer) VALUES ('uuid', 'name', 'brand', year, 'type', 'gender', 'notes', 'notes', 'notes', 'desc', 'url', 'perfumer');"
```

Faz em batches de 20-30 perfumes por commit.

### Passo 5: Corrigir imagens erradas
Depois de inserir, verifica quais perfumes tem imagens quebradas:
```bash
npx wrangler d1 execute fragbase-db --remote --command "SELECT id, name, brand, image_url FROM perfumes WHERE image_url IS NOT NULL;" > /tmp/perfumes.json
```
Testa cada URL e atualiza as que nao funcionam.

---

## AGENTE 3: Competitor Analysis & Design (PRIORIDADE MEDIA)

Objetivo: Analisar apps concorrentes e melhorar o design/UX do Fragbase.

### Apps a analisar:
1. **Sniff** (iOS/Android) - rede social de perfumes
2. **Fragrantica** (web) - maior base de dados de perfumes
3. **Parfumo** (web/app) - colecao e reviews
4. **SOTD App** - scent of the day tracker
5. **Basenotes** - forum de perfumes

### O que analisar e implementar:
1. Layout da pagina de perfume - como mostram notas, ratings, reviews
2. Sistema de rating - estrelas, numerico, categorias (longevidade, projecao, etc)
3. Feed social - como mostram posts, SOTD, reviews no feed
4. Perfil do usuario - como mostram colecao, stats, badges
5. Busca e filtros - como filtram por notas, marca, genero, preco, ocasiao
6. Onboarding - como novos users escolhem gostos iniciais

### Implementar melhorias baseadas na analise:
1. Redesign da PerfumeCard para ser mais visual (imagem maior, acordes coloridos)
2. Adicionar filtros avancados na Search (por familia olfativa, estacao, ocasiao)
3. Melhorar o onboarding (quiz de perfumes favoritos ao registar)
4. Adicionar "Scent of the Day" com foto no feed
5. Adicionar comparacao lado-a-lado de perfumes
6. Adicionar "Similar Perfumes" baseado em notas compartilhadas

Cria um ficheiro COMPETITOR-ANALYSIS.md com as descobertas antes de implementar.

---

## AGENTE 4: Auto-Tester (RODAR PERIODICAMENTE)

Objetivo: Testar automaticamente todos os endpoints e telas.

### Criar script de teste:
Cria ~/fragbase/backend/test-api.sh:
```bash
#!/bin/bash
API="https://fragbase-api.warlet-invest.workers.dev"
PASS=0
FAIL=0

test_endpoint() {
  local method=$1
  local endpoint=$2
  local expected=$3
  local data=$4

  if [ "$method" = "GET" ]; then
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API$endpoint")
  else
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X $method -H "Content-Type: application/json" -d "$data" "$API$endpoint")
  fi

  if [ "$STATUS" = "$expected" ]; then
    echo "PASS: $method $endpoint ($STATUS)"
    PASS=$((PASS+1))
  else
    echo "FAIL: $method $endpoint (expected $expected, got $STATUS)"
    FAIL=$((FAIL+1))
  fi
}

echo "=== FragBase API Tests ==="
test_endpoint GET "/" "200"
test_endpoint GET "/api/status" "200"
test_endpoint GET "/api/perfumes" "200"
test_endpoint GET "/api/perfumes?q=sauvage" "200"
test_endpoint GET "/api/perfumes/trending" "200"
test_endpoint POST "/api/auth/register" "200" '{"email":"test_'$RANDOM'@test.com","password":"test1234","name":"Test User"}'
test_endpoint POST "/api/auth/login" "401" '{"email":"wrong@test.com","password":"wrong"}'
test_endpoint GET "/api/posts" "401"
test_endpoint GET "/api/auth/me" "401"

echo ""
echo "Results: $PASS passed, $FAIL failed"
```
Roda: `bash test-api.sh`

Corrige qualquer endpoint que falhe.

---

## ORDEM DE EXECUCAO

1. AGENTE 1 - Bug Hunter (corrigir bugs criticos primeiro)
2. AGENTE 4 - Auto-Tester (verificar que nada quebrou)
3. AGENTE 2 - Perfume Collector (popular banco com 300+ perfumes)
4. AGENTE 3 - Competitor Analysis (melhorar design)
5. Deploy: `cd ~/fragbase/backend && npx wrangler deploy`
6. Repetir ciclo

Trabalha de forma autonoma. Faz commit a cada tarefa significativa completada. Se encontrares um erro que nao consegues resolver, documenta-o num ficheiro ISSUES.md e passa ao proximo.

COMECA AGORA pelo Agente 1 - Bug Hunter.
