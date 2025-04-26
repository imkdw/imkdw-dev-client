export interface Memo {
  id: string;
  title: string;
  content: string;
  path: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MemoTab {
  id: string;
  title: string;
  isActive: boolean;
}
