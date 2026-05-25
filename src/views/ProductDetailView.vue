<template>
  <PageLayout v-if="product">
    <div class="detail-page" :class="`brand-${brand}`">
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item><a @click="$router.push('/')">{{ $t('productDetail.home') }}</a></a-breadcrumb-item>
          <a-breadcrumb-item><a @click="$router.push(productListPath)">{{ brandDisplayName }} Products</a></a-breadcrumb-item>
          <a-breadcrumb-item>{{ product.model }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <section class="product-hero">
        <div class="product-hero-container">
          <div class="product-image-section">
            <div class="product-gallery">
              <a-carousel v-if="productGallery.length > 1" arrows autoplay class="product-carousel">
                <template #customPaging>
                  <a class="carousel-dot" />
                </template>
                <div v-for="(img, idx) in productGallery" :key="idx">
                  <a-image :src="img.src" :alt="img.alt" class="gallery-image" fallback="/images/logo.png" />
                </div>
              </a-carousel>
              <a-image v-else-if="productGallery.length === 1" :src="productGallery[0]?.src" :alt="product.name" class="main-product-image" fallback="/images/logo.png" />
            </div>
            <div class="product-badges">
              <span v-if="product.isFeatured" class="stock-badge stock-badge--best">Best Seller</span>
              <span v-if="product.isNew" class="stock-badge stock-badge--new">New Release</span>
            </div>
          </div>

          <div class="product-info-section">
            <div class="product-category-link">
              <a @click="$router.push(productListPath)">{{ product.categoryName }}</a>
            </div>
            <h1 class="product-title">{{ product.model }} {{ product.name }}</h1>
            <p class="product-tagline">{{ product.tagline }}</p>

            <div class="feature-badges">
              <span v-for="badge in product.features.slice(0, 6)" :key="badge" class="feature-badge">{{ badge }}</span>
            </div>

            <a-collapse v-model:activeKey="productAccordionKeys" class="product-accordion" expand-icon-position="end">
              <a-collapse-panel key="why" header="Why You'll Choose It">
                <ul class="product-why-list">
                  <li v-for="(reason, idx) in product.features" :key="idx">
                    <CheckCircleOutlined class="why-icon" /> {{ reason }}
                  </li>
                </ul>
              </a-collapse-panel>
              <a-collapse-panel key="features" header="Features">
                <ul class="product-features-list">
                  <li v-for="(feat, idx) in product.features" :key="idx">
                    <CheckCircleOutlined class="feature-icon" /> {{ feat }}
                  </li>
                </ul>
              </a-collapse-panel>
            </a-collapse>

            <div class="product-cta-buttons">
              <a-button type="primary" size="large" class="btn-pill-primary" @click="openProductInquiry(product.model, product.name, brandDisplayName)">
                <MessageOutlined /> {{ $t('productDetail.getQuote') }}
              </a-button>
              <a-button size="large" class="btn-pill-outline" @click="openWhatsApp()">
                <CalendarOutlined /> Request Sample
              </a-button>
            </div>

            <div class="support-links">
              <a-button type="link" @click="scrollToSpecs">
                <TableOutlined /> View Specifications
              </a-button>
              <a-button type="link" @click="$router.push('/contact')">
                <PhoneOutlined /> Contact Us
              </a-button>
            </div>
          </div>
        </div>
      </section>

      <section v-if="showVariants" class="variants-section">
        <div class="section-container">
          <h2 class="section-title">Available Variants</h2>
          <div class="variants-grid">
            <a-card v-for="(v, idx) in product.variants" :key="idx" class="variant-card" hoverable>
              <template #cover>
                <div class="variant-cover">
                  <img :src="v.mainImage" :alt="v.power" @error="(e: Event) => { (e.target as HTMLImageElement).src = '/images/logo.png' }" />
                </div>
              </template>
              <a-card-meta :title="v.power">
                <template #description>
                  <div v-for="spec in v.specs" :key="spec.label" class="variant-spec">
                    <span class="spec-label">{{ spec.label }}:</span> {{ spec.value }}
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </section>

      <section v-if="showDetailImages" class="detail-section">
        <div class="section-container">
          <h2 class="section-title">Product Details</h2>
          <div class="detail-grid">
            <img
              v-for="(img, idx) in detailImages"
              :key="idx"
              :src="img.src"
              :alt="img.alt"
              loading="lazy"
              decoding="async"
              class="detail-image"
              @error="(e: Event) => { (e.target as HTMLImageElement).style.display = 'none' }"
            />
          </div>
        </div>
      </section>

      <section class="learn-more-section">
        <div class="section-container">
          <h2 class="section-title">Learn More About {{ product.model }} {{ product.name }}</h2>
          <div class="learn-more-cards">
            <div
              v-for="(card, idx) in learnMoreCards"
              :key="idx"
              class="learn-more-card"
              :class="{ 'card-reverse': idx % 2 === 1 }"
            >
              <div class="learn-more-image">
                <img :src="`${imagePrefix}/${product.id}${card.imagePattern}`" :alt="card.title" @error="(e: Event) => { (e.target as HTMLImageElement).src = '/images/logo.png' }" />
              </div>
              <div class="learn-more-content">
                <h3 class="learn-more-title">{{ card.title }}</h3>
                <p class="learn-more-description">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="product.features.length" class="applications-section">
        <div class="section-container">
          <h2 class="section-title">Key Features & Applications</h2>
          <a-carousel arrows :slides-to-show="appSlidesPerView" :slides-to-scroll="1" autoplay class="applications-carousel">
            <div v-for="(feat, idx) in product.features" :key="idx" class="application-slide">
              <div class="application-card">
                <div class="application-icon-wrapper">
                  <AppstoreOutlined class="app-icon" />
                </div>
                <h3>{{ feat }}</h3>
              </div>
            </div>
          </a-carousel>
        </div>
      </section>

      <section class="specs-section" id="specifications">
        <div class="section-container">
          <h2 class="section-title">Specifications</h2>
          <div v-if="product.specsGroups?.length" class="specs-tabs-wrapper">
            <a-tabs v-model:activeKey="activeSpecsTab" class="specs-tabs">
              <a-tab-pane v-for="group in product.specsGroups" :key="group.title" :tab="group.title">
                <a-table
                  :dataSource="group.specs.map((s, i) => ({ key: i, specification: s.label, value: s.value }))"
                  :columns="specsColumns"
                  :pagination="false"
                  class="specs-table"
                  size="small"
                />
              </a-tab-pane>
            </a-tabs>
          </div>
          <a-table
            v-else
            :dataSource="product.specs.map((s, i) => ({ key: i, specification: s.label, value: s.value }))"
            :columns="specsColumns"
            :pagination="false"
            class="specs-table"
            size="small"
          />
          <div class="specs-more">
            <a-button type="link" @click="openWhatsApp()">Learn More About Specifications →</a-button>
          </div>
        </div>
      </section>

      <section v-if="product.faqs?.length" class="faq-section">
        <div class="section-container">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <a-collapse v-model:activeKey="activeFaqKeys" class="faq-collapse" expand-icon-position="end">
            <a-collapse-panel v-for="(faq, idx) in product.faqs" :key="idx" :header="faq.question">
              <p class="faq-answer">{{ faq.answer }}</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </section>

      <section v-if="relatedProducts.length" class="related-section">
        <div class="section-container">
          <h2 class="section-title">You May Also Like</h2>
          <div class="related-grid">
            <a-card v-for="related in relatedProducts" :key="related.id" class="related-card" hoverable @click="$router.push(productDetailPath(related.id))">
              <template #cover>
                <div class="related-cover">
                  <img :src="related.images[0]?.src" :alt="related.name" loading="lazy" decoding="async" @error="(e: Event) => { (e.target as HTMLImageElement).src = '/images/logo.png' }" />
                </div>
              </template>
              <a-card-meta :title="related.model + ' ' + related.name">
                <template #description>{{ related.tagline.substring(0, 80) }}...</template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-container">
          <h2>Interested in {{ product.model }} {{ product.name }}?</h2>
          <p>Contact us today for more information or request a quote</p>
          <div class="cta-buttons">
            <a-button type="primary" size="large" class="btn-pill-primary" @click="openProductInquiry(product.model, product.name, brandDisplayName)">
              <MessageOutlined /> Get A Quote
            </a-button>
            <a-button size="large" class="btn-pill-outline cta-btn-white" @click="$router.push('/contact')">Contact Us</a-button>
          </div>
        </div>
      </section>

      <div class="sticky-cta-bar" :class="{ visible: showStickyCta }">
        <div class="sticky-cta-container">
          <span class="sticky-cta-name">{{ product.model }} {{ product.name }}</span>
          <a-button type="primary" class="btn-pill-primary" size="small" @click="openProductInquiry(product.model, product.name, brandDisplayName)">Get A Quote</a-button>
        </div>
      </div>
    </div>
  </PageLayout>

  <div v-else class="not-found">
    <a-result status="404" :title="$t('productDetail.notFound')" :sub-title="$t('productDetail.notFoundSub')">
      <template #extra>
        <a-button type="primary" class="btn-pill-primary" @click="$router.push('/products')">{{ $t('productDetail.backToProducts') }}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  CheckCircleOutlined, MessageOutlined, TableOutlined, AppstoreOutlined,
  LinkedinOutlined, CalendarOutlined, PhoneOutlined,
  TwitterOutlined, FacebookOutlined,
} from '@ant-design/icons-vue'
import PageLayout from '../components/layout/PageLayout.vue'
import { useBrand } from '../composables/useBrand'
import { useWhatsApp } from '../composables/useWhatsApp'
import { useMeta } from '../composables/useMeta'
import { getLearnMoreCards } from '../data/learn-more-cards'
import { products, getProductById } from '../data/products'

