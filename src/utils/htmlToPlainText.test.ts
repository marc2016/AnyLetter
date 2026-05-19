import { describe, it, expect } from "vitest";
import { htmlToPlainText } from "./htmlToPlainText";

describe("htmlToPlainText", () => {
  it("returns empty string for empty or whitespace input", () => {
    expect(htmlToPlainText("")).toBe("");
    expect(htmlToPlainText("   ")).toBe("");
  });

  it("strips Quill paragraph HTML", () => {
    expect(htmlToPlainText("<p>Sehr geehrte Damen und Herren,</p>")).toBe(
      "Sehr geehrte Damen und Herren,",
    );
  });

  it("joins text from multiple paragraphs", () => {
    expect(htmlToPlainText("<p>Hello</p><p>World</p>")).toBe("HelloWorld");
  });

  it("collapses whitespace and line breaks", () => {
    expect(htmlToPlainText("<p>Line one</p>\n\n<p>Line two</p>")).toBe("Line one Line two");
  });

  it("handles empty Quill placeholder", () => {
    expect(htmlToPlainText("<p><br></p>")).toBe("");
  });
});
