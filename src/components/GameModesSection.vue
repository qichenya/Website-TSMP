<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from './SectionTitle.vue'
import GameModeCard from './GameModeCard.vue'
import { gameModes } from '@/data/gameModes'

gsap.registerPlugin(ScrollTrigger)

/**
 * 游戏模式展示区
 * 使用 CSS Grid 展示 8 种游戏模式卡片
 * GSAP ScrollTrigger：卡片依次从底部淡入上浮（stagger 0.1）
 */
const gridRef = ref(null)
let triggers = []

onMounted(() => {
  // 等待 DOM 渲染完成后触发动画
  nextTick(() => {
    const cards = gridRef.value?.querySelectorAll('.game-card')
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
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
  triggers.forEach(t => t.kill())
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
  <section id="game-modes" class="section game-modes">
    <div class="game-modes__container">
      <SectionTitle
        title="游戏模式"
        subtitle="从经典起床战争到现代竞技决斗，8 种精彩玩法等你来体验"
      />

      <div ref="gridRef" class="game-modes__grid">
        <GameModeCard
          v-for="mode in gameModes"
          :key="mode.id"
          :mode="mode"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.game-modes {
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

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>