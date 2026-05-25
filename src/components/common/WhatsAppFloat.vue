<template>
  <a-tooltip :title="$t('whatsapp.tooltip')" placement="left">
    <a-button
      class="whatsapp-float"
      shape="circle"
      @click="openWhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.504 6.841h-.003a9.7 9.7 0 0 1-4.946-1.354l-.354-.21-3.944 1.034 1.053-3.842-.232-.37a9.68 9.68 0 0 1-1.486-5.16c.002-5.35 4.358-9.706 9.71-9.706a9.66 9.66 0 0 1 6.866 2.842 9.65 9.65 0 0 1 2.843 6.864c-.001 5.351-4.358 9.705-9.708 9.705m8.652-18.36A12.22 12.22 0 0 0 11.964.002C5.382.002.003 5.378.001 11.956A11.95 11.95 0 0 0 1.6 17.33L0 23.998l6.82-1.785a11.96 11.96 0 0 0 5.137 1.306h.004c6.581 0 11.96-5.377 11.961-11.96a11.93 11.93 0 0 0-3.507-8.472"/>
      </svg>
    </a-button>
  </a-tooltip>
</template>

<script setup lang="ts">
import { useWhatsApp } from '../../composables/useWhatsApp'

const { openWhatsApp } = useWhatsApp()
</script>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 56px;
  height: 56px;
  background: #25D366 !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  animation: whatsapp-bounce 2s ease-in-out infinite;
}

.whatsapp-float:hover {
  background: #20bd5a !important;
  animation: none;
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
}

@keyframes whatsapp-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .whatsapp-float {
    bottom: 20px;
    right: 16px;
    width: 50px;
    height: 50px;
  }

  @keyframes whatsapp-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
}
</style>
