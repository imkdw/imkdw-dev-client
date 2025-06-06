// 사이드바 네비게이션 아이템 ID
export const SIDEBAR_ITEM_ID = {
  MEMO_FOLDERS: 1,
} as const;

// 사이드바 기본 설정
export const SIDEBAR_CONFIG = {
  DEFAULT_WIDTH: 260,
  DEFAULT_ACTIVE_ITEM: SIDEBAR_ITEM_ID.MEMO_FOLDERS,
} as const;
