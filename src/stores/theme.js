import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * 主题状态管理 Store
 * 管理深色/浅色主题切换，并持久化到 localStorage
 */
export const useThemeStore = defineStore('theme', () => {
  // 从 localStorage 读取初始主题偏好，默认浅色
  const savedTheme = localStorage.getItem('trystage-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initialMode = savedTheme || (prefersDark ? 'dark' : 'light')

  const mode = ref(initialMode)

  // 计算属性
  const isDark = () => mode.value === 'dark'

  // 切换主题
  function toggleTheme() {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  }

  // 设置指定主题
  function setTheme(newMode) {
    if (newMode === 'light' || newMode === 'dark') {
      mode.value = newMode
    }
  }

  // 持久化到 localStorage 并同步到 DOM
  watch(mode, (newMode) => {
    localStorage.setItem('trystage-theme', newMode)
    document.documentElement.setAttribute('data-theme', newMode)
  }, { immediate: true })

  return {
    mode,
    isDark,
    toggleTheme,
    setTheme
  }
})