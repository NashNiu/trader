import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  // 内部提供了 history 模式的实现
  // createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
  // createWebHashHistory路由模式路径带#号
  history: createWebHashHistory(),
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      //引入组件，我清除了组件中的所有内容
      component: () => import('../components/HelloWorld.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/loginRegister/login.vue'),
    },
  ],
});

export default router;
