import { apiClient } from '../api-client';
import {
  MemoFolder,
  MemoItem,
  RequestCreateMemoFolder,
  RequestUpdateMemoFolder,
  ResponseCreateMemoFolder,
  ResponseFindRootMemoFolders,
} from '../types';

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

export async function createMemoFolder(body: RequestCreateMemoFolder) {
  return apiClient.request<RequestCreateMemoFolder, ResponseCreateMemoFolder>({
    url: 'v1/memo-folders',
    method: 'POST',
    body,
  });
}

export async function updateMemoFolder(id: string, body: RequestUpdateMemoFolder) {
  return apiClient.request<RequestUpdateMemoFolder, MemoFolder>({
    url: `v1/memo-folders/${id}`,
    method: 'PUT',
    body,
  });
}

export async function deleteMemoFolder(id: string) {
  return apiClient.request<never, never>({
    url: `v1/memo-folders/${id}`,
    method: 'DELETE',
  });
}
