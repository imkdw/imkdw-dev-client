import { codeBlock } from '@blocknote/code-block';
import { BlockNoteView, Theme, lightDefaultTheme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { useEffect, useCallback, useRef } from 'react';
import './editor.css';
import { MemberRole } from '@imkdw-dev-client/consts';
import { useAuthStore } from '../../stores/auth-store';
import { useImageUpload } from '@imkdw-dev-client/hooks';

interface Props {
  content: string;
  onChangeContent(content: string): void;
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

export function MarkdownEditor({ content, onChangeContent }: Props) {
  const { member } = useAuthStore();
  const { uploadImage } = useImageUpload();
  const isAdmin = member?.role === MemberRole.ADMIN;
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

  const onChange = useCallback(async () => {
    if (editor) {
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      onChangeContent(markdown);
    }
  }, [editor, onChangeContent]);

  useEffect(() => {
    onChange();
  }, [onChange]);

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
      editable={isAdmin}
    />
  );
}
