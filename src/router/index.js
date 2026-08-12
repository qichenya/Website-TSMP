import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由配置 - 单页面模式
 * 所有区块整合在首页，通过锚点导航实现平滑滚动
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
      }
    ]
  },
  // 兼容旧路由，重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return savedPosition || { top: 0 }
  }
})

// 全局后置守卫：更新页面标题
router.afterEach((to) => {
  document.title = to.meta.title || 'Trystage'
})

export default router