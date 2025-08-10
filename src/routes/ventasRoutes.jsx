import { lazy } from "react";

const RegistrarVenta = lazy(() => import("../data/ventas/venta/RegistrarVenta"));
const Ventas = lazy(() => import("../data/ventas/venta/Ventas"));
const DetallesVenta = lazy(() => import("../data/ventas/detalleVenta/DetallesVenta"));
export const ventasRoutes = [
  //ventas
  {
    path: "/registrarVenta",
    element: <RegistrarVenta />,
  },
  {
    path: "/ventas",
    element: <Ventas/>,
  },
  {
    path: "/ventas/detallesVenta/:id",
    element: <DetallesVenta/>,
  },
];
