import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMKDW Dev | Memo',
  description: 'IMKDW Dev | Memo',
  openGraph: {
    type: 'website',
    description: 'IMKDW Dev | Memo',
    url: 'https://memo.imkdw.dev',
    siteName: 'IMKDW Dev | Memo',
    images: [
      {
        url: '/images/imkdw-dev.webp',
      },
    ],
  },
};

export default function HomePage() {
  return <div className='w-full h-full bg-[#242424]' />;
}
