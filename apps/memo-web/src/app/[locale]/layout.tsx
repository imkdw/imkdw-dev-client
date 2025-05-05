import { mapleFont } from '@imkdw-dev-client/fonts';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/src/components/layout/header';
import { Sidebar } from '@/src/components/layout/sidebar';
import { SupportedLocale, routing } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';

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
      <body className='overflow-hidden'>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <section className='flex h-full'>
            <Sidebar />
            {children}
          </section>
          <Toaster richColors position='top-right' />
        </NextIntlClientProvider>
      </body>
      {/* <Analytics />
      <SpeedInsights /> */}
    </html>
  );
}
