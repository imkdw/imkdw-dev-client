import type { Metadata } from 'next';
import { routing, SupportedLocale } from '@imkdw-dev-client/i18n';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { Container } from '@imkdw-dev-client/ui';

import './globals.css';

import { NextIntlClientProvider } from 'next-intl';

const pretendard = localFont({
  src: [
    {
      path: '../../fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
});

export const metadata: Metadata = {
  title: 'IMKDW Dev | BLOG',
  description: 'IMKDW Dev | BLOG',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={pretendard.className}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Container>
            <main>{children}</main>
          </Container>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
