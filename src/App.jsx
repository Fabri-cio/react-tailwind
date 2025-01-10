import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        {/* Todas las rutas se gestionan dentro de AppRoutes */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
