import { request } from '../api-client';
import { GetMemoResponse } from '../types';

export async function getMemo(slug: string) {
  return request<never, GetMemoResponse>({
    url: `v1/memos/${slug}`,
    method: 'GET',
  });
}
