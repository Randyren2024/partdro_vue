<template>
  <PageLayout>
    <section class="hero-section bp-grid-light">
      <div class="hero-content">
        <HeroRibbon />
        <h1 class="hero-title">{{ $t('home.heroTitle') }}</h1>
        <p class="hero-subtitle">{{ $t('home.heroSub') }}</p>
        <div class="hero-actions">
          <a-button type="primary" size="large" class="btn-pill-primary" @click="$router.push('/products')">
            {{ $t('home.exploreProducts') }}
          </a-button>
          <a-button size="large" class="btn-pill-outline" @click="openWhatsApp()">
            {{ $t('home.getQuote') }}
          </a-button>
        </div>
      </div>

      <div class="carousel-wrapper">
        <a-carousel
          ref="heroCarousel"
          autoplay
          :autoplay-speed="5000"
          effect="fade"
          dots-class="hero-dots"
          class="hero-carousel"
        >
          <div v-for="(item, idx) in carouselSlides" :key="idx">
            <div class="carousel-slide">
              <div class="carousel-info">
                <span class="product-tag">{{ item.tag }}</span>
                <h2 class="info-title">{{ item.title }}</h2>
                <p class="info-description">{{ item.description }}</p>
                <a-button type="primary" class="btn-pill-primary" @click="$router.push(item.link)">Learn More</a-button>
              </div>
              <div class="carousel-image">
                <img :src="item.image" :alt="item.title" />
              </div>
            </div>
          </div>
        </a-carousel>
      </div>
    </section>

    <section class="categories-section" v-motion-fade-visible :delay="200">
      <div class="section-header">
        <h2 class="section-title">{{ $t('home.categoriesTitle') }}</h2>
        <p class="section-subtitle">{{ $t('home.categoriesSub') }}</p>
      </div>
      <div class="categories-grid">
        <a-card
          v-for="(cat, idx) in activeCategories"
          :key="cat.slug"
          class="category-card card-hover"
          hoverable
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: idx * 80 + 300 } }"
          @click="$router.push(`/products?category=${cat.slug}`)"
        >
          <div class="category-content">
            <span class="category-icon">{{ cat.icon }}</span>
            <h3 class="category-name">{{ cat.name }}</h3>
            <span class="category-name-cn">{{ cat.nameCn }}</span>
            <p class="category-desc">{{ cat.description }}</p>
            <span class="category-count">{{ cat.productCount }} {{ cat.productCount === 1 ? 'product' : 'products' }}</span>
          </div>
        </a-card>
      </div>
    </section>

    <section class="products-section" v-motion-fade-visible :delay="400">
      <div class="section-header">
        <h2 class="section-title">{{ $t('home.featuredProducts') }}</h2>
        <p class="section-subtitle">{{ $t('home.featuredSub') }}</p>
      </div>
      <div class="products-grid">
        <a-card
          v-for="(product, idx) in featuredProducts"
          :key="product.id"
          class="product-card card-hover"
          hoverable
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: idx * 100 + 400 } }"
          @click="$router.push(`/products/${product.id}`)"
        >
          <template #cover>
            <div class="product-cover">
              <img :src="product.images[0]?.src || '/images/placeholder.png'" :alt="product.name" loading="lazy" decoding="async" />
              <div class="product-badges" v-if="product.isNew || product.isFeatured">
                <a-tag v-if="product.isNew" color="blue">New</a-tag>
                <a-tag v-if="product.isFeatured" color="gold">Featured</a-tag>
              </div>
            </div>
          </template>
          <a-card-meta :title="product.name">
            <template #description>
              <p class="product-desc">{{ product.tagline }}</p>
              <a-tag class="product-cat-tag">{{ product.categoryName }}</a-tag>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </section>

    <section class="strengths-section bp-grid-light" v-motion-fade-visible :delay="600">
      <div class="section-header">
        <h2 class="section-title">{{ $t('home.whyPartdro') }}</h2>
        <p class="section-subtitle">{{ $t('home.whySub') }}</p>
      </div>
      <div class="strengths-grid">
        <div v-for="(item, idx) in $tm('strengths')" :key="idx" class="strength-card"
          v-motion :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: Number(idx) * 100 + 600 } }"
        >
          <div class="strength-icon">{{ icons[Number(idx)] }}</div>
          <h3 class="strength-title">{{ item.title }}</h3>
          <p class="strength-desc">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <section class="cta-section" v-motion-fade-visible :delay="800">
      <div class="cta-content">
        <h2>{{ $t('home.readyTitle') }}</h2>
        <p>{{ $t('home.readySub') }}</p>
        <a-button size="large" class="btn-pill-primary cta-btn-inverse" @click="openWhatsApp()">
          {{ $t('home.contactUs') }}
        </a-button>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '../components/layout/PageLayout.vue'
