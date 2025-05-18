'use client';

import { ResponseGetMemo } from '@imkdw-dev-client/api-client';
import { useActionState, useCallback, useEffect, useState, useRef, useTransition } from 'react';
import { MarkdownEditor } from '../editor/editor';
import { S_KEY } from '@imkdw-dev-client/consts';
import { updateMemoAction } from '../../actions/memo/update-memo.action';

interface Props {
  memo: ResponseGetMemo;
}

export function MemoEditor({ memo }: Props) {
  const { folderId, name, content: memoContent, slug } = memo;

  const [content, setContent] = useState(memoContent);
  const [imageNames, setImageNames] = useState<string[]>([]);
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

    if (imageNames.length > 0) {
      imageNames.forEach((imageName) => {
        formData.append('imageNames', imageName);
      });
    }

    startTransition(() => formAction(formData));
  }, [folderId, name, formAction, slug, imageNames]);

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

  const handleUploadImage = (imageName: string) => {
    setImageNames((prev) => [...prev, imageName]);
  };

  return <MarkdownEditor content={content} onChangeContent={handleChangeContent} onUploadImage={handleUploadImage} />;
}
