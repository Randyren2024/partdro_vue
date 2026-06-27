# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Vite dev server (default port 3000; falls back to 3001/3002 if taken)
npm run build        # Production build → dist/  (also the type-check; vue-tsc --noEmit is broken on this Node)
npm run preview      # Preview production build
npm run netlify:dev  # Netlify dev: Vite + Functions on port 8888 (use this for e2e checkout flow)
npm run test:functions # Smoke-test Netlify Functions (requires netlify:dev running)
npm run optimize-images  # sharp-based batch image resize
```

No test suite, linter, or working `vue-tsc --noEmit` — verify correctness via `npm run build`. The dev port may be 3000/3001/3002; **always read the actual port from the Vite output** — the README's "3000" is stale. Port 3000 is also occupied on this machine by `~/Desktop/partdro_final` (different project), so screenshot/preview URLs must use whatever port this project bound to.

## End-to-End Landing-Page Workflow

For new product pages from external sources (URL / images / PDF / text), follow the 8-phase loop in `AGENTS.md` (Acquire → Map → Assets → Code → Build → Screenshot → Audit → Fix). The loop matters: do not declare done after one screenshot pass. The user expects "循序渐进式的改进" — incremental, not big-bang.

## Architecture

**Stack:** Vue 3 + Vite + TypeScript + Ant Design Vue 4 + Vue Router + `@vueuse/motion` + **Pinia** (cart) + **Supabase** (DB) + **Netlify Functions** (serverless)

**Routing (SPA):** `createWebHistory()` — all routes fall through to `/index.html` (Netlify `_redirects` handles this in production). Routes: `/`, `/products-solutions`, `/product/:id`, `/solutions`, `/about_us`, `/contact_us`, `/support`, `/privacy-policy`, `/terms-conditions`, `/cart`, `/checkout`, `/order-confirmation`, `/orders/lookup`.

### Source layout
- `src/data/products.ts` — single source of truth (Product interface, products[], categories[], helpers)
- `src/views/` — page components (ProductDetailView is the most complex; Cart/Checkout/OrderConfirmation/OrderLookup are the commerce flow)
- `src/components/` — Header, Footer, ProductCard, SolutionCard, WorldMap, CartDrawer, icons/
- `src/composables/` — `useCurrency`, `useStock`, `useStripe` (Stripe wrapper, not wired to UI in mock-payment flow)
- `src/stores/` — `cart.ts` (Pinia, persisted to localStorage)
- `src/lib/` — `supabase.ts` (browser client, anon key)
- `src/types/` — shared TS types (cart.ts)
- `netlify/functions/` — `create-order`, `create-payment-intent`, `stripe-webhook`, `get-order`
- `netlify/lib/` — server-side Supabase client (service_role key)
- `supabase/migrations/` — `001_initial_schema.sql` (orders, order_items, RLS, order-number trigger)

### Product data model (`src/data/products.ts`)
- `products[]` — **3 consumer drones:** `lumenfly-mini` (LM-MINI), `mini-x` (LM-MX), `mini-se` (LM-MSE). **5 agricultural drones:** `fp500` (PD-FP500), `fp600` (PD-FP600), `fp700` (PD-FP700), `a80` (PD-A80), `fp300e` (PD-FP300E). Legacy industrial entries (`af718`, `af305`, `isobus`, `vs100`, `w20`, `aries300n`, `taurus80e`, `egs101`) remain in the data file as the source of the price-validation list in `create-order.ts` but are not linked from the UI.
- **Product code prefixes:** `LM-` = Lumenfly consumer brand; `PD-` = Partdro agricultural/enterprise brand. Both brands coexist under the Partdro storefront.
- `categories[]` — 5 entries: `consumer-drones`, `enterprise-drones`, `agriculture-drones`, `drone-accessories`, `payloads-sensors`.
- `Product` interface — content fields (gallery, learnMoreCards, specsGroups, faqs, applications, whyReasons, tagline) **and** commerce fields (price in cents, compareAtPrice, sku, stockCount, variants[], weightGrams, dimensionsCm, shipping). New fields: `videos?: { src, poster?, title?, caption? }[]` for the optional video section.
- Helpers: `getProductsByCategory()`, `getProductById()`, `getBestSellers()`, `getNewProducts()`.

### Server-side price validation
`netlify/functions/create-order.ts` re-reads `products.ts`, re-computes subtotal from the client-submitted cart, and rejects any subtotal mismatch (>1¢ tolerance). Client prices are NOT trusted. The `validatedItems` mapping in that file is the canonical "is this product still sellable?" check — when pruning or un-pruning a product, update both `products[]` (UI) and `create-order.ts` (server) consistently.

### `ProductDetailView.vue` — sections
hero (image + info + accordion), variant selector, quantity selector, learn-more cards, **optional video section** (renders only if `product.videos?.length`), core applications carousel, specs tabs, FAQs accordion, related products, "You May Also Like" rail, CTA, footer. Handles fallback images via the `images.fallback` map. Add-to-Cart calls `cartStore.addItem()` then `cartStore.openDrawer()`.

### E-commerce flow (mock payment)
Stripe / PayPal can't be used from mainland China, so checkout calls `create-order` directly with `status: 'paid'`. The Stripe Function and webhook exist but are not wired to the UI. If real payment is later added, wire `useStripe.ts` into `CheckoutView` and use `stripe-webhook.ts` to mark orders paid.

### Cart
`src/stores/cart.ts` — Pinia store persisted via `pinia-plugin-persistedstate` under key `partdro-cart`. Persists only `items` (drawer open state is transient). Actions: `addItem`, `removeItem`, `updateQuantity`, `clear`, `openDrawer`, `closeDrawer`. Auto-opens drawer after Add to Cart.

### Free shipping
`$500` subtotal → free, otherwise `$25`. Logic duplicated in `useStock.ts` (client estimate) and `netlify/functions/create-order.ts` (server-side rule) — keep them in sync.

## Hardcoded Couplings in `ProductDetailView.vue`

Adding a new product requires manual edits in two places that are NOT data-driven:

- **`badgeStyleProducts`** (~line 1132): whitelist of `product.code` values whose `features` array renders as badge chips instead of descriptive text. Currently `['AF718', 'W20', 'LM-MINI', 'LM-MX', 'LM-MSE', 'PD-FP500', 'PD-FP600', 'PD-FP700', 'PD-A80', 'PD-FP300E']`. All agricultural drones use badge-style features (short specs like "40L SPRAY TANK"). Add a new product's code here if its features are short badge-style labels (≤30 chars).
- **`appImageMap`** (~line 1095): maps `application` strings → image paths so the core-applications carousel shows real photos instead of `AppstoreOutlined` icons. Add one entry per unique `applications[]` string; missing entries fall back to the icon. Agricultural drones share the same 6 application strings (`Field Crop Spraying`, `Orchard Spraying`, etc.).

## Critical CSS Gotchas

- **Ant Design carousel (`<a-carousel>`) + CSS Grid:** Slick carousel sets inline `width` on `.slick-track` via JavaScript. Grid items MUST have `min-width: 0` and `overflow: clip` to prevent the column expanding to fit slick's calculated width.
- **Grid `align-items: start`:** Prevents image and info columns from being forced to equal height.
- **Product images:** Use `object-fit: contain` (not `cover`) to preserve full product image without cropping. Square (1024×1024) source images are typical.

## Image Strategy

All images live in `public/images/` — served statically, not processed by Vite. Product subdirectories: `lumenfly-mini/`, `mini-x/`, `mini-se/`, `fp500/`, `fp600/`, `fp700/`, `a80/`, `fp300e/` (active), plus `af718/`, `af305/`, `isobus/`, `vs100/`, `w20_cards/`, `aries300n/`, `egs101/` (legacy). Videos in `public/videos/<product-id>/`. The `@vueuse/motion` plugin provides scroll-triggered animations (`v-motion-slide-visible-left`, `v-motion-fade-visible`, etc.).

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

Fallback URLs must be **different** from the primary URL. If both point to the same missing file, the error handler fires → sets the same URL → fails again → infinite loop → page flickers.

## Image Modification Ordering Rule (CRITICAL)

**All image localization, redaction, and regeneration happens in Phase 8 (Fix & Localize), NOT Phase 3 (Asset Pipeline).**

Phase 3 is download-only. Build the page with original source images first (Chinese text, third-party branding, and all). Once the layout is locked via screenshot audit (Phase 7), execute the pending image-mod list in Phase 8b. This prevents wasted regeneration when layout/content still needs changes and isolates image-generation failures from blocking the build pipeline. Enforced by memory entry `feedback_image_modification_last.md`.

## Image Localization Rule (English-locale product pages)

This project ships English-locale product pages. Whenever source product images contain non-Latin text (Chinese, etc.), that text must be regenerated as English before going live. The product name (e.g. "MINI X" / "LUMENFLY") printed on the drone body is fine — only ancillary text (headers, subtitles, captions overlaid on infographics) needs replacement.

**Workflow for image localization:**
1. Identify images with non-Latin text by viewing each with the Read tool
2. Use the **nano-banana** skill (`python C:/Users/81102/.claude/skills/nano-banana/scripts/generate.py "<prompt>" -i <in.png> -o <out.png>`) to regenerate the image with English text replacement
3. **If nano-banana is unavailable**, fall back to the **bailian-image-video** skill (Alibaba qwen-image)
4. After every regeneration, **Read the output image again** to verify: text spelling, font/style match, specs preserved (e.g. "9KM", "32min", "F/2.6"), no hallucinated or missing elements
5. **Only after per-image verification** should you re-run page screenshots

Don't trust "Saved: <path>" alone — view the result.

## v-motion + Screenshot Workaround

`@vueuse/motion` uses `IntersectionObserver`. Full-page Playwright screenshots do **not** trigger scroll-into-view, so sections stay at `opacity: 0` and the screenshot shows empty space. The `scripts/screenshot-full.mjs` pattern handles this:

```js
await page.addStyleTag({ content: `
  [class*="v-motion"], [data-v-motion] { opacity: 1 !important; transform: none !important; }
  .learn-more-section, .applications-section, .specs-section, .faq-section,
  .video-section, .product-info-section, .cta-section { opacity: 1 !important; transform: none !important; }
`})
```

…then scrolls through the page once to let images load. The script supports `URL` and `OUT_PREFIX` env vars and uses `domcontentloaded` (not `networkidle`) so `<video preload="metadata">` doesn't stall the page-load wait. Reuse this pattern for any new screenshot tooling.

## Content Population — External Sources

- **AllyNav (industrial):** `https://www.allynav.com/wp-content/uploads/<YYYY>/<MM>/`. Months observed: 2025/04 (W20, AF305, ISOBUS, VS100, EGS101), 2025/10 (AF718), 2025/11 (Aries300N), 2026/01 (some EGS101). Always verify by reading `data-lazy-src` in the page HTML — never assume the month.
- **Skyrover (consumer drone):** Shopify CDN at `https://www.skyroverdrone.com/cdn/shop/files/<file>.<ext>?v=<version>&width=<w>`. Learn-more images use `?width=2560`, gallery `?width=1000`.
- **TopXGun (agricultural drones — used for `fp500`, `fp600`, `fp700`, `a80`, `fp300e`):** `https://www.topxgunag.com/storage/uploads/images/<YYYY>/<MM>/<hash>.<ext>`. Source pages at `https://www.topxgunag.com/<slug>`. Product pages are English; images are predominantly product/component/action shots with minimal text overlay. The FP500 had Chinese UI text on its remote-controller and field-planning-software screenshots — those were regenerated in Phase 8 (not Phase 3).

