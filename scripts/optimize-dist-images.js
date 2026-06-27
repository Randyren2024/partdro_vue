// One-shot optimization script for PNGs in public/images
// Run with: node scripts/optimize-dist-images.js
// - Recompresses all PNGs with maximum compression
// - Resizes oversized images (icons: 256px, gallery/feature: 1600px max, hero: keep)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RULES = [
  { test: /^public\/images\/icons\//, maxDim: 256 },
  { test: /^public\/images\/mini-x\//, maxDim: 1600 },
  { test: /^public\/images\/(lumenfly-mini|mini-se|fp500|fp600|fp700|a80|fp300e|af718)\//, maxDim: 1600 },
  { test: /^public\/images\/(about-hero|about-intro|contact-hero)\.png$/, maxDim: 0 }, // 0 = keep original size
];

const DEFAULT_MAX = 1600;

async function* walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function getMaxDim(filePath) {
  for (const r of RULES) {
    if (r.test.test(filePath.replace(/\\/g, '/'))) return r.maxDim;
  }
  return DEFAULT_MAX;
}

async function optimize(filePath) {
  if (!/\.png$/i.test(filePath)) return null;
  const before = fs.statSync(filePath).size;
  // Some "*.png" files are actually JPEGs (AI-generated). Probe first.
  const buf = fs.readFileSync(filePath);
  const isJpeg = buf[0] === 0xFF && buf[1] === 0xD8;
  let meta;
  try {
    meta = await sharp(buf).metadata();
  } catch (e) {
    console.error('Skip (unreadable):', filePath, e.message);
    return null;
  }
  const maxDim = getMaxDim(filePath);
  const tooBig = maxDim > 0 && (meta.width > maxDim || meta.height > maxDim);

  if (!tooBig && before < 300 * 1024) return null;

  let pipeline = sharp(buf);
  if (tooBig) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? maxDim : null,
      height: meta.height > meta.width ? maxDim : null,
      withoutEnlargement: true,
      fit: 'inside',
    });
  }
  // Re-encode in the format the bytes actually are, keeping the on-disk extension.
  const out = isJpeg
    ? await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
    : await pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 }).toBuffer();

  const after = out.length;
  if (after < before) {
    fs.writeFileSync(filePath, out);
    return { file: filePath, before, after, dim: tooBig ? `${meta.width}x${meta.height} -> max${maxDim}` : 'recompress' };
  }
  return null;
}

(async () => {
  const results = [];
  for await (const p of walk('public/images')) {
    try {
      const r = await optimize(p);
      if (r) results.push(r);
    } catch (e) {
      console.error('Error:', p, e.message);
    }
  }
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  const saved = totalBefore - totalAfter;
  console.log('Optimized', results.length, 'files');
  console.log('Saved:', (saved / 1024 / 1024).toFixed(2), 'MB');
  console.log('  Before:', (totalBefore / 1024 / 1024).toFixed(2), 'MB');
  console.log('  After:', (totalAfter / 1024 / 1024).toFixed(2), 'MB');
  console.log('---');
  results.sort((a, b) => b.before - a.before).slice(0, 15).forEach(r => {
    console.log('  ' + (r.before / 1024).toFixed(0).padStart(5) + 'KB -> ' + (r.after / 1024).toFixed(0).padStart(5) + 'KB  ' + r.file + '  ' + r.dim);
  });
})();