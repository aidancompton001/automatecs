# DEVLOG.md — Automatecs

## Журнал разработки

Записи от новых к старым. Нумерация: S001, S002, ... SNNN.
Владелец процесса: #1 Viktor Richter (Product Architect).

---

### [S025] — 2026-04-09 — T006: LUMA Brand Identity — 5 цветов, Jost, лого — 362 теста

**Задача:** [T006](docs/tasks/T006_luma_branding_implementation.md)
**Роли:** #2 Lena Stark (lead), #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**

- Строгая 5-цветная палитра LUMA: Gold #ffd936, Dark Gold #dab200, Forest Green #536942, Warm White #f8f7f4, Charcoal #2a2a2a
- 92 gray-класса удалены из 26 файлов → замена на opacity от Charcoal/Warm White
- 10 gray-токенов удалены из globals.css
- brand-black: #1a1a1a → #2a2a2a (Charcoal)
- brand-white: #ffffff → #f8f7f4 (Warm White)
- Heading font: Poppins → Jost (Light Extended Sans-Serif, weights 300-600)
- SVG лого: "A" с золотой полосой, Header uppercase tracking-[0.2em]
- WCAG contrast check: все комбинации ≥ 4.5:1 (min opacity 70%)
- ParallaxHero gradient: #1a1a1a → #2a2a2a
- 3 новых теста: no gray-* anywhere, no old hex, no gray tokens in CSS

**Ключевые решения:**

- Ланда L1: НЕ переименовывать токены → меняем ЗНАЧЕНИЯ, сокращаем правки
- Ланда L2: Contrast check ПЕРЕД заменами → charcoal/50 FAIL → min 70%
- Ланда L3: Тесты СНАЧАЛА → обновили до токенов

**Артефакты:** 30 файлов изменены, `public/logo.svg` создан

**Тесты:**

- `npm run build` ✅ (39 pages)
- `npx vitest run` ✅ (362/362)
- `npx tsc --noEmit` ✅ (0 errors)
- `grep gray- src/` = 0 ✅

---

### [S024] — 2026-04-09 — T005: Серая полоска убрана — 359 тестов

**Роли:** #2 Lena Stark
**Статус:** завершено

**Баг:** Серая горизонтальная полоска между тёмным hero gradient и контентом.
**Причина:** CategoryGrid `bg-gray-50` + `py-16` = серый padding видим на стыке с hero.
**Фикс:** `bg-gray-50` → `bg-brand-white`. Commit `f8eaad0`.
**Тест:** CategoryGrid НЕ содержит bg-gray-50 ✅

---

### [S023] — 2026-04-09 — T004: Изображения из PDF + basePath fix — 357 тестов

**Роли:** #2 Lena Stark (lead), #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- 133 изображения извлечены из 3 PDF (pymupdf)
- Аудит: AdobeStock watermark на hero images → SKIP, чистые фото автоматов → USE
- 21 product images: маппинг по slug (3 Sanden Vendo + 3 sempreAqua)
- 2 blog images (кофейные зёрна — чистые)
- assets.ts: getImageUrl() с basePath '/automatecs' (T004 CSS url() fix)
- ProductCard: aspect-[3/4] — fixed ratio, NO CLS
- BlogCard: aspect-video — fixed ratio, NO CLS
- ParallaxHero: gradient fallback (brand colors) когда нет hero image
- Hero paths: убраны несуществующие → gradient fallback
- 32 новых теста: file existence, basePath, aspect ratios, no AdobeStock

**Артефакты:** 36 файлов, commit `84ca421`, deployed

**Тесты:**
- `npm run build` ✅ (39 pages, 21+2 images in out/)
- `npx vitest run` ✅ (357/357)
- Deploy ✅ SUCCESS

---

### [S022] — 2026-04-09 — LUMA Brand Identity промт для Automatecs

**Задача:** [T003](docs/tasks/T003_luma_branding_prompts.md)
**Роли:** #2 Lena Stark (UX/UI), #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- LUMA Brand Identity промт адаптирован из примера (Luma Home → Automatecs)
- 5 блоков: Brand Name, Brand Values, Target Audience, Industry, Visual Direction
- Бренд-параметры: #ffd936/#dab200/#536942, Norddeutsche Zuverlässigkeit, 30+ лет
- Диагностика T004: обнаружено 0 файлов изображений на сайте (31 ссылка → 404)

