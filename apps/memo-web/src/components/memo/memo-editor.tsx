'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { MemberRole } from '@imkdw-dev-client/consts';
import { useMemoEditor } from '../../hooks/use-memo-editor';
import { useKeyboardShortcuts } from '../../hooks/use-keyboard-shortcuts';
import { useAuthStore } from '../../stores/auth-store';
import { MilkdownEditorWrapper } from '../editor/markdown';

interface Props {
  memo: MemoDetail;
}

export function MemoEditor({ memo }: Props) {
  const { member } = useAuthStore();
  const isEditable = member?.role === MemberRole.ADMIN;

  const { content, saveMemo, handleContentChange, handleImageUpload } = useMemoEditor({ memo });

  useKeyboardShortcuts({ onSave: saveMemo });

  return (
    <MilkdownEditorWrapper
      content={content}
      isEditable={isEditable}
      onChangeContent={handleContentChange}
      onUploadImage={handleImageUpload}
    />
  );
}
