# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + build in parallel via npm-run-all2
npm run build-only # Build without type-checking
npm run preview    # Preview production build locally
npm run type-check # vue-tsc --build (type-check only)
npm run images     # Convert Babala product images via scripts/convert-images.mjs
```

Additional scripts (run directly with Node, not via npm):

```bash
node scripts/convert-images.mjs          # Convert Babala-branded product images
node scripts/convert-philips-images.mjs  # Convert Philips-branded product images
node scripts/extract-product-info.mjs    # AI-extract product specs from images (DashScope API)
node scripts/extract-product-detail.mjs  # AI-extract detail info from product images
```

## Architecture

**Stack:** Vue 3 + TypeScript + Vite + Ant Design Vue + vue-i18n + vue-router + @vueuse/motion + vite-plugin-vue-devtools (dev)

**Node requirement:** `^20.19.0 || >=22.12.0` (see `engines` in package.json).

**Deployment:** Hosted on Netlify with SPA redirects (`/*` → `/index.html`) and 1-year immutable cache for `/assets/*`. The Netlify build command is `npm run build-only` (skips type-checking), while local `npm run build` runs type-check + build in parallel. The contact form uses Netlify Forms detected via a hidden static `<form netlify>` in `index.html`.

The site has two parallel product lines sharing the same product IDs (`my-108`, `my-208`, `my-330`, `my-405`, `my-408`) differentiated by the `brand` field (`'babala'` / `'philips'`) on the `Product` type.

### Source Layout

```
src/
├── main.ts                 # App entry: registers Antd, router, i18n, MotionPlugin
├── App.vue                 # Root: a-config-provider (theme + locale), router-view, WhatsAppFloat
├── router/index.ts         # Routes: /, /products, /products/:id, /philips, /philips/:id, /about, /contact, /faq, /oem
├── types/product.ts        # Product type definitions + getImagePath helper
├── data/products.ts        # Babala-brand product data (5 products)
├── data/products-philips.ts# Philips-brand product data (5 products, same IDs)
├── i18n/
│   ├── index.ts            # createI18n with en/zh-CN/vi, locale switcher, persisted to localStorage
│   └── locales/
│       ├── en.ts           # English translations (main locale, fallback)
│       ├── zh-CN.ts        # Chinese translations
│       └── vi.ts           # Vietnamese translations
├── assets/styles/
│   └── global.css          # CSS variables, utility classes (.glass, .btn-pill*, .card-hover, .gradient-text)
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue   # Sticky header, nav menu (desktop), drawer (mobile), language switcher
│   │   └── AppFooter.vue   # Footer with links, products, contact info
│   └── common/
│       ├── HeroRibbon.vue  # Decorative ribbon for hero sections
│       └── WhatsAppFloat.vue # Floating WhatsApp button
└── views/
    ├── HomeView.vue        # Hero + product carousel + featured products grid + strengths + CTA
    ├── ProductsView.vue    # Babala products: category filter tabs + product grid
    ├── ProductDetailView.vue # Babala product detail: carousel, features, specs, variants, learn-more, FAQs
    ├── PhilipsProductsView.vue  # Philips products: category filter tabs + product grid
    ├── PhilipsDetailView.vue    # Philips product detail: carousel, features, specs, variants, learn-more, FAQs
    ├── AboutView.vue       # Brand story, factory images, certifications, values
    ├── ContactView.vue     # Contact form + info
    ├── FAQView.vue         # FAQ accordion
    └── OemView.vue         # OEM/ODM services, process steps, why choose, CTA
```

### Key Patterns

- **Path alias:** `@` resolves to `src/` (configured in `vite.config.ts`).
- **Dual-brand:** Two parallel product lines (Babala + Philips) share the same product IDs. The `brand` field on the `Product` type determines which data file and route set is used. Babala routes: `/products` + `/products/:id`. Philips routes: `/philips` + `/philips/:id`.
- **i18n:** All UI text goes through `$t()` / `useI18n()` with locale persisted in `localStorage('babala-lang')`. Default locale is English.
- **Product data:** Static data in `src/data/products.ts` (Babala) and `src/data/products-philips.ts` (Philips), both typed as `Product[]`. Each product has specs (`specs` flat array or `specsGroups` grouped alternative), features, images with categories (main/accessory/detail/animation/anti-counterfeit/layered), optional power `variants` (with `isExplosionProof` flag), and optional per-product `faqs`.
- **Images:** Product images follow `/images/{productId}/{category}/{filename}` convention for Babala, `/images/philips/{productId}/{category}/{filename}` for Philips. Fallback from .webp to .png in logo components. Note: `getImagePath()` in `types/product.ts` only generates Babala paths — Philips views construct paths manually.
- **TypeScript:** `noUncheckedIndexedAccess: true` in tsconfig — array/object lookups return `| undefined`. tsconfig.json uses project references (tsconfig.app.json + tsconfig.node.json).
- **Routing:** All routes except `HomeView` use lazy-loaded dynamic imports. Products use route guard `beforeEnter` for `/products/:id` and `/philips/:id` validation against valid product IDs. `scrollBehavior` always resets to top on navigation.
- **WhatsApp:** All "Get Quote" / "Contact Us" buttons open `wa.me/8613819896337` with an i18n message.
- **Motion:** `@vueuse/motion` for scroll-triggered fade/slide animations via `v-motion-fade-visible` and `v-motion-slide-visible-*` directives.
- **Theme:** CSS custom properties in `global.css` (--babala-*, --gradient-*, --shadow-*). Ant Design theme configured in App.vue via `a-config-provider`.
- **Product detail Learn More cards:** Hardcoded in both `ProductDetailView.vue` and `PhilipsDetailView.vue` (not from i18n or data). Data source: Excel quotations file in `product_files/`.
- **No tests:** The project has no test runner or test files configured.

### Routes & Valid Product IDs

`my-108`, `my-208`, `my-330`, `my-405`, `my-408` — validated in router guards at both `/products/:id` and `/philips/:id`.

Full route table:

| Path | View | Purpose |
|------|------|---------|
| `/` | HomeView | Landing page |
| `/products` | ProductsView | Babala product listing |
| `/products/:id` | ProductDetailView | Babala product detail |
| `/philips` | PhilipsProductsView | Philips product listing |
| `/philips/:id` | PhilipsDetailView | Philips product detail |
| `/about` | AboutView | Brand story |
| `/contact` | ContactView | Contact form + info |
| `/faq` | FAQView | FAQ accordion |
| `/oem` | OemView | OEM/ODM services |
| `/*` | (redirect) | Catch-all → `/` |

## Product Data Source

Product specifications and feature descriptions originate from Excel spreadsheets in `product_files/`:
- `product_files/Quotations 报价单/沃伦科技飞利浦灭蚊蝇器2026最新报价表.xlsx` — primary quotations
- `product_files/绿汀报价单外贸.xlsx` — secondary quotations
- `product_files/Insect killer lamp offer Sheet- Wolun(Yonghui).xlsx` — English offer sheet

The `scripts/extract-product-info.mjs` and `scripts/extract-product-detail.mjs` scripts use the DashScope (Alibaba Cloud) vision API to extract product info from detail images in `product_files/`. Their output is cached as `scripts/extracted-product-info.json` and `scripts/extracted-detail-info.json`.

The "Learn More" section cards in ProductDetailView/PhilipsDetailView are hardcoded English expansions of the Chinese features from column 6 ("功能/特点") of the quotations spreadsheet, plus two additional cards (tool-free maintenance, multi-scenario deployment).

## Scripts

All scripts are one-off data processing tools (not runtime code). They use `sharp` for image conversion and `xlsx` for reading Excel quotation files.

| Script | Purpose |
|--------|---------|
| `scripts/convert-images.mjs` | Resize/convert Babala product images from `product_files/` → `public/images/` |
| `scripts/convert-philips-images.mjs` | Same for Philips-branded images → `public/images/philips/` |
| `scripts/extract-product-info.mjs` | Read Excel files (`xlsx`) + send product detail images to DashScope vision API, extract structured product info |
| `scripts/extract-product-detail.mjs` | Same, focused on detailed specs and features |

Output cached as `scripts/extracted-product-info.json` and `scripts/extracted-detail-info.json`.

**Note:** The `extract-*.mjs` scripts contain a hardcoded DashScope API key — these should be moved to an environment variable for safety.
