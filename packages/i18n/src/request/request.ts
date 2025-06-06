import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, SupportedLocale, routing } from '../routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as SupportedLocale)) {
    locale = DEFAULT_LOCALE;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
