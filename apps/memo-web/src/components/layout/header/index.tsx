import { TrafficLightButton } from '@/src/components/layout/header/traffic-light-button';
import { SearchBar } from '@/src/components/layout/header/search-bar';
import { HeaderLinks } from '@/src/components/layout/header/header-links';

export function Header() {
  return (
    <header className="w-full bg-[#323233] flex items-center justify-between px-2 py-1.5">
      <TrafficLightButton />
      <SearchBar />
      <HeaderLinks />
    </header>
  );
}
