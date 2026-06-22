<template>
  <div class="about">
    <!-- 导航栏 -->
    <Header />
    <!-- 旧导航栏备份：
    <a-layout-header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="/logo.png" alt="Partdro AgriTech" class="logo-image" @error="handleLogoError" />
        </div>
        <a-menu v-model:selectedKeys="current" mode="horizontal" class="nav-menu">
          <a-menu-item key="home" @click="$router.push('/')">Home</a-menu-item>
          <a-menu-item key="solutions" @click="$router.push('/solutions')">Solutions</a-menu-item>
          <a-menu-item key="products" @click="$router.push('/products-solutions')">Products & Solutions</a-menu-item>
          <a-menu-item key="about" @click="$router.push('/about_us')">About Us</a-menu-item>
          <a-menu-item key="contact" @click="$router.push('/contact_us')">Contact Us</a-menu-item>
        </a-menu>
        <div class="header-actions">
          <a-button type="primary" class="demo-btn" @click="openWhatsApp">Request Demo</a-button>
        </div>
      </div>
    </a-layout-header>
    旧导航栏结束 -->
    
    <!-- Hero Section -->
    <section class="hero-section" v-motion-fade-visible :delay="100">
      <div class="hero-image-container">
        <img 
          :src="getImageUrl('about', 'hero')" 
          alt="Partdro AgriTech - About Us"
          class="hero-img"
          @error="(e) => handleImageError(e, images.fallback.about.hero)"
        />
        <div class="hero-overlay" v-motion-slide-visible-bottom :delay="200">
          <h1 class="hero-title">Premium Drone Solutions for Every Mission</h1>
          <p class="hero-subtitle">Your trusted partner for consumer and enterprise UAV solutions</p>
        </div>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="intro-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <div class="section-header" v-motion-slide-visible-bottom :delay="300">
          <h2 class="section-title">About Partdro</h2>
          <p class="section-subtitle">Your trusted partner for premium drone solutions</p>
        </div>
        <div class="intro-content">
          <div class="intro-text">
            <p class="intro-paragraph">
              Partdro is a specialized drone retailer bridging cutting-edge UAV technology with the needs of consumers and businesses worldwide. From aerial photography enthusiasts to enterprise inspection teams, we provide premium drone solutions backed by expert support.
            </p>
            <p class="intro-paragraph">
              With deep supply chain connections to leading drone manufacturers, we offer competitive pricing, fast shipping, and local after-sales support. Whether you're a hobbyist, a professional photographer, or an enterprise operations manager, Partdro has the right UAV for your mission.
            </p>
          </div>
          <div class="intro-image" v-motion-slide-visible-right :delay="400">
            <img 
              :src="getImageUrl('about', 'intro')" 
              alt="Agricultural Technology"
              @error="(e) => handleImageError(e, images.fallback.about.intro)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Company Journey Timeline -->
    <section class="timeline-section" v-motion-fade-visible :delay="500">
      <div class="section-container">
        <div class="section-header" v-motion-slide-visible-bottom :delay="500">
          <h2 class="section-title">Our Journey</h2>
          <p class="section-subtitle">From drone enthusiasts to industry leaders</p>
        </div>
        <div class="timeline">
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            class="timeline-item"
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: index * 100 + 600 } }"
          >
            <div class="timeline-logo">
              <img :src="item.logo" :alt="item.title" @error="(e) => e.target.src = item.logo.replace('.webp', '.png')" />
            </div>
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="team-section" v-motion-fade-visible :delay="700">
      <div class="section-container">
        <div class="section-header" v-motion-slide-visible-bottom :delay="700">
          <h2 class="section-title">Leadership Team</h2>
          <p class="section-subtitle">Expertise driving innovation</p>
        </div>
        <div class="team-grid">
          <div 
            class="team-card"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }"
          >
            <div class="team-image">
              <img 
                :src="getImageUrl('about', 'team')" 
                alt="Mr. Gan - Founder & CEO of Partdro AgriTech"
                @error="(e) => handleImageError(e, images.fallback.about.team)"
              />
            </div>
            <div class="team-info">
              <h3 class="team-name">Mr. Gan</h3>
              <p class="team-position">Founder & CEO</p>
              <div class="team-bio">
                <p>Top-tier expert in the drone and robotics industry with over 15 years of deep experience. Former core member of DJI's intelligent perception system team and architect at Alibaba DAMO Academy.</p>
                <p>Led industry-first mass production of 8,000 units/day at DJI and co-founded a robotic lawn mower company that secured investment from Mr. Lei Jun (Xiaomi) and Mr. Zeng Liqing (Tencent).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Values -->
    <section class="values-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Our Values</h2>
          <p class="section-subtitle">What drives us forward</p>
        </div>
        <div class="values-grid">
          <div class="value-card" v-for="(value, index) in values" :key="index">
            <div class="value-icon" :class="`value-${index + 1}`">
              <img :src="value.icon" :alt="value.title" />
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section class="stats-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Why Choose Us</h2>
          <p class="section-subtitle">Our proven track record</p>
        </div>
        <div class="stats-grid">
          <div class="stat-card" v-for="(stat, index) in stats" :key="index">
            <div class="stat-icon" :class="`stat-${index + 1}`">
              <img :src="stat.icon" :alt="stat.title" />
            </div>
            <h3 class="stat-title">{{ stat.title }}</h3>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="contact-section">
      <div class="section-container">
        <div class="contact-content">
          <h2 class="contact-title">Ready to Transform Your Agriculture?</h2>
          <p class="contact-description">
            Whether you need agricultural robots, intelligent navigation systems, or customized solutions, our team is ready to help you find the perfect technology for your needs.
          </p>
          <div class="contact-actions">
            <a-button type="primary" size="large" class="contact-btn" @click="router.push('/contact_us')">Contact Us</a-button>
            <a-button size="large" class="secondary-btn" @click="openWhatsApp">Request Demo</a-button>
          </div>
          <div class="contact-info">
            <p class="contact-detail"><img src="/images/icons/email-icon.png" alt="Email" class="contact-inline-icon" /> info@partdro.com</p>
            <p class="contact-detail"><img src="/images/icons/phone-icon.png" alt="Phone" class="contact-inline-icon" /> +86 16788684420</p>
            <p class="contact-detail"><img src="/images/icons/location-icon.png" alt="Location" class="contact-inline-icon" /> Australia</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LinkedinOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const current = ref<string[]>(['about'])
