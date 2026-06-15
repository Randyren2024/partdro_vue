// Extract AllyNav product page content into structured data
import { readFileSync, writeFileSync } from 'fs';

const PRODUCTS = {
  af305: { url: 'https://www.allynav.com/precision-agriculture-solutions/auto-steer-systems-for-tractors/af305/' },
  isobus: { url: 'https://www.allynav.com/precision-agriculture-solutions/auto-steer-systems-for-tractors/isobus-terminal/' },
  vs100:  { url: 'https://www.allynav.com/precision-agriculture-solutions/precision-spraying-systems/vs100/' },
  w20:    { url: 'https://www.allynav.com/precision-agriculture-solutions/gps-land-leveling-system/w20/' },
  aries300n: { url: 'https://www.allynav.com/precision-agriculture-solutions/agricultural-robots/spraying-robots/aries300n/' },
  taurus80e: { url: 'https://www.allynav.com/precision-agriculture-solutions/agricultural-robots/taurus80e/' },
  egs101: { url: 'https://www.allynav.com/precision-construction/grade-control-system/egs101/' },
};

function extractFromHTML(html, id) {
  // Find product content area (after breadcrumb, before footer)
  const h1Idx = html.indexOf('<h1 class="elementor-heading-title');
  if (h1Idx < 0) return { error: 'No h1 title found' };
  const section = html.substring(h1Idx);

  const result = {};

  // Title
  const titleMatch = section.match(/<h1[^>]*>([^<]+)<\/h1>/);
  result.title = titleMatch ? titleMatch[1] : '';

  // Tagline (text-editor after title)
  const taglineMatch = section.match(/elementor-widget-text-editor[\s\S]{0,500}?<p>([\s\S]{0,500}?)<\/p>/);
  result.tagline = taglineMatch ? taglineMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Why Choose description
  const whySection = section.match(/Why You.*?Choose[\s\S]{0,3000}?allynav__page__text__editor[\s\S]{0,500}?<p>([\s\S]{0,800}?)<\/p>/);
  result.whyChoose = whySection ? whySection[1].replace(/<[^>]+>/g, '').trim() : '';

  // Features (badge labels)
  const features = [];
  const featSection = section.match(/Features[\s\S]{0,10000}?(?=<\/details>)/);
  if (featSection) {
    const badgeRegex = /elementor-heading-title[^>]*>([A-Z][A-Z\s&;]+[A-Z])<\/div>/g;
    let bm;
    while ((bm = badgeRegex.exec(featSection[0])) !== null) {
      const label = bm[1].replace(/&amp;/g, '&').trim();
      if (label.length > 3 && !label.includes('Features')) features.push(label);
    }
  }
  result.features = [...new Set(features)];

  // Learn More cards
  const learnCards = [];
  const learnSection = section.match(/Learn More[\s\S]{0,60000}?(?=Core App|Specification)/);
  if (learnSection) {
    const cardMatches = learnSection[0].split(/ae-acf-repeater-item/).slice(1);
    cardMatches.forEach(card => {
      const tMatch = card.match(/<h3[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([^<]+)<\/h3>/);
      const dMatch = card.match(/elementor-widget-text-editor[\s\S]{0,500}?<p>([\s\S]{0,500}?)<\/p>/);
      const iMatch = card.match(/data-lazy-src="([^"]+\.(png|jpg|webp)[^"]*)"/);
      if (tMatch) {
        learnCards.push({
          title: tMatch[1],
          description: dMatch ? dMatch[1].replace(/<[^>]+>/g, '').trim() : '',
          image: iMatch ? iMatch[1] : ''
        });
      }
    });
  }
  result.learnCards = learnCards;

  // Core Applications
  const apps = [];
  const appsSection = section.match(/Core App[\s\S]{0,8000}?(?=Specification)/);
  if (appsSection) {
    const appRegex = /<h3[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([^<]+)<\/h3>/g;
    let am;
    while ((am = appRegex.exec(appsSection[0])) !== null) {
      if (am[1] !== 'Core Applications') apps.push(am[1]);
    }
  }
  result.applications = apps;

  // Specifications
  const specGroups = [];
  const specSection = section.match(/Specification[\s\S]{0,30000}?(?=FAQs|$)/);
  if (specSection) {
    // Tab titles
    const tabTitles = [];
    const tabRegex = /elementskit-tab-title[^>]*>([^<]+)<\/span>/g;
    let sm;
    while ((sm = tabRegex.exec(specSection[0])) !== null) {
      tabTitles.push(sm[1]);
    }

    // Table data
    const tables = specSection[0].split(/eael-data-table-wrap/).slice(1);
    tables.forEach((t, i) => {
      const cells = [];
      const cellRegex = /<div class="td-content">([\s\S]{0,300}?)<\/div>/g;
      let cm;
      while ((cm = cellRegex.exec(t)) !== null) {
        cells.push(cm[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim());
      }
      const specs = {};
      for (let j = 0; j < cells.length; j += 2) {
        if (cells[j] && cells[j+1]) specs[cells[j]] = cells[j+1];
      }
      specGroups.push({
        title: tabTitles[i] || `Group ${i+1}`,
        specs
      });
    });
  }
  result.specGroups = specGroups;

  // FAQs
  const faqs = [];
  const faqSection = section.match(/FAQs[\s\S]{0,20000}?(?=Related|<\/html>|$)/);
  if (faqSection) {
    const items = faqSection[0].split(/e-n-accordion-item/).slice(1);
    items.forEach(item => {
      const qMatch = item.match(/e-n-accordion-item-title-text[^>]*>([^<]+)<\//);
      const aMatch = item.match(/<p>([\s\S]{0,500}?)<\/p>/);
      if (qMatch && qMatch[1].trim()) {
        faqs.push({
          question: qMatch[1].trim(),
          answer: aMatch ? aMatch[1].replace(/<[^>]+>/g, '').trim() : ''
        });
      }
    });
  }
  result.faqs = faqs;

  return result;
}

// Download and extract each product
for (const [id, info] of Object.entries(PRODUCTS)) {
  console.log(`\n=== ${id.toUpperCase()} ===`);
  try {
    const response = await fetch(info.url);
    const html = await response.text();
    const data = extractFromHTML(html, id);
    console.log('Title:', data.title);
    console.log('Tagline:', data.tagline.substring(0, 100));
    console.log('Why Choose:', data.whyChoose.substring(0, 100));
    console.log('Features:', data.features.join(', '));
    console.log('Learn Cards:', data.learnCards.length);
    data.learnCards.forEach((c, i) => console.log(`  ${i+1}. ${c.title}`));
    console.log('Applications:', data.applications.join(', '));
    console.log('Spec Groups:', data.specGroups.length);
    data.specGroups.forEach(g => console.log(`  - ${g.title}: ${Object.keys(g.specs).length} rows`));
    console.log('FAQs:', data.faqs.length);
    data.faqs.forEach(f => console.log(`  Q: ${f.question}`));

    writeFileSync(`extracted_${id}.json`, JSON.stringify(data, null, 2));
    console.log(`Saved to extracted_${id}.json`);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
}
