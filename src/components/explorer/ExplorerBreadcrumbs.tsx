import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { Folder } from '../../models/Folder';

interface ExplorerBreadcrumbsProps {
  currentFolderId: string | null;
  folders: Folder[];
  onNavigate: (folderId: string | null) => void;
}

export function ExplorerBreadcrumbs({ currentFolderId, folders, onNavigate }: ExplorerBreadcrumbsProps) {
  const items: MenuItem[] = [];
  
  if (currentFolderId) {
    const path: Folder[] = [];
    let current: Folder | undefined = folders.find(f => f.id === currentFolderId);
    
    while (current) {
      path.unshift(current);
      const parentId = current.parentId;
      current = parentId ? folders.find(f => f.id === parentId) : undefined;
    }
    
    path.forEach(folder => {
      items.push({ 
        label: folder.name, 
        command: () => onNavigate(folder.id) 
      });
    });
  }

  const home: MenuItem = { 
    icon: 'pi pi-home', 
    command: () => onNavigate(null) 
  };

  return (
    <BreadCrumb model={items} home={home} className="border-none bg-transparent p-0 mb-3" />
  );
}
