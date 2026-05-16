import React from 'react';
import { Card } from 'primereact/card';

interface FileGridItemProps {
  id: string;
  name: string;
  type: 'file' | 'folder';
  updatedAt: number;
  onDoubleClick: (id: string, type: 'file' | 'folder') => void;
  onContextMenu: (e: React.MouseEvent, id: string, type: 'file' | 'folder') => void;
  subtitle?: string;
  snippet?: string;
  itemCount?: number;
}

export function FileGridItem({ id, name, type, updatedAt, onDoubleClick, onContextMenu, subtitle, snippet, itemCount }: FileGridItemProps) {
  const isFolder = type === 'folder';
  const icon = isFolder ? 'pi-folder' : 'pi-file';
  const dateStr = new Date(updatedAt).toLocaleDateString();

  const header = (
    <div className="flex align-items-center gap-2 px-3 pt-3 pb-2">
      <i className={`pi ${icon} text-primary text-xl`}></i>
      <div className="font-semibold text-900 text-overflow-ellipsis overflow-hidden white-space-nowrap" title={name}>
        {name}
      </div>
    </div>
  );

  return (
    <div
      onDoubleClick={() => onDoubleClick(id, type)}
      onContextMenu={(e) => onContextMenu(e, id, type)}
      className="cursor-pointer select-none h-full"
    >
      <Card 
        header={header} 
        subTitle={dateStr}
        className="h-full shadow-2 hover:shadow-4 transition-all transition-duration-150 border-1 surface-border"
        pt={{
          body: { className: 'p-3 pt-0 h-full flex flex-column' },
          subTitle: { className: 'text-xs text-500 mt-1 mb-2' },
          content: { className: 'flex-1 py-0' }
        }}
      >
        <div className="flex flex-column h-full">
          {isFolder ? (
            <div className="text-600 font-medium text-sm flex-1">
              {itemCount !== undefined ? `${itemCount} item${itemCount !== 1 ? 's' : ''}` : 'Folder'}
            </div>
          ) : (
            <div className="flex-1">
              {subtitle && <div className="text-xs font-semibold text-600 mb-2">{subtitle}</div>}
              <div className="text-sm text-700 line-height-3" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {snippet || <span className="text-400 font-italic">No content</span>}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
