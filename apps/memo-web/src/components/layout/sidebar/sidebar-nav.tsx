'use client';

import { cn } from '@imkdw-dev-client/utils';
import { Folder, User } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  id: number;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, isActive = false, onClick }: SidebarItemProps) {
  return (
    <li className='w-full relative'>
      <button
        type='button'
        className={cn('flex justify-center items-center w-full cursor-pointer p-4', 'hover:bg-[#4A4A4C]')}
        onClick={onClick}
      >
        {isActive && <div className='absolute left-0 top-0 h-full w-0.5 bg-white' />}
        <div className='text-gray-400 hover:text-white'>{icon}</div>
      </button>
    </li>
  );
}

const SIDEBAR_ITEMS = [
  {
    id: 1,
    icon: <Folder size={24} />,
  },
];

interface ProfileItemProps {
  isLoggedIn: boolean;
  onClick: () => void;
}

function ProfileItem({ isLoggedIn, onClick }: ProfileItemProps) {
  return (
    <button
      type='button'
      className={cn(
        'flex justify-center items-center w-full cursor-pointer p-4',
        'hover:bg-[#4A4A4C] transition-colors',
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full w-8 h-8',
          isLoggedIn ? 'bg-emerald-600' : 'bg-gray-700 border border-gray-600',
        )}
      >
        <User size={16} className='text-white' />
      </div>
    </button>
  );
}

interface SidebarNavProps {
  activeItem: number | null;
  onItemChange: Dispatch<SetStateAction<number | null>>;
}

export function SidebarNav({ activeItem, onItemChange }: SidebarNavProps) {
  const handleItemClick = (id: number) => {
    onItemChange(id === activeItem ? null : id);
  };

  // 임시로 isLoggedIn을 false로 설정
  const isLoggedIn = false;

  const handleProfileClick = () => {
    // 로그인 상태에 따라 프로필 페이지 또는 로그인 페이지로 이동
    console.log('프로필 또는 로그인 버튼 클릭됨');
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <ul className='flex flex-col items-center'>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            isActive={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </ul>

      <div className='mt-auto border-t border-gray-800'>
        <ProfileItem isLoggedIn={isLoggedIn} onClick={handleProfileClick} />
      </div>
    </div>
  );
}
