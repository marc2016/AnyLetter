import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DraftList } from "./components/views/DraftList";
import { Editor } from "./components/views/Editor";
import { DraftProvider } from "./context/DraftContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <DraftProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/letters" element={<DraftList />} />
            <Route path="/letters/:id" element={<Editor />} />
            <Route path="/new" element={<Editor />} />
            <Route path="*" element={<Navigate to="/letters" replace />} />
          </Route>
        </Routes>
      </DraftProvider>
    </BrowserRouter>
  );
}

export default App;
