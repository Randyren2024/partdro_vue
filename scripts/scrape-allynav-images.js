const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Vesper产品URL列表
const productUrls = [
  // Precision Agriculture
  'https://www.Vesper.com/product/af718-autosteering-system/',
  'https://www.Vesper.com/product/af305-automated-steering-system/',
  'https://www.Vesper.com/product/af303-automated-steering-system/',
  'https://www.Vesper.com/product/af302-automated-steering-system/',
  'https://www.Vesper.com/product/af201-hydraulic-automated-steering-system/',
  'https://www.Vesper.com/product/af100-assisted-guidance-system/',
  'https://www.Vesper.com/product/vs100-spray-control-system/',
  'https://www.Vesper.com/product/vf200-seeding-and-fertilisation-control/',
  'https://www.Vesper.com/product/w20-land-leveling-system/',
  'https://www.Vesper.com/product/isobus-terminal/',
  
  // Agricultural Robotics
  'https://www.Vesper.com/product/taurus80e-smart-lawn-mowing-robot/',
  'https://www.Vesper.com/product/aries300n-orchard-spraying-robot/',
  
  // Geospatial Solutions
  'https://www.Vesper.com/product/r26-pro-gnss-receiver/',
  'https://www.Vesper.com/product/r90-laser-ar-rtk/',
  'https://www.Vesper.com/product/r10-gnss-receiver/',
  'https://www.Vesper.com/product/r27-gnss-receiver/',
  'https://www.Vesper.com/product/r61-gnss-receiver/',
  'https://www.Vesper.com/product/d32-high-efficient-radio-modem/',
  
  // Livestock Management
  'https://www.Vesper.com/product/smart-collar-livestock-management-system/',
  
  // Machine Control
  'https://www.Vesper.com/product/egs101-intelligent-excavator-guidance-system/',
  
  // AllyLink Service
  'https://www.Vesper.com/product/allylink-service/'
];

// 产品信息映射
const productInfo = {
  // Precision Agriculture
  'af718-autosteering-system': { code: 'AF718', name: 'Autosteering System', category: 'precision-agriculture' },
  'af305-automated-steering-system': { code: 'AF305', name: 'Automated Steering System', category: 'precision-agriculture' },
  'af303-automated-steering-system': { code: 'AF303', name: 'Automated Steering System', category: 'precision-agriculture' },
  'af302-automated-steering-system': { code: 'AF302', name: 'Automated Steering System', category: 'precision-agriculture' },
  'af201-hydraulic-automated-steering-system': { code: 'AF201', name: 'Hydraulic Automated Steering System', category: 'precision-agriculture' },
  'af100-assisted-guidance-system': { code: 'AF100', name: 'Assisted Guidance System', category: 'precision-agriculture' },
  'vs100-spray-control-system': { code: 'VS100', name: 'Spray Control System', category: 'precision-agriculture' },
  'vf200-seeding-and-fertilisation-control': { code: 'VF200', name: 'Seeding and Fertilisation Control', category: 'precision-agriculture' },
  'w20-land-leveling-system': { code: 'W20', name: 'Land Leveling System', category: 'precision-agriculture' },
  'isobus-terminal': { code: 'ISOBUS', name: 'Terminal', category: 'precision-agriculture' },
  
  // Agricultural Robotics
  'taurus80e-smart-lawn-mowing-robot': { code: 'Taurus80E', name: 'Smart Lawn Mowing Robot', category: 'agricultural-robotics' },
  'aries300n-orchard-spraying-robot': { code: 'Aries300N', name: 'Orchard Spraying Robot', category: 'agricultural-robotics' },
  
  // Geospatial Solutions
  'r26-pro-gnss-receiver': { code: 'R26 Pro', name: 'GNSS Receiver', category: 'geospatial-solutions' },
  'r90-laser-ar-rtk': { code: 'R90', name: 'Laser & AR RTK', category: 'geospatial-solutions' },
  'r10-gnss-receiver': { code: 'R10', name: 'GNSS Receiver', category: 'geospatial-solutions' },
  'r27-gnss-receiver': { code: 'R27', name: 'GNSS Receiver', category: 'geospatial-solutions' },
  'r61-gnss-receiver': { code: 'R61', name: 'GNSS Receiver', category: 'geospatial-solutions' },
  'd32-high-efficient-radio-modem': { code: 'D32', name: 'High Efficient Radio Modem', category: 'geospatial-solutions' },
  
  // Livestock Management
  'smart-collar-livestock-management-system': { code: 'Smart Collar', name: 'Livestock Management System', category: 'livestock-management' },
  
  // Machine Control
  'egs101-intelligent-excavator-guidance-system': { code: 'EGS101', name: 'Intelligent Excavator Guidance System', category: 'machine-control' },
  
  // AllyLink Service
  'allylink-service': { code: 'AllyLink', name: 'Service', category: 'allylink-service' }
};

