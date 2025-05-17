import { request } from '../api-client';
import {
  RequestCreateMemo,
  RequestUpdateMemo,
  ResponseCreateMemo,
  ResponseGetMemo,
  ResponseUpdateMemo,
} from '../types';

/**
 * 메모 조회
 */
export async function getMemo(slug: string) {
  return request<never, ResponseGetMemo>({
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
  return request<RequestUpdateMemo, ResponseUpdateMemo>({
    url: `v1/memos/${slug}`,
    method: 'PUT',
    body,
  });
}
