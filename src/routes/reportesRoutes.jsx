import { lazy } from "react";

const Reportes = lazy(() => import("../components/shared/Reporte"));

export const reportesRoutes = [{ path: "/reportes", element: <Reportes /> }];
