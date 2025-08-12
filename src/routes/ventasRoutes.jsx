import { lazy } from "react";

const Ventas = lazy(() => import("../data/ventas/venta/Ventas"));
const DetallesVenta = lazy(() => import("../data/ventas/detalleVenta/DetallesVenta"));
const RealizarVenta = lazy(() => import("../data/ventas/venta/RealizarVenta"));
export const ventasRoutes = [
  //ventas
  {
    path: "/realizarVenta",
    element: <RealizarVenta/>,
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
