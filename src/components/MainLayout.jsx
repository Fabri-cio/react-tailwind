import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Escuchar cambios en el localStorage
    const handleStorageChange = (event) => {
      if (event.key === "sessionClosed" && event.newValue === "true") {
        // Si la sesión ha sido cerrada en otra pestaña, redirigir a la página de login
        navigate("/login");
      }
    };

    // Añadir el listener del evento storage
    window.addEventListener("storage", handleStorageChange);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const mainClass = clsx("w-full", {
    "ml-0": sidebarToggle,
    "ml-64": !sidebarToggle,
  });

  return (
    <div className="flex">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={mainClass}>
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
