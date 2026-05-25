export interface ProductSpec {
  label: string
  value: string
}

export interface ProductPowerVariant {
  power: string
  specs: ProductSpec[]
  mainImage: string
  isExplosionProof?: boolean
}

export interface ProductImage {
  src: string
  alt: string
  category: 'main' | 'accessory' | 'detail' | 'animation' | 'anti-counterfeit' | 'layered'
}

export type ProductCategory = 'cargo-drones' | 'industrial-drones' | 'gasoline-drones' | 'hydrogen-drones' | 'payload' | 'firefighting-drones' | 'robotics'

export interface Product {
  id: string
  model: string
  name: string
  nameCn: string
  brand?: 'partdro'
  tagline: string
  description: string
  descriptionCn: string
  category: ProductCategory
  categoryName: string
  subcategory?: string
  coverage?: string
  features: string[]
  specs: ProductSpec[]
  specsGroups?: { title: string; specs: ProductSpec[] }[]
  variants?: ProductPowerVariant[]
  images: ProductImage[]
  hasFullDetail: boolean
  isNew?: boolean
  isFeatured?: boolean
  orderIndex: number
  faqs?: { question: string; answer: string }[]
}

export function getImagePath(productId: string, category: string, filename: string): string {
  return `/images/${productId}/${category}/${filename}`
}
