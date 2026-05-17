import { pdf } from "@react-pdf/renderer";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import i18n from "../i18n";
import { LetterData } from "../models/letterData";
import { LetterPdfDocument } from "../pdf/LetterPdfDocument";
import { parseQuillHtmlToParagraphs } from "../pdf/quillHtmlToPdf";
import { buildPdfExportFilename } from "./buildPdfExportFilename";
import { formatAppDate } from "./formatAppDate";

export type ExportLetterPdfResult = "saved" | "cancelled";

const PDF_RENDER_TIMEOUT_MS = 60_000;

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export async function exportLetterPdf(
  data: LetterData,
  language?: string,
): Promise<ExportLetterPdfResult> {
  const defaultPath = buildPdfExportFilename(data.subject, new Date(), language);
  const displayDate = data.date
    ? formatAppDate(data.date, undefined, language)
    : formatAppDate(new Date(), undefined, language);

  const path = await save({
    defaultPath,
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  });

  if (!path) {
    return "cancelled";
  }

  const contentParagraphs = data.content?.trim()
    ? parseQuillHtmlToParagraphs(data.content)
    : [];

  const lang = language ?? i18n.language;
  const t = i18n.getFixedT(lang, "preview");

  const pdfBlob = await withTimeout(
    pdf(
      <LetterPdfDocument
        data={data}
        displayDate={displayDate}
        dateLabel={t("dateLabel")}
        formatPageOf={(page, total) => t("pageOf", { page, total })}
        contentParagraphs={contentParagraphs}
      />,
    ).toBlob(),
    PDF_RENDER_TIMEOUT_MS,
    "PDF generation timed out",
  );

  const bytes = new Uint8Array(await pdfBlob.arrayBuffer());
  await writeFile(path, bytes);
  return "saved";
}
