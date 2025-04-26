'use client';

import { Link } from '@imkdw-dev-client/i18n';
import { MemoTab } from './memo.type';
import { X } from 'lucide-react';

interface Props {
  tabs: MemoTab[];
  currentMemoId?: string;
  onCloseTab: (id: string) => void;
}

export function MemoTabs({ tabs, currentMemoId, onCloseTab }: Props) {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center px-4 py-2 border-r border-gray-600 ${
            tab.id === currentMemoId ? 'bg-[#333333]' : ''
          }`}
        >
          <Link href={`/memo/${tab.id}`} className="mr-2 text-sm font-medium truncate max-w-[150px]" title={tab.title}>
            {tab.title}
          </Link>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onCloseTab(tab.id);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="탭 닫기"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
