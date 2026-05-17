import { formatAppDate } from "./formatAppDate";

const INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/g;

export function sanitizeFilenameSegment(value: string): string {
  return value.replace(INVALID_FILENAME_CHARS, "-").replace(/\s+/g, " ").trim();
}

export function buildPdfExportFilename(
  subject: string,
  date: Date = new Date(),
  language?: string,
): string {
  const subjectPart = sanitizeFilenameSegment(subject.trim() || "Brief");
  const datePart = sanitizeFilenameSegment(formatAppDate(date, undefined, language));
  return `${subjectPart} ${datePart}.pdf`;
}
