const sharp = require('sharp');
const path = require('path');

async function convert() {
  const logos = ['xiaomi_logo.png', 'alibaba_damo_academy_logo.png', 'dji_logo.png'];
  for (const logo of logos) {
    const inputPath = path.join(__dirname, '..', 'public', logo);
    const outputPath = path.join(__dirname, '..', 'public', logo.replace('.png', '.webp'));
    await sharp(inputPath).webp({quality:90}).toFile(outputPath);
    console.log('Converted:', logo.replace('.png', '.webp'));
  }
  console.log('All logos converted!');
}

convert().then(()=>process.exit()).catch(e=>{console.error(e);process.exit(1)});