import { lazy } from "react";

const Productos = lazy(() => import("../data/productos/producto/Productos"));
const EditProduct = lazy(() =>
  import("../data/productos/producto/EditProduct")
);
const CreateProduct = lazy(() =>
  import("../data/productos/producto/CreateProduct")
);
const CreateCategoria = lazy(() =>
  import("../data/productos/categoria/CreateCategoria")
);
const EditCategoria = lazy(() =>
  import("../data/productos/categoria/EditCategoria")
);
const Proveedores = lazy(() =>
  import("../data/productos/proveedor/Proveedores")
);
const Categorias = lazy(() => import("../data/productos/categoria/Categorias"));
const HistorialProduct = lazy(() =>
  import("../data/productos/producto/HistorialProduct")
);

export const productoRoutes = [
  // productos
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/editProduct/:id",
    element: <EditProduct />,
  },
  {
    path: "/createProduct",
    element: <CreateProduct />,
  },
  {
    path: "/historialProduct/:id",
    element: <HistorialProduct />,
  },
  // categorias
  {
    path: "/categorias",
    element: <Categorias />,
  },
  {
    path: "/editCategoria/:id",
    element: <EditCategoria />,
  },
  {
    path: "/createCategoria",
    element: <CreateCategoria />,
  },
  // proveedores
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
];
