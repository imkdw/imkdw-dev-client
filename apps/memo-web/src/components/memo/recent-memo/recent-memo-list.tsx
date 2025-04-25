import { RecentMemoItem, RecentMemoItemProps } from '@/src/components/memo/recent-memo/recent-memo-item';
import { MemoListHeader } from './recent-memo-list-header';

export function RecentMemoList() {
  const memos: RecentMemoItemProps[] = Array.from({ length: 10 }, (_, index) => ({
    title: `Memo${index + 1}`,
    content: 'About Knowledgeasdasdasdasdsadasdada'.repeat(10),
    views: 1234,
    date: '2024-01-01',
    color: '#F18484',
  }));

  return (
    <div className="flex flex-col shadow-primary bg-white rounded-lg">
      <div className="flex flex-col gap-2 p-6">
        <MemoListHeader />
        <div className="flex flex-col justify-center pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {memos.map((memo) => (
              <RecentMemoItem key={memo.title} {...memo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
