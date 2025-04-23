import Link from 'next/link';
import { cn } from '@imkdw-dev-client/utils';
import { Eye, Calendar } from 'lucide-react';

export interface RecentMemoItemProps {
  title: string;
  content: string;
  views: number;
  date: string;
  color: string;
}

export const RecentMemoItem = ({ title, content, views, date, color }: RecentMemoItemProps) => {
  return (
    <Link
      href={`/memos/${title}`}
      className={cn(
        'flex flex-col bg-white shadow-primary rounded-lg p-4 border-b-4 min-h-[200px] hover:bg-gray-100 cursor-pointer',
      )}
      style={{ borderColor: color }}
    >
      {/* Title Section */}
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl'>{title}</h3>
        {/* <button>
          <Ellipsis className="text-gray-400" width={24} height={24} />
        </button> */}
      </div>

      {/* Content Section */}
      <p className='text-gray-400 text-lg line-clamp-3 overflow-hidden text-ellipsis break-words'>{content}</p>

      {/* Footer Section */}
      <div className='flex justify-between items-center pt-2 mt-auto'>
        <div className='flex items-center gap-1'>
          <Eye className='text-gray-400' width={16} height={16} />
          <span className='text-sm text-gray-400'>{views}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Calendar className='text-gray-400' width={16} height={16} />
          <span className='text-sm text-gray-400'>{date}</span>
        </div>
      </div>
    </Link>
  );
};
