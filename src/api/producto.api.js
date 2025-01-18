// import { createApiInstance, request } from "./api.Base";

// // Crear instancia específica para la API de productos
// const ApiProductos = createApiInstance("http://localhost:8000/api/v1/productos/");

// // Productos
// export const getAllProductos = () => request(ApiProductos, "get", "productos/");
// export const getProducto = (id) => request(ApiProductos, "get", `productos/${id}`);
// export const createProducto = (producto) => request(ApiProductos, "post", "productos/", producto);
// export const updateProducto = (id, producto) => request(ApiProductos, "put", `productos/${id}/`, producto);
// export const deleteProducto = (id) => request(ApiProductos, "delete", `productos/${id}/`);

// // Categorías
// export const getAllCategorias = () => request(ApiProductos, "get", "categorias/");
// export const getCategoria = (id) => request(ApiProductos, "get", `categorias/${id}`);
// export const createCategoria = (categoria) => request(ApiProductos, "post", "categorias/", categoria);
// export const updateCategoria = (id, categoria) => request(ApiProductos, "put", `categorias/${id}/`, categoria);
// export const deleteCategoria = (id) => request(ApiProductos, "delete", `categorias/${id}/`);

// // Proveedores
// export const getAllProveedores = () => request(ApiProductos, "get", "proveedores/");
// export const getProveedor = (id) => request(ApiProductos, "get", `proveedores/${id}`);
// export const createProveedor = (proveedor) => request(ApiProductos, "post", "proveedores/", proveedor);
// export const updateProveedor = (id, proveedor) => request(ApiProductos, "put", `proveedores/${id}/`, proveedor);
// export const deleteProveedor = (id) => request(ApiProductos, "delete", `proveedores/${id}/`);

import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de productos
const ApiProductos = createApiInstance("http://localhost:8000/api/v1/productos/");

// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: () => request(apiInstance, "get", `${resource}/`),
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
