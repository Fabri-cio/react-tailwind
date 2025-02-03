import React, { useState, useEffect } from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";

const NavbarButton = ({ icon: Icon, onClick, label, className }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`p-1 focus:outline-none ${className}`}
  >
    <Icon className="w-6 h-6" />
  </button>
);

const ProfileMenu = ({ logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#profile-menu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div id="profile-menu" className="relative">
      <button
        className="text-white"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <FaUserCircle className="w-6 h-6 mt-1" />
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg shadow w-32 top-full right-0">
          <ul className="py-2 text-sm text-gray-950">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Perfil
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Configuración
              </a>
            </li>
            <li>
              <button
                onClick={logoutUser}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    AxiosInstance.post(`api/v1/usuarios/logoutall/`, {})
      .then((response) => {
        console.log("Sesión Cerrada:", response.data);
        localStorage.removeItem("Token");
        localStorage.setItem("sessionClosed", "true"); // Marcar que la sesión ha sido cerrada
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Error al cerrar sesión");
      });
  };

  return (
    <nav className="bg-gray-700 px-4 py-3 flex justify-between items-center">
      {/* Menú lateral y título */}
      <div className="flex items-center text-xl">
        <NavbarButton
          icon={FaBars}
          onClick={() => setSidebarToggle(!sidebarToggle)}
          label="Toggle Sidebar"
          className="text-white me-4"
        />
        <span className="text-white font-semibold">Panel de Navegación</span>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-64">
          <NavbarButton
            icon={FaSearch}
            label="Buscar"
            className="absolute inset-y-0 left-0 pl-2 text-white"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-1 pl-10 rounded shadow outline-none hidden md:block"
          />
        </div>
      </div>

      {/* Notificación */}
      <NavbarButton
        icon={FaBell}
        label="Notificaciones"
        className="text-white"
      />

      {/* Menú de perfil */}
      <ProfileMenu logoutUser={logoutUser} />
    </nav>
  );
};

export default Navbar;
