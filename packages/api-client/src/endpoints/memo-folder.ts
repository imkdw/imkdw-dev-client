import { apiClient } from '../api-client';
import { MemoFolder, MemoItem, ResponseFindRootMemoFolders } from '../types';

export function findRootMemoFolders() {
  return apiClient.request<never, ResponseFindRootMemoFolders[]>({
    url: 'v1/memo-folders/root',
    method: 'GET',
    enableErrorToast: false, // 데이터 로딩 실패는 조용히 처리
  });
}

export function findChildMemoFolders(parentId: string) {
  return apiClient.request<never, MemoFolder[]>({
    url: `v1/memo-folders/${parentId}/children`,
    method: 'GET',
    enableErrorToast: false, // 데이터 로딩 실패는 조용히 처리
  });
}

export async function findFolderMemos(folderId: string) {
  return apiClient.request<never, MemoItem[]>({
    url: `v1/memo-folders/${folderId}/memos`,
    method: 'GET',
    enableErrorToast: false, // 데이터 로딩 실패는 조용히 처리
  });
}
