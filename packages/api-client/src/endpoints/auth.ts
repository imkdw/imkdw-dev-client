import { request } from '../api-client';
import { ResponseGetAuthorizationUrl, ResponseVerifyToken } from '../types';

export function getAuthorizationUrl(provider: string, redirectUrl: string) {
  return request<never, ResponseGetAuthorizationUrl>({
    method: 'GET',
    url: `v1/auth/${provider}/authorization?redirectUrl=${redirectUrl}`,
  });
}

export function verifyToken(accessToken: string) {
  return request<never, ResponseVerifyToken>({
    method: 'GET',
    url: 'v1/auth/verify-token',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function logout() {
  return request<never, never>({
    method: 'POST',
    url: 'v1/auth/logout',
  });
}
