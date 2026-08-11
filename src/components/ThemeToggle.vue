<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <button
    class="theme-toggle md3-icon-btn"
    :aria-label="themeStore.isDark() ? '切换到浅色主题' : '切换到深色主题'"
    :title="themeStore.isDark() ? '切换到浅色主题' : '切换到深色主题'"
    @click="themeStore.toggleTheme()"
  >
    <span class="material-symbols-outlined">
      {{ themeStore.isDark() ? 'light_mode' : 'dark_mode' }}
    </span>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  position: relative;
  overflow: hidden;

  .material-symbols-outlined {
    font-size: 24px;
    transition: transform 0.3s ease;
  }

  &:active .material-symbols-outlined {
    transform: rotate(180deg) scale(0.8);
  }
}
</style>