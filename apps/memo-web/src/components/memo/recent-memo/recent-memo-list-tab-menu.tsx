'use client';

import { cn } from '@imkdw-dev-client/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';

type TabType = 'all' | 'pinned';

interface TabMenuButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabMenuButton({ label, isActive, onClick }: TabMenuButtonProps) {
  return (
    <button onClick={onClick} className='relative flex justify-center items-center px-2 py-1'>
      <span className={cn(isActive ? 'text-gray-600' : 'text-gray-400')}>{label}</span>
      {isActive && (
        <motion.div
          className='absolute bottom-0 left-0 right-0 h-[2px] bg-gray-600'
          layoutId='activeTab'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </button>
  );
}

export function MemoListTabMenu() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const handleTabClick = (tab: TabType) => setActiveTab(tab);

  return (
    <div className='flex gap-4 pt-2'>
      <TabMenuButton label='All' isActive={activeTab === 'all'} onClick={() => handleTabClick('all')} />
      <TabMenuButton label='Pinned' isActive={activeTab === 'pinned'} onClick={() => handleTabClick('pinned')} />
    </div>
  );
}
