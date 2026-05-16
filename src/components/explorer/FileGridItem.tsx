import React from 'react';

interface FileGridItemProps {
  id: string;
  name: string;
  type: 'file' | 'folder';
  updatedAt: number;
  onDoubleClick: (id: string, type: 'file' | 'folder') => void;
  onContextMenu: (e: React.MouseEvent, id: string, type: 'file' | 'folder') => void;
  subtitle?: string;
}

export function FileGridItem({ id, name, type, updatedAt, onDoubleClick, onContextMenu, subtitle }: FileGridItemProps) {
  const icon = type === 'folder' ? 'pi-folder' : 'pi-file';
  const dateStr = new Date(updatedAt).toLocaleDateString();

  return (
    <div 
      className="flex flex-column align-items-center p-3 cursor-pointer hover:surface-hover border-round transition-colors transition-duration-150 select-none"
      onDoubleClick={() => onDoubleClick(id, type)}
      onContextMenu={(e) => onContextMenu(e, id, type)}
      style={{ width: '120px' }}
    >
      <div className="flex align-items-center justify-content-center mb-2" style={{ height: '64px' }}>
        <i className={`pi ${icon} text-primary`} style={{ fontSize: '3rem' }}></i>
      </div>
      <span className="text-center font-semibold text-900 text-overflow-ellipsis overflow-hidden white-space-nowrap w-full" title={name}>
        {name}
      </span>
      <span className="text-center text-500 text-xs mt-1">
        {subtitle || dateStr}
      </span>
    </div>
  );
}
