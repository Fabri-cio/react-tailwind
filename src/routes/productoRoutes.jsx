import { lazy } from "react";

const ProductList = lazy(() => import("../pages/productos/ProductList"));
const EditProduct = lazy(() => import("../data/productos/EditProduct"));
const CreateProductStandalone = lazy(() =>
    import("../data/productos/CreateProductStandalone")
);
const Categorias = lazy(() => import("../pages/productos/Categorias"));
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
    path: "/categorias",
    element: <Categorias />,
  },
  // proveedores
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
];
