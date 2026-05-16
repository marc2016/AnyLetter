import { Splitter, SplitterPanel } from "primereact/splitter";
import { LetterEditorForm } from "./LetterEditorForm";
import { LetterPreview } from "./LetterPreview";

export function LetterEditor() {
  return (
    <div className="h-full w-full surface-ground p-3">
      <Splitter className="h-full w-full shadow-2 border-round">
        <SplitterPanel size={50} minSize={30} className="p-4 bg-white">
          <LetterEditorForm />
        </SplitterPanel>
        <SplitterPanel size={50} minSize={30} className="p-4 surface-200 flex align-items-center justify-content-center overflow-hidden">
          <LetterPreview />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
