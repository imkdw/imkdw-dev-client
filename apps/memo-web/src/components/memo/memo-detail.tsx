import { MemoDetail as MemoDetailType } from '@imkdw-dev-client/api-client';

interface Props {
  memo: MemoDetailType;
}

export function MemoDetail({ memo }: Props) {
  return (
    <div className='flex flex-col h-full bg-[#242424] text-white overflow-auto vscode-scrollbar'>
      <div className='flex flex-1'>
        <div className='flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap'>{memo.content}</div>
      </div>
    </div>
  );
}
