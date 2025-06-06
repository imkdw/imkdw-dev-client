'use client';

import { SIDEBAR_ITEM_ID } from '../../../../constants/sidebar';
import { MemoFolderList } from './memo-folder-list';

interface Props {
  activeItemId: number | null;
}

export function SidebarContent({ activeItemId }: Props) {
  if (activeItemId !== SIDEBAR_ITEM_ID.MEMO_FOLDERS) {
    return null;
  }

  return <MemoFolderList activeItemId={activeItemId} />;
}
