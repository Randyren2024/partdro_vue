const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// 需要生成的favicon尺寸
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 }, // iOS设备
  { name: 'android-chrome-192x192.png', size: 192 }, // Android Chrome
  { name: 'android-chrome-512x512.png', size: 512 }, // Android Chrome
];

// ICO文件需要的尺寸
const icoSizes = [16, 32, 48];

async function generateFavicons() {
  console.log('🚀 开始生成favicon...');
  
  // 检查SVG文件是否存在
  if (!fs.existsSync(svgPath)) {
    console.error('❌ favicon.svg文件不存在！');
    return;
  }
  
  try {
    // 生成PNG格式的favicon
    console.log('🔄 生成PNG格式favicon...');
    for (const favicon of faviconSizes) {
      const outputPath = path.join(publicDir, favicon.name);
      await sharp(svgPath)
        .resize(favicon.size, favicon.size)
        .png({ quality: 100 })
        .toFile(outputPath);
      console.log(`✅ 生成: ${favicon.name} (${favicon.size}x${favicon.size})`);
    }
    
    // 生成ICO格式（需要多个尺寸）
    console.log('🔄 生成ICO格式favicon...');
    const icoImages = [];
    for (const size of icoSizes) {
      const buffer = await sharp(svgPath)
        .resize(size, size)
        .png()
        .toBuffer();
      icoImages.push({ size, buffer });
    }
    
    // 注意：sharp不支持直接生成ICO，我们生成favicon.ico作为favicon-32x32.png的副本
    // 实际项目中可以使用专门的ICO生成库
    const faviconIcoPath = path.join(publicDir, 'favicon.ico');
    await sharp(svgPath)
      .resize(32, 32)
      .png({ quality: 100 })
      .toFile(faviconIcoPath);
    console.log('✅ 生成: favicon.ico (32x32)');
    
    console.log('\n🎉 Favicon生成完成！');
    console.log('\n📋 已生成的文件:');
    faviconSizes.forEach(favicon => {
      console.log(`  - ${favicon.name}`);
    });
    console.log('  - favicon.ico');
    console.log('  - favicon.svg (原始文件)');
    
  } catch (error) {
    console.error('❌ 生成favicon时出错:', error.message);
  }
}

// 生成manifest文件
function generateManifest() {
  const manifest = {
    name: 'Vesper AgriTech',
    short_name: 'Vesper',
    description: 'Smart Agriculture, Precision Future',
    start_url: '/',
    display: 'standalone',
    background_color: '#2e7d32',
    theme_color: '#4caf50',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
  
  const manifestPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ 生成: site.webmanifest');
}

// 生成浏览器配置文件
function generateBrowserConfig() {
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <wide310x150logo src="/mstile-310x150.png"/>
      <TileColor>#2e7d32</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  
  const browserConfigPath = path.join(publicDir, 'browserconfig.xml');
  fs.writeFileSync(browserConfigPath, browserConfig);
  console.log('✅ 生成: browserconfig.xml');
}

async function main() {
  await generateFavicons();
  generateManifest();
  generateBrowserConfig();
  
  console.log('\n📝 下一步:');
  console.log('1. 更新index.html中的favicon链接');
  console.log('2. 运行 npm run build 测试');
}

main().catch(console.error);