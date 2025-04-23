import { SidebarAuth } from './sidebar-auth';
import { SidebarLogo } from './sidebar-logo';
import { SidebarMenu } from './sidebar-menu';

export function Sidebar() {
  return (
    <aside className='sticky top-[2rem] h-[calc(100vh-4rem)] min-w-[260px] overflow-y-scroll bg-white rounded-md shadow-primary p-4 flex flex-col gap-4'>
      <SidebarLogo />
      <SidebarAuth />
      <SidebarMenu />
    </aside>
  );
}
