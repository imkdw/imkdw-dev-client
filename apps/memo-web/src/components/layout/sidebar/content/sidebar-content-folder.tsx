import { cn } from '@imkdw-dev-client/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Folder } from 'lucide-react';

interface Props {
  level: number;
  folderName: string;
}

export function SidebarContentFolder({ level = 0, folderName }: Props) {
  return (
    <li>
      <button
        type='button'
        className={cn(
          'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
          'text-base text-gray-300',
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        // onClick={(event) => toggleFolder(item.id, event)}
      >
        <motion.div
          className='mr-1 text-gray-400 z-10'
          // animate={{ rotate: expandedFolders[item.id] ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight size={16} />
        </motion.div>
        <Folder size={16} className='mr-2 text-blue-400' />
        <span>{folderName}</span>
      </button>
    </li>
  );
}
