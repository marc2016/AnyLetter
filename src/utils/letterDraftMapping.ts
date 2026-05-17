import { Draft, createEmptyDraft } from "../models/draft";
import { LetterData } from "../models/letterData";

export function normalizeDraftFromStorage(data: Record<string, unknown>): Draft | null {
  if (typeof data.id !== "string" || typeof data.createdAt !== "number") {
    return null;
  }

  const content =
    (typeof data.content === "string" ? data.content : "") ||
    (typeof data.body === "string" ? data.body : "");

  return {
    id: data.id,
    parentId: typeof data.parentId === "string" ? data.parentId : null,
    createdAt: data.createdAt,
    updatedAt:
      typeof data.updatedAt === "number" ? data.updatedAt : (data.createdAt as number),
    sender: typeof data.sender === "string" ? data.sender : "",
    recipient: typeof data.recipient === "string" ? data.recipient : "",
    notes: typeof data.notes === "string" ? data.notes : "",
    info: typeof data.info === "string" ? data.info : "",
    date: typeof data.date === "string" ? data.date : null,
    subject: typeof data.subject === "string" ? data.subject : "",
    content,
    footer: typeof data.footer === "string" ? data.footer : "",
    body: typeof data.body === "string" ? data.body : undefined,
  };
}

export function draftToLetterData(draft: Draft): LetterData {
  return {
    sender: draft.sender,
    recipient: draft.recipient,
    notes: draft.notes,
    info: draft.info,
    date: draft.date ? new Date(draft.date) : null,
    subject: draft.subject,
    content: draft.content,
    footer: draft.footer,
  };
}

export function letterDataToDraftPartial(data: LetterData): Partial<Draft> {
  return {
    sender: data.sender,
    recipient: data.recipient,
    notes: data.notes,
    info: data.info,
    date: data.date ? data.date.toISOString() : null,
    subject: data.subject,
    content: data.content,
    footer: data.footer,
  };
}

export { createEmptyDraft };
