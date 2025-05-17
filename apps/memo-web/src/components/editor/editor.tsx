import { codeBlock } from '@blocknote/code-block';
import { BlockNoteView, Theme, lightDefaultTheme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { useEffect } from 'react';
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

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    onChangeContent(markdown);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: https://www.blocknotejs.org/docs/editor-api/converting-blocks
  useEffect(() => {
    onChange();
  }, []);

  const editor = useCreateBlockNote({
    codeBlock,
    pasteHandler: ({ defaultPasteHandler, editor, event }) => {
      const eventType = event.clipboardData?.types;

      if (eventType?.includes('Files') || eventType?.includes('image/png') || eventType?.includes('image/jpeg')) {
        const file = event.clipboardData?.files?.[0];

        if (file?.type?.startsWith('image/')) {
          // 파일을 읽어 Base64로 변환
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

      return defaultPasteHandler();
    },
    initialContent: [
      {
        type: 'heading',
        content: 'Heading 1',
        props: { level: 1 },
      },
      {
        type: 'heading',
        content: 'Heading 2',
        props: { level: 2 },
      },
      {
        type: 'heading',
        content: 'Heading 3',
        props: { level: 3 },
      },
      {
        type: 'paragraph',
        content: "You'll see that the text is now blue",
      },
      {
        type: 'paragraph',
        content: "Press the '/' key - the hovered Slash Menu items are also blue",
      },
      {
        type: 'paragraph',
        content,
      },
    ],
  });

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
