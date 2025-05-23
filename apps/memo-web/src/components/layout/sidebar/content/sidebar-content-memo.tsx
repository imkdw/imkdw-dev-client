'use client';

import { usePathname } from '@imkdw-dev-client/i18n';
import { useState } from 'react';
import { updateMemoName } from '@imkdw-dev-client/api-client';
import { MemoContextMenu } from '@/src/components/layout/sidebar/content/memo/memo-context-menu';
import { MemoItem } from '@/src/components/layout/sidebar/content/memo/memo-item';
import { MemoRenameForm } from '@/src/components/layout/sidebar/content/memo/memo-rename-form';

interface Props {
  level: number;
  memoName: string;
  slug: string;
}

export function SidebarContentMemo({ level = 0, memoName, slug }: Props) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const isSelected = currentSlug === slug;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(memoName);

  const handleRename = () => {
    setNewName(memoName);
    setIsRenaming(true);
  };

  const handleSave = async () => {
    if (newName.trim() !== '') {
      await updateMemoName(slug, { name: newName.trim() });
    }

    setIsRenaming(false);
  };

  const handleCancel = () => {
    setIsRenaming(false);
    setNewName(memoName);
  };

  const handleDelete = () => {
    // TODO: 삭제 로직 구현
    // 메모 삭제 로직은 추후 구현
  };

  return (
    <MemoContextMenu onRename={handleRename} onDelete={handleDelete}>
      <li>
        {isRenaming ? (
          <MemoRenameForm
            level={level}
            newName={newName}
            setNewName={setNewName}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <MemoItem level={level} memoName={memoName} slug={slug} isSelected={isSelected} />
        )}
      </li>
    </MemoContextMenu>
  );
}
