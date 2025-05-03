import { ChevronRight } from 'lucide-react';

interface Props {
  path: string[];
}

export function MemoBreadcrumb({ path }: Props) {
  if (!path.length) {
    return null;
  }

  return (
    <div className='flex items-center px-4 py-1 text-sm bg-[#2d2d2d] text-gray-400'>
      {path.map((segment, index) => (
        <div key={`${segment}`} className='flex items-center'>
          {index > 0 && <ChevronRight size={14} className='mx-1' />}
          <span className='hover:text-white cursor-pointer'>{segment}</span>
        </div>
      ))}
    </div>
  );
}
