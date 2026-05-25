<template>
  <a-layout-header class="header">
    <div class="header-content">
      <a-button class="menu-trigger" type="text" @click="openDrawer">
        <MenuOutlined />
      </a-button>

      <div class="logo">
        <router-link to="/">
          <img
            src="/images/partdro_color_logo.png"
            alt="Partdro"
            class="logo-image"
            @error="handleLogoError"
          />
        </router-link>
      </div>

      <a-menu
        v-model:selectedKeys="currentKeys"
        mode="horizontal"
        class="nav-menu desktop-menu"
      >
        <a-menu-item key="home" @click="$router.push('/')">{{ $t('nav.home') }}</a-menu-item>
        <a-menu-item key="products" @click="$router.push('/products')">{{ $t('nav.products') }}</a-menu-item>
        <a-menu-item key="oem" @click="$router.push('/oem')">{{ $t('nav.oem') }}</a-menu-item>
        <a-menu-item key="about" @click="$router.push('/about')">{{ $t('nav.about') }}</a-menu-item>
        <a-menu-item key="faq" @click="$router.push('/faq')">{{ $t('nav.faq') }}</a-menu-item>
        <a-menu-item key="contact" @click="$router.push('/contact')">{{ $t('nav.contact') }}</a-menu-item>
      </a-menu>

      <div class="header-actions desktop-actions">
        <a-dropdown>
          <a-button type="text" class="lang-btn">
            <GlobalOutlined /> {{ currentLangLabel }}
          </a-button>
          <template #overlay>
            <a-menu @click="handleLangChange">
              <a-menu-item v-for="l in availableLocales" :key="l.key">
                {{ l.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-button type="primary" class="cta-btn" @click="handleInquiry">
          {{ $t('home.getQuote') }}
        </a-button>
      </div>
    </div>

    <a-drawer
      v-model:open="drawerVisible"
      title=""
      placement="left"
      :width="280"
      class="mobile-drawer"
      :body-style="{ padding: 0 }"
    >
      <div class="drawer-content">
        <div class="drawer-logo" v-motion-slide-visible-top>
          <img src="/images/partdro_color_logo.png" alt="Partdro" class="logo-image" />
        </div>
        <a-menu
          v-model:selectedKeys="currentKeys"
          mode="vertical"
          class="mobile-menu"
        >
          <a-menu-item v-for="item in menuItems" :key="item.key"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: item.delay } }"
            @click="handleMenuClick(item.key)"
          >
            <component :is="item.icon" /> {{ item.label }}
          </a-menu-item>
        </a-menu>
        <a-divider />
        <div class="drawer-lang" v-motion-slide-visible-bottom :delay="200">
          <a-button
            v-for="l in availableLocales"
            :key="l.key"
            :type="locale === l.key ? 'primary' : 'default'"
            size="small"
            @click="handleLangChange({ key: l.key })"
            class="drawer-lang-btn"
          >
            {{ l.label }}
          </a-button>
        </div>
        <div class="drawer-actions" v-motion-slide-visible-bottom :delay="300">
          <a-button type="primary" block size="large" @click="handleInquiry">
            {{ $t('home.getQuote') }}
          </a-button>
        </div>
      </div>
    </a-drawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue'
import { availableLocales, setLocale } from '../../i18n'
import { useWhatsApp } from '../../composables/useWhatsApp'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const { openWhatsApp } = useWhatsApp()

const currentKeys = ref<string[]>(['home'])
const drawerVisible = ref(false)

const menuItems = computed(() => [
  { key: '/', label: t('nav.home'), icon: HomeOutlined, delay: 100 },
  { key: '/products', label: t('nav.products'), icon: AppstoreOutlined, delay: 150 },
  { key: '/oem', label: t('nav.oem'), icon: SettingOutlined, delay: 200 },
  { key: '/about', label: t('nav.about'), icon: TeamOutlined, delay: 250 },
  { key: '/faq', label: t('nav.faq'), icon: QuestionCircleOutlined, delay: 300 },
  { key: '/contact', label: t('nav.contact'), icon: PhoneOutlined, delay: 350 },
])

const currentLangLabel = computed(() => {
  const found = availableLocales.find(l => l.key === locale.value)
  return found?.label || 'English'
})

const handleLangChange = ({ key }: { key: string }) => {
  setLocale(key)
  drawerVisible.value = false
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/logo.png'
}

const openDrawer = () => {
  drawerVisible.value = true
}

const handleMenuClick = (path: string) => {
  drawerVisible.value = false
  router.push(path)
}

const handleInquiry = () => {
  drawerVisible.value = false
  openWhatsApp()
}

function updateActiveKey() {
  const path = route.path
  if (path === '/' || path === '') currentKeys.value = ['home']
  else if (path.startsWith('/products')) currentKeys.value = ['products']
  else if (path === '/oem') currentKeys.value = ['oem']
  else if (path === '/about') currentKeys.value = ['about']
  else if (path === '/faq') currentKeys.value = ['faq']
  else if (path === '/contact') currentKeys.value = ['contact']
}

onMounted(updateActiveKey)
watch(() => route.path, updateActiveKey)
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: auto;
  line-height: normal;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 0;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo a { display: flex; align-items: center; }

.logo-image {
  width: 130px;
  height: auto;
  object-fit: contain;
}

.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  font-weight: 600;
}

.nav-menu :deep(.ant-menu-item) {
  padding: 0 16px !important;
  font-weight: 600;
  font-size: 15px;
  font-family: 'DM Sans', sans-serif;
}

.menu-trigger {
  display: none;
  font-size: 20px;
  padding: 4px 8px;
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
}

.lang-btn {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
}

.cta-btn {
  background: var(--gradient-amber);
  border: none;
  font-weight: 600;
  white-space: nowrap;
  font-size: 14px;
  padding: 8px 20px;
  height: auto;
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  color: var(--color-navy);
}
.cta-btn:hover { opacity: 0.92; }

/* Mobile drawer */
.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-logo {
  padding: 24px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.drawer-logo .logo-image { width: 140px; }

.mobile-menu {
  border: none;
  flex: 1;
}

.mobile-menu :deep(.ant-menu-item) {
  padding: 16px 20px !important;
  font-size: 16px;
  height: auto;
  line-height: 1.5;
  margin: 4px 8px;
  border-radius: 8px;
  font-weight: 600 !important;
}

.mobile-menu :deep(.ant-menu-item .anticon) {
  margin-right: 16px;
  font-size: 18px;
}

.drawer-lang {
  display: flex;
  gap: 8px;
  padding: 0 20px 12px;
  justify-content: center;
}

.drawer-lang-btn {
  border-radius: 12px;
  font-size: 13px;
}

.drawer-actions {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.drawer-actions .ant-btn {
  height: 48px;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 992px) {
  .desktop-menu, .desktop-actions { display: none; }
  .menu-trigger { display: block; }
  .header-content { justify-content: space-between; }
  .logo { position: absolute; left: 50%; transform: translateX(-50%); }
  .logo-image { width: 110px; }
}

@media (max-width: 576px) {
  .header { padding: 0 12px; }
  .logo-image { width: 95px; }
}
</style>
