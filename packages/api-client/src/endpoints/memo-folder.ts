import { FindRootMemoFoldersResponse } from '@/types/memo-folder/find-memo-folder.type';
import { request } from '../api-client';

export function findRootMemoFolders() {
  return request<never, FindRootMemoFoldersResponse>({
    url: 'v1/memo-folders/root',
    method: 'GET',
  });
}
