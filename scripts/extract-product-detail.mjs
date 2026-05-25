import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const API_KEY = 'sk-31935adea80c4d03bd0709155f11b2c0'
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

// Key detail images per product (selecting ones most likely to contain specs)
const PRODUCT_IMAGES = {
  'MY-108': {
    basePath: 'product_files/MY-108/MY-108/切片',
    images: ['1_01.jpg', '1_02.jpg', '1_03.jpg', '1_05.jpg', '1_10.jpg', '1_15.jpg', '1_20.jpg'],
  },
  'MY-208': {
    basePath: 'product_files/MY-208/MY-208/详情',
    images: ['1_01.jpg', '1_02.jpg', '1_03.jpg', '1_05.jpg', '1_11.jpg', '1_16.jpg', '1_21.jpg'],
  },
  'MY-330': {
    basePath: 'product_files/MY-330/MY-330/详情页/images',
    images: ['1_01.jpg', '1_02.jpg', '1_03.jpg', '1_05.jpg', '1_10.jpg', '2_01.jpg', '2_10.jpg'],
  },
}

const SYSTEM_PROMPT = `你是一个产品数据提取专家。我会给你一组灭蚊灯产品的详情页切片图片（从上到下的顺序），请仔细阅读每张图片中的中文文字，提取完整的产品信息。

请特别注意以下信息类别：
1. 产品型号/编号
2. 产品名称
3. 品牌
4. 核心卖点/标语
5. 产品特性（逐条列出）
6. 技术规格参数（功率、电压、覆盖面积、波长、IP等级、材质、尺寸、重量等所有数字参数）
7. 适用场景
8. 认证

请以严格的JSON格式返回，不要有其他文字。JSON结构如下：
{
  "model": "型号",
  "name": "产品名称中文",
  "nameEn": "产品名称英文",
  "brand": "品牌",
  "tagline": "核心标语",
  "description": "产品描述（2-3句话）",
  "features": ["特性1", "特性2", ...],
  "specifications": [
    {"label": "参数名称", "value": "参数值"},
    ...
  ],
  "scenarios": ["场景1", "场景2", ...],
  "certifications": ["认证1", ...],
  "powerVariants": [
    {"power": "8W", "specs": [{"label": "覆盖面积", "value": "50-80m²"}, ...]},
    ...
  ]
}`

function toBase64(path) {
  const buf = readFileSync(path)
  return buf.toString('base64')
}

async function extractProduct(productId) {
  const config = PRODUCT_IMAGES[productId]
  const content = [
    { type: 'text', text: SYSTEM_PROMPT },
  ]

  for (const img of config.images) {
    const imgPath = join(ROOT, config.basePath, img)
    if (!existsSync(imgPath)) {
      console.log(`  Skipping missing: ${img}`)
      continue
    }
    const b64 = toBase64(imgPath)
    console.log(`  Adding ${img} (${(Buffer.byteLength(b64, 'base64') / 1024).toFixed(1)} KB)`)
    content.push({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${b64}` },
    })
  }

  console.log(`  Sending ${content.length - 1} images to Qwen VL...`)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-vl-max',
      messages: [{ role: 'user', content }],
      max_tokens: 4000,
      temperature: 0.1,
    }),
  })

  const data = await response.json()
  if (data.error) {
    console.error(`  API Error:`, JSON.stringify(data.error))
    return null
  }

  const text = data.choices?.[0]?.message?.content || ''
  console.log(`\n=== ${productId} Response ===`)
  console.log(text)
  console.log('========================\n')

  try {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    return { raw: text }
  } catch (e) {
    return { raw: text, parseError: e.message }
  }
}

async function main() {
  const results = {}

  for (const pid of Object.keys(PRODUCT_IMAGES)) {
    console.log(`\n=== Processing ${pid} ===`)
    const info = await extractProduct(pid)
    if (info) results[pid] = info
  }

  const outPath = join(ROOT, 'scripts', 'extracted-detail-info.json')
  writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8')
  console.log(`Saved to ${outPath}`)
}

main().catch(console.error)
