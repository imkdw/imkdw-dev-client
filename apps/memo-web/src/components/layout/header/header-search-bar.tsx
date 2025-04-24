'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { MemoForm } from '@/src/components/memo/memo-form';

export function HeaderSearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-primary flex-1">
      <Search className="text-gray-400" fontSize={28} />
      <div className="flex items-center h-full w-full">
        <input type="text" className="pt-1 text-gray-500 placeholder:text-gray-400 w-full" placeholder="Search" />
      </div>
    </div>
  );
}
