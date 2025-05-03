import { Memo } from './memo.type';

interface Props {
  memo: Memo;
}

export function MemoDetail({ memo }: Props) {
  return (
    <div className='flex flex-col h-full bg-[#242424] text-white'>
      <div className='px-4 py-2 border-b border-[#3d3d3d]'>
        <h1 className='text-xl font-semibold'>{memo.title}</h1>
      </div>
      <div className='flex flex-1 overflow-auto'>
        <div className='flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap'>{memo.content}</div>
      </div>
    </div>
  );
}
