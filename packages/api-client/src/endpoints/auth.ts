import { apiClient } from '../api-client';
import { ResponseGetAuthorizationUrl, ResponseVerifyToken } from '../types';

export function getAuthorizationUrl(provider: string, redirectUrl: string) {
  return apiClient.request<never, ResponseGetAuthorizationUrl>({
    method: 'GET',
    url: `v1/auth/${provider}/authorization?redirectUrl=${redirectUrl}`,
  });
}

export function verifyToken() {
  return apiClient.request<never, ResponseVerifyToken>({
    method: 'GET',
    url: 'v1/auth/verify-token',
    enableErrorToast: false, // 인증 확인은 조용히 진행
  });
}

export function logout() {
  return apiClient.request<never, never>({
    method: 'POST',
    url: 'v1/auth/logout',
  });
}