import HeroRibbon from '../components/common/HeroRibbon.vue'
import { useWhatsApp } from '../composables/useWhatsApp'
import { useMeta } from '../composables/useMeta'
import { products } from '../data/products'
import { activeCategories } from '../data/categories'

const { openWhatsApp } = useWhatsApp()
useMeta()

const featuredProducts = products
const icons = ['🏭', '✅', '🎨', '🌍']

const carouselSlides = [
  {
    tag: 'S150',
    title: 'Heavy-Lift Cargo Drone',
    description: '150 kg payload capacity with 4-axis 8-blade coaxial architecture. Intelligent batteries and AI payload stabilization.',
    image: '/images/placeholder.png',
    link: '/products/s150',
  },
  {
    tag: 'AGR T4',
    title: '32× Zoom Industrial Drone',
    description: 'Heavy-duty drone with 41-minute flight time, dual-light IR camera, and IP43 all-weather protection.',
    image: '/images/placeholder.png',
    link: '/products/agr-t4',
  },
  {
    tag: 'FIMI X8T',
    title: 'Triple-Camera Professional Drone',
    description: 'Wide + telephoto + thermal cameras. 20km RokLink 5.0 transmission for firefighting, security, and inspection.',
    image: '/images/placeholder.png',
    link: '/products/fimi-x8t',
  },
  {
    tag: 'AGR T2',
    title: '16× Zoom + Laser Rangefinder',
    description: 'Compact industrial drone with dual-light camera, 800m laser range-finding, and 42-minute endurance.',
    image: '/images/placeholder.png',
    link: '/products/agr-t2',
  },
]
</script>

<style scoped>
.hero-section {
  padding: clamp(48px, 5vw, 80px) clamp(16px, 3vw, 24px);
  background: linear-gradient(180deg, #faf9f6 0%, #f5f2eb 100%);
}
.hero-content { text-align: center; margin-bottom: clamp(40px, 5vw, 60px); max-width: 1200px; margin-left: auto; margin-right: auto; }
.hero-title {
  font-size: clamp(32px, 4vw, 48px); font-weight: 800;
  font-family: 'Sora', sans-serif; color: var(--color-navy);
  margin-bottom: 16px; line-height: 1.15; letter-spacing: -0.03em;
}
.hero-subtitle { font-size: clamp(16px, 1.5vw, 18px); color: var(--color-text-secondary); margin-bottom: 32px; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto; }
.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

/* Carousel */
.carousel-wrapper { max-width: 1100px; margin: 0 auto; }
.hero-carousel :deep(.slick-slide) { padding: 0; }
.carousel-slide { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: center; max-width: 1100px; margin: 0 auto; }
.carousel-info { display: flex; flex-direction: column; gap: 16px; }
.info-title { font-size: clamp(28px, 3vw, 40px); font-weight: 700; font-family: 'Sora', sans-serif; color: var(--color-navy); line-height: 1.15; letter-spacing: -0.02em; }
.info-description { font-size: clamp(16px, 1.3vw, 18px); color: var(--color-text-secondary); line-height: 1.6; }
.product-tag { display: inline-block; background: var(--color-amber); color: var(--color-navy); padding: 6px 18px; border-radius: 999px; font-size: 14px; font-weight: 700; align-self: flex-start; letter-spacing: 0.02em; }
.carousel-image { border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); aspect-ratio: 1/1; background: var(--color-warm-cream); }
.carousel-image img { width: 100%; height: 100%; object-fit: cover; }

