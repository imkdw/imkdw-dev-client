'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { MemoTreeNode } from './memo-tree-node';
import { MemoItem } from '@imkdw-dev-client/api-client';
import { TreeDataProcessor } from './tree-data-processor';
import { Vector3 } from 'three';

interface Props {
  memos: MemoItem[];
}

// 키보드 제어 컴포넌트
function CameraController() {
  const { camera } = useThree();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const controlsRef = useRef<any>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const moveSpeed = 0.5;
  const rotateSpeed = 0.02;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.code);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const keys = keysPressed.current;

    // 카메라 이동 (WASD + 방향키)
    if (keys.has('KeyW') || keys.has('ArrowUp')) {
      camera.position.z -= moveSpeed;
    }
    if (keys.has('KeyS') || keys.has('ArrowDown')) {
      camera.position.z += moveSpeed;
    }
    if (keys.has('KeyA') || keys.has('ArrowLeft')) {
      camera.position.x -= moveSpeed;
    }
    if (keys.has('KeyD') || keys.has('ArrowRight')) {
      camera.position.x += moveSpeed;
    }

    // 상하 이동 (Q/E 키)
    if (keys.has('KeyQ')) {
      camera.position.y += moveSpeed;
    }
    if (keys.has('KeyE')) {
      camera.position.y -= moveSpeed;
    }

    // 줌 인/아웃 (+ / - 키)
    if (keys.has('Equal') || keys.has('NumpadAdd')) {
      // '+' 키
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, moveSpeed);
    }
    if (keys.has('Minus') || keys.has('NumpadSubtract')) {
      // '-' 키
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, -moveSpeed);
    }

    // 카메라 리셋 (R 키)
    if (keys.has('KeyR')) {
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      // 컨트롤을 업데이트
      if (controlsRef.current) {
        controlsRef.current.target?.set(0, 0, 0);
        controlsRef.current.update?.();
      }
    }

    // 회전 (Shift + 방향키)
    if (keys.has('ShiftLeft') || keys.has('ShiftRight')) {
      if (keys.has('ArrowLeft')) {
        camera.rotateY(rotateSpeed);
      }
      if (keys.has('ArrowRight')) {
        camera.rotateY(-rotateSpeed);
      }
      if (keys.has('ArrowUp')) {
        camera.rotateX(rotateSpeed);
      }
      if (keys.has('ArrowDown')) {
        camera.rotateX(-rotateSpeed);
      }
    }
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      zoomSpeed={1}
      panSpeed={1}
      rotateSpeed={1}
      minDistance={3}
      maxDistance={50}
    />
  );
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

        {/* 키보드 제어가 가능한 카메라 컨트롤 */}
        <CameraController />
      </Canvas>

      {/* 메모 개수 표시 */}
      <div className='absolute top-4 right-4 text-white bg-black bg-opacity-50 p-4 rounded-lg'>
        <div className='text-lg font-bold'>총 {memos.length}개의 메모</div>
      </div>

      {/* 키보드 컨트롤 가이드 */}
      <div className='absolute bottom-4 left-4 text-white bg-black bg-opacity-70 p-4 rounded-lg max-w-sm'>
        <div className='text-sm font-bold mb-2'>🎮 키보드 컨트롤</div>
        <div className='text-xs space-y-1'>
          <div>
            📍 <strong>이동:</strong> WASD 또는 방향키
          </div>
          <div>
            ⬆️ <strong>상하:</strong> Q (위) / E (아래)
          </div>
          <div>
            🔍 <strong>줌:</strong> + (확대) / - (축소)
          </div>
          <div>
            🔄 <strong>회전:</strong> Shift + 방향키
          </div>
          <div>
            🏠 <strong>리셋:</strong> R
          </div>
          <div className='text-yellow-200 mt-2'>💡 마우스 드래그로도 조작 가능</div>
        </div>
      </div>
    </div>
  );
}
