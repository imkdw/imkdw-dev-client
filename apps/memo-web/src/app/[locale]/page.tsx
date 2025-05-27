import { generateHomeSEOMetadata } from '../../utils/seo.util';

interface Props {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateHomeSEOMetadata({ locale });
}

export default function HomePage() {
  return <div className='w-full h-full bg-[#242424]' />;
}
