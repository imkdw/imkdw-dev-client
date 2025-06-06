'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { MemberRole } from '@imkdw-dev-client/consts';
import { useAuthStatus } from '../../hooks/use-auth-status';
import { useKeyboardShortcuts } from '../../hooks/use-keyboard-shortcuts';
import { useMemoEditor } from '../../hooks/use-memo-editor';
import { MilkdownEditorWrapper } from '../editor/markdown';

interface Props {
  memo: MemoDetail;
}

export function MemoEditor({ memo }: Props) {
  const { member, isAuthReady } = useAuthStatus();

  const isEditable = isAuthReady && member?.role === MemberRole.ADMIN;

  const { content, saveMemo, handleContentChange, handleImageUpload } = useMemoEditor({ memo });

  useKeyboardShortcuts({ onSave: saveMemo });

  if (!isAuthReady) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-gray-400'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='h-full'>
      <MilkdownEditorWrapper
        content={content}
        isEditable={isEditable}
        onChangeContent={handleContentChange}
        onUploadImage={handleImageUpload}
      />
    </div>
  );
}
