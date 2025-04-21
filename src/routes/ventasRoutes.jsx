import { lazy } from "react";

const RealizarVenta = lazy(() => import("../components/ventas/RealizarVenta"));
const VentasList = lazy(() => import("../pages/ventas/Ventas"));
const DetalleVenta = lazy(() => import("../pages/ventas/DetalleVenta"));
const DetalleVentas = lazy(() => import("@/pages/ventas/DetalleVentas"));
const ReporteVentas = lazy(() => import("@/pages/ventas/ReporteVentas"));

export const ventasRoutes = [
  //ventas
  {
    path: "/ventas/realizar",
    element: <RealizarVenta />,
  },
  {
    path: "/ventas/ver",
    element: <VentasList />,
  },
  //detalle de ventas
  {
    path: "/ventas/detalleVenta/:id",
    element: <DetalleVenta />,
  },
  {
    path: "/ventas/detalleVentas",
    element: <DetalleVentas />,
  },
  {
    path: "/ventas/reportes",
    element: <ReporteVentas />,
  },
];
