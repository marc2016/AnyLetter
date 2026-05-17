import { Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { ReactElement } from "react";

const EMPTY_QUILL = /^<p><br><\/p>$/i;
const WRAPPER_TAG = "div";
const WRAPPER_CLOSE = `</${WRAPPER_TAG}>`;

export function isEmptyQuillHtml(html: string): boolean {
  const trimmed = html.trim();
  return !trimmed || EMPTY_QUILL.test(trimmed);
}

/** Parse Quill HTML into flat paragraphs (call before pdf(), not during render). */
export function parseQuillHtmlToParagraphs(html: string): string[] {
  if (isEmptyQuillHtml(html)) {
    return [];
  }

  const root = new DOMParser().parseFromString(
    `<${WRAPPER_TAG}>${html.trim()}${WRAPPER_CLOSE}`,
    "text/html",
  ).body.firstElementChild;

  if (!root) {
    return [];
  }

  const paragraphs: string[] = [];

  for (const node of root.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        paragraphs.push(text);
      }
      continue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "p" || tag === "div") {
      const text = el.textContent?.trim();
      if (text) {
        paragraphs.push(text);
      }
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      for (const li of el.querySelectorAll("li")) {
        const text = li.textContent?.trim();
        if (text) {
          paragraphs.push(`• ${text}`);
        }
      }
    }
  }

  return paragraphs;
}

export function quillParagraphsToPdf(
  paragraphs: string[],
  baseStyle: Style,
): ReactElement | null {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <View>
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={{ ...baseStyle, marginBottom: 4 }}>
          {paragraph}
        </Text>
      ))}
    </View>
  );
}
