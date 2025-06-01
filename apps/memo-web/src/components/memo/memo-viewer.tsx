import { MemoDetail } from '@imkdw-dev-client/api-client';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import '@imkdw-dev-client/ui/editor.css';
import { JSDOM } from 'jsdom';

interface Props {
  memo: MemoDetail;
}

function getHighlightedCode(contentHtml: string): string {
  const dom = new JSDOM(contentHtml);
  const { document } = dom.window;

  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((block: Element) => {
    if (block.textContent) {
      let language: string | undefined;

      const preElement = block.parentElement;
      if (preElement?.hasAttribute('data-language')) {
        language = preElement.getAttribute('data-language') || undefined;
      }

      if (!language) {
        const languageClass: string | undefined = block.className
          .split(' ')
          .find((cls: string) => cls.startsWith('language-'));
        language = languageClass ? languageClass.replace('language-', '') : undefined;
      }

      let highlightedCode: string;
      if (language && hljs.getLanguage(language)) {
        highlightedCode = hljs.highlight(block.textContent, { language, ignoreIllegals: true }).value;
      } else {
        highlightedCode = hljs.highlightAuto(block.textContent).value;
      }
      block.innerHTML = highlightedCode;
    }
  });

  return document.body.innerHTML;
}

export default async function MemoViewer({ memo }: Props) {
  const highlightedHtml = getHighlightedCode(memo.contentHtml);

  return (
    <div
      className='milkdown-editor'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: 메모 내용 렌더링을 위한 코드
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
