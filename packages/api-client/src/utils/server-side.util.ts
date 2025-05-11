'use server';

import { cookies } from 'next/headers';
import { isServerSide } from './api-client.util';

export async function getServerSideCookies(): Promise<string> {
  if (!isServerSide()) {
    return '';
  }

  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
}
