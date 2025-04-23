import { useTranslations } from 'next-intl';
import { Messages, MessageKey } from '../messages';

export function useSafeTranslations(namespace: keyof Messages) {
  const t = useTranslations(namespace);
  return function (
    key: Extract<MessageKey, `${typeof namespace}.${string}`>,
    options?: { [key: string]: string | number },
  ) {
    return t(key.split(`${namespace}.`)[1], options);
  };
}
