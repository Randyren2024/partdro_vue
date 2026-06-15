<template>
  <a-card class="solution-card" hoverable>
    <template #cover>
      <div :class="['solution-icon', type]">
        {{ icon }}
      </div>
    </template>
    <a-card-meta :title="title">
      <template #description>
        {{ description }}
      </template>
    </a-card-meta>
    <div class="solution-benefits">
      <div v-for="benefit in benefits" :key="benefit" class="benefit-item">
        <check-circle-outlined class="benefit-icon" />
        <span>{{ benefit }}</span>
      </div>
    </div>
    <div class="solution-action">
      <a-button type="link" @click="$emit('explore')">Explore Solution →</a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { CheckCircleOutlined } from '@ant-design/icons-vue'

defineProps<{
  title: string
  description: string
  icon: string
  type: 'precision' | 'robotics' | 'iot' | 'data'
  benefits: string[]
}>()

defineEmits<{
  explore: []
}>()
</script>

<style scoped>
.solution-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.solution-icon {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.solution-icon.precision {
  background: linear-gradient(135deg, #b7eb8f, #95de64);
}

.solution-icon.robotics {
  background: linear-gradient(135deg, #91d5ff, #69c0ff);
}

.solution-icon.iot {
  background: linear-gradient(135deg, #d3adf7, #b37feb);
}

.solution-icon.data {
  background: linear-gradient(135deg, #ffd666, #ffc53d);
}

.solution-benefits {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.benefit-icon {
  color: #52c41a;
}

.solution-action {
  margin-top: auto;
}
</style>