const logoError = ref(false)
const footerLogoError = ref(false)

// 图片配置 - 使用 public 目录中实际存在的文件（已优化为 .webp）
const images = {
  about: {
    hero: '/images/about-hero.png',
    intro: '/images/about-intro.png',
    team: '/images/mr-gan-founder.webp'
  },
  fallback: {
    about: {
      hero: '/images/3U9A0093.webp',
      intro: '/images/harvest-1543064.webp',
      team: '/images/mr-gan-founder.webp'
    }
  }
}

const handleImageError = (e: Event, fallback: string) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackUsed) return
  img.dataset.fallbackUsed = 'true'
  img.src = fallback
}

// 获取图片URL
const getImageUrl = (type: string, key: string) => {
  try {
    if (type === 'about' && key in images.about) {
      return images.about[key as keyof typeof images.about]
    }
  } catch (error) {
    console.error('Error getting image URL:', error)
  }
  
  return images.fallback.about.hero
}

const handleLogoError = () => {
  logoError.value = true
  console.error('Header logo image failed to load.')
}

const handleFooterLogoError = () => {
  footerLogoError.value = true
  console.error('Footer logo image failed to load.')
}

// WhatsApp联系
const openWhatsApp = () => {
  const phoneNumber = '8613362853598'
  const message = 'Hello! I would like to learn more about Partdro drone solutions.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// 时间线数据
const timeline = [
  {
    year: '2015-2018',
    title: 'DJI Intelligent Perception System Team',
    description: 'Core member, pioneered mass production of 8,000 units/day. DJI held 90% market share in consumer and agricultural drones.',
    logo: '/dji_logo.webp'
  },
  {
    year: '2018-2022',
    title: 'Alibaba DAMO Academy',
    description: 'Architect for robotics team, reported to Professor Tan Ping (3D vision expert). Focused on spatial intelligence and robotics technologies.',
    logo: '/alibaba_damo_academy_logo.webp'
  },
  {
    year: '2022',
    title: 'Robotic Lawn Mower Company',
    description: 'Co-founded company with investment from Mr. Lei Jun (Xiaomi) and Mr. Zeng Liqing (Tencent). Achieved successful mass production and overseas export.',
    logo: '/xiaomi_logo.webp'
  },
  {
    year: '2024',
    title: 'Partdro AgriTech',
    description: 'Extended expertise to large-scale agriculture. Partnered with Australia-China Agricultural Association. Established product matrix including agricultural robots and lawn mowers.',
    logo: '/logo.webp'
  }
]

// 核心价值
const values = [
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

// 公司业绩数据
const stats = [
  {
    icon: '/images/icons/technical-excellence.png',
    title: '10+ Years Experience',
    description: 'Deep expertise in UAV technology, continuously innovating since 2014.'
  },
  {
    icon: '/images/icons/market-intelligence.png',
    title: 'Multiple Product Lines',
    description: 'Comprehensive solutions covering consumer, enterprise, agriculture drones and accessories.'
  },
  {
    icon: '/images/icons/localized-service.png',
    title: 'Global Reach',
    description: 'Serving customers across Oceania and globally with localized support.'
  },
  {
    icon: '/images/icons/customer-partnership.png',
    title: 'Trusted Partners',
    description: 'Strong partnerships with leading drone manufacturers and distribution networks.'
  }
]


</script>

<style scoped>
.about {
  font-family: 'Barlow', 'Barlow', 'Barlow', sans-serif;
  overflow: clip;
  contain: layout style;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 500px;
  margin-bottom: 60px;
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
}

.hero-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
  line-height: 1.2;
  max-width: 900px;
}

.hero-subtitle {
  font-size: clamp(18px, 2vw, 24px);
  opacity: 0.9;
  max-width: 700px;
}

/* Section Common Styles */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(30px, 3.2vw, 40px);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #666;
}

