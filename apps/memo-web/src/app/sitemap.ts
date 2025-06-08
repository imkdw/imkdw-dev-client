import { getMemos } from '@imkdw-dev-client/api-client';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const memos = await getMemos();

  return memos.map((memo) => ({
    url: `https://memo.imkdw.dev/ko/memos/${memo.slug}`,
    lastModified: new Date(),
  }));
}
