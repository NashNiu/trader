import { createI18n } from 'vue-i18n';
import { configConst } from '@/config/index.js';
import cn from './cn.js';
import en from './en.js';
import bg from './bg.js';
import af from './af.js';
import cs from './af.js';
import da from './da.js';
import de from './de.js';
import el from './el.js';
import es from './es.js';
import et from './et.js';
import fi from './fi.js';
import fr from './fr.js';
import hu from './hu.js';
import id from './id.js';
import it from './it.js';
import ja from './ja.js';
import ko from './ko.js';
import lt from './lt.js';
import lv from './lv.js';
import no from './no.js';
import pl from './pl.js';
import pt from './pt.js';
import ro from './ro.js';
import ru from './ru.js';
import sk from './sk.js';
import sl from './sl.js';
import sv from './sv.js';
import tr from './tr.js';
import uk from './uk.js';
const messages = {
  cn,
  en,
  bg,
  af,
  cs,
  da,
  de,
  el,
  es,
  et,
  fi,
  fr,
  hu,
  id,
  it,
  ja,
  ko,
  lt,
  lv,
  no,
  pl,
  pt,
  ro,
  ru,
  sk,
  sl,
  sv,
  tr,
  uk,
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
  bg: 'bg',
  af: 'af',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  es: 'es',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  lt: 'lt',
  lv: 'lv',
  no: 'no',
  pl: 'pl',
  pt: 'pt',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sv: 'sv',
  tr: 'tr',
  uk: 'uk',
};
