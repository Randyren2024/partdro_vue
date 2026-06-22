import { chromium } from 'playwright'

const URL = process.env.URL || 'http://localhost:3002/product/lumenfly-mini'

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`)
  })
  page.on('requestfailed', (req) => errors.push(`[reqfail] ${req.url()} ${req.failure()?.errorText}`))

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 })

  // Inspect what sections actually exist in the DOM
  const sectionInfo = await page.evaluate(() => {
    const results = {}
    const sections = [
      'product-hero', 'learn-more-section', 'applications-section',
      'specs-section', 'faq-section', 'related-section', 'cta-section',
      'sticky-cta-bar'
    ]
    for (const sel of sections) {
      const el = document.querySelector(`.${sel}`)
      if (!el) {
        results[sel] = 'NOT FOUND'
        continue
      }
      const rect = el.getBoundingClientRect()
      const styles = window.getComputedStyle(el)
      results[sel] = {
        height: Math.round(rect.height),
        opacity: styles.opacity,
        visibility: styles.visibility,
        display: styles.display,
        offsetTop: Math.round(el.offsetTop)
      }
    }
    return results
  })
  console.log('Section info:')
  console.log(JSON.stringify(sectionInfo, null, 2))

  // Scroll slowly through the page to trigger motion animations
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  console.log('Document height:', docHeight)
  for (let y = 0; y < docHeight; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(150)
  }
  await page.waitForTimeout(1500)

  // Take full page screenshot after scroll
  await page.screenshot({ path: 'screenshots/lumenfly-mini-after-scroll-full.png', fullPage: true })

  // Also count learn-more cards
  const cardCount = await page.locator('.learn-more-card').count()
  const faqCount = await page.locator('.faq-collapse .ant-collapse-item').count()
  const specRowCount = await page.locator('.specs-table tbody tr').count()
  console.log('learn-more-card count:', cardCount)
  console.log('faq item count:', faqCount)
  console.log('spec row count:', specRowCount)

  if (errors.length) {
    console.log('\nERRORS / FAILED REQUESTS:')
    errors.forEach((e) => console.log('  ' + e))
  } else {
    console.log('\nNo errors or failed requests.')
  }

  await ctx.close()
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})