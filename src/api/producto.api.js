import axios from "axios";

// Configuración base de Axios
const Api = axios.create({
  baseURL: "http://localhost:8000/api/v1/productos/",
});

// Función base para manejar peticiones y errores
const request = async (method, url, data = null) => {
  try {
    const response = await Api.request({ method, url, data });
    return response;
  } catch (error) {
    console.error(`Error en ${method.toUpperCase()} ${url}:`, error);
    throw error; // Propagar el error para manejarlo en otro lugar si es necesario
  }
};

// Productos
export const getAllProductos = () => request("get", "productos/");
export const getProducto = (id) => request("get", `productos/${id}`);
export const createProducto = (producto) =>
  request("post", "productos/", producto);
export const updateProducto = (id, producto) =>
  request("put", `productos/${id}/`, producto);
export const deleteProducto = (id) => request("delete", `productos/${id}/`);

// Categorías
export const getAllCategorias = () => request("get", "categorias/");
export const getCategoria = (id) => request("get", `categorias/${id}`);
export const createCategoria = (categoria) =>
  request("post", "categorias/", categoria);
export const updateCategoria = (id, categoria) =>
  request("put", `categorias/${id}/`, categoria);
export const deleteCategoria = (id) => request("delete", `categorias/${id}/`);
