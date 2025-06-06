import { mapleFont } from '@imkdw-dev-client/fonts';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import '@imkdw-dev-client/ui/toast.css';
import { Header } from '@/src/components/layout/header/header';
import { Sidebar } from '@/src/components/layout/sidebar/sidebar';
import { SupportedLocale, routing } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { AuthInitializer } from '../../components/auth/auth-initializer';

interface Props {
  children: ReactNode;
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
          <Toaster theme='dark' position='bottom-right' duration={4000} closeButton gap={8} visibleToasts={3} />
          {process.env.NEXT_PUBLIC_APP_ENV === 'production' && <Analytics />}
          {process.env.NEXT_PUBLIC_APP_ENV === 'production' && <SpeedInsights />}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
