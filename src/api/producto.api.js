import { createApiInstance, request } from "./api.Base";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;
// Crear instancia específica para la API de productos
// const ApiProductos = createApiInstance("http://localhost:8000/api/v1/productos/");
const ApiProductos = createApiInstance(`${ApiBaseURL}/productos/`);

// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: (all_data = false) => {
    const url = all_data ? `${resource}/?all_data=true` : `${resource}/`;
    return request(apiInstance, "get", url);
  },
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});

// Crear operaciones CRUD específicas para cada recurso
export const ProductosAPI = createCrudOperations(ApiProductos, "productos");
export const CategoriasAPI = createCrudOperations(ApiProductos, "categorias");
export const ProveedoresAPI = createCrudOperations(ApiProductos, "proveedores");

// Ejemplo de uso:
// ProductosAPI.getAll();
// CategoriasAPI.create({ nombre: "Nueva Categoría" });
// ProveedoresAPI.update(1, { nombre: "Proveedor Actualizado" });
