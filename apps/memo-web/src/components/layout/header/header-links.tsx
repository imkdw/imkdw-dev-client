'use client';

import { Moon } from 'lucide-react';
import { ReactNode } from 'react';
import GithubIcon from '@/public/images/github.svg';
import Image from 'next/image';

function HeaderLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="flex items-center p-2 rounded-lg bg-gray-100" onClick={onClick}>
      {children}
    </button>
  );
}

export function HeaderLinks() {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-primary">
      <HeaderLink
        onClick={() => window.open('https://github.com/imkdw/imkdw-dev-client', '_blank', 'noopener,noreferrer')}
      >
        <Image src={GithubIcon} alt="Github" width={24} height={24} />
      </HeaderLink>

      {/* TODO: 다국어 처리 */}
      {/* TODO: 다크모드 지원 */}
      <HeaderLink onClick={() => alert('지원 예정인 기능입니다')}>
        <Moon className="text-gray-600" />
      </HeaderLink>
    </div>
  );
}
