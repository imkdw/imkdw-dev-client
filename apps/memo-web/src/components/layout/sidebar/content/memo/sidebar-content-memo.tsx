'use client';

import { MemoItem, deleteMemo, updateMemoName } from '@imkdw-dev-client/api-client';
import { usePathname } from '@imkdw-dev-client/i18n';
import { showSuccessToast } from '@imkdw-dev-client/utils';
import { useState } from 'react';
import { MemoContextMenu } from './memo-context-menu';
import { MemoListItem } from './memo-list-item';
import { MemoRenameForm } from './memo-rename-form';

interface Props {
  level: number;
  memo: MemoItem;
  onMemoUpdate: (updatedMemo: MemoItem) => void;
  onMemoDelete: (slug: string) => void;
}

export function SidebarContentMemo({ level = 0, memo, onMemoUpdate, onMemoDelete }: Props) {
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

    try {
      const updatedMemo = await updateMemoName(slug, { name: newName });

      setCurrentMemo(updatedMemo);
      onMemoUpdate(updatedMemo);
      setIsRenaming(false);
      showSuccessToast('메모 이름이 변경되었습니다.');
    } catch {
      setNewName(currentMemo.name);
    }
  };

  const handleCancel = () => {
    setIsRenaming(false);
    setNewName(currentMemo.name);
  };

  const handleDelete = async () => {
    try {
      await deleteMemo(slug);
      onMemoDelete(slug);
      showSuccessToast('메모가 삭제되었습니다.');
    } catch {}
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