const route = useRoute()
const { brand, productListPath, productDetailPath, imagePrefix, brandDisplayName } = useBrand()
const { openWhatsApp, openProductInquiry } = useWhatsApp()

const product = computed(() => getProductById(route.params.id as string))

useMeta(
  product.value ? `${product.value.model} ${product.value.name}` : undefined,
  product.value?.tagline
)

const productAccordionKeys = ref<string[]>(['why'])
const activeFaqKeys = ref<number[]>([0])
const activeSpecsTab = ref<string>('')
const showStickyCta = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const detailImages = computed(() => {
  if (!product.value) return []
  const pid = product.value.id
  const accessory = product.value.images.filter(i => i.category === 'accessory')
  const existing = product.value.images.filter(i => i.category === 'detail')
  if (existing.length) return existing
  return [...accessory, ...generateDetailSlices(pid)]
})

const productGallery = computed(() => {
  if (!product.value) return []
  const main = product.value.images.filter(i => i.category === 'main')
  return main.length ? main : product.value.images
})

const specsColumns = [
  { title: 'Specification', dataIndex: 'specification', key: 'specification', width: '45%' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
]

const learnMoreCards = computed(() => {
  if (!product.value) return []
  return getLearnMoreCards(product.value.id, brandDisplayName.value)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.id !== product.value?.id).slice(0, 4)
})

