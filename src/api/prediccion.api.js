import { createApiInstance, request } from "./api.Base";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;
// Crear instancia específica para la API de productos
// const ApiPredicciones = createApiInstance("http://localhost:8000/api/v1/predicciones/");
const ApiPredicciones = createApiInstance(`${ApiBaseURL}/predicciones/`);

// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: () => request(apiInstance, "get", `${resource}/`),
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});

// Crear operaciones CRUD específicas para cada recurso
export const PrediccionesAPI = createCrudOperations(ApiPredicciones, "predicciones");
