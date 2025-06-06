import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

/**
 * UUID v7을 생성합니다 (시간 기반, 정렬 가능)
 *
 * UUID v7은 타임스탬프 기반으로 생성되어 시간순으로 정렬이 가능하며,
 * 데이터베이스 인덱스 성능에 유리합니다.
 *
 * @returns UUID v7 문자열
 *
 * @example
 * ```ts
 * const id = generateUUID(); // '018f-4f4c-7b2a-8c3d-9e5f6a7b8c9d'
 * ```
 */
export function generateUUID(): string {
  return uuidv7();
}

/**
 * UUID v4를 생성합니다 (완전 랜덤)
 *
 * UUID v4는 완전히 랜덤하게 생성되어 예측이 불가능하며,
 * 보안이 중요한 경우에 사용합니다.
 *
 * @returns UUID v4 문자열
 *
 * @example
 * ```ts
 * const id = generateRandomUUID(); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 * ```
 */
export function generateRandomUUID(): string {
  return uuidv4();
}

/**
 * 짧은 ID를 생성합니다 (8자리)
 *
 * URL이나 사용자에게 보여지는 ID가 필요한 경우 사용합니다.
 * 중복 가능성이 있으므로 유니크해야 하는 경우 generateUUID를 사용하세요.
 *
 * @returns 8자리 문자열
 *
 * @example
 * ```ts
 * const shortId = generateShortId(); // 'a3b4c5d6'
 * ```
 */
export function generateShortId(): string {
  return generateUUID().replace(/-/g, '').slice(0, 8);
}
