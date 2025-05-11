import { getAuthorizationUrl } from '@imkdw-dev-client/api-client';
import { useCallback } from 'react';
import { OAuthProvider } from '../types';

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
