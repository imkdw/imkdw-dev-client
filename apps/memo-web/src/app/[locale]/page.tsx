import { Link } from '@imkdw-dev-client/i18n';
import { MOCK_MEMOS } from '@/src/components/memo/mock-data';
import { Memo } from '@/src/components/memo/memo.type';

export default function HomePage() {
  const memos = Object.values(MOCK_MEMOS) as Memo[];

  return (
    <div className="flex flex-col p-6 bg-[#242424] text-white w-full">
      <h1 className="text-2xl font-bold mb-6">메모 목록</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memos.map((memo) => (
          <Link key={memo.id} href={`/memo/${memo.id}`} className="block">
            <div className="bg-[#2d2d2d] p-4 rounded hover:bg-[#3d3d3d] transition-colors">
              <h2 className="text-lg font-semibold mb-2">{memo.title}</h2>
              <p className="text-gray-400 text-sm">{memo.path.join(' > ')}</p>
              <p className="text-gray-400 text-xs mt-2">마지막 수정: {new Date(memo.updatedAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
