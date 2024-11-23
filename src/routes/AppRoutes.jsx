import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;

// Lazy loading pages
const Home = lazy(() => import("@/pages/Home"));
const Productos = lazy(() => import("@/pages/almacen/Productos"));
const FormProducto = lazy(() => import("@/components/almacen/FormProducto"));
const RealizarVenta = lazy(() => import("../components/ventas/RealizarVenta"));

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense
        fallback={<div className="spinner">Cargando Pagina Espere</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/almacen/productos" element={<Productos />} />
          <Route path="/almacen/formProducto" element={<FormProducto />} />
          <Route path="/ventas/realizar" element={<RealizarVenta />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
