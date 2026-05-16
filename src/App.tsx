import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { FileExplorerView } from "./components/views/FileExplorerView";
import { LetterEditor } from "./components/views/LetterEditor/LetterEditor";
import { DraftProvider } from "./context/DraftContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <DraftProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/letters" element={<FileExplorerView />} />
            <Route path="/letters/:id" element={<LetterEditor />} />
            <Route path="/new" element={<LetterEditor />} />
            <Route path="*" element={<Navigate to="/letters" replace />} />
          </Route>
        </Routes>
        <ConfirmDialog />
      </DraftProvider>
    </BrowserRouter>
  );
}

export default App;
