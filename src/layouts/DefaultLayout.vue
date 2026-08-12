<script setup>
import AppBar from '@/components/AppBar.vue'

/**
 * 默认布局 - 全屏滚动容器
 * 固定导航栏 + 内容区（scroll-snap 翻页）
 */
</script>

<template>
  <div class="default-layout">
    <AppBar />
    <router-view />
  </div>
</template>

<style lang="scss">
.default-layout {
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>