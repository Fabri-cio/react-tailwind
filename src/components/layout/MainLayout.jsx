import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  // Inicializa sidebarVisible según pantalla
  const [sidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 768
  );

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "sessionClosed" && event.newValue === "true") {
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // Detectar cambios de tamaño para mostrar/ocultar sidebar automáticamente
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // En desktop siempre mostrar
        setSidebarVisible(true);
      } else {
        // En mobile ocultar automáticamente
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isVisible={sidebarVisible} />

      <div className="flex-1 flex flex-col h-screen">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full min-h-[200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
