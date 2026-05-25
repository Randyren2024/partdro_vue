<template>
  <PageLayout>
    <PageHero :title="$t('products.title')" :subtitle="$t('products.subtitle')" />

    <section class="category-section" :style="{ top: 'var(--header-height)' }">
      <div class="category-tabs">
        <a-button
          v-for="tab in categoryTabs"
          :key="tab.key"
          :type="activeCategory === tab.key ? 'primary' : 'default'"
          class="tab-btn"
          @click="activeCategory = tab.key"
        >{{ tab.label }}</a-button>
      </div>
    </section>

    <section class="products-section bp-grid-light">
      <div class="products-grid" v-if="filteredProducts.length">
        <a-card
          v-for="(product, idx) in filteredProducts"
          :key="product.id"
          class="product-card card-hover"
          hoverable
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: idx * 80 } }"
          @click="$router.push(`/products/${product.id}`)"
        >
          <template #cover>
            <div class="product-cover">
              <img :src="product.images[0]?.src || '/images/placeholder.png'" :alt="product.name" loading="lazy" decoding="async" />
              <div class="product-badges">
                <a-tag v-if="product.isNew" color="blue">New</a-tag>
                <a-tag v-if="product.isFeatured" color="gold">Featured</a-tag>
              </div>
            </div>
          </template>
          <a-card-meta :title="product.name">
            <template #description>
              <p class="product-desc">{{ product.tagline }}</p>
              <div class="product-meta">
                <a-tag color="blue">{{ product.categoryName }}</a-tag>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
      <a-empty v-else :description="$t('products.noProducts')" />
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2>{{ $t('products.needCustom') }}</h2>
        <p>{{ $t('products.needCustomSub') }}</p>
        <a-button size="large" class="btn-pill-primary cta-btn-inverse" @click="openWhatsApp()">
          {{ $t('home.getQuote') }}
        </a-button>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageLayout from '../components/layout/PageLayout.vue'
import PageHero from '../components/common/PageHero.vue'
import { useWhatsApp } from '../composables/useWhatsApp'
import { products } from '../data/products'
import { activeCategories } from '../data/categories'

const { t } = useI18n()
const route = useRoute()
const { openWhatsApp } = useWhatsApp()
const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter(p => p.category === activeCategory.value)
})

const categoryTabs = [
  { key: 'all', label: t('products.all') },
  ...activeCategories.map(c => ({ key: c.slug, label: c.name })),
]

onMounted(() => {
  const catParam = route.query.category as string
  if (catParam && activeCategories.some(c => c.slug === catParam)) {
    activeCategory.value = catParam
  }
})
</script>

<style scoped>
.category-section {
  padding: 16px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-warm-border);
  position: sticky;
  z-index: 100;
}
.category-tabs {
  display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
  max-width: 1200px; margin: 0 auto;
}
.tab-btn { padding: 8px 22px; border-radius: 999px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; }

.products-section { padding: clamp(32px, 4vw, 56px) clamp(16px, 3vw, 24px); max-width: 1260px; margin: 0 auto; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 28px; }
.product-card { border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; border: 1px solid var(--color-warm-border); background: #ffffff; }
.product-cover { position: relative; aspect-ratio: 1/1; overflow: hidden; background: var(--color-warm-cream); }
.product-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1); }
.product-card:hover .product-cover img { transform: scale(1.06); }
.product-badges { position: absolute; top: 12px; left: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
.product-desc { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
.product-meta { display: flex; gap: 12px; align-items: center; margin-top: 10px; flex-wrap: wrap; }

.cta-section { padding: clamp(48px, 5vw, 72px) 24px; text-align: center; color: white; background: var(--gradient-navy); }
.cta-content h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 12px; letter-spacing: -0.02em; }
.cta-content p { font-size: 17px; opacity: 0.85; margin-bottom: 28px; }
.cta-btn-inverse { background: white !important; color: var(--color-navy) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important; }
.cta-btn-inverse:hover { box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22) !important; }

@media (max-width: 768px) { .category-section { top: 60px !important; } }
</style>
