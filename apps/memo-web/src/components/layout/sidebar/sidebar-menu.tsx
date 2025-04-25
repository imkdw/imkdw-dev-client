'use client';

import { useState } from 'react';
import { Pin, ChevronRight, File, Folder } from 'lucide-react';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarMenu {
  name: string;
  icon: ReactNode;
  type: 'folder' | 'docs';
  children: SidebarMenu[];
}

interface MenuItemProps {
  menu: SidebarMenu;
  depth?: number;
}

function MenuItem({ menu, depth = 0 }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (menu.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleToggle}
        className={`
          w-full flex items-center gap-2 p-2 text-sm text-gray-600
          hover:bg-gray-100 rounded-md
        `}
        style={{ paddingLeft: depth > 0 ? `${depth * 16}px` : undefined }}
      >
        {/* Menu Icon */}
        {menu.icon}

        {/* Menu Name */}
        <div>{menu.name}</div>

        {/* Menu Collapse Icon */}
        {menu.type === 'folder' && menu.children.length > 0 && (
          <motion.div className="ml-auto" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        )}
      </button>

      {/* Menu Children */}
      <AnimatePresence>
        {isOpen && menu.children.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {menu.children.map((childMenu) => (
              <MenuItem key={childMenu.name} menu={childMenu} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export function SidebarMenu() {
  const generateRandomChildren = (depth = 0, maxDepth = 3): SidebarMenu[] => {
    if (depth >= maxDepth) {
      return [];
    }

    const childrenCount = 5;
    const children: SidebarMenu[] = [];

    for (let i = 0; i < childrenCount; i++) {
      const isFolder = Math.random() < 0.3;

      children.push({
        name: isFolder
          ? `Folder ${Math.random().toString(36).substring(7)}`
          : `Document ${Math.random().toString(36).substring(7)}`,
        icon: isFolder ? <Folder size={22} /> : <File size={22} />,
        type: isFolder ? 'folder' : 'docs',
        children: isFolder ? generateRandomChildren(depth + 1, maxDepth) : [],
      });
    }

    return children;
  };

  const menus = Array.from(
    { length: 20 },
    (_, index): SidebarMenu => ({
      name: `Folder ${index + 1}`,
      icon: <Folder size={22} />,
      type: 'folder',
      children: generateRandomChildren(),
    }),
  );

  return (
    <section>
      <ul>
        {menus.map((menu) => (
          <MenuItem key={menu.name} menu={menu} />
        ))}
      </ul>
    </section>
  );
}
