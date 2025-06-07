import { cn } from '@imkdw-dev-client/utils';
import { Keyboard } from '@imkdw-dev-client/consts';
import { motion } from 'framer-motion';
import { ChevronRight, Folder } from 'lucide-react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Props {
  level: number;
  folderName: string;
  isOpen: boolean;
  isEditing: boolean;
  isUpdating: boolean;
  onClick: () => void;
  onRenameConfirm: (newName: string) => Promise<boolean>;
  onRenameCancel: () => void;
}

export function FolderItem({
  level,
  folderName,
  isOpen,
  isEditing,
  isUpdating,
  onClick,
  onRenameConfirm,
  onRenameCancel,
}: Props) {
  const [editValue, setEditValue] = useState(folderName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(folderName);
  }, [folderName]);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Keyboard.ENTER && !isUpdating) {
      event.preventDefault();
      const success = await onRenameConfirm(editValue);
      if (!success) {
        setEditValue(folderName); // 실패시 원래 이름으로 복원
      }
    } else if (event.key === Keyboard.ESCAPE) {
      setEditValue(folderName);
      onRenameCancel();
    }
  };

  const handleBlur = async () => {
    if (isEditing && !isUpdating) {
      const success = await onRenameConfirm(editValue);
      if (!success) {
        setEditValue(folderName); // 실패시 원래 이름으로 복원
      }
    }
  };

  if (isEditing) {
    return (
      <div
        className={cn('flex items-center p-1 w-full', 'text-base text-gray-300')}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <motion.div
          className='mr-1 flex-shrink-0 text-gray-400 z-10'
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={16} />
        </motion.div>
        <Folder size={16} className='mr-2 flex-shrink-0 text-blue-400' />
        <input
          ref={inputRef}
          type='text'
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isUpdating}
          className={cn(
            'flex-1 min-w-0 bg-[#2D2D30] border border-gray-600 rounded px-2 py-1',
            'text-gray-300 text-sm focus:outline-none focus:border-blue-500',
            isUpdating && 'opacity-50 cursor-not-allowed',
          )}
        />
      </div>
    );
  }

  return (
    <button
      type='button'
      className={cn(
        'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
        'text-base text-gray-300',
      )}
      style={{ paddingLeft: `${level * 16 + 8}px` }}
      onClick={onClick}
    >
      <motion.div
        className='mr-1 flex-shrink-0 text-gray-400 z-10'
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <ChevronRight size={16} />
      </motion.div>
      <Folder size={16} className='mr-2 flex-shrink-0 text-blue-400' />
      <span className='truncate min-w-0'>{folderName}</span>
    </button>
  );
}
