<script setup>
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import GameModesSection from '@/components/GameModesSection.vue'
import VersionSupport from '@/components/VersionSupport.vue'
import StatsSection from '@/components/StatsSection.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

/**
 * 单页面 HomeView
 * 每个区块占满一屏，scroll-snap 翻页
 */
const serverIP = 'mc.trystage.cn'
const qqGroup = '649523125'
const copied = ref(false)

async function copyIP() {
  try {
    await navigator.clipboard.writeText(serverIP)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    const input = document.createElement('input')
    input.value = serverIP
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<template>
  <!-- 区块 1：Hero（全屏） -->
  <HeroSection />

  <!-- 区块 2：游戏模式（全屏） -->
  <section id="game-modes" class="page-section">
    <div class="page-section__inner">
      <GameModesSection />
    </div>
  </section>

  <!-- 区块 3：版本支持（全屏） -->
  <section id="versions" class="page-section page-section--alt">
    <div class="page-section__inner">
      <VersionSupport />
    </div>
  </section>

  <!-- 区块 4：项目实力（全屏） -->
  <section id="stats" class="page-section">
    <div class="page-section__inner">
      <StatsSection />
    </div>
  </section>

  <!-- 区块 5：加入我们（全屏） -->
  <section id="join" class="page-section page-section--alt">
    <div class="page-section__inner join-page">
      <SectionTitle
        title="加入我们"
        subtitle="即刻加入 Trystage，开始你的冒险之旅"
      />

      <!-- 信息栏：IP + 复制 + QQ + 版本 -->
      <div class="join-page__bar">
        <div class="join-page__bar-item join-page__bar-item--ip">
          <span class="material-symbols-outlined join-page__bar-icon">dns</span>
          <code class="join-page__bar-ip">{{ serverIP }}</code>
          <button
            class="md3-btn md3-btn-filled join-page__bar-copy"
            :class="{ 'join-page__bar-copy--done': copied }"
            @click="copyIP"
          >
            <span class="material-symbols-outlined">{{ copied ? 'check' : 'content_copy' }}</span>
            {{ copied ? '已复制' : '复制' }}
          </button>
        </div>
        <div class="join-page__bar-divider"></div>
        <div class="join-page__bar-item">
          <span class="material-symbols-outlined join-page__bar-icon">group</span>
          <div>
            <p class="join-page__bar-label">QQ 群</p>
            <p class="join-page__bar-value">{{ qqGroup }}</p>
          </div>
        </div>
        <div class="join-page__bar-divider"></div>
        <div class="join-page__bar-item">
          <span class="material-symbols-outlined join-page__bar-icon">devices</span>
          <div>
            <p class="join-page__bar-label">版本</p>
            <p class="join-page__bar-value">1.8 — 1.21</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <AppFooter />
  <ScrollToTop />
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

// ====== 全屏区块 ======
.page-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--md-sys-color-surface);
  padding: $appbar-height $spacing-lg $spacing-2xl;
  overflow-y: auto;

  @include respond-to(md) {
    padding: calc(#{$appbar-height} + #{$spacing-xl}) $spacing-xl $spacing-3xl;
  }

  &--alt {
    background: var(--md-sys-color-surface-container-lowest);
  }

  &__inner {
    width: 100%;
    max-width: $container-max-width;
  }
}

// ====== 加入我们区块 ======
.join-page {
  max-width: $container-narrow;
  margin: 0 auto;

  // 信息栏（IP + QQ + 版本，一行排列）
  &__bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg;
    background: var(--md-sys-color-surface-container);
    border-radius: var(--md-sys-shape-corner-large);
    border: 1px solid var(--md-sys-color-outline-variant);
    margin-bottom: $spacing-lg;
  }

  &__bar-item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    flex: 1;
    min-width: 0;

    &--ip {
      flex: 2;
    }
  }

  &__bar-icon {
    font-size: 24px;
    color: var(--md-sys-color-primary);
    flex-shrink: 0;
  }

  &__bar-ip {
    font-family: 'Roboto Mono', monospace;
    font-size: 15px;
    font-weight: 600;
    color: var(--md-sys-color-on-surface);
    background: var(--md-sys-color-surface-container-highest);
    padding: $spacing-xs $spacing-md;
    border-radius: var(--md-sys-shape-corner-small);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__bar-copy {
    height: 36px;
    font-size: 13px;
    padding: 0 $spacing-md;
    gap: $spacing-xs;
    border-radius: var(--md-sys-shape-corner-full);
    flex-shrink: 0;

    .material-symbols-outlined {
      font-size: 18px;
    }

    &--done {
      background: var(--md-sys-color-tertiary) !important;
      color: var(--md-sys-color-on-tertiary) !important;
    }
  }

  &__bar-divider {
    width: 1px;
    height: 32px;
    background: var(--md-sys-color-outline-variant);
    flex-shrink: 0;
    display: none;

    @include respond-to(md) {
      display: block;
    }
  }

  &__bar-label {
    font-size: 11px;
    color: var(--md-sys-color-on-surface-variant);
    letter-spacing: 0.5px;
  }

  &__bar-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--md-sys-color-on-surface);
  }
}
</style>