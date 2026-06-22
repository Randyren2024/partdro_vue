import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:3002/product/lumenfly-mini'
const OUT_DIR = './screenshots'

import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'mobile-390x844', width: 390, height: 844 }
]

const REVEAL_CSS = `
*, *::before, *::after {
  animation-duration: 0.001s !important;
  animation-delay: 0s !important;
  transition-duration: 0.001s !important;
  transition-delay: 0s !important;
}
[style*="opacity"], [style*="transform"] {
  opacity: 1 !important;
  transform: none !important;
}
`

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await ctx.newPage()
    page.on('pageerror', (err) => console.error(`[pageerror][${vp.name}]`, err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error(`[console.error][${vp.name}]`, msg.text())
    })
    page.on('requestfailed', (req) => console.error(`[reqfail][${vp.name}]`, req.url(), req.failure()?.errorText))

    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 })

    // Add style to override motion animations
    await page.addStyleTag({ content: REVEAL_CSS })

    // Scroll smoothly through the page so IntersectionObserver triggers
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const steps = Math.max(8, Math.ceil(docHeight / 300))
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), (docHeight * i) / steps)
      await page.waitForTimeout(80)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)

    // Hero viewport screenshot
    await page.screenshot({
      path: path.join(OUT_DIR, `lumenfly-mini-${vp.name}-hero.png`),
      fullPage: false
    })
    console.log(`[${vp.name}] hero saved`)

    // Full-page screenshot
    await page.screenshot({
      path: path.join(OUT_DIR, `lumenfly-mini-${vp.name}-full.png`),
      fullPage: true
    })
    console.log(`[${vp.name}] full saved`)

    // Section-by-section screenshots for desktop only
    if (vp.name.startsWith('desktop')) {
      const sectionSelectors = [
        { name: 'hero', sel: '.product-hero' },
        { name: 'learn-more', sel: '.learn-more-section' },
        { name: 'applications', sel: '.applications-section' },
        { name: 'specs', sel: '.specs-section' },
        { name: 'faqs', sel: '.faq-section' },
        { name: 'cta', sel: '.cta-section' }
      ]
      for (const { name, sel } of sectionSelectors) {
        const el = await page.$(sel)
        if (!el) continue
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(200)
        await el.screenshot({ path: path.join(OUT_DIR, `lumenfly-mini-${vp.name}-${name}.png`) })
        console.log(`[${vp.name}] ${name} saved`)
      }
    }

    await ctx.close()
  }
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})