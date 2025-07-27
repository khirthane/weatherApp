import messages from '@/utils/i18n/locales/en';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: messages,
  },
});