For any new product entry:
1. Download main image (hero) → `public/images/<id>/hero.jpg`
2. Download learn-more card images → `public/images/<id>/<semantic-name>.<ext>`
3. Extract specs, FAQs, feature badges, learn-more card data from source
4. Update `src/data/products.ts` with new content fields
5. If source images have non-Latin text overlay, regenerate per the Image Localization Rule above
6. **If source images have third-party branding visible on the product** (e.g. "SKYROVER", "WALKERA" text printed on the drone body or labels), redact with PIL — see `scripts/redact-skyrover.py` for the gradient-mask reference
7. Verify with Playwright: `node scripts/screenshot-full.mjs` (desktop 1440×900 + mobile 390×844)

## Backend (Netlify Functions + Supabase)

**Functions** (`netlify/functions/`):
- `create-order.ts` — POST. Validates cart, recomputes prices from `products.ts`, inserts `orders` + `order_items`, decrements stock. Status set to `paid` directly (mock payment). Returns `{ order: { id, orderNumber, email, status, totalCents, createdAt } }` with **camelCase** keys.
- `create-payment-intent.ts` — Stripe PaymentIntent. NOT called by current UI.
- `stripe-webhook.ts` — Stripe webhook handler. NOT registered.
- `get-order.ts` — GET `?email=...&orderNumber=...`. Both required (400 otherwise). Returns order with `items[]` joined from `order_items`.

