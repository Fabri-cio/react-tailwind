import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de productos
const ApiProductos = createApiInstance("http://localhost:8000/api/v1/predicciones/");

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
