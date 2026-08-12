<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThemeToggle from './ThemeToggle.vue'

gsap.registerPlugin(ScrollTrigger)

/**
 * 顶部导航栏组件 - MD3 Top App Bar
 * 使用锚点链接实现单页面平滑滚动导航
 * 动画：滚动时收缩高度 + 阴影变化
 */
const navItems = [
  { href: '#home', label: '首页' },
  { href: '#game-modes', label: '游戏模式' },
  { href: '#versions', label: '版本支持' },
  { href: '#stats', label: '项目实力' },
  { href: '#join', label: '加入我们' }
]

const isMobileMenuOpen = ref(false)
const appBarRef = ref(null)
const activeSection = ref('home')

/**
 * 平滑滚动到目标锚点
 */
function scrollToSection(href) {
  isMobileMenuOpen.value = false
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  const container = document.querySelector('.default-layout')
  if (el && container) {
    container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }
}

/**
 * 监听滚动，更新活跃导航项高亮
 */
function updateActiveSection() {
  const container = document.querySelector('.default-layout')
  if (!container) return
  const scrollPos = container.scrollTop + 120

  const sections = navItems.map(item => item.href.replace('#', ''))
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = sections[i]
      return
    }
  }
  activeSection.value = 'home'
}

onMounted(() => {
  const container = document.querySelector('.default-layout')

  // 滚动时收缩 + 阴影动画
  gsap.to(appBarRef.value, {
    scrollTrigger: {
      trigger: container,
      start: 'top -80px',
      end: 'bottom top',
      toggleClass: { targets: appBarRef.value, className: 'app-bar--scrolled' },
      onEnter: () => appBarRef.value?.classList.add('app-bar--scrolled'),
      onLeaveBack: () => appBarRef.value?.classList.remove('app-bar--scrolled')
    },
    duration: 0.3
  })

  // 监听 scroll-snap 容器滚动
  if (container) {
    container.addEventListener('scroll', updateActiveSection, { passive: true })
  }
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  const container = document.querySelector('.default-layout')
  if (container) {
    container.removeEventListener('scroll', updateActiveSection)
  }
})
</script>

<template>
  <header ref="appBarRef" class="app-bar">
    <div class="app-bar__container">
      <!-- Logo -->
      <a href="#home" class="app-bar__logo" @click.prevent="scrollToSection('#home')">
        <img
          src="https://assets.trystage.cn/T-icon-light.svg"
          alt="Trystage Logo"
          class="app-bar__logo-icon"
        />
        <span class="app-bar__logo-text">Trystage</span>
      </a>

      <!-- 桌面端导航链接 -->
      <nav class="app-bar__nav">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="app-bar__nav-link md3-label-large"
          :class="{ 'app-bar__nav-link--active': activeSection === item.href.replace('#', '') }"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- 右侧操作区 -->
      <div class="app-bar__actions">
        <ThemeToggle />
        <!-- 移动端汉堡菜单按钮 -->
        <button
          class="app-bar__menu-btn md3-icon-btn"
          aria-label="打开菜单"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="material-symbols-outlined">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <Transition name="mobile-menu">
      <nav v-if="isMobileMenuOpen" class="app-bar__mobile-menu">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="app-bar__mobile-link md3-title-medium"
          :class="{ 'app-bar__mobile-link--active': activeSection === item.href.replace('#', '') }"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ item.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/styles/_mixins.scss' as *;

.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-appbar;
  height: $appbar-height;
  background-color: var(--md-sys-color-surface);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.3s ease;

  &--scrolled {
    height: $appbar-height-scrolled;
    box-shadow: var(--md-sys-elevation-2);
    background-color: var(--md-sys-color-surface-container);
  }

  &__container {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    color: var(--md-sys-color-on-surface);
    text-decoration: none;
    z-index: 1;

    &-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--md-sys-shape-corner-medium);
      object-fit: contain;
    }

    &-text {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
  }

  &__nav {
    display: none;
    align-items: center;
    gap: $spacing-xs;

    @include respond-to(md) {
      display: flex;
    }
  }

  &__nav-link {
    position: relative;
    padding: $spacing-sm $spacing-md;
    color: var(--md-sys-color-on-surface-variant);
    border-radius: var(--md-sys-shape-corner-full);
    text-decoration: none;
    transition: color 0.2s ease, background-color 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: 20px;
      height: 3px;
      background: var(--md-sys-color-primary);
      border-radius: var(--md-sys-shape-corner-full);
      transition: transform 0.3s ease;
    }

    &:hover {
      color: var(--md-sys-color-primary);
      background-color: rgba(103, 80, 164, 0.08);

      &::after {
        transform: translateX(-50%) scaleX(1);
      }
    }

    /* 当前激活区块高亮 */
    &--active {
      color: var(--md-sys-color-primary);

      &::after {
        transform: translateX(-50%) scaleX(1);
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__menu-btn {
    @include respond-to(md) {
      display: none;
    }
  }

  &__mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--md-sys-color-surface-container);
    box-shadow: var(--md-sys-elevation-3);
    padding: $spacing-md;
    @include flex-column;
    gap: $spacing-xs;
  }

  &__mobile-link {
    width: 100%;
    text-align: left;
    padding: $spacing-md;
    color: var(--md-sys-color-on-surface);
    border-radius: var(--md-sys-shape-corner-medium);
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--md-sys-color-surface-container-highest);
    }

    &--active {
      color: var(--md-sys-color-primary);
      background-color: var(--md-sys-color-primary-container);
    }
  }
}

/* 移动端菜单过渡动画 */
.mobile-menu-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>