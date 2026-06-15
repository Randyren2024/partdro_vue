const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Microsoft Tile尺寸
const msTileSizes = [
  { name: 'mstile-70x70.png', size: 70 },
  { name: 'mstile-150x150.png', size: 150 },
  { name: 'mstile-310x150.png', width: 310, height: 150 },
  { name: 'mstile-310x310.png', size: 310 },
];

async function generateMSTiles() {
  console.log('🚀 开始生成Microsoft Tile图标...');
  
  if (!fs.existsSync(svgPath)) {
    console.error('❌ favicon.svg文件不存在！');
    return;
  }
  
  try {
    for (const tile of msTileSizes) {
      const outputPath = path.join(publicDir, tile.name);
      
      if (tile.size) {
        // 正方形图标
        await sharp(svgPath)
          .resize(tile.size, tile.size)
          .png({ quality: 100 })
          .toFile(outputPath);
        console.log(`✅ 生成: ${tile.name} (${tile.size}x${tile.size})`);
      } else if (tile.width && tile.height) {
        // 长方形图标
        await sharp(svgPath)
          .resize(tile.width, tile.height, {
            fit: 'contain',
            background: { r: 46, g: 125, b: 50, alpha: 1 } // #2e7d32
          })
          .png({ quality: 100 })
          .toFile(outputPath);
        console.log(`✅ 生成: ${tile.name} (${tile.width}x${tile.height})`);
      }
    }
    
    console.log('\n🎉 Microsoft Tile图标生成完成！');
  } catch (error) {
    console.error('❌ 生成Microsoft Tile图标时出错:', error.message);
  }
}

generateMSTiles().catch(console.error);