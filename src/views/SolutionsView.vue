<template>
  <div class="solutions-page">
    <!-- 导航栏 -->
    <Header />
    
    <!-- Hero Banner -->
    <section class="hero-section" v-motion-fade-visible :delay="100">
      <div class="hero-content" v-motion-slide-visible-bottom :delay="200">
        <h1 class="hero-title">Solutions</h1>
        <p class="hero-subtitle">Comprehensive agricultural technology solutions for modern farming</p>
      </div>
    </section>

    <!-- Solutions Grid -->
    <section class="solutions-section" v-motion-fade-visible :delay="300">
      <div class="solutions-container">
        <div v-for="(category, catIndex) in categories" :key="category.id" class="solution-category">
          <div class="category-header" v-motion-slide-visible-bottom :delay="300">
            <h2 class="category-title">{{ category.name }}</h2>
            <p class="category-description">{{ category.description }}</p>
          </div>
          <div class="solutions-grid">
            <a-card 
              v-for="(product, prodIndex) in getProductsByCategory(category.id)" 
              :key="product.id" 
              class="solution-card" 
              hoverable
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: catIndex * 100 + prodIndex * 50 + 400 } }"
              @click="$router.push(`/product/${product.id}`)"
            >
              <template #cover>
                <div class="solution-cover">
                  <img :src="product.image" :alt="product.name" />
                </div>
              </template>
              <a-card-meta :title="product.code + ' ' + product.name">
                <template #description>
                  <p class="solution-description">{{ product.description.substring(0, 80) }}...</p>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" v-motion-fade-visible :delay="600">
      <div class="cta-container" v-motion-slide-visible-bottom :delay="600">
        <h2>Need a Custom Solution?</h2>
        <p>Contact us to discuss your specific agricultural needs</p>
        <a-button type="primary" size="large" @click="$router.push('/contact_us')">
          Contact Us
        </a-button>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LinkedinOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { categories, getProductsByCategory } from '../data/products'

const current = ref<string[]>(['solutions'])
const logoError = ref(false)
const footerLogoError = ref(false)
const currentYear = new Date().getFullYear()

const handleLogoError = (event: Event) => {
  logoError.value = true
}

const handleFooterLogoError = (event: Event) => {
  footerLogoError.value = true
}

const openWhatsApp = () => {
  const phoneNumber = '61448290926'
  const message = 'Hello! I would like to request a demo of Vesper AgriTech solutions.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<style scoped>
.solutions-page {
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
}

.logo-fallback {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  padding: 4px 12px;
  border-radius: 8px;
  color: white;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
}

.logo-subtext {
  font-size: 12px;
}

.nav-menu {
  border: none;
  background: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.demo-btn {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  border: none;
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
}

.solutions-section {
  padding: 60px 20px;
  background: #f8f9fa;
}

.solutions-container {
  max-width: 1400px;
  margin: 0 auto;
}

.solution-category {
  margin-bottom: 60px;
}

.category-header {
  margin-bottom: 32px;
  text-align: center;
}

.category-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 12px;
}

.category-description {
  font-size: 16px;
  color: #666;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.solution-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.solution-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.solution-cover {
  height: 200px;
  overflow: hidden;
}

.solution-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solution-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.cta-section {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.cta-container h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-container p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.cta-container .ant-btn {
  background: white;
  color: #2e7d32;
  border: none;
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

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  cursor: pointer;
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
    margin-top: 16px;
  }
}
</style>