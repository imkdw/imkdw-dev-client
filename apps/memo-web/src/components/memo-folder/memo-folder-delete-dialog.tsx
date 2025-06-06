import { useMemoFolderCrud } from '../../hooks/use-memo-folder-crud';

interface Props {
  folderId: string;
  folderName: string;
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MemoFolderDeleteDialog({ folderId, folderName, isOpen, onSuccess, onCancel }: Props) {
  const { deleteFolder, isDeleting } = useMemoFolderCrud();

  const handleDelete = async () => {
    const result = await deleteFolder(folderId);
    if (result) {
      onSuccess();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-4 max-w-md rounded-lg bg-white p-6 shadow-lg'>
        <h3 className='mb-4 text-lg font-semibold'>폴더 삭제</h3>
        <p className='mb-6 text-gray-600'>
          &quot;{folderName}&quot; 폴더를 삭제하시겠습니까?
          <br />
          <span className='text-red-600'>이 작업은 되돌릴 수 없습니다.</span>
        </p>
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isDeleting}
            className='rounded border px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50'
          >
            취소
          </button>
          <button
            type='button'
            onClick={handleDelete}
            disabled={isDeleting}
            className='rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50'
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  );
}
