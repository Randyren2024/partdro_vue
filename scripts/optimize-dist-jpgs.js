// Compress JPGs in product image folders using mozjpeg
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
  'public/images/lumenfly-mini',
  'public/images/mini-se',
  'public/images/mini-x',
  'public/images/fp500',
  'public/images/fp600',
  'public/images/fp700',
  'public/images/a80',
  'public/images/fp300e',
];

const MAX_DIM = 1600;
const MIN_SIZE = 200 * 1024;

async function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else yield p;
  }
}

(async () => {
  const results = [];
  for (const dir of TARGET_DIRS) {
    for await (const p of walk(dir)) {
      if (!/\.(jpe?g)$/i.test(p)) continue;
      const before = fs.statSync(p).size;
      if (before < MIN_SIZE) continue;
      const buf = fs.readFileSync(p);
      const meta = await sharp(buf).metadata();
      const tooBig = meta.width > MAX_DIM || meta.height > MAX_DIM;
      let pipeline = sharp(buf);
      if (tooBig) {
        pipeline = pipeline.resize({
          width: meta.width >= meta.height ? MAX_DIM : null,
          height: meta.height > meta.width ? MAX_DIM : null,
          withoutEnlargement: true,
          fit: 'inside',
        });
      }
      const out = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      if (out.length < before) {
        fs.writeFileSync(p, out);
        results.push({ file: p, before, after: out.length, dim: tooBig ? `${meta.width}x${meta.height} -> max${MAX_DIM}` : 'recompress' });
      }
    }
  }
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log('Optimized', results.length, 'JPGs');
  console.log('Saved:', ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2), 'MB');
  results.sort((a, b) => b.before - a.before).slice(0, 10).forEach(r => {
    console.log('  ' + (r.before/1024).toFixed(0).padStart(5) + 'KB -> ' + (r.after/1024).toFixed(0).padStart(5) + 'KB  ' + r.file.replace('public/', '') + '  ' + r.dim);
  });
})();