**Supabase:**
- Schema: `supabase/migrations/001_initial_schema.sql` — `orders`, `order_items`, indexes, RLS (anon can insert + select; service_role can update for webhooks)
- Order numbers auto-generated by Postgres trigger: `PD-YYYYMMDD-XXXX` (e.g. `PD-20260623-A3F9`). Trigger `set_order_number` BEFORE INSERT
- Two clients: `src/lib/supabase.ts` (browser, anon key) and `netlify/lib/supabase.ts` (server, service_role key)
- Keys in `.env` (NOT committed — see `.gitignore`). Template at `.env.example`. Setup guide at `SUPABASE_SETUP.md`
- Verify a row with curl using anon key:
  ```bash
  curl "$VITE_SUPABASE_URL/rest/v1/orders?select=*&order=created_at.desc&limit=3" \
    -H "apikey: $VITE_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"
  ```

**Function response shape (camelCase, NOT snake_case):** The functions transform DB rows before returning. `create-order` returns `orderNumber` not `order_number`. `OrderConfirmationView` and `OrderLookupView` depend on this — do not regress to snake_case.

## Git Push

HTTPS to GitHub is blocked by firewall on this machine. Use SSH:
```bash
git remote set-url origin git@github.com:Randyren2024/partdro_vue.git
git push -u origin master
```

## Reference: scripts/

| Script | Purpose |
| --- | --- |
| `scripts/screenshot-full.mjs` | Desktop + mobile Playwright capture with motion-opacity workaround (env: `URL`, `OUT_PREFIX`) |
| `scripts/screenshot-lumenfly-mini.mjs` | One-off single-product capture (debug) |
| `scripts/debug-lumenfly-mini.mjs` | DOM dump — section heights, opacities, counts |
| `scripts/redact-skyrover.py` | PIL gradient-mask + text replacement for source-image branding |
| `scripts/verify-image.py` | White-pixel row scan to confirm redaction actually removed the text |
| `scripts/optimize-images.js` | `npm run optimize-images` — sharp-based batch resize |
| `scripts/scrape-allynav-images.js` | AllyNav-specific image scraper (industrial products) |
| `scripts/convert-logos.js` | Logo variant generation |
| `scripts/generate-favicons.js` / `generate-mstiles.js` | Favicon + MSTILE generation |

The end-to-end product-page workflow (Acquire → Map → Assets → Code → Build → Screenshot → Audit → Fix) is documented in `AGENTS.md` and executable via the `/product-page-from-source` skill. Read both files at the start of any product-page task.
