export interface Draft {
  id: string;
  parentId: string | null;
  createdAt: number;
  updatedAt: number;
  sender: string;
  recipient: string;
  notes: string;
  info: string;
  date: string | null;
  subject: string;
  content: string;
  footer: string;
  /** @deprecated Legacy field; read-only migration from old JSON files */
  body?: string;
}

export function createEmptyDraft(id: string, parentId: string | null = null): Draft {
  const now = Date.now();
  return {
    id,
    parentId,
    createdAt: now,
    updatedAt: now,
    sender: "",
    recipient: "",
    notes: "",
    info: "",
    date: null,
    subject: "",
    content: "",
    footer: "",
  };
}
