'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { MemberRole, S_KEY } from '@imkdw-dev-client/consts';
import { useActionState, useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { updateMemoAction } from '../../actions/memo/update-memo.action';
import { useAuthStore } from '../../stores/auth-store';
import { MilkdownEditorWrapper } from '../editor/new-editor';

interface Props {
  memo: MemoDetail;
}

export function MemoEditor({ memo }: Props) {
  const { folderId, name, content: memoContent, slug } = memo;

  const [content, setContent] = useState(memoContent);
  const [_htmlContent, setHtmlContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [_state, formAction, _isPendingFromActionState] = useActionState(updateMemoAction, { success: false });
  const [_isPending, startTransition] = useTransition();

  const { member } = useAuthStore();
  const isEditable = member?.role === MemberRole.ADMIN;

  const contentRef = useRef(content);
  const htmlContentRef = useRef(_htmlContent);

  useEffect(() => {
    contentRef.current = content;
    htmlContentRef.current = _htmlContent;
  }, [content, _htmlContent]);

  const handleSaveMemo = useCallback(() => {
    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('folderId', folderId);
    formData.append('name', name);
    formData.append('content', contentRef.current);
    formData.append('contentHtml', htmlContentRef.current);

    if (imageUrls.length > 0) {
      imageUrls.forEach((imageUrl) => {
        formData.append('imageUrls', imageUrl);
      });
    }

    startTransition(() => formAction(formData));
  }, [folderId, name, formAction, slug, imageUrls]);

  /**
   * 컨트롤 + S 누르면 메모 저장처리
   */
  useEffect(() => {
    const handleSave = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === S_KEY) {
        event.preventDefault();
        handleSaveMemo();
      }
    };

    window.addEventListener('keydown', handleSave);
    return () => window.removeEventListener('keydown', handleSave);
  }, [handleSaveMemo]);

  const handleChangeContent = (markdown: string, html: string) => {
    setContent(markdown);
    setHtmlContent(html);
  };

  const handleUploadImage = (imageUrl: string) => {
    setImageUrls((prev) => [...prev, imageUrl]);
  };

  return (
    <MilkdownEditorWrapper
    // content={content}
    // isEditable={isEditable}
    // onChangeContent={handleChangeContent}
    // onUploadImage={handleUploadImage}
    />
  );
}
