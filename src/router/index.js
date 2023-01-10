import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  // 内部提供了 history 模式的实现
  // createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
  // createWebHashHistory路由模式路径带#号
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index/Index.vue'),
    },
    {
      path: '/trade',
      name: 'Trade',
      component: () => import('@/pages/Trade/index.vue'),
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/pages/Order/index.vue'),
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/pages/History/index.vue'),
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: () => import('@/pages/Wallet/index.vue'),
    },
    {
      path: '/limitList',
      name: 'LimitList',
      component: () => import('@/pages/Limit/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/Error/NotFound.vue'),
    },
  ],
});

export default router;
