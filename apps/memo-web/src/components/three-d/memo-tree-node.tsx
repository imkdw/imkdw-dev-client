'use client';

import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Group, BoxGeometry } from 'three';
import { useRouter } from 'next/navigation';
import { TreeNode } from '../../types/memo-tree.types';

interface Props {
  node: TreeNode;
}

// 폴더 아이콘 컴포넌트 (3D 지오메트리)
function FolderIcon({
  hovered,
  clicked,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  hovered: boolean;
  clicked: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const folderColor = clicked ? '#ff6b6b' : hovered ? '#fcd34d' : '#f59e0b';
  const emissiveColor = hovered ? '#92400e' : '#000';

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus */
    <group onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* 폴더 탭 */}
      <mesh position={[-0.1, 0.1, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color={folderColor} emissive={emissiveColor} transparent opacity={0.9} />
      </mesh>

      {/* 폴더 본체 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.4]} />
        <meshStandardMaterial color={folderColor} emissive={emissiveColor} transparent opacity={0.9} />
      </mesh>

      {/* 폴더 테두리 효과 */}
      <lineSegments>
        <edgesGeometry args={[new BoxGeometry(0.8, 0.6, 0.4)]} />
        <lineBasicMaterial color={hovered ? '#92400e' : '#b45309'} />
      </lineSegments>

      {/* 호버 시 빛 효과 */}
      {hovered && <pointLight position={[0, 0, 0]} color='#fcd34d' intensity={0.5} distance={2} decay={2} />}
    </group>
  );
}

// 메모 아이콘 컴포넌트 (3D 지오메트리)
function MemoIcon({
  hovered,
  clicked,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  hovered: boolean;
  clicked: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const memoColor = clicked ? '#ff6b6b' : hovered ? '#dbeafe' : '#bfdbfe';
  const lineColor = hovered ? '#3b82f6' : '#6b7280';
  const emissiveColor = hovered ? '#1e40af' : '#000';

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus */
    <group onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* 메모 배경 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color={memoColor} emissive={emissiveColor} transparent opacity={0.9} />
      </mesh>

      {/* 메모 라인들 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0.25 - i * 0.12, 0.06]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* 메모 헤더 (상단 여백) */}
      <mesh position={[0, 0.3, 0.06]}>
        <boxGeometry args={[0.45, 0.05, 0.01]} />
        <meshBasicMaterial color={lineColor} transparent opacity={0.5} />
      </mesh>

      {/* 호버 시 반짝이는 효과 */}
      {hovered && (
        <>
          <mesh position={[0.2, 0.3, 0.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color='#fbbf24' />
          </mesh>
          <mesh position={[0.25, 0.2, 0.1]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color='#fbbf24' />
          </mesh>
          <pointLight position={[0, 0, 0]} color='#45b7d1' intensity={0.5} distance={2} decay={2} />
        </>
      )}
    </group>
  );
}

export function MemoTreeNode({ node }: Props) {
  const iconRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  // 호버 애니메이션
  useFrame(() => {
    // 아이콘 크기 애니메이션
    if (iconRef.current) {
      const scale = hovered ? 1.2 : 1;
      iconRef.current.scale.setScalar(scale);

      // 아이콘 살짝 흔들기 효과
      if (hovered) {
        iconRef.current.rotation.z = Math.sin(Date.now() * 0.005) * 0.05;
        iconRef.current.rotation.y += 0.01;
      }
    }
  });

  // 노드 클릭 핸들러
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    if (node.type === 'memo' && node.memo) {
      // 메모 페이지로 이동
      const memoPath = `/memo/${node.memo.id}`;
      router.push(memoPath);
    }
  };

  // 텍스트 색상
  const getTextColor = () => {
    return hovered ? '#ffffff' : '#e0e0e0';
  };

  return (
    <group position={node.position}>
      {/* 아이콘이 메인 노드 역할 */}
      <group ref={iconRef}>
        {node.type === 'folder' ? (
          <FolderIcon
            hovered={hovered}
            clicked={clicked}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          />
        ) : (
          <MemoIcon
            hovered={hovered}
            clicked={clicked}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          />
        )}
      </group>

      {/* 노드 텍스트 */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.25}
        color={getTextColor()}
        anchorX='center'
        anchorY='top'
        maxWidth={2}
        textAlign='center'
      >
        {node.name}
      </Text>

      {/* 자식 노드들 렌더링 */}
      {node.children.map((child) => (
        <MemoTreeNode key={child.id} node={child} />
      ))}

      {/* 부모-자식 연결선 */}
      {node.children.map((child) => (
        <Line
          key={`line-${child.id}`}
          points={[node.position, child.position]}
          color={hovered ? '#4ecdc4' : '#7f8c8d'}
          lineWidth={hovered ? 3 : 1}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}
