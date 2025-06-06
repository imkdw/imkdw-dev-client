'use client';

import { MemoItem } from '@imkdw-dev-client/api-client';
import { usePathname } from '@imkdw-dev-client/i18n';
import { useState } from 'react';
import { useMemoCrud } from '../../../../../hooks/use-memo-crud';
import { MemoContextMenu } from './memo-context-menu';
import { MemoListItem } from './memo-list-item';
import { MemoRenameForm } from './memo-rename-form';

interface Props {
  level: number;
  memo: MemoItem;
}

export function SidebarContentMemo({ level = 0, memo }: Props) {
  const { name, slug } = memo;

  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const isSelected = currentSlug === slug;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const { updateMemo, removeMemo } = useMemoCrud();

  const handleRename = () => {
    setNewName(memo.name);
    setIsRenaming(true);
  };

  const handleSave = async () => {
    if (newName.trim() === '' || newName === memo.name) {
      handleCancel();
      return;
    }

    const result = await updateMemo(slug, { name: newName });
    if (result) {
      setIsRenaming(false);
    }
  };

  const handleCancel = () => {
    setIsRenaming(false);
    setNewName(memo.name);
  };

  const handleDelete = async () => {
    await removeMemo(slug);
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
          <MemoListItem level={level} memo={memo} isSelected={isSelected} />
        )}
      </li>
    </MemoContextMenu>
  );
}
