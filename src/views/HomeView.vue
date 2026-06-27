<template>
  <div class="home">
    <!-- 导航栏 -->
    <Header />
    <!-- 下面是旧的导航栏代码备份参考：
    <a-layout-header class="header">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <img src="/logo.webp" alt="Partdro AgriTech" class="logo-image" @error="handleLogoError" />
        </div>
        <a-menu v-model:selectedKeys="current" mode="horizontal" class="nav-menu">
          <a-menu-item key="home" @click="$router.push('/')">Home</a-menu-item>
          <a-menu-item key="products-solutions" @click="$router.push('/products-solutions')">Products & Solutions</a-menu-item>
          <a-menu-item key="about" @click="$router.push('/about_us')">About Us</a-menu-item>
          <a-menu-item key="contact" @click="$router.push('/contact_us')">Contact Us</a-menu-item>
        </a-menu>
        <div class="header-actions">
          <a-button type="primary" class="demo-btn" @click="openWhatsApp">Request Demo</a-button>
        </div>
      </div>
    </a-layout-header>
    旧导航栏代码结束 -->
    
    <!-- 英雄区域 - 产品轮播图 -->
    <section class="hero-section" v-motion-fade-visible>
      <div class="hero-content" v-motion-slide-visible-bottom :delay="100">
        <h1 class="hero-title">Take Flight with Partdro</h1>
        <p class="hero-subtitle">
          Your trusted destination for premium drones — from consumer aerial photography to enterprise-grade industrial UAV solutions
        </p>
        <div class="hero-actions">
          <a-button type="primary" size="large" class="primary-btn" @click="$router.push('/products-solutions')">
            Explore Products & Solutions
          </a-button>
        </div>
      </div>

      <div class="carousel-wrapper">
        <div class="carousel-info">
          <transition name="fade-slide" mode="out-in">
            <div :key="currentSlide" class="info-content">
              <span class="product-tag">{{ carouselProducts[currentSlide].tag }}</span>
              <h2 class="info-title">{{ carouselProducts[currentSlide].title }}</h2>
              <p class="info-description">{{ carouselProducts[currentSlide].description }}</p>
              <a-button type="primary" @click="$router.push(carouselProducts[currentSlide].link)">
                Learn More
              </a-button>
            </div>
          </transition>

          <div class="carousel-controls">
            <button
              class="control-btn"
              @click="prevSlide"
              :aria-label="'Previous: ' + carouselProducts[(currentSlide - 1 + 3) % 3].title"
            >
              <span class="control-icon">‹</span>
            </button>
            <div class="carousel-dots" role="tablist" :aria-label="'Product slides'">
              <button
                v-for="(product, index) in carouselProducts"
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                role="tab"
                :aria-selected="currentSlide === index"
                :aria-label="product.title"
                @click="goToSlide(index)"
              ></button>
            </div>
            <button
              class="control-btn"
              @click="nextSlide"
              :aria-label="'Next: ' + carouselProducts[(currentSlide + 1) % 3].title"
            >
              <span class="control-icon">›</span>
            </button>
          </div>
        </div>

        <div
          class="carousel-image"
          role="region"
          aria-label="Product showcase carousel"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          @keydown="handleKeydown"
          tabindex="0"
        >
          <transition name="fade" mode="out-in">
            <img
              :key="currentSlide"
              :src="carouselProducts[currentSlide].image"
              :alt="carouselProducts[currentSlide].imageAlt"
              @error="(e) => e.target.src = images.fallback.carousel[currentSlide]"
            />
          </transition>
          <button
            class="play-pause-btn"
            @click="toggleAutoPlay"
            :aria-label="isPlaying ? 'Pause slideshow' : 'Play slideshow'"
          >
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions-section">
      <div class="section-header" v-motion-slide-visible-bottom :delay="400">
        <h2 class="section-title">Drone Categories</h2>
        <p class="section-subtitle">Explore our full range of UAV solutions for every mission</p>
      </div>
      <div class="solutions-grid">
        <a-card 
          v-for="(category, index) in displayedCategories" 
          :key="category.id" 
          class="solution-card" 
          hoverable
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 + 500 } }"
          @click="$router.push(`/products-solutions?category=${category.id}`)"
        >
          <template #cover>
            <div :class="`card-cover ${category.id}`">
              <img 
                :src="getCategoryImage(category.id)" 
                :alt="category.name" 
                @error="(e) => e.target.src = images.fallback.solutions.precision"
              />
            </div>
          </template>
          <a-card-meta :title="category.name">
            <template #description>
              {{ category.description }}
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </section>

