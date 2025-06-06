import { HeaderLinks } from '@/src/components/layout/header/header-links';
import { HeaderSearchBar } from '@/src/components/layout/header/header-search-bar';
import { TrafficLightButton } from '@/src/components/layout/header/traffic-light-button';

export function Header() {
  return (
    <header className='w-full bg-[#323233] flex items-center justify-between px-2 py-1.5'>
      <TrafficLightButton />
      <HeaderSearchBar />
      <HeaderLinks />
    </header>
  );
}
