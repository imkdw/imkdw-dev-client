'use client';

import { cn } from '@imkdw-dev-client/utils';
import { FileText, Folder } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  id: number;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, isActive = false, onClick }: SidebarItemProps) {
  return (
    <li
      className={cn('flex justify-center items-center w-full cursor-pointer p-4 relative', 'hover:bg-[#4A4A4C]')}
      onClick={onClick}
    >
      {isActive && <div className="absolute left-0 top-0 h-full w-0.5 bg-white"></div>}
      <div className="text-gray-400 hover:text-white">{icon}</div>
    </li>
  );
}

const SIDEBAR_ITEMS = [
  {
    id: 1,
    icon: <Folder size={24} />,
  },
];

interface SidebarNavProps {
  activeItem: number | null;
  onItemChange: Dispatch<SetStateAction<number | null>>;
}

export function SidebarNav({ activeItem, onItemChange }: SidebarNavProps) {
  const handleItemClick = (id: number) => {
    onItemChange(id === activeItem ? null : id);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <ul className="flex flex-col items-center">
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
    </div>
  );
}
