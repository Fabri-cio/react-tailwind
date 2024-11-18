import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy loading pages
const Home = lazy(() => import("../pages/Home"));
const PuntoVenta = lazy(() => import("../pages/PuntoVenta"));
const Inventario = lazy(() => import("../pages/Inventario"));
const GProductos = lazy(() => import("../pages/Inventarios/GProductos"));
const Salidas = lazy(() => import("../pages/Inventarios/Salidas"));
const ProductoPage = lazy(() => import("../pages/Inventarios/ProductoPage"));

const Reportes = lazy(() => import("../pages/Reportes"));
const Usuarios = lazy(() => import("../pages/Usuarios"));
const Configuracion = lazy(() => import("../pages/Configuracion"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando Pagina Espere</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/punto-de-venta" element={<PuntoVenta />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/inventario/productos" element={<GProductos />} />
        <Route path="/inventario/salidas" element={<Salidas />} />
        <Route path="/inventario/entradas" element={<ProductoPage />} />

        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
