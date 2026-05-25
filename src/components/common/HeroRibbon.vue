<template>
  <div class="hero-ribbon" aria-hidden="true">
    <svg
      viewBox="0 0 800 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbon-main" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e8941a" stop-opacity="0" />
          <stop offset="15%" stop-color="#f5b042" stop-opacity="0.6" />
          <stop offset="50%" stop-color="#e8941a" stop-opacity="0.9" />
          <stop offset="85%" stop-color="#f5b042" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#e8941a" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="ribbon-ghost" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f5b042" stop-opacity="0" />
          <stop offset="20%" stop-color="#f7c873" stop-opacity="0.3" />
          <stop offset="60%" stop-color="#f5b042" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#f7c873" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path
        class="ribbon-main"
        d="M0 30 Q100 5 200 20 Q300 35 400 15 Q500 -5 600 18 Q700 38 800 12"
        fill="none"
        stroke="url(#ribbon-main)"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        class="ribbon-ghost"
        d="M0 32 Q120 15 220 26 Q320 37 420 20 Q520 3 620 25 Q720 42 800 18"
        fill="none"
        stroke="url(#ribbon-ghost)"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-ribbon {
  width: 100%;
  max-width: 420px;
  height: 24px;
  margin: 0 auto 8px;
  overflow: visible;
}

.hero-ribbon svg {
  width: 100%;
  height: 100%;
}

.ribbon-main {
  animation: ribbonFloat 4s ease-in-out infinite alternate;
}

.ribbon-ghost {
  animation: ribbonFloat 5s ease-in-out 0.5s infinite alternate-reverse;
}

@keyframes ribbonFloat {
  0% {
    transform: translateX(-6px);
    opacity: 0.7;
  }
  50% {
    transform: translateX(6px);
    opacity: 1;
  }
  100% {
    transform: translateX(-3px);
    opacity: 0.8;
  }
}
</style>
