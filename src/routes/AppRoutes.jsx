import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;

// Lazy loading pages
// Pagina Principal
const Home = lazy(() => import("@/pages/Home"));
// Almacen
const Productos = lazy(() => import("@/pages/almacen/Productos"));
const FormProducto = lazy(() => import("@/components/almacen/FormProducto"));
// Ventas
const RealizarVenta = lazy(() => import("@/components/ventas/RealizarVenta"));
// Usuarios
const UsersPage = lazy(() => import("@/pages/usuarios/UsersPage"));
const FormUsuario = lazy(() => import("../components/usuarios/FormUsuario"))

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense
        fallback={<div className="spinner">Cargando Pagina Espere</div>}
      >
        <Routes>
          {/* Pagina Principal */}
          <Route path="/" element={<Home />} />
          {/* Almacen */}
          <Route path="/almacen/productos" element={<Productos />} />
          <Route path="/almacen/formProducto" element={<FormProducto />} />
          {/* Ventas */}
          <Route path="/ventas/realizar" element={<RealizarVenta />} />
          {/* Usuarios */}
          <Route path="/usuarios/lista" element={<UsersPage />} />
          <Route path="/usuarios/formUsuario" element={<FormUsuario />} />
          <Route path="/usuarios/roles" element={<RealizarVenta />} />
          <Route path="/usuarios/agregar" element={<RealizarVenta />} />
          <Route path="/usuarios/administrar" element={<RealizarVenta />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
