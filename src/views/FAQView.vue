<template>
  <PageLayout>
    <PageHero :title="$t('faq.title')" :subtitle="$t('faq.subtitle')" />

    <section class="faq-section" v-motion-fade-visible>
      <div class="section-container">
        <a-collapse v-model:activeKey="activeKeys" accordion class="faq-collapse" expand-icon-position="end">
          <a-collapse-panel
            v-for="(faq, idx) in $tm('faq.items')"
            :key="idx"
            :header="faq.q"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: Number(idx) * 50 } }"
          >
            <p class="faq-answer">{{ faq.a }}</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </section>

    <section class="cta-section" v-motion-fade-visible :delay="300">
      <div class="cta-content">
        <h2>{{ $t('faq.stillQuestions') }}</h2>
        <p>{{ $t('faq.stillQuestionsSub') }}</p>
        <a-button size="large" class="btn-pill-primary cta-btn-inverse" @click="$router.push('/contact')">
          {{ $t('nav.contact') }}
        </a-button>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '../components/layout/PageLayout.vue'
import PageHero from '../components/common/PageHero.vue'

const activeKeys = ref<number[]>([])
</script>

<style scoped>
.hero-section { background: var(--color-warm-cream); }
.section-container { max-width: 900px; margin: 0 auto; padding: 48px 24px; }
.faq-collapse { background: transparent; }
.faq-collapse :deep(.ant-collapse-item) {
  background: white; border-radius: 14px !important; margin-bottom: 10px; overflow: hidden;
  border: 1px solid var(--color-warm-border) !important;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s, transform 0.3s;
}
.faq-collapse :deep(.ant-collapse-item:hover) { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.faq-collapse :deep(.ant-collapse-header) { font-weight: 600 !important; font-size: 16px !important; padding: 20px 24px !important; border-bottom: none !important; border-radius: 14px !important; color: var(--color-navy); }
.faq-collapse :deep(.ant-collapse-content) { border-top: none !important; }
.faq-collapse :deep(.ant-collapse-content-box) { padding: 0 24px 20px !important; }
.faq-answer { font-size: 16px; color: var(--color-text-secondary); line-height: 1.8; }
.cta-section { background: var(--gradient-navy); padding: 60px 24px; text-align: center; color: white; }
.cta-content h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 12px; letter-spacing: -0.02em; }
.cta-content p { font-size: 17px; opacity: 0.85; margin-bottom: 28px; }
.cta-btn-inverse { background: white !important; color: var(--color-navy) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important; }
</style>
