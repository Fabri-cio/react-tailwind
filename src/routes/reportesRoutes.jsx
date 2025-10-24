import { lazy } from "react";

const Reportes = lazy(() => import("../data/reportes/Reportes"));

export const reportesRoutes = [{ path: "/reportes", element: <Reportes /> }];
