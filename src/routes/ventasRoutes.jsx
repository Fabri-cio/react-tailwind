import { lazy } from "react";

const Ventas = lazy(() => import("../data/ventas/venta/Ventas"));
const DetallesVenta = lazy(() => import("../data/ventas/detalleVenta/DetallesVenta"));
export const ventasRoutes = [
  //ventas
  {
    path: "/ventas",
    element: <Ventas/>,
  },
  {
    path: "/ventas/detallesVenta/:id",
    element: <DetallesVenta/>,
  },
];
