import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiPredicciones = createApi("predicciones");

export const PrediccionesApi = createCrudOperations(ApiPredicciones, "predicciones");
