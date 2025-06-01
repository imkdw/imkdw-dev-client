import { Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import '@imkdw-dev-client/ui/editor.css';
import React from 'react';

const MilkdownEditor: React.FC = () => {
  useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => ctx.set(rootCtx, root))
      .config((ctx) =>
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            class: 'milkdown-editor vscode-scrollbar',
          },
        })),
      )
      .use(commonmark),
  );

  return <Milkdown />;
};

export function MilkdownEditorWrapper() {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
}
