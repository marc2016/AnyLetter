import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";

export function LetterEditorForm() {
  return (
    <div className="flex flex-column h-full w-full overflow-y-auto pr-3">
      <h2 className="mt-0 mb-5 text-900">Brief bearbeiten</h2>
      
      <div className="grid formgrid">
        {/* Row 1: Recipient and Sender */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea id="recipient" rows={5} className="w-full" autoResize />
            <label htmlFor="recipient">Empfänger</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea id="sender" rows={5} className="w-full" autoResize />
            <label htmlFor="sender">Absender</label>
          </FloatLabel>
        </div>

        {/* Row 2: Notes and Info Block */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea id="notes" rows={4} className="w-full" autoResize />
            <label htmlFor="notes">Notizen</label>
          </FloatLabel>
        </div>
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputTextarea id="info" rows={4} className="w-full" autoResize />
            <label htmlFor="info">Infobereich</label>
          </FloatLabel>
        </div>

        {/* Row 3: Date */}
        <div className="col-12 md:col-6 mb-4">
          <FloatLabel>
            <Calendar id="date" className="w-full" dateFormat="dd.mm.yy" showIcon />
            <label htmlFor="date">Datum</label>
          </FloatLabel>
        </div>
        
        {/* Row 4: Subject */}
        <div className="col-12 mb-4">
          <FloatLabel>
            <InputText id="subject" className="w-full" />
            <label htmlFor="subject">Betreff</label>
          </FloatLabel>
        </div>

        {/* Row 5: Content */}
        <div className="col-12 mb-4">
            <label className="text-sm text-600 block mb-2 font-medium">Inhalt</label>
            <Editor style={{ height: '320px' }} />
        </div>

        {/* Row 6: Footer */}
        <div className="col-12 mb-4">
          <FloatLabel>
            <InputTextarea id="footer" rows={3} className="w-full" autoResize />
            <label htmlFor="footer">Fußzeile</label>
          </FloatLabel>
        </div>
      </div>
    </div>
  );
}
