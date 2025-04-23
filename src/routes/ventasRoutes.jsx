import { lazy } from "react";

const RealizarVenta = lazy(() => import("../components/ventas/RealizarVenta"));
const VentasList = lazy(() => import("../data/ventas/VentasList"));
const DetalleVenta = lazy(() => import("../pages/ventas/DetalleVenta"));
const DetalleVentasList = lazy(() => import("../data/ventas/DetalleVentasList"));
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
    element: <DetalleVentasList />,
  },
  {
    path: "/ventas/reportes",
    element: <ReporteVentas />,
  },
];
