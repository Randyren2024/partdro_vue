// Convert original product_files images to public/images/philips/ with Philips branding
import { mkdir, readdir, copyFile, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'product_files')
const OUT = join(ROOT, 'public', 'images', 'philips')

const PRODUCT_DIRS = {
  'MY-108': 'my-108',
  'MY-208': 'my-208',
  'MY-330': 'my-330',
  'MY-405': 'my-405',
  'MY-408': 'my-408',
}

const SUBDIR_MAP = {
  '打包主图': 'main',
  '附图方': 'accessory',
  '附图': 'accessory',
  '切片': 'detail',
  '详情': 'detail',
  '详情页': 'detail',
  'images': '',
  '主图': 'main',
  '动图': 'animation',
  '防伪码图片': 'anti-counterfeit',
  'qwen image layered': 'layered',
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif'])
let converted = 0

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

function resolveOutputCategory(pathParts) {
  let prodIdx = -1
  for (let i = 0; i < pathParts.length; i++) {
    if (PRODUCT_DIRS[pathParts[i]]) {
      prodIdx = i
      break
    }
  }
  if (prodIdx === -1) return 'main'
  let foundSecond = false
  let category = 'main'
  for (let i = prodIdx + 1; i < pathParts.length; i++) {
    const seg = pathParts[i]
    if (seg === pathParts[prodIdx]) {
      foundSecond = true
      continue
    }
    if (foundSecond && SUBDIR_MAP[seg] !== undefined) {
      const mapped = SUBDIR_MAP[seg]
      if (mapped) category = mapped
    }
  }
  return category
}

async function walkDir(dir, pathParts = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkDir(fullPath, [...pathParts, entry.name])
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase()
      if (!IMAGE_EXTS.has(ext)) continue
      let productId = null
      for (const [key, val] of Object.entries(PRODUCT_DIRS)) {
        if (pathParts.includes(key)) { productId = val; break }
      }
      if (!productId) continue

      const category = resolveOutputCategory([...pathParts, entry.name])
      const outDir = join(OUT, productId, category)
      await ensureDir(outDir)

      const outName = entry.name.replace(ext, '.webp')
      const outPath = join(outDir, outName)

      if (ext === '.gif') {
        await copyFile(fullPath, join(outDir, entry.name))
      } else {
        await sharp(fullPath).webp({ quality: 85, effort: 6 }).toFile(outPath)
        converted++
      }
    }
  }
}

// Also copy standalone product images (MY-405.jpg, MY-408.jpg)
async function copyStandalone() {
  for (const [name, id] of Object.entries({ 'MY-405.jpg': 'my-405', 'MY-408.jpg': 'my-408' })) {
    const src = join(SRC, name)
    try {
      await stat(src)
      const outDir = join(OUT, id, 'main')
      await ensureDir(outDir)
      const outName = name.replace('.jpg', '.webp')
      await sharp(src).webp({ quality: 85 }).toFile(join(outDir, outName))
      converted++
    } catch { /* file may not exist */ }
  }
}

// Copy EN detail images for MY-208 and MY-330
async function copyENDetails() {
  // MY-208 EN details
  const en208 = join(SRC, 'MY-208', 'MY-208', '详情', 'EN')
  try {
    const files = await readdir(en208)
    const outDir = join(OUT, 'my-208', 'detail')
    await ensureDir(outDir)
    for (const f of files) {
      if (f.startsWith('.')) continue
      const ext = extname(f).toLowerCase()
      if (!IMAGE_EXTS.has(ext)) continue
      const src = join(en208, f)
      const outName = f.replace(ext, '.webp')
      await sharp(src).webp({ quality: 85 }).toFile(join(outDir, outName))
      converted++
    }
  } catch { console.log('No MY-208 EN folder') }

  // MY-330 EN details
  const en330 = join(SRC, 'MY-330', 'MY-330', '详情页', 'images', 'EN')
  try {
    const files = await readdir(en330)
    const outDir = join(OUT, 'my-330', 'detail')
    await ensureDir(outDir)
    for (const f of files) {
      if (f.startsWith('.')) continue
      const ext = extname(f).toLowerCase()
      if (!IMAGE_EXTS.has(ext)) continue
      const src = join(en330, f)
      const outName = f.replace(ext, '.webp')
      await sharp(src).webp({ quality: 85 }).toFile(join(outDir, outName))
      converted++
    }
  } catch { console.log('No MY-330 EN folder') }
}

// Copy feature card images that are already in the Babala detail folder for Philips use
// These are the learn-more feature card images
async function copyFeatureCards() {
  // MY-330 feature cards: copy from main images where we have Philips originals
  // For MY-108 feature_section images, they come from slice images - already covered by walkDir

  // Also copy the feature_card images from the existing public detail folders
  // These were placed there from product_files source
  const featureSets = [
    { src: join(ROOT, 'public', 'images', 'my-108', 'detail'), dst: join(OUT, 'my-108', 'detail'), pattern: /^feature_section_/ },
    { src: join(ROOT, 'public', 'images', 'my-208', 'detail'), dst: join(OUT, 'my-208', 'detail'), pattern: /^feature_card_/ },
    { src: join(ROOT, 'public', 'images', 'my-330', 'detail'), dst: join(OUT, 'my-330', 'detail'), pattern: /^feature_card_/ },
  ]

  for (const set of featureSets) {
    try {
      const files = await readdir(set.src)
      for (const f of files) {
        if (!set.pattern.test(f)) continue
        await ensureDir(set.dst)
        await copyFile(join(set.src, f), join(set.dst, f))
        converted++
        console.log(`  Copied feature card: ${f}`)
      }
    } catch { /* folder might not exist */ }
  }
}

console.log('Converting Philips images from product_files to WebP...')
await walkDir(SRC)
await copyStandalone()
await copyENDetails()
// Copy feature card images (originally from product_files source)
await copyFeatureCards()
console.log(`Done! ${converted} images converted/copied.`)
