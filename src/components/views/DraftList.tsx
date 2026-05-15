import { useDrafts } from "../../context/DraftContext";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export function DraftList() {
  const { drafts } = useDrafts();
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Drafts</h2>
        <Button label="New Draft" icon="pi pi-plus" onClick={() => navigate("/new")} />
      </div>

      {drafts.length === 0 ? (
        <div className="p-4 surface-card border-round shadow-1 text-center text-500">
          No drafts found. Create a new one!
        </div>
      ) : (
        <ul className="list-none p-0 m-0">
          {drafts.map((draft) => (
            <li
              key={draft.id}
              className="p-3 mb-3 surface-card border-round shadow-1 cursor-pointer hover:surface-hover transition-colors transition-duration-150 border-left-3 border-primary"
              onClick={() => navigate(`/letters/${draft.id}`)}
            >
              <div className="font-semibold text-xl mb-2 text-color">
                {draft.subject || "Untitled Letter"}
              </div>
              <div className="text-500 text-sm flex gap-3">
                <span><i className="pi pi-user mr-1"></i>{draft.recipient || "No recipient"}</span>
                <span><i className="pi pi-calendar mr-1"></i>{new Date(draft.updatedAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
