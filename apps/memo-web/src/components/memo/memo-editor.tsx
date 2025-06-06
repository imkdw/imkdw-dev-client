'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { MemberRole } from '@imkdw-dev-client/consts';
import { showErrorToast, showSuccessToast } from '@imkdw-dev-client/utils';
import { useEffect, useRef } from 'react';
import { useKeyboardShortcuts } from '../../hooks/use-keyboard-shortcuts';
import { useMemoEditor } from '../../hooks/use-memo-editor';
import { useAuthStatus } from '../../hooks/use-auth-status';
import { MilkdownEditorWrapper } from '../editor/markdown';

interface Props {
  memo: MemoDetail;
}

export function MemoEditor({ memo }: Props) {
  const { member, isAuthReady } = useAuthStatus();

  const isEditable = isAuthReady && member?.role === MemberRole.ADMIN;

  const { content, saveMemo, handleContentChange, handleImageUpload, state } = useMemoEditor({ memo });

  const hasActionBeenTriggered = useRef(false);

  const handleSave = () => {
    hasActionBeenTriggered.current = true;
    saveMemo();
  };

  useKeyboardShortcuts({ onSave: handleSave });

  useEffect(() => {
    if (hasActionBeenTriggered.current) {
      if (state.success === true) {
        showSuccessToast('메모가 성공적으로 저장되었습니다.');
      } else if (state.success === false && state.errors) {
        const errorMessages = Object.values(state.errors).filter(Boolean).flat().join(', ');
        if (errorMessages) {
          showErrorToast(`저장 실패: ${errorMessages}`);
        }
      }

      hasActionBeenTriggered.current = false;
    }
  }, [state]);

  if (!isAuthReady) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-gray-400'>Loading...</div>
      </div>
    );
  }

  return (
    <MilkdownEditorWrapper
      content={content}
      isEditable={isEditable}
      onChangeContent={handleContentChange}
      onUploadImage={handleImageUpload}
    />
  );
}
