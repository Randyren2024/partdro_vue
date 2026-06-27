<template>
  <a-layout-header class="header">
    <div class="header-content">
      <!-- 移动端汉堡菜单按钮 -->
      <a-button class="menu-trigger" type="text" @click="openDrawer">
        <MenuOutlined />
      </a-button>
      
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <img 
            src="/logo.webp" 
            alt="Partdro AgriTech" 
            class="logo-image"
            @error="handleLogoError"
          />
        </router-link>
      </div>
      
      <!-- 桌面端菜单 -->
      <a-menu 
        v-model:selectedKeys="currentKeys" 
        mode="horizontal" 
        class="nav-menu desktop-menu"
      >
        <a-menu-item key="home" @click="$router.push('/')">Home</a-menu-item>
        
        <!-- Products & Solutions Dropdown -->
        <a-sub-menu key="products-solutions">
          <template #title>
            <span class="dropdown-title">
              Products & Solutions
              <DownOutlined class="dropdown-icon" />
            </span>
          </template>
<a-menu-item-group>
              <a-menu-item
              v-for="category in categories.slice(0, 5)" 
              :key="category.id"
              @click="handleCategoryClick(category.id)"
            >
              <div class="category-item">
                <component :is="categoryIcons[category.icon]" class="category-icon" />
                <span>{{ category.name }}</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="$router.push('/products-solutions')">
              <span class="view-all">View All →</span>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        
        <a-menu-item key="about" @click="$router.push('/about_us')">About Us</a-menu-item>
        <a-menu-item key="contact" @click="$router.push('/contact_us')">Contact Us</a-menu-item>
      </a-menu>
      
      <!-- Request Demo 按钮 (桌面端) -->
      <div class="header-actions desktop-actions">
        <a-badge :count="cartItemCount" :overflow-count="99" class="cart-badge">
          <a-button type="text" shape="circle" class="cart-icon-btn" @click="cartStore.openDrawer()">
            <ShoppingCartOutlined />
          </a-button>
        </a-badge>
        <a-button type="primary" class="demo-btn" @click="handleRequestDemo">
          Request Demo
        </a-button>
      </div>
    </div>
    
    <!-- 移动端抽屉菜单 -->
    <a-drawer
      v-model:open="drawerVisible"
      title=""
      placement="left"
      :width="280"
      class="mobile-drawer"
      :body-style="{ padding: 0 }"
    >
      <div class="drawer-content">
        <!-- Logo in drawer -->
        <div class="drawer-logo" v-motion-slide-visible-top>
          <img 
            src="/logo.webp" 
            alt="Partdro AgriTech" 
            class="logo-image"
            @error="handleLogoError"
          />
        </div>
        
        <!-- 移动端菜单 -->
        <a-menu
          v-model:selectedKeys="currentKeys"
          mode="vertical"
          class="mobile-menu"
        >
          <a-menu-item 
            v-for="(item, index) in menuItems" 
            :key="item.key"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: index * 50 + 100 } }"
            @click="handleMenuClick(item.key)"
          >
            <component :is="item.icon" /> {{ item.label }}
          </a-menu-item>
        </a-menu>
        
        <!-- Divider -->
        <a-divider />
        
        <!-- Request Demo 按钮 -->
        <div class="drawer-actions" v-motion-slide-visible-bottom :delay="300">
          <a-button type="primary" block size="large" @click="handleRequestDemo">
            Request Demo
          </a-button>
        </div>
      </div>
    </a-drawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MenuOutlined,
  DownOutlined,
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  PhoneOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons-vue'
import { categories } from '../data/products'
import { useCartStore } from '../stores/cart'
import PrecisionAgricultureIcon from './icons/PrecisionAgricultureIcon.vue'
import PrecisionSprayingIcon from './icons/PrecisionSprayingIcon.vue'
import LandLevelingIcon from './icons/LandLevelingIcon.vue'
import LawnMowerIcon from './icons/LawnMowerIcon.vue'
import AgriculturalRobotsIcon from './icons/AgriculturalRobotsIcon.vue'
import MachineControlIcon from './icons/MachineControlIcon.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const currentKeys = ref<string[]>(['home'])
const drawerVisible = ref(false)

