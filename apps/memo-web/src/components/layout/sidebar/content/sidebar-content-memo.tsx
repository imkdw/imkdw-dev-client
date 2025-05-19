'use client';

import { Link, usePathname } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { Edit2, File, Pencil, Trash } from 'lucide-react';
import { useState, useRef, KeyboardEvent, useEffect } from 'react';

interface Props {
  level: number;
  memoName: string;
  slug: string;
}

export function SidebarContentMemo({ level = 0, memoName, slug }: Props) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const isSelected = currentSlug === slug;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(memoName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 50);
    }
  }, [isRenaming]);

  const handleRename = () => {
    setNewName(memoName);
    setIsRenaming(true);
  };

  const handleSave = () => {
    if (newName.trim() !== '') {
      // TODO: API 호출 구현
      // 예: updateMemoName(slug, newName);
      // 메모 이름 변경 로직은 추후 구현
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setNewName(memoName);
    }
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <li>
          {isRenaming ? (
            <div
              className='flex items-center p-1 w-full rounded bg-[#3B3B3C] border border-blue-400'
              style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
              <Edit2 size={16} className='text-orange-400 w-4 flex-shrink-0' />
              <input
                ref={inputRef}
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className='bg-[#2B2B2C] text-white px-2 py-0.5 ml-2 rounded w-full focus:outline-none border border-gray-500 focus:border-blue-400'
                placeholder='메모 이름 입력...'
              />
            </div>
          ) : (
            <Link
              href={`/memo/${slug}/edit`}
              type='button'
              className={cn(
                'flex items-center p-1 w-full cursor-pointer rounded',
                'text-base text-gray-300 hover:text-white',
                isSelected ? 'bg-[#3B3B3C] text-white' : 'hover:bg-[#3B3B3C]',
              )}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
              <span className='text-gray-400 w-4 flex-shrink-0' />
              <File size={16} className={cn('mr-2 flex-shrink-0 text-gray-400')} />
              <span className='truncate min-w-0'>{memoName}</span>
            </Link>
          )}
        </li>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className='context-menu-content'>
          <ContextMenu.Item className='context-menu-item' onClick={handleRename}>
            <Pencil size={16} className='text-orange-400' />
            이름 변경
          </ContextMenu.Item>
          <ContextMenu.Item className='context-menu-item'>
            <Trash size={16} className='text-red-400' />
            삭제
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
