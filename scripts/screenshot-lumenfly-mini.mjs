import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:3002/product/lumenfly-mini'
const OUT_DIR = process.env.OUT_DIR || './screenshots'

import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'mobile-390x844', width: 390, height: 844 }
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    page.on('pageerror', (err) => console.error(`[pageerror][${vp.name}]`, err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error(`[console.error][${vp.name}]`, msg.text())
    })
    page.on('requestfailed', (req) => console.error(`[reqfail][${vp.name}]`, req.url(), req.failure()?.errorText))

    console.log(`[${vp.name}] navigating to ${URL}`)
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 })
    // Give motion animations a moment to settle
    await page.waitForTimeout(800)

    const fullPath = path.join(OUT_DIR, `lumenfly-mini-${vp.name}-full.png`)
    await page.screenshot({ path: fullPath, fullPage: true })
    console.log(`[${vp.name}] saved full-page → ${fullPath}`)

    const heroPath = path.join(OUT_DIR, `lumenfly-mini-${vp.name}-hero.png`)
    await page.screenshot({ path: heroPath, fullPage: false })
    console.log(`[${vp.name}] saved hero viewport → ${heroPath}`)

    await ctx.close()
  }
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})