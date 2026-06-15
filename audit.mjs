import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000/product/af718', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

// Full page screenshot
await page.screenshot({ path: 'review-full.png', fullPage: true });

// Collect comprehensive metrics
const metrics = await page.evaluate(() => {
  const result = {};

  // Check all heading levels
  ['h1', 'h2', 'h3'].forEach(tag => {
    const els = document.querySelectorAll(tag);
    result[tag] = [];
    els.forEach(el => {
      const s = window.getComputedStyle(el);
      result[tag].push({
        text: el.textContent?.substring(0, 40),
        fontSize: s.fontSize,
        color: s.color,
        fontWeight: s.fontWeight,
      });
    });
  });

  // Check accordion borders
  const accordionItems = document.querySelectorAll('.product-accordion .ant-collapse-item');
  result.accordionBorders = [];
  accordionItems.forEach((item, idx) => {
    const s = window.getComputedStyle(item);
    result.accordionBorders.push({
      idx,
      border: s.border,
      borderTop: s.borderTop,
      borderBottom: s.borderBottom,
    });
  });

  // Overall visual balance
  const heroCard = document.querySelector('.product-hero-container');
  const learnMoreSection = document.querySelector('.learn-more-section');

  if (heroCard && learnMoreSection) {
    const hRect = heroCard.getBoundingClientRect();
    const lRect = learnMoreSection.getBoundingClientRect();
    result.sectionGap = {
      heroBottom: Math.round(hRect.bottom),
      learnMoreTop: Math.round(lRect.top),
      gap: Math.round(lRect.top - hRect.bottom),
    };
  }

  return result;
});

console.log(JSON.stringify(metrics, null, 2));
console.log('Screenshot saved: review-full.png');

await browser.close();
