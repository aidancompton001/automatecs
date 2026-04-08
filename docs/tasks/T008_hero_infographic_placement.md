# T008 — Размещение инфографики на главной: замена градиента hero

**Дата:** 2026-04-09
**Статус:** roadmap готов, ожидает ОК CEO
**Ответственный:** #2 Lena Stark (UX/UI) + #3 Tobias Kerner (Frontend)
**Размер:** M
**Скилл:** `ui-ux-pro-max`

---

## Цель

Заменить "поносный" зелёно-золотой градиент на главной странице инфографикой `infographic-service-kreislauf.png`, чтобы посетитель **сразу понял**, чем занимается Automatecs.

---

## Текущее состояние

```
HomeClient.tsx → секции:
  1. HeroSection      → ParallaxHero (FALLBACK_GRADIENT, нет backgroundImage)
  2. CategoryGrid     → 4 категории
  3. CompanyIntro     → текст
  4. CTABanner        → CTA
```

**Проблема:** Hero показывает `linear-gradient(135deg, #536942 0%, #2a2a2a 50%, #dab200 100%)` — нет ни фото, ни смысла. Посетитель не понимает, про что сайт.

**Файл инфографики:** `public/images/infographic-service-kreislauf.png` (уже загружен)

---

## 3 ВАРИАНТА РЕШЕНИЯ

### Вариант A: Инфографика как hero background

**Что:** Передать `backgroundImage="/images/infographic-service-kreislauf.png"` в HeroSection. Инфографика = фон, текст hero поверх с overlay.

**БЫЛО → СТАНЕТ:**
- `HomeClient.tsx`: `<HeroSection ... />` → `<HeroSection backgroundImage="/images/infographic-service-kreislauf.png" ... />`
- `ParallaxHero.tsx`: без изменений (уже поддерживает backgroundImage)

**Файлы:** 1 файл (HomeClient.tsx), 1 строка

| + Плюсы | - Минусы |
|---------|----------|
| Минимум изменений (1 строка) | Overlay затемняет инфографику на 60% — текст и детали не видны |
| ParallaxHero уже поддерживает backgroundImage | Инфографика создана для ЧТЕНИЯ, а не как фон — мелкий текст нечитаем под overlay |
| Parallax-эффект работает из коробки | На mobile 375px инфографика обрезается до неузнаваемости (bg-cover) |
| | Hero-текст конкурирует с текстом инфографики — визуальный хаос |

**Рейтинг: 3/10** — технически просто, визуально катастрофа.

---

### Вариант B: Отдельная секция InfographicBanner ПОСЛЕ hero

**Что:** Оставить hero как есть (но заменить градиент на нормальное hero-фото позже). Добавить новую секцию `InfographicBanner` между CategoryGrid и CompanyIntro (или между Hero и CategoryGrid). Инфографика отображается как полноширинное изображение с `next/image`.

**БЫЛО → СТАНЕТ:**
```
БЫЛО:                          СТАНЕТ:
1. HeroSection (gradient)      1. HeroSection (gradient — пока)
2. CategoryGrid                2. CategoryGrid
3. CompanyIntro                3. InfographicBanner (NEW)
4. CTABanner                   4. CompanyIntro
                               5. CTABanner
```

**Файлы:** 2 файла
- `src/components/sections/InfographicBanner.tsx` — новый компонент (Image + контейнер)
- `src/app/HomeClient.tsx` — добавить секцию

| + Плюсы | - Минусы |
|---------|----------|
| Инфографика видна полностью, без обрезки | Градиент hero остаётся — проблема НЕ решена |
| Адаптивна — масштабируется как обычное изображение | Страница удлиняется (ещё одна full-width секция) |
| Не ломает существующий hero | На mobile инфографика слишком мелкая (текст 6px при 375px) |
| Чистое разделение: hero = эмоция, инфографика = информация | |

**Рейтинг: 5/10** — безопасно, но градиент остаётся, и инфографика на mobile проблемная.

---

### Вариант C: SPLIT HERO — Текст слева + Инфографика справа (РЕКОМЕНДАЦИЯ КОМАНДЫ)

**Что:** Переделать hero в двухколоночный layout. Слева — текст hero (headline, subheadline, CTA) на тёмном фоне (Charcoal). Справа — инфографика (или её центральная часть) как визуальный якорь. На mobile — текст сверху, инфографика под ним.

**БЫЛО → СТАНЕТ:**
```
БЫЛО (gradient, текст слева):
┌─────────────────────────────────────────┐
│ ████ GRADIENT BACKGROUND ████████████████│
│ Konfigurieren Sie...                    │
│ CTA Button           [side callout]     │
└─────────────────────────────────────────┘

СТАНЕТ (split):
┌────────────────────┬────────────────────┐
│ CHARCOAL BG        │                    │
│                    │  INFOGRAPHIC       │
│ Konfigurieren...   │  (center crop      │
│ Subtitle           │   or full)         │
│ [CTA BUTTON]       │                    │
│                    │                    │
└────────────────────┴────────────────────┘

MOBILE 375px:
┌────────────────────┐
│ CHARCOAL BG        │
│ Konfigurieren...   │
│ [CTA]              │
├────────────────────┤
│ INFOGRAPHIC        │
│ (full width,       │
│  scrollable)       │
└────────────────────┘
```

**Файлы:** 2-3 файла
- `src/components/sections/HeroSection.tsx` — переделка layout (flex → grid 2-col)
- `src/app/HomeClient.tsx` — передать prop с путём к инфографике
- `src/components/motion/ParallaxHero.tsx` — возможно адаптация (или не использовать для split)

