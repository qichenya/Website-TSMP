<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from './SectionTitle.vue'
import { versionData } from '@/data/versionData'

gsap.registerPlugin(ScrollTrigger)

/**
 * 多版本支持展示区
 * 展示 1.8 / 1.20 / 1.21 三个版本及其对应游戏模式
 * GSAP ScrollTrigger：三个版本卡片从左右滑入
 */
const gridRef = ref(null)

onMounted(() => {
  nextTick(() => {
    const cards = gridRef.value?.querySelectorAll('.version-card')
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.value,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})

function nextTick() {
  return new Promise(resolve => {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    } else {
      setTimeout(resolve, 50)
    }
  })
}
</script>

<template>
  <section id="versions" class="section section-alt versions">
    <div class="versions__container">
      <SectionTitle
        title="多版本支持"
        subtitle="无论你使用哪个版本，都能找到最适合你的游戏模式"
      />

      <div ref="gridRef" class="versions__grid">
        <div
          v-for="v in versionData"
          :key="v.version"
          class="version-card"
        >
          <!-- 版本头部 -->
          <div class="version-card__header" :style="{ borderTopColor: v.color }">
            <span class="version-card__number md3-display-small" :style="{ color: v.color }">
              {{ v.version }}
            </span>
            <div>
              <h3 class="version-card__label md3-title-large">{{ v.label }}</h3>
              <p class="version-card__desc md3-body-medium">{{ v.description }}</p>
            </div>
          </div>

          <!-- 游戏模式标签 -->
          <div class="version-card__modes">
            <span
              v-for="mode in v.modes"
              :key="mode"
              class="md3-chip"
            >
              {{ mode }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.versions {
  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.version-card {
  @include card-base;
  padding: $spacing-xl;
  box-shadow: var(--md-sys-elevation-1);
  border-top: 4px solid transparent;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__number {
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
  }

  &__label {
    color: var(--md-sys-color-on-surface);
    margin-bottom: $spacing-xs;
  }

  &__desc {
    color: var(--md-sys-color-on-surface-variant);
  }

  &__modes {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }
}
</style>