<!-- 产品展示 -->
    <section class="products-section">
      <div class="section-header" v-motion-slide-visible-bottom :delay="600">
        <h2 class="section-title">Featured Drones</h2>
        <p class="section-subtitle">Top-selling UAVs trusted by professionals worldwide</p>
      </div>
      <div class="products-grid">
         <a-card 
            v-for="(product, index) in displayedProducts" 
            :key="product.id" 
            class="product-card" 
            hoverable
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: index * 100 + 700 } }"
            @click="$router.push(`/product/${product.id}`)"
          >
            <template #cover>
              <div :class="`product-cover ${product.id}`">
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  @error="(e) => e.target.src = images.fallback.products.sm200"
                />
              </div>
            </template>
            <a-card-meta :title="product.name">
              <template #description>
                {{ product.description }}
              </template>
            </a-card-meta>
            <div class="product-actions">
              <a-button type="primary" size="small" @click="$router.push(`/product/${product.id}`)">Learn More</a-button>
              <a-button size="small" @click="openWhatsAppForProduct(product.name)">Get Quote</a-button>
            </div>
          </a-card>
      </div>
    </section>



    <!-- Our Values -->
    <section class="values-section">
      <div class="section-header" v-motion-slide-visible-bottom :delay="900">
        <h2 class="section-title">Our Values</h2>
        <p class="section-subtitle">What drives us forward</p>
      </div>
      <div class="values-grid">
        <div
          v-for="(value, index) in valueItems"
          :key="index"
          class="value-card"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 + 1000 } }"
        >
          <div class="value-icon" :class="`value-${index + 1}`">
            <img :src="value.icon" :alt="value.title" />
          </div>
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-description">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LinkedinOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { categories, products, getBestSellers } from '../data/products'

const current = ref<string[]>(['home'])

const displayedCategories = categories.filter(
  c => c.id === 'consumer-drones' || c.id === 'agriculture-drones'
)
const displayedProducts = getBestSellers().slice(0, 3)



const valueItems = [
  {
    icon: '/images/icons/technical-excellence.png',
    title: 'Technical Excellence',
    description: 'Maintaining the highest standards in product selection and technical validation, ensuring every solution meets rigorous quality benchmarks.'
  },
  {
    icon: '/images/icons/customer-partnership.png',
    title: 'Customer Partnership',
    description: 'Viewing clients as long-term partners, providing comprehensive support from product selection to after-sales service.'
  },
  {
    icon: '/images/icons/market-intelligence.png',
    title: 'Market Intelligence',
    description: 'Deep understanding of both Chinese manufacturing capabilities and global market needs for optimal product-market fit.'
  },
  {
    icon: '/images/icons/localized-service.png',
    title: 'Localized Service',
    description: 'Building deep, localized service systems to truly serve global customers with complete solutions, not just products.'
  }
]

const categoryImages: Record<string, string> = {
  'consumer-drones': '/images/mini-x/hero.jpg',
  'agriculture-drones': '/images/fp700/hero.png'
}

const getCategoryImage = (categoryId: string): string => {
  return categoryImages[categoryId] || images.fallback.solutions[categoryId] || images.fallback.solutions.precision
}

const images = {
  carousel: [
    '/images/3U9A0093.webp',
    '/images/pexels-nc-farm-bureau-mark-2889442.webp',
    '/images/harvest-1543064.webp'
  ],
  solutions: {
    precision: '/images/pexels-nc-farm-bureau-mark-26256448.webp',
    robotics: '/images/harvest-1543064.webp',
    iot: '/images/agriculture-6502282.webp',
    data: '/images/sunrise-8218442.webp'
  },
  products: {
    sm200: '/images/agriculture-6502282.webp',
    ar300: '/images/harvest-1543064.webp',
    vg100: '/images/3U9A0093.webp'
  },
  fallback: {
    carousel: [
      '/images/3U9A0093.webp',
      '/images/pexels-nc-farm-bureau-mark-2889442.webp',
      '/images/harvest-1543064.webp'
    ],
    solutions: {
      precision: '/images/pexels-nc-farm-bureau-mark-26256448.webp',
      robotics: '/images/3U9A0093.webp',
      iot: '/images/agriculture-6502282.webp',
      data: '/images/sunrise-8218442.webp',
      spraying: '/images/agriculture-6502282.webp',
      'land-leveling': '/images/pexels-wolfgang-weiser-467045605-34239949.webp',
      'machine-control': '/images/pexels-vladimirsrajber-18431208.webp'
    },
    products: {
      sm200: '/images/agriculture-6502282.webp',
      ar300: '/images/harvest-1543064.webp',
      vg100: '/images/3U9A0093.webp'
    }
  }
}
const currentSlide = ref(0)
const autoPlayInterval = ref<NodeJS.Timeout | null>(null)
const isPlaying = ref(true)
const touchStartX = ref(0)
const touchEndX = ref(0)

