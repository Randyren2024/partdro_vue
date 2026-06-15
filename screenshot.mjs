import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000/product/af718', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const layout = await page.evaluate(() => {
  const cards = document.querySelectorAll('.learn-more-card');
  const cardsContainer = document.querySelector('.learn-more-cards');

  const cardMetrics = [];
  cards.forEach((card, idx) => {
    const style = window.getComputedStyle(card);
    const rect = card.getBoundingClientRect();
    cardMetrics.push({
      idx,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      height: Math.round(rect.height),
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      transform: style.transform,
    });
  });

  const containerStyle = cardsContainer ? window.getComputedStyle(cardsContainer) : null;

  // Check what's between card 0 and card 1
  const firstCardBottom = cards[0]?.getBoundingClientRect().bottom || 0;
  const secondCardTop = cards[1]?.getBoundingClientRect().top || 0;

  // Find all elements between these two
  const allBetween = [];
  const containerRect = cardsContainer?.getBoundingClientRect();

  // Check for v-motion wrapper elements
  const motionWrappers = document.querySelectorAll('[style*="transform"]');
  const motionInCards = [];
  motionWrappers.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top >= firstCardBottom - 10 && r.top <= secondCardTop + 10) {
      motionInCards.push({
        tag: el.tagName,
        cls: el.className?.substring?.(0, 50) || '',
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        style: el.getAttribute('style')?.substring(0, 100),
      });
    }
  });

  // Check parent chain of card 0
  const card0ParentChain = [];
  let el = cards[0]?.parentElement;
  while (el && el !== document.body) {
    const r = el.getBoundingClientRect();
    const s = window.getComputedStyle(el);
    card0ParentChain.push({
      tag: el.tagName,
      cls: el.className?.substring?.(0, 50) || '',
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      height: Math.round(r.height),
      gap: s.gap || s.rowGap,
      flexDirection: s.flexDirection,
    });
    el = el.parentElement;
  }

  // Check for the acccordion section specifically
  const accordionPanels = document.querySelectorAll('.product-accordion .ant-collapse-item');
  const panelMetrics = [];
  accordionPanels.forEach((panel, idx) => {
    const r = panel.getBoundingClientRect();
    panelMetrics.push({
      idx,
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      height: Math.round(r.height),
    });
  });

  return {
    cardMetrics,
    containerGap: containerStyle?.gap,
    gap: secondCardTop - firstCardBottom,
    motionWrappers: motionInCards,
    card0Chain: card0ParentChain,
    accordionPanels: panelMetrics,
  };
});

console.log(JSON.stringify(layout, null, 2));

await browser.close();
