const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 需要压缩的图片列表（根据HomeView.vue中使用的图片）
const imagesToOptimize = [
  // 轮播图
  'pexels-vladimirsrajber-18431208.jpg',
  'pexels-nc-farm-bureau-mark-26256448.jpg',
  'pexels-wolfgang-weiser-467045605-34239948.jpg',
  
  // 解决方案图片
  'agriculture-6502282.jpg',
  'pexels-wolfgang-weiser-467045605-34239949.jpg',
  'sunrise-8218442.jpg',
  'harvest-1543064.jpg',
  
  // 产品图片
  '3U9A0093.jpg',
  'pexels-stitch-20280076.jpg',
  'pexels-nc-farm-bureau-mark-2889442.jpg',
  
  // Logo (在public根目录)
  'logo.png'
];

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

async function optimizeImage(imageName) {
  // 检查图片在哪个目录
  let inputPath = path.join(imagesDir, imageName);
  const outputName = imageName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  let outputPath = path.join(imagesDir, outputName);
  
  // 如果不在images目录，检查public根目录
  if (!fs.existsSync(inputPath)) {
    inputPath = path.join(publicDir, imageName);
    outputPath = path.join(publicDir, outputName);
  }
  
  // 检查原图是否存在
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  图片不存在: ${imageName}`);
    return null;
  }
  
  try {
    console.log(`🔄 处理: ${imageName} -> ${outputName}`);
    
    // 获取图片信息
    const metadata = await sharp(inputPath).metadata();
    
    // 根据图片用途设置不同的压缩参数
    let quality = 80; // 默认质量
    let width = metadata.width;
    
    // 根据图片用途调整尺寸和质量
    if (imageName.includes('carousel') || imageName.includes('pexels')) {
      // 轮播图和展示图：中等质量，适当缩小
      quality = 75;
      if (width > 1920) width = 1920; // 限制最大宽度
    } else if (imageName === 'logo.png') {
      // Logo：高质量，保持原尺寸
      quality = 90;
    } else {
      // 其他图片：中等质量
      quality = 80;
      if (width > 1200) width = 1200;
    }
    
    // 转换为WebP格式
    await sharp(inputPath)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality,
        effort: 6 // 较高的压缩努力值以获得更好的压缩率
      })
      .toFile(outputPath);
    
    // 获取文件大小信息
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ 完成: ${outputName} (${formatSize(originalSize)} → ${formatSize(optimizedSize)}, 减少${reduction}%)`);
    
    return {
      original: imageName,
      optimized: outputName,
      originalSize,
      optimizedSize,
      reduction
    };
  } catch (error) {
    console.error(`❌ 处理失败 ${imageName}:`, error.message);
    return null;
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log('🚀 开始优化图片...');
  console.log('='.repeat(50));
  
  const results = [];
  
  for (const imageName of imagesToOptimize) {
    const result = await optimizeImage(imageName);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('='.repeat(50));
  console.log('📊 优化结果汇总:');
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  results.forEach(result => {
    totalOriginal += result.originalSize;
    totalOptimized += result.optimizedSize;
    console.log(`  ${result.original}: ${formatSize(result.originalSize)} → ${formatSize(result.optimizedSize)} (减少${result.reduction}%)`);
  });
  
  const totalReduction = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
  console.log(`\n📈 总计: ${formatSize(totalOriginal)} → ${formatSize(totalOptimized)} (减少${totalReduction}%)`);
  
  // 创建图片映射文件，用于更新Vue组件
  const imageMap = {};
  results.forEach(result => {
    const key = result.original.replace(/\.(jpg|jpeg|png)$/i, '');
    imageMap[key] = result.optimized;
  });
  
  // 保存映射文件
  const mapPath = path.join(__dirname, '..', 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  console.log(`\n🗺️  图片映射已保存到: ${mapPath}`);
  
  console.log('\n🎉 图片优化完成！');
}

main().catch(console.error);