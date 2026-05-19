import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { LetterData } from "../../../models/letterData";
import { formatAppDate } from "../../../utils/formatAppDate";
import { exportLetterPdf } from "../../../utils/exportLetterPdf";
import woodBackground from "../../../assets/background_letter_wood.png";
import {
  DIN_LAYOUT,
  FOLD_MARKS_MM,
  layoutFontSizeToCqw,
  layoutToPreviewPercent,
  mmToTopPercent,
} from "../../../pdf/dinLayout";

const PREVIEW_PAGE_SCALE = 0.88;

interface LetterPreviewProps {
  data: LetterData;
  focusedField: string | null;
}

function previewHighlight(field: string, focusedField: string | null): string {
  return focusedField === field ? "active-highlight" : "";
}

export function LetterPreview({ data, focusedField }: LetterPreviewProps) {
  const { t, i18n } = useTranslation("preview");
  const [isExporting, setIsExporting] = useState(false);
  const toastRef = useRef<Toast>(null);
  const displayDate = data.date ? formatAppDate(data.date) : formatAppDate(new Date());

  const handleExport = useCallback(async () => {
    if (isExporting) {
      return;
    }

    setIsExporting(true);
    try {
      await exportLetterPdf(data, i18n.language);
    } catch (error) {
      console.error("PDF export failed", error);
      toastRef.current?.show({
        severity: "error",
        summary: t("exportPdfErrorSummary"),
        detail: t("exportPdfErrorDetail"),
        life: 5000,
      });
    } finally {
      setIsExporting(false);
    }
  }, [data, i18n.language, isExporting, t]);

  const senderDisplay = data.sender
    ? data.sender.replace(/\n/g, " • ")
    : t("senderPlaceholder");

  return (
    <div className="relative w-full h-full">
      <Toast ref={toastRef} />
      <div
        className="w-full h-full overflow-auto flex align-items-start justify-content-center p-4"
        style={{
          backgroundImage: `url(${woodBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <style>{`
        .preview-field {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          outline: 1px dashed transparent;
          outline-offset: 4px;
          border-radius: 3px;
        }
        .preview-field.active-highlight {
          outline: 2px dashed var(--primary-color, #3b82f6);
          outline-offset: 6px;
          background-color: rgba(59, 130, 246, 0.04);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.15);
        }
        .preview-rich-content ul, .preview-rich-content ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .preview-rich-content p {
          margin: 0 0 0.5rem 0;
        }
        .preview-rich-content,
        .preview-rich-content * {
          color: #000000;
        }
      `}</style>

        <div
          style={{
            width: `calc(210mm * ${PREVIEW_PAGE_SCALE})`,
            height: `calc(297mm * ${PREVIEW_PAGE_SCALE})`,
            minWidth: `calc(210mm * ${PREVIEW_PAGE_SCALE})`,
            minHeight: `calc(297mm * ${PREVIEW_PAGE_SCALE})`,
            flexShrink: 0,
          }}
        >
          <div
            className="bg-white shadow-4 relative overflow-hidden select-none"
            style={{
              width: "210mm",
              height: "297mm",
              minWidth: "210mm",
              minHeight: "297mm",
              transform: `scale(${PREVIEW_PAGE_SCALE})`,
              transformOrigin: "top left",
              containerType: "inline-size",
              color: "#000000",
            }}
          >
          <div
            className="absolute left-0"
            style={{
              top: mmToTopPercent(FOLD_MARKS_MM.foldMark1),
              width: "15px",
              height: "1px",
              backgroundColor: "#a0aec0",
            }}
            title={t("foldMark1")}
          />
          <div
            className="absolute left-0"
            style={{
              top: mmToTopPercent(FOLD_MARKS_MM.punchMark),
              width: "10px",
              height: "1px",
              backgroundColor: "#a0aec0",
            }}
            title={t("punchMark")}
          />
          <div
            className="absolute left-0"
            style={{
              top: mmToTopPercent(FOLD_MARKS_MM.foldMark2),
              width: "15px",
              height: "1px",
              backgroundColor: "#a0aec0",
            }}
            title={t("foldMark2")}
          />

          <div
            className={`absolute preview-field ${previewHighlight("sender", focusedField)}`}
            style={{
              top: "10.1%",
              left: "9.5%",
              width: "40%",
              fontSize: "1.1cqw",
              borderBottom: "0.5px solid #dcdde1",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {senderDisplay}
          </div>

          <div
            className={`absolute preview-field ${previewHighlight("notes", focusedField)}`}
            style={{
              top: "13.2%",
              left: "9.5%",
              width: "40%",
              fontSize: "1.3cqw",
              fontStyle: "italic",
            }}
          >
            {data.notes || t("notesPlaceholder")}
          </div>

          <div
            className={`absolute preview-field ${previewHighlight("recipient", focusedField)}`}
            style={{
              top: "17.2%",
              left: "9.5%",
              width: "40%",
              fontSize: "1.5cqw",
              lineHeight: "1.4",
              whiteSpace: "pre-line",
            }}
          >
            {data.recipient || t("recipientPlaceholder")}
          </div>

          <div
            className={`absolute preview-field ${previewHighlight("date", focusedField)}`}
            style={{
              ...layoutToPreviewPercent(DIN_LAYOUT.date),
              fontSize: layoutFontSizeToCqw(DIN_LAYOUT.date.fontSize),
            }}
          >
            {t("dateLabel")}
            {displayDate}
          </div>

          <div
            className={`absolute preview-field ${previewHighlight("info", focusedField)}`}
            style={{
              ...layoutToPreviewPercent(DIN_LAYOUT.info),
              fontSize: layoutFontSizeToCqw(DIN_LAYOUT.info.fontSize),
              lineHeight: "1.4",
              whiteSpace: "pre-line",
            }}
          >
            {data.info || t("infoPlaceholder")}
          </div>

          <div
            className={`absolute preview-field font-bold ${previewHighlight("subject", focusedField)}`}
            style={{
              top: "35.0%",
              left: "12.0%",
              width: "76.0%",
              fontSize: "2.0cqw",
            }}
          >
            {data.subject || t("subjectPlaceholder")}
          </div>

          <div
            className={`absolute preview-field preview-rich-content ${previewHighlight("content", focusedField)}`}
            style={{
              top: "42.0%",
              left: "12.0%",
              width: "76.0%",
              bottom: "12%",
              fontSize: "1.6cqw",
              lineHeight: "1.6",
              overflow: "hidden",
            }}
          >
            {data.content ? (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            ) : (
              <div>
                <p>{t("sampleGreeting")}</p>
                <p>{t("sampleBody")}</p>
                <p>{t("sampleClosing")}</p>
                <p>{t("sampleSignature")}</p>
              </div>
            )}
          </div>

          <div
            className="absolute preview-field"
            style={{
              ...layoutToPreviewPercent(DIN_LAYOUT.pageNumber),
              fontSize: layoutFontSizeToCqw(DIN_LAYOUT.pageNumber.fontSize),
              textAlign: "right",
            }}
          >
            {t("pageOf", { page: 1, total: 1 })}
          </div>

          <div
            className={`absolute preview-field text-center ${previewHighlight("footer", focusedField)}`}
            style={{
              ...layoutToPreviewPercent(DIN_LAYOUT.footer),
              fontSize: layoutFontSizeToCqw(DIN_LAYOUT.footer.fontSize),
              borderTop: "0.5px solid #dcdde1",
              paddingTop: "6px",
              whiteSpace: "pre-line",
            }}
          >
            {data.footer || t("footerPlaceholder")}
          </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        icon="pi pi-file-pdf"
        rounded
        severity="secondary"
        aria-label={t("exportPdf")}
        className="absolute shadow-4"
        style={{ bottom: "1rem", right: "1rem", zIndex: 10 }}
        loading={isExporting}
        disabled={isExporting}
        onClick={() => void handleExport()}
      />
    </div>
  );
}
