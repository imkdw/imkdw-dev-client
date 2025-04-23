import { routing } from '@imkdw-dev-client/i18n';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
  });

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: ['/', '/(de|en)/:path*'],
};
