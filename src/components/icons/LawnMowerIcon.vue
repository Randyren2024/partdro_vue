<template>
  <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 把手 (handle) -->
    <path d="M50 10L42 22" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M48 8L52 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <!-- 机身 (body) -->
    <path d="M10 30C10 26 13 24 16 24H42C45 24 48 26 48 30V38H10V30Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round" fill="none"/>
    <!-- 控制面板/草箱盖 -->
    <path d="M18 24V20C18 18 19 17 21 17H37C39 17 40 18 40 20V24" stroke="currentColor" stroke-width="3" stroke-linejoin="round" fill="none"/>
    <!-- 状态灯 -->
    <circle cx="29" cy="20.5" r="1.5" fill="currentColor"/>
    <!-- 后轮 -->
    <circle cx="18" cy="44" r="5" stroke="currentColor" stroke-width="3" fill="none"/>
    <!-- 前轮 -->
    <circle cx="40" cy="44" r="5" stroke="currentColor" stroke-width="3" fill="none"/>
    <!-- 割草刀/割痕线 (cutting blade line) -->
    <path d="M8 52H50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 3"/>
  </svg>
</template>
