// Sidebar.jsx
import { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../../data/SidebarData";
import { FaCrown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ isVisible }) => {
  const { user } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);

  const filteredMenus = menus.filter((menu) => {
    if (!menu.roleRequired) return true;
    return menu.roleRequired.some((role) => user?.rol?.includes(role));
  });

  return (
    <div
      className={`sticky z-50 shadow w-64 transition-all duration-300 ${
        isVisible ? "flex flex-col" : "hidden"
      } h-[calc(100vh)]`}
    >
      {/* Título */}
      <div className="p-4 px-6 text-center flex items-center gap-2 bg-red-500">
        <FaCrown className="text-white text-2xl" />
        <h1 className="text-white text-xl font-bold">Conquistador</h1>
      </div>

      {/* Sección Perfil */}
      <div className="px-4 py-6 border-b flex flex-col items-center justify-center text-center bg-orange-500">
        <div className="mb-3">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
            {user?.fullName
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0].toUpperCase())
              .join("")}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white">{user?.fullName}</p>
          <p className="text-xs text-white">{user?.email}</p>
        </div>
      </div>

      {/* Menú con scroll */}
      <div className="flex-1 overflow-y-auto">
        <ul className="px-2 space-y-2">
          {filteredMenus.map((menu, index) => (
            <SidebarMenu
              key={index}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
              userRoles={user?.rol}
              isOpen={openMenu === menu.title}
              toggleMenu={() =>
                setOpenMenu(openMenu === menu.title ? null : menu.title)
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
