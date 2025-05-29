import { MemoDetail } from '@imkdw-dev-client/api-client';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import '@imkdw-dev-client/ui/editor.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
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
      const languageClass: string | undefined = block.className
        .split(' ')
        .find((cls: string) => cls.startsWith('language-'));
      const language = languageClass ? languageClass.replace('language-', '') : undefined;

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
    <div className='bn-container'>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: 정적 렌더링을 위한 코드 */}
      <div className='memo-viewer bn-default-styles px-4 py-2' dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    </div>
  );
}
