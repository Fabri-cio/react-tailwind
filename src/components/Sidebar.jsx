import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaCashRegister, FaChartLine, FaTruckMoving, FaUser } from "react-icons/fa";

const SidebarMenu = React.memo(
  ({ title, icon: Icon, items, isOpen, toggleMenu }) => (
    <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
      <button
        aria-expanded={isOpen}
        className="px-3 w-full text-left flex items-center"
        onClick={toggleMenu}
      >
        <Icon className="inline-block w-6 h-6 mr-2 -mt-2" />
        {title}
      </button>
      {isOpen && (
        <ul className="pl-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="rounded hover:shadow hover:bg-blue-950 py-2"
            >
              <Link to={item.path} className="px-7">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
);

const Sidebar = ({ sidebarToggle }) => {
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
    },
    {
      title: "Prediccion Demanda",
      icon: FaChartLine,
      items: [
        { label: "Realizar Prediccion", path: "/realizar_prediccion" },
        { label: "Predicciones", path: "/ver_predicciones" },
      ],
    },
    {
      title: "Movimientos",
      icon: FaTruckMoving,
      items: [
        { label: "Lista Movimientos", path: "/ver_movimientos" },
      ],
    },
    {
      title: "Productos",
      icon: FaBox,
      items: [
        { label: "Categorias", path: "/categoria" },
        { label: "Proveedores", path: "/presentacion" },
        { label: "Productos", path: "/productos" },
      ],
    },
    {
      title: "Usuarios",
      icon: FaUser,
      items: [
        { label: "Lista de Usuarios", path: "/usuarios/lista" },
        { label: "Roles", path: "/usuarios/roles" },
        { label: "Agregar Usuario", path: "/usuarios/agregar" },
        { label: "Administrar Usuario", path: "/usuarios/administrar" },
      ],
    },
  ];

  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-gray-800 fixed h-full px-4 py-2`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Conquistador Admin</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
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
