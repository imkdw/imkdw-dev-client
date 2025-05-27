import { Metadata } from 'next';

const SEO_CONFIG = {
  siteName: 'IMKDW Dev',
  siteUrl: 'https://imkdw-dev.com',
  defaultImage: '/images/imkdw-dev.webp',
  author: { name: 'IMKDW' },
  defaultKeywords: ['developer', 'memo', 'IMKDW', 'programming'],
  robots: {
    index: true,
    follow: true,
  },
} as const;

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  section?: string;
  noIndex?: boolean;
}

function generateSEOMetadata({
  title,
  description,
  path,
  keywords = [],
  image = SEO_CONFIG.defaultImage,
  type = 'website',
  section,
  noIndex = false,
  locale,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = title.includes(SEO_CONFIG.siteName) ? title : `${title} | ${SEO_CONFIG.siteName}`;
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const allKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [SEO_CONFIG.author],
    creator: SEO_CONFIG.author.name,
    publisher: SEO_CONFIG.siteName,
    robots: noIndex ? { index: false, follow: false } : SEO_CONFIG.robots,
    openGraph: {
      title,
      description,
      locale: locale === 'en' ? 'en_US' : 'ko_KR',
      images: [
        {
          url: image,
          alt: `${title} - ${SEO_CONFIG.siteName}`,
        },
      ],
      url,
      type,
      siteName: SEO_CONFIG.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:author': SEO_CONFIG.author.name,
      ...(section && { 'article:section': section }),
    },
  };
}

export function generateMemoSEOMetadata({
  title,
  content,
  slug,
  locale,
}: {
  title: string;
  content: string;
  slug: string;
  locale: string;
}): Metadata {
  return generateSEOMetadata({
    title,
    description: content,
    path: `/memo/${slug}`,
    keywords: [title],
    type: 'article',
    section: '개발 메모',
    locale,
  });
}

export function generateHomeSEOMetadata({ locale }: { locale: string }): Metadata {
  return generateSEOMetadata({
    title: 'IMKDW Dev',
    description: 'IMKDW Dev | Memo, About IT Knowledge',
    path: '/',
    keywords: ['IMKDW', 'developer', 'memo', 'programming', 'knowledge'],
    type: 'website',
    locale,
  });
}
