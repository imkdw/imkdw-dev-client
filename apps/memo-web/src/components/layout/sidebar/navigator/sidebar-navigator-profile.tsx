'use client';

import { OAuthModal } from '@imkdw-dev-client/ui';
import { cn } from '@imkdw-dev-client/utils';
import { UserRound, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useOAuth } from '@imkdw-dev-client/auth';
import { useAuthStore } from '../../../../stores/auth-store';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { logout } from '@imkdw-dev-client/api-client';

export function SidebarNavigatorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login: googleLogin } = useOAuth({ provider: 'google' });
  const { login: githubLogin } = useOAuth({ provider: 'github' });

  const { isLoggedIn, member, clear } = useAuthStore();
  console.log(isLoggedIn, member);

  const handleClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    clear();
  };

  const handleAccountSettings = () => {
    alert('지원 예정인 기능입니다');
  };

  return (
    <>
      {isLoggedIn && member ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type='button'
              className={cn('flex justify-center items-center w-full p-4 group', 'hover:bg-[#4A4A4C]')}
            >
              <div className={cn('flex items-center justify-center rounded-full w-8 h-8')}>
                <Image src={member.profileImage} alt='profile' width={32} height={32} className='rounded-full' />
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className='bg-[#2D2D2D] min-w-[180px] text-white rounded-md py-1 shadow-lg z-50'
              side='top'
              align='start'
              alignOffset={20}
              sideOffset={5}
            >
              <DropdownMenu.Item
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#4A4A4C] outline-none'
                onClick={handleAccountSettings}
              >
                <Settings size={16} className='text-gray-400' />내 계정 설정
              </DropdownMenu.Item>
              <DropdownMenu.Separator className='h-[1px] bg-[#4A4A4C] my-1' />
              <DropdownMenu.Item
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#4A4A4C] text-red-400 outline-none'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                로그아웃
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <button
          type='button'
          className={cn('flex justify-center items-center w-full p-4 group', 'hover:bg-[#4A4A4C]')}
          onClick={handleClick}
        >
          <div className={cn('flex items-center justify-center rounded-full w-8 h-8')}>
            <UserRound className='text-gray-400 group-hover:text-white' />
          </div>
        </button>
      )}

      <OAuthModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        onGoogleLogin={googleLogin}
        onGithubLogin={githubLogin}
        // TODO: 다국어처리
        title='로그인'
        description='원하는 로그인 방법을 선택해주세요'
      />
    </>
  );
}
