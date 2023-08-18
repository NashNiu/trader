import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/components/layout/layout.vue';
import LayoutNew from '@/pages/index/layout/layout.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'website',
      component: LayoutNew,
      redirect: 'index',
      children: [
        {
          path: 'index',
          name: 'Index',
          component: () => import('@/pages/index/Index.vue'),
        },
        {
          path: 'Feature',
          name: 'Feature',
          component: () => import('@/pages/index/Feature/index.vue'),
        },
        {
          path: 'Product',
          name: 'Product',
          component: () => import('@/pages/index/Product/index.vue'),
        },
        {
          path: 'FixPrice',
          name: 'FixPrice',
          component: () => import('@/pages/index/FixPrice/index.vue'),
        },
        {
          path: 'Platform',
          name: 'Platform',
          component: () => import('@/pages/index/Platform/index.vue'),
        },
        {
          path: 'teach',
          name: 'teach',
          component: () => import('@/pages/index/teach/index.vue'),
        },
        {
          path: 'support',
          name: 'Support',
          component: () => import('@/pages/index/Support/index.vue'),
        },
        {
          path: 'app',
          name: 'app',
          component: () => import('@/pages/index/app/index.vue'),
        },
        {
          path: 'table',
          name: 'table',
          component: () => import('@/pages/index/table/index.vue'),
        },
        {
          path: 'agreement/:type',
          name: 'agreement',
          component: () => import('@/pages/index/agreement/index.vue'),
        },
      ],
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
        {
          path: 'newWallet',
          name: 'newWallet',
          meta: { hideChart: true },
          component: () => import('@/pages/newWallet/index.vue'),
        },
        {
          path: 'userCenter',
          name: 'UserCenter',
          meta: { hideChart: true },
          component: () => import('@/pages/userCenter/index.vue'),
        },
        {
          path: 'authInfo',
          name: 'authInfo',
          meta: { hideChart: true },
          component: () => import('@/pages/userCenter/authInfo.vue'),
        },
        {
          path: 'authBind',
          name: 'authBind',
          meta: { hideChart: true },
          component: () => import('@/pages/userCenter/authBind.vue'),
        },
        {
          path: 'customer',
          name: 'customer',
          meta: { hideChart: true },
          component: () => import('@/pages/customer/index.vue'),
        },
        {
          path: 'details',
          name: 'details',
          meta: { hideChart: true },
          component: () => import('@/pages/customer/details.vue'),
        },
        {
          path: 'customerCount',
          name: 'customerCount',
          meta: { hideChart: true },
          component: () => import('@/pages/customerCount/index.vue'),
        },
        {
          path: 'commManage',
          name: 'commManage',
          meta: { hideChart: true },
          component: () => import('@/pages/commManage/index.vue'),
        },
        {
          path: 'extensionlink',
          name: 'extensionlink',
          meta: { hideChart: true },
          component: () => import('@/pages/extensionlink/index.vue'),
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
