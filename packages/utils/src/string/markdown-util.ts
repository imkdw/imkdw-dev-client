/**
 * 마크다운 태그를 제거하여 순수 텍스트를 반환합니다
 *
 * @param text - 마크다운 텍스트
 * @returns 마크다운 태그가 제거된 텍스트
 *
 * @example
 * ```ts
 * removeMarkdownTags('# 제목\n**굵은글씨** 내용') // '제목 굵은글씨 내용'
 * removeMarkdownTags('`코드` [링크](url)') // '코드 링크'
 * ```
 */
export function removeMarkdownTags(text: string): string {
  return (
    text
      // 헤더 제거 (# ## ###)
      .replace(/^#{1,6}\s+/gm, '')
      // 굵은글씨, 기울임꼴 제거 (**bold**, *italic*, __bold__, _italic_)
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
      // 코드 블록 제거 (```)
      .replace(/```[\s\S]*?```/g, '')
      // 인라인 코드 제거 (`)
      .replace(/`([^`]+)`/g, '$1')
      // 링크 제거 ([text](url))
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // 이미지 제거 (![alt](url))
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // 취소선 제거 (~~text~~)
      .replace(/~~([^~]+)~~/g, '$1')
      // 기타 특수문자 제거
      .replace(/[[\]()]/g, '')
      // 줄바꿈을 공백으로 변환
      .replace(/\n+/g, ' ')
      // 중복 공백 제거
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * 마크다운 텍스트에서 첫 번째 이미지 URL을 추출합니다
 *
 * @param text - 마크다운 텍스트
 * @returns 첫 번째 이미지 URL 또는 null
 *
 * @example
 * ```ts
 * extractFirstImage('![image](https://example.com/image.jpg) text') // 'https://example.com/image.jpg'
 * extractFirstImage('no image here') // null
 * ```
 */
export function extractFirstImage(text: string): string | null {
  const imageMatch = text.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  return imageMatch?.[2] ?? null;
}

/**
 * 마크다운 텍스트를 지정된 길이로 요약합니다
 *
 * @param text - 마크다운 텍스트
 * @param maxLength - 최대 길이 (기본값: 150)
 * @returns 요약된 텍스트
 *
 * @example
 * ```ts
 * summarizeMarkdown('# 긴 제목\n\n많은 내용들...', 50) // '긴 제목 많은 내용들...'
 * ```
 */
export function summarizeMarkdown(text: string, maxLength = 150): string {
  const cleanText = removeMarkdownTags(text);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // 단어 경계에서 자르기
  const truncated = cleanText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    return `${truncated.slice(0, lastSpaceIndex)}...`;
  }

  return `${truncated}...`;
}
