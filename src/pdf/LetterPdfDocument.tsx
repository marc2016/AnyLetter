import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { LetterData } from "../models/letterData";
import { DIN_LAYOUT, PDF_COLORS } from "./dinLayout";
import { quillParagraphsToPdf } from "./quillHtmlToPdf";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    color: PDF_COLORS.text,
    backgroundColor: "#ffffff",
  },
  sender: {
    fontSize: DIN_LAYOUT.sender.fontSize,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_COLORS.rule,
    paddingBottom: 2,
  },
  notes: {
    fontSize: DIN_LAYOUT.notes.fontSize,
    fontStyle: "italic",
  },
  recipient: {
    fontSize: DIN_LAYOUT.recipient.fontSize,
    lineHeight: DIN_LAYOUT.recipient.lineHeight,
  },
  date: {
    fontSize: DIN_LAYOUT.date.fontSize,
  },
  info: {
    fontSize: DIN_LAYOUT.info.fontSize,
    lineHeight: DIN_LAYOUT.info.lineHeight,
  },
  subject: {
    fontSize: DIN_LAYOUT.subject.fontSize,
    fontWeight: "bold",
  },
  content: {
    fontSize: DIN_LAYOUT.content.fontSize,
    lineHeight: DIN_LAYOUT.content.lineHeight,
  },
  pageNumber: {
    fontSize: DIN_LAYOUT.pageNumber.fontSize,
    textAlign: "right",
  },
  footer: {
    fontSize: DIN_LAYOUT.footer.fontSize,
    textAlign: "center",
    borderTopWidth: 0.5,
    borderTopColor: PDF_COLORS.rule,
    paddingTop: 6,
  },
  foldMark: {
    height: 0.5,
    backgroundColor: PDF_COLORS.mark,
  },
});

function mm(value: number): string {
  return `${value}mm`;
}

function absBox(layout: {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  height?: number;
}) {
  return {
    position: "absolute" as const,
    left: mm(layout.left),
    width: mm(layout.width),
    ...(layout.top !== undefined ? { top: mm(layout.top) } : {}),
    ...(layout.bottom !== undefined ? { bottom: mm(layout.bottom) } : {}),
    ...(layout.height !== undefined ? { height: mm(layout.height) } : {}),
  };
}

function formatSender(sender: string): string {
  return sender.trim().replace(/\n/g, " • ");
}

export interface LetterPdfDocumentProps {
  data: LetterData;
  displayDate: string;
  dateLabel: string;
  formatPageOf: (page: number, total: number) => string;
  contentParagraphs: string[];
}

export function LetterPdfDocument({
  data,
  displayDate,
  dateLabel,
  formatPageOf,
  contentParagraphs,
}: LetterPdfDocumentProps) {
  const contentNode = quillParagraphsToPdf(contentParagraphs, styles.content);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            ...absBox({
              top: DIN_LAYOUT.foldMark1.top,
              left: 0,
              width: DIN_LAYOUT.foldMark1.width,
            }),
            ...styles.foldMark,
          }}
        />
        <View
          style={{
            ...absBox({
              top: DIN_LAYOUT.punchMark.top,
              left: 0,
              width: DIN_LAYOUT.punchMark.width,
            }),
            ...styles.foldMark,
          }}
        />
        <View
          style={{
            ...absBox({
              top: DIN_LAYOUT.foldMark2.top,
              left: 0,
              width: DIN_LAYOUT.foldMark2.width,
            }),
            ...styles.foldMark,
          }}
        />

        {data.sender.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.sender), ...styles.sender }}>
            {formatSender(data.sender)}
          </Text>
        ) : null}

        {data.notes.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.notes), ...styles.notes }}>{data.notes}</Text>
        ) : null}

        {data.recipient.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.recipient), ...styles.recipient }}>
            {data.recipient}
          </Text>
        ) : null}

        <Text style={{ ...absBox(DIN_LAYOUT.date), ...styles.date }}>
          {dateLabel}
          {displayDate}
        </Text>

        {data.info.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.info), ...styles.info }}>{data.info}</Text>
        ) : null}

        {data.subject.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.subject), ...styles.subject }}>{data.subject}</Text>
        ) : null}

        {contentNode ? (
          <View style={{ ...absBox(DIN_LAYOUT.content), ...styles.content }}>{contentNode}</View>
        ) : null}

        <Text
          fixed
          style={{ ...absBox(DIN_LAYOUT.pageNumber), ...styles.pageNumber }}
          render={({ pageNumber, totalPages }) =>
            formatPageOf(pageNumber, totalPages)
          }
        />

        {data.footer.trim() ? (
          <Text style={{ ...absBox(DIN_LAYOUT.footer), ...styles.footer }}>{data.footer}</Text>
        ) : null}
      </Page>
    </Document>
  );
}
