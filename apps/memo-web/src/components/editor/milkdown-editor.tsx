import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { upload, uploadConfig, Uploader } from '@milkdown/kit/plugin/upload';
import { keymap } from '@codemirror/view';
import { Editor, defaultValueCtx, editorCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import '@imkdw-dev-client/ui/editor.css';
import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { imageBlockComponent } from '@milkdown/kit/component/image-block';
import { clipboard } from '@milkdown/kit/plugin/clipboard';
import { getHTML } from '@milkdown/kit/utils';
import { basicSetup } from 'codemirror';
import { useImageUpload } from '@imkdw-dev-client/hooks';
import { Node } from '@milkdown/kit/prose/model';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(markdown: string, html: string): void;
  onUploadImage(imageName: string): void;
}

export function MilkdownEditor({ content, isEditable, onChangeContent, onUploadImage }: Props) {
  const { uploadImage } = useImageUpload();

  const uploader: Uploader = async (files, schema) => {
    const images: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) {
        continue;
      }

      if (!file.type.includes('image')) {
        continue;
      }

      images.push(file);
    }

    const nodes: Node[] = await Promise.all(
      images.map(async (image) => {
        const src = await uploadImage(image);
        const alt = image.name;
        onUploadImage(src);
        return schema.nodes.image?.createAndFill({
          src,
          alt,
        }) as Node;
      }),
    );

    return nodes.filter((node) => node !== null);
  };

  useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => ctx.set(defaultValueCtx, content))
      .config((ctx) => ctx.set(rootCtx, root))
      .config((ctx) => {
        ctx.update(uploadConfig.key, (prev) => ({
          ...prev,
          uploader,
        }));
      })
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
      .use(imageBlockComponent)
      .use(gfm)
      .use(upload)
      .use(clipboard)
      .use(codeBlockComponent),
  );

  return <Milkdown />;
}
