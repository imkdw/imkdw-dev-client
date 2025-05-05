import { cn } from '@imkdw-dev-client/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Folder } from 'lucide-react';

interface Props {
  level: number;
  folderName: string;
  isOpen: boolean;
  onClick: () => void;
}

export function FolderItem({ level, folderName, isOpen, onClick }: Props) {
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
