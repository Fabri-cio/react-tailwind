import React from "react";
import { NavLink } from "react-router-dom";
import { ActionButton } from "../shared/ActionButton";

// Función para optimizar la clase activa de NavLink
const getNavLinkClass = (isActive) =>
  `block px-4 py-2 rounded-lg transition-all duration-200 hover:text-white ${
    isActive ? "bg-gray-700 text-white" : "text-gray-700 hover:bg-gray-700"
  }`;

const SidebarMenu = ({
  title,
  icon: Icon,
  items,
  isOpen,
  toggleMenu,
  userRole,
}) => {
  // Filtrar subitems según rol
  const filteredItems = items.filter((item) => {
    if (!item.roleRequired) return true;
    if (Array.isArray(item.roleRequired)) {
      return item.roleRequired.includes(userRole);
    }
    return item.roleRequired === userRole;
  });

  // Si no hay subitems visibles, puedes optar por no mostrar submenú
  // O mostrar título sin subitems (según UX que prefieras)
  return (
    <li>
      <ActionButton
        label={title}
        estilos={`flex items-center w-full px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:text-white text-gray-700 ${
          isOpen ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-black-300"
        }`}
        onClick={toggleMenu}
        icon={Icon}
      />

      {isOpen && filteredItems.length > 0 && (
        <ul className="mt-2 pl-6 space-y-1">
          {filteredItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenu;
