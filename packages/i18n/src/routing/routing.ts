import { defineRouting } from 'next-intl/routing';
import { supportedLocales, defaultLocale } from './routing.const';

export const routing = defineRouting({ locales: supportedLocales, defaultLocale });
