import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ContextMenu } from 'primereact/contextmenu';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDrafts } from '../../context/DraftContext';
import { FileGrid } from '../explorer/FileGrid';
import { FileGridItem } from '../explorer/FileGridItem';
import { ExplorerActionBar } from '../explorer/ExplorerActionBar';
import { useShellNavigation } from '../../context/ShellNavigationContext';
import { Folder } from '../../models/Folder';

export function FileExplorerView() {
  const { t } = useTranslation(['explorer', 'common']);
  const { drafts, folders, deleteDraft, addFolder, deleteFolder, updateFolder, updateDraft } = useDrafts();
  const navigate = useNavigate();
  const { explorerFolderId: currentFolderId, setExplorerFolderId: setCurrentFolderId } =
    useShellNavigation();
  const toast = useRef<Toast>(null);
  const cm = useRef<ContextMenu>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('updatedAt');
  
  const [selectedItem, setSelectedItem] = useState<{ id: string, type: 'file' | 'folder' } | null>(null);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState(false);
  const [isMoveDialogVisible, setIsMoveDialogVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [targetFolderId, setTargetFolderId] = useState<string | null>(null);

  const untitledLabel = t('defaults.untitledLetter');

  const currentContent = useMemo(() => {
    let filteredFolders = folders.filter(f => f.parentId === currentFolderId);
    let filteredDrafts = drafts.filter(d => d.parentId === currentFolderId);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredFolders = folders.filter(f => f.name.toLowerCase().includes(q));
      filteredDrafts = drafts.filter(d => d.subject.toLowerCase().includes(q) || d.recipient.toLowerCase().includes(q));
    }

    const sortedFolders = [...filteredFolders].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      return b.updatedAt - a.updatedAt;
    });

    const sortedDrafts = [...filteredDrafts].sort((a, b) => {
      if (sortKey === 'name') {
        return (a.subject || untitledLabel).localeCompare(b.subject || untitledLabel);
      }
      return b.updatedAt - a.updatedAt;
    });

    return { folders: sortedFolders, drafts: sortedDrafts };
  }, [folders, drafts, currentFolderId, searchQuery, sortKey, untitledLabel]);

  const handleItemDoubleClick = (id: string, type: 'file' | 'folder') => {
    if (type === 'folder') {
      setCurrentFolderId(id);
    } else {
      navigate(`/letters/${id}`);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, id: string, type: 'file' | 'folder') => {
    setSelectedItem({ id, type });
    cm.current?.show(e);
  };

  const menuItems = useMemo(() => [
    { 
      label: t('contextRename'), 
      icon: 'pi pi-pencil', 
      command: () => {
        const item = selectedItem?.type === 'folder' 
          ? folders.find(f => f.id === selectedItem.id)
          : drafts.find(d => d.id === selectedItem?.id);
        setNewName(selectedItem?.type === 'folder' ? (item as Folder).name : (item as { subject?: string })?.subject || untitledLabel);
        setIsRenameDialogVisible(true);
      }
    },
    {
      label: t('contextMove'),
      icon: 'pi pi-external-link',
      command: () => {
        setTargetFolderId(null);
        setIsMoveDialogVisible(true);
      }
    },
    { 
      label: t('contextDelete'), 
      icon: 'pi pi-trash', 
      className: 'text-red-500',
      command: () => confirmDeletion()
    }
  ], [t, selectedItem, folders, drafts, untitledLabel]);

  const confirmDeletion = () => {
    const typeLabel = selectedItem?.type === 'folder' ? t('typeFolder') : t('typeFile');
    confirmDialog({
      message: t('confirmDeleteMessage', { type: typeLabel }),
      header: t('confirmDeleteHeader'),
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        if (selectedItem?.type === 'folder') {
          deleteFolder(selectedItem.id);
        } else if (selectedItem?.id) {
          deleteDraft(selectedItem.id);
        }
        toast.current?.show({ severity: 'success', summary: t('toastDeletedSummary'), detail: t('toastDeletedDetail'), life: 3000 });
      }
    });
  };

  const handleRename = () => {
    if (!newName.trim()) return;
    if (selectedItem?.type === 'folder') {
      updateFolder(selectedItem.id, { name: newName });
    } else if (selectedItem?.id) {
      updateDraft(selectedItem.id, { subject: newName });
    }
    setIsRenameDialogVisible(false);
    toast.current?.show({ severity: 'success', summary: t('toastRenamedSummary'), detail: t('toastRenamedDetail'), life: 3000 });
  };

  const handleMove = () => {
    if (!selectedItem) return;
    
    if (selectedItem.type === 'folder' && selectedItem.id === targetFolderId) {
      toast.current?.show({ severity: 'error', summary: t('toastErrorSummary'), detail: t('toastMoveIntoSelf'), life: 3000 });
      return;
    }

    if (selectedItem.type === 'folder') {
      updateFolder(selectedItem.id, { parentId: targetFolderId });
    } else {
      updateDraft(selectedItem.id, { parentId: targetFolderId });
    }
    
    setIsMoveDialogVisible(false);
    toast.current?.show({ severity: 'success', summary: t('toastMovedSummary'), detail: t('toastMovedDetail'), life: 3000 });
  };

  const handleNewFolder = () => {
    const folder: Folder = {
      id: crypto.randomUUID(),
      name: t('defaults.newFolder'),
      parentId: currentFolderId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    addFolder(folder);
  };

  const handleNewLetter = () => {
    navigate('/new', { state: { parentId: currentFolderId } });
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <Toast ref={toast} />
      <ContextMenu model={menuItems} ref={cm} />
      
      <ExplorerActionBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortKey={sortKey}
        onSortChange={setSortKey}
        onNewFolder={handleNewFolder}
        onNewLetter={handleNewLetter}
      />

      {(currentContent.folders.length === 0 && currentContent.drafts.length === 0) ? (
        <div className="flex flex-column align-items-center justify-content-center p-8 text-500 surface-card border-round shadow-1 mt-4">
          <i className="pi pi-folder-open text-6xl mb-4"></i>
          <span className="text-xl">{t('emptyFolder')}</span>
          <div className="flex gap-2 mt-4">
            <Button label={t('newFolder')} icon="pi pi-folder-plus" onClick={handleNewFolder} className="p-button-text" />
            <Button label={t('newLetter')} icon="pi pi-plus" onClick={handleNewLetter} className="p-button-text" />
          </div>
        </div>
      ) : (
        <FileGrid>
          {currentContent.folders.map(folder => {
            const itemCount = drafts.filter(d => d.parentId === folder.id).length + folders.filter(f => f.parentId === folder.id).length;
            return (
              <FileGridItem 
                key={folder.id}
                id={folder.id}
                name={folder.name}
                type="folder"
                updatedAt={folder.updatedAt}
                itemCount={itemCount}
                onDoubleClick={handleItemDoubleClick}
                onContextMenu={handleContextMenu}
              />
            );
          })}
          {currentContent.drafts.map(draft => {
            const text = (draft.content || draft.body || '').trim();
            let snippet = text.substring(0, 100);
            if (text.length > 100) snippet += '...';
            return (
              <FileGridItem 
                key={draft.id}
                id={draft.id}
                name={draft.subject || untitledLabel}
                subtitle={draft.recipient || t('defaults.noRecipient')}
                snippet={snippet}
                type="file"
                updatedAt={draft.updatedAt}
                onDoubleClick={handleItemDoubleClick}
                onContextMenu={handleContextMenu}
              />
            );
          })}
        </FileGrid>
      )}

      <Dialog 
        header={t('renameItem')} 
        visible={isRenameDialogVisible} 
        style={{ width: '350px' }} 
        onHide={() => setIsRenameDialogVisible(false)}
        footer={
          <div>
            <Button label={t('cancel', { ns: 'common' })} onClick={() => setIsRenameDialogVisible(false)} className="p-button-text" />
            <Button label={t('rename', { ns: 'common' })} onClick={handleRename} autoFocus />
          </div>
        }
      >
        <div className="pt-2">
          <label htmlFor="rename" className="block mb-2 font-semibold text-sm">{t('newName')}</label>
          <InputText 
            id="rename" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            className="w-full" 
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
          />
        </div>
      </Dialog>

      <Dialog 
        header={t('moveToFolder')} 
        visible={isMoveDialogVisible} 
        style={{ width: '400px' }} 
        onHide={() => setIsMoveDialogVisible(false)}
        footer={
          <div>
            <Button label={t('cancel', { ns: 'common' })} onClick={() => setIsMoveDialogVisible(false)} className="p-button-text" />
            <Button label={t('move', { ns: 'common' })} onClick={handleMove} />
          </div>
        }
      >
        <div className="pt-2">
          <label className="block mb-2 font-semibold text-sm">{t('selectDestination')}</label>
          <div className="flex flex-column gap-2 max-h-15rem overflow-y-auto border-1 surface-border border-round p-2">
            <div 
              className={`p-2 cursor-pointer border-round hover:surface-hover ${targetFolderId === null ? 'surface-200' : ''}`}
              onClick={() => setTargetFolderId(null)}
            >
              <i className="pi pi-home mr-2 text-primary"></i> {t('homeRoot')}
            </div>
            {folders
              .filter(f => f.id !== selectedItem?.id)
              .map(f => (
              <div 
                key={f.id}
                className={`p-2 cursor-pointer border-round hover:surface-hover ${targetFolderId === f.id ? 'surface-200' : ''}`}
                onClick={() => setTargetFolderId(f.id)}
              >
                <i className="pi pi-folder mr-2 text-primary"></i> {f.name}
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
