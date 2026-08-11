<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

/**
 * 回到顶部 FAB 按钮
 * 滚动超过 400px 时显示，点击后平滑滚动到顶部
 */
const THRESHOLD = 400

const isVisible = ref(false)
const fabRef = ref(null)

function checkScroll() {
  isVisible.value = window.scrollY > THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})

// 监听 isVisible 变化，触发 GSAP 动画
import { watch } from 'vue'
watch(isVisible, (visible) => {
  if (visible) {
    gsap.fromTo(fabRef.value, 
      { opacity: 0, scale: 0.5, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
    )
  }
})
</script>

<template>
  <Transition name="fab">
    <button
      v-show="isVisible"
      ref="fabRef"
      class="scroll-to-top"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <span class="material-symbols-outlined">keyboard_arrow_up</span>
    </button>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.scroll-to-top {
  position: fixed;
  bottom: $spacing-xl;
  right: $spacing-xl;
  z-index: $z-fab;
  width: 48px;
  height: 48px;
  border-radius: var(--md-sys-shape-corner-large);
  background-color: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  box-shadow: var(--md-sys-elevation-3);
  @include flex-center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    filter: brightness(0.95);
  }

  .material-symbols-outlined {
    font-size: 28px;
  }
}

/* 过渡动画 */
.fab-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fab-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(16px);
}
</style>