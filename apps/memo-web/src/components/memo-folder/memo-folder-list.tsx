import type { ResponseFindRootMemoFolders } from '@imkdw-dev-client/api-client';
import { useState } from 'react';
import { SIDEBAR_ITEM_ID } from '../../constants/sidebar.const';
import { useRootMemoFolders } from '../../hooks/folder/use-root-memo-folders';
import { MemoFolderCreateForm } from './memo-folder-create-form';
import { MemoFolderItem } from './memo-folder-item';

export function MemoFolderList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { rootMemoFolders: folders, isLoading } = useRootMemoFolders(SIDEBAR_ITEM_ID.MEMO_FOLDERS);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleFolderClick = (folder: ResponseFindRootMemoFolders) => {
    void folder;
  };

  if (isLoading) {
    return <div className='p-4 text-center'>폴더 목록을 불러오는 중...</div>;
  }

  return (
    <div className='space-y-2 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>메모 폴더</h2>
        {!showCreateForm && (
          <button
            type='button'
            onClick={() => setShowCreateForm(true)}
            className='text-sm text-blue-600 hover:underline'
          >
            새 폴더 만들기
          </button>
        )}
      </div>

      {/* 폴더 생성 폼 */}
      {showCreateForm && (
        <MemoFolderCreateForm onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} initialEditing={true} />
      )}

      {/* 폴더 목록 */}
      <div className='space-y-1'>
        {folders.map((folder) => (
          <MemoFolderItem key={folder.id} folder={folder} onClick={handleFolderClick} />
        ))}
      </div>

      {folders.length === 0 && !showCreateForm && (
        <div className='text-center text-gray-500'>
          아직 생성된 폴더가 없습니다.
          <br />
          <button type='button' onClick={() => setShowCreateForm(true)} className='mt-2 text-blue-600 hover:underline'>
            첫 번째 폴더를 만들어보세요
          </button>
        </div>
      )}
    </div>
  );
}
