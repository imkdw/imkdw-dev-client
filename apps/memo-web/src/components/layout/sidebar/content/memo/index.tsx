'use client';

import { usePathname } from '@imkdw-dev-client/i18n';
import { useState } from 'react';
import { MemoItem, updateMemoName } from '@imkdw-dev-client/api-client';
import { MemoContextMenu } from './memo-context-menu';
import { MemoRenameForm } from './memo-rename-form';
import { MemoListItem } from './memo-list-item';

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

    try {
      await updateMemoName(slug, { name: newName.trim() });

      // 로컬 상태 업데이트
      const updatedMemo = { ...currentMemo, name: newName.trim() };
      setCurrentMemo(updatedMemo);

      // 부모 컴포넌트에 업데이트 알림
      onMemoUpdate?.(updatedMemo);

      setIsRenaming(false);
    } catch {
      // 에러 발생시 원래 이름으로 복원
      setNewName(currentMemo.name);
      // TODO: 에러 처리 로직 추가 (토스트 메시지 등)
    }
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
