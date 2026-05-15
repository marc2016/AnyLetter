import React, { createContext, useContext, useState, ReactNode } from "react";
import { Draft } from "../models/draft";

interface DraftContextType {
  drafts: Draft[];
  addDraft: (draft: Draft) => void;
  updateDraft: (id: string, updates: Partial<Draft>) => void;
  deleteDraft: (id: string) => void;
}

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export function DraftProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const addDraft = (draft: Draft) => {
    setDrafts((prev) => [...prev, draft]);
  };

  const updateDraft = (id: string, updates: Partial<Draft>) => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates, updatedAt: Date.now() } : d))
    );
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DraftContext.Provider value={{ drafts, addDraft, updateDraft, deleteDraft }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDrafts() {
  const context = useContext(DraftContext);
  if (context === undefined) {
    throw new Error("useDrafts must be used within a DraftProvider");
  }
  return context;
}
