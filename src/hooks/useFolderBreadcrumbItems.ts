import { MenuItem } from "primereact/menuitem";
import { Folder } from "../models/Folder";

export function buildFolderBreadcrumbItems(
  folders: Folder[],
  currentFolderId: string | null,
  onNavigate: (folderId: string | null) => void,
): MenuItem[] {
  const items: MenuItem[] = [];

  if (!currentFolderId) {
    return items;
  }

  const path: Folder[] = [];
  let current: Folder | undefined = folders.find((f) => f.id === currentFolderId);

  while (current) {
    path.unshift(current);
    const parentId = current.parentId;
    current = parentId ? folders.find((f) => f.id === parentId) : undefined;
  }

  path.forEach((folder) => {
    items.push({
      label: folder.name,
      command: () => onNavigate(folder.id),
    });
  });

  return items;
}
