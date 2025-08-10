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
      { label: "Realizar Venta", path: "/registrarVenta" },
      { label: "Ventas", path: "/ventas" },
      { label: "Productos Vendidos", path: "/ventas/detalleVentas" },
    ],
    roleRequired: "Cajero",
  },
  {
    title: "Predicción",
    icon: FaChartLine,
    items: [{ label: "Realizar Predicción", path: "/realizar_prediccion" }],
  },
  {
    title: "Compras",
    icon: FaShoppingCart,
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
    items: [
      { label: "Productos", path: "/productos" },
      { label: "Categorias", path: "/categorias" },
      { label: "Proveedores", path: "/proveedores" },
    ],
  },
  {
    title: "Usuarios",
    icon: FaUser,
    items: [
      { label: "Usuarios", path: "/usuarios" },
      { label: "Roles", path: "/roles" },
    ],
  },
];
