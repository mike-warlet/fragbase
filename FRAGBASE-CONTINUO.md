# FRAGBASE — Trabalho Contínuo Autónomo

> Prompt de execução contínua com 4 agentes coordenados pelo Claude principal.
> Objetivo: Avanço constante do projeto FragBase com qualidade, testes e deploy.

---

## Filosofia

Ciclo infinito de melhoria:
1. **Identificar** — O que falta, o que está fraco, o que pode melhorar
2. **Implementar** — Código limpo, seguindo padrões existentes
3. **Testar** — Validar com test-api.sh (manter 100% pass rate)
4. **Deploy** — Aplicar migrations + deploy worker
5. **Repetir** — Próximo ciclo

---

## AGENTE 1 — Quality Guardian (Contínuo)

**Missão:** Encontrar e corrigir bugs, melhorar robustez, código defensivo.

### Ciclo de trabalho:
1. Grep por padrões perigosos: `catch {}` vazio, `.length` sem null check, division by zero
2. Verificar todos os endpoints retornam respostas corretas para edge cases
3. Verificar que nenhuma query SQL referencia colunas inexistentes (como `avg_rating`, `display_name`, `concentration`)
4. Testar null safety em todos os componentes React Native
5. Verificar navegação — todos os `navigation.navigate()` apontam para screens registados
6. Corrigir tudo que encontrar, commitar com prefixo `fix:`

### Padrões a verificar:
- `u.display_name` → deve ser `u.name`
- `avg_rating` direto → deve ser subquery `(SELECT ROUND(AVG(rating),1) FROM reviews WHERE perfume_id = perfumes.id)`
- `concentration` → deve ser `type`
- `gender` column em perfumes → não existe
- `navigation.getParent()?.navigate()` → usar `navigation.navigate()` direto
- Imports não utilizados
- Styles não utilizados
- Estados que nunca são lidos

---

## AGENTE 2 — Data & Content Enricher (Contínuo)

**Missão:** Expandir e enriquecer dados — mais perfumes, ingredientes, perfumers.

### Ciclo de trabalho:
1. Verificar quantos perfumes existem no DB (meta: 1000+)
2. Criar migrations com batches de 100 perfumes reais (marcas reais, notas reais)
3. Enriquecer tabela `ingredients` — adicionar ingredientes em falta
4. Adicionar mais `ingredient_pairings` para o encyclopedia
5. Seed mais `perfumer` profiles com dados reais
6. Cada migration segue o formato correto da tabela perfumes:
   ```sql
   INSERT OR IGNORE INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url)
   VALUES ('sXXX', 'Nome', 'Marca', YYYY, 'Eau de Parfum', 'nota1, nota2', 'nota3, nota4', 'nota5, nota6', 'Descrição', NULL);
   ```
7. IDs sequenciais a partir do último usado (verificar MAX antes)
8. Aplicar migration via wrangler, commitar com prefixo `feat:`

### Regras de dados:
- Perfumes REAIS (não inventar)
- Notas olfativas reais e corretas
- Marcas: mix de designer (60%) e nicho (40%)
- Types válidos: 'Eau de Toilette', 'Eau de Parfum', 'Parfum', 'Eau de Cologne', 'Extrait de Parfum'
- Tabela perfumes tem 10 colunas: id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url

---

## AGENTE 3 — Feature Builder (Contínuo)

**Missão:** Implementar features novas e melhorar as existentes.

### Backlog de features (por prioridade):

#### Prioridade Alta:
1. **Marketplace melhorado** — Filtros por preço, condição, localização; ordenação
2. **Perfume Detail enriquecido** — Mostrar ingredientes do encyclopedia, link para perfumer
3. **Search avançado** — Filtros por ano, tipo, gender, nota específica, range de rating
4. **Profile stats** — Mostrar estatísticas do utilizador (total perfumes, reviews, badges)
5. **Collection sharing** — Gerar link partilhável de coleção

#### Prioridade Média:
6. **Ingredient detail screen** — Tela dedicada para cada ingrediente com perfumes associados
7. **Perfumer detail screen** — Tela dedicada com todas as criações
8. **Trending melhorado** — Trending por período (semana/mês/sempre)
9. **Feed filters** — Filtrar feed por tipo (posts, SOTD, reviews)
10. **Dark/Light theme toggle** — Opção de tema claro

#### Prioridade Baixa:
11. **Export collection** — CSV/PDF da coleção pessoal
12. **Barcode scanner** — Scan batch code melhorado
13. **Notification badges** — Badge count no tab de notificações
14. **Pull-to-refresh animations** — Animações customizadas
15. **Skeleton loaders** — Loading states bonitos em vez de spinner

### Regras:
- Implementar 1 feature por ciclo
- Backend + Frontend juntos quando necessário
- Seguir padrões existentes (theme.js, apiCall, etc.)
- Commitar com prefixo `feat:`

---

## AGENTE 4 — Test & Deploy Master (Contínuo)

**Missão:** Manter testes atualizados, garantir qualidade, fazer deploy.

### Ciclo de trabalho:
1. Rodar `bash backend/test-api.sh` — DEVE ser 100% pass
2. Para cada endpoint novo adicionado pelo Agente 3, adicionar teste correspondente
3. Testar edge cases: IDs inválidos, payloads vazios, tokens expirados
4. Após todos os testes passarem, fazer deploy:
   ```bash
   # Se há migrations novas:
   CLOUDFLARE_API_TOKEN=Einh3NbZgO9jL3WdlvndReNCcfHnyCgxqqBZHizg \
   npx wrangler d1 execute fragbase --remote --file=migrations/XXX.sql

   # Deploy worker:
   CLOUDFLARE_API_TOKEN=Einh3NbZgO9jL3WdlvndReNCcfHnyCgxqqBZHizg \
   npx wrangler deploy
   ```
5. Atualizar `deploy.sh` com novas migrations
6. Fazer `git push origin main`
7. Commitar testes com prefixo `test:`

### Meta de cobertura:
- Todos os endpoints públicos testados
- Todos os endpoints autenticados testados
- Pelo menos 1 write operation por módulo
- Error handling (404, 401, 400) testado
- Manter 0 failures

---

## Coordenação (Claude Principal)

### Ordem de execução por ciclo:
1. **Agente 1** (Quality) → Corrige bugs encontrados
2. **Agente 3** (Features) → Implementa próxima feature do backlog
3. **Agente 2** (Data) → Enriquece dados se necessário
4. **Agente 4** (Test & Deploy) → Testa tudo e faz deploy

### Regras do coordenador:
- Commitar após cada bloco de trabalho significativo
- Nunca deploy com testes falhando
- Atualizar CLAUDE.md quando features grandes são adicionadas
- Manter git history limpa com mensagens descritivas
- Push para GitHub após cada deploy bem-sucedido

### Ciclo completo = 1 Sprint Mini
Cada passagem pelos 4 agentes = 1 mini-sprint.
Repetir até não haver mais melhorias óbvias.

---

*Criado: 2026-03-01*
*Projeto: FragBase — Rede social de perfumaria*
