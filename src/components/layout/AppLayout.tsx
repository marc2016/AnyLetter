import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex flex-column h-screen w-screen m-0 p-0 overflow-hidden surface-ground">
      <header className="flex align-items-center px-4 py-2 surface-overlay border-bottom-1 border-300">
        <h1 className="text-xl font-semibold m-0 text-color">AnyLetter</h1>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
