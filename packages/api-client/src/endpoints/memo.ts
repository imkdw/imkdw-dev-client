import { request } from '@/api-client';
import { GetMemoResponse } from '@/types/memo/get-memo.type';

export async function getMemo(slug: string) {
  return request<never, GetMemoResponse>({
    url: `v1/memos/${slug}`,
    method: 'GET',
  });
}
