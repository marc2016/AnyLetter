import { useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { LetterEditorForm } from "./LetterEditorForm";
import { LetterPreview } from "./LetterPreview";

export interface LetterData {
  sender: string;
  recipient: string;
  notes: string;
  info: string;
  date: Date | null;
  subject: string;
  content: string;
  footer: string;
}

export function LetterEditor() {
  const [letterData, setLetterData] = useState<LetterData>({
    sender: "",
    recipient: "",
    notes: "",
    info: "",
    date: null,
    subject: "",
    content: "",
    footer: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleUpdate = (field: keyof LetterData, value: any) => {
    setLetterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        <SplitterPanel size={50} minSize={30} className="p-4 surface-200 flex align-items-center justify-content-center overflow-hidden">
          <LetterPreview 
            data={letterData} 
            focusedField={focusedField}
          />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

