import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainView = location.pathname === "/letters" || location.pathname === "/";

  return (
    <div className="flex flex-column h-screen w-screen m-0 p-0 overflow-hidden surface-ground">
      <header className="flex align-items-center px-4 py-2 surface-overlay border-bottom-1 border-300 gap-3">
        {!isMainView && (
          <Button 
            icon="pi pi-arrow-left" 
            className="p-button-text p-button-secondary p-button-sm" 
            onClick={() => navigate("/letters")}
            label="Zurück"
          />
        )}
        <h1 
          className="text-xl font-semibold m-0 text-color cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate("/letters")}
        >
          AnyLetter
        </h1>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

