import { GetMemoResponse } from '@imkdw-dev-client/api-client';

interface Props {
  memo: GetMemoResponse;
}

export function MemoDetail({ memo }: Props) {
  return (
    <div className='flex flex-col h-full bg-[#242424] text-white'>
      <div className='flex flex-1 overflow-auto'>
        <div className='flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap'>{memo.content}</div>
      </div>
    </div>
  );
}
