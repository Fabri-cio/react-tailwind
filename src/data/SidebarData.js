import {
  FaBox,
  FaBoxes,
  FaCashRegister,
  FaChartLine,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";

export const menus = [
  {
    title: "Ventas",
    icon: FaCashRegister,
    items: [
      { label: "Realizar Venta", path: "/ventas/realizar" },
      { label: "Ventas", path: "/ventas" },
      { label: "Productos Vendidos", path: "/ventas/detalleVentas" },
      { label: "Reportes", path: "/ventas/reportes" },
    ],
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
