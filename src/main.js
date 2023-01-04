import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router/index'; //引入路由
import '@/assets/css/iconfont.js';
import SvgIcon from '@/components/common/svgIcon.vue';
import { createPinia } from 'pinia';
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('SvgIcon', SvgIcon);
app.use(pinia);
app.use(router);
app.mount('#app');
