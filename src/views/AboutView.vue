<template>
  <PageLayout>
    <PageHero :title="$t('about.title')" :subtitle="$t('about.subtitle')" />

    <section class="story-section" v-motion-fade-visible>
      <div class="section-container">
        <a-row :gutter="[48, 32]">
          <a-col :sm="24" :md="14">
            <h2 class="section-title">{{ $t('about.ourStory') }}</h2>
            <p class="story-text">{{ $t('about.story1') }}</p>
            <p class="story-text">{{ $t('about.story2') }}</p>
            <p class="story-text">{{ $t('about.story3') }}</p>
          </a-col>
          <a-col :sm="24" :md="10">
            <div class="story-image">
              <img src="/images/trade-shows/Shanghai Hotelex 01.webp" alt="Trade show" />
            </div>
          </a-col>
        </a-row>
      </div>
    </section>

    <section class="factory-section bp-grid-light" v-motion-fade-visible :delay="200">
      <div class="section-container">
        <h2 class="section-title">{{ $t('about.factory') }}</h2>
        <div class="factory-grid">
          <a-image v-for="(img, idx) in factoryImages" :key="idx"
            :src="img.src" :alt="img.alt" class="factory-image" />
        </div>
      </div>
    </section>

    <section class="certifications-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <h2 class="section-title">{{ $t('about.certifications') }}</h2>
        <div class="certs-grid">
          <div class="cert-card" v-for="(cert, idx) in $tm('about.certs')" :key="idx">
            <div class="cert-icon">{{ ['📋', '🔰', '♻️', '🏅'][Number(idx)] }}</div>
            <h3>{{ cert.name }}</h3>
            <p>{{ cert.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="values-section bp-grid-light" v-motion-fade-visible :delay="400">
      <div class="section-container">
        <h2 class="section-title">{{ $t('about.ourValues') }}</h2>
        <div class="values-grid">
          <div v-for="(val, idx) in $tm('about.values')" :key="idx" class="value-card"
            v-motion :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: Number(idx) * 80 + 500 } }"
          >
            <div class="value-icon">{{ ['🏭', '🤝', '🌍', '💡'][Number(idx)] }}</div>
            <h3>{{ val.title }}</h3>
            <p>{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../components/layout/PageLayout.vue'
import PageHero from '../components/common/PageHero.vue'

const factoryImages = [
  { src: '/images/trade-shows/Shanghai Hotelex 01.webp', alt: 'Shanghai Hotelex Exhibition' },
  { src: '/images/trade-shows/Shanghai Hotelex 02.webp', alt: 'Trade Show' },
  { src: '/images/trade-shows/20260317163340_49_347.webp', alt: 'Factory' },
  { src: '/images/trade-shows/20260317163407_50_347.webp', alt: 'Product Display' },
]
</script>

<style scoped>
.section-container { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
.section-title { font-size: 28px; font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 32px; color: var(--color-navy); text-align: left; letter-spacing: -0.02em; }
.story-text { font-size: 16px; color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 16px; }
.story-image { border-radius: var(--radius-lg); overflow: hidden; }
.story-image img { width: 100%; height: auto; object-fit: cover; border-radius: var(--radius-lg); }
.factory-section { background: var(--color-warm-cream); }
.factory-section .section-title, .certifications-section .section-title, .values-section .section-title { text-align: center; }
.factory-section .section-title::after,
.certifications-section .section-title::after,
.values-section .section-title::after {
  content: ''; display: block; width: 48px; height: 3px;
  background: var(--color-amber); border-radius: 2px; margin: 14px auto 0;
}
.factory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr)); gap: 16px; }
.factory-image { border-radius: var(--radius-md); overflow: hidden; }
.factory-image :deep(.ant-image-img) { width: 100%; height: 240px; object-fit: cover; border-radius: var(--radius-md); }
.certs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 24px; text-align: center; }
.cert-card { background: white; border-radius: var(--radius-lg); padding: 36px 24px; border: 1px solid var(--color-warm-border); box-shadow: var(--shadow-sm); transition: all 0.3s ease; }
.cert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.cert-icon { font-size: 36px; margin-bottom: 12px; }
.cert-card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--color-navy); }
.cert-card p { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }
.values-section { background: var(--color-warm-cream); }
.values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 24px; }
.value-card { background: white; border-radius: var(--radius-lg); padding: 36px 24px; text-align: center; border: 1px solid var(--color-warm-border); box-shadow: var(--shadow-sm); transition: all 0.3s ease; }
.value-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--color-amber-light); }
.value-icon { font-size: 40px; margin-bottom: 12px; }
.value-card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--color-navy); }
.value-card p { font-size: 15px; color: var(--color-text-secondary); line-height: 1.6; }
</style>