**Ключевые решения:**
- Ланда L1: добавлен Visual Direction (цвета, стиль, освещение) — без него LUMA не знает как рендерить
- Ланда L2: "German engineering" → "Norddeutsche Zuverlässigkeit" (Automatecs = сервис, не производитель)

**Артефакты:** `docs/tasks/T003_luma_branding_prompts.md`, `docs/tasks/T004_missing_images_fix.md`

**Следующие шаги:**
- CEO генерирует визуалы на LUMA
- T004: добавить placeholder-изображения + исправить basePath в CSS url()

---

### [S021] — 2026-04-09 — КРИТИЧЕСКИЙ БАГ: сайт без CSS + 2 СТРАЙКА

**Роли:** #3 Tobias Kerner (страйк 1/2), #6 Jan Breuer (страйк 1/2)
**Статус:** завершено — баг исправлен

**Баг:** Сайт на GitHub Pages рендерился БЕЗ CSS — голый HTML, без стилей.
**Причина:** `basePath` не задан в next.config.ts. GitHub Pages = subdirectory `/automatecs/`. CSS/JS assets запрашивались по `/_next/` (404) вместо `/automatecs/_next/`.
**Фикс:** `basePath: '/automatecs'` в next.config.ts. Commit `a167043`.

**СТРАЙКИ:**
- **#3 Tobias Kerner — страйк 1/2:** пропустил шаги 5-6 протокола P2 (Ланда ревью → ТС2 → ОК CEO). Исправил баг без одобрения CEO.
- **#6 Jan Breuer — страйк 1/2:** не проверил basePath при deploy (Фаза 14). Сайт ушёл в production с 404 на всех assets.

**Урок:** НИКОГДА не пропускать протокол, даже на critical баг. Ланда ревью + ОК CEO — обязательно.

**Артефакты:** commit `a167043`, TEAM.md реестр замечаний обновлён

---

### [S020] — 2026-04-08 — ФАЗА 14: Deploy — GitHub Pages LIVE

**Роли:** #6 Jan Breuer (lead)
**Статус:** завершено

**Что сделано:**
- GitHub repo: aidancompton001/automatecs (public)
- GitHub Actions: deploy.yml (Node 22, npm install, build, deploy-pages)
- GitHub Pages: LIVE at https://aidancompton001.github.io/automatecs/
- Decap CMS config: repo updated to aidancompton001/automatecs
- 18 коммитов pushed, build SUCCESS

**Артефакты:** https://github.com/aidancompton001/automatecs

**URL для заказчика:** https://aidancompton001.github.io/automatecs/

**Следующие шаги:**
- Werner тестирует сайт
- Custom domain (automatecs.de) когда готов

---

### [S019] — 2026-04-08 — ФАЗА 13: QA Audit — 325 тестов, всё зелёное

**Роли:** #7 Katrin Eilers (lead), #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- qa-audit.test.ts: 'use client' check, reduced-motion, data integrity, no Lorem ipsum
- checklist.test.ts: автоматизированный T001 acceptance criteria (26 checks)
- TypeScript strict: 0 errors
- Output size: 4.6MB (< 5MB budget)
- 68 НОВЫХ тестов, total 325/325

**Ключевые проверки:**
- Calculator: 829000 + all options = 1249900 ✅
- robots.txt: no noindex ✅
- prefers-reduced-motion: CSS reset present ✅
- All motion components: 'use client' ✅
- No placeholder text in data ✅

**Артефакты:** 3 файла, commit `2db5d6b`

**Тесты:**
- `npm run build` ✅ (39 pages)
- `npx vitest run` ✅ (325/325)
- `npx tsc --noEmit` ✅ (0 errors)

**Следующие шаги:**
- Фаза 14: Deploy (GitHub repo + push)

---

### [S018] — 2026-04-08 — ФАЗА 12: Page Transitions — minimal fade-in, 257 тестов

