import { lazy } from "react";

const CreatePedido = lazy(() => import("../data/compras/pedido/CreatePedido"));
const Pedidos = lazy(() => import("../data/compras/pedido/Pedidos"));
const EditPedido = lazy(() => import("../data/compras/pedido/EditPedido"));
const Compras = lazy(() => import("../data/compras/compra/Compras"));
const CreateCompra = lazy(() => import("../data/compras/pedido/CreatePedido"));
const EditCompra = lazy(() => import("../data/compras/compra/EditCompra"));

export const comprasRoutes = [
  //pedidos
  {
    path: "/pedidos",
    element: <Pedidos />,
  },
  {
    path: "/createPedido",
    element: <CreatePedido />,
  },
  {
    path: "/editPedido/:id",
    element: <EditPedido />,
  },
  //compras
  {
    path: "/compras",
    element: <Compras />,
  },
  {
    path: "/createPedido/:id",
    element: <CreateCompra />,
  },
  {
    path: "/editCompra/:id",
    element: <EditCompra />,
  },
];
