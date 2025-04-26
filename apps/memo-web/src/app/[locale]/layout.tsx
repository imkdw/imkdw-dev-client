import type { Metadata } from 'next';
import { mapleFont } from '@imkdw-dev-client/fonts';
import './globals.css';
import { cn } from '@imkdw-dev-client/utils';
import { routing, SupportedLocale } from '@imkdw-dev-client/i18n';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'IMKDW Dev | Memo',
  description: 'IMKDW Dev | Memo',
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html className={cn(mapleFont.className)}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
