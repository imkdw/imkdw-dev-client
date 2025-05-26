import { request } from '../api-client';
import { MemoFolder, MemoItem, ResponseFindRootMemoFolders } from '../types';

/**
 * 최상위 메모 폴더 목록 조회
 */
export function findRootMemoFolders() {
  return request<never, ResponseFindRootMemoFolders[]>({
    url: 'v1/memo-folders/root',
    method: 'GET',
  });
}

/**
 * 특정 메모 폴더의 자식 폴더 목록 조회
 */
export function findChildMemoFolders(parentId: string) {
  return request<never, MemoFolder[]>({
    url: `v1/memo-folders/${parentId}/children`,
    method: 'GET',
  });
}

/**
 * 폴더에 속한 메모 목록 조회
 */
export async function findFolderMemos(folderId: string) {
  return request<never, MemoItem[]>({
    url: `v1/memo-folders/${folderId}/memos`,
    method: 'GET',
  });
}
