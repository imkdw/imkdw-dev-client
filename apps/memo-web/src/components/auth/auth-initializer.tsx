'use client';

import { useAuthInitialization } from '../../hooks/use-auth-initialization';

export function AuthInitializer() {
  useAuthInitialization();
  return null;
}
