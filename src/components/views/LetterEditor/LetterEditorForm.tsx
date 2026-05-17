import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { LetterData } from "../../../models/letterData";

interface LetterEditorFormProps {
  data: LetterData;
  onUpdate: (field: keyof LetterData, value: any) => void;
  onFocusField: (field: string | null) => void;
}

export function LetterEditorForm({
  data,
  onUpdate,
  onFocusField,
}: LetterEditorFormProps) {
  return (
    <div className="flex flex-column h-full w-full overflow-y-auto pr-3">
      <h2 className="mt-0 mb-5 text-900">Brief bearbeiten</h2>
      
      <div className="grid formgrid">
        {/* Row 1: Recipient and Sender */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea 
              id="recipient" 
              rows={5} 
              className="w-full" 
              value={data.recipient}
              onChange={(e) => onUpdate("recipient", e.target.value)}
              onFocus={() => onFocusField("recipient")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="recipient">Empfänger</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea 
              id="sender" 
              rows={5} 
              className="w-full" 
              value={data.sender}
              onChange={(e) => onUpdate("sender", e.target.value)}
              onFocus={() => onFocusField("sender")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="sender">Absender</label>
          </FloatLabel>
        </div>

        {/* Row 2: Notes and Info Block */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea 
              id="notes" 
              rows={4} 
              className="w-full" 
              value={data.notes}
              onChange={(e) => onUpdate("notes", e.target.value)}
              onFocus={() => onFocusField("notes")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="notes">Notizen</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea 
              id="info" 
              rows={4} 
              className="w-full" 
              value={data.info}
              onChange={(e) => onUpdate("info", e.target.value)}
              onFocus={() => onFocusField("info")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="info">Infobereich</label>
          </FloatLabel>
        </div>

        {/* Row 3: Date */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <Calendar 
              id="date" 
              className="w-full" 
              dateFormat="dd.mm.yy" 
              showIcon 
              value={data.date}
              onChange={(e) => onUpdate("date", e.value)}
              onFocus={() => onFocusField("date")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="date">Datum</label>
          </FloatLabel>
        </div>
        
        {/* Row 4: Subject */}
        <div className="col-12 mb-4">
          <FloatLabel>
            <InputText 
              id="subject" 
              className="w-full" 
              value={data.subject}
              onChange={(e) => onUpdate("subject", e.target.value)}
              onFocus={() => onFocusField("subject")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="subject">Betreff</label>
          </FloatLabel>
        </div>

        {/* Row 5: Content */}
        <div className="col-12 mb-4">
            <label className="text-sm text-600 block mb-2 font-medium">Inhalt</label>
            <Editor 
              style={{ height: '320px' }} 
              value={data.content}
              onTextChange={(e) => onUpdate("content", e.htmlValue || "")}
              onFocus={() => onFocusField("content")}
              onBlur={() => onFocusField(null)}
            />
        </div>

        {/* Row 6: Footer */}
        <div className="col-12 mb-4">
          <FloatLabel>
            <InputTextarea 
              id="footer" 
              rows={3} 
              className="w-full" 
              value={data.footer}
              onChange={(e) => onUpdate("footer", e.target.value)}
              onFocus={() => onFocusField("footer")}
              onBlur={() => onFocusField(null)}
            />
            <label htmlFor="footer">Fußzeile</label>
          </FloatLabel>
        </div>
      </div>
    </div>
  );
}

