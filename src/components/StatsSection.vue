<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from './SectionTitle.vue'
import StatCounter from './StatCounter.vue'
import { statsData } from '@/data/statsData'

gsap.registerPlugin(ScrollTrigger)

/**
 * 项目实力统计区
 * 展示 60+ 开源项目、开发者 API、机器猫猫 三个数据指标
 * GSAP ScrollTrigger：卡片淡入上浮
 */
const gridRef = ref(null)

onMounted(() => {
  nextTick(() => {
    const cards = gridRef.value?.querySelectorAll('.stats__card')
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.value,
            start: 'top 85%',
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
  <div class="stats">
    <div class="stats__container">
      <SectionTitle
        title="项目实力"
        subtitle="多年积累的技术沉淀，为玩家提供稳定的游戏体验"
      />

      <div ref="gridRef" class="stats__grid">
        <div v-for="stat in statsData" :key="stat.title" class="stats__card">
          <div class="stats__card-icon">
            <span class="material-symbols-outlined">{{ stat.icon }}</span>
          </div>
          <StatCounter
            :target-value="stat.value"
            :suffix="stat.suffix"
            :duration="2"
          />
          <h3 class="stats__card-title md3-title-large">{{ stat.title }}</h3>
          <p class="stats__card-desc md3-body-medium">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.stats {
  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    @include card-base;
    padding: $spacing-2xl $spacing-xl;
    text-align: center;
    box-shadow: var(--md-sys-elevation-1);
    @include flex-column;
    align-items: center;
    gap: $spacing-md;

    &-icon {
      @include flex-center;
      width: 64px;
      height: 64px;
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      border-radius: var(--md-sys-shape-corner-large);

      .material-symbols-outlined {
        font-size: 32px;
      }
    }

    &-title {
      color: var(--md-sys-color-on-surface);
    }

  &__card-desc {
    color: var(--md-sys-color-on-surface-variant);
    max-width: 280px;
  }
  }
}
</style>