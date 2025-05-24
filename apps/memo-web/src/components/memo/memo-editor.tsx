'use client';

import { MemoDetail } from '@imkdw-dev-client/api-client';
import { useActionState, useCallback, useEffect, useState, useRef, useTransition } from 'react';
import { MarkdownEditor } from '../editor/editor';
import { S_KEY } from '@imkdw-dev-client/consts';
import { updateMemoAction } from '../../actions/memo/update-memo.action';

interface Props {
  memo: MemoDetail;
}

export function MemoEditor({ memo }: Props) {
  const { folderId, name, content: memoContent, slug } = memo;

  const [content, setContent] = useState(memoContent);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [_state, formAction, _isPendingFromActionState] = useActionState(updateMemoAction, { success: false });
  const [_isPending, startTransition] = useTransition();

  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  const handleSaveMemo = useCallback(() => {
    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('folderId', folderId);
    formData.append('name', name);
    formData.append('content', contentRef.current);

    if (imageUrls.length > 0) {
      imageUrls.forEach((imageUrl) => {
        formData.append('imageUrls', imageUrl);
      });
    }

    startTransition(() => formAction(formData));
  }, [folderId, name, formAction, slug, imageUrls]);

  /**
   * 컨트롤 S 누르면 메모 저장처리
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

  const handleChangeContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleUploadImage = (imageUrl: string) => {
    setImageUrls((prev) => [...prev, imageUrl]);
  };

  return <MarkdownEditor content={content} onChangeContent={handleChangeContent} onUploadImage={handleUploadImage} />;
}
