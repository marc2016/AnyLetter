export interface Draft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  createdAt: number;
  updatedAt: number;
  parentId: string | null;
}
