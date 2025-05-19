export interface RequestUpdateMemo {
  name: string;
  folderId: string;
  content: string;
  imageUrls: string[];
}

export interface ResponseUpdateMemo {
  slug: string;
}
