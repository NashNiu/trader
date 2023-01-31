import { createI18n } from 'vue-i18n';
import cn from './cn.js';
import en from './en.js';
const messages = {
  cn,
  en,
};
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
});

export default i18n;
