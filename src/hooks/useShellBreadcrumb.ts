import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
import { useDrafts } from "../context/DraftContext";
import { useShellNavigation } from "../context/ShellNavigationContext";
import { buildFolderBreadcrumbItems } from "./useFolderBreadcrumbItems";

export function useShellBreadcrumb(): { home: MenuItem; items: MenuItem[] } {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: draftId } = useParams<{ id: string }>();
  const { explorerFolderId, setExplorerFolderId, goToExplorerRoot, viewKind } =
    useShellNavigation();
  const { folders, drafts } = useDrafts();

  return useMemo(() => {
    const isExplorerRoute =
      location.pathname === "/letters" || location.pathname === "/";

    const home: MenuItem = {
      icon: "pi pi-home",
      command: () => {
        if (isExplorerRoute) {
          setExplorerFolderId(null);
        } else {
          goToExplorerRoot();
        }
      },
    };

    const items: MenuItem[] = [];

    if (viewKind === "explorer") {
      items.push(
        ...buildFolderBreadcrumbItems(folders, explorerFolderId, setExplorerFolderId),
      );
    } else if (viewKind === "editor-new") {
      items.push({ label: "Neuer Brief" });
    } else if (viewKind === "editor-draft") {
      const draft = drafts.find((d) => d.id === draftId);
      items.push({
        label: "Briefe",
        command: () => navigate("/letters"),
      });
      items.push({
        label: draft?.subject?.trim() || "Untitled",
      });
    }

    return { home, items };
  }, [
    location.pathname,
    viewKind,
    explorerFolderId,
    folders,
    drafts,
    draftId,
    setExplorerFolderId,
    goToExplorerRoot,
    navigate,
  ]);
}
