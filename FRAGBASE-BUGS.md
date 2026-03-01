# FRAGBASE - Bug Report e Correcoes Necessarias

## BUG 1: Feed nao carrega (CRITICO)
**Arquivo:** app/screens/Home.js (linha 29)
**Problema:** O Home.js chama `apiCall('/api/posts?page=1&limit=15')` que requer autenticacao (requireAuth no backend posts.js). Mas o endpoint `/api/posts` GET chama `handleGetFeed` que faz `requireAuth`. Se o token JWT estiver expirado ou invalido, o feed retorna erro 401 e fica vazio sem mensagem de erro ao usuario.
**Correcao:**
- Adicionar tratamento de erro 401 no Home.js - se der 401, fazer logout e redirecionar para Login
- Adicionar um catch que mostra mensagem ao usuario em vez de falhar silenciosamente
- No loadFeed, o catch (linha 38-40) so faz console.error - precisa mostrar um Alert ou estado de erro visivel

## BUG 2: Navegacao quebrada com getParent() (CRITICO)
**Arquivos:** Home.js, Search.js, Messages.js
**Problema:** Varias telas usam `navigation.getParent()?.navigate(...)` para navegar. Isto so funciona se a tela esta dentro de um Tab Navigator aninhado num Stack Navigator. O operador `?.` faz com que se `getParent()` retornar null, a navegacao simplesmente nao acontece sem dar erro - o usuario clica e nada acontece.
**Locais afetados:**
- Home.js linha 138: `navigation.getParent()?.navigate('UserProfile', ...)` - clicar no user do post nao faz nada
- Home.js linha 161: `navigation.getParent()?.navigate('PerfumeDetail', ...)` - clicar no perfume do post nao faz nada
- Home.js linha 268: `navigation.getParent()?.navigate('CreatePost')` - botao + nao funciona
- Search.js linha 63: `navigation.getParent()?.navigate('PerfumeDetail', ...)` - clicar num perfume na busca nao faz nada
- Messages.js linha 61: `navigation.getParent()?.navigate('Chat', ...)` - abrir chat nao funciona
**Correcao:** Trocar TODOS os `navigation.getParent()?.navigate` por `navigation.navigate` (sem getParent). Como MainTabs esta dentro do MainStack, a navegacao do Stack e acessivel diretamente. OU usar `navigation.getParent()?.navigate || navigation.navigate` como fallback.

## BUG 3: Perfil nao carrega (CRITICO)
**Arquivo:** app/screens/Profile.js (linha 29)
**Problema:** O Profile chama `apiCall('/api/auth/me')` que precisa de token. Se o token estiver expirado ou corrompido, o perfil mostra "Nao foi possivel carregar o perfil". Alem disso, na linha 77, usa `user.avatar_url || 'https://via.placeholder.com/100'` - o via.placeholder.com pode estar fora do ar ou lento, causando imagem quebrada.
**Correcao:**
- Substituir via.placeholder.com por um placeholder local (emoji ou View colorida como ja faz no Home.js com avatarPlaceholder)
- Adicionar verificacao de token expirado e auto-logout
- O endpoint /api/auth/me pode nao estar retornando o formato esperado (data.user vs data)

## BUG 4: Paginas de perfumes quebradas / so mostram foto
**Arquivo:** app/screens/PerfumeDetail.js
**Problema:** Multiplos sub-problemas:
1. Linha 14: `import theme from '../theme'` importa o default export, mas noutras linhas usa `theme.colors.primary`. Ao mesmo tempo, noutros ficheiros importam `{ colors }` do theme. Consistencia.
2. Linha 4: Importa `{ LinearGradient } from 'expo-linear-gradient'` - se este pacote nao estiver instalado, a tela crasha inteira.
3. Linhas 65-82: `Promise.allSettled` faz 6 chamadas API simultaneas. Se a API retornar erros 500 para algum endpoint (tabela nao existe, migration nao foi rodada), os dados ficam vazios mas a tela renderiza parcialmente.
4. Linha 242: `theme.getGenderColor(perfume.gender)` - se `gender` for null/undefined, crasha.
5. Linhas 211-224: `perfume.notes?.top` - se `notes` nao vier como objeto (ex: vier como string ou null), o map falha.
**Correcao:**
- Verificar se expo-linear-gradient esta no package.json e instalado
- Adicionar null checks em `perfume.gender` antes de chamar getGenderColor
- Garantir que o backend retorna notes como objeto (ver perfumes.js linha 96-100 - ele faz parseNotes)

