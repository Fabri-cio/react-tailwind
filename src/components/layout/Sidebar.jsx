import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../data/SidebarData";

const Sidebar = ({ sidebarToggle}) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-zinc-200 shadow-xl transform transition-transform duration-300 ease-in-out m-2 rounded-lg border-2 border-gray-400  
      ${sidebarToggle ? "-translate-x-full" : "translate-x-0"}`}
    >
      {/* Header con botón de cerrar en móviles */}
      <div className="p-5 text-center">
        <h1 className="text-2xl  text-gray-800">Sistema</h1>
      </div>

      <hr className="border-gray-400"/>

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
