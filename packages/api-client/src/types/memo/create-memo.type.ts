export interface RequestCreateMemo {
  name: string;
  folderId: string;
  content: string;
}

export interface ResponseCreateMemo {
  slug: string;
}
