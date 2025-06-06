import { apiClient } from '../api-client';
import { ResponseGetUploadUrl } from '../types/storage';

export function getUploadUrl(fileName: string, extension: string) {
  return apiClient.request<never, ResponseGetUploadUrl>({
    method: 'GET',
    url: `v1/storage/upload-url?fileName=${fileName}&extension=${extension}`,
  });
}
