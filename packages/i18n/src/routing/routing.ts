import { defineRouting } from 'next-intl/routing';
import { defaultLocale, supportedLocales } from './routing.const';

export const routing = defineRouting({ locales: supportedLocales, defaultLocale });
