import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 响应式断点检测 Composable
 * 遵循 MD3 栅格断点：sm(600px), md(905px), lg(1240px), xl(1440px)
 */
export function useMediaQuery() {
  const isSm = ref(false)   // >= 600px
  const isMd = ref(false)   // >= 905px
  const isLg = ref(false)   // >= 1240px
  const isXl = ref(false)   // >= 1440px
  const isMobile = ref(true) // < 600px

  const queries = [
    { key: 'isSm', query: '(min-width: 600px)' },
    { key: 'isMd', query: '(min-width: 905px)' },
    { key: 'isLg', query: '(min-width: 1240px)' },
    { key: 'isXl', query: '(min-width: 1440px)' }
  ]

  const listeners = []

  onMounted(() => {
    queries.forEach(({ key, query }) => {
      const mql = window.matchMedia(query)
      const handler = (e) => {
        if (key === 'isSm') { isSm.value = e.matches; isMobile.value = !e.matches }
        if (key === 'isMd') isMd.value = e.matches
        if (key === 'isLg') isLg.value = e.matches
        if (key === 'isXl') isXl.value = e.matches
      }
      handler(mql) // 初始化
      mql.addEventListener('change', handler)
      listeners.push({ mql, handler })
    })
  })

  onBeforeUnmount(() => {
    listeners.forEach(({ mql, handler }) => {
      mql.removeEventListener('change', handler)
    })
  })

  return { isSm, isMd, isLg, isXl, isMobile }
}