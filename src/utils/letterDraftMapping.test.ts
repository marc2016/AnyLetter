import { describe, it, expect } from "vitest";
import {
  draftToLetterData,
  letterDataToDraftPartial,
  normalizeDraftFromStorage,
} from "./letterDraftMapping";
import { createEmptyDraft } from "../models/draft";

describe("letterDraftMapping", () => {
  it("maps legacy body field to content", () => {
    const draft = normalizeDraftFromStorage({
      id: "legacy-1",
      createdAt: 1000,
      recipient: "Max",
      subject: "Hello",
      body: "Legacy body text",
    });

    expect(draft).not.toBeNull();
    expect(draft!.content).toBe("Legacy body text");
    expect(draftToLetterData(draft!).content).toBe("Legacy body text");
  });

  it("round-trips letter data fields", () => {
    const draft = createEmptyDraft("test-id");
    draft.sender = "Me";
    draft.subject = "Subject";
    draft.content = "<p>Hi</p>";
    draft.date = "2026-05-17T10:00:00.000Z";

    const letterData = draftToLetterData(draft);
    const partial = letterDataToDraftPartial(letterData);

    expect(partial.sender).toBe("Me");
    expect(partial.subject).toBe("Subject");
    expect(partial.content).toBe("<p>Hi</p>");
    expect(partial.date).toBe("2026-05-17T10:00:00.000Z");
  });
});
