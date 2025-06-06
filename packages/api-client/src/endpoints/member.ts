import { apiClient } from '../api-client';
import { ResponseGetMyInfo } from '../types/member';

export async function getMyInfo() {
  return apiClient.request<never, ResponseGetMyInfo>({
    url: 'v1/members/me',
    method: 'GET',
  });
}
