import { updateMemo, MemoDetail } from '@imkdw-dev-client/api-client';
import { showSuccessToast } from '@imkdw-dev-client/utils';
import { useCallback, useRef, useState } from 'react';

interface UseMemoEditorProps {
  memo: MemoDetail;
}

export function useMemoEditor({ memo }: UseMemoEditorProps) {
  const { folderId, name, content: initialContent, contentHtml: initialContentHtml, slug } = memo;

  const [content, setContent] = useState(initialContent);
  const [htmlContent, setHtmlContent] = useState(initialContentHtml || '');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const saveMemo = useCallback(async () => {
    setIsLoading(true);

    try {
      await updateMemo(slug, {
        folderId,
        name,
        content: contentRef.current,
        contentHtml: htmlContentRef.current,
        imageUrls,
      });

      showSuccessToast('메모가 성공적으로 저장되었습니다.');
    } catch {
      // API 클라이언트에서 자동으로 에러 토스트 표시
    } finally {
      setIsLoading(false);
    }
  }, [folderId, name, slug, imageUrls]);

  return {
    content,
    isLoading,
    saveMemo,
    handleContentChange,
    handleImageUpload,
  };
}
