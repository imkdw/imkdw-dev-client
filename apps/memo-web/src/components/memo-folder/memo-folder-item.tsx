import type { MemoFolder } from '@imkdw-dev-client/api-client';
import { FolderIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { MemoFolderDeleteDialog } from './memo-folder-delete-dialog';
import { MemoFolderEditForm } from './memo-folder-edit-form';

interface Props {
  folder: MemoFolder;
  onClick: (folder: MemoFolder) => void;
}

export function MemoFolderItem({ folder, onClick }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setShowContextMenu(false);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
    setShowContextMenu(false);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  const handleClick = () => {
    if (!isEditing) {
      onClick(folder);
    }
  };

  if (isEditing) {
    return (
      <div className='px-2 py-1'>
        <MemoFolderEditForm
          folderId={folder.id}
          currentName={folder.name}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      </div>
    );
  }

  return (
    <>
      <div className='group relative flex items-center rounded px-2 py-1 hover:bg-accent'>
        <button type='button' onClick={handleClick} className='flex flex-1 items-center text-left'>
          <FolderIcon className='mr-2 h-4 w-4 text-blue-600' />
          <span className='text-sm'>{folder.name}</span>
        </button>

        <div className='relative'>
          <button
            type='button'
            onClick={() => setShowContextMenu(!showContextMenu)}
            className='opacity-0 p-1 hover:bg-gray-200 group-hover:opacity-100'
          >
            <MoreHorizontalIcon className='h-4 w-4' />
          </button>

          {showContextMenu && (
            <div className='absolute right-0 top-full z-10 mt-1 rounded border bg-white py-1 shadow-lg'>
              <button
                type='button'
                onClick={handleEdit}
                className='flex w-full items-center px-3 py-1 text-sm hover:bg-gray-100'
              >
                <PencilIcon className='mr-2 h-4 w-4' />
                이름 변경
              </button>
              <button
                type='button'
                onClick={handleDelete}
                className='flex w-full items-center px-3 py-1 text-sm text-red-600 hover:bg-gray-100'
              >
                <TrashIcon className='mr-2 h-4 w-4' />
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <MemoFolderDeleteDialog
        folderId={folder.id}
        folderName={folder.name}
        isOpen={showDeleteDialog}
        onSuccess={handleDeleteSuccess}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
