<template>
  <div class="world-map-container">
    <div class="map-header" v-if="title">
      <h3 class="map-title">{{ title }}</h3>
      <p class="map-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="map-wrapper" ref="mapContainer" v-show="isMounted">
      <MapChart
        :key="mapKey"
        :data="mapData"
        :base-color="baseColor"
        :width="width"
        :height="height"
        @map-item-click="handleMapClick"
        @map-item-mouseover="handleMapHover"
        @map-item-mouseout="handleMapLeave"
      >
        <WorldMapChart />
      </MapChart>
      
      <!-- 图例 -->
      <div class="map-legend" v-if="showLegend">
        <div class="legend-item" v-for="(item, index) in legendItems" :key="index">
          <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
          <span class="legend-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    
    <!-- 国家详情弹窗 -->
    <div v-if="selectedCountry" class="country-details">
      <div class="details-header">
        <h4>{{ selectedCountry.name }}</h4>
        <button class="close-btn" @click="selectedCountry = null">×</button>
      </div>
      <div class="details-content">
        <div class="detail-item" v-if="selectedCountry.dealerCount">
          <span class="detail-label">Dealers:</span>
          <span class="detail-value">{{ selectedCountry.dealerCount }}</span>
        </div>
        <div class="detail-item" v-if="selectedCountry.cities">
          <span class="detail-label">Coverage:</span>
          <span class="detail-value">{{ selectedCountry.cities.join(', ') }}</span>
        </div>
        <div class="detail-item" v-if="selectedCountry.description">
          <span class="detail-label">Description:</span>
          <span class="detail-value">{{ selectedCountry.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { MapChart, WorldMap as WorldMapChart } from 'vue3-map-chart'
import 'vue3-map-chart/dist/style.css'

// Props
interface Props {
  title?: string
  subtitle?: string
  dealerLocations?: DealerLocation[]
  showLegend?: boolean
  width?: string | number
  height?: string | number
  baseColor?: string
}

export interface DealerLocation {
  countryCode: string
  countryName: string
  city: string
  lat?: number
  lng?: number
  dealerName?: string
  dealerCount?: number
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Our Global Presence',
  subtitle: 'Vesper AgriTech dealers and partners worldwide',
  showLegend: true,
  width: '100%',
  height: 500,
  baseColor: '#52c41a'
})

const mapContainer = ref<HTMLElement | null>(null)
const mapKey = ref(0)
const isMounted = ref(false)

onMounted(async () => {
  await nextTick()
  mapKey.value++
  isMounted.value = true
})

// 默认经销商数据（示例）
const defaultDealerLocations: DealerLocation[] = [
  // 大洋洲
  { countryCode: 'AU', countryName: 'Australia', city: 'Sydney', dealerCount: 5, description: 'Headquarters and main distribution center' },
  { countryCode: 'NZ', countryName: 'New Zealand', city: 'Auckland', dealerCount: 2, description: 'Regional partner for Oceania' },
  
  // 北美洲
  { countryCode: 'US', countryName: 'United States', city: 'California', dealerCount: 8, description: 'Major market with multiple distributors' },
  { countryCode: 'CA', countryName: 'Canada', city: 'Toronto', dealerCount: 3, description: 'Canadian agricultural technology partner' },
  
  // 欧洲
  { countryCode: 'GB', countryName: 'United Kingdom', city: 'London', dealerCount: 4, description: 'European headquarters' },
  { countryCode: 'DE', countryName: 'Germany', city: 'Berlin', dealerCount: 3, description: 'Central European distribution' },
  { countryCode: 'FR', countryName: 'France', city: 'Paris', dealerCount: 2, description: 'French agricultural solutions' },
  
  // 亚洲
  { countryCode: 'CN', countryName: 'China', city: 'Shanghai', dealerCount: 10, description: 'Manufacturing and R&D center' },
  { countryCode: 'JP', countryName: 'Japan', city: 'Tokyo', dealerCount: 3, description: 'Japanese technology partner' },
  { countryCode: 'KR', countryName: 'South Korea', city: 'Seoul', dealerCount: 2, description: 'Korean agricultural innovation' },
  { countryCode: 'IN', countryName: 'India', city: 'Mumbai', dealerCount: 4, description: 'Indian market expansion' },
  
  // 南美洲
  { countryCode: 'BR', countryName: 'Brazil', city: 'São Paulo', dealerCount: 3, description: 'South American agricultural hub' },
  { countryCode: 'AR', countryName: 'Argentina', city: 'Buenos Aires', dealerCount: 2, description: 'Argentinian farming solutions' },
]

// 使用传入的数据或默认数据
const dealerLocations = computed(() => props.dealerLocations || defaultDealerLocations)

// 处理地图数据
const mapData = computed(() => {
  const data: Record<string, number | { value: number; color?: string }> = {}
  
  dealerLocations.value.forEach(location => {
    if (location.dealerCount) {
      // 根据经销商数量设置颜色深浅
      let color = props.baseColor
      if (location.dealerCount >= 8) {
        color = '#2e7d32' // 深绿 - 高密度
      } else if (location.dealerCount >= 4) {
        color = '#4caf50' // 中绿 - 中密度
      } else {
        color = '#8bc34a' // 浅绿 - 低密度
      }
      
      data[location.countryCode] = {
        value: location.dealerCount,
        color: color
      }
    } else {
      data[location.countryCode] = 1 // 最小显示值
    }
  })
  
  return data
})

// 图例项
const legendItems = computed(() => [
  { color: '#2e7d32', label: 'High Density (8+ dealers)' },
  { color: '#4caf50', label: 'Medium Density (4-7 dealers)' },
  { color: '#8bc34a', label: 'Low Density (1-3 dealers)' }
])

// 选中国家
const selectedCountry = ref<DealerLocation | null>(null)

// 按国家分组城市
const groupedByCountry = computed(() => {
  const groups: Record<string, {
    name: string
    code: string
    cities: string[]
    dealerCount: number
    description?: string
  }> = {}
  
  dealerLocations.value.forEach(location => {
    if (!groups[location.countryCode]) {
      groups[location.countryCode] = {
        name: location.countryName,
        code: location.countryCode,
        cities: [],
        dealerCount: 0,
        description: location.description
      }
    }
    
    groups[location.countryCode].cities.push(location.city)
    groups[location.countryCode].dealerCount += location.dealerCount || 1
  })
  
  return groups
})

// 事件处理
const handleMapClick = (countryCode: string) => {
  const country = groupedByCountry.value[countryCode]
  if (country) {
    selectedCountry.value = {
      countryCode: country.code,
      countryName: country.name,
      city: country.cities.join(', '),
      dealerCount: country.dealerCount,
      description: country.description
    }
  }
}

const handleMapHover = (countryCode: string) => {
  // 可以添加悬停效果
  console.log('Hovered over:', countryCode)
}

const handleMapLeave = (countryCode: string) => {
  // 可以移除悬停效果
  console.log('Left:', countryCode)
}

// 暴露方法给父组件
defineExpose({
  getMapData: () => mapData.value,
  getDealerLocations: () => dealerLocations.value,
  selectCountry: (countryCode: string) => handleMapClick(countryCode)
})
</script>

<style scoped>
.world-map-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.map-header {
  text-align: center;
  margin-bottom: 30px;
}

.map-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.map-subtitle {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.map-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
  min-height: 400px;
}

.map-wrapper :deep(svg) {
  width: 100% !important;
  height: auto !important;
}

.map-wrapper :deep(.vue-map-chart) {
  width: 100% !important;
}

.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.legend-label {
  font-size: 14px;
  color: #444;
}

.country-details {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-width: 300px;
  z-index: 100;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.details-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #666;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.detail-label {
  font-weight: 600;
  color: #444;
  font-size: 14px;
  margin-right: 10px;
  flex-shrink: 0;
}

.detail-value {
  color: #666;
  font-size: 14px;
  text-align: right;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .map-title {
    font-size: 24px;
  }
  
  .map-subtitle {
    font-size: 14px;
  }
  
  .map-legend {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .country-details {
    position: relative;
    top: auto;
    left: auto;
    margin-top: 20px;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .map-title {
    font-size: 20px;
  }
  
  .legend-item {
    flex-wrap: wrap;
  }
  
  .legend-label {
    font-size: 12px;
  }
}
</style>