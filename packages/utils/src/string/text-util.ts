/**
 * 문자열의 바이트 길이를 계산합니다 (한글은 2바이트)
 *
 * @param text - 계산할 텍스트
 * @returns 바이트 길이
 *
 * @example
 * ```ts
 * getByteLength('hello') // 5
 * getByteLength('안녕하세요') // 10
 * ```
 */
export function getByteLength(text: string): number {
  return new Blob([text]).size;
}

/**
 * 텍스트를 바이트 단위로 자릅니다
 *
 * @param text - 자를 텍스트
 * @param maxBytes - 최대 바이트 수
 * @returns 잘린 텍스트
 *
 * @example
 * ```ts
 * truncateByBytes('안녕하세요', 6) // '안녕하'
 * ```
 */
export function truncateByBytes(text: string, maxBytes: number): string {
  const encoder = new TextEncoder();

  let truncated = text;
  while (encoder.encode(truncated).length > maxBytes && truncated.length > 0) {
    truncated = truncated.slice(0, -1);
  }

  return truncated;
}

/**
 * 이메일 주소 형식인지 검증합니다
 *
 * @param email - 검증할 이메일 주소
 * @returns 유효한 이메일 주소인지 여부
 *
 * @example
 * ```ts
 * isValidEmail('test@example.com') // true
 * isValidEmail('invalid-email') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 텍스트를 케밥 케이스로 변환합니다
 *
 * @param text - 변환할 텍스트
 * @returns 케밥 케이스로 변환된 텍스트
 *
 * @example
 * ```ts
 * toKebabCase('Hello World') // 'hello-world'
 * toKebabCase('camelCase') // 'camel-case'
 * ```
 */
export function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 텍스트를 카멜 케이스로 변환합니다
 *
 * @param text - 변환할 텍스트
 * @returns 카멜 케이스로 변환된 텍스트
 *
 * @example
 * ```ts
 * toCamelCase('hello-world') // 'helloWorld'
 * toCamelCase('hello_world') // 'helloWorld'
 * ```
 */
export function toCamelCase(text: string): string {
  return text
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
