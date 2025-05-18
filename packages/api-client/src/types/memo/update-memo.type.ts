export interface RequestUpdateMemo {
  name: string;
  folderId: string;
  content: string;
  imageNames: string[];
}

export interface ResponseUpdateMemo {
  slug: string;
}