**Роли:** #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- LayoutShell: motion.main fade-in (opacity 0→1, 300ms)
- NO AnimatePresence (Landa L1: ненадёжно с App Router + static export)
- NO template.tsx (C5: сбрасывает client state)
- Mobile: disabled через shouldAnimate

**Ключевые решения:**
- Ланда рекомендовал пропустить full page transitions — принято
- Minimal fade-in only = безопасно, без flash, без state loss
- План отката НЕ потребовался — build прошёл

**Артефакты:** 2 файла, commit `b601ec7`

**Тесты:**
- `npm run build` ✅ (39 pages)
- `npx vitest run` ✅ (257/257)

**Следующие шаги:**
- Фаза 13: QA + Animation Performance Audit

---

### [S017] — 2026-04-08 — ФАЗА 11: CMS (Decap CMS) — 4 файла, 249 тестов

**Роли:** #9 Maren Voigt (lead), #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- admin/index.html: Decap CMS SPA (CDN, noindex)
- admin/config.yml: GitHub backend, editorial_workflow, 3 collections (pages/blog/legal)
- docs/CMS_GUIDE.md: немецкая документация для Werner (Landa L2)
- admin/ verified в out/ после build (Landa L1)

**Ключевые решения:**
- CMS manages: pages (7), blog, legal. Products/options = dev-only (C4)
- Editorial workflow: draft → review → publish
- GitHub backend: repo placeholder, configure after deploy

**Артефакты:** 4 файла, commit `9ccc27a`

**Тесты:**
- `npm run build` ✅ (39 pages + admin/)
- `npx vitest run` ✅ (249/249)

**Следующие шаги:**
- Фаза 12: Page Transitions (ОСТОРОЖНО)

---

### [S016] — 2026-04-08 — ФАЗА 10: SEO — 5 файлов, 233 теста

**Роли:** #3 Tobias Kerner, #14 Hans Landa (ТС ревью + 2-я проверка)
**Статус:** завершено

**Что сделано:**
- seo.ts: 3 JSON-LD generators (Org, Product, Breadcrumb)
- Organization JSON-LD в layout.tsx — sitewide
- robots.txt: Allow all, NO noindex, Sitemap directive
- sitemap.xml: 36 URLs manual, priorities
- Landa 2nd check: PASS (robots clean, 36 URLs, 3 generators)

**Артефакты:** 5 файлов, commit `ee9379c`

**Тесты:**
- `npm run build` ✅ (39 pages)
- `npx vitest run` ✅ (233/233)

**Следующие шаги:**
- Фаза 11: CMS (Decap CMS)

---

### [S015] — 2026-04-08 — ФАЗА 9: DSGVO Compliance — 10 файлов, 209 тестов

**Роли:** #9 Maren Voigt (lead), #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- Impressum: TMG §5 полная структура (Haftung, Urheberrecht, Streitschlichtung)
- Datenschutz: DSGVO (Hosting GH Pages, Cookies, Kontaktformular, Art. 15-21, Aufsichtsbehörde Niedersachsen, SSL)
- LegalDisclaimer: жёлтый banner "Seite wird aktualisiert" (Landa L1)
- legal.ts: markdown parser → sections
- Cookie-Banner → /datenschutz/ link теперь работает

**Ключевые решения:**
- Datenschutz: "keine Tracking-Cookies" — подтверждено, cookie-consent = localStorage only
- Disclaimer banner видим на обеих legal страницах (Landa L1)
- DSGVO Art. 15-21 все Betroffenenrechte перечислены (Landa L2)

**Артефакты:** 10 файлов, commit `dfffb53`, 39 pages

**Тесты:**
- `npm run build` ✅ (39 pages)
- `npx vitest run` ✅ (209/209 passed)

**Следующие шаги:**
- Фаза 10: SEO (Metadata, JSON-LD, sitemap, robots.txt)

---

### [S014] — 2026-04-08 — ФАЗА 8: Blog с hover-эффектами — 9 файлов, 180 тестов

