import { getMemos } from '@imkdw-dev-client/api-client';
import { MemoTreeVisualizer } from '../../../components/three-d/memo-tree-visualizer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 트리 시각화 | ImKDW Dev',
  description: '3D 환경에서 메모들을 트리 구조로 시각화하여 탐색할 수 있습니다',
};

export default async function MemoTreePage() {
  const memos = await getMemos();

  return <MemoTreeVisualizer memos={memos} />;
}
