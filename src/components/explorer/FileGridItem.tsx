import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'primereact/card';
import { formatAppDate } from '../../utils/formatAppDate';

const CARD_HEIGHT_PX = 220;

interface FileGridItemProps {
  id: string;
  name: string;
  type: 'file' | 'folder';
  updatedAt: number;
  onClick: (id: string, type: 'file' | 'folder') => void;
  onContextMenu: (e: React.MouseEvent, id: string, type: 'file' | 'folder') => void;
  subtitle?: string;
  snippet?: string;
  itemCount?: number;
}

export function FileGridItem({ id, name, type, updatedAt, onClick, onContextMenu, subtitle, snippet, itemCount }: FileGridItemProps) {
  const { t } = useTranslation('explorer');
  const isFolder = type === 'folder';
  const icon = isFolder ? 'pi-folder' : 'pi-file';
  const dateStr = formatAppDate(new Date(updatedAt));

  const header = (
    <div className="flex align-items-center gap-2 px-3 pt-3 pb-2 min-w-0">
      <i className={`pi ${icon} text-primary text-xl flex-shrink-0`}></i>
      <div className="font-semibold text-900 text-overflow-ellipsis overflow-hidden white-space-nowrap" title={name}>
        {name}
      </div>
    </div>
  );

  return (
    <div
      onClick={() => onClick(id, type)}
      onContextMenu={(e) => onContextMenu(e, id, type)}
      className="cursor-pointer select-none"
      style={{ height: CARD_HEIGHT_PX }}
    >
      <Card 
        header={header} 
        subTitle={dateStr}
        className="h-full shadow-2 hover:shadow-4 transition-all transition-duration-150 border-1 surface-border"
        pt={{
          root: { className: 'h-full' },
          body: { className: 'p-3 pt-0 h-full flex flex-column overflow-hidden' },
          subTitle: { className: 'text-xs text-500 mt-1 mb-2' },
          content: { className: 'flex-1 py-0 overflow-hidden min-h-0' }
        }}
      >
        <div className="flex flex-column h-full overflow-hidden">
          {isFolder ? (
            <div className="text-600 font-medium text-sm flex-1 overflow-hidden">
              {itemCount !== undefined
                ? t('grid.itemCount', { count: itemCount })
                : t('grid.folder')}
            </div>
          ) : (
            <div className="flex-1 overflow-hidden min-h-0">
              {subtitle && (
                <div
                  className="text-xs font-semibold text-600 mb-2 text-overflow-ellipsis overflow-hidden white-space-nowrap"
                  title={subtitle}
                >
                  {subtitle}
                </div>
              )}
              <div className="text-sm text-700 line-height-3" style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden' 
              }}>
                {snippet || <span className="text-400 font-italic">{t('defaults.noContent')}</span>}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
