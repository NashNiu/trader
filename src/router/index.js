import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/components/layout/layout.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index/Index.vue'),
    },
    {
      path: '/t',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'trade',
          name: 'Trade',
          component: () => import('@/pages/Trade/index.vue'),
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/pages/Order/index.vue'),
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('@/pages/History/index.vue'),
        },
        {
          path: 'limit',
          name: 'Limit',
          component: () => import('@/pages/Limit/index.vue'),
        },
        {
          path: 'wallet',
          name: 'Wallet',
          meta: { hideChart: true },
          component: () => import('@/pages/Wallet/index.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/Error/NotFound.vue'),
    },
  ],
});

export default router;
