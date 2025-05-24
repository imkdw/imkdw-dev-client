import { request } from '../api-client';
import { RequestCreateMemo, ResponseCreateMemo, MemoDetail } from '../types';
import { RequestUpdateMemoName } from '../types/memo/update-memo-name.type';
import { RequestUpdateMemo } from '../types/memo/update-memo.type';

/**
 * 메모 조회
 */
export async function getMemo(slug: string) {
  return request<never, MemoDetail>({
    url: `v1/memos/${slug}`,
    method: 'GET',
  });
}

/**
 * 메모 생성
 */
export async function createMemo(body: RequestCreateMemo) {
  return request<RequestCreateMemo, ResponseCreateMemo>({
    url: 'v1/memos',
    method: 'POST',
    body,
  });
}

/**
 * 메모 수정
 */
export async function updateMemo(slug: string, body: RequestUpdateMemo) {
  return request<RequestUpdateMemo, void>({
    url: `v1/memos/${slug}`,
    method: 'PUT',
    body,
  });
}

/**
 * 메모 이름 변경
 */
export async function updateMemoName(slug: string, body: RequestUpdateMemoName) {
  return request<RequestUpdateMemoName, void>({
    url: `v1/memos/${slug}/name`,
    method: 'PATCH',
    body,
  });
}
