import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router/index'; //引入路由
import '@/assets/css/iconfont.js';
import SvgIcon from '@/components/common/svgIcon.vue';
import { createPinia } from 'pinia';
import i18n from '@/lib/i18n/index.js';
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('SvgIcon', SvgIcon);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
