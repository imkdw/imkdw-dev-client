import { codeBlock } from '@blocknote/code-block';
import { BlockNoteView, Theme, lightDefaultTheme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@imkdw-dev-client/ui/editor.css';
import { useImageUpload } from '@imkdw-dev-client/hooks';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(markdown: string, html: string): void;
  onUploadImage(imageName: string): void;
}

const theme = {
  colors: {
    editor: {
      text: '#fff',
      background: '#242424',
    },
    menu: {
      text: '#000',
      background: '#fff',
    },
    sideMenu: '#bababa',
    highlights: lightDefaultTheme.colors.highlights,
  },
  borderRadius: 0,
} satisfies Theme;

export function MarkdownEditor({ content, isEditable, onChangeContent, onUploadImage }: Props) {
  const { uploadImage } = useImageUpload();
  const initialContentRef = useRef(content);

  const editor = useCreateBlockNote({
    codeBlock,
    pasteHandler: ({ defaultPasteHandler, editor, event }) => {
      const eventType = event.clipboardData?.types;

      /**
       * 이미지 업로드 처리
       */
      if (eventType?.includes('Files') || eventType?.includes('image/png') || eventType?.includes('image/jpeg')) {
        const file = event.clipboardData?.files?.[0];

        if (file?.type?.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const imageUrl = await uploadImage(file);
              const markdownImage = `![${file.name}](${imageUrl})`;
              editor.pasteMarkdown(markdownImage);
              onUploadImage(imageUrl);
            } catch (error) {
              editor.pasteMarkdown(`이미지 업로드 실패, 사유 : ${error}`);
            }
          };

          reader.readAsDataURL(file);
          return true;
        }
      }

      /**
       * 기타 텍스트 및 마크다운 붙여넣기 처리
       */
      if (event.clipboardData?.types.includes('text/plain')) {
        const markdown = event.clipboardData.getData('text/plain');
        editor.pasteMarkdown(markdown);
        return true;
      }

      return defaultPasteHandler();
    },
  });

  /**
   * 메모 내부 컨텐츠 변경시 블록 -> 마크다운/HTML 변환 및 상태 변경처리
   */
  const onChange = useCallback(async () => {
    if (editor) {
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      const html = await editor.blocksToFullHTML(editor.document);
      onChangeContent(markdown, html);
    }
  }, [editor, onChangeContent]);

  useEffect(() => {
    onChange();
  }, [onChange]);

  /**
   * 메모 수정 진입시 초기 컨텐츠 마크다운 -> 블록 파싱하여 설정처리
   */
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(initialContentRef.current);
      editor.replaceBlocks(editor.document, blocks);
    }

    loadInitialHTML();
  }, [editor]);

  return (
    <BlockNoteView
      editor={editor}
      onChange={onChange}
      theme={theme}
      className='flex-1 bg-[#242424] pt-4 h-full overflow-scroll vscode-scrollbar'
      editable={isEditable}
    />
  );
}
