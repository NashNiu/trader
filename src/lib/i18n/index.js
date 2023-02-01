import { createI18n } from 'vue-i18n';
import { configConst } from '@/config/index.js';
import cn from './cn.js';
import en from './en.js';
const messages = {
  cn,
  en,
};
const localLan = localStorage.getItem(configConst.LANGUAGE);
const i18n = createI18n({
  legacy: false,
  locale: localLan in messages ? localLan : 'en',
  messages,
});

export default i18n;
export const chartLocal = {
  cn: 'zh',
  en: 'en',
};
