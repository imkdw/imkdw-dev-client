export interface RequestUpdateMemo {
  name: string;
  folderId: string;
  content: string;
}

export interface ResponseUpdateMemo {
  slug: string;
}
