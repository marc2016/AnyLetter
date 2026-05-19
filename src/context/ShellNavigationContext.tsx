import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type ShellViewKind = "explorer" | "editor-new" | "editor-draft" | "settings";

interface ShellNavigationContextType {
  explorerFolderId: string | null;
  setExplorerFolderId: (folderId: string | null) => void;
  viewKind: ShellViewKind;
  goToExplorerRoot: () => void;
}

const ShellNavigationContext = createContext<ShellNavigationContextType | undefined>(
  undefined,
);

export function ShellNavigationProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [explorerFolderId, setExplorerFolderId] = useState<string | null>(null);

  const viewKind = useMemo((): ShellViewKind => {
    if (location.pathname === "/settings") {
      return "settings";
    }
    if (location.pathname === "/new") {
      return "editor-new";
    }
    if (/^\/letters\/[^/]+$/.test(location.pathname)) {
      return "editor-draft";
    }
    return "explorer";
  }, [location.pathname]);

  const goToExplorerRoot = useCallback(() => {
    setExplorerFolderId(null);
    navigate("/letters");
  }, [navigate]);

  const value = useMemo(
    () => ({
      explorerFolderId,
      setExplorerFolderId,
      viewKind,
      goToExplorerRoot,
    }),
    [explorerFolderId, viewKind, goToExplorerRoot],
  );

  return (
    <ShellNavigationContext.Provider value={value}>
      {children}
    </ShellNavigationContext.Provider>
  );
}

export function useShellNavigation() {
  const context = useContext(ShellNavigationContext);
  if (!context) {
    throw new Error("useShellNavigation must be used within a ShellNavigationProvider");
  }
  return context;
}
