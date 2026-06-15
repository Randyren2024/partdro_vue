<template>
  <a-card class="product-card" hoverable>
    <template #cover>
      <div :class="['product-image', type]">
        {{ product.code }}
      </div>
    </template>
    <a-card-meta :title="product.name">
      <template #description>
        {{ product.description }}
      </template>
    </a-card-meta>
    <div class="product-features">
      <a-tag v-for="feature in product.features" :key="feature" color="green">
        {{ feature }}
      </a-tag>
    </div>
    <div class="product-actions">
      <a-button type="primary" size="small" @click="$emit('learn-more')">Learn More</a-button>
      <a-button size="small" @click="$emit('get-quote')">Get Quote</a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
defineProps<{
  product: {
    code: string
    name: string
    description: string
    features: string[]
    type: 'navigation' | 'robot' | 'sensor'
  }
}>()

defineEmits<{
  'learn-more': []
  'get-quote': []
}>()
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.product-image.navigation {
  background: linear-gradient(135deg, #52c41a, #389e0d);
}

.product-image.robot {
  background: linear-gradient(135deg, #1890ff, #096dd9);
}

.product-image.sensor {
  background: linear-gradient(135deg, #722ed1, #531dab);
}

.product-features {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-actions {
  margin-top: auto;
  display: flex;
  gap: 12px;
}
</style>