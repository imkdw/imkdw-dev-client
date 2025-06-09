import { Vector3 } from 'three';
import { TreeNode } from '../../types/memo-tree.types';
import { MemoItem } from '@imkdw-dev-client/api-client';

export class TreeDataProcessor {
  private nodeCounter = 0;

  /**
   * 메모 배열을 3D 트리 구조로 변환합니다
   */
  processMemosToTree(memos: MemoItem[]): TreeNode[] {
    this.nodeCounter = 0;
    const pathMap = new Map<string, TreeNode>();
    const rootNodes: TreeNode[] = [];

    // 경로별로 폴더 구조 생성
    memos.forEach((memo) => {
      const pathParts = this.normalizePath(memo.path).split('/').filter(Boolean);
      let currentPath = '';
      let parentNode: TreeNode | null = null;

      // 경로의 각 부분에 대해 폴더 노드 생성
      pathParts.forEach((part, index) => {
        const isLastPart = index === pathParts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (!pathMap.has(currentPath)) {
          const node: TreeNode = {
            id: `node-${this.nodeCounter++}`,
            name: isLastPart ? memo.name : part,
            type: isLastPart ? 'memo' : 'folder',
            path: currentPath,
            children: [],
            position: new Vector3(0, 0, 0), // 위치는 나중에 계산
            memo: isLastPart ? memo : undefined,
          };

          pathMap.set(currentPath, node);

          if (parentNode) {
            parentNode.children.push(node);
          } else {
            rootNodes.push(node);
          }
        }

        const currentNode = pathMap.get(currentPath);
        if (currentNode) {
          parentNode = currentNode;
        }
      });
    });

    // 3D 위치 계산
    this.calculatePositions(rootNodes);

    return rootNodes;
  }

  /**
   * 경로를 정규화합니다 (앞뒤 슬래시 제거)
   */
  private normalizePath(path: string): string {
    return path.replace(/^\/+|\/+$/g, '').replace(/\.md$/, '');
  }

  /**
   * 트리 노드들의 3D 위치를 계산합니다
   */
  private calculatePositions(nodes: TreeNode[], level = 0): void {
    const radius = Math.max(3, nodes.length * 1.5); // 레벨에 따른 반지름
    const angleStep = (Math.PI * 2) / Math.max(nodes.length, 1);

    nodes.forEach((node, index) => {
      // 원형 배치로 위치 계산
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -level * 3; // 레벨에 따라 Y축 위치 조정

      node.position = new Vector3(x, y, z);

      // 자식 노드들의 위치 계산 (재귀)
      if (node.children.length > 0) {
        this.calculateChildPositions(node, level + 1);
      }
    });
  }

  /**
   * 특정 부모 노드의 자식 노드들 위치를 계산합니다
   */
  private calculateChildPositions(parentNode: TreeNode, level: number): void {
    const children = parentNode.children;
    if (children.length === 0) return;

    const childRadius = Math.max(1.5, children.length * 0.8);
    const angleStep = (Math.PI * 2) / children.length;

    children.forEach((child, index) => {
      const angle = index * angleStep;
      const x = parentNode.position.x + Math.cos(angle) * childRadius;
      const z = parentNode.position.z + Math.sin(angle) * childRadius;
      const y = parentNode.position.y - 3; // 부모보다 아래쪽에 배치

      child.position = new Vector3(x, y, z);

      // 재귀적으로 자식의 자식들도 처리
      if (child.children.length > 0) {
        this.calculateChildPositions(child, level + 1);
      }
    });
  }

  /**
   * 트리의 총 노드 수를 계산합니다
   */
  getTotalNodeCount(nodes: TreeNode[]): number {
    let count = nodes.length;
    nodes.forEach((node) => {
      count += this.getTotalNodeCount(node.children);
    });
    return count;
  }

  /**
   * 트리의 최대 깊이를 계산합니다
   */
  getMaxDepth(nodes: TreeNode[], currentDepth = 0): number {
    if (nodes.length === 0) return currentDepth;

    let maxDepth = currentDepth;
    nodes.forEach((node) => {
      const childDepth = this.getMaxDepth(node.children, currentDepth + 1);
      maxDepth = Math.max(maxDepth, childDepth);
    });

    return maxDepth;
  }
}