| + Плюсы | - Минусы |
|---------|----------|
| Градиент УБРАН — чистый Charcoal фон | Больше изменений (переделка HeroSection) |
| Инфографика видна без overlay — читается | ParallaxHero может потребовать адаптации |
| Сразу понятно, про что компания | На tablet 768px пропорции могут быть спорными |
| Professional B2B look (как у конкурентов) | Нужно протестировать 3 breakpoints |
| CTA остаётся заметным (не конкурирует с фоном) | |
| Mobile: инфографика под текстом — логичный поток | |

**Рейтинг: 8/10** — лучший баланс информативности, дизайна и UX.

---

## РЕКОМЕНДАЦИЯ КОМАНДЫ

**Вариант C (Split Hero)** — единогласно.

- **#2 Lena Stark:** "Split hero — стандарт B2B. Инфографику нельзя прятать под overlay. Два столбца дают и эмоцию (текст), и информацию (визуал)."
- **#3 Tobias Kerner:** "Технически чисто — grid 2-col в HeroSection, next/image для инфографики. Breakpoints: `lg:grid-cols-2`, mobile stack."
- **#1 Viktor Richter:** "C решает обе проблемы: убирает градиент И размещает инфографику. A — костыль, B — полумера."

---

## Анализ последствий (Вариант C)

### Затронутые файлы

| # | Файл | Что меняется |
|---|------|-------------|
| 1 | `src/components/sections/HeroSection.tsx` | Layout: single-col → grid 2-col. Добавить Image справа. Mobile: stack. |
| 2 | `src/app/HomeClient.tsx` | Передать `heroImage="/images/infographic-service-kreislauf.png"` |
| 3 | `src/components/motion/ParallaxHero.tsx` | Возможно: убрать bg-image logic, оставить solid bg-color. Или заменить на простой `<section>` |

### Что может поплыть/сломаться

| Риск | Серьёзность | Митигация |
|------|------------|-----------|
| Parallax ломается при split layout | MEDIUM | Отключить parallax для split-варианта, оставить solid bg |
| Инфографика на mobile (375px) — текст мелкий | HIGH | Horizontal scroll или pinch-to-zoom; альтернатива: упрощённая mobile-версия |
| Side callout (телефон справа) конфликтует с правой колонкой | LOW | Убрать side callout или перенести в header |
| CLS при загрузке image | LOW | aspect-ratio + placeholder на next/image |
| Высота hero меняется | LOW | min-h-[70vh] → auto, содержимое определяет высоту |

### Breakpoints

| Breakpoint | Layout | Инфографика |
|-----------|--------|-------------|
| **375px** (mobile) | Stack: текст сверху, картинка снизу | Full-width, aspect-ratio preserved |
| **768px** (tablet) | Stack или 60/40 split | Зависит от теста |
| **1440px** (desktop) | Grid 50/50 или 55/45 | Полная видимость |

### Якоря, навигация, JS, анимации

- Навигация: **не затронута**
- Якоря: **не затронуты**
- JS: motion animations пересматриваются (entry анимация текста сохраняется, parallax отключается)
- Framer Motion: `<motion.h1>`, `<motion.p>` — **сохраняются** внутри левой колонки

### Тесты

- Unit: не требуются (визуальное изменение)
- Visual: проверка на 375/768/1440
- Build: `npm run build` должен пройти

---

## Roadmap (Вариант C)

### Фаза 1: Подготовка

1. Проверить `infographic-service-kreislauf.png` — размеры, вес, качество
2. Оптимизировать если нужно (WebP fallback через next/image)

### Фаза 2: HeroSection → Split Layout

3. `HeroSection.tsx`: заменить `<ParallaxHero>` wrapper на `<section>` с grid layout
4. Левая колонка: Charcoal bg, текст hero (headline, sub, CTA) — существующая разметка
5. Правая колонка: `next/image` с инфографикой, object-contain
6. Mobile: `grid-cols-1 lg:grid-cols-2` — stack на mobile
7. Side callout: перенести внутрь левой колонки или убрать

### Фаза 3: HomeClient

8. `HomeClient.tsx`: передать `heroImage` prop в HeroSection

### Фаза 4: Чистка

9. `ParallaxHero.tsx`: если больше нигде не используется с gradient — удалить FALLBACK_GRADIENT
10. Проверить, используется ли ParallaxHero на других страницах (категории)

### Фаза 5: Верификация

11. `npm run build` → 0 errors
12. Визуальная проверка: 375px, 768px, 1440px
13. Framer Motion анимации работают (entry fade-in)
14. Инфографика читается без обрезки на всех breakpoints
15. CTA видим и кликабелен
16. Нет CLS (content layout shift)

---

## Чеклист приёмки

- [ ] Градиент **убран** с hero
- [ ] Инфографика видна на hero (desktop: справа, mobile: под текстом)
- [ ] Текст hero читается на Charcoal фоне
- [ ] CTA кнопка видна и кликабельна
- [ ] Mobile 375px: текст + инфографика в stack, ничего не обрезано
- [ ] Tablet 768px: адекватный layout
- [ ] Desktop 1440px: split 50/50 или 55/45
- [ ] `npm run build` OK
- [ ] Анимации entry (fade-in) работают
- [ ] Другие страницы с ParallaxHero **не сломаны**
- [ ] Инфографика оптимизирована (next/image)
