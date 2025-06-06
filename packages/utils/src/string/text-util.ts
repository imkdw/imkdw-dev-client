export function getByteLength(text: string): number {
  return new Blob([text]).size;
}

export function truncateByBytes(text: string, maxBytes: number): string {
  const encoder = new TextEncoder();

  let truncated = text;
  while (encoder.encode(truncated).length > maxBytes && truncated.length > 0) {
    truncated = truncated.slice(0, -1);
  }

  return truncated;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toCamelCase(text: string): string {
  return text
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
