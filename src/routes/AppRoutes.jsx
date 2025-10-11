import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import PublicLayout from "../components/layout/PublicLayout";

// Importa todas las rutas
import { authRoutes } from "../routes/authRoutes";
import { homeRoutes } from "./homeRoutes";
import { prediccionesRoutes } from "./prediccionesRoutes";
import { productoRoutes } from "./productoRoutes";
import { ventasRoutes } from "./ventasRoutes";
import { inventariosRoutes } from "./inventariosRoutes";
import { usuariosRoutes } from "./usuariosRoutes";
import { reportesRoutes } from "./reportesRoutes";
import { comprasRoutes } from "./comprasRoutes";

// Fallback general
const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;
const SuspenseFallback = ({ message = "Cargando..." }) => <div>{message}</div>;

// Unifica rutas privadas y públicas
const rutasPublicas = [...authRoutes];
const rutasPrivadas = [
  ...homeRoutes,
  ...prediccionesRoutes,
  ...productoRoutes,
  ...ventasRoutes,
  ...inventariosRoutes,
  ...usuariosRoutes,
  ...reportesRoutes,
  ...comprasRoutes,
];

const wrapWithSuspense = (element) => (
  <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
);

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          {rutasPublicas.map(({ path, element }) => (
            <Route key={path} path={path} element={wrapWithSuspense(element)} />
          ))}
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {rutasPrivadas.map(({ path, element }) => (
              <Route key={path} path={path} element={wrapWithSuspense(element)} />
            ))}
          </Route>
        </Route>

        {/* Ruta fallback 404 */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;