/* Introduction Section */
.intro-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.intro-content {
  display: flex;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
}

.intro-text {
  flex: 1;
  min-width: 300px;
}

.intro-paragraph {
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 20px;
}

.intro-image {
  flex: 1;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.intro-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

/* Timeline Section */
.timeline-section {
  padding: 80px 0;
  background: white;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #1888c8;
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 100px;
}

.timeline-logo {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1;
  padding-bottom: 20px;
}

.timeline-logo img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.timeline-year {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80px;
  height: 20px;
  background: linear-gradient(to top, #e6f7ff, #d9f7be);
  color: #0a4f7a;
  border-radius: 0 0 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  text-align: center;
  z-index: 2;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #b7eb8f;
}

.timeline-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #1888c8;
}

.timeline-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.timeline-description {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

/* Team Section */
.team-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.team-grid {
  max-width: 800px;
  margin: 0 auto;
}

.team-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.team-image {
  height: 400px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 20px;
}

.team-info {
  padding: 40px;
}

.team-name {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.team-position {
  font-size: 18px;
  color: #1888c8;
  font-weight: 600;
  margin-bottom: 20px;
}

.team-bio {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

.team-bio p {
  margin-bottom: 15px;
}

/* Values Section */
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
  background: rgba(24, 136, 200, 0.08);
}

.value-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.value-1 { background: linear-gradient(135deg, rgba(24, 136, 200, 0.08), rgba(26, 157, 228, 0.12)); }
.value-2 { background: linear-gradient(135deg, rgba(24, 136, 200, 0.08), rgba(26, 157, 228, 0.12)); }
.value-3 { background: linear-gradient(135deg, rgba(24, 136, 200, 0.08), rgba(26, 157, 228, 0.12)); }
.value-4 { background: linear-gradient(135deg, rgba(24, 136, 200, 0.08), rgba(26, 157, 228, 0.12)); }

.value-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 12px;
}

.value-description {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}

/* Statistics Section */
.stats-section {
  padding: 80px 0;
  background: #f8f9fa;
}

/* .section-header, .section-title, .section-subtitle already defined above */

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
  margin-bottom: 16px;
}

.stat-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.stat-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 12px;
}

.stat-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .stat-card {
    padding: 24px 16px;
  }
}

/* Contact Section */
.contact-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 100%);
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(82, 196, 26, 0.1);
}

.contact-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #1d1d1f;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.contact-description {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.contact-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 500;
  padding: 0 32px;
  height: 48px;
  font-size: 16px;
}

.secondary-btn {
  border-color: #1888c8;
  color: #1888c8;
  padding: 0 32px;
  height: 48px;
  font-size: 16px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.contact-detail {
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-inline-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* Footer Styles (复用HomeView样式) */
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
}

.logo-image {
  width: 120px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
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

.footer-logo-image {
  width: 80px;
  height: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .intro-content {
    flex-direction: column;
  }
  
  .timeline::before {
    left: 25px;
  }
  
  .timeline-item {
    padding-left: 70px;
  }
  
  .timeline-logo {
    width: 50px;
    height: 50px;
    padding-bottom: 12px;
  }
  
  .timeline-logo img {
    width: 30px;
    height: 30px;
  }
  
  .timeline-year {
    width: 50px;
    height: 12px;
    font-size: 9px;
    border-radius: 0 0 25px 25px;
    background: linear-gradient(to top, #e6f7ff, #d9f7be);
    color: #0a4f7a;
    border-top: 1px solid #b7eb8f;
  }
  
  .team-image {
    height: 200px;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-btn,
  .secondary-btn {
    width: 100%;
    max-width: 300px;
  }

  .contact-section {
    padding: 60px 20px;
  }

  .contact-content {
    padding: 40px 24px;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 300px;
  }
  
  .hero-title {
    font-size: 24px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .contact-section {
    padding: 40px 16px;
  }

  .contact-content {
    padding: 32px 20px;
    border-radius: 12px;
  }

  .contact-title {
    font-size: 28px;
  }

  .contact-description {
    font-size: 16px;
  }
}
</style>