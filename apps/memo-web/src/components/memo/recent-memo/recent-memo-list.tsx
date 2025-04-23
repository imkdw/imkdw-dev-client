import { MemoListHeader } from './recent-memo-list-header';
import { MemoListTabMenu } from './recent-memo-list-tab-menu';
import { RecentMemoItem, RecentMemoItemProps } from './recent-memo-item';

export function RecentMemoList() {
  const memos: RecentMemoItemProps[] = Array.from({ length: 10 }, (_, index) => ({
    title: `Memo${index + 1}`,
    content: 'About Knowledgeasdasdasdasdsadasdada'.repeat(10),
    views: 1234,
    date: '2024-01-01',
    color: '#F18484',
  }));

  return (
    <div className='flex flex-col shadow-primary bg-white rounded-lg'>
      <div className='flex flex-col gap-2 p-6'>
        <MemoListHeader />
        <MemoListTabMenu />
        <div className='flex flex-col justify-center pt-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {memos.map((memo, index) => (
              <RecentMemoItem key={index} {...memo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
