import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { Editor, defaultValueCtx, editorCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import '@imkdw-dev-client/ui/editor.css';
import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block';
import { listener } from '@milkdown/kit/plugin/listener';
import { listenerCtx } from '@milkdown/kit/plugin/listener';
import { getHTML } from '@milkdown/kit/utils';
import { basicSetup } from 'codemirror';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(markdown: string, html: string): void;
  onUploadImage(imageName: string): void;
}

export function MilkdownEditor({ content, isEditable, onChangeContent }: Props) {
  useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => ctx.set(defaultValueCtx, content))
      .config((ctx) => ctx.set(rootCtx, root))
      .config((ctx) =>
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            class: 'milkdown-editor vscode-scrollbar',
          },
          editable: () => isEditable,
        })),
      )
      .config((ctx) => {
        ctx.update(codeBlockConfig.key, (defaultConfig) => ({
          ...defaultConfig,
          languages,
          extensions: [basicSetup, oneDark, keymap.of(defaultKeymap)],
        }));
      })
      .config((ctx) => {
        const listenerManager = ctx.get(listenerCtx);
        listenerManager.markdownUpdated((innerCtx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            const editor = innerCtx.get(editorCtx);
            const html = editor.action(getHTML());
            onChangeContent(markdown, html);
          }
        });
      })
      .use(listener)
      .use(commonmark)
      .use(gfm)
      .use(codeBlockComponent),
  );

  return <Milkdown />;
}
