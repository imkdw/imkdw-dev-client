'use client';

import { cn } from '@imkdw-dev-client/utils';
import { UserRound } from 'lucide-react';
import { OAuthModal } from '@imkdw-dev-client/ui';
import { useState } from 'react';

export function SidebarNavigatorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary variable to simulate login status
  const isLoggedIn = false;

  const handleClick = () => {
    if (isLoggedIn) {
      console.log('User is already logged in.');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        type='button'
        className={cn('flex justify-center items-center w-full p-4 group', 'hover:bg-[#4A4A4C]')}
        onClick={handleClick}
      >
        <div className={cn('flex items-center justify-center rounded-full w-8 h-8')}>
          <UserRound className='text-gray-400 group-hover:text-white' />
        </div>
      </button>

      <OAuthModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        onGoogleLogin={() => console.log('Google Login Clicked')}
        onGithubLogin={() => console.log('GitHub Login Clicked')}
        // TODO: 다국어처리
        title='로그인'
        description='원하는 로그인 방법을 선택해주세요'
      />
    </>
  );
}
