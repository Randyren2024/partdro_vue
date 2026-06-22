const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const PAGES = [
  { name: '01-home', path: '/' },
  { name: '02-products-solutions', path: '/products-solutions' },
  { name: '03-solutions', path: '/solutions' },
  { name: '04-about', path: '/about_us' },
  { name: '05-contact', path: '/contact_us' },
  { name: '06-support', path: '/support' },
  { name: '07-privacy-policy', path: '/privacy-policy' },
  { name: '08-terms-conditions', path: '/terms-conditions' }
]

const BASE_URL = 'http://localhost:3001'
const OUT_DIR = path.join(__dirname, 'screenshots')

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })
  const page = await context.newPage()

  for (const { name, path: route } of PAGES) {
    const url = `${BASE_URL}${route}`
    console.log(`Capturing ${name} -> ${url}`)
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(1500)
      // Scroll the page to trigger any v-motion / scroll-based animations
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0
          const distance = 200
          const timer = setInterval(() => {
            window.scrollBy(0, distance)
            totalHeight += distance
            if (totalHeight >= document.body.scrollHeight) {
              clearInterval(timer)
              window.scrollTo(0, 0)
              setTimeout(resolve, 800)
            }
          }, 50)
        })
      })
      await page.waitForTimeout(800)
      const outPath = path.join(OUT_DIR, `${name}.png`)
      await page.screenshot({ path: outPath, fullPage: true })
      console.log(`  Saved: ${outPath}`)
    } catch (e) {
      console.error(`  Failed: ${e.message}`)
    }
  }

  await browser.close()
  console.log('\nDone. Screenshots in:', OUT_DIR)
}

main().catch(err => { console.error(err); process.exit(1) })
