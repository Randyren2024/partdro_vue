import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000/product/af718', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const accordionDebug = await page.evaluate(() => {
  const result = { product: [], faq: [] };

  // Product accordion
  const productAccordion = document.querySelector('.product-accordion');
  if (productAccordion) {
    const items = productAccordion.querySelectorAll('.ant-collapse-item');
    items.forEach((item, idx) => {
      const computed = window.getComputedStyle(item);
      const header = item.querySelector('.ant-collapse-header');
      const headerComputed = header ? window.getComputedStyle(header) : null;
      const content = item.querySelector('.ant-collapse-content');
      const contentComputed = content ? window.getComputedStyle(content) : null;

      result.product.push({
        idx,
        border: computed.border,
        borderTop: computed.borderTop,
        borderBottom: computed.borderBottom,
        borderLeft: computed.borderLeft,
        borderRight: computed.borderRight,
        outline: computed.outline,
        header: headerComputed ? {
          border: headerComputed.border,
          borderBottom: headerComputed.borderBottom,
        } : null,
        content: contentComputed ? {
          border: contentComputed.border,
          borderTop: contentComputed.borderTop,
        } : null,
        parentClasses: item.parentElement?.className,
        parentParentClasses: item.parentElement?.parentElement?.className,
      });
    });

    // Also check the collapse wrapper
    const wrapper = productAccordion.closest('.ant-collapse');
    if (wrapper) {
      const wComputed = window.getComputedStyle(wrapper);
      result.product.push({
        idx: 'wrapper',
        tag: wrapper.tagName,
        cls: wrapper.className,
        border: wComputed.border,
      });
    }
  }

  // FAQ accordion
  const faqAccordion = document.querySelector('.faq-collapse');
  if (faqAccordion) {
    const items = faqAccordion.querySelectorAll('.ant-collapse-item');
    items.forEach((item, idx) => {
      const computed = window.getComputedStyle(item);
      result.faq.push({
        idx,
        border: computed.border,
        borderTop: computed.borderTop,
        borderBottom: computed.borderBottom,
      });
    });
  }

  return result;
});

console.log(JSON.stringify(accordionDebug, null, 2));

await browser.close();
