import { lazy } from "react";

const RealizarPrediccion = lazy(() =>
  import("../data/predicciones/RealizarPrediccion")
);
const DetallesPrediccion = lazy(() =>
  import("../components/predicciones/DetallesPrediccion")
);
const PrediccionResultados = lazy(() =>
  import("../components/predicciones/PrediccionResultados")
);
const ConfiguracionesModelos = lazy(() =>
  import("../data/predicciones/configuracionModelo/ConfiguracionesModelos")
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
  //modelos de predicciones
  {
    path: "/configuracionesModelos",
    element: <ConfiguracionesModelos />,
  },
];