**Роли:** #9 Maren Voigt (lead), #2 Lena Stark, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- BlogCard: hover lift -8px + shadow + image zoom 1.03 + underline slide-in
- blog-posts.json: 2 demo posts (willkommen, snack-automaten-guide)
- Blog listing: StaggerContainer grid
- Blog detail [slug]: SSG + ScrollReveal paragraphs
- blog.ts: helpers + formatDateDE
- 13 новых тестов

**Ключевые решения:**
- JSON-based blog, без MDX (Landa L1: MVP, CMS заменит позже)
- formatDateDE: ISO → "8. April 2026"

**Артефакты:** 9 файлов, commit `ea796d2`, 37 pages

**Тесты:**
- `npm run build` ✅ (37 pages)
- `npx vitest run` ✅ (180/180 passed)

**Следующие шаги:**
- Фаза 9: DSGVO Compliance (Impressum + Datenschutz)

---

### [S013] — 2026-04-08 — ФАЗА 7: Статические страницы — 9 файлов, 167 тестов

**Роли:** #9 Maren Voigt (lead), #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- Service: ParallaxHero + two-column (Vollservice 4 + Vorteile 4)
- Unternehmen: ParallaxHero + body + company facts grid (30+, 24/7, Familienbetrieb)
- Kontakt: contact info + mailto form (maxLength 500, Landa L1)
- Zubehör: "Demnächst verfügbar" + CTA (Landa L2)

**Ключевые решения:**
- Kontakt form = mailto: заглушка, textarea maxLength=500 (URI limit, Landa L1)
- Zubehör = placeholder + CTA "Kontaktieren Sie uns" (Landa L2, T002 F3)

**Артефакты:** 9 файлов, commit `9924fc6`, 34 pages total

**Тесты:**
- `npm run build` ✅ (34 pages)
- `npx vitest run` ✅ (167/167 passed)

**Следующие шаги:**
- Фаза 8: Blog с hover-эффектами

---

### [S012] — 2026-04-08 — ФАЗА 6: Детальная + Конфигуратор — 7 файлов, 152 теста

**Роли:** #3 Tobias Kerner (lead), #2 Lena Stark, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- ProductDetail: ParallaxHero + описание + specs + calculator + features
- SpecsTable: animated row-by-row (stagger 40ms), 11 rows для Design XII
- PriceCalculator: checkbox spring, option cards grouped, AnimatedCounter total
- IncludedFeatures: 14 items "ohne Aufpreis" в StaggerContainer
- SSG: 21 product page через generateStaticParams
- JSON-LD Product schema (Landa L3): @type Product, offers.price EUR
- Wasserspender: no calculator, "Preis auf Anfrage"

**Ключевые решения:**
- ЖЕЛЕЗНОЕ ПРАВИЛО: calculator.ts = single source, PriceCalculator вызывает calculateTotal()
- SSG params = 21 (тест Landa L1 гарантирует)
- JSON-LD: price 0 → schema не генерируется

**Артефакты:** 7 файлов, commit `8e74569`, 30 pages generated

**Тесты:**
- `npm run build` ✅ (30 pages: 7 static + 21 SSG)
- `npx vitest run` ✅ (152/152 passed)

**Следующие шаги:**
- Фаза 7: Статические страницы (Service, Unternehmen, Kontakt, Zubehör)

---

### [S011] — 2026-04-08 — ФАЗА 5: Категории с 3D-карточками — 10 файлов, 130 тестов

**Роли:** #2 Lena Stark (lead), #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- ProductCard: TiltCard 3D + placeholder badge (isPlaceholder) + "Preis auf Anfrage"
- CategoryPageLayout: shared DRY компонент (Landa L1) — hero + text + grid
- /automaten/ landing: 4 категории overview
- 4 category pages: snack (6), kalt (6 placeholder), kaffee (6 placeholder), wasser (3 no price)
- 20 новых тестов: content, placeholders, prices, slugs

**Ключевые решения:**
- CategoryPageLayout = shared, каждая page.tsx = thin wrapper (Landa L1 DRY)
- isPlaceholder → badge "Daten werden aktualisiert" + opacity 0.7 (Landa L2)
- Wasserspender: "Preis auf Anfrage", CTA → "Anfragen →" (mailto)

**Артефакты:** 10 файлов, commit `e9226ec`, 7 static routes

