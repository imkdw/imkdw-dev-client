import { useEffect, useState } from 'react';
import { useMemoFolderCrud } from '../../hooks/folder/use-memo-folder-crud';

interface Props {
  folderId: string;
  currentName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MemoFolderEditForm({ folderId, currentName, onSuccess, onCancel }: Props) {
  const [name, setName] = useState(currentName);
  const { updateFolder, isUpdating } = useMemoFolderCrud();

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim() === currentName) {
      onCancel();
      return;
    }

    const result = await updateFolder(folderId, {
      name: name.trim(),
    });

    if (result) {
      onSuccess();
    }
  };

  const handleCancel = () => {
    setName(currentName);
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        className='h-8 w-full rounded border px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
        disabled={isUpdating}
      />
      <div className='flex gap-1'>
        <button
          type='submit'
          disabled={!name.trim() || name.trim() === currentName || isUpdating}
          className='h-6 rounded bg-blue-600 px-2 text-xs text-white hover:bg-blue-700 disabled:opacity-50'
        >
          {isUpdating ? '저장 중...' : '저장'}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          disabled={isUpdating}
          className='h-6 rounded border px-2 text-xs hover:bg-gray-100 disabled:opacity-50'
        >
          취소
        </button>
      </div>
    </form>
  );
}
