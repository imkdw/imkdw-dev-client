'use client';

import { createMemoFolder, deleteMemoFolder, updateMemoFolderName } from '@imkdw-dev-client/api-client';
import type {
  MemoFolder,
  RequestCreateMemoFolder,
  RequestUpdateMemoFolderName,
  ResponseCreateMemoFolder,
} from '@imkdw-dev-client/api-client';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useCallback, useState } from 'react';
import { useMemoStore } from '../../stores/memo-store';

export const useMemoFolderCrud = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { triggerRefresh } = useMemoStore();

  const createFolder = useCallback(
    async (data: RequestCreateMemoFolder): Promise<ResponseCreateMemoFolder | null> => {
      setIsCreating(true);
      try {
        const result = await createMemoFolder(data);
        showSuccessToast('폴더가 생성되었습니다.');
        triggerRefresh();
        return result;
      } catch {
        showErrorToast('폴더 생성에 실패했습니다.');
        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [triggerRefresh],
  );

  const updateFolder = useCallback(
    async (id: string, data: RequestUpdateMemoFolderName): Promise<MemoFolder | null> => {
      setIsUpdating(true);
      try {
        const result = await updateMemoFolderName(id, data);
        showSuccessToast('폴더명이 변경되었습니다.');
        triggerRefresh();
        return result;
      } catch {
        showErrorToast('폴더명 변경에 실패했습니다.');
        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [triggerRefresh],
  );

  const deleteFolder = useCallback(
    async (id: string): Promise<boolean> => {
      setIsDeleting(true);
      try {
        await deleteMemoFolder(id);
        showSuccessToast('폴더가 삭제되었습니다.');
        triggerRefresh();
        return true;
      } catch {
        showErrorToast('폴더 삭제에 실패했습니다.');
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    [triggerRefresh],
  );

  return {
    createFolder,
    updateFolder,
    deleteFolder,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