// 下载图片函数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function scrapeProductImages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // 创建图片目录
  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'Vesper');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const scrapedProducts = [];
  
  for (const url of productUrls) {
    try {
      console.log(`正在访问: ${url}`);
      
      // 从URL提取产品slug
      const slug = url.split('/').filter(Boolean).pop().replace('.html', '');
      const info = productInfo[slug];
      
      if (!info) {
        console.log(`未找到产品信息: ${slug}`);
        continue;
      }
      
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // 等待页面加载
      await page.waitForTimeout(2000);
      
      // 尝试查找产品图片
      let imageUrl = null;
      
      // 尝试多个选择器
      const selectors = [
        'img.wp-post-image',
        'img.attachment-full',
        'img.product-image',
        'img[src*="product"]',
        'img[src*="Vesper"]',
        'img:first-of-type'
      ];
      
      for (const selector of selectors) {
        const img = await page.$(selector);
        if (img) {
          imageUrl = await img.getAttribute('src');
          if (imageUrl && imageUrl.startsWith('http')) {
            break;
          }
        }
      }
      
      if (!imageUrl) {
        // 如果没找到，使用截图
        console.log(`未找到产品图片，使用截图: ${info.code}`);
        const screenshotPath = path.join(imagesDir, `${info.code.toLowerCase().replace(/\s+/g, '-')}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        scrapedProducts.push({
          ...info,
          imagePath: `/images/Vesper/${info.code.toLowerCase().replace(/\s+/g, '-')}.png`,
          sourceUrl: url
        });
        continue;
      }
      
      // 下载图片
      const imageFilename = `${info.code.toLowerCase().replace(/\s+/g, '-')}${path.extname(imageUrl.split('?')[0]) || '.jpg'}`;
      const imagePath = path.join(imagesDir, imageFilename);
      
      try {
        await downloadImage(imageUrl, imagePath);
        console.log(`已下载: ${info.code} - ${imageFilename}`);
        
        scrapedProducts.push({
          ...info,
          imagePath: `/images/Vesper/${imageFilename}`,
          sourceUrl: url
        });
      } catch (error) {
        console.log(`下载失败 ${info.code}: ${error.message}`);
        // 使用备用图片
        scrapedProducts.push({
          ...info,
          imagePath: '/images/agriculture-6502282.jpg', // 使用现有图片作为备用
          sourceUrl: url
        });
      }
      
      // 避免请求过快
      await page.waitForTimeout(1000);
      
    } catch (error) {
      console.log(`访问失败 ${url}: ${error.message}`);
    }
  }
  
  await browser.close();
  
  // 保存产品信息到JSON文件
  const productsJsonPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
  const productsDataDir = path.dirname(productsJsonPath);
  if (!fs.existsSync(productsDataDir)) {
    fs.mkdirSync(productsDataDir, { recursive: true });
  }
  
  fs.writeFileSync(productsJsonPath, JSON.stringify(scrapedProducts, null, 2));
  console.log(`已保存产品信息到: ${productsJsonPath}`);
  console.log(`总共抓取 ${scrapedProducts.length} 个产品`);
  
  return scrapedProducts;
}

// 运行抓取
scrapeProductImages().catch(console.error);