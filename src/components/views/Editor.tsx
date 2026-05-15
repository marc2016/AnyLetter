import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDrafts } from "../../context/DraftContext";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export function Editor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { drafts, addDraft, updateDraft, deleteDraft } = useDrafts();

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const isNew = !id;

  useEffect(() => {
    if (id) {
      const draft = drafts.find((d) => d.id === id);
      if (draft) {
        setRecipient(draft.recipient);
        setSubject(draft.subject);
        setBody(draft.body);
      } else {
        // Not found
        navigate("/letters", { replace: true });
      }
    } else {
      setRecipient("");
      setSubject("");
      setBody("");
    }
  }, [id, drafts, navigate]);

  const handleSave = () => {
    if (isNew) {
      const newId = crypto.randomUUID();
      addDraft({
        id: newId,
        recipient,
        subject,
        body,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      navigate(`/letters/${newId}`, { replace: true });
    } else {
      updateDraft(id, { recipient, subject, body });
    }
  };

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this draft?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        if (id) {
          deleteDraft(id);
        }
        navigate("/letters");
      }
    });
  };

  return (
    <div className="flex flex-column h-full">
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center p-3 border-bottom-1 surface-border surface-card">
        <div className="flex align-items-center gap-3">
          <Button icon="pi pi-arrow-left" text rounded aria-label="Back" onClick={() => navigate("/letters")} />
          <h2 className="m-0 text-xl font-medium text-color">{isNew ? "New Draft" : "Edit Draft"}</h2>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button 
              icon="pi pi-trash" 
              severity="danger" 
              outlined 
              onClick={handleDelete} 
              tooltip="Delete Draft"
              tooltipOptions={{ position: 'bottom' }}
            />
          )}
          <Button 
            icon="pi pi-save" 
            label="Save" 
            onClick={handleSave} 
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto surface-ground flex justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full max-w-screen-md flex flex-column gap-4">
          <div className="flex flex-column gap-2">
            <label htmlFor="recipient" className="font-semibold text-color">Recipient</label>
            <InputText 
              id="recipient" 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)} 
              onBlur={handleSave}
              placeholder="e.g. John Doe"
              className="w-full p-inputtext-lg"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="subject" className="font-semibold text-color">Subject</label>
            <InputText 
              id="subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              onBlur={handleSave}
              placeholder="Letter subject..."
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2 flex-1">
            <label htmlFor="body" className="font-semibold text-color">Message Body</label>
            <InputTextarea 
              id="body" 
              value={body} 
              onChange={(e) => setBody(e.target.value)} 
              onBlur={handleSave}
              rows={15} 
              className="w-full flex-1 resize-none text-base"
              placeholder="Write your plain text letter here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
