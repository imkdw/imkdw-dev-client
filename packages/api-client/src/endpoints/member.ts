import { request } from '../api-client';
import { ResponseGetMyInfo } from '../types/member';

export async function getMyInfo(accessToken: string) {
  return request<never, ResponseGetMyInfo>({
    url: 'v1/members/me',
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
  });
}
