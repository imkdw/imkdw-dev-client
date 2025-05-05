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
