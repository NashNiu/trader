import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  // 内部提供了 history 模式的实现
  // createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
  // createWebHashHistory路由模式路径带#号
  history: createWebHashHistory(),
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: () => import('../pages/Index.vue'),
    },
    {
      path: '/Trade',
      name: 'Trade',
      component: () => import('../pages/Trade.vue'),
    },
  ],
});

export default router;
