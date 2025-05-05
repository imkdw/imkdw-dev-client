import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './routing.const';

export const routing = defineRouting({ locales: SUPPORTED_LOCALES, defaultLocale: DEFAULT_LOCALE });
