import { useCallback } from 'react';
import { OAuthProvider } from '../types';
import { getAuthorizationUrl } from '@imkdw-dev-client/api-client';

interface Params {
  provider: OAuthProvider;
}

export const useOAuth = ({ provider }: Params) => {
  const login = useCallback(async () => {
    const currentUrl = new URL(window.location.href);
    const { url } = await getAuthorizationUrl(provider, currentUrl.toString());
    window.location.href = url;
  }, [provider]);

  return { login };
};
