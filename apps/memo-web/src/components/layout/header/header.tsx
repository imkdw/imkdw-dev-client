import { HeaderSearchBar } from './header-search-bar';
import { HeaderLinks } from './header-links';

export function Header() {
  return (
    <header className="flex w-full gap-10">
      <HeaderSearchBar />
      <HeaderLinks />
    </header>
  );
}
