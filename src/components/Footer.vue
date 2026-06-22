<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <div class="footer-section footer-brand">
        <div class="footer-logo">
          <img 
            src="/logo.webp" 
            alt="Partdro AgriTech" 
            class="footer-logo-image"
            @error="handleFooterLogoError"
          />
        </div>
        <p class="footer-description">
          Your trusted destination for premium drones —<br>
          from consumer aerial photography to enterprise-grade industrial UAV solutions
        </p>
      </div>

      <div class="footer-section">
        <h3 class="footer-title">Quick Links</h3>
        <a @click="$router.push('/products-solutions')" class="footer-link">Products & Solutions</a>
        <a @click="$router.push('/about_us')" class="footer-link">About Us</a>
            <a @click="$router.push('/contact_us')" class="footer-link">Contact Us</a>
        <a @click="$router.push('/support')" class="footer-link">Support</a>
      </div>
      <div class="footer-section">
        <h3 class="footer-title">Legal</h3>
        <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
        <a href="/terms-conditions" class="footer-link">Terms & Conditions</a>
      </div>

      <div class="footer-mobile-accordion">
        <a-collapse v-model:activeKey="activeKeys" :bordered="false" class="footer-collapse">
          <a-collapse-panel key="quick-links" header="Quick Links">
            <a @click="$router.push('/products-solutions')" class="footer-link">Products & Solutions</a>
            <a @click="$router.push('/about_us')" class="footer-link">About Us</a>
        <a @click="$router.push('/contact_us')" class="footer-link">Contact Us</a>
            <a @click="$router.push('/support')" class="footer-link">Support</a>
          </a-collapse-panel>
          <a-collapse-panel key="legal" header="Legal">
            <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
            <a href="/terms-conditions" class="footer-link">Terms & Conditions</a>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <div class="footer-section footer-contact">
        <h3 class="footer-title">Contact Us</h3>
        <p class="footer-contact-text"><img src="/images/icons/email-icon.png" alt="Email" class="footer-contact-icon" /> info@partdro.com</p>
        <p class="footer-contact-text"><img src="/images/icons/phone-icon.png" alt="Phone" class="footer-contact-icon" /> +86 16788684420</p>

      </div>

      <div class="footer-section footer-follow">
        <h3 class="footer-title">Follow Us</h3>
        <a href="https://www.linkedin.com/in/alan-gan-partdroinno/" target="_blank" class="footer-link">
          <LinkedinOutlined /> LinkedIn
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright© {{ copyrightYear }} Partdro. All Rights Reserved</p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LinkedinOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const copyrightYear = computed(() => {
  const year = new Date().getFullYear()
  return year
})

const logoError = ref(false)
const activeKeys = ref([])

const handleFooterLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}
</script>

<style scoped>
.footer {
  background: #2d2d2f;
  color: #f5f5f7;
  padding: 60px clamp(16px, 3vw, 40px) 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: clamp(24px, 4vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  margin-bottom: 8px;
}

.footer-logo-image {
  width: 140px;
  height: auto;
  object-fit: contain;
}

.footer-description {
  color: #a1a1a6;
  font-size: 14px;
  line-height: 1.6;
}

.footer-title {
  color: #f5f5f7;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.footer-link {
  color: #a1a1a6;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
  display: block;
  cursor: pointer;
}

.footer-link:hover {
  color: #1888c8;
}

.footer-contact-text {
  color: #a1a1a6;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-contact-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  opacity: 0.7;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 40px;
  padding-top: 24px;
  text-align: center;
}

.footer-bottom p {
  color: #6e6e73;
  font-size: 14px;
  margin: 0;
}

/* Hide accordion on desktop */
.footer-mobile-accordion {
  display: none;
}

/* Accordion styling */
.footer-collapse {
  background: transparent !important;
}

.footer-collapse :deep(.ant-collapse-item) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.footer-collapse :deep(.ant-collapse-header) {
  color: #f5f5f7 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 12px 0 !important;
  text-align: center !important;
}

.footer-collapse :deep(.ant-collapse-content-box) {
  padding: 0 !important;
  text-align: center !important;
}

.footer-collapse :deep(.ant-collapse-content-box .footer-link) {
  padding: 10px 0;
  font-size: 16px;
}



@media (max-width: 768px) {
  .footer {
    padding: 40px 16px 24px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
  }

  .footer-section {
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
  }

  .footer-brand {
    margin-bottom: 32px;
  }

  .footer-logo {
    display: flex;
    justify-content: center;
  }

  .footer-logo-image {
    width: 100px;
  }

  .footer-description {
    text-align: center;
  }

  .footer-title {
    text-align: center;
  }

  .footer-contact-text {
    text-align: center;
  }

  /* Show accordion on mobile */
  .footer-mobile-accordion {
    display: block;
    width: 100%;
    margin-bottom: 24px;
  }

  /* Hide regular Quick Links & Legal sections on mobile */
  .footer-section:nth-child(2),  /* Quick Links */
  .footer-section:nth-child(3) { /* Legal */
    display: none;
  }



  .footer-section.footer-contact,
  .footer-section.footer-follow {
    margin-bottom: 32px;
  }

  .footer-bottom {
    margin-top: 24px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    gap: 0;
  }
}
</style>