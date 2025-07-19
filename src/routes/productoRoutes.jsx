import { lazy } from "react";

const ProductList = lazy(() => import("../pages/productos/ProductList"));
const EditProduct = lazy(() => import("../data/productos/EditProduct"));
const CreateProductStandalone = lazy(() =>
    import("../data/productos/CreateProductStandalone")
);
const CrearCategoria = lazy(() => import("../data/productos/CrearCategoria"));
const EditarCategoria = lazy(() => import("../data/productos/EditCategoria"));
const Proveedores = lazy(() => import("../pages/productos/Proveedores"));
const Categorias = lazy(() => import("../pages/productos/Categorias"));
const HistorialProduct = lazy(() => import("../pages/productos/HistorialProduct"));

export const productoRoutes = [
  // productos
  {
    path: "/productList",
    element: <ProductList />,
  },
  {
    path: "/editProduct/:id",
    element: <EditProduct />,
  },
  {
    path: "/createProduct",
    element: <CreateProductStandalone />,
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
    path: "/editCategory/:id",
    element: <EditarCategoria />,
  },
  {
    path: "/addCategory",
    element: <CrearCategoria />,
  },
  // proveedores
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
];
