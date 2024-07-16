import { createI18n } from 'vue-i18n';

import enMessages from './locales/en.json';
import deMessages from './locales/de.json';


const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      ...enMessages,
    },
    de: {
      ...deMessages,
    }
  },
});

export default i18n;
