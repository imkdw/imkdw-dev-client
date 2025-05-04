export interface FindFolderMemosItem {
  id: string;
  name: string;
  slug: string;
}

export interface FindFolderMemosResponse {
  memos: FindFolderMemosItem[];
}
