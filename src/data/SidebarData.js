import {
  FaBox,
  FaBoxes,
  FaCashRegister,
  FaChartLine,
  FaUser,
  FaShoppingCart,
  FaRegFilePowerpoint,
} from "react-icons/fa";

export const menus = [
  {
    title: "Ventas",
    icon: FaCashRegister,
    items: [
      { label: "Realizar Venta", path: "/realizarVenta", roleRequired: ["Cajero", "admin", "Encargado de Tienda"] },
      { label: "Ventas", path: "/ventas", roleRequired: ["Encargado de Tienda", "admin"] },
      { label: "Clientes", path: "/clientes", roleRequired: ["Encargado de Tienda", "admin"] },
      // { label: "Productos Vendidos", path: "/ventas/detalleVentas" , },
    ],
    roleRequired: ["Cajero", "admin", "Encargado de Tienda"],
  },
  {
    title: "Predicción",
    icon: FaChartLine,
    items: [
      { label: "Realizar Predicción", path: "/seleccionarProducto" },
      { label: "Configuraciones de Modelos", path: "/configuracionesModelos" },
      { label: "Predicciones", path: "/predicciones" , roleRequired: ["admin"]},
    ],
    roleRequired: ["admin"],
  },
  {
    title: "Compras",
    icon: FaShoppingCart,
    roleRequired: ["admin", "Encargado de Tienda"],
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
      { label: "Tipo de Movimientos", path: "/tiposMovimientos", roleRequired: ["admin"] },
      { label: "Almacenes", path: "/almacenes", roleRequired: ["admin"] },
    ],
    roleRequired: ["admin", "Encargado de Tienda"],
  },
  {
    title: "Productos",
    icon: FaBox,
    roleRequired: ["admin"],
    items: [
      { label: "Productos", path: "/productos" },
      { label: "Categorias", path: "/categorias" },
      { label: "Proveedores", path: "/proveedores" },
    ],
  },
  {
    title: "Reportes",
    icon: FaRegFilePowerpoint,
    roleRequired: ["admin"],
    items: [
      { label: "Reportes", path: "/reportes" },
    ],
  },
  {
    title: "Usuarios",
    icon: FaUser,
    roleRequired: ["admin"],
    items: [
      { label: "Usuarios", path: "/usuarios" },
      { label: "Roles", path: "/roles" },
    ],
  },
];
