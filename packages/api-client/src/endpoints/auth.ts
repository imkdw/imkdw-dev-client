import { request } from '../api-client';
import { ResponseGetAuthorizationUrl } from '../types';

export function getAuthorizationUrl(provider: string, redirectUrl: string) {
  return request<never, ResponseGetAuthorizationUrl>({
    method: 'GET',
    url: `v1/auth/${provider}/authorization?redirectUrl=${redirectUrl}`,
  });
}
