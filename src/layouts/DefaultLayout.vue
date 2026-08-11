<script setup>
import AppBar from '@/components/AppBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

/**
 * 默认布局组件
 * 所有页面共享的布局结构：导航栏 + 内容区 + 页脚 + 回到顶部
 */
</script>

<template>
  <div class="default-layout">
    <AppBar />
    <main class="default-layout__main">
      <router-view />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }
}
</style>