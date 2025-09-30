import { lazy } from "react";
import Modal from "../components/shared/Modal";

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
const CreateProveedor = lazy(() =>
  import("../data/productos/proveedor/CreateProveedor")
);
const EditProveedor = lazy(() =>
  import("../data/productos/proveedor/EditProveedor")
);
const ProductosPorCategoria = lazy(() =>
  import("../data/productos/categoria/ProductosPorCategoria")
);
const ProductosPorProveedor = lazy(() =>
  import("../data/productos/proveedor/ProductosPorProveedor")
);
export const productoRoutes = [
  // productos
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/editProduct/:id",
    element: (
      <Modal onClose={false}>
        <EditProduct />
      </Modal>
    ),
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
  {
    path: "/productos_por_categoria/:id",
    element: <ProductosPorCategoria />,
  },
  // proveedores
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
  {
    path: "/createProveedor",
    element: <CreateProveedor />,
  },
  {
    path: "/editProveedor/:id",
    element: <EditProveedor />,
  },
  {
    path: "/productos_por_proveedor/:id",
    element: <ProductosPorProveedor />,
  },
];
