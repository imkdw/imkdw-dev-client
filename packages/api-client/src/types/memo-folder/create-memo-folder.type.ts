export interface RequestCreateMemoFolder {
  name: string;
  parentId?: string;
}

export interface ResponseCreateMemoFolder {
  id: string;
  name: string;
  parentId?: string;
}
