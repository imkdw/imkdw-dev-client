export interface RequestCreateMemoFolder {
  name: string;
  parentId: string | null;
}

export interface ResponseCreateMemoFolder {
  id: string;
  name: string;
  parentId: string | null;
}
