import { request } from '../api-client';
import { ResponseGetMyInfo } from '../types/member';

export async function getMyInfo() {
  return request<never, ResponseGetMyInfo>({
    url: 'v1/members/me',
    method: 'GET',
  });
}
