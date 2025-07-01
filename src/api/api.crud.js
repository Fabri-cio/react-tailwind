// api.crud.js
import { request } from "./api.Base";

// Función genérica para operaciones CRUD
export const createCrudOperations = (apiInstance, resource) => ({
  // obtener lista paginada o completa(con per_page)
  getAll: (all_data = false, page = 1, per_page = 10) => {
    let url = `${resource}/?page=${page}&per_page=${per_page}`;
    if (all_data) {
      url += "&all_data=true";
    }
    return request(apiInstance, "get", url);
  },
  // obtener un solo recurso
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  // crear un nuevo recurso
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  // actualizar un recurso
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  // eliminar un recurso
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
  // buscar un recurso
  search: (search, page = 1, per_page = 10) =>
    request(
      apiInstance,
      "get",
      `${resource}/?search=${search}&page=${page}&per_page=${per_page}`
    ),
  // filtrar recursos
  getFiltered: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(apiInstance, "get", `${resource}/?${query}`);
  },
});
