/** Strip HTML markup and return normalized plain text (browser only). */
export function htmlToPlainText(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) {
    return "";
  }

  const doc = new DOMParser().parseFromString(`<div>${trimmed}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  if (!root) {
    return "";
  }

  const text = root.textContent ?? "";
  return text.replace(/\s+/g, " ").trim();
}
