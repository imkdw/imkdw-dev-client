import { useTranslations } from 'next-intl';
import { MessageKey, Messages } from '../messages';

export function useSafeTranslations(namespace: keyof Messages) {
  const t = useTranslations(namespace);
  return (key: Extract<MessageKey, `${typeof namespace}.${string}`>, options?: { [key: string]: string | number }) =>
    t(key.split(`${namespace}.`)[1], options);
}
