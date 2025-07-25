import { MemoItem } from '@imkdw-dev-client/api-client';
import { Vector3 } from 'three';

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'memo';
  path: string;
  children: TreeNode[];
  position: Vector3;
  memo?: MemoItem;
}
