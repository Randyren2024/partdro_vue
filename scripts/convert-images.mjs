import { mkdir, readdir, copyFile, stat } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'product_files')
const OUT = join(ROOT, 'public', 'images')
const LOGO_SRC = join(ROOT, 'logo_branding_assets', 'logo.png')

// Mapping: source dir segments → output product dir
const PRODUCT_DIRS = {
  'MY-108': 'my-108',
  'MY-208': 'my-208',
  'MY-330': 'my-330',
  'MY-405': 'my-405',
  'MY-408': 'my-408',
}

// Subdirectory mapping: Chinese name → English name
const SUBDIR_MAP = {
  '打包主图': 'main',
  '附图方': 'accessory',
  '附图': 'accessory',
  '切片': 'detail',
  '详情': 'detail',
  '详情页': 'detail',
  'images': '', // will be absorbed into parent
  '主图': 'main',
  '动图': 'animation',
  '防伪码图片': 'anti-counterfeit',
  'qwen image layered': 'layered',
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif'])
let converted = 0
let copied = 0

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function isDir(path) {
  try { return (await stat(path)).isDirectory() } catch { return false }
}

async function processImage(srcPath, outDir, baseName) {
  const ext = extname(srcPath).toLowerCase()
  if (!IMAGE_EXTS.has(ext)) return

  await ensureDir(outDir)

  const outName = baseName.replace(ext, '.webp')
  const outPath = join(outDir, outName)

  if (ext === '.gif') {
    // Copy GIF as-is to preserve animation; also create static webp
    const gifOut = join(outDir, baseName)
    await copyFile(srcPath, gifOut)
    copied++
    // Try to create a static webp from first frame as well
    try {
      await sharp(srcPath, { animated: true }).webp({ quality: 85 }).toFile(outPath)
      converted++
    } catch {
      // If animated webp fails, just keep the GIF
    }
  } else {
    await sharp(srcPath).webp({ quality: 85, effort: 6 }).toFile(outPath)
    converted++
  }
}

/**
 * Determine the output subdirectory based on path segments.
 * Returns the part after the product name, e.g., "main", "detail", "accessory"
 */
function resolveOutputCategory(pathParts) {
  // Find the product dir index
  let prodIdx = -1
  for (let i = 0; i < pathParts.length; i++) {
    if (PRODUCT_DIRS[pathParts[i]]) {
      prodIdx = i
      break
    }
  }
  if (prodIdx === -1) return 'main'

  // Check segments after the second product dir (e.g., after both "MY-108/MY-108")
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

      // Determine product
      let productId = null
      for (const [key, val] of Object.entries(PRODUCT_DIRS)) {
        if (pathParts.includes(key)) { productId = val; break }
      }
      if (!productId) continue

      const category = resolveOutputCategory([...pathParts, entry.name])
      const outDir = join(OUT, productId, category)
      await processImage(fullPath, outDir, entry.name)
    }
  }
}

async function copyLogo() {
  await ensureDir(OUT)
  const logoWebp = join(OUT, 'logo.webp')
  const logoPng = join(OUT, 'logo.png')
  await copyFile(LOGO_SRC, logoPng)
  await sharp(LOGO_SRC).webp({ quality: 90 }).toFile(logoWebp)
  console.log('Logo copied and converted')
}

async function copyTradeShows() {
  const tradeDir = join(SRC, 'trade shows')
  if (!(await isDir(tradeDir))) return
  const outDir = join(OUT, 'trade-shows')
  await ensureDir(outDir)
  const entries = await readdir(tradeDir, { withFileTypes: true })
  for (const entry of entries) {
    const ext = extname(entry.name).toLowerCase()
    if (!IMAGE_EXTS.has(ext) || ext === '.gif') continue
    if (entry.isFile()) {
      await processImage(join(tradeDir, entry.name), outDir, entry.name)
    }
  }
}

// Main
console.log('Converting images to WebP...')
await copyLogo()
await walkDir(SRC)
await copyTradeShows()
console.log(`Done! ${converted} images converted to WebP, ${copied} GIFs copied.`)
