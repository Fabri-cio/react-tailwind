import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import PublicLayout from "../components/layout/PublicLayout";

const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;

//Login
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const PasswordResetRequest = lazy(() =>
  import("../pages/auth/PasswordResetRequest")
);
const PasswordReset = lazy(() => import("../pages/auth/PasswordReset"));

// Lazy loading pages
// Pagina Principal
const Home = lazy(() => import("../pages/Home"));
// Movimientos
const Movimientos = lazy(() => import("../pages/movimientos/Movimientos"));
// Productos
const ProductList = lazy(() => import("@/pages/productos/ProductList"));
const EditProduct = lazy(() => import("../data/EditProduct"));
const CreateProduct = lazy(() =>
  import("../data/CreateProduct")
);
const Categorias = lazy(() => import("@/pages/productos/Categorias"));
const Proveedores = lazy(() => import("@/pages/productos/Proveedores"));
// Ventas
const RealizarVenta = lazy(() => import("@/components/ventas/RealizarVenta"));
const Ventas = lazy(() => import("@/pages/ventas/Ventas"));
const DetalleVenta = lazy(() => import("@/pages/ventas/DetalleVenta"));
const DetalleVentas = lazy(() => import("../pages/ventas/DetalleVentas"));
const ReporteVentas = lazy(() => import("../pages/ventas/ReporteVentas"));
// Predicciones
const RealizarPrediccion = lazy(() =>
  import("@/pages/predicciones/RealizarPrediccion")
);
const DetallesPrediccion = lazy(() =>
  import("../components/predicciones/DetallesPrediccion")
);
const PrediccionResultados = lazy(() =>
  import("../components/predicciones/PrediccionResultados")
);
// Usuarios
const UserList = lazy(() => import("../pages/usuarios/UserList"));
const EditUser = lazy(() => import("../data/EditUser"));
const CreateUser = lazy(() => import("../data/CreateUser"));
// Inventarios
const InventarioList = lazy(() =>
  import("../pages/inventarios/InventarioList")
);
const CrearInventario = lazy(() =>
  import("../components/inventarios/CrearInventario")
);
const RegistrarMovimiento = lazy(() =>
  import("../components/inventarios/RegistrarMovimiento")
);

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense
        fallback={<div className="spinner">Cargando Pagina Espere</div>}
      >
        <Routes>
          {/* Rutas publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/request/password_reset"
              element={<PasswordResetRequest />}
            />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              {/* Movimientos */}
              <Route path="/ver_movimientos" element={<Movimientos />} />
              {/* Productos */}
              <Route path="/productList" element={<ProductList />} />
              <Route path="/editProduct/:id" element={<EditProduct />} />
              <Route path="/createProduct" element={<CreateProduct />} />
              {/* Categorias */}
              <Route path="/categorias" element={<Categorias />} />
              {/* Marcas */}
              <Route path="/proveedores" element={<Proveedores />} />
              {/* Ventas */}
              <Route path="/ventas/realizar" element={<RealizarVenta />} />
              <Route path="/ventas/ver" element={<Ventas />} />
              <Route path="/ventas/reportes" element={<ReporteVentas />} />
              <Route
                path="/ventas/detalleVenta/:id"
                element={<DetalleVenta />}
              />
              <Route path="/ventas/detalleVentas" element={<DetalleVentas />} />
              {/* Predicciones */}
              <Route
                path="/realizar_prediccion"
                element={<RealizarPrediccion />}
              />
              <Route
                path="/prediccion-resultados"
                element={<PrediccionResultados />}
              />
              <Route
                path="/detalles-prediccion"
                element={<DetallesPrediccion />}
              />
              {/* <Route path="/ver" element={<Predicciones />} /> */}
              {/* Usuarios */}
              <Route path="/userList" element={<UserList />} />
              <Route path="/editUser/:id" element={<EditUser />} />
              <Route path="/createUser" element={<CreateUser />} />
              {/* Inventario */}
              <Route path="/ver_inventario" element={<InventarioList />} />
              <Route path="/crear_inventario" element={<CrearInventario />} />
              <Route
                path="/registrarMovimiento/:id"
                element={<RegistrarMovimiento />}
              />
            </Route>
          </Route>
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
