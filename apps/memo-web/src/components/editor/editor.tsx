import { codeBlock } from '@blocknote/code-block';
import { BlockNoteView, lightDefaultTheme, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { useEffect } from 'react';
import './editor.css';
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
  fontFamily: 'MaplestoryOTFBold',
} satisfies Theme;

export function MarkdownEditor({ content, onChangeContent }: Props) {
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

  return <BlockNoteView editor={editor} onChange={onChange} theme={theme} className='flex-1 bg-[#242424] pt-4' />;
}
