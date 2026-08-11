<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useThemeStore } from '@/stores/theme'
import SkeletonCard from './components/SkeletonCard.vue'

gsap.registerPlugin(ScrollTrigger)

/**
 * 根组件
 * 管理全局主题、骨架屏加载状态、页面切换动画
 */
const themeStore = useThemeStore()
const isLoading = ref(true)

onMounted(() => {
  // 初始化主题
  document.documentElement.setAttribute('data-theme', themeStore.mode)

  // 模拟数据加载（1s 后显示真实内容）
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

onBeforeUnmount(() => {
  // 清理所有 ScrollTrigger
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// GSAP 页面过渡动画钩子
function onBeforeEnter(el) {
  gsap.set(el, { opacity: 0, y: 40 })
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out',
    onComplete: done
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>

<template>
  <!-- 骨架屏 -->
  <template v-if="isLoading">
    <div class="skeleton-page">
      <div class="skeleton-page__hero">
        <div class="skeleton-page__hero-title skeleton-pulse"></div>
        <div class="skeleton-page__hero-subtitle skeleton-pulse"></div>
      </div>
      <div class="skeleton-page__grid">
        <SkeletonCard v-for="n in 4" :key="n" />
      </div>
    </div>
  </template>

  <!-- 路由视图（带 GSAP 页面过渡动画） -->
  <template v-else>
    <router-view v-slot="{ Component, route }">
      <transition
        mode="out-in"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </template>
</template>

<style lang="scss">
@use '@/styles/_mixins.scss' as *;

/* 骨架屏样式 */
.skeleton-page {
  min-height: 100vh;
  background: var(--md-sys-color-surface);
  padding: $spacing-2xl $spacing-lg;

  &__hero {
    @include flex-column;
    align-items: center;
    gap: $spacing-md;
    padding: 120px 0 $spacing-3xl;
  }

  &__hero-title {
    width: 280px;
    height: 48px;
    border-radius: var(--md-sys-shape-corner-medium);
  }

  &__hero-subtitle {
    width: 200px;
    height: 24px;
    border-radius: var(--md-sys-shape-corner-extra-small);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: $spacing-lg;
    max-width: $container-max-width;
    margin: 0 auto;
  }
}

.skeleton-pulse {
  background: var(--md-sys-color-surface-container-highest);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
</style>