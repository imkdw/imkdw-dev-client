import { MemoDetail as MemoDetailType } from '@imkdw-dev-client/api-client';
import MemoViewer from './memo-viewer';

interface Props {
  memo: MemoDetailType;
}

export function MemoDetail({ memo }: Props) {
  return (
    <div className='flex flex-col h-full bg-[#242424] text-white overflow-auto vscode-scrollbar transition-opacity duration-200 ease-in-out'>
      <div className='flex flex-1'>
        <div className='flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap'>
          <MemoViewer memo={memo} />
        </div>
      </div>
    </div>
  );
}
