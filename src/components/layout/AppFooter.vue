<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <div class="footer-section footer-brand">
        <div class="footer-logo">
          <img
            src="/images/partdro_color_logo.png"
            alt="Partdro"
            class="footer-logo-image"
            @error="handleFooterLogoError"
          />
        </div>
        <p class="footer-description">{{ $t('footer.description') }}</p>
      </div>

      <div class="footer-section">
        <h3 class="footer-title">{{ $t('footer.quickLinks') }}</h3>
        <a @click="$router.push('/products')" class="footer-link">{{ $t('nav.products') }}</a>
        <a @click="$router.push('/oem')" class="footer-link">{{ $t('nav.oem') }}</a>
        <a @click="$router.push('/about')" class="footer-link">{{ $t('nav.about') }}</a>
        <a @click="$router.push('/faq')" class="footer-link">{{ $t('nav.faq') }}</a>
      </div>

      <div class="footer-section">
        <h3 class="footer-title">{{ $t('footer.products') }}</h3>
        <a @click="$router.push('/products/s150')" class="footer-link">S150 Cargo Drone</a>
        <a @click="$router.push('/products/agr-t4')" class="footer-link">AGR T4 Industrial</a>
        <a @click="$router.push('/products/fimi-x8t')" class="footer-link">FIMI X8T Pro</a>
        <a @click="$router.push('/products')" class="footer-link">{{ $t('footer.viewAll') }}</a>
      </div>

      <div class="footer-mobile-accordion">
        <a-collapse v-model:activeKey="activeKeys" :bordered="false" class="footer-collapse">
          <a-collapse-panel key="quick-links" :header="$t('footer.quickLinks')">
            <a @click="$router.push('/products')" class="footer-link">{{ $t('nav.products') }}</a>
            <a @click="$router.push('/oem')" class="footer-link">{{ $t('nav.oem') }}</a>
            <a @click="$router.push('/about')" class="footer-link">{{ $t('nav.about') }}</a>
            <a @click="$router.push('/faq')" class="footer-link">{{ $t('nav.faq') }}</a>
          </a-collapse-panel>
          <a-collapse-panel key="products" :header="$t('footer.products')">
            <a @click="$router.push('/products/s150')" class="footer-link">S150 Cargo Drone</a>
            <a @click="$router.push('/products/agr-t4')" class="footer-link">AGR T4 Industrial</a>
            <a @click="$router.push('/products/fimi-x8t')" class="footer-link">FIMI X8T Pro</a>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <div class="footer-section footer-contact">
        <h3 class="footer-title">{{ $t('footer.contactUs') }}</h3>
        <p class="footer-contact-text">sales@partdro.com</p>
        <p class="footer-contact-text">www.partdro.com</p>
        <p class="footer-contact-text">+86 138 1989 6337</p>
        <p class="footer-contact-text">Guanhaiwei Town, Cixi, Ningbo, Zhejiang, China</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKeys = ref<string[]>([])
const currentYear = new Date().getFullYear()

const handleFooterLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/logo.png'
}
</script>

<style scoped>
.footer { background: #0c111d; color: white; padding: 60px clamp(16px, 3vw, 40px) 24px; }
.footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: clamp(24px, 4vw, 40px); max-width: 1200px; margin: 0 auto; }
.footer-section { display: flex; flex-direction: column; gap: 16px; }
.footer-logo { margin-bottom: 8px; }
.footer-logo-image { width: 140px; height: auto; object-fit: contain; }
.footer-description { color: rgba(255, 255, 255, 0.55); font-size: 14px; line-height: 1.7; font-family: 'DM Sans', sans-serif; }
.footer-title { color: white; font-size: 16px; font-weight: 600; margin-bottom: 4px; font-family: 'Sora', sans-serif; }
.footer-link { color: rgba(255, 255, 255, 0.55); text-decoration: none; font-size: 14px; transition: color 0.3s; display: block; cursor: pointer; font-family: 'DM Sans', sans-serif; }
.footer-link:hover { color: var(--color-amber); }
.footer-contact-text { color: rgba(255, 255, 255, 0.65); font-size: 14px; margin: 0; }
.footer-bottom { border-top: 1px solid rgba(255, 255, 255, 0.08); margin-top: 40px; padding-top: 24px; text-align: center; }
.footer-bottom p { color: rgba(255, 255, 255, 0.4); font-size: 14px; margin: 0; }
.footer-mobile-accordion { display: none; }
.footer-collapse { background: transparent !important; }
.footer-collapse :deep(.ant-collapse-item) { border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }
.footer-collapse :deep(.ant-collapse-header) { color: white !important; font-size: 16px !important; font-weight: 600 !important; padding: 12px 0 !important; text-align: center !important; }
.footer-collapse :deep(.ant-collapse-content-box) { padding: 0 !important; text-align: center !important; }
.footer-collapse :deep(.ant-collapse-content-box .footer-link) { padding: 10px 0; font-size: 16px; }
@media (max-width: 768px) {
  .footer { padding: 40px 16px 24px; }
  .footer-content { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0; }
  .footer-section { width: 100%; align-items: center; margin-bottom: 24px; }
  .footer-brand { margin-bottom: 32px; }
  .footer-section:nth-child(2), .footer-section:nth-child(3) { display: none; }
  .footer-mobile-accordion { display: block; width: 100%; margin-bottom: 24px; }
  .footer-bottom { margin-top: 24px; }
}
</style>
