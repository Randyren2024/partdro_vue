<template>
  <a-config-provider :theme="theme">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { computed } from 'vue'

const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#2e7d32',
    colorSuccess: '#4caf50',
    colorWarning: '#ff9800',
    colorError: '#f44336',
    colorInfo: '#2196f3',
    borderRadius: 8,
    fontFamily: "'Noto Sans', 'Noto Sans SC', 'Inter', -apple-system, 'Segoe UI', sans-serif",
    fontSize: 14,
    colorText: '#2c3e50',
    colorTextSecondary: '#666',
    colorBgContainer: '#ffffff',
    colorBorder: '#e8e8e8',
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 12,
      colorBorderSecondary: '#f0f0f0',
    },
    Menu: {
      itemSelectedColor: '#2e7d32',
      itemSelectedBg: '#f6ffed',
    },
  },
}))

const theme = themeConfig
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans', 'Noto Sans SC', 'Inter', -apple-system, 'Segoe UI', sans-serif;
  background-color: #f8f9fa;
  line-height: 1.7;
}

#app {
  min-height: 100vh;
}
</style>