const carouselProducts = [
  {
    tag: 'Consumer',
    title: 'Aerial Photography Drones',
    description: 'Capture breathtaking 4K/8K aerial footage with intelligent flight modes, obstacle avoidance, and extended battery life.',
    image: '/images/pexels-nc-farm-bureau-mark-2889442.webp',
    imageAlt: 'Consumer Aerial Photography Drone',
    link: '/products-solutions?category=consumer-drones'
  },
  {
    tag: 'Enterprise',
    title: 'Industrial Inspection UAVs',
    description: 'Professional-grade drones with thermal imaging, LiDAR, and multispectral payloads for surveying, inspection, and public safety.',
    image: '/images/3U9A0093.webp',
    imageAlt: 'Enterprise Industrial Inspection UAV',
    link: '/products-solutions?category=enterprise-drones'
  },
  {
    tag: 'Agriculture',
    title: 'Smart Agricultural Drones',
    description: 'Precision spraying, seeding, and crop monitoring drones that reduce chemical use by up to 30% while boosting yields.',
    image: '/images/harvest-1543064.webp',
    imageAlt: 'Smart Agricultural Spraying Drone',
    link: '/products-solutions?category=agriculture-drones'
  }
]

// 版权年份 - 显示起始年份到当前年份
const copyrightYear = (() => {
  const startYear = 2024
  const currentYear = new Date().getFullYear()
  
  // 如果当前年份大于起始年份，显示范围（如2024-2026）
  // 否则只显示当前年份
  return currentYear > startYear ? `${startYear}-${currentYear}` : currentYear.toString()
})()

// 打开WhatsApp联系
const openWhatsApp = () => {
  const phoneNumber = '8613362853598'
  const message = 'Hello! I would like to learn more about Partdro drone solutions.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// 为特定产品打开WhatsApp获取报价
const openWhatsAppForProduct = (productName: string) => {
  const phoneNumber = '8613362853598'
  const message = `Hello! I'm interested in getting a quote for the ${productName}. Could you please provide more information?`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// 获取图片URL，如果本地图片不存在则使用备用图片
const getImageUrl = (type: string, key?: string | number) => {
  try {
    if (type === 'carousel' && typeof key === 'number') {
      return images.carousel[key] || images.fallback.carousel[key]
    }
    if (type === 'solutions' && typeof key === 'string') {
      return images.solutions[key as keyof typeof images.solutions] || 
             images.fallback.solutions[key as keyof typeof images.fallback.solutions]
    }
    if (type === 'products' && typeof key === 'string') {
      return images.products[key as keyof typeof images.products] || 
             images.fallback.products[key as keyof typeof images.fallback.products]
    }
  } catch (error) {
    console.error('Error getting image URL:', error)
  }
  
  // 默认返回第一个备用图片
  return images.fallback.carousel[0]
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('Header logo WebP failed to load, falling back to PNG')
  // 尝试回退到PNG版本
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

const handleFooterLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('Footer logo WebP failed to load, falling back to PNG')
  // 尝试回退到PNG版本
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselProducts.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselProducts.length) % carouselProducts.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const toggleAutoPlay = () => {
  if (isPlaying.value) {
    stopAutoPlay()
  } else {
    startAutoPlay()
  }
  isPlaying.value = !isPlaying.value
}

const startAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.home {
  font-family: 'Barlow', 'Barlow', 'Barlow', sans-serif;
}

/* 导航栏样式 - 改进响应式 */
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
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
}

.logo-image {
  width: 120px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

/* 如果logo加载失败，显示备用样式 */
.logo-image[src*="logo.png"]:not([src]) {
  display: none;
}

.logo-image:not([src]), 
.logo-image[src=""] {
  display: none;
}

/* 备用logo样式 */
.logo-fallback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
  padding: 0 12px;
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border-radius: 8px;
  color: white;
  flex-shrink: 0;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
}

.logo-subtext {
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  opacity: 0.9;
}

/* Footer备用logo样式 */
.footer-logo-fallback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
  padding: 0 12px;
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border-radius: 8px;
  color: white;
}

.footer-logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
}

.footer-logo-subtext {
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  opacity: 0.9;
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
  flex-shrink: 0;
}

.demo-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 500;
  white-space: nowrap;
  font-size: clamp(14px, 1.1vw, 16px);
  padding: 8px 16px;
  height: auto;
}

/* 英雄区域 - 产品轮播图 */
.hero-section {
  background: linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 100%);
  padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px);
  scroll-margin-top: 100px;
}

.hero-content {
  text-align: center;
  margin-bottom: clamp(40px, 5vw, 60px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.hero-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: clamp(16px, 2vw, 24px);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #666;
  margin-bottom: clamp(24px, 3vw, 40px);
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: clamp(12px, 1.5vw, 16px);
  flex-wrap: wrap;
  justify-content: center;
}

.primary-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 500;
  padding: 0 clamp(20px, 2.5vw, 32px);
  height: clamp(40px, 4vw, 48px);
  font-size: clamp(14px, 1.1vw, 16px);
}

