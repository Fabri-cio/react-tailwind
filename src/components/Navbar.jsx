import React from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar({ sidebarToggle, setSidebarToggle }) {
  return (
    // ml-64 esto es cuando se adecua a la derecha y se mueve a la condicion de dashboard
    <nav className="bg-gray-700 px-4 py-3 flex justify-between">
      {/* caja 1 */}
      <div className="flex items-center text-xl">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold">Panel de Navegación</span>
      </div>
      {/* caja 2 */}
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus-outline-none text-white md:text-black">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
          />
        </div>
      </div>
      {/* caja 3 */}
      <div className="text-white">
        <FaBell className="w-6 h-6" />
      </div>

      {/* caja 4 */}
      <div className="relative">
        <button className="text-white group">
          <FaUserCircle className="w-6 h-6 mt-1" />
          <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
            <ul className="py-2 text-sm text-gray-950">
              <li>
                <a href="">Perfil</a>
              </li>
              <li>
                <a href="">Configuración</a>
              </li>
              <li>
                <a href="">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
