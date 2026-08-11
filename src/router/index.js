import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置
 * 使用嵌套路由：DefaultLayout 作为父布局，所有页面作为子路由
 * 路由懒加载优化首屏性能
 */
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Trystage - 免费 Minecraft 服务器' }
      },
      {
        path: 'game-modes',
        name: 'game-modes',
        component: () => import('@/views/GameModesView.vue'),
        meta: { title: '游戏模式 - Trystage' }
      },
      {
        path: 'versions',
        name: 'versions',
        component: () => import('@/views/VersionsView.vue'),
        meta: { title: '版本支持 - Trystage' }
      },
      {
        path: 'stats',
        name: 'stats',
        component: () => import('@/views/StatsView.vue'),
        meta: { title: '项目实力 - Trystage' }
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('@/views/JoinView.vue'),
        meta: { title: '加入我们 - Trystage' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 每次路由切换滚动到顶部
    return { top: 0 }
  }
})

// 全局后置守卫：更新页面标题
router.afterEach((to) => {
  document.title = to.meta.title || 'Trystage'
})

export default router