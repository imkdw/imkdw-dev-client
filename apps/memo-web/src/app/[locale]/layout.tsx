import { mapleFont } from '@imkdw-dev-client/fonts';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/src/components/layout/header';
import { Sidebar } from '@/src/components/layout/sidebar';
import { SupportedLocale, routing } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AuthInitializer } from '../../components/auth/auth-initializer';

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
    <html lang={locale} className={cn(mapleFont.className)}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <AuthInitializer />
        <body className='flex flex-col h-[100vh] overflow-hidden'>
          <Header />
          <main className='flex flex-1 relative overflow-hidden'>
            <Sidebar />
            <div className='flex-1'>{children}</div>
          </main>
          <Analytics />
          <SpeedInsights />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
