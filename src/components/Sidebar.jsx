import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaBoxes,
  FaCashRegister,
  FaChartLine,
  FaTruckMoving,
  FaUser,
  FaTimes,
} from "react-icons/fa";

const SidebarMenu = ({ title, icon: Icon, items, isOpen, toggleMenu }) => (
  <li>
    <button
      className={`flex items-center w-full px-4 py-3 text-lg font-semibold rounded-lg transition-all duration-300
      ${isOpen ? "bg-blue-600 text-white" : "hover:bg-gray-700 text-gray-300"}`}
      onClick={toggleMenu}
    >
      <Icon className="text-xl mr-3" />
      {title}
    </button>
    {isOpen && (
      <ul className="mt-2 pl-6 space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-blue-500 transition-all duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </li>
);

const Sidebar = ({ sidebarToggle, closeSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const menus = [
    {
      title: "Ventas",
      icon: FaCashRegister,
      items: [
        { label: "Realizar Venta", path: "/ventas/realizar" },
        { label: "Ventas", path: "/ventas/ver" },
        { label: "Productos Vendidos", path: "/ventas/detalleVentas" },
        { label: "Reportes", path: "/ventas/reportes" },
      ],
      // Solo mostrar para 'Cajero'
      roleRequired: "Cajero",
    },
    {
      title: "Predicción",
      icon: FaChartLine,
      items: [{ label: "Realizar Predicción", path: "/realizar_prediccion" }],
    },
    {
      title: "Movimientos",
      icon: FaTruckMoving,
      items: [{ label: "Lista Movimientos", path: "/ver_movimientos" }],
    },
    {
      title: "Inventario",
      icon: FaBoxes,
      items: [{ label: "Ver Inventario", path: "/ver_inventario" }],
    },
    {
      title: "Productos",
      icon: FaBox,
      items: [
        { label: "Productos", path: "/productList" },
        { label: "Categorias", path: "/categorias" },
        { label: "Proveedores", path: "/proveedores" },
      ],
    },
    {
      title: "Usuarios",
      icon: FaUser,
      items: [{ label: "Lista de Usuarios", path: "/userList" }],
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out
      ${sidebarToggle ? "-translate-x-full" : "translate-x-0"}`}
    >
      {/* Header con botón de cerrar en móviles */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">Conquistador Admin</h1>
        <button
          onClick={closeSidebar}
          className="text-white text-2xl lg:hidden"
        >
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
