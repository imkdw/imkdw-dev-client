import Image from 'next/image';
import LogoImage from '@/public/images/logo.svg';
import Link from 'next/link';

export function SidebarLogo() {
  return (
    <section className='border-b border-gray-200 pb-4'>
      <Link href='/' className='flex items-center gap-3 '>
        <div className='relative w-[60px] h-[60px] rounded-primary shadow-primary rounded-md'>
          <Image src={LogoImage} alt='IMKDW Dev Logo' fill priority />
        </div>
        <div className='flex flex-col'>
          <span className='text-lg font-bold'>IMKDW Dev</span>
          <span className='text-sm text-gray-400'>Memo</span>
        </div>
      </Link>
    </section>
  );
}
