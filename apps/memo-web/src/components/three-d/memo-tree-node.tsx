'use client';

import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useRouter } from 'next/navigation';
import { TreeNode } from '../../types/memo-tree.types';

interface Props {
  node: TreeNode;
}

export function MemoTreeNode({ node }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  // 호버 애니메이션
  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered ? 1.2 : 1;
      meshRef.current.scale.setScalar(scale);

      // 부드러운 회전 애니메이션
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
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

  // 노드 타입에 따른 색상 결정
  const getNodeColor = () => {
    if (clicked) return '#ff6b6b';
    if (hovered) return node.type === 'folder' ? '#4ecdc4' : '#45b7d1';
    return node.type === 'folder' ? '#2c3e50' : '#3498db';
  };

  // 노드 타입에 따른 모양 결정
  const getNodeGeometry = () => {
    if (node.type === 'folder') {
      return <boxGeometry args={[1, 1, 1]} />;
    }
    return <sphereGeometry args={[0.5, 16, 16]} />;
  };

  // 텍스트 색상
  const getTextColor = () => {
    return hovered ? '#ffffff' : '#e0e0e0';
  };

  return (
    <group position={node.position}>
      {/* 메인 노드 */}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getNodeGeometry()}
        <meshStandardMaterial color={getNodeColor()} transparent opacity={0.8} emissive={hovered ? '#222' : '#000'} />
      </mesh>

      {/* 노드 텍스트 */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color={getTextColor()}
        anchorX='center'
        anchorY='top'
        maxWidth={2}
        textAlign='center'
      >
        {node.name}
      </Text>

      {/* 폴더 아이콘 (폴더 타입인 경우) */}
      {node.type === 'folder' && (
        <Text position={[0, 0.3, 0.51]} fontSize={0.4} color='#f39c12' anchorX='center' anchorY='middle'>
          📁
        </Text>
      )}

      {/* 메모 아이콘 (메모 타입인 경우) */}
      {node.type === 'memo' && (
        <Text position={[0, 0.3, 0.51]} fontSize={0.3} color='#ffffff' anchorX='center' anchorY='middle'>
          📝
        </Text>
      )}

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

      {/* 호버 시 파티클 효과 */}
      {hovered && (
        <pointLight
          position={[0, 0, 0]}
          color={node.type === 'folder' ? '#4ecdc4' : '#45b7d1'}
          intensity={1}
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}
