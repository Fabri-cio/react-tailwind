import { lazy } from "react";

const Ventas = lazy(() => import("../data/ventas/venta/Ventas"));
const DetallesVenta = lazy(() =>
  import("../data/ventas/detalleVenta/DetallesVenta")
);
const RealizarVenta = lazy(() => import("../data/ventas/venta/RealizarVenta"));
//clientes
const Clientes = lazy(() => import("../data/ventas/cliente/Clientes"));
const CreateCliente = lazy(() => import("../data/ventas/cliente/CreateCliente"));
const EditCliente = lazy(() => import("../data/ventas/cliente/EditCliente"));
export const ventasRoutes = [
  //ventas
  {
    path: "/realizarVenta",
    element: <RealizarVenta />,
  },
  {
    path: "/ventas",
    element: <Ventas />,
  },
  {
    path: "/ventas/detallesVenta/:id",
    element: <DetallesVenta />,
  },
  {
    path: "/createCliente",
    element: <CreateCliente />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/clientes/:id",
    element: <EditCliente />,
  },
];
