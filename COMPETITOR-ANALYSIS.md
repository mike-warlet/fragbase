# Fragbase - Competitor Analysis

## 1. Fragrantica (fragrantica.com)

### Strengths:
- **Massive database**: 80,000+ perfumes with detailed notes pyramid
- **Community voting**: Accords, longevity, sillage, price value all community-driven
- **Ingredient encyclopedia**: Each note has its own page with description and linked perfumes
- **Similar perfumes algorithm**: Weighted by shared notes and accords
- **Search filters**: By note, accord, brand, year, gender, season, time of day
- **Perfumer profiles**: Full biography, lineage, complete fragrance list

### What Fragbase has that Fragrantica doesn't:
- Real-time WebSocket chat
- Gamification (badges, XP, levels)
- Weather-based smart picks
- Layering suggestions
- Weekly challenges

### What Fragbase should implement from Fragrantica:
- [x] Ingredient encyclopedia (migration 020)
- [ ] More robust search filters (by note family)
- [x] Perfumer profiles (Sprint 8)
- [x] Similar perfumes (exists)

---

## 2. Parfumo (parfumo.com)

### Strengths:
- **Scent Compass**: Visual radar chart showing fragrance characteristics
- **Collection analytics**: Stats on total value, brand distribution, note frequency
- **Calendar SOTD view**: Beautiful calendar with fragrance worn each day
- **Dupes section**: Community-rated dupes/alternatives
- **Rating system**: 10-point scale with detailed breakdowns

### What Fragbase has that Parfumo doesn't:
- Social feed with posts
- Real-time messaging
- Gamification
- Weather integration

### What Fragbase should implement from Parfumo:
- [x] Scent Compass (ScentCompass screen exists)
- [x] Collection Analytics (CollectionAnalytics screen exists)
- [x] SOTD Calendar (FragranceDiary exists)
- [x] Similar perfumes with dupes tab (SimilarPerfumes component)

---

## 3. Sniff (sniff.me)

### Strengths:
- **Mobile-first**: Clean, modern mobile UI
- **Discovery quiz**: Swipe-based fragrance matching
- **Social features**: Following, sharing, activity feed
- **Onboarding**: Quick taste profile setup via quiz

### What Fragbase has that Sniff doesn't:
- WebSocket chat
- Gamification
- Layering suggestions
- Challenges
- 500+ perfume database with voting

### What Fragbase should implement from Sniff:
- [x] Discovery quiz (ScentQuiz exists)
- [ ] Better onboarding flow (redirect new users to quiz)

---

## 4. Basenotes (basenotes.com)

### Strengths:
- **Forum community**: Active discussions, knowledge sharing
- **Editorial content**: Reviews, articles, interviews
- **Batch code checker**: Verify authenticity

### What Fragbase has that Basenotes doesn't:
- Modern mobile UI
- Social features (feed, messaging)
- Gamification
- Smart recommendations

### What Fragbase should implement from Basenotes:
- [x] Batch code checker (BatchCheck screen exists)
- [ ] Editorial/article section (future)

---

## 5. SOTD App

### Strengths:
- **Focused on SOTD tracking**: Simple, dedicated experience
- **Wear calendar**: Day-by-day tracking
- **Stats**: Most worn, seasonal patterns

### Fragbase already has all these features:
- [x] SOTD tracking
- [x] Diary/Calendar
- [x] Wear stats

---

## Key Design Insights

### Perfume Detail Page (industry standard):
1. Hero image (large, centered)
2. Brand + Name + Year + Concentration
3. Community rating (stars + count)
4. Notes pyramid (top → heart → base, visual)
5. Accords (colored bars, community-voted)
6. Performance metrics (longevity, sillage bars)
7. Seasonal recommendation (radar/bars)
8. Similar perfumes carousel
9. Reviews section
10. Where to buy links

### Feed/Social (best practices):
1. SOTD posts prominently featured
2. Review snippets in feed
3. Achievement announcements
4. "X added Y to collection" activity
5. Quick reaction buttons

### Search/Discovery (best practices):
1. Auto-suggest while typing
2. Filter chips (tappable, removable)
3. Grid view with large images
4. Quick filters: gender, family, season, occasion

---

## Implementation Priority

Already implemented (from competitor features):
- Scent Compass, Collection Analytics, Ingredient Encyclopedia
- Perfumer profiles, Statements, User Recommendations
- Discovery quiz, Gamification, Weather picks
- Batch code checker, SOTD calendar

Remaining improvements to consider:
1. **Better onboarding** - redirect new users to ScentQuiz
2. **Note family filters** in search
3. **Editorial content** section
4. **Price tracking** integration

---
*Analysis date: 2026-03-01*
