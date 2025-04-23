import { HeaderTopButton } from './header-top-button';
import { HeaderLinks } from './header-links';

export function Header() {
  return (
    <header className='flex w-full gap-10'>
      <HeaderTopButton />
      <HeaderLinks />
    </header>
  );
}
