import { MOCK_MEMOS } from './mock-data';
import { MemoBreadcrumb } from './memo-breadcrumb';
import { MemoLineNumbers } from './memo-line-numbers';
import { MemoTabManager } from './memo-tab-manager';

interface Props {
  memoId: string;
}

export function MemoDetail({ memoId }: Props) {
  const memo = MOCK_MEMOS[memoId];

  if (!memo) {
    return <div className="flex items-center justify-center h-full w-full text-white">메모를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#242424] text-white">
      <MemoTabManager memoId={memoId} title={memo.title} />
      <MemoBreadcrumb path={memo.path} />

      <div className="px-4 py-2 border-b border-[#3d3d3d]">
        <h1 className="text-xl font-semibold">{memo.title}</h1>
      </div>

      <div className="flex flex-1 overflow-auto">
        <MemoLineNumbers content={memo.content} />
        <div className="flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap">{memo.content}</div>
      </div>
    </div>
  );
}
