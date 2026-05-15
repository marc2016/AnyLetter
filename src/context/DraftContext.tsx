import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Draft } from "../models/draft";
import { loadAllDrafts, saveDraftFile, deleteDraftFile } from "../storage/adapter";

interface DraftContextType {
  drafts: Draft[];
  addDraft: (draft: Draft) => void;
  updateDraft: (id: string, updates: Partial<Draft>) => void;
  deleteDraft: (id: string) => void;
  isLoading: boolean;
}

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export function DraftProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const saveTimers = useRef<{ [id: string]: ReturnType<typeof setTimeout> }>({});

  useEffect(() => {
    loadAllDrafts()
      .then((loadedDrafts) => {
        setDrafts(loadedDrafts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load drafts (might be running in web mode)", err);
        setIsLoading(false);
      });
  }, []);

  const addDraft = (draft: Draft) => {
    setDrafts((prev) => [...prev, draft]);
    saveDraftFile(draft).catch((err) => console.warn("Save failed", err));
  };

  const updateDraft = (id: string, updates: Partial<Draft>) => {
    setDrafts((prev) => {
      let updatedDraft: Draft | null = null;
      const next = prev.map((d) => {
        if (d.id === id) {
          updatedDraft = { ...d, ...updates, updatedAt: Date.now() };
          return updatedDraft;
        }
        return d;
      });
      
      if (updatedDraft) {
        if (saveTimers.current[id]) {
          clearTimeout(saveTimers.current[id]);
        }
        const draftToSave = updatedDraft;
        saveTimers.current[id] = setTimeout(() => {
          saveDraftFile(draftToSave).catch((err) => console.warn("Autosave failed", err));
          delete saveTimers.current[id];
        }, 1000); // 1s debounce
      }
      return next;
    });
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    if (saveTimers.current[id]) {
      clearTimeout(saveTimers.current[id]);
      delete saveTimers.current[id];
    }
    deleteDraftFile(id).catch((err) => console.warn("Delete failed", err));
  };

  return (
    <DraftContext.Provider value={{ drafts, addDraft, updateDraft, deleteDraft, isLoading }}>
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
