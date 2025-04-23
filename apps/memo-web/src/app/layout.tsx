import type { Metadata } from 'next';
import { mapleFont } from '@imkdw-dev-client/fonts';
import './globals.css';
import { Sidebar, Header } from '@/src/components';
import { cn } from '@imkdw-dev-client/utils';

export const metadata: Metadata = {
  title: 'IMKDW Dev | Memo',
  description: 'IMKDW Dev | Memo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn(mapleFont.className, 'bg-bg-primary')}>
      <body>
        <main className='flex p-8 bg-gray-100 gap-4'>
          <Sidebar />
          <section className='flex-1 flex flex-col gap-4'>
            <Header />
            <section className='flex-1'>{children}</section>
          </section>
        </main>
      </body>
    </html>
  );
}