/* 轮播图新布局 */
.carousel-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(24px, 4vw, 48px);
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.carousel-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-title {
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.2;
}

.info-description {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.carousel-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background: #f5f7fa;
  aspect-ratio: 1 / 1;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-image:focus {
  outline: 2px solid #1888c8;
  outline-offset: 4px;
}

.play-pause-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.play-pause-btn:hover {
  background: #1888c8;
  color: white;
  transform: scale(1.1);
}

.product-tag {
  display: inline-block;
  background: rgba(82, 196, 26, 0.95);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 600;
  align-self: flex-start;
}

/* 轮播控制 */
.carousel-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #666;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: #1888c8;
  border-color: #1888c8;
  color: white;
}

.control-icon {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.carousel-dots {
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e8e8e8;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot.active {
  background: #1888c8;
  transform: scale(1.3);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .carousel-wrapper {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .carousel-image {
    order: -1;
    aspect-ratio: 16 / 9;
  }

  .carousel-info {
    text-align: center;
    align-items: center;
  }

  .product-tag {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .carousel-image {
    border-radius: 12px;
  }

  .control-btn {
    width: 40px;
    height: 40px;
  }

  .play-pause-btn {
    width: 40px;
    height: 40px;
    top: 12px;
    right: 12px;
  }
}

/* 解决方案 - 改进响应式 */
.solutions-section {
  padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px);
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: clamp(32px, 4vw, 48px);
}

.section-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(30px, 3.2vw, 40px);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: clamp(12px, 1.5vw, 16px);
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #666;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: clamp(20px, 2.5vw, 24px);
}

.solution-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-cover:hover img {
  transform: scale(1.1);
}

.card-cover.precision::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(183, 235, 143, 0.3), rgba(149, 222, 100, 0.3));
}

.card-cover.robotics::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(145, 213, 255, 0.3), rgba(105, 192, 255, 0.3));
}

.card-cover.iot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(211, 173, 247, 0.3), rgba(179, 127, 235, 0.3));
}

.card-cover.data::after,
.card-cover.livestock-management::after,
.card-cover.machine-control::after,
.card-cover.partdro-service::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 214, 102, 0.3), rgba(255, 197, 61, 0.3));
}

/* 产品展示 - 改进响应式 */
.products-section {
  padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px);
  background: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: clamp(24px, 3vw, 32px);
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-cover {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.product-cover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.3), rgba(56, 158, 13, 0.3));
}

.product-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-cover:hover img {
  transform: scale(1.1);
}

.product-cover.vg100::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.4), rgba(56, 158, 13, 0.4));
}

.product-cover.ar300::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.4), rgba(9, 109, 217, 0.4));
}

.product-cover.sm200::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(114, 46, 209, 0.4), rgba(83, 29, 171, 0.4));
}

.product-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  justify-content: stretch;
}

.product-actions :deep(.ant-btn) {
  flex: 1;
  height: 40px;
}

/* Why Choose Us Section */
.why-choose-section {
  padding: 80px 0;
  background: #f8f9fa;
}

/* Reusing stats-section for Why Choose Us */
.stats-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(30px, 3.2vw, 40px);
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 500;
  color: #636264;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.stat-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.stat-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* Our Values Section */
.values-section {
  padding: 80px 0;
  background: white;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.value-card {
  text-align: center;
  padding: 40px 20px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-icon img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.value-1 { background: linear-gradient(135deg, #b7eb8f, #95de64); }
.value-2 { background: linear-gradient(135deg, #91d5ff, #69c0ff); }
.value-3 { background: linear-gradient(135deg, #ffd666, #ffc53d); }
.value-4 { background: linear-gradient(135deg, #d3adf7, #b37feb); }

.value-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.value-description {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}

/* 页脚 - 改进响应式 */
.footer {
  background: #1a252f;
  color: white;
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px) 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(24px, 3vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 16px);
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo-image {
  width: 80px;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: clamp(14px, 1.2vw, 16px);
}

.footer-title {
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 600;
  margin-bottom: clamp(6px, 0.8vw, 8px);
  color: white;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
  font-size: clamp(14px, 1.2vw, 16px);
}

.footer-link:hover {
  color: #1888c8;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.7);
  margin: clamp(3px, 0.5vw, 4px) 0;
  font-size: clamp(14px, 1.2vw, 16px);
}

.footer-bottom {
  text-align: center;
  margin-top: clamp(24px, 3vw, 40px);
  padding-top: clamp(16px, 2vw, 24px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(14px, 1.2vw, 16px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 40px 16px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-actions {
    justify-content: center;
  }

  .section-title {
    font-size: 28px;
  }

  .header-content {
    flex-direction: column;
    height: auto;
    padding: 16px 0;
  }

  .nav-menu {
    margin: 16px 0;
  }
}
</style>