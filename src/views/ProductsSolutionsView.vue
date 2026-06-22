<template>
  <div class="products-solutions-page">
    <!-- 导航栏 -->
    <Header />

    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Products & Solutions</h1>
        <p class="hero-subtitle">Premium drone solutions for consumers and businesses. From aerial photography to industrial inspection, find the perfect UAV for your mission.</p>
      </div>
    </section>

    <!-- Category Tabs -->
    <section class="categories-section">
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
    <section class="products-section">
      <div class="products-container">
        <div class="products-grid">
          <a-card 
            v-for="(product, index) in filteredProducts" 
            :key="product.id" 
            class="product-card" 
            hoverable
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
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
                  <a-tag color="green">{{ product.categoryName }}</a-tag>
                </div>
              </template>
            </a-card-meta>
            <div class="product-actions">
              <a-button type="primary" size="small" @click.stop="$router.push(`/product/${product.id}`)">
                Learn More
              </a-button>
              <a-button size="small" @click.stop="openWhatsAppForProduct(product)">
                Get Quote
              </a-button>
            </div>
          </a-card>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section" v-show="filteredProducts.length > 0">
      <div class="cta-content">
        <h2>Ready to Elevate Your Operations?</h2>
        <p>Contact us today for a personalized demo or quote</p>
        <div class="cta-buttons">
          <a-button type="primary" size="large" @click="openWhatsApp">Request a Demo</a-button>
          <a-button size="large" @click="$router.push('/contact_us')">Contact Us</a-button>
        </div>
      </div>
    </section>

    <!-- Empty State - Fallback if no products -->
    <section v-if="filteredProducts.length === 0" class="empty-state">
      <a-empty description="No products found in this category">
        <a-button type="primary" @click="selectedCategory = 'all'">View All Products</a-button>
      </a-empty>
    </section>

    <!-- Always show Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { categories, products, type Product } from '../data/products'
import PrecisionAgricultureIcon from '../components/icons/PrecisionAgricultureIcon.vue'
import PrecisionSprayingIcon from '../components/icons/PrecisionSprayingIcon.vue'
import LandLevelingIcon from '../components/icons/LandLevelingIcon.vue'
import LawnMowerIcon from '../components/icons/LawnMowerIcon.vue'
import AgriculturalRobotsIcon from '../components/icons/AgriculturalRobotsIcon.vue'
import MachineControlIcon from '../components/icons/MachineControlIcon.vue'

const route = useRoute()
const currentKeys = ref<string[]>(['products-solutions'])
const selectedCategory = ref('all')
const currentYear = new Date().getFullYear()

const categoryIcons: Record<string, any> = {
  'precision-agriculture': PrecisionAgricultureIcon,
  'precision-spraying': PrecisionSprayingIcon,
  'land-leveling': LandLevelingIcon,
  'lawn-mower': LawnMowerIcon,
  'agricultural-robotics': AgriculturalRobotsIcon,
  'machine-control': MachineControlIcon
}

const displayCategories = categories

onMounted(() => {
  const categoryParam = route.query.category as string
  if (categoryParam && categories.some(c => c.id === categoryParam)) {
    selectedCategory.value = categoryParam
  }
  window.scrollTo(0, 0)
})

watch(() => route.query.category, (newCategory) => {
  if (newCategory && categories.some(c => c.id === newCategory)) {
    selectedCategory.value = newCategory
    window.scrollTo(0, 0)
  }
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  window.scrollTo(0, 0)
}

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.category === selectedCategory.value)
})

const openWhatsApp = () => {
  const phoneNumber = '8613362853598'
  const message = 'Hello! I would like to learn more about Partdro drone solutions.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const openWhatsAppForProduct = (product: Product) => {
  const phoneNumber = '8613362853598'
  const message = `Hello! I'm interested in getting a quote for the ${product.name} (${product.code}). Could you please provide more information?`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}



const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

const handleFooterLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}
</script>

<style scoped>
.products-solutions-page {
  font-family: 'Barlow', 'Barlow', 'Barlow', sans-serif;
  min-height: 100vh;
}

/* 标题字体 */
.hero-title {
  font-family: 'Barlow', 'Barlow', sans-serif;
  font-weight: 700;
  line-height: 1.3;
}

.section-title {
  font-family: 'Barlow', 'Barlow', sans-serif;
  font-weight: 600;
  line-height: 1.3;
}

/* 导航栏 */
.header {
  background: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
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

.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.nav-menu :deep(.ant-menu-item) {
  padding: 0 12px !important;
  font-size: clamp(14px, 1.1vw, 16px);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.demo-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 500;
}

/* Hero */
.hero-section {
  background: linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 100%);
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px);
  text-align: center;
}

.hero-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: clamp(12px, 1.5vw, 16px);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(16px, 1.3vw, 18px);
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Categories */
.categories-section {
  padding: 20px clamp(16px, 3vw, 24px);
  background: white;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 64px;
  z-index: 100;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}

.category-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-tab {
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 20px;
}

/* Products Grid */
.products-section {
  padding: clamp(32px, 4vw, 48px) clamp(16px, 3vw, 24px);
  background: #f8f9fa;
}

.products-container {
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: 24px;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-cover {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.product-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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
  margin-bottom: 8px;
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
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.product-actions :deep(.ant-btn) {
  flex: 1;
  height: 40px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px);
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 12px;
}

.cta-content p {
  font-size: clamp(16px, 1.3vw, 18px);
  opacity: 0.9;
  margin-bottom: 24px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .ant-btn {
  padding: 8px 32px;
  height: auto;
  font-size: 16px;
}

.cta-buttons .ant-btn-primary {
  background: white;
  color: #1888c8;
  border: none;
}

.cta-buttons .ant-btn-default {
  background: transparent !important;
  border-color: white;
  color: white;
}

.cta-buttons .ant-btn-default:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: white;
  color: white;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  background: #f8f9fa;
}

.cta-buttons .ant-btn-default:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: white;
  color: white;
}

/* Footer */
.footer {
  background: #1a252f;
  color: white;
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px) 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-logo-image {
  width: 100px;
  height: auto;
  object-fit: contain;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #1888c8;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0;
  font-size: 14px;
}

.footer-bottom {
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* Dropdown styles */
.dropdown-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-icon {
  font-size: 10px;
  margin-left: 2px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon {
  font-size: 16px;
  color: #1888c8;
}

.view-all {
  color: #1888c8;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 16px 0;
  }
  
  .nav-menu {
    margin: 12px 0;
  }
  
  .hero-section {
    padding: 40px 16px;
  }
  
  .categories-section {
    top: auto;
  }
}
</style>
