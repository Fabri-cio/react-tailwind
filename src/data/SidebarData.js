import {
  FaBox,
  FaBoxes,
  FaCashRegister,
  FaChartLine,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

export const menus = [
  {
    title: "Ventas",
    icon: FaCashRegister,
    items: [
      { label: "Realizar Venta", path: "/realizarVenta" },
      { label: "Ventas", path: "/ventas", roleRequired: "Cajero" || "admin" },
      // { label: "Productos Vendidos", path: "/ventas/detalleVentas" , },
    ],
    roleRequired: "admin",
  },
  {
    title: "Predicción",
    icon: FaChartLine,
    items: [
      { label: "Realizar Predicción", path: "/seleccionarProducto" },
      { label: "Configuraciones de Modelos", path: "/configuracionesModelos" },
    ],
    roleRequired: "admin",
  },
  {
    title: "Compras",
    icon: FaShoppingCart,
    roleRequired: "admin",
    items: [
      { label: "Pedidos", path: "/pedidos" },
      { label: "Compras", path: "/compras" },
    ],
  },
  {
    title: "Inventarios",
    icon: FaBoxes,
    items: [
      { label: "Inventarios", path: "/inventarios" },
      { label: "Movimientos", path: "/movimientos" },
      { label: "Tipo de Movimientos", path: "/tiposMovimientos" },
      { label: "Almacenes", path: "/almacenes" },
    ],
  },
  {
    title: "Productos",
    icon: FaBox,
    roleRequired: "admin",
    items: [
      { label: "Productos", path: "/productos" },
      { label: "Categorias", path: "/categorias" },
      { label: "Proveedores", path: "/proveedores" },
    ],
  },
  {
    title: "Usuarios",
    icon: FaUser,
    roleRequired: "admin",
    items: [
      { label: "Usuarios", path: "/usuarios" },
      { label: "Roles", path: "/roles" },
    ],
  },
];
