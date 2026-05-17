import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

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
  onNewLetter,
}: ExplorerActionBarProps) {
  const { t } = useTranslation("explorer");

  const sortOptions = useMemo(
    () => [
      { label: t("sortDate"), value: "updatedAt" },
      { label: t("sortName"), value: "name" },
    ],
    [t],
  );

  return (
    <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div className="flex align-items-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="p-inputtext-sm"
          />
        </span>
        <Dropdown
          value={sortKey}
          options={sortOptions}
          onChange={(e) => onSortChange(e.value)}
          placeholder={t("sortBy")}
          className="p-dropdown-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button
          label={t("newFolder")}
          icon="pi pi-folder-plus"
          onClick={onNewFolder}
          className="p-button-outlined p-button-sm"
        />
        <Button
          label={t("newLetter")}
          icon="pi pi-plus"
          onClick={onNewLetter}
          className="p-button-sm"
        />
      </div>
    </div>
  );
}
