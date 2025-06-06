import { v7 as uuidv7 } from 'uuid';

export function generateUUID(): string {
  return uuidv7();
}

export function generateShortId(): string {
  return generateUUID().replace(/-/g, '').slice(0, 8);
}