**Тесты:**
- `npm run build` ✅ (7 routes)
- `npx vitest run` ✅ (130/130 passed)

**Следующие шаги:**
- Фаза 6: Детальная карточка + Animated Конфигуратор

---

### [S010] — 2026-04-08 — ФАЗА 4: Главная с параллакс-hero — 9 файлов, 110 тестов

**Роли:** #2 Lena Stark (lead), #3 Tobias Kerner
**Статус:** завершено

**Что сделано:**
- HeroSection: ParallaxHero + staggered text/CTA/callout из home.json
- CategoryGrid: 4 категории + "ab 6.190,- €" (min price из products.json)
- CompanyIntro: ScrollReveal параграфы из PDF
- CTABanner: "Fordern Sie jetzt Ihr Angebot an" + hover scale
- catalog.ts: helpers для categories/products/prices
- HomeClient: client wrapper для Server Component page.tsx

**Ключевые решения:**
- page.tsx = Server Component (данные), HomeClient = 'use client' (анимации)
- CategoryGrid показывает min price per category (Landa L2)
- JSON import через relative path ../../content/ (Landa L1 — works with static export)

**Артефакты:** 9 файлов, commit `63c9652`

**Тесты:**
- `npm run build` ✅
- `npx vitest run` ✅ (110/110 passed)

**Следующие шаги:**
- Фаза 5: Категории с 3D-карточками

---

### [S009] — 2026-04-08 — ФАЗА 3.5: Миграция контента — 14 файлов, 101 тест

**Роли:** #9 Maren Voigt, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- 7 page content JSON (home, 4 категории, service, unternehmen) — тексты из PDF
- company.json: контактные данные, слоган, 4 услуги
- included-features.json: 14 фич "ohne Aufpreis" из PDF KORR
- blog/willkommen.mdx: демо-пост с frontmatter
- legal/impressum.md + datenschutz.md: placeholders с TODO
- PageContent interface: единая структура для CMS (Landa L1)
- 47 новых тестов: структура, немецкий текст (не lorem ipsum), файлы exist

**Ключевые решения:**
- Разделение [C4]: CMS = pages/blog/legal, JSON = products/options/company
- PageContent: hero + body[] + sections[] — единый формат (Landa L1)
- Legal = TODO placeholders — реальный текст от Werner (Landa L2)

**Артефакты:** 14 файлов, commit `6534511`

**Тесты:**
- `npm run build` ✅
- `npx vitest run` ✅ (101/101 passed)

**Следующие шаги:**
- Фаза 4: Главная страница с параллакс-hero

---

### [S008] — 2026-04-08 — ФАЗА 3: Данные каталога — 10 файлов, 54 теста

**Роли:** #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- categories.json: 4 категории с полными метаданными
- products.json: 21 продукт (6S + 6K + 6Ka + 3W), cents-based pricing
- options.json: 9 Zusatzoptionen (5 KORR + 4 lay_2_GES), все в центах
- calculator.ts: calculateTotal + валидация optionIds (throw на invalid)
- formatPrice.ts: единый source of truth (refactored из AnimatedCounter)
- Product.isPlaceholder: Kalt/Kaffee = true (ожидают данные от Werner)
- 33 НОВЫХ теста: calculator combos, data integrity, format, boundaries

**Ключевые решения:**
- ЖЕЛЕЗНОЕ ПРАВИЛО: все цены integer cents, NO floats
- formatPrice.ts = single source (Landa L1), AnimatedCounter импортирует
- calculator throws на невалидный optionId (Landa L3)
- Base 829000 + all 9 options = 1249900 (12.499€) — verified by test

**Артефакты:** 10 файлов, commit `7232011`

**Тесты:**
- `npm run build` ✅
- `npx vitest run` ✅ (54/54 passed)

**Следующие шаги:**
- Фаза 3.5: Миграция контента из PDF

---

### [S007] — 2026-04-08 — ФАЗА 2: Layout + Navigation — 10 файлов, 21 тест