/* Ant carousel dots override */
.hero-carousel :deep(.slick-dots) { bottom: -36px; }
.hero-carousel :deep(.slick-dots li button) { background: var(--color-warm-border); border-radius: 50%; width: 10px; height: 10px; opacity: 1; }
.hero-carousel :deep(.slick-dots li.slick-active button) { background: var(--color-amber); transform: scale(1.3); }

/* Categories */
.categories-section { padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px); max-width: 1260px; margin: 0 auto; }
.categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr)); gap: 20px; }
.category-card { border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; border: 1px solid var(--color-warm-border); background: #ffffff; transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1); }
.category-card:hover { border-color: var(--color-amber); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.category-content { padding: 8px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
.category-icon { font-size: 40px; }
.category-name { font-size: 16px; font-weight: 700; font-family: 'Sora', sans-serif; color: var(--color-navy); margin: 0; }
.category-name-cn { font-size: 13px; color: var(--color-text-secondary); }
.category-desc { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin: 0; }
.category-count { font-size: 12px; font-weight: 600; color: var(--color-amber); }

/* Products */
.products-section { padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px); max-width: 1260px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 48px; }
.section-title { font-size: clamp(28px, 3vw, 36px); font-weight: 700; font-family: 'Sora', sans-serif; color: var(--color-navy); margin-bottom: 12px; letter-spacing: -0.02em; }
.section-subtitle { font-size: clamp(16px, 1.3vw, 18px); color: var(--color-text-secondary); }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 28px; }
.product-card { border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; border: 1px solid var(--color-warm-border); background: #ffffff; }
.product-cover { position: relative; aspect-ratio: 1/1; overflow: hidden; background: var(--color-warm-cream); }
.product-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1); }
.product-card:hover .product-cover img { transform: scale(1.06); }
.product-badges { position: absolute; top: 12px; left: 12px; display: flex; gap: 8px; }
.product-desc { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
.product-cat-tag { margin-top: 8px; }

/* Strengths */
.strengths-section { padding: clamp(40px, 5vw, 80px) clamp(16px, 3vw, 24px); background: var(--color-warm-cream); }
.strengths-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
.strength-card { background: #ffffff; border-radius: var(--radius-lg); padding: 36px 24px; text-align: center; border: 1px solid var(--color-warm-border); transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1); }
.strength-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--color-amber-light); }
.strength-icon { font-size: 40px; margin-bottom: 16px; }
.strength-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; color: var(--color-navy); }
.strength-desc { font-size: 15px; color: var(--color-text-secondary); line-height: 1.6; }

/* CTA */
.cta-section { background: var(--gradient-navy); padding: clamp(48px, 5vw, 72px) clamp(16px, 3vw, 24px); text-align: center; color: white; }
.cta-content h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 16px; letter-spacing: -0.02em; }
.cta-content p { font-size: 17px; opacity: 0.85; margin-bottom: 32px; }
.cta-btn-inverse { background: white !important; color: var(--color-navy) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important; }
.cta-btn-inverse:hover { box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22) !important; }

@media (max-width: 900px) {
  .carousel-slide { grid-template-columns: 1fr; gap: 32px; }
  .carousel-image { order: -1; max-width: 400px; margin: 0 auto; }
  .carousel-info { text-align: center; align-items: center; }
  .product-tag { align-self: center; }
}
</style>
