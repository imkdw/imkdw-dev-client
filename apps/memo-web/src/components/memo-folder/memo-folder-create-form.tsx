import { PlusIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useMemoFolderCrud } from '../../hooks/folder/use-memo-folder-crud';

interface Props {
  parentId?: string;
  onSuccess: () => void;
  onCancel: () => void;
  initialEditing?: boolean;
}

export function MemoFolderCreateForm({ parentId, onSuccess, onCancel, initialEditing = false }: Props) {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(initialEditing);
  const { createFolder, isCreating } = useMemoFolderCrud();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    const result = await createFolder({
      name: name.trim(),
      parentId,
    });

    if (result) {
      setName('');
      setIsEditing(initialEditing);
      onSuccess();
    }
  };

  const handleCancel = () => {
    setName('');
    setIsEditing(initialEditing);
    onCancel();
  };

  if (!isEditing) {
    return (
      <button
        type='button'
        onClick={() => setIsEditing(true)}
        className='flex h-8 w-full items-center justify-start rounded px-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground'
      >
        <PlusIcon className='mr-2 h-4 w-4' />새 폴더
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='폴더명을 입력하세요'
        className='h-8 w-full rounded border px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
        disabled={isCreating}
      />
      <div className='flex gap-1'>
        <button
          type='submit'
          disabled={!name.trim() || isCreating}
          className='h-6 rounded bg-blue-600 px-2 text-xs text-white hover:bg-blue-700 disabled:opacity-50'
        >
          {isCreating ? '생성 중...' : '생성'}
        </button>
        <button
          type='button'
          onClick={handleCancel}
          disabled={isCreating}
          className='h-6 rounded border px-2 text-xs hover:bg-gray-100 disabled:opacity-50'
        >
          취소
        </button>
      </div>
    </form>
  );
}
