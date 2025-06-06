import { apiClient } from '../api-client';
import { MemoDetail, RequestCreateMemo, ResponseCreateMemo } from '../types';
import { RequestUpdateMemoName } from '../types/memo/update-memo-name.type';
import { RequestUpdateMemo } from '../types/memo/update-memo.type';

export async function getMemo(slug: string) {
  return apiClient.request<never, MemoDetail>({
    url: `v1/memos/${slug}`,
    method: 'GET',
  });
}

export async function createMemo(body: RequestCreateMemo) {
  return apiClient.request<RequestCreateMemo, ResponseCreateMemo>({
    url: 'v1/memos',
    method: 'POST',
    body,
  });
}

export async function updateMemo(slug: string, body: RequestUpdateMemo) {
  return apiClient.request<RequestUpdateMemo, void>({
    url: `v1/memos/${slug}`,
    method: 'PUT',
    body,
  });
}

export async function updateMemoName(slug: string, body: RequestUpdateMemoName) {
  return apiClient.request<RequestUpdateMemoName, MemoDetail>({
    url: `v1/memos/${slug}/name`,
    method: 'PATCH',
    body,
  });
}

export async function deleteMemo(slug: string) {
  return apiClient.request<never, never>({
    url: `v1/memos/${slug}`,
    method: 'DELETE',
  });
}