const appSlidesPerView = computed(() => {
  if (windowWidth.value < 768) return 1
  if (windowWidth.value < 992) return 2
  return 3
})

const showVariants = computed(() => {
  return product.value?.variants?.length && !['my-108', 'my-208'].includes(product.value.id)
})

const showDetailImages = computed(() => {
  return product.value?.hasFullDetail && !['my-108', 'my-208', 'my-330'].includes(product.value.id)
})

function generateDetailSlices(productId: string): { src: string; alt: string }[] {
  const imgs: { src: string; alt: string }[] = []
  const ranges: Record<string, [string, number, number][]> = {
    'my-108': [['1', 1, 22]],
    'my-208': [['1', 1, 21], ['2', 1, 4]],
    'my-330': [['1', 1, 13], ['2', 1, 17]],
  }
  const range = ranges[productId]
  if (!range) return imgs
  const prefix = imagePrefix.value
  for (const [p, start, end] of range) {
    for (let i = start; i <= end; i++) {
      const num = i.toString().padStart(2, '0')
      imgs.push({ src: `${prefix}/${productId}/detail/${p}_${num}.webp`, alt: `Detail ${i}` })
    }
  }
  return imgs
}

function shareProduct(platform: string) {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(`${product.value?.model || ''} ${product.value?.name || ''}`)
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  }
  if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400')
}

