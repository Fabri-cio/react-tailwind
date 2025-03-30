import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // Importamos Navbar directamente

const MainLayout = () => {
  const navigate = useNavigate();
  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "sessionClosed" && event.newValue === "true") {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo */}
      <Sidebar sidebarToggle={sidebarToggle} />

      {/* Contenedor principal con Navbar fijo y contenido desplazable */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarToggle ? "ml-0" : "ml-64"
        }`}
      >
        {/* Navbar fijo */}
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        {/* Contenido desplazable */}
        <div className="flex-1 overflow-auto p-1 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
