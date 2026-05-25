<template>
  <a-config-provider :theme="themeConfig" :locale="antLocale">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <WhatsAppFloat />
    <a-back-top :visibility-height="400" :style="{ right: '28px', bottom: '120px' }" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import enUS from 'ant-design-vue/es/locale/en_US'
import esES from 'ant-design-vue/es/locale/es_ES'
import frFR from 'ant-design-vue/es/locale/fr_FR'
import deDE from 'ant-design-vue/es/locale/de_DE'
import WhatsAppFloat from './components/common/WhatsAppFloat.vue'

const { locale } = useI18n()

const localeMap: Record<string, typeof enUS> = {
  en: enUS,
  es: esES,
  fr: frFR,
  de: deDE,
}

const antLocale = computed(() => localeMap[locale.value] || enUS)

const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#e8941a',
    colorSuccess: '#16a34a',
    colorWarning: '#e8941a',
    colorError: '#dc2626',
    colorInfo: '#0f172a',
    borderRadius: 8,
    fontFamily: "'DM Sans', 'Sora', -apple-system, 'Segoe UI', sans-serif",
    fontSize: 15,
    colorText: '#1a1d23',
    colorTextSecondary: '#5c6370',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#faf9f6',
    colorBorder: '#e7e3da',
  },
  components: {
    Button: {
      borderRadius: 999,
      controlHeight: 42,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 16,
    },
    Menu: {
      itemSelectedColor: '#e8941a',
      itemSelectedBg: '#fef3c7',
      horizontalItemSelectedColor: '#e8941a',
    },
    Collapse: {
      borderRadiusLG: 16,
    },
    Breadcrumb: {
      itemColor: '#5c6370',
      lastItemColor: '#1a1d23',
      linkColor: '#5c6370',
      linkHoverColor: '#e8941a',
    },
    Tag: {
      borderRadiusSM: 999,
    },
  },
}))
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', 'Sora', -apple-system, 'Segoe UI', sans-serif;
  background-color: #faf9f6;
  line-height: 1.7;
  color: #1a1d23;
}

#app {
  min-height: 100vh;
}

.ant-back-top {
  right: 28px !important;
  bottom: 120px !important;
}
</style>
