import { Link, usePathname } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { File, Pencil, Trash } from 'lucide-react';

interface Props {
  level: number;
  memoName: string;
  slug: string;
}

export function SidebarContentMemo({ level = 0, memoName, slug }: Props) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const isSelected = currentSlug === slug;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <li>
          <Link
            href={`/memo/${slug}`}
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
        </li>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className='context-menu-content'>
          <ContextMenu.Item className='context-menu-item'>
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