**Роли:** #2 Lena Stark, #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- Header: TopBar + desktop nav + animated dropdown + mobile burger (slide-in)
- Footer: 3-col grid, contacts, CTA "Fordern Sie jetzt Ihr Angebot an"
- CookieBanner: DSGVO slide-up, localStorage persist
- LayoutShell: client wrapper (Server layout → client MotionProvider)
- error.tsx, loading.tsx (skeleton), not-found.tsx (custom 404)

**Ключевые решения:**
- layout.tsx = Server Component, LayoutShell = 'use client' wrapper (Landa L1)
- CookieBanner localStorage check on mount (Landa L2)
- Footer CTA: initial pulse, не infinite (D3 fix / Landa L3)
- Framer Motion ease: `as const` для TS strict compatibility

**Артефакты:** 10 файлов, commit `aad32c9`

**Тесты:**
- `npm run build` ✅
- `npx vitest run` ✅ (21/21 passed)

**Следующие шаги:**
- Фаза 3: Данные каталога (products.json, options.json, calculator.ts)

---

### [S006] — 2026-04-08 — ФАЗА 1: Motion Foundation — 14 файлов, 13 тестов

**Роли:** #3 Tobias Kerner, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- motion-variants.ts: 5 shared animation variants
- 4 hooks: useMediaQuery (SSR-safe), useParallax, useScrollProgress, useTilt
- MotionProvider: context с isMobile, prefersReducedMotion, shouldAnimate
- 6 компонентов: ScrollReveal, StaggerContainer, StaggerItem, ParallaxHero, TiltCard, AnimatedCounter
- formatCentsToEUR: cents → "8.290,00 €"
- 13 unit tests (variants + EUR formatting + calculator totals)

**Ключевые решения:**
- ParallaxHero: offset=0 при SSR, parallax после mount (Landa L1)
- TiltCard: onMouseLeave reset rotation (Landa L2)
- AnimatedCounter: animate INTEGER cents, format AFTER (D2 fix)

**Артефакты:** 14 файлов в `src/`, commit `243d6f4`

**Тесты:**
- `npm run build` ✅
- `npx vitest run` ✅ (13/13 passed)

**Следующие шаги:**
- Фаза 2: Layout + Navigation с анимациями

---

### [S005] — 2026-04-08 — ФАЗА 0: Scaffold создан, тесты проходят

**Роли:** #3 Tobias Kerner
**Статус:** завершено

**Что сделано:**
- Next.js 15 + Tailwind 4 + Framer Motion 11 + Vitest scaffold
- Poppins + Open Sans через next/font/google
- TypeScript interfaces: Product, Category, Option, Specs, BlogPost, CompanyInfo
- Brand tokens: #ffd936, #dab200, #536942 в CSS @theme
- Static export (output: 'export') для GitHub Pages
- prefers-reduced-motion global reset
- 2 smoke tests: types + brand colors

**Артефакты:** `automatecs/` (весь scaffold), commit `83cc8fb`

**Тесты:**
- `npm run build` ✅ (static export OK)
- `npx vitest run` ✅ (2/2 passed)
- `npx tsc --noEmit` ✅ (0 errors)

**Следующие шаги:**
- Фаза 1: Motion Foundation (hooks, variants, 7 motion components)

---

### [S004] — 2026-04-08 — 35 проблем T002 закрыты (P8 mass fix)

**Роли:** #1 Viktor Richter, #14 Hans Landa (ТС ревью)
**Статус:** завершено

**Что сделано:**
- TEAM.md: #5→#9 Maren Voigt (каскад устранён)
- CLAUDE.md: tech stack locked (Decap, GH Pages, Poppins/Open Sans, mailto form)
- T001 v3: base price 8.290€, output: 'export', 4 потерянные опции добавлены
- T001: +Фаза 3.5 (миграция контента), тест-фреймворки, types, error/loading/404
- T001: 6 тех.ошибок в анимациях исправлены (D1-D6)
- T001: чеклист расширен (+8 пунктов)

**Ключевые решения:**
- GitHub Pages + static export сейчас, Plan B: Cloudflare Pages (hybrid) — CEO решение
- Contact form = mailto: заглушка — CEO решение
- CMS manages hero/blog/legal, JSON manages products/categories — явное разделение [C4]

**Артефакты:** `TEAM.md`, `CLAUDE.md`, `docs/tasks/T001_automatecs_full_build.md` (v3)

