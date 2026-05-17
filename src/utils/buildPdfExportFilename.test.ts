import { describe, it, expect } from "vitest";
import {
  buildPdfExportFilename,
  sanitizeFilenameSegment,
} from "./buildPdfExportFilename";

describe("buildPdfExportFilename", () => {
  const fixedDate = new Date("2026-05-17T12:00:00.000Z");

  it("uses subject and locale date for German", () => {
    expect(buildPdfExportFilename("Angebot Fenster", fixedDate, "de")).toBe(
      "Angebot Fenster 17.5.2026.pdf",
    );
  });

  it("uses subject and locale date for English (slashes sanitized for filesystem)", () => {
    expect(buildPdfExportFilename("Window quote", fixedDate, "en")).toBe(
      "Window quote 5-17-2026.pdf",
    );
  });

  it("falls back to Brief when subject is empty", () => {
    expect(buildPdfExportFilename("   ", fixedDate, "de")).toBe("Brief 17.5.2026.pdf");
  });

  it("sanitizes invalid filesystem characters in subject", () => {
    expect(buildPdfExportFilename('Angebot: Fenster/Tür', fixedDate, "de")).toBe(
      "Angebot- Fenster-Tür 17.5.2026.pdf",
    );
  });
});

describe("sanitizeFilenameSegment", () => {
  it("replaces invalid characters and collapses whitespace", () => {
    expect(sanitizeFilenameSegment('  foo  /  bar  ')).toBe("foo - bar");
  });
});
