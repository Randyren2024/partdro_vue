# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Vite dev server on port 3000
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

No test suite or linter is configured. Type checking (`vue-tsc --noEmit`) is broken due to Node version incompatibility — verify correctness via `npm run build`.

## Architecture

**Stack:** Vue 3 + Vite + TypeScript + Ant Design Vue 4 + Vue Router + `@vueuse/motion`

**Routing (SPA):** `createWebHistory()` — all routes fall through to `/index.html` (Netlify `_redirects` handles this in production). Routes: `/`, `/products-solutions`, `/product/:id`, `/solutions`, `/about_us`, `/contact_us`, `/support`, `/privacy-policy`, `/terms-conditions`.

**Product data:** `src/data/products.ts` is the single source of truth. It exports:
- `Product` interface — all product fields (name, description, tagline, features, specifications, `specsGroups`, `learnMoreCards`, `faqs`, `gallery`, `whyReasons`, `applications`, `image`, etc.)
- `products[]` — array of 8 product objects keyed by `id` (af718, af305, isobus, vs100, w20, aries300n, taurus80e, egs101)
- `categories[]` — 5 category objects
- Helper functions: `getProductsByCategory()`, `getProductById()`, `getBestSellers()`, `getNewProducts()`

**Product detail page (`ProductDetailView.vue`):** The most complex component. Uses `computed` to derive `product` from route param `:id` via `getProductById()`. Key sections: hero (image + info + accordion), learn-more cards, core applications carousel, specs tabs, FAQs accordion, related products. Handles fallback images via `images.fallback` map.

**Image strategy:** All images live in `public/images/` — served statically, not processed by Vite. Product subdirectories: `products/` (main images), `af718/`, `af305/`, `isobus/`, `vs100/`, `w20_cards/`, `aries300n/`, `egs101/` (learn-more card images). The `@vueuse/motion` plugin provides scroll-triggered animations (`v-motion-slide-visible-left`, `v-motion-fade-visible`, etc.).

## Critical CSS Gotchas

- **Ant Design carousel (`<a-carousel>`) + CSS Grid:** Slick carousel sets inline `width` on `.slick-track` via JavaScript. Grid items MUST have `min-width: 0` and `overflow: clip` to prevent the column from expanding to fit slick's calculated width.
- **Grid `align-items: start`:** Prevents image and info columns from being forced to equal height.
- **Product images:** Use `object-fit: contain` (not `cover`) to preserve full product image without cropping. Square images (1024×1024) from AllyNav source.

## Content Population Pattern

When updating product content from external sources (AllyNav):
1. Download product main image (og:image) → `public/images/products/<id>-main.png`
2. Download learn-more card images → `public/images/<id>/`
3. Extract specs tabs (`.elementskit-tab-title`), FAQ questions/answers (`.e-n-accordion-item-title-text`), feature badges, learn-more card data from product page HTML
4. Update `src/data/products.ts` with new `gallery`, `image`, `learnMoreCards`, `specsGroups`, `faqs`, `tagline`, `whyReasons` fields
5. Verify with Playwright: `node -e "import('playwright').then(…)"` taking a screenshot at 1440×900

## Image Error Handling

Always use a guarded error handler to prevent infinite reload loops:

```ts
const handleImageError = (e: Event, fallback: string) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackUsed) return      // guard — break the loop
  img.dataset.fallbackUsed = 'true'
  img.src = fallback
}
```

Fallback URLs must be **different** from the primary URL. If both point to the same missing file, the error handler fires → sets same URL → fails again → infinite loop → page flickers.

## AllyNav Image Download

Image URLs in AllyNav product pages use the upload month subdirectory:
- `https://www.allynav.com/wp-content/uploads/2025/04/<filename>` — W20, AF305, ISOBUS, VS100, EGS101
- `https://www.allynav.com/wp-content/uploads/2025/10/<filename>` — AF718
- `https://www.allynav.com/wp-content/uploads/2025/11/<filename>` — Aries300N
- `https://www.allynav.com/wp-content/uploads/2026/01/<filename>` — some EGS101

Always check the actual `data-lazy-src` in the page HTML — never assume the month.

## Git Push

HTTPS to GitHub is blocked by firewall. Use SSH:
```bash
git remote set-url origin git@github.com:Randyren2024/vesper_vue.git
git push -u origin master
```
