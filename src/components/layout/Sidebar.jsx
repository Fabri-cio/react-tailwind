import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../data/SidebarData";

const Sidebar = ({ sidebarToggle, closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out
      ${sidebarToggle ? "-translate-x-full" : "translate-x-0"}`}
    >
      {/* Header con botón de cerrar en móviles */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">Conquistador Admin</h1>
        <button onClick={closeSidebar} className="text-white text-2xl lg:hidden">
          <FaTimes />
        </button>
      </div>

      {/* Menú de navegación */}
      <ul className="mt-4 px-4 space-y-2">
        {menus.map((menu, index) => (
          <SidebarMenu
            key={index}
            title={menu.title}
            icon={menu.icon}
            items={menu.items}
            isOpen={openMenu === menu.title}
            toggleMenu={() =>
              setOpenMenu(openMenu === menu.title ? null : menu.title)
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
