/** DIN 5008 Form B positions on A4 (210mm × 297mm), derived from preview percentages. */
export const PAGE_MM = { width: 210, height: 297 } as const;

/** Kleiner Briefkopf: Falz- und Lochmarken (Abstand von der oberen Blattkante). */
export const FOLD_MARKS_MM = {
  foldMark1: 87,
  punchMark: 148.5,
  foldMark2: 192,
} as const;

export function mmToTopPercent(mm: number): string {
  return `${(mm / PAGE_MM.height) * 100}%`;
}

function mmToPercent(mm: number, axis: "width" | "height"): string {
  const size = axis === "width" ? PAGE_MM.width : PAGE_MM.height;
  return `${(mm / size) * 100}%`;
}

const pctTop = (p: number) => (p / 100) * PAGE_MM.height;
const pctLeft = (p: number) => (p / 100) * PAGE_MM.width;
const pctWidth = (p: number) => (p / 100) * PAGE_MM.width;
const pctBottom = (p: number) => (p / 100) * PAGE_MM.height;

export type LayoutBox = {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  height?: number;
  fontSize?: number;
};

export function layoutToPreviewPercent(box: LayoutBox): {
  top?: string;
  bottom?: string;
  left: string;
  width: string;
  height?: string;
} {
  return {
    left: mmToPercent(box.left, "width"),
    width: mmToPercent(box.width, "width"),
    ...(box.top !== undefined ? { top: mmToPercent(box.top, "height") } : {}),
    ...(box.bottom !== undefined ? { bottom: mmToPercent(box.bottom, "height") } : {}),
    ...(box.height !== undefined ? { height: mmToPercent(box.height, "height") } : {}),
  };
}

/** Maps PDF pt-like layout font sizes to preview container-query width units. */
export function layoutFontSizeToCqw(fontSize: number): string {
  return `${((fontSize / 9) * 1.5).toFixed(2)}cqw`;
}

export const DIN_LAYOUT = {
  sender: {
    top: pctTop(10.1),
    left: pctLeft(9.5),
    width: pctWidth(40),
    fontSize: 6.5,
  },
  notes: {
    top: pctTop(13.2),
    left: pctLeft(9.5),
    width: pctWidth(40),
    fontSize: 7.5,
  },
  recipient: {
    top: pctTop(17.2),
    left: pctLeft(9.5),
    width: pctWidth(40),
    fontSize: 9,
    lineHeight: 1.4,
  },
  date: {
    top: pctTop(10.1),
    left: pctLeft(70),
    width: pctWidth(30.5),
    fontSize: 9,
  },
  info: {
    top: pctTop(14.5),
    left: pctLeft(70),
    width: pctWidth(20),
    fontSize: 7.5,
    lineHeight: 1.4,
  },
  subject: {
    top: pctTop(35),
    left: pctLeft(12),
    width: pctWidth(76),
    fontSize: 11.5,
  },
  content: {
    top: pctTop(42),
    left: pctLeft(12),
    width: pctWidth(76),
    height: PAGE_MM.height - pctTop(42) - pctBottom(12),
    fontSize: 9.5,
    lineHeight: 1.6,
  },
  pageNumber: {
    bottom: pctBottom(6.5),
    left: pctLeft(12),
    width: pctWidth(76),
    fontSize: 7,
  },
  footer: {
    bottom: pctBottom(4),
    left: pctLeft(12),
    width: pctWidth(76),
    fontSize: 7,
  },
  foldMark1: { top: FOLD_MARKS_MM.foldMark1, width: 4 },
  punchMark: { top: FOLD_MARKS_MM.punchMark, width: 2.5 },
  foldMark2: { top: FOLD_MARKS_MM.foldMark2, width: 4 },
} as const;

export const PDF_COLORS = {
  text: "#000000",
  muted: "#7f8c8d",
  mark: "#a0aec0",
  rule: "#dcdde1",
} as const;
