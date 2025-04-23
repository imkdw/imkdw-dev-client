import { defineRouting } from 'next-intl/routing';
import { supportLocales, defaultLocale } from './routing.const';

export const routing = defineRouting({
  locales: supportLocales,
  defaultLocale,
});
