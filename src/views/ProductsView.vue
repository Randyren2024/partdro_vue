<template>
  <div class="products-page">
    <!-- 导航栏 -->
    <Header />
    
<!-- Hero Banner -->
    <section class="hero-section" v-motion-fade-visible :delay="100">
      <div class="hero-content" v-motion-slide-visible-bottom :delay="200">
        <h1 class="hero-title">Our Products</h1>
        <p class="hero-subtitle">Discover high-performance systems designed to power your field operations with accuracy, efficiency, and reliability</p>
      </div>
    </section>

    <!-- Category Tabs -->
    <section class="categories-section" v-motion-fade-visible :delay="300">
      <div class="categories-container">
        <div class="category-tabs">
          <a-button 
            :type="selectedCategory === 'all' ? 'primary' : 'default'"
            class="category-tab"
            @click="selectedCategory = 'all'"
          >
            All
          </a-button>
          <a-button 
            v-for="cat in displayCategories"
            :key="cat.id"
            :type="selectedCategory === cat.id ? 'primary' : 'default'"
            class="category-tab"
            @click="selectedCategory = cat.id"
          >
            {{ cat.name }}
          </a-button>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section" v-motion-fade-visible :delay="400">
      <div class="products-container">
        <div class="products-grid">
          <a-card 
            v-for="(product, index) in filteredProducts" 
            :key="product.id" 
            class="product-card" 
            hoverable
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 + 500 } }"
            @click="$router.push(`/product/${product.id}`)"
          >
            <template #cover>
              <div class="product-cover">
                <img :src="product.image" :alt="product.name" />
                <div class="product-badges">
                  <a-tag v-if="product.isBestSeller" color="gold">Best Seller</a-tag>
                  <a-tag v-if="product.isNew" color="green">New</a-tag>
                </div>
              </div>
            </template>
            <a-card-meta :title="product.code + ' ' + product.name">
              <template #description>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-category">
                  <a-tag>{{ product.categoryName }}</a-tag>
                </div>
              </template>
            </a-card-meta>
            <div class="product-actions">
              <a-button type="primary" size="small" @click.stop="$router.push(`/product/${product.id}`)">
                Learn More
              </a-button>
              <a-button size="small" @click.stop="openWhatsApp(product)">
                Get Quote
              </a-button>
            </div>
          </a-card>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { LinkedinOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { categories, products, type Product } from '../data/products'

const route = useRoute()
const current = ref<string[]>(['products'])
const logoError = ref(false)
const footerLogoError = ref(false)
const selectedCategory = ref('all')
const currentYear = new Date().getFullYear()

onMounted(() => {
  const categoryParam = route.query.category as string
  if (categoryParam && categories.some(c => c.id === categoryParam)) {
    selectedCategory.value = categoryParam
  }
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.category === selectedCategory.value)
})

const handleLogoError = (event: Event) => {
  logoError.value = true
}

const handleFooterLogoError = (event: Event) => {
  footerLogoError.value = true
}

const openWhatsApp = (product: Product) => {
  const phoneNumber = '61448290926'
  const message = `Hello! I'm interested in getting a quote for the ${product.name} (${product.code}). Could you please provide more information?`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<style scoped>
.products-page {
  font-family: 'Noto Sans', 'Noto Sans SC', 'Inter', sans-serif;
}

.header {
  background: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 0;
  flex-wrap: wrap;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-image {
  width: 120px;
  height: auto;
  object-fit: contain;
}

.logo-fallback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 40px;
  padding: 0 12px;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  border-radius: 8px;
  color: white;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.logo-subtext {
  font-size: 12px;
  font-weight: 500;
}

.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.nav-menu :deep(.ant-menu-item) {
  padding: 0 16px !important;
  font-size: 15px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.demo-btn {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  border: none;
  font-weight: 500;
}

.hero-section {
  background: linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%);
  padding: 60px 20px;
  text-align: center;
}

.hero-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.categories-section {
  background: white;
  padding: 24px 20px;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 64px;
  z-index: 100;
}

.categories-container {
  max-width: 1400px;
  margin: 0 auto;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.category-tab {
  font-size: 14px;
  padding: 8px 20px;
}

.products-section {
  padding: 40px 20px 80px;
  background: #f8f9fa;
}

.products-container {
  max-width: 1400px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.product-cover {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #f0f0f0;
}

.product-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-cover img {
  transform: scale(1.1);
}

.product-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
}

.product-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  margin-top: 8px;
}

.product-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.product-actions :deep(.ant-btn) {
  flex: 1;
}

.footer {
  background: #1a252f;
  color: white;
  padding: 60px 20px 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo-image {
  width: 100px;
}

.footer-logo-fallback {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  padding: 8px 12px;
  border-radius: 8px;
}

.footer-logo-text {
  font-size: 18px;
  font-weight: 700;
}

.footer-logo-subtext {
  font-size: 11px;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #52c41a;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 16px 0;
  }
  
  .nav-menu {
    margin: 16px 0;
  }
  
  .categories-section {
    top: 140px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>