import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

interface ExplorerActionBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortKey: string;
  onSortChange: (key: string) => void;
  onNewFolder: () => void;
  onNewLetter: () => void;
}

export function ExplorerActionBar({ 
  searchQuery, 
  onSearchChange, 
  sortKey, 
  onSortChange, 
  onNewFolder, 
  onNewLetter 
}: ExplorerActionBarProps) {
  const sortOptions = [
    { label: 'Date', value: 'updatedAt' },
    { label: 'Name', value: 'name' }
  ];

  return (
    <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div className="flex align-items-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText 
            value={searchQuery} 
            onChange={(e) => onSearchChange(e.target.value)} 
            placeholder="Search..." 
            className="p-inputtext-sm"
          />
        </span>
        <Dropdown 
          value={sortKey} 
          options={sortOptions} 
          onChange={(e) => onSortChange(e.value)} 
          placeholder="Sort by" 
          className="p-dropdown-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          label="New Folder" 
          icon="pi pi-folder-plus" 
          onClick={onNewFolder} 
          className="p-button-outlined p-button-sm" 
        />
        <Button 
          label="New Letter" 
          icon="pi pi-plus" 
          onClick={onNewLetter} 
          className="p-button-sm" 
        />
      </div>
    </div>
  );
}
