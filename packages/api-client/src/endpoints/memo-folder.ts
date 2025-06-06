import { apiClient } from '../api-client';
import { MemoFolder, MemoItem, ResponseFindRootMemoFolders } from '../types';

export function findRootMemoFolders() {
  return apiClient.request<never, ResponseFindRootMemoFolders[]>({
    url: 'v1/memo-folders/root',
    method: 'GET',
  });
}

export function findChildMemoFolders(parentId: string) {
  return apiClient.request<never, MemoFolder[]>({
    url: `v1/memo-folders/${parentId}/children`,
    method: 'GET',
  });
}

export async function findFolderMemos(folderId: string) {
  return apiClient.request<never, MemoItem[]>({
    url: `v1/memo-folders/${folderId}/memos`,
    method: 'GET',
  });
}
