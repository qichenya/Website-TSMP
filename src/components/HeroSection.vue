<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()

/**
 * Hero 主视觉区组件
 * 展示服务器名称、标语、IP 地址（一键复制）、QQ 群、CTA 按钮
 * GSAP 入场动画：标题 → 副标题 → IP → CTA 依次淡入上浮
 */

const serverIP = 'mc.trystage.cn'
const qqGroup = '649523125'
const copied = ref(false)

// DOM 引用
const titleRef = ref(null)
const taglineRef = ref(null)
const subtitleRef = ref(null)
const ipBoxRef = ref(null)
const infoRef = ref(null)
const actionsRef = ref(null)
let entranceTl = null

// 复制 IP 地址到剪贴板
async function copyIP() {
  try {
    await navigator.clipboard.writeText(serverIP)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // 降级方案
    const input = document.createElement('input')
    input.value = serverIP
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

onMounted(() => {
  // 入场动画时间线
  entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(titleRef.value, 
      { opacity: 0, y: 60, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9 }
    )
    .fromTo(taglineRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(subtitleRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(ipBoxRef.value,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.2'
    )
    .fromTo(infoRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
    .fromTo(actionsRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
})

onBeforeUnmount(() => {
  if (entranceTl) entranceTl.kill()
})
</script>

<template>
  <section id="hero" class="hero">
    <!-- 背景装饰 -->
    <div class="hero__bg">
      <div class="hero__bg-circle hero__bg-circle--1"></div>
      <div class="hero__bg-circle hero__bg-circle--2"></div>
      <div class="hero__bg-circle hero__bg-circle--3"></div>
    </div>

    <div class="hero__content">
      <!-- 1. 品牌层 -->
      <h1 ref="titleRef" class="hero__title">Trystage</h1>
      <p ref="taglineRef" class="hero__tagline">多元玩法，公平竞技新体验！</p>
      <p ref="subtitleRef" class="hero__subtitle">支持 1.8 — 1.21 全版本，8 种精彩游戏模式</p>

      <!-- 3. 工具辅助层（下沉并轻量化） -->
      <div ref="ipBoxRef" class="hero__ip-box-mini">
        <div class="hero__ip-label md3-label-medium">服务器 IP</div>
        <div class="hero__ip-row">
          <code class="hero__ip md3-title-medium">{{ serverIP }}</code>
          <button
            class="hero__ip-copy md3-btn md3-btn-outlined"
            :class="{ 'hero__ip-copy--copied': copied }"
            @click="copyIP"
          >
            <span class="material-symbols-outlined">
              {{ copied ? 'check' : 'content_copy' }}
            </span>
            {{ copied ? '已复制' : '复制' }}
          </button>
        </div>
        <!-- QQ群标签整合至IP盒子内 -->
        <div ref="infoRef" class="hero__qq-tag">
          <span class="material-symbols-outlined">group</span>
          <span>QQ 群：{{ qqGroup }}</span>
        </div>
      </div>

      <!-- CTA 按钮 -->
      <div ref="actionsRef" class="hero__actions">
        <button
          class="md3-btn md3-btn-outlined hero__cta"
          @click="router.push('/game-modes')"
        >
          <span class="material-symbols-outlined">explore</span>
          探索游戏模式
        </button>
        <button
          class="md3-btn md3-btn-filled hero__cta hero__cta--primary"
          @click="router.push('/join')"
        >
          <span class="material-symbols-outlined">login</span>
          立即加入
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.hero {
  position: relative;
  min-height: 100vh;
  @include flex-center;
  flex-direction: column;
  overflow: hidden;
  padding: calc(#{$appbar-height} + #{$spacing-xl}) $spacing-lg $spacing-3xl;
  
  // 建议 1：将固体深色顶栏与大自然背景图做融合
	  // 用一个带微弱冷紫/深黑调的渐变覆盖在背景图上，平滑过渡顶栏切线
	  background: 
	    linear-gradient(to bottom, rgba(15, 12, 25, 0.9) 0%, rgba(15, 12, 25, 0.6) 20%, rgba(15, 12, 25, 0.65) 100%),
	    url('https://rcn.zyghit.cn/images/lobby1.webp') center/cover no-repeat;

	  // 浅色模式下隐藏背景图片和渐变遮罩，使用纯色背景
	  [data-theme="light"] & {
	    background: var(--md-sys-color-surface);
	  }

  @include respond-to(md) {
    padding: calc(#{$appbar-height} + #{$spacing-2xl}) $spacing-xl $spacing-4xl;
  }

  // 这里的纯黑遮罩可以适当减轻，因为上面 background 已经叠加了复合滤镜
	  &::before {
	    content: '';
	    position: absolute;
	    inset: 0;
	    background: rgba(10, 8, 16, 0.25);
	    z-index: 1;
	    pointer-events: none;
	  }

	  // 浅色模式下不需要遮罩
	  [data-theme="light"] &::before {
	    display: none;
	  }

  &__bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 760px;
    @include flex-column;
    align-items: center;
    // 建议 2：打破平均主义间距，引入错落有致的“呼吸感”
    gap: 0; 
  }

  &__title {
    background: linear-gradient(135deg, #ffffff 30%, var(--md-sys-color-primary-container) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    font-size: clamp(46px, 8vw, 76px);
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: $spacing-md;

    [data-theme="light"] & {
      background: linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary));
      -webkit-background-clip: text;
      background-clip: text;
    }
  }

  &__tagline {
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    margin-bottom: $spacing-xs;

    [data-theme="light"] & {
      color: var(--md-sys-color-on-surface);
      text-shadow: none;
    }
  }

  &__subtitle {
    color: rgba(255, 255, 255, 0.75);
    font-weight: 400;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: $spacing-2xl;

    [data-theme="light"] & {
      color: var(--md-sys-color-on-surface-variant);
      text-shadow: none;
    }
  }

  /* IP 地址展示盒子 */
  &__ip-box {
    background: rgba(15, 12, 25, 0.25);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-radius: var(--md-sys-shape-corner-extra-large);
    padding: $spacing-xl $spacing-2xl;
    width: 100%;
    max-width: 520px;
    @include flex-column;
    align-items: center;
    gap: $spacing-md;

    [data-theme="light"] & {
      background: var(--md-sys-color-surface-container);
      border-color: var(--md-sys-color-outline-variant);
      box-shadow: var(--md-sys-elevation-2);
    }
  }

  &__ip-label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
    letter-spacing: 2px;
    text-shadow: none;

    [data-theme="light"] & {
      color: var(--md-sys-color-on-surface-variant);
    }
  }

  &__ip-row {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    width: 100%;
    justify-content: center;
  }

  &__ip {
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08); 
    padding: $spacing-sm $spacing-xl;
    border-radius: var(--md-sys-shape-corner-medium);
    border: 1px solid rgba(255, 255, 255, 0.05);
    letter-spacing: 0.5px;
    flex: 1;
    text-align: center;
    max-width: 280px;

    [data-theme="light"] & {
      color: var(--md-sys-color-on-surface);
      background: var(--md-sys-color-surface-container-highest);
      border-color: var(--md-sys-color-outline-variant);
    }
  }

  &__ip-copy {
    height: 40px;
    font-size: 14px;
    padding: 0 $spacing-lg;
    border-radius: var(--md-sys-shape-corner-medium);
    // 建议 5：复制按钮视觉对齐，让其线框与主体高亮色保持呼吸同步
    border-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-primary);
    background: transparent;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(var(--md-sys-color-primary-rgb), 0.1);
    }

    .material-symbols-outlined {
      font-size: 18px;
    }

    &--copied {
      background-color: var(--md-sys-color-primary) !important;
      color: var(--md-sys-color-on-primary) !important;
      border-color: var(--md-sys-color-primary) !important;
    }
  }

  /* QQ群标签 - 次要辅助层 */
  &__qq-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    width: 100%;
    margin-top: $spacing-xs;
    padding-top: $spacing-md;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.45);
    font-size: 13px;
    letter-spacing: 0.3px;

    [data-theme="light"] & {
      color: var(--md-sys-color-on-surface-variant);
      border-top-color: var(--md-sys-color-outline-variant);
    }

    .material-symbols-outlined {
      font-size: 16px;
      opacity: 0.7;

      [data-theme="light"] & {
        color: var(--md-sys-color-primary);
        opacity: 1;
      }
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-lg;
    justify-content: center;
    margin-top: $spacing-2xl; // 按钮组向下推开，留足空间
  }

  &__cta {
    height: 52px; // 略微放大按钮，更具点击欲望
    border-radius: var(--md-sys-shape-corner-full);
    padding: 0 $spacing-2xl;
    font-size: 16px;
    font-weight: 600;
    gap: $spacing-sm;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);

    .material-symbols-outlined {
      font-size: 22px;
    }

    /* 主CTA按钮（立即加入）极致强化 */
    &--primary {
      background: linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary));
      color: var(--md-sys-color-on-primary);
      border: none;
      box-shadow: 0 4px 20px rgba(var(--md-sys-color-primary-rgb), 0.3);

      &:hover {
        box-shadow: 0 8px 30px rgba(var(--md-sys-color-primary-rgb), 0.5);
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>