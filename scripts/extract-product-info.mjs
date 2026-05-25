import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const API_KEY = 'sk-31935adea80c4d03bd0709155f11b2c0'
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

// Only process these detail images (first image of each product's detail page)
const TARGETS = [
  { product: 'MY-108', path: 'product_files/MY-108/MY-108/切片/1_01.jpg' },
  { product: 'MY-208', path: 'product_files/MY-208/MY-208/详情/1_01.jpg' },
  { product: 'MY-330', path: 'product_files/MY-330/MY-330/详情页/images/1_01.jpg' },
]

async function extractFromImage(productId, imagePath) {
  const fullPath = join(ROOT, imagePath)
  if (!existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`)
    return null
  }

  const imgBuffer = readFileSync(fullPath)
  const base64 = imgBuffer.toString('base64')

  console.log(`Sending ${productId} image to Qwen VL... (${(imgBuffer.length / 1024).toFixed(1)} KB)`)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-vl-max',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
            {
              type: 'text',
              text: `这是一个灭蚊灯产品的详情页图片。请仔细阅读图片中的所有文字，提取以下信息并以 JSON 格式返回：

{
  "productModel": "产品型号",
  "productName": "产品名称",
  "brandName": "品牌名称",
  "description": "产品简要描述",
  "features": ["特性1", "特性2", "..."],
  "specifications": [
    {"label": "参数名称", "value": "参数值"},
    ...
  ],
  "usageScenarios": ["适用场景1", "..."],
  "certifications": ["认证1", "..."],
  "anyOtherInfo": "图片中的其他重要信息"
}

请只返回 JSON，不要有其他文字。如果图片中某项信息不存在，对应的字段用 null 或空数组表示。`,
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    }),
  })

  const data = await response.json()
  if (data.error) {
    console.error(`API Error for ${productId}:`, data.error)
    return null
  }

  const content = data.choices?.[0]?.message?.content || ''
  console.log(`\n=== ${productId} Raw Response ===`)
  console.log(content)
  console.log('========================\n')

  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return { raw: content }
  } catch (e) {
    return { raw: content, parseError: e.message }
  }
}

async function main() {
  const results = {}

  for (const target of TARGETS) {
    console.log(`\n--- Processing ${target.product} ---`)
    const info = await extractFromImage(target.product, target.path)
    if (info) {
      results[target.product] = info
    }
  }

  const outPath = join(ROOT, 'scripts', 'extracted-product-info.json')
  writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8')
  console.log(`\nResults saved to ${outPath}`)
}

main().catch(console.error)
