import { lazy } from "react";

const RealizarVenta = lazy(() => import("../components/ventas/RealizarVenta"));
const Ventas = lazy(() => import("../data/ventas/venta/Ventas"));
const DetallesVenta = lazy(() => import("../data/ventas/detalleVenta/DetallesVenta"));
export const ventasRoutes = [
  //ventas
  {
    path: "/ventas/realizar",
    element: <RealizarVenta />,
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
