import { MemoDetail } from '@imkdw-dev-client/api-client';
import { useActionState, useCallback, useRef, useState, useTransition } from 'react';
import { updateMemoAction } from '../actions/memo/update-memo.action';

interface UseMemoEditorProps {
  memo: MemoDetail;
}

export function useMemoEditor({ memo }: UseMemoEditorProps) {
  const { folderId, name, content: initialContent, slug } = memo;

  const [content, setContent] = useState(initialContent);
  const [htmlContent, setHtmlContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [state, formAction, isPendingFromAction] = useActionState(updateMemoAction, { success: false });
  const [isPending, startTransition] = useTransition();

  const contentRef = useRef(content);
  const htmlContentRef = useRef(htmlContent);

  contentRef.current = content;
  htmlContentRef.current = htmlContent;

  const handleContentChange = useCallback((markdown: string, html: string) => {
    setContent(markdown);
    setHtmlContent(html);
  }, []);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setImageUrls((prev) => [...prev, imageUrl]);
  }, []);

  const saveMemo = useCallback(() => {
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

  return {
    content,
    isLoading: isPending || isPendingFromAction,
    state,
    saveMemo,
    handleContentChange,
    handleImageUpload,
  };
}
