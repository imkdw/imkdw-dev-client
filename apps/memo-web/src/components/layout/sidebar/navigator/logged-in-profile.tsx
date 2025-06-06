'use client';

import { logout } from '@imkdw-dev-client/api-client';
import { cn, showSuccessToast } from '@imkdw-dev-client/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '../../../../stores/auth-store';

interface Props {
  member: { profileImage: string } | null;
  onClick?: () => void;
}

export function LoggedInProfile({ member }: Props) {
  const { clear } = useAuthStore();

  if (!member) return null;

  const handleLogout = async () => {
    try {
      await logout();
      clear();
      showSuccessToast('로그아웃되었습니다.');
    } catch {
      // API 클라이언트에서 자동으로 에러 toast가 표시되므로 별도 처리 불필요
      // 로컬 상태는 초기화하지 않음 (서버 에러 시 로그인 상태 유지)
    }
  };

  const handleAccountSettings = () => {
    alert('지원 예정인 기능입니다');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type='button' className={cn('flex justify-center items-center w-full p-4 group', 'hover:bg-[#4A4A4C]')}>
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
  );
}
