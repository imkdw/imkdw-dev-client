import { codeBlock } from '@blocknote/code-block';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';

interface Props {
  content: string;
  onChangeContent(content: string): void;
}

export function MarkdownEditor({ content }: Props) {
  const editor = useCreateBlockNote({
    codeBlock,
    initialContent: [{ content }],
  });

  return <BlockNoteView editor={editor} />;
}
