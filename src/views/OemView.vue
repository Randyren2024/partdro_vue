<template>
  <PageLayout>
    <PageHero :title="$t('oem.title')" :subtitle="$t('oem.subtitle')" />

    <section class="services-section" v-motion-fade-visible>
      <div class="section-container">
        <div class="services-grid">
          <a-card v-for="(service, idx) in $tm('oem.services')" :key="idx" class="service-card"
            v-motion :initial="{ opacity: 0, y: 40 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: Number(idx) * 80 } }"
          >
            <div class="service-icon">{{ icons[Number(idx)] }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.desc }}</p>
          </a-card>
        </div>
      </div>
    </section>

    <section class="process-section bp-grid-light" v-motion-fade-visible :delay="200">
      <div class="section-container">
        <h2 class="section-title">{{ $t('oem.processTitle') }}</h2>
        <a-steps direction="vertical" :current="-1" class="process-steps">
          <a-step v-for="(step, idx) in $tm('oem.steps')" :key="idx"
            :title="step.title" :description="step.desc" />
        </a-steps>
      </div>
    </section>

    <section class="why-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <h2 class="section-title">{{ $t('oem.whyTitle') }}</h2>
        <div class="why-grid">
          <div v-for="(item, idx) in $tm('oem.whyItems')" :key="idx" class="why-card"
            v-motion :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: Number(idx) * 100 + 400 } }"
          >
            <CheckCircleOutlined class="why-check" />
            <div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section" v-motion-fade-visible :delay="500">
      <div class="cta-content">
        <h2>{{ $t('oem.startProject') }}</h2>
        <p>{{ $t('oem.startProjectSub') }}</p>
        <a-button size="large" class="btn-pill-primary cta-btn-inverse" @click="$router.push('/contact')">
          {{ $t('oem.getStarted') }}
        </a-button>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import PageLayout from '../components/layout/PageLayout.vue'
import PageHero from '../components/common/PageHero.vue'

const icons = ['\u{1F3F7}️', '\u{1F3A8}', '\u{1F4E6}', '\u{1F527}', '\u{1F4CB}', '\u{1F6A2}']
</script>

<style scoped>
.section-container { max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 24px; }
.service-card { text-align: center; border-radius: var(--radius-lg); padding: 8px; border: 1px solid var(--color-warm-border); transition: all 0.3s ease; }
.service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.service-icon { font-size: 40px; margin-bottom: 12px; }
.service-card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--color-navy); }
.service-card p { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }
.process-section { background: var(--color-warm-cream); }
.process-section .section-title, .why-section .section-title { text-align: center; font-size: 28px; font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 40px; color: var(--color-navy); letter-spacing: -0.02em; }
.process-section .section-title::after, .why-section .section-title::after { content: ''; display: block; width: 48px; height: 3px; background: var(--color-amber); border-radius: 2px; margin: 14px auto 0; }
.process-steps { max-width: 700px; margin: 0 auto; }
.process-steps :deep(.ant-steps-item-title) { font-weight: 600 !important; font-size: 16px !important; }
.why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr)); gap: 20px; }
.why-card { display: flex; gap: 16px; align-items: flex-start; background: white; border-radius: var(--radius-lg); padding: 24px; border: 1px solid var(--color-warm-border); box-shadow: var(--shadow-sm); transition: all 0.3s ease; }
.why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--color-amber-light); }
.why-check { font-size: 22px; color: var(--color-amber); flex-shrink: 0; margin-top: 2px; }
.why-card h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; color: var(--color-navy); }
.why-card p { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }
.cta-section { background: var(--gradient-navy); padding: 60px 24px; text-align: center; color: white; }
.cta-content h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 12px; letter-spacing: -0.02em; }
.cta-content p { font-size: 17px; opacity: 0.85; margin-bottom: 28px; }
.cta-btn-inverse { background: white !important; color: var(--color-navy) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important; }
</style>
