# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Vite dev server (default port 3000; falls back to 3001/3002 if taken — see notes)
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

No test suite or linter is configured. Type checking (`vue-tsc --noEmit`) is broken due to Node version incompatibility — verify correctness via `npm run build`.

## Architecture

**Stack:** Vue 3 + Vite + TypeScript + Ant Design Vue 4 + Vue Router + `@vueuse/motion`

**Routing (SPA):** `createWebHistory()` — all routes fall through to `/index.html` (Netlify `_redirects` handles this in production). Routes: `/`, `/products-solutions`, `/product/:id`, `/solutions`, `/about_us`, `/contact_us`, `/support`, `/privacy-policy`, `/terms-conditions`.

**Product data:** `src/data/products.ts` is the single source of truth. It exports:
- `Product` interface — all product fields (name, description, tagline, features, specifications, `specsGroups`, `learnMoreCards`, `faqs`, `gallery`, `whyReasons`, `applications`, `image`, etc.)
- `products[]` — keyed by `id` (consumer drone: `lumenfly-mini`; legacy industrial: `af718`, `af305`, `isobus`, `vs100`, `w20`, `aries300n`, `taurus80e`, `egs101` — most were pruned in mid-2026, only `lumenfly-mini` is currently shipped)
- `categories[]` — 5 category objects: `consumer-drones`, `enterprise-drones`, `agriculture-drones`, `drone-accessories`, `payloads-sensors`
- Helper functions: `getProductsByCategory()`, `getProductById()`, `getBestSellers()`, `getNewProducts()`

**Product detail page (`ProductDetailView.vue`):** The most complex component. Uses `computed` to derive `product` from route param `:id` via `getProductById()`. Key sections: hero (image + info + accordion), learn-more cards, core applications carousel, specs tabs, FAQs accordion, related products. Handles fallback images via `images.fallback` map.

**Image strategy:** All images live in `public/images/` — served statically, not processed by Vite. Product subdirectories: `products/` (main images), `af718/`, `af305/`, `isobus/`, `vs100/`, `w20_cards/`, `aries300n/`, `egs101/`, `lumenfly-mini/` (learn-more card images, hero, gallery). The `@vueuse/motion` plugin provides scroll-triggered animations (`v-motion-slide-visible-left`, `v-motion-fade-visible`, etc.).

## Critical CSS Gotchas

- **Ant Design carousel (`<a-carousel>`) + CSS Grid:** Slick carousel sets inline `width` on `.slick-track` via JavaScript. Grid items MUST have `min-width: 0` and `overflow: clip` to prevent the column from expanding to fit slick's calculated width.
- **Grid `align-items: start`:** Prevents image and info columns from being forced to equal height.
- **Product images:** Use `object-fit: contain` (not `cover`) to preserve full product image without cropping. Square images (1024×1024) from AllyNav source.

## Hardcoded Couplings in ProductDetailView.vue

These two arrays are NOT data-driven — adding a new product requires manual edits here:

- **`badgeStyleProducts`** (line ~914): whitelist of `product.code` values whose `features` array is rendered as badge chips instead of descriptive text. Currently `['AF718', 'W20', 'LM-MINI']`. If a new product's `features` are short badge-style labels (≤30 chars), add its code here.
- **`appImageMap`** (line ~895): maps `application` strings to image paths so the core-applications carousel shows real photos instead of `AppstoreOutlined` icons. Add an entry per unique application name; missing entries fall back to the icon.

## v-motion + Screenshot Workaround

`@vueuse/motion` uses `IntersectionObserver`. Full-page Playwright screenshots do **not** trigger scroll-into-view, so sections stay at `opacity: 0` and the screenshot shows empty space.

The `scripts/screenshot-full.mjs` pattern injects CSS before capture:
```js
await page.addStyleTag({ content: `
  [class*="v-motion"], [data-v-motion] { opacity: 1 !important; transform: none !important; }
  .learn-more-section, .applications-section, .specs-section, .faq-section,
  .product-info-section, .cta-section { opacity: 1 !important; transform: none !important; }
`})
```
and scrolls through the page once to let images load. Reuse this pattern for any new screenshot tooling.

## Content Population Pattern

When updating product content from external sources (AllyNav for industrial, Skyrover for consumer drones):

**AllyNav (industrial)** — see [AllyNav Image Download](#allynav-image-download) below.

**Skyrover (consumer drone)** — Shopify CDN at `https://www.skyroverdrone.com/cdn/shop/files/<file>.<ext>?v=<version>&width=<w>`. Typical learn-more images use `?width=2560`, gallery `?width=1000`. Download with `curl -L -o <name>.<ext> '<url>'`.

For any new product entry:
1. Download main image (hero / og:image) → `public/images/<id>/hero.jpg`
2. Download learn-more card images → `public/images/<id>/<semantic-name>.jpg`
3. Extract specs, FAQs, feature badges, learn-more card data from source page HTML
4. Update `src/data/products.ts` with new `gallery`, `image`, `learnMoreCards`, `specsGroups`, `faqs`, `tagline`, `whyReasons` fields
5. **If the source product has its own branding visible on images** (e.g. "SKYROVER" text overlays on the drone body or labels), redact it — see [Image Redaction](#image-redaction) below
6. Verify with Playwright: `node scripts/screenshot-full.mjs` taking screenshots at 1440×900 (desktop) and 390×844 (mobile)

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

## Image Redaction

When source images contain third-party branding (e.g. model-name labels printed on the product), use Python with PIL to paint over the region with a gradient-matching background. `scripts/redact-skyrover.py` is the reference:

```python
from PIL import Image, ImageDraw, ImageFont
img = Image.open(path).convert('RGB')
w, h = img.size
# Sample background above and below the text band, then paint the band
for x in range(0, w, 8):
    for y in range(band_top, band_bot):
        # sample row above, blend toward row below by y-progress
        ratio = (y - band_top) / (band_bot - band_top)
        bg = lerp(top_color[x], bot_color[x], ratio)
        img.putpixel((x, y), bg)
# Optionally draw replacement text in white
draw = ImageDraw.Draw(img)
draw.text((cx, cy), 'Lumenfly Mini', fill=(255, 255, 255), font=font, anchor='mm')
img.save(path)
```

Always verify with `scripts/verify-image.py` (white-pixel row scan) — redaction bands must cover the actual text row range, NOT a guess at the bottom edge.

## AllyNav Image Download

Image URLs in AllyNav product pages use the upload month subdirectory:
- `https://www.allynav.com/wp-content/uploads/2025/04/` — W20, AF305, ISOBUS, VS100, EGS101
- `https://www.allynav.com/wp-content/uploads/2025/10/` — AF718
- `https://www.allynav.com/wp-content/uploads/2025/11/` — Aries300N
- `https://www.allynav.com/wp-content/uploads/2026/01/` — some EGS101

Always check the actual `data-lazy-src` in the page HTML — never assume the month.

## Dev Server Port Notes

Ports 3000 and 3001 are often occupied by other long-running processes on this machine (e.g. `~/Desktop/partdro_final` runs on 3000). If the dev server prints:

```
Port 3000 is in use, trying another one...
Port 3001 is in use, trying another one...
➜  Local:   http://localhost:3002/
```

then **use port 3002 for testing** — port 3000 is a different project and may serve stale content.

## Git Push

HTTPS to GitHub is blocked by firewall. Use SSH:
```bash
git remote set-url origin git@github.com:Randyren2024/partdro_vue.git
git push -u origin master
```