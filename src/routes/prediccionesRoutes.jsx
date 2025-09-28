import { lazy } from "react";

const SeleccionarProducto = lazy(() =>
  import("../data/predicciones/SeleccionarProducto")
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
const CreateConfiguracionModelo = lazy(() =>
  import("../data/predicciones/configuracionModelo/CreateConfiguracionModelo")
);
const EditConfiguracionModelo = lazy(() =>
  import("../data/predicciones/configuracionModelo/EditConfiguracionModelo")
);
const Predicciones = lazy(() =>
  import("../data/predicciones/predicciones/Predicciones")
);
export const prediccionesRoutes = [
  //predicciones
  {
    path: "/seleccionarProducto",
    element: <SeleccionarProducto />,
  },
  {
    path: "/detalles-prediccion/:id",
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
  {
    path: "/createConfiguracionModelo",
    element: <CreateConfiguracionModelo />,
  },
  {
    path: "/editConfiguracionModelo/:id",
    element: <EditConfiguracionModelo />,
  },
  {
    path: "/predicciones",
    element: <Predicciones />,
  },
];