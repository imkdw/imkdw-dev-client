import { apiClient } from '../api-client';
import { ResponseGetMyInfo } from '../types/member';

export async function getMyInfo() {
  return apiClient.request<never, ResponseGetMyInfo>({
    url: 'v1/members/me',
    method: 'GET',
    enableErrorToast: false, // 인증 정보 조회는 조용히 진행
  });
}
