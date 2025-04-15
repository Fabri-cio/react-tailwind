import { lazy } from "react";

const RealizarPrediccion = lazy(() =>
  import("../pages/predicciones/RealizarPrediccion")
);
const DetallesPrediccion = lazy(() =>
  import("../components/predicciones/DetallesPrediccion")
);
const PrediccionResultados = lazy(() =>
  import("../components/predicciones/PrediccionResultados")
);

export const prediccionesRoutes = [
  //predicciones
  {
    path: "/realizar_prediccion",
    element: <RealizarPrediccion />,
  },
  {
    path: "/detalles-prediccion",
    element: <DetallesPrediccion />,
  },
  {
    path: "/prediccion-resultados",
    element: <PrediccionResultados />,
  },
];