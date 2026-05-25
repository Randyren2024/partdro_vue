<template>
  <section class="page-hero" :class="[`hero-${brand}`, { 'bp-grid-light': blueprint }]">
    <div class="hero-inner">
      <HeroRibbon />
      <h1 class="hero-title">{{ title }}</h1>
      <p v-if="subtitle" class="hero-subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroRibbon from './HeroRibbon.vue'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  brand?: 'partdro'
  blueprint?: boolean
}>(), {
  brand: 'partdro',
  blueprint: true,
})
</script>

<style scoped>
.page-hero {
  padding: clamp(48px, 5vw, 72px) 24px;
  text-align: center;
  position: relative;
}

.hero-partdro {
  background: linear-gradient(180deg, #faf9f6 0%, #f5f2eb 100%);
}

.hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  font-family: 'Sora', sans-serif;
  color: var(--color-navy);
  margin-bottom: 12px;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hero-subtitle {
  font-size: clamp(16px, 1.3vw, 18px);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
}
</style>
