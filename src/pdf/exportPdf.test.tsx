import { describe, it, expect } from "vitest";
import { pdf } from "@react-pdf/renderer";
import { LetterPdfDocument } from "./LetterPdfDocument";
import { parseQuillHtmlToParagraphs } from "./quillHtmlToPdf";

describe("LetterPdfDocument", () => {
  it(
    "renders to blob within reasonable time",
    async () => {
      const data = {
        sender: "Test GmbH",
        recipient: "Max Mustermann\nMusterstraße 1",
        notes: "",
        info: "",
        date: new Date("2026-05-17"),
        subject: "Angebot",
        content: "<p>Hello <strong>world</strong></p>",
        footer: "Footer line",
      };

      const blob = await pdf(
        <LetterPdfDocument
          data={data}
          displayDate="17.5.2026"
          contentParagraphs={parseQuillHtmlToParagraphs(data.content)}
        />,
      ).toBlob();

      expect(blob.size).toBeGreaterThan(500);
    },
    15_000,
  );
});
