import { MemoDetailActions } from '@/src/components';

interface MemoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { id } = await params;

  return (
    <section className='flex flex-col bg-white shadow-primary rounded-lg p-4 h-full'>
      <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
        <h1 className='text-2xl'>MemoDetailPage {id}</h1>
        <MemoDetailActions memoId={id} />
      </div>
    </section>
  );
}
