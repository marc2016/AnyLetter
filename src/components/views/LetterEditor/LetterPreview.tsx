import { LetterData } from "../../../models/letterData";

interface LetterPreviewProps {
  data: LetterData;
  focusedField: string | null;
}

export function LetterPreview({ data, focusedField }: LetterPreviewProps) {
  return (
    <div className="w-full h-full overflow-auto flex align-items-start justify-content-center p-4">
      {/* Scope styles for premium highlighting and transitions */}
      <style>{`
        .preview-field {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          outline: 1px dashed transparent;
          outline-offset: 4px;
          border-radius: 3px;
        }
        .preview-field.active-highlight {
          outline: 2px dashed var(--primary-color, #3b82f6);
          outline-offset: 6px;
          background-color: rgba(59, 130, 246, 0.04);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.15);
        }
        /* Style list bullets and text inside rich text container to look neat */
        .preview-rich-content ul, .preview-rich-content ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .preview-rich-content p {
          margin: 0 0 0.5rem 0;
        }
      `}</style>

      <div 
        className="bg-white shadow-4 relative text-color-secondary overflow-hidden select-none"
        style={{
          width: "210mm",
          height: "297mm",
          minWidth: "210mm",
          minHeight: "297mm",
          containerType: "inline-size",
          color: "#2c3e50"
        }}
      >
        {/* Fold and Punch Marks */}
        {/* Fold Mark 1 (105mm -> ~35.35% height) */}
        <div 
          className="absolute left-0" 
          style={{ top: "35.35%", width: "15px", height: "1px", backgroundColor: "#a0aec0" }} 
          title="Falzmarke 1" 
        />
        {/* Punch Hole Mark (148.5mm -> 50% height) */}
        <div 
          className="absolute left-0" 
          style={{ top: "50%", width: "10px", height: "1px", backgroundColor: "#a0aec0" }} 
          title="Lochmarke" 
        />
        {/* Fold Mark 2 (210mm -> ~70.7% height) */}
        <div 
          className="absolute left-0" 
          style={{ top: "70.7%", width: "15px", height: "1px", backgroundColor: "#a0aec0" }} 
          title="Falzmarke 2" 
        />

        {/* Sender Line (Rücksendeangabe) */}
        <div 
          className={`absolute preview-field ${focusedField === 'sender' ? 'active-highlight' : ''}`}
          style={{ 
            top: "10.1%", 
            left: "9.5%", 
            width: "40%", 
            fontSize: "1.1cqw", 
            borderBottom: "0.5px solid #dcdde1", 
            paddingBottom: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {data.sender ? data.sender.replace(/\n/g, ' • ') : "Absenderzeile (Zusatz- und Vermerkzone)"}
        </div>

        {/* Notes Block */}
        <div 
          className={`absolute preview-field ${focusedField === 'notes' ? 'active-highlight' : ''}`}
          style={{ 
            top: "13.2%", 
            left: "9.5%", 
            width: "40%", 
            fontSize: "1.3cqw", 
            fontStyle: "italic",
            color: "#7f8c8d"
          }}
        >
          {data.notes || "Zusatz- und Vermerkzone (z.B. Einschreiben)"}
        </div>

        {/* Recipient Address */}
        <div 
          className={`absolute preview-field ${focusedField === 'recipient' ? 'active-highlight' : ''}`}
          style={{ 
            top: "17.2%", 
            left: "9.5%", 
            width: "40%", 
            fontSize: "1.5cqw", 
            lineHeight: "1.4",
            whiteSpace: "pre-line"
          }}
        >
          {data.recipient || "Empfängeradresse\nName des Empfängers\nStraße und Hausnummer\nPLZ und Ort"}
        </div>

        {/* Date */}
        <div 
          className={`absolute preview-field text-right ${focusedField === 'date' ? 'active-highlight' : ''}`}
          style={{ 
            top: "10.1%", 
            left: "60.0%", 
            width: "30.5%", 
            fontSize: "1.5cqw"
          }}
        >
          {data.date ? data.date.toLocaleDateString('de-DE') : new Date().toLocaleDateString('de-DE')}
        </div>

        {/* Info Block below date */}
        <div 
          className={`absolute preview-field ${focusedField === 'info' ? 'active-highlight' : ''}`}
          style={{ 
            top: "14.5%", 
            left: "60.0%", 
            width: "30.5%", 
            fontSize: "1.3cqw", 
            lineHeight: "1.4",
            whiteSpace: "pre-line",
            color: "#7f8c8d"
          }}
        >
          {data.info || "Ihr Zeichen:\nUnser Zeichen:\nTelefon:\nE-Mail:"}
        </div>

        {/* Subject (Betreff) */}
        <div 
          className={`absolute preview-field font-bold ${focusedField === 'subject' ? 'active-highlight' : ''}`}
          style={{ 
            top: "35.0%", 
            left: "12.0%", 
            width: "76.0%", 
            fontSize: "2.0cqw",
            color: "#2c3e50"
          }}
        >
          {data.subject || "Betreffzeile"}
        </div>

        {/* Body Content */}
        <div 
          className={`absolute preview-field preview-rich-content ${focusedField === 'content' ? 'active-highlight' : ''}`}
          style={{ 
            top: "42.0%", 
            left: "12.0%", 
            width: "76.0%", 
            bottom: "12%", 
            fontSize: "1.6cqw", 
            lineHeight: "1.6",
            overflow: "hidden",
            color: "#2c3e50"
          }}
        >
          {data.content ? (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : (
            <div style={{ color: "#bdc3c7" }}>
              <p>Sehr geehrte Damen und Herren,</p>
              <p>hier steht Ihr Brieftext. Der Text wird mit allen Formatierungen aus dem Editor live auf das DIN A4 Blatt projiziert.</p>
              <p>Mit freundlichen Grüßen,</p>
              <p>Ihr Name</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className={`absolute preview-field text-center ${focusedField === 'footer' ? 'active-highlight' : ''}`}
          style={{ 
            bottom: "4%", 
            left: "12.0%", 
            width: "76.0%", 
            fontSize: "1.2cqw", 
            borderTop: "0.5px solid #dcdde1", 
            paddingTop: "6px",
            color: "#7f8c8d",
            whiteSpace: "pre-line"
          }}
        >
          {data.footer || "Sparkasse Musterstadt • IBAN: DE12 3456 7890 • BIC: WELADED1XXX"}
        </div>
      </div>
    </div>
  );
}

