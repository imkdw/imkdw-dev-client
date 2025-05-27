'use client';

import { MemoItem, getMemo, updateMemoName } from '@imkdw-dev-client/api-client';
import { usePathname } from '@imkdw-dev-client/i18n';
import { useState } from 'react';
import { MemoContextMenu } from './memo-context-menu';
import { MemoListItem } from './memo-list-item';
import { MemoRenameForm } from './memo-rename-form';

interface Props {
  level: number;
  memo: MemoItem;
  onMemoUpdate: (updatedMemo: MemoItem) => void;
}

export function SidebarContentMemo({ level = 0, memo, onMemoUpdate }: Props) {
  const { name, slug } = memo;

  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();
  const isSelected = currentSlug === slug;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const [currentMemo, setCurrentMemo] = useState(memo);

  const handleRename = () => {
    setNewName(currentMemo.name);
    setIsRenaming(true);
  };

  const handleSave = async () => {
    if (newName.trim() === '' || newName === currentMemo.name) {
      handleCancel();
      return;
    }

    await updateMemoName(slug, { name: newName });
    const updatedMemo = await getMemo(slug);

    setCurrentMemo(updatedMemo);
    onMemoUpdate(updatedMemo);
    setIsRenaming(false);
  };

  const handleCancel = () => {
    setIsRenaming(false);
    setNewName(currentMemo.name);
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
          <MemoListItem level={level} memo={currentMemo} isSelected={isSelected} />
        )}
      </li>
    </MemoContextMenu>
  );
}
