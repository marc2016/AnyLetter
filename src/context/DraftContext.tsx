import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Draft } from "../models/draft";
import { loadAllDrafts, saveDraftFile, deleteDraftFile } from "../storage/adapter";
import { getCurrentWindow } from '@tauri-apps/api/window';

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
  
  const pendingSaves = useRef<{ [id: string]: { timer: ReturnType<typeof setTimeout>, draft: Draft } }>({});

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

    let unlisten: (() => void) | undefined;
    async function setupCloseHandler() {
      try {
        const appWindow = getCurrentWindow();
        unlisten = await appWindow.onCloseRequested(async (event) => {
          const pendingIds = Object.keys(pendingSaves.current);
          if (pendingIds.length > 0) {
            event.preventDefault(); // Prevent immediate close
            
            // Flush all pending writes
            const promises = pendingIds.map(id => {
              const { timer, draft } = pendingSaves.current[id];
              clearTimeout(timer);
              delete pendingSaves.current[id];
              return saveDraftFile(draft);
            });
            
            await Promise.all(promises);
            await appWindow.destroy(); // Close it safely after flush
          }
        });
      } catch (err) {
        // Ignored if not in Tauri (e.g. browser)
      }
    }
    
    setupCloseHandler();

    return () => {
      if (unlisten) unlisten();
    };
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
        if (pendingSaves.current[id]) {
          clearTimeout(pendingSaves.current[id].timer);
        }
        const draftToSave = updatedDraft;
        const timer = setTimeout(() => {
          saveDraftFile(draftToSave).catch((err) => console.warn("Autosave failed", err));
          delete pendingSaves.current[id];
        }, 1000); // 1s debounce
        
        pendingSaves.current[id] = { timer, draft: draftToSave };
      }
      return next;
    });
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    if (pendingSaves.current[id]) {
      clearTimeout(pendingSaves.current[id].timer);
      delete pendingSaves.current[id];
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
