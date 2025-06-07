'use client';

import { useAuthInitialization } from '../../hooks/auth/use-auth-initialization';

export function AuthInitializer() {
  useAuthInitialization();
  return null;
}
