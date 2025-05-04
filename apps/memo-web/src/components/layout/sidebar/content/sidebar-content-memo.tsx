import { Link } from '@imkdw-dev-client/i18n';
import { cn } from '@imkdw-dev-client/utils';
import { File } from 'lucide-react';

interface Props {
  level: number;
  memoName: string;
  slug: string;
}

export function SidebarContentMemo({ level = 0, memoName, slug }: Props) {
  return (
    <li>
      <Link
        href={`/memo/${slug}`}
        type='button'
        className={cn(
          'flex items-center p-1 w-full cursor-pointer hover:bg-[#3B3B3C] rounded',
          'text-base text-gray-300 hover:text-white',
          // isFileActive(item.memoId) && 'bg-[#3B3B3C] text-white font-medium',
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <span className='mr-1 text-gray-400 w-4' />
        <File size={16} className={cn('mr-2 text-gray-400')} />
        <span>{memoName}</span>
      </Link>
    </li>
  );
}
