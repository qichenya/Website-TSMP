<script setup>
import { ref } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'

/**
 * 加入我们页面
 * 展示服务器 IP、QQ 群、加入步骤指引
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

const steps = [
  {
    icon: 'download',
    title: '启动 Minecraft',
    desc: '打开 Minecraft Java 版，确保版本在 1.8 — 1.21 之间'
  },
  {
    icon: 'dns',
    title: '添加服务器',
    desc: '点击「多人游戏」→「添加服务器」，输入服务器信息'
  },
  {
    icon: 'login',
    title: '加入游戏',
    desc: '双击服务器或点击「加入服务器」，即可进入游戏'
  },
  {
    icon: 'explore',
    title: '选择模式',
    desc: '进入大厅后选择你喜欢的游戏模式，开始冒险之旅'
  }
]
</script>

<template>
  <section class="section join-page">
    <div class="join-page__container">
      <SectionTitle
        title="加入我们"
        subtitle="只需几步，即刻加入 Trystage 服务器开始冒险"
      />

      <!-- 服务器信息卡片 -->
      <div class="join-page__info-cards">
        <!-- IP 卡片 -->
        <div class="join-page__info-card">
          <div class="join-page__info-icon">
            <span class="material-symbols-outlined">dns</span>
          </div>
          <h3 class="join-page__info-title md3-title-large">服务器 IP</h3>
          <div class="join-page__ip-row">
            <code class="join-page__ip">{{ serverIP }}</code>
            <button
              class="md3-btn md3-btn-outlined join-page__copy-btn"
              :class="{ 'join-page__copy-btn--copied': copied }"
              @click="copyIP"
            >
              <span class="material-symbols-outlined">
                {{ copied ? 'check' : 'content_copy' }}
              </span>
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>
        </div>

        <!-- QQ 群卡片 -->
        <div class="join-page__info-card">
          <div class="join-page__info-icon">
            <span class="material-symbols-outlined">group</span>
          </div>
          <h3 class="join-page__info-title md3-title-large">QQ 交流群</h3>
          <p class="join-page__qq md3-headline-small">{{ qqGroup }}</p>
          <p class="join-page__qq-desc md3-body-medium">加入群聊获取最新资讯和帮助</p>
        </div>

        <!-- 版本支持卡片 -->
        <div class="join-page__info-card">
          <div class="join-page__info-icon">
            <span class="material-symbols-outlined">devices</span>
          </div>
          <h3 class="join-page__info-title md3-title-large">支持版本</h3>
          <p class="join-page__version md3-headline-small">1.8 — 1.21</p>
          <p class="join-page__version-desc md3-body-medium">全版本兼容，总有适合你的玩法</p>
        </div>
      </div>

      <!-- 加入步骤 -->
      <div class="join-page__steps">
        <h2 class="join-page__steps-title md3-headline-medium">加入步骤</h2>
        <div class="join-page__steps-grid">
          <div v-for="(step, index) in steps" :key="index" class="join-page__step">
            <div class="join-page__step-number">{{ index + 1 }}</div>
            <div class="join-page__step-content">
              <div class="join-page__step-icon">
                <span class="material-symbols-outlined">{{ step.icon }}</span>
              </div>
              <div>
                <h3 class="md3-title-medium">{{ step.title }}</h3>
                <p class="md3-body-medium">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部 CTA -->
      <div class="join-page__cta">
        <router-link to="/game-modes" class="md3-btn md3-btn-filled join-page__cta-btn">
          <span class="material-symbols-outlined">explore</span>
          浏览游戏模式
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.join-page {
  &__container {
    @include container;
    max-width: $container-narrow;
  }

  &__info-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    margin-bottom: $spacing-3xl;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__info-card {
    @include card-base;
    padding: $spacing-xl;
    text-align: center;
    box-shadow: var(--md-sys-elevation-1);
    @include flex-column;
    align-items: center;
    gap: $spacing-md;
  }

  &__info-icon {
    @include flex-center;
    width: 56px;
    height: 56px;
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    border-radius: var(--md-sys-shape-corner-large);

    .material-symbols-outlined {
      font-size: 28px;
    }
  }

  &__info-title {
    color: var(--md-sys-color-on-surface-variant);
  }

  &__ip-row {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__ip {
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    font-weight: 500;
    color: var(--md-sys-color-primary);
    background: var(--md-sys-color-primary-container);
    padding: $spacing-sm $spacing-md;
    border-radius: var(--md-sys-shape-corner-small);
  }

  &__copy-btn {
    height: 32px;
    font-size: 12px;
    padding: 0 $spacing-sm;

    .material-symbols-outlined {
      font-size: 16px;
    }

    &--copied {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      border-color: var(--md-sys-color-primary);
    }
  }

  &__qq {
    color: var(--md-sys-color-primary);
    font-weight: 600;
  }

  &__qq-desc,
  &__version-desc {
    color: var(--md-sys-color-on-surface-variant);
  }

  &__version {
    color: var(--md-sys-color-tertiary);
    font-weight: 600;
  }

  /* 加入步骤 */
  &__steps {
    margin-bottom: $spacing-2xl;
  }

  &__steps-title {
    text-align: center;
    margin-bottom: $spacing-xl;
    color: var(--md-sys-color-on-surface);
  }

  &__steps-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__step {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-lg;
    background: var(--md-sys-color-surface-container);
    border-radius: var(--md-sys-shape-corner-large);
  }

  &__step-number {
    @include flex-center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    border-radius: var(--md-sys-shape-corner-full);
    font-weight: 700;
    font-size: 16px;
  }

  &__step-content {
    display: flex;
    gap: $spacing-md;
    flex: 1;
  }

  &__step-icon {
    @include flex-center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    border-radius: var(--md-sys-shape-corner-medium);

    .material-symbols-outlined {
      font-size: 20px;
    }
  }

  &__cta {
    @include flex-center;
    padding-bottom: $spacing-xl;
  }

  &__cta-btn {
    height: 48px;
    padding: 0 $spacing-xl;
    font-size: 15px;
    gap: $spacing-sm;
    text-decoration: none;

    .material-symbols-outlined {
      font-size: 20px;
    }
  }
}
</style>