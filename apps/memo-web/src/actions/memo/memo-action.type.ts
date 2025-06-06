export interface CreateMemoState {
  success: boolean;
  createdMemo?: {
    slug: string;
  };
  errors?: {
    name: string[] | undefined;
    folderId: string[] | undefined;
  };
}

export interface UpdateMemoState {
  success: boolean;
  errors?: {
    name: string[] | undefined;
    folderId: string[] | undefined;
    content: string[] | undefined;
    contentHtml: string[] | undefined;
    imageUrls: string[] | undefined;
    slug: string[] | undefined;
  };
}
