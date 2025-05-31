import { lazy } from "react";

const ProductList = lazy(() => import("../pages/productos/ProductList"));
const EditProduct = lazy(() => import("../data/productos/EditProduct"));
const CreateProductStandalone = lazy(() =>
    import("../data/productos/CreateProductStandalone")
);
const CrearCategoria = lazy(() => import("../data/productos/CrearCategoria"));
const EditarCategoria = lazy(() => import("../data/productos/EditCategoria"));
const Proveedores = lazy(() => import("../pages/productos/Proveedores"));

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
  // categorias
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
