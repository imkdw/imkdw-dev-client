export function removeMarkdownTags(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/[[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractFirstImage(text: string): string | null {
  const imageMatch = text.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  return imageMatch?.[2] ?? null;
}

export function summarizeMarkdown(text: string, maxLength = 150): string {
  const cleanText = removeMarkdownTags(text);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  const truncated = cleanText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    return `${truncated.slice(0, lastSpaceIndex)}...`;
  }

  return `${truncated}...`;
}
