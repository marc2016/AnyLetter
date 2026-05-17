import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ProgressSpinner } from "primereact/progressspinner";
import { LetterEditorForm } from "./LetterEditorForm";
import { LetterPreview } from "./LetterPreview";
import { useDrafts } from "../../../context/DraftContext";
import { LetterData } from "../../../models/letterData";
import {
  createEmptyDraft,
  draftToLetterData,
  letterDataToDraftPartial,
} from "../../../utils/letterDraftMapping";

export type { LetterData } from "../../../models/letterData";

export function LetterEditor() {
  const { t } = useTranslation("common");
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { drafts, addDraft, updateDraft, isLoading } = useDrafts();

  const [letterData, setLetterData] = useState<LetterData | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const creatingRef = useRef(false);

  useEffect(() => {
    if (location.pathname === "/new") {
      if (creatingRef.current) return;
      creatingRef.current = true;

      const newId = crypto.randomUUID();
      const parentId =
        (location.state as { parentId?: string | null } | null)?.parentId ?? null;
      addDraft(createEmptyDraft(newId, parentId));
      navigate(`/letters/${newId}`, { replace: true });
      return;
    }

    if (!id || isLoading) return;

    const draft = drafts.find((d) => d.id === id);
    if (!draft) {
      navigate("/letters", { replace: true });
      return;
    }

    setLetterData(draftToLetterData(draft));
  }, [id, location.pathname, location.state, drafts, isLoading, navigate, addDraft]);

  const handleUpdate = (field: keyof LetterData, value: LetterData[keyof LetterData]) => {
    if (!id || !letterData) return;

    const next = { ...letterData, [field]: value };
    setLetterData(next);
    updateDraft(id, letterDataToDraftPartial(next));
  };

  if (location.pathname === "/new" || isLoading || !letterData) {
    return (
      <div className="h-full w-full flex align-items-center justify-content-center surface-ground">
        <ProgressSpinner aria-label={t("loading")} />
      </div>
    );
  }

  return (
    <div className="h-full w-full surface-ground p-3">
      <Splitter className="h-full w-full shadow-2 border-round">
        <SplitterPanel size={50} minSize={30} className="p-4 bg-white">
          <LetterEditorForm
            data={letterData}
            onUpdate={handleUpdate}
            onFocusField={setFocusedField}
          />
        </SplitterPanel>
        <SplitterPanel
          size={50}
          minSize={30}
          className="p-4 surface-200 flex align-items-center justify-content-center overflow-hidden"
        >
          <LetterPreview data={letterData} focusedField={focusedField} />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
