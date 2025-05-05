'use client';

import { Folder } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { SidebarNavigatorItem } from './sidebar-navigator-item';
import { SidebarNavigatorProfile } from './sidebar-navigator-profile';

const SIDEBAR_ITEMS = [
  {
    id: 1,
    icon: <Folder size={24} />,
  },
];

interface Props {
  activeItem: number | null;
  onItemChange: Dispatch<SetStateAction<number | null>>;
}

export function SidebarNavigator({ activeItem, onItemChange }: Props) {
  const handleItemClick = (id: number) => {
    onItemChange(id === activeItem ? null : id);
  };

  return (
    <nav className='flex flex-col justify-between h-full'>
      <ul className='flex flex-col items-center'>
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarNavigatorItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            isActive={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </ul>

      <div className='mt-auto'>
        <SidebarNavigatorProfile />
      </div>
    </nav>
  );
}
