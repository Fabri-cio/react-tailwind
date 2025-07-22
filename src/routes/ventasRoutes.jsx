import { lazy } from "react";

const RealizarVenta = lazy(() => import("../components/ventas/RealizarVenta"));
const VentasList = lazy(() => import("../data/ventas/VentasList"));
const DetalleVentasList = lazy(() => import("../data/ventas/DetalleVentasList"));
const ReporteVentas = lazy(() => import("../data/ventas/ReporteVentas"));

export const ventasRoutes = [
  //ventas
  {
    path: "/ventas/realizar",
    element: <RealizarVenta />,
  },
  {
    path: "/ventas",
    element: <VentasList />,
  },
  {
    path: "/ventas/reportes",
    element: <ReporteVentas />,
  },
];