function scrollToSpecs() {
  document.getElementById('specifications')?.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() { showStickyCta.value = window.scrollY > 600 }
function handleResize() { windowWidth.value = window.innerWidth }

onMounted(() => {
  const firstGroup = product.value?.specsGroups?.[0]
  if (firstGroup) activeSpecsTab.value = firstGroup.title
  handleResize()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.detail-page {
  font-family: 'DM Sans', 'Sora', sans-serif;
  background: var(--color-warm-white);
  min-height: 100vh;
  line-height: 1.7;
  overflow-x: hidden;
}

/* Brand-specific accent overrides */
.brand-partdro { --brand-accent: #e8941a; --brand-accent-light: #fef3c7; --brand-accent-glow: #fef3c7; }

.breadcrumb {
  max-width: 1480px; margin: 0 auto; padding: 16px 40px;
  color: var(--color-text-secondary); font-size: 14px;
}

/* Product Hero */
.product-hero { padding: 8px 40px 32px; max-width: 1480px; margin: 0 auto; }

.product-hero-container {
  background: #ffffff;
  border: 1px solid var(--color-warm-border);
  border-radius: var(--radius-xl);
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.product-image-section {
  background: var(--color-warm-cream);
  padding: 40px;
  position: relative;
}

.product-gallery {
  width: 100%; border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
}
.product-carousel { aspect-ratio: 1/1; }
.product-carousel :deep(.slick-slide) { aspect-ratio: 1/1; }
.product-carousel :deep(.slick-slide img),
.gallery-image { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1/1; }
.gallery-image :deep(.ant-image-img) { width: 100%; aspect-ratio: 1/1; object-fit: cover; }
.main-product-image {
  width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; border-radius: var(--radius-lg);
}

.product-badges { position: absolute; top: 20px; left: 20px; display: flex; gap: 8px; z-index: 2; flex-wrap: wrap; }

.stock-badge { padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; }
.stock-badge--brand { background: var(--brand-accent-light); color: var(--brand-accent); }
.stock-badge--best { background: #fef3c7; color: #b8860b; }
.stock-badge--new { background: #dbeafe; color: #1d4ed8; }

/* Info Section */
.product-info-section { padding: 56px; }
.product-category-link { margin-bottom: 16px; }
.product-category-link a { color: var(--brand-accent); font-weight: 600; font-size: 16px; }

.product-title {
  font-size: clamp(34px, 4vw, 50px); font-weight: 800; line-height: 1.08;
  letter-spacing: -0.03em; color: var(--color-navy); margin-bottom: 16px;
}
.product-tagline { font-size: 17px; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 24px; max-width: 640px; }

.feature-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
.feature-badge {
  padding: 10px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
  cursor: default; transition: all 0.25s ease;
  background: var(--color-warm-cream); color: var(--color-text-secondary);
  border: 1px solid var(--color-warm-border);
}
.feature-badge:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--brand-accent); color: var(--brand-accent); }

.product-accordion { margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; background: transparent; }
.product-accordion :deep(.ant-collapse-item) {
  background: #ffffff; border: 1px solid var(--color-warm-border) !important;
  border-radius: 16px; overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.product-accordion :deep(.ant-collapse-item:hover) { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.product-accordion :deep(.ant-collapse-header) { font-weight: 600 !important; padding: 20px 24px !important; font-size: 16px; border-radius: 16px !important; }
.product-accordion :deep(.ant-collapse-content-box) { padding: 0 24px 16px !important; }

.product-why-list, .product-features-list { list-style: none; padding: 0; margin: 0; }
.product-why-list li, .product-features-list li { padding: 6px 0; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; font-size: 15px; }
.why-icon, .feature-icon { color: var(--brand-accent); font-size: 16px; margin-top: 2px; flex-shrink: 0; }

.product-cta-buttons { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
.support-links { display: flex; gap: 24px; flex-wrap: wrap; }
.support-links :deep(.ant-btn-link) { color: var(--color-text-secondary); font-size: 15px; font-weight: 500; padding: 0; }

/* Learn More */
.learn-more-section { padding: 0 40px 24px; max-width: 1480px; margin: 0 auto; }
.learn-more-cards { display: flex; flex-direction: column; gap: 24px; }
.learn-more-card {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;
  background: #ffffff; border: 1px solid var(--color-warm-border);
  border-radius: var(--radius-xl); overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow-sm);
}
.learn-more-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.learn-more-card.card-reverse .learn-more-image { order: 2; }
.learn-more-card.card-reverse .learn-more-content { order: 1; padding: 32px 0 32px 40px; }
.learn-more-image { overflow: hidden; min-height: 300px; background: var(--color-warm-cream); display: flex; align-items: center; justify-content: center; }
.learn-more-image img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.6s ease; padding: 16px; }
.learn-more-card:hover .learn-more-image img { transform: scale(1.03); }
.learn-more-content { padding: 32px 40px 32px 0; display: flex; flex-direction: column; justify-content: center; }
.learn-more-title {
  font-size: 22px; font-weight: 700; font-family: 'Sora', sans-serif;
  color: var(--color-navy); margin-bottom: 8px; letter-spacing: -0.02em;
}
.learn-more-title::after { content: ''; display: block; width: 36px; height: 3px; background: var(--brand-accent); border-radius: 2px; margin-top: 10px; margin-bottom: 6px; }
.learn-more-description { font-size: 17px; color: var(--color-text-secondary); line-height: 1.8; }

/* Applications */
.applications-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.applications-carousel { max-width: 900px; margin: 0 auto; }
.applications-carousel :deep(.slick-slide) { padding: 0 12px; }
.application-card {
  background: #ffffff; border: 1px solid var(--color-warm-border);
  border-radius: var(--radius-lg); padding: 32px 20px; text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.application-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.application-icon-wrapper { width: 56px; height: 56px; margin: 0 auto 16px; background: var(--brand-accent-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.app-icon { font-size: 24px; color: var(--brand-accent); }
.application-card h3 { font-size: 15px; font-weight: 600; color: var(--color-navy); line-height: 1.4; }

/* Specs */
.specs-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.specs-tabs-wrapper { max-width: 900px; margin: 0 auto; }
.specs-tabs :deep(.ant-tabs-nav) { display: flex; justify-content: center; margin-bottom: 32px; }
.specs-tabs :deep(.ant-tabs-tab-active) { color: var(--brand-accent) !important; }
.specs-tabs :deep(.ant-tabs-ink-bar) { background: var(--brand-accent); }
.specs-table { border-radius: 12px; overflow: hidden; max-width: 900px; margin: 0 auto; }
.specs-table :deep(.ant-table-thead > tr > th) { background: var(--color-warm-cream); font-weight: 600; color: var(--color-navy); }
.specs-table :deep(.ant-table-tbody > tr > td) { font-size: 16px; color: var(--color-text-secondary); }
.specs-table :deep(.ant-table-tbody > tr:nth-child(even) > td) { background: var(--brand-accent-light); }
.specs-more { text-align: center; margin-top: 24px; }
.specs-more :deep(.ant-btn-link) { color: var(--brand-accent); font-weight: 500; }

/* FAQ */
.faq-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.faq-collapse { max-width: 900px; margin: 0 auto; background: transparent; }
.faq-collapse :deep(.ant-collapse-item) {
  background: #ffffff; border: 1px solid var(--color-warm-border) !important;
  border-radius: 16px; margin-bottom: 10px; overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.faq-collapse :deep(.ant-collapse-item:hover) { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.faq-collapse :deep(.ant-collapse-header) { font-weight: 600 !important; padding: 22px 24px !important; font-size: 16px; border-radius: 16px !important; }
.faq-collapse :deep(.ant-collapse-content-box) { padding: 0 24px 22px !important; }
.faq-answer { font-size: 16px; color: var(--color-text-secondary); line-height: 1.8; }

/* Related */
.related-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1480px; margin: 0 auto; }
.related-card { border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; border: 1px solid var(--color-warm-border); }
.related-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.related-cover { height: 180px; overflow: hidden; }
.related-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.related-card:hover .related-cover img { transform: scale(1.08); }

/* Shared section styles */
.section-container { max-width: 1480px; margin: 0 auto; padding: 32px 0; }
.section-title {
  font-size: 28px; font-weight: 700; text-align: center; margin-bottom: 32px;
  color: var(--color-navy); letter-spacing: -0.02em; font-family: 'Sora', sans-serif;
}
.section-title::after { content: ''; display: block; width: 48px; height: 3px; background: var(--brand-accent); border-radius: 2px; margin: 14px auto 0; }

/* Variants */
.variants-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.variants-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.variant-card { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-warm-border); }
.variant-cover { aspect-ratio: 1/1; overflow: hidden; background: var(--color-warm-cream); }
.variant-cover img { width: 100%; height: 100%; object-fit: cover; }
.variant-spec { font-size: 14px; color: var(--color-text-secondary); padding: 2px 0; }
.spec-label { font-weight: 500; color: var(--color-text); }

/* Detail images */
.detail-section { padding: 0 40px; max-width: 1480px; margin: 0 auto; }
.detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.detail-image { width: 100%; border-radius: var(--radius-md); }

/* CTA */
.cta-section { background: var(--gradient-navy); padding: 72px 40px; text-align: center; color: white; }
.cta-container h2 { font-size: 34px; font-weight: 700; margin-bottom: 14px; font-family: 'Sora', sans-serif; letter-spacing: -0.02em; color: var(--color-amber); }
.cta-container p { font-size: 18px; opacity: 0.85; margin-bottom: 32px; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.cta-btn-white { background: white !important; color: var(--color-navy) !important; border-color: white !important; }

/* Sticky CTA */
.sticky-cta-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--color-warm-border);
  padding: 16px 40px; z-index: 999;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.sticky-cta-bar.visible { transform: translateY(0); }
.sticky-cta-container { max-width: 1480px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
.sticky-cta-name { font-size: 18px; font-weight: 600; color: var(--color-navy); }

/* Not Found */
.not-found { padding: 100px 20px; text-align: center; }

/* Responsive */
@media (max-width: 1100px) {
  .product-hero-container { grid-template-columns: 1fr; }
  .product-title { font-size: 34px; letter-spacing: -0.02em; }
  .product-image-section { position: static; padding: 24px 24px 0; }
  .product-info-section { padding: 36px; }
  .product-hero { padding: 8px 16px 32px; }
  .learn-more-card { grid-template-columns: 1fr; gap: 0; }
  .learn-more-card.card-reverse .learn-more-image { order: -1; }
  .learn-more-card.card-reverse .learn-more-content { order: 1; padding: 24px; }
  .learn-more-image { aspect-ratio: 16/9; min-height: 180px; }
  .learn-more-content { padding: 24px; }
  .related-grid { grid-template-columns: repeat(2, 1fr); }
  .sticky-cta-name { display: none; }
  .sticky-cta-container { justify-content: center; }
  .cta-section { padding-bottom: 100px; }
}

@media (max-width: 768px) {
  .related-grid { grid-template-columns: 1fr; }
  .breadcrumb { padding: 12px 16px; font-size: 13px; }
  .product-hero { padding: 8px 8px 24px; }
  .product-image-section { padding: 16px 16px 0; }
  .product-info-section { padding: 24px 16px; }
  .product-title { font-size: 26px; letter-spacing: -0.01em; }
  .product-tagline { font-size: 15px; }
  .feature-badge { font-size: 12px; padding: 8px 12px; }
  .product-cta-buttons { flex-direction: column; gap: 12px; }
  .product-cta-buttons .ant-btn { width: 100%; }
  .learn-more-section { padding: 0 12px 16px; }
  .section-container { padding: 20px 0; }
  .section-title { font-size: 22px; margin-bottom: 24px; }
  .support-links { flex-direction: column; gap: 12px; }
  .sticky-cta-bar { padding: 12px 16px; }
  .cta-section { padding: 56px 20px; }
  .cta-container h2 { font-size: 26px; }
  .detail-grid { grid-template-columns: 1fr; }
  .variants-grid { grid-template-columns: 1fr; }
}
</style>