const cartItemCount = computed(() => cartStore.totalQuantity)

const menuItems = [
  { key: '/', label: 'Home', icon: HomeOutlined },
  { key: '/products-solutions', label: 'Products & Solutions', icon: AppstoreOutlined },
  { key: '/about_us', label: 'About Us', icon: TeamOutlined },
  { key: '/contact_us', label: 'Contact Us', icon: PhoneOutlined }
]

const categoryIcons: Record<string, any> = {
  'precision-agriculture': PrecisionAgricultureIcon,
  'precision-spraying': PrecisionSprayingIcon,
  'land-leveling': LandLevelingIcon,
  'lawn-mower': LawnMowerIcon,
  'agricultural-robotics': AgriculturalRobotsIcon,
  'machine-control': MachineControlIcon
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

const openDrawer = () => {
  drawerVisible.value = true
}

const handleMenuClick = (path: string) => {
  drawerVisible.value = false
  router.push(path)
}

const handleCategoryClick = async (categoryId: string) => {
  drawerVisible.value = false
  await router.push(`/products-solutions?category=${categoryId}`)
  window.scrollTo(0, 0)
}

const handleRequestDemo = () => {
  drawerVisible.value = false
  const phoneNumber = '8613362853598'
  const message = 'Hello! I would like to learn more about Partdro drone solutions.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

onMounted(() => {
  const path = route.path
  if (path === '/' || path === '') {
    currentKeys.value = ['home']
  } else if (path.includes('products-solutions') || path.startsWith('/product')) {
    currentKeys.value = ['products-solutions']
  } else if (path === '/about_us') {
    currentKeys.value = ['about']
  } else if (path === '/contact_us') {
    currentKeys.value = ['contact']
  }
})
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
  flex-wrap: wrap;
  gap: 12px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo a {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 120px;
  height: auto;
  object-fit: contain;
}

/* 桌面端菜单 */
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
}

/* 汉堡菜单按钮 */
.menu-trigger {
  display: none;
  font-size: 20px;
  padding: 4px 8px;
}

.dropdown-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-icon {
  font-size: 10px;
  margin-left: 2px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon {
  font-size: 16px;
  color: #1888c8;
}

.view-all {
  color: #1888c8;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.demo-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;
  padding: 8px 16px;
  height: auto;
}

.cart-icon-btn {
  font-size: 20px;
  color: #2c3e50;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.cart-icon-btn:hover {
  color: var(--partdro-primary, #1888c8);
  background: rgba(24, 136, 200, 0.08);
}

.cart-badge :deep(.ant-badge-count) {
  background: var(--partdro-primary, #1888c8);
  box-shadow: 0 2px 4px rgba(24, 136, 200, 0.3);
}

/* 移动端抽屉 */
.mobile-drawer :deep(.ant-drawer-body) {
  padding: 0;
}

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

.drawer-logo .logo-image {
  width: 140px;
}

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
}

.mobile-menu :deep(.ant-menu-item-selected) {
  background: linear-gradient(135deg, #1888c8, #1a9de4) !important;
  color: white !important;
}

.mobile-menu :deep(.ant-menu-item:hover) {
  background: #e6f7ff !important;
  color: #1888c8 !important;
}

.mobile-menu :deep(.ant-menu-item) {
  font-weight: 600 !important;
}

.mobile-menu :deep(.ant-menu-item .anticon) {
  margin-right: 16px;
  font-size: 18px;
}

.drawer-actions {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.drawer-actions .ant-btn {
  height: 48px;
  font-size: 16px;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 992px) {
  .desktop-menu {
    display: none;
  }
  
  .desktop-actions {
    display: none;
  }
  
  .menu-trigger {
    display: block;
  }
  
  .header-content {
    justify-content: space-between;
  }
  
  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
  }
  
  .logo-image {
    width: 100px;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 0 12px;
  }
  
  .logo-image {
    width: 90px;
  }
  
  .logo {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .menu-trigger {
    font-size: 18px;
    padding: 4px 6px;
  }
}
</style>