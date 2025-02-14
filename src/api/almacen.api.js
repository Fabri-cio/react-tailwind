import { createApiInstance, request } from "./api.Base";

// const ApiAlmacenes = createApiInstance("http://localhost:8000/api/v1/almacenes/");
const ApiAlmacenes = createApiInstance(`${ApiBaseURL}/almacenes/`);


// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: () => request(apiInstance, "get", `${resource}/`),
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});

// Crear operaciones CRUD específicas para cada recurso
export const AlmaceneAPI = createCrudOperations(ApiAlmacenes, "almacenes");
export const TiposMovimientoAPI = createCrudOperations(ApiAlmacenes, "tipos-movimiento");
export const InventarioAPI = createCrudOperations(ApiAlmacenes, "inventarios");
export const MovimientoAPI = createCrudOperations(ApiAlmacenes, "movimientos");