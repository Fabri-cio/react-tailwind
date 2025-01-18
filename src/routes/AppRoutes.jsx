import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/components/MainLayout";
import PublicLayout from "@/components/PublicLayout";

const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;

//Login
const Login = lazy(() => import("@/components/Login"));
const Register = lazy(() => import("@/components/Register"));
const PasswordResetRequest = lazy(() =>
  import("@/components/PasswordResetRequest")
);
const PasswordReset = lazy(() => import("@/components/PasswordReset"));

// Lazy loading pages
// Pagina Principal
const Home = lazy(() => import("@/pages/Home"));
// Productos
const Productos = lazy(() => import("@/pages/productos/Productos"));
const FormProducto = lazy(() => import("@/components/productos/FormProducto"));
// Ventas
const RealizarVenta = lazy(() => import("@/components/ventas/RealizarVenta"));
const Ventas = lazy(() => import("@/pages/ventas/Ventas"));
const DetalleVenta = lazy(() => import("@/pages/ventas/DetalleVenta"));
const DetalleVentas = lazy(() =>
  import("../pages/ventas/DetalleVentas")
);
const ReporteVentas = lazy(() => import("../pages/ventas/ReporteVentas"));
// Predicciones
const RealizarPrediccion = lazy(() =>
  import("@/pages/predicciones/RealizarPrediccion")
);
const DetallesPrediccion = lazy(() =>
  import("../components/predicciones/DetallesPrediccion")
);
// Usuarios
const UsersPage = lazy(() => import("@/pages/usuarios/UsersPage"));
const FormUsuario = lazy(() => import("@/components/usuarios/FormUsuario"));

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
              {/* Productos */}
              <Route path="/productos" element={<Productos />} />
              <Route path="/formProducto" element={<FormProducto />} />
              {/* Ventas */}
              <Route path="/ventas/realizar" element={<RealizarVenta />} />
              <Route path="/ventas/ver" element={<Ventas />} />
              <Route path="/ventas/reportes" element={<ReporteVentas />} />
              <Route
                path="/ventas/detalleVenta/:id"
                element={<DetalleVenta />}
              />
              <Route
                path="/ventas/detalleVentas"
                element={<DetalleVentas />}
              />
              {/* Predicciones */}
              <Route
                path="/realizar_prediccion"
                element={<RealizarPrediccion />}
              />
              <Route
                path="/detalles-prediccion"
                element={<DetallesPrediccion />}
              />
              {/* <Route path="/ver" element={<Predicciones />} /> */}
              {/* Usuarios */}
              <Route path="/usuarios/lista" element={<UsersPage />} />
              <Route path="/usuarios/formUsuario" element={<FormUsuario />} />
              <Route path="/usuarios/roles" element={<RealizarVenta />} />
              <Route path="/usuarios/agregar" element={<RealizarVenta />} />
              <Route path="/usuarios/administrar" element={<RealizarVenta />} />
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
