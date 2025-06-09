'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { MemoTreeNode } from './memo-tree-node';
import { MemoItem } from '@imkdw-dev-client/api-client';
import { TreeDataProcessor } from './tree-data-processor';

interface Props {
  memos: MemoItem[];
}

export function MemoTreeVisualizer({ memos }: Props) {
  const processor = new TreeDataProcessor();
  const treeData = processor.processMemosToTree(memos);

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 to-blue-900'>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
        }}
        className='w-full h-full'
      >
        {/* 조명 설정 */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 별이 빛나는 배경 */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* 메모 트리 렌더링 */}
        <Suspense fallback={null}>
          {treeData.map((node) => (
            <MemoTreeNode key={node.id} node={node} />
          ))}
        </Suspense>

        {/* 카메라 컨트롤 (360도 회전, 줌 인/아웃) */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={1}
          panSpeed={1}
          rotateSpeed={1}
          minDistance={3}
          maxDistance={50}
        />
      </Canvas>

      {/* 메모 개수 표시 */}
      <div className='absolute top-4 right-4 text-white bg-black bg-opacity-50 p-4 rounded-lg'>
        <div className='text-lg font-bold'>총 {memos.length}개의 메모</div>
      </div>
    </div>
  );
}
