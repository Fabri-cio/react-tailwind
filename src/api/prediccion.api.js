import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiPredicciones = createApi("predicciones");

export const PrediccionesApi = createCrudOperations(ApiPredicciones, "predicciones");
export const ConfiguracionesModelosApi = createCrudOperations(ApiPredicciones, "configuraciones-modelo");
export const DetallesPrediccionesApi = createCrudOperations(ApiPredicciones, "detalles-predicciones");
export const ConfigModelSelectIDApi = createCrudOperations(ApiPredicciones, "config-model-select-id");



