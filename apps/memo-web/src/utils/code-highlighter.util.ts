import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';

/**
 * HTML 문자열에서 코드 블록을 찾아 하이라이팅을 적용합니다
 */
export function highlightCodeBlocks(contentHtml: string): string {
  const dom = new JSDOM(contentHtml);
  const { document } = dom.window;

  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((block: Element) => {
    if (!block.textContent) return;

    const language = extractLanguageFromCodeBlock(block);
    const highlightedCode = highlightCode(block.textContent, language);

    block.innerHTML = highlightedCode;
  });

  return document.body.innerHTML;
}

/**
 * 코드 블록에서 언어 정보를 추출합니다
 */
function extractLanguageFromCodeBlock(block: Element): string | undefined {
  const preElement = block.parentElement;

  // data-language 속성에서 언어 정보 확인
  if (preElement?.hasAttribute('data-language')) {
    return preElement.getAttribute('data-language') || undefined;
  }

  // class 속성에서 language- 접두사로 언어 정보 확인
  const languageClass = block.className.split(' ').find((cls: string) => cls.startsWith('language-'));

  return languageClass ? languageClass.replace('language-', '') : undefined;
}

/**
 * 주어진 코드와 언어로 하이라이팅을 적용합니다
 */
function highlightCode(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  }

  return hljs.highlightAuto(code).value;
}
