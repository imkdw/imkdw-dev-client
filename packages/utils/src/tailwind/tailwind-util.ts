import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스명을 병합하는 유틸리티 함수
 *
 * clsx로 조건부 클래스를 처리하고, tailwind-merge로 중복된 Tailwind 클래스를 병합합니다.
 *
 * @param inputs - 병합할 클래스명들 (문자열, 객체, 배열 등)
 * @returns 병합된 클래스명 문자열
 *
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-2는 px-4로 덮어씀)
 * cn('text-red-500', { 'text-blue-500': true }) // 'text-blue-500'
 * cn('bg-white', undefined, 'border') // 'bg-white border'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * @deprecated cn 함수를 사용하세요
 */
export const classNames = cn;