**Следующие шаги:**
- P6 верификация: Hans Landa проверяет все 35 закрыты

---

### [S003] — 2026-04-08 — Аудит T001: 35 проблем найдено (#14 Landa)

**Роли:** #14 Hans Landa
**Статус:** завершено

**Что сделано:**
- Adversarial review T001: 4 CRITICAL, 18 HIGH, 11 MEDIUM, 2 LOW
- 7 категорий: протокол (5), данные (5), roadmap (8), тех.ошибки (6), пропуски (7), чеклист (4)
- Roadmap исправлений: 35 пронумерованных шагов

**Ключевые решения:**
- 4 CRITICAL блокируют старт: ценообразование, static/hybrid, contact backend, TEAM #5→#9

**Артефакты:** `docs/tasks/T002_audit_T001_roadmap.md`

**Следующие шаги:**
- CEO отвечает на 4 CRITICAL → P8 массовые исправления → P6 верификация

---

### [S002] — 2026-04-08 — T001 v2: анимационный слой добавлен

**Роли:** #1 Viktor Richter, #2 Lena Stark, #3 Tobias Kerner
**Статус:** завершено

**Что сделано:**
- Framer Motion 11 добавлен в стек (Locked)
- 10 анимаций специфицированы: параллакс, 3D tilt, scroll reveal, animated counter
- 7 motion-компонентов + 4 hooks + shared variants
- Mobile strategy: параллакс/3D ВЫКЛ на 375px
- Performance budget: Lighthouse ≥ 90, 60fps, < 50KB FM bundle
- Roadmap расширен: 12→15 фаз, 78→104 шага

**Ключевые решения:**
- Framer Motion, не GSAP — tree-shakeable, React-native integration
- prefers-reduced-motion обязательно — WCAG 2.1 compliance

**Артефакты:** `docs/tasks/T001_automatecs_full_build.md` (v2), `CLAUDE.md` (tech stack updated)

**Следующие шаги:**
- Аудит T001 (#14 Hans Landa)

---

### [S001] — 2026-04-08 — Проект инициализирован (P7 Startup + P0)

**Роли:** #1 Viktor Richter, #14 Hans Landa
**Статус:** завершено

**Что сделано:**
- CLAUDE.md, TEAM.md, DEVLOG.md, STATUS.md, docs/CREDENTIALS.md созданы
- ТС1 → ревью Ланды (4C, 5H, 3M) → ТС2 сформирован
- Анализ старого сайта automatecs.tbsrv.de: 52 проб��емы найдено
- 3 PDF клиента: полный data extraction (модели, цены, спеки, опции)
- T001 Roadmap v1: 12 фаз, 78 шагов, чеклист приёмки

**Ключевые решения:**
- Next.js 15 + Tailwind 4 + Decap CMS + Cloudflare Pages ��� стек
- 7 ролей: #1 Viktor, #2 Lena, #3 Tobias, #5 Maren, #6 Jan, #7 Katrin, #14 Landa
- Старый WP-сайт НЕ дорабатывае��ся — полный rebuild

**Артефакты:** `CLAUDE.md`, `TEAM.md`, `docs/tasks/T001_automatecs_full_build.md`

**Следующие шаги:**
- Добавить анимационный слой (Framer Motion) → обновить T001

---

<!--
  Формат записи:

  ### [SNNN] — ГГГГ-ММ-ДД — Краткий заголовок (макс. 60 символов)

  **Роли:** #N Роль, #N Роль
  **Статус:** завершено | частично | заблокировано

  **Что сделано:**
  - Результат 1
  - Результат 2

  **Ключевые решения:**
  - Решение — причина

  **Артефакты:** `файл1.md`, `файл2.ts`

  **Следующие шаги:**
  - Конкретное действие

  ПРАВИЛА:
  - Максимальная краткость (сканируется за 10 секунд)
  - Результаты, не процесс ("Создан auth модуль", не "Работал над auth")
  - Конкретные артефакты (всегда указывать файлы)
  - Решения с причинами (ЧТО и ПОЧЕМУ)
  - Максимум 15 строк на запись
-->