## BUG 5: Foto errada no Interlude 53
**Problema:** A imagem do perfume Amouage Interlude 53 esta com URL incorreta no banco de dados. Provavelmente o seed script (migration 010-seed-500-perfumes.sql) tem a URL errada ou aponta para a imagem de outro perfume.
**Correcao:** Atualizar o image_url do perfume Interlude 53 na base D1:
```sql
UPDATE perfumes SET image_url = 'URL_CORRETA' WHERE name LIKE '%Interlude 53%';
```
Nota: Precisa encontrar a URL correta da imagem deste perfume.

## BUG 6: PerfumeCard sem largura fixa no grid
**Arquivo:** app/components/PerfumeCard.js + app/screens/Search.js
**Problema:** O Search.js usa `numColumns={2}` no FlatList com `columnWrapperStyle={{ justifyContent: 'space-between', gap: 16 }}`. Mas o PerfumeCard nao tem largura definida - o card usa `width: undefined`. Isto pode fazer os cards ficarem com tamanhos inconsistentes ou nao ocuparem metade da tela.
**Correcao:** Adicionar ao PerfumeCard style:
```javascript
card: {
  flex: 1,
  maxWidth: '48%',  // Para grid de 2 colunas
  // ... resto dos estilos
}
```

## BUG 7: Cache pode servir dados stale apos login
**Arquivo:** app/config.js
**Problema:** O cache em memoria (Map) nao e limpo quando o usuario faz logout/login. Se o usuario A faz logout e o usuario B faz login, os dados cached (feed, perfil, etc) podem ser do usuario A.
**Correcao:** Exportar uma funcao `clearAllCache()` e chama-la no `logout()` do AuthContext.

## BUG 8: SmartPickCard e SOTDBanner no Feed podem crashar
**Arquivo:** app/screens/Home.js (linha 247)
**Problema:** O ListHeaderComponent inclui `<SmartPickCard>` e `<SOTDBanner>` que fazem suas proprias chamadas API. Se estas falharem, podem crashar o Feed inteiro.
**Correcao:** Envolver cada componente num try-catch ou ErrorBoundary individual.

## BUG 9: Falta tratamento de erros global
**Problema:** Quase todas as telas fazem `catch (error) { console.error(...) }` sem mostrar nada ao usuario. O app parece "quebrado" mas na verdade e so um erro de API silencioso.
**Correcao:** Criar um hook `useApi` que:
- Mostra loading state
- Mostra erro ao usuario (Toast/Snackbar)
- Faz retry automatico
- Trata 401 (token expirado) com auto-logout

## BUG 10: Posts tabela pode nao ter coluna 'type'
**Arquivo:** backend/posts.js / migrations
**Problema:** O Home.js verifica `item.type === 'sotd'` (linha 130) para mostrar o badge SOTD. Mas a tabela posts (migration 001) nao tem coluna `type`. O SOTD esta na tabela `scent_of_the_day` (migration 006). Os posts do tipo SOTD podem nao estar a ser criados com type='sotd'.
**Correcao:** Verificar se a migration adicionou coluna `type` a tabela posts. Se nao, adicionar:
```sql
ALTER TABLE posts ADD COLUMN type TEXT DEFAULT 'post';
```

## BUG 11: Expo LinearGradient pode nao estar instalado
**Arquivo:** app/package.json
**Problema:** PerfumeDetail.js importa `expo-linear-gradient` mas pode nao estar nas dependencias.
**Correcao:** `npx expo install expo-linear-gradient`

---

## RESUMO DE PRIORIDADES

### P0 (Criticos - app nao funciona):
1. BUG 2: Navegacao getParent() - trocar por navigation.navigate
2. BUG 1: Feed nao carrega - adicionar tratamento de erro
3. BUG 3: Perfil nao carrega - fix placeholder + token handling
4. BUG 4: PerfumeDetail crasha - null checks + expo-linear-gradient

### P1 (Importantes):
5. BUG 9: Tratamento de erros global
6. BUG 10: Coluna type nos posts
7. BUG 7: Cache stale apos login

### P2 (Melhorias):
8. BUG 5: Foto Interlude 53
9. BUG 6: PerfumeCard largura
10. BUG 8: SmartPickCard error handling
11. BUG 11: Dependencia expo-linear-gradient
