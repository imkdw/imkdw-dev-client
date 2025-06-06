export function removeMarkdownTags(text: string) {
  return text
    .replace(/[#*`_~\[\]()]/g, '')
    .replace(/\n/g, ' ')
    .